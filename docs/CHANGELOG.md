# CHANGELOG — Alessandro Bolea (sito personale)

## 2026-05-08 (sessione pomeriggio)

### Feature: theme toggle animato in focus mode
`#theme-toggle` diventa `position: fixed` solo durante GoL focus mode
(via `body.gol-focus-mode #theme-toggle`). All'entrata slide-in da sopra
(`.gol-focus-entering`), all'uscita slide-out verso l'alto (`.gol-focus-leaving`
con `forwards` fill + `position: fixed` autonomo per sopravvivere alla rimozione
della classe body). Fuori da focus mode torna `position: absolute` normale.

### Fix: parseHex non gestiva rgb(...)
`--bg-glyph` in light mode è `rgb(220,216,208)` non hex. `parseInt` su stringa
`rgb(...)` → `NaN` → bitwise → `[0,0,0]` → fade uscita focus in light mode era
nero→nero (invisibile). Fix: regex `rgba?\((\d+),(\d+),(\d+)\)` prima del path hex.

### Fix: bottoni GoL centrati rispetto alla card
`.gol-controls` ora `position: absolute; left: 50%; transform: translateX(-50%)`
relativo a `.proj-card-row` (che ha `position: relative`). Prima era `flex: 1`
con `justify-content: center` → centrato rispetto allo spazio residuo dopo
`.proj-name`, non rispetto alla card intera.

### Tuning: iniezione glider più frequente
Edge glider ogni 3 step (era 6). Stagnation threshold 2 (era 3), inietta 2 pattern
(era 1). Nessuna iniezione in focus mode (check `body.gol-focus-mode`).

### Feature: pattern selector (solo focus mode)
Bottone con icona griglia in `.gol-pen-row` apre dropdown con 5 pattern:
- **Gosper Glider Gun** — produce glider ogni 30 gen
- **Pulsar** — oscillatore p3
- **Pentadecathlon** — oscillatore p15
- **Acorn** — methuselah 7 celle, 5206 gen
- **Diehard** — methuselah 7 celle, scompare dopo 130 gen

`placePatternCentered` centra nel **viewport** (non nel documento):
`cx = innerWidth/2/cellSize`, `cy = (scrollY + innerHeight/2)/cellSize`.
La card GoL ha canvas alto quanto tutto il documento → senza scrollY il centro
sarebbe al centro del documento, non dello schermo.

### Feature: info card pattern
Hover su pattern → card descrizione appare a destra del controller
(`position: absolute; left: calc(100% + 1rem); bottom: 0`). Click pattern:
pattern caricato + card rimane visibile (`_infoLocked = true`). Hover su altro
pattern aggiorna la card anche se locked. X chiude e resetta il lock.

## 2026-05-08

### Refactor: engine numeri di riga unificato
Tutti i numeri di riga ora gestiti da `recomputeLineNumbers()` + attributi HTML
`data-rows`/`data-source`. Eliminato stato globale per sezione (`_afterToolsLine`
ecc.) che causava numeri sbagliati quando le sezioni cambiavano altezza.
Animazione "uno alla volta" preservata via `data-fixed-rows` override temporaneo.

### Fix: scroll clamping oltre graffa finale
`ghostRenderAndPlace` settava `body.minHeight = finalDocH + 35%vh` che vinceva
su `body.style.height = finalH` in `placeFinalBraceAndLine`. Fix: reset
`minHeight` prima di clampare, + pin `documentElement.style.height`.

### Fix: scroll orizzontale eliminato
`overflow-x: hidden` spostato da `body` a `html`. Su body crea un nuovo
containing block per `position: fixed` (bug noto Safari/WebKit).

### Fix: GoL focus mode + position:fixed
`document.body.style.overflow = "hidden"` → `document.documentElement.style.overflow`.
Stesso motivo: overflow su body rompe `position: fixed` degli elementi figli.

### Fix: #theme-toggle position
`position: fixed` → `position: absolute`. Il bottone resta in cima al documento
e scrolla via verso l'alto quando l'utente scrolla (non segue il viewport).

### Rimosso: cursore personalizzato
`#custom-cursor` div, CSS (`cursor: none` su 9 selettori), JS block — tutti rimossi.
Ripristinato `cursor: pointer` sulle card espandibili.

---

## 2026-05-07

### Feature: GoL focus mode (FLIP morph)
Card GoL si trasforma in controller fullscreen via FLIP animation (700ms).
Sezioni fade-out, celle diventano bianche, card reparentata in body per evitare
opacity inheritance dal genitore in fade. Exit con FLIP inverso.

### Feature: tweaks card GoL
Slider velocità (mapping invertito: sinistra=lento), 3 modalità penna
(cell/draw/glider), bottoni con stato `.is-active`. Container separato
`.gol-speed-wrap` per evitare conflitti con l'animazione JS del pannello descrizione.

---

## 2026-05-06

### Feature: espansione card progetti
Accordion con `max-height` misurato, `pumpLayoutDuring(400)` per sync indent line,
`recomputeProjLines` (ora `recomputeLineNumbers`) per aggiornare numeri.

### Feature: card Game of Life con controlli
Pause/play, clear, reseed. Tooltip via `data-tooltip` + CSS `::after`.

---

## Precedente

Sito iniziale: typing animation nome, sezioni code-editor (numeri riga, indent line,
graffa finale), tema dark/light, sfondo Game of Life toroidale.
