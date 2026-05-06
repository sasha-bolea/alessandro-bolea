# alessandro-bolea — Wiki progetto

Aggiornato: 2026-05-06 19:57

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
- Click sullo sfondo → 1 cella nella posizione cliccata
- Card progetto "Game of Life" ha controlli pause/play, clear, reseed (SVG inline)

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
