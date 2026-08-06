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

### Striscia di screenshot
`.proj-shots` dentro `.proj-card-expanded-inner`, con `.proj-shot` (un `<a>` che
apre l'immagine in una tab nuova) e dentro l'`<img>`. Flex in riga con
`overflow-x: auto`; **la miniatura ha altezza fissa** (`9em`) e l'immagine
`height: 100%; width: auto`: così `inner.scrollHeight` in `setCardExpanded()` è
corretto anche prima che le immagini siano caricate, e il pannello non si taglia.
Dati: campo `screenshots: [{ src, alt }]` di `iMieiProgetti`; array vuoto =
nessuna striscia. File in `assets/screenshots/`.
Uso: `script.js` → `buildProjects()`, `style.css` → `.proj-shots`.

### Interruttore di lingua
`#lang-toggle` con due `.lang-opt` (`<button>`) separate da `.lang-sep`. Sta
sulla stessa riga del theme toggle, a `right: 13rem` per stargli a sinistra
senza sovrapporsi a `//Devs: Beware`. La lingua attiva prende `.is-active`
(colore `--text`), l'altra resta `--text-dim`: la selezione si legge dalla
luminosità, senza bordi né sfondi. Come il theme toggle diventa `fixed` in
focus mode. **Serve `font: inherit`** (vedi regola 3).
Uso: `index.html` → `#lang-toggle`, `script.js` → binding sotto il theme toggle.

### Albero dei rami (cb)
`<pre class="cb-tree">` con dentro `.cb-on` (percorso illuminato) e `.cb-cur`
(nodo del cursore, in grassetto). I due colori sono **letterali, non token**:
`#ff8c66` e `#8c8c8c` sono quelli veri della CLI `cb` (`src/stile.js` di quel
progetto), riprodotti perché l'albero è uno screenshot testuale del prodotto.
Nessun altro elemento del sito deve usarli. `overflow-x: auto`: l'albero è
largo e non deve allargare la card, con `overflow-y: hidden` esplicito accanto
(vedi regola 5). **`line-height: 1` è vincolante**: i tratti verticali di `┳` e
`┗` arrivano al bordo della cella, e qualunque interlinea in più li stacca
lasciando le giunzioni spezzate. I nodi sono `●` U+25CF e `○` U+25CB, non i
`⬤ ◯` della CLI: Hack non ha U+2B24 e il fallback lo rende largo 1.43 celle,
sfondando la griglia.
Uso: `script.js` → `iMieiProgetti`, card *Claude Code Branching*.

### Link della card progetto
`.proj-open-link`, uno per `link` e uno per `github`. L'etichetta del primo è
`open` per difetto e si cambia col campo `linkLabel` della voce di
`iMieiProgetti` (es. `npm` per un pacchetto pubblicato).
Uso: `script.js` → `buildProjects()`.

### Tech tag
`.tech-tag`, bordo `--line-bar`, testo `--text-dim`, si illumina all'hover della
card. Usato sia nelle card sia nei blocchi `dettagli`.

### Card icona strumento
`.tool-icon-card` in `.tools-icons-row`, dimensioni fisse `1.8em` per l'icona:
nessun layout shift al caricamento delle SVG. La card ha altezza fissa
`4.5em`: un'etichetta lunga va a capo su due righe e ci sta ancora (es.
`Claude Code`).
Uso: `script.js` → `buildTools()`.

### Glifi degli strumenti
Tutte le icone in `assets/icons/` sono **disegnate per questo sito**: nessun
logo di terzi nel repo. Rappresentano *cosa fa* lo strumento, non che aspetto
ha il suo marchio — i nomi dei prodotti compaiono solo come etichetta scritta
(uso nominativo). Regole per aggiungerne uno:
- viewBox `0 0 24 24`, tratto `stroke="#000000"`, `stroke-width="1.8"`,
  `stroke-linecap`/`linejoin` `round`; i pieni usano `fill="#000000"`;
- **sempre `invert: true`** nella mappa: il nero è la sorgente, il tema scuro
  lo inverte in bianco. Le due regole `[data-theme=…] img[data-invert]` in
  `style.css` applicano la stessa `opacity(0.75)` in entrambi i temi, così i
  glifi non pesano più delle etichette.
Uso: `script.js` → `techIconMap`, `style.css` → `.tool-icon-card img`.

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
5. Chi imposta `overflow-x` deve dichiarare anche `overflow-y`: per specifica,
   se un asse è diverso da `visible` l'altro passa da `visible` ad `auto`, e
   basta 1px di sforo per far comparire una scrollbar non voluta.
