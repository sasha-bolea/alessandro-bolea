# Design system

Catalogo degli elementi UI riutilizzabili. **Consultarlo prima di costruire o
modificare qualunque interfaccia**: riusare quello che c'è invece di creare
nuovi elementi. Va aggiornato nel momento in cui si aggiunge o si cambia un
elemento, non a fine sessione.

## Token

| Token | Ruolo |
|---|---|
| `--bg` / `--text` | Fondo e testo, invertiti da `[data-theme="light"]` |
| `--text-dim` | Testo secondario e stato a riposo degli elementi interattivi |
| `--line-bar` | Barre di indentazione e bordi dei tag |
| `--cursor-color` | Cursore di scrittura |
| `--accent` | `#4ec9b0`, solo il pallino del theme toggle |
| `--ln-w` | Larghezza della colonna dei numeri, scritta da `syncLnWidth` |
| `--block-h` | Altezza della barra di sezione, scritta da `setBlockH` |

Corpo del testo: `clamp(18px, 2.2svh, 2rem)`. **Sempre `svh`, mai `vh`**: con
`vh` la barra URL su mobile cambia il font-size e con esso l'altezza della
pagina. Titoli e graffa: `7.5vw`.

## Struttura di una sezione

Quattro `.code-row` in fila: titolo, corpo (`.code-block`), chiusura, riga
vuota. Ogni `.code-row` è `position: relative` perché ospita la maniglia di
fold. Esempio: `index.html` → `#percorso-section`.

## Elementi

### Riga chiave → valore
`.perc-row` / `.contact-link`, con `.perc-key`+`.perc-val` o
`.contact-key`+`.contact-val` separati da `.contact-sep`. Le voci con `href`
diventano `<a>`, le altre `<div>`. Hover: il valore passa da `--text-dim` a
`--text`.
Uso: `script.js` → `buildPercorso()`, `buildContatti()`.

### Card progetto
`.project-card` con `.proj-card-row` ad **altezza fissa** (`--row-h: 4.5em`,
`overflow: hidden`) e `.proj-card-expanded` che si apre al click. La riga chiusa
non cresce mai: `fitCardRow()` nasconde i tech tag e poi la descrizione.
Uso: `script.js` → `buildProjects()`.

### Tech tag
`.tech-tag`, bordo `--line-bar`, testo `--text-dim`, si illumina all'hover della
card. Usato sia nelle card sia nei blocchi `dettagli`.

### Card icona strumento
`.tool-icon-card` in `.tools-icons-row`, dimensioni fisse `1.8em` per l'icona:
nessun layout shift al caricamento delle SVG.
Uso: `script.js` → `buildTools()`.

### Maniglia di fold
`.fold-handle` (un `<button>`) con dentro `.fold-chevron`. Sta in overlay nella
gutter, larga `1cm` da `--ln-w`, centrata. Il chevron è `1ch × 1em` meno 2px, in
modo da occupare una cella di carattere della colonna dei numeri; punta a destra
da piegato, in basso da espanso.
**Serve `font: inherit`**: i `<button>` non ereditano il font e prenderebbero il
13.3px Arial dello user agent, facendo collassare `1ch`.
Uso: `script.js` → `ensureFoldHandles()`.

### Cursore di scrittura
Classe `typing-cursor` sull'elemento, `::after` agganciato a `.ty-done`. La
mette e la toglie `typeInto` sull'elemento che sta scrivendo in quel momento:
metterla altrove la lascerebbe ferma, perché ogni elemento riserva già lo spazio
del suo testo completo.

### Stati di rivelazione
`.ty-pending` (elemento non ancora scoperto) e `.ty-rest` (testo non ancora
scritto): entrambi `visibility: hidden`, **mai `display: none`**, perché lo
spazio deve restare occupato. `.ty-reserve` riserva una riga agli span dei
numeri che sarebbero vuoti.

## Regole vincolanti

1. Niente `vh` nei font-size: usare `svh`.
2. Nascondere contenuto in attesa di rivelazione con `visibility`, mai con
   `display`: `display: none` cambierebbe l'altezza della pagina.
3. Ogni nuovo `<button>` che deve seguire il testo va con `font: inherit`.
4. Le animazioni di dimensione vanno accompagnate da `pumpLayoutDuring()`,
   altrimenti barre, graffa e altezza del documento restano indietro.
