# alessandro-bolea — Wiki progetto

Aggiornato: 2026-05-08 15:19

Sito personale di Alessandro Bolea. Estetica "code editor": numeri di riga,
indentazione visibile, parentesi graffe, tipo monospace. Tema dark/light togglabile.

## Stack
- **HTML/CSS/JS vanilla** — nessun bundler, nessun framework
- **Font**: Hack via CDN (`hack-font@3`)
- **Canvas 2D** per la simulazione Game of Life di sfondo
- **Hosting**: GitHub (repo `sasha-bolea/alessandro-bolea`), branch attiva `testing`

## Struttura
File alla root (no `src/`):
- [`index.html`](../index.html) — markup unica pagina, sezioni `reveal`, `tools`, `projects`, `contact`
- [`style.css`](../style.css) — tema, layout sezioni `.code-section`, indent line via `.code-block::before`
- [`script.js`](../script.js) — typing animation, line numbers dinamici via `recomputeLineNumbers()`, indent line tween, card progetti
- [`gol.js`](../gol.js) — Game of Life toroidale come sfondo (canvas full-document)

## Sezione progetti — espansione card (feature recente)
Ogni progetto ha campo opzionale `dettagli`. Se presente:
- card collassata mostra solo `proj-card-row` (header + footer)
- click sulla card → toggle `.is-expanded` (accordion: chiude le altre)
- transizione smooth via `max-height` misurato (`scrollHeight`)
- `pumpLayoutDuring(400)` rAF loop aggiorna `--block-h` e `repositionBrace`
  ogni frame, mantenendo indent line e graffa allineate
- `recomputeLineNumbers()` (engine unificato, vedi sezione sotto) aggiunge/rimuove numeri uno per tick
- `.no-block-transition` disattiva temporaneamente la transition CSS su
  `.code-block::before` durante il pump per evitare lag di 320ms

## Sfondo Game of Life
- Cellular automaton di Conway, topologia toroidale (effetto Pac-Man)
- Canvas `position: absolute`, alto quanto tutto il documento → scrolla col sito
- Iniezione periodica di gliders dai bordi per mantenere viva la simulazione
- `speedMs` default `280` (più veloce di prima `1000` — più reattivo come sfondo)
- Card progetto "Game of Life" ha controlli pause/play, clear, reseed (SVG inline)
  con tooltip hover (`data-tooltip` + CSS `::after`)

### Tweaks card (visibili solo quando card aperta)
- Container dedicato `.gol-speed-wrap` (separato da `.proj-card-expanded`),
  animato via `max-height` CSS-only su `.is-expanded`. Necessario tenerlo separato
  perché il pannello descrizione anima via JS (`scrollHeight`) e mescolare i due
  causava spazi indesiderati e gap di centratura.
- Slider velocità (`<input type="range">`) con mapping invertito: slider value =
  `2100 - speedMs` → sinistra=lento, destra=veloce (più intuitivo).
- 3 modalità "penna" (`tweaks.pen`): `cell` (default, click singolo aggiunge 1
  cella), `draw` (drag dipinge multipla), `glider` (click stampa glider con
  orientamento random). Bottone attivo evidenziato con `.is-active`.
- `gol.js`: vecchio `handleClick` sostituito da pointer events
  (`pointerdown`/`move`/`up`) per supportare drag mode.

### Fix sottile: white-space ereditato
La sezione progetti vive dentro `.code-row` che ha `white-space: pre-wrap`.
Il template literal di `.proj-card-expanded` con indentazione + newline veniva
renderizzato come spazi visibili sopra/sotto il `<p>` testo. Override
`white-space: normal` su `.proj-card-expanded` collassa il whitespace HTML.

### Focus mode (controller fullscreen GoL)
4° bottone in `.gol-pen-row` (icona frecce 4 angoli) trasforma la card stessa
in un controller dedicato. **Non è una pagina nuova: è la stessa pagina che
si trasforma.**

Pipeline visiva (durate concorrenti):
- **Card morph (700ms)** — la card stessa si sposta/ridimensiona da posizione
  in-flow (dentro la sezione progetti) a `position: fixed` bottom-center
  ~480px, via FLIP (First-Last-Invert-Play). Niente clone, stesso elemento DOM.
- **Sezioni fade-out (600ms)** — `body > h1, .code-section, .reveal-section,
  #indent-line, #brace-line-numbers, #closing-brace, #easter-egg` con
  `transition: opacity 600ms ease`; classe `body.gol-focus-mode` setta
  `opacity: 0; pointer-events: none`. Theme-toggle e cursore custom esclusi.
- **Cell fade a bianco (920ms)** — `__gol.setCellColor("#ffffff", FOCUS_DUR + 220)`
  via lerp interno in `gol.js` (parsing hex + interpolazione canale-per-canale
  in `getCellColor()`).

**Reparenting**: durante `enterFocus` la card viene `appendChild`-ata in body.
Necessario perché altrimenti l'opacity della sezione genitrice (in fade) si
propagherebbe alla card via inheritance — la card sarebbe invisibile come
le sezioni. Da body, niente parente che fada. `_golCardOriginalParent` +
`_golCardOriginalNextSibling` salvati per ripristino in `exitFocus`.

**FLIP details** (`_flipFromTo`):
1. `first = card.getBoundingClientRect()` PRIMA del cambio layout
2. Cambia layout (aggiunge classe + sposta card)
3. `last = card.getBoundingClientRect()` DOPO
4. Calcola `dx, dy, sx, sy` come delta
5. `transform: translate(dx,dy) scale(sx,sy)` + `transition: none` + force reflow
6. RAF: `transition: transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)` +
   `transform: ""` → animazione smooth verso identità

