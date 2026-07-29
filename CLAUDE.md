# alessandro-bolea

## 1. Progetto & scopo

Sito personale di Alessandro Bolea, pagina singola con estetica "code editor":
la pagina si scrive da sola con un'animazione di typing, con numeri di riga,
barre di indentazione e graffa di chiusura. Sfondo: Game of Life su canvas.
Vetrina personale, non un prodotto.

## 2. Team & ruoli

Solo Alessandro (`sasha-bolea`).

## 3. Stack

HTML/CSS/JS **vanilla**. Nessun bundler, nessun framework, nessuna dipendenza
npm, nessuno step di build. Font Hack da CDN jsDelivr. Canvas 2D per il Game of
Life. Hosting su GitHub, repo `sasha-bolea/alessandro-bolea`, branch `master`.

Quirk d'ambiente: in Git Bash su questa macchina `python` non esiste, c'è `py`.

## 4. Struttura chiave

Tutto alla root, niente `src/`:

- `index.html` — markup, gli shell delle sezioni con `data-rows`/`data-source`
- `style.css` — tema, layout, design system
- `script.js` — typing, numeri di riga, geometria, folding, skip
- `gol.js` — Game of Life a tutto documento
- `docs/` — vedi sezione 7

## 5. Comandi

```bash
py -m http.server 8000     # server statico, poi http://localhost:8000
node --check script.js     # controllo di sintassi (non cattura errori a runtime)
```

**Dopo ogni modifica alzare il `?v=` in `index.html`** — `style.css`,
`script.js` e `gol.js` hanno contatori separati — e ricaricare con
Ctrl+Shift+R. Senza, il browser serve i file vecchi e sembra che il fix non
funzioni.

## 6. Convenzioni

- **Committare a ogni checkpoint verificato**, non a fine sessione. Un restore
  andato male ha già lasciato il file corrotto senza rete di recupero.
- Ogni sezione nuova va registrata in cinque punti: `sec`/`secOrder`,
  `syncLnWidth`, `BLOCK_CLOSE_MAP`, `SECTION_KEY_BY_ID` e `buildAll`.
- Contenuto in attesa di essere rivelato: `visibility: hidden`, mai
  `display: none` — lo spazio deve restare occupato.
- L'altezza del documento si scrive **solo** in `pinDocHeight()`, e nell'ordine
  `recomputeLineNumbers` → `refreshAllBlockH` → `repositionBrace`.
- Verifica: `node --check` non basta quasi mai. Il controllo vero è nel browser,
  con passi numerati e un risultato atteso per ciascuno.

## 7. Riferimenti docs

- [docs/STATO.md](docs/STATO.md) — stato, problemi aperti, decisioni, backlog
- [docs/architettura.md](docs/architettura.md) — i cinque meccanismi non ovvi
- [docs/design-system.md](docs/design-system.md) — catalogo UI, **da consultare
  prima di toccare l'interfaccia**
- [docs/bug-risolti.md](docs/bug-risolti.md) — registro bug
- [docs/storico-sessioni.md](docs/storico-sessioni.md) — archivio sessioni

Legacy, non aggiornati e non da adottare: `docs/INDEX.md`, `docs/CHANGELOG.md`.
