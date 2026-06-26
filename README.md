# alessandro-bolea

Sito personale / portfolio di **Alessandro Bolea**, con estetica da editor di codice: numeri di riga dinamici, tema chiaro/scuro, sezioni che si rivelano come blocchi di codice e qualche easter egg.

In background gira una simulazione del **Game of Life** di Conway (`gol.js`).

## Stack

- **Vanilla HTML/CSS/JS** — nessun framework, nessuna build
- Font [Hack](https://sourcefoundry.org/hack/) via CDN
- Icone tecnologie in `assets/icons/`

## Struttura

```
index.html   → markup con sistema di numeri di riga dinamici
script.js    → rendering contenuti, tema, easter egg
gol.js       → Game of Life in background
style.css    → stili + temi dark/light
docs/        → changelog e indice di progetto
```

## Avvio locale

Sito statico, basta aprirlo:

```bash
npx serve .
```