**Hide elementi card in focus**: `.gol-focus-active .proj-name,
.proj-card-footer, .proj-card-expanded, .proj-card-comment` con `display: none`.
Forza `.gol-speed-wrap` visibile (`max-height: none !important`) per non
dipendere da `.is-expanded` (utile se card era collassata, anche se in pratica
deve essere espansa per accedere al focus btn).

**Indent line sync**: `pumpLayoutDuring(FOCUS_DUR + 100)` chiamato in entrambi
`enterFocus`/`exitFocus` perché la rimozione/restituzione della card cambia
`#projects-list.offsetHeight` → `--block-h` deve aggiornarsi via rAF tick.

**Theme toggle in focus mode**: `#theme-toggle` è `position: absolute` normalmente
(scrolla via). In focus mode diventa `position: fixed` via `body.gol-focus-mode`
selettore. Entrata: classe `.gol-focus-entering` (keyframe `from: translateY(-110%)`)
→ slide-down. Uscita: `.gol-focus-leaving` porta `position: fixed` autonomo
(perché `gol-focus-mode` è già rimosso dal body) + animazione slide-up con `forwards`.

### Pattern selector (focus mode)
Bottone griglia in `.gol-pen-row` → dropdown con 5 pattern predefiniti.
Solo visibile in `.gol-focus-active` (`.gol-pattern-wrap { display: none }` default).

`placePatternCentered(name)` in `gol.js`:
- Bounding box pattern → offset verso centro **viewport** (non documento)
- `cx = innerWidth/2/cellSize`, `cy = (scrollY + innerHeight/2)/cellSize`
- Necessario perché canvas è alto quanto tutto il documento (`scrollHeight`)
- Pulisce griglia, pausa sim, resetta stagnation counter

Info card (`.gol-info-card`): `position: absolute; left: calc(100% + 1rem); bottom: 0`
relativo alla focus card. Hover su opzione → mostra descrizione. Click → carica
pattern + lock visibilità (`_infoLocked`). Hover su altro pattern aggiorna
sempre il contenuto anche se locked. X chiude e resetta.

### Fix: parseHex rgb()
`--bg-glyph` in light mode = `rgb(220,216,208)`. `parseHex` originale gestiva
solo `#hex` → `parseInt("rgb...", 16)` = `NaN` → bitwise 0 → target fade sempre
nero → fade uscita focus in light mode invisibile. Fix: regex `rgba?\\((\\d+),(\\d+),(\\d+)\\)`
prima del parse hex.

## Pagine wiki
## Engine numeri di riga (refactor 2026-05-08)

Precedentemente ogni sezione gestiva i propri numeri con stato globale separato
(`_afterToolsLine`, `_afterProjLine`, ecc.) → numeri sbagliati frequenti.

**Nuovo approccio — unica source of truth:**
- `data-rows` e `data-source` su ogni `<span class="line-numbers">` in HTML
- `lineRows(span)` legge la modalità: `dynamic` (height/lineH), `dynamic-block`
  (offsetHeight del blocco), `conditional` (0 o 1), `empty-after` (sempre 1)
- `recomputeLineNumbers()` walka tutti `.line-numbers` in ordine DOM, assegna
  numeri sequenziali — nessuno stato globale
- `data-fixed-rows` override temporaneo: durante `renderToolsItems`/`renderProjItems`
  il body-ln span ha un conteggio fisso mentre crescono uno per volta; rimosso
  quando il rendering è completo
- **Smooth growth**: ogni riga aggiunta = `recomputeLineNumbers()` → numeri salgono
  uno alla volta, animazione percepita

**Perché niente stato globale**: il DOM è già ordinato → basta walkare e contare.
Stato separato diverge appena una sezione cambia altezza.

## Scroll e overflow (fix 2026-05-08)

- `overflow-x: hidden` solo su `html`, NON su `body` → `position: fixed` funziona
  correttamente (overflow su body crea containing block per fixed elements in Safari)
- Focus mode GoL: `document.documentElement.style.overflow = "hidden"` (non body)
  per lo stesso motivo
- `placeFinalBraceAndLine`: `body.style.minHeight = ""` prima di settare
  `documentElement.style.height = finalH` → evita che ghostRender's minHeight
  vinca sull'altezza clampata
- `#theme-toggle`: `position: absolute` (non fixed) — resta in cima al documento,
  scrolla via verso l'alto quando l'utente scrolla. Non segue il viewport.

## Cursore personalizzato — rimosso (2026-05-08)

`#custom-cursor` (div + CSS + JS) rimosso completamente. Causava complessità
senza beneficio percepito. Ripristinato `cursor: pointer` sulle card espandibili.

## Pagine wiki
- [architettura.md](architettura.md) — _(crea se serve)_
- [api.md](api.md) — _(N/A: sito statico)_
- [database.md](database.md) — _(N/A)_
- [user-stories.md](user-stories.md) — _(crea se serve)_
- [decisions.md](decisions.md) — _(crea se serve)_
- [CHANGELOG.md](CHANGELOG.md) — storico sessioni in linguaggio umano

## Cross-link wiki globale
- Stub globale: [alessandro-bolea.md](C:/Users/sasha/.claude/wiki/projects/alessandro-bolea.md)
- Wiki home: [MAP.md](C:/Users/sasha/.claude/wiki/MAP.md)
