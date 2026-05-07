# alessandro-bolea — Wiki progetto

Aggiornato: 2026-05-07 17:02

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
- [`script.js`](../script.js) — typing animation, line numbers dinamici, indent line tween, card progetti
- [`gol.js`](../gol.js) — Game of Life toroidale come sfondo (canvas full-document)

## Sezione progetti — espansione card (feature recente)
Ogni progetto ha campo opzionale `dettagli`. Se presente:
- card collassata mostra solo `proj-card-row` (header + footer)
- click sulla card → toggle `.is-expanded` (accordion: chiude le altre)
- transizione smooth via `max-height` misurato (`scrollHeight`)
- `pumpLayoutDuring(400)` rAF loop aggiorna `--block-h` e `repositionBrace`
  ogni frame, mantenendo indent line e graffa allineate
- `recomputeProjLines()` (ResizeObserver) aggiunge/rimuove numeri uno per tick
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

## Pagine wiki
- [architettura.md](architettura.md) — _(crea se serve)_
- [api.md](api.md) — _(N/A: sito statico)_
- [database.md](database.md) — _(N/A)_
- [user-stories.md](user-stories.md) — _(crea se serve)_
- [decisions.md](decisions.md) — _(crea se serve)_
- [CHANGELOG.md](CHANGELOG.md) — _(crea se serve)_

## Cross-link wiki globale
- Stub globale: [alessandro-bolea.md](C:/Users/sasha/.claude/wiki/projects/alessandro-bolea.md)
- Wiki home: [MAP.md](C:/Users/sasha/.claude/wiki/MAP.md)
