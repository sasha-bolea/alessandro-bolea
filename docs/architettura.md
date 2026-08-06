# Architettura

Stack: HTML/CSS/JS vanilla, nessun bundler, nessuna dipendenza. Font Hack da
CDN. File alla root: `index.html`, `style.css`, `script.js`, `gol.js`.

Cinque meccanismi non ovvi, tutti in `script.js` salvo dove indicato.

## 1. Build / reveal

Ogni sezione ha due funzioni: `buildX()` sincrona che produce il DOM **finale**,
e `revealX()` async che lo scopre. Tutte le `buildX` girano in `buildAll()` al
caricamento, quindi il layout è definitivo dal primo frame e la pagina non
cambia mai lunghezza mentre si scrive.

Gli elementi non ancora scoperti portano `.ty-pending` (`visibility: hidden`,
non `display`, così lo spazio resta occupato). Il testo usa `prepType()`, che
mette il contenuto finale in uno `.ty-rest` invisibile; `typeInto()` sposta i
caratteri in `.ty-done`. L'a-capo è quindi già quello definitivo.

**`typeInto` è l'unica primitiva di ritardo del typing**: tutte le attese
passano da lì → `fast()`. L'unica eccezione è `animateName()`, che ha il suo
`skipNameAnim` separato.

## 2. Numeri di riga

`recomputeLineNumbers()` scorre tutti gli `.line-numbers` in ordine DOM con un
solo contatore, leggendo `data-rows`/`data-source` dall'HTML. Modalità:
`dynamic`, `dynamic-block`, `conditional`, `empty-after`, più l'override
`data-fixed-rows` che vince su tutto.

Due usi non ovvi di quell'override:

- **Rivelazione progressiva.** Col DOM completo i numeri comparirebbero tutti
  insieme. `buildX` mette `fixed-rows="0"` sui quattro span della sezione,
  `revealX` li alza man mano. I numeri intermedi delle sezioni sotto sono
  sbagliati finché la rivelazione non arriva, ma sono comunque invisibili.
- **`snapBodyHeights()`.** In modalità `dynamic-block`, `lineRows()` arrotonda
  l'altezza del body al multiplo di riga scrivendone la `minHeight` — ma esce
  prima se c'è `fixed-rows`. Senza questa funzione il pin arriverebbe tutto
  insieme a fine scrittura e la pagina si allungherebbe.

## 3. Altezza del documento

`pinDocHeight()` è **l'unico** punto che la scrive. Ordine obbligato:

```
recomputeLineNumbers()  →  refreshAllBlockH()  →  repositionBrace()
```

`recomputeLineNumbers` muta il layout (ri-pinna le `minHeight`), quindi barre e
graffa vanno misurate dopo. Chiamata all'init, su `load`, su `fonts.ready`, su
resize e sul fold. **Non** nel tick di `pumpLayoutDuring`, perché
`__gol.resize()` riseeda la griglia e si vedrebbe.

Il canvas del Game of Life è `absolute` e contribuisce allo scrollable overflow.
`gol.js` deve quindi misurare con `measureDocH()`, che azzera il canvas prima di
leggere `scrollHeight` (o usa `body.style.height` se pinnata): misurando con il
canvas in posizione il valore non scenderebbe mai e gli accorciamenti sarebbero
invisibili.

## 4. Skip per elemento

`skip` non è uno stato ma un predicato: `_cursorBottom < _scrollY`, cioè "il
fondo dell'elemento in scrittura è già uscito dal viewport". Esposto come
**getter** su ogni voce di `sec` via `Object.defineProperty`, così i ~20 punti
che lo leggevano sono diventati per-elemento senza modifiche. Il setter è un
no-op voluto: lo script non è strict, senza di esso una vecchia assegnazione
sparirebbe in silenzio.

Nessuna lettura di layout sul percorso caldo: il layout è statico, quindi la
posizione di un elemento si misura **una volta sola** quando diventa quello in
scrittura (`setCursorEl`, chiamato da `updateIndentLineH`, che già riceve
l'ultimo elemento inserito in ogni punto di generazione).

Reversibile per costruzione: il predicato è puro rispetto a `scrollY`, quindi
risalendo l'animazione riprende senza latch da resettare.

## 5. Code folding

Due livelli annidati: la barra globale `#indent-line` e le barre di sezione
`.code-block::before`. Le maniglie stanno tutte nella stessa colonna, la
striscia fra i numeri (`--ln-w`, scritta da `syncLnWidth`) e `#indent-line`.

Le righe piegate **consumano numeri senza stamparli**:

```js
if (span.closest(".is-folded")) {
  span.textContent = "";
  cur += parseInt(span.dataset.trueRows || "0", 10);
  return;
}
```

`trueRows` è l'ultimo conteggio misurato mentre la regione era visibile, tenuto
nel DOM perché `recomputeLineNumbers` gira decine di volte al secondo.
L'annidamento viene gratis: `closest` risale a qualunque profondità.

## 6. Bilinguismo

`i18n.js` è caricato **prima** di `script.js` (entrambi `defer`, l'ordine dei tag
comanda) e definisce tre costanti globali che `script.js` legge: `LANG`, `T`
(contenuti della lingua attiva) e `U` (scorciatoia per `T.ui`, perché nei
template literal `${U.golPausaPlay}` resta leggibile e `${T.ui.golPausaPlay}`
no). Sono `const` al top level di uno script classico: non finiscono su `window`
ma sono visibili agli script caricati dopo.

`script.js` non sa nulla di lingue. I nomi che usava da sempre restano, legati
in sei righe:

```js
const ilMieiProgetti = T.progetti;   // e percorso, strumenti, contatti
```

Si traduce anche ciò che sembra codice: i titoli finti (`const percorso = {` →
`const path = {`) e le **chiavi** delle categorie strumenti, che diventano i
commenti `// linguaggi` → `// languages`.

Il cambio lingua **ricarica** la pagina. È voluto: la pagina si scrive da sola
con un motore di rivelazione a stati, e sostituire i testi a metà animazione
vorrebbe dire rifarne il percorso. Lo scroll è già in `sessionStorage`, quindi si
riparte dallo stesso punto con il testo già scritto — il ramo `wasScrolled`
riempie tutto istantaneamente.

Precedenza della lingua: scelta manuale in `localStorage` → `navigator.language`
→ italiano. La scelta manuale è definitiva e non viene mai riscritta dal
browser.

**Regola vincolante**: ogni chiave esiste in entrambi i rami. Un `en` incompleto
non degrada in italiano, dà `undefined` a schermo. Il controllo è un confronto
delle chiavi fra `CONTENUTI.it` e `CONTENUTI.en`.

## 7. Cancello di fine pagina

Specchio dello skip. Lo skip genera **senza animazione** ciò che è già uscito in
alto; il cancello **non genera affatto** ciò che cadrebbe sotto il bordo basso,
così la scrittura accompagna la lettura invece di correre avanti.

```js
function oltreLaPiega() { return _cursorTop > _scrollY + window.innerHeight; }
```

Il confronto è sul **top** dell'elemento in scrittura, non sul fondo: si aspetta
solo quando non se ne vede nemmeno l'inizio, quindi l'ultimo elemento visibile
viene scritto per intero invece di troncarsi a metà.

Non fa polling: `attendiRientro()` mette un resolver in `_attesaRientro`, e
`risvegliaScrittura()` li libera tutti. Va chiamata da ogni punto in cui la
piega o l'elemento si spostano: gestore di scroll (dopo l'aggiornamento di
`_scrollY`, che è il valore su cui il predicato si rivaluta), resize, e il tick
del pump quando una card si apre o si chiude.

Lo skip apre il cancello comunque (`!s.skip` nella condizione): scorrendo di
colpo in fondo non si resta appesi su un elemento che va solo riempito.

## Convenzioni

- **Cache busting**: dopo ogni modifica alzare `?v=` in `index.html`
  (`style.css`, `script.js`, `gol.js`, `i18n.js` hanno contatori separati).
- **Misure di altezza sempre frazionarie**: `getBoundingClientRect().height`,
  mai `offsetHeight`, dove il risultato viene diviso per un'interlinea.
  `offsetHeight` arrotonda all'intero e su cinquanta righe l'errore accumulato
  sfiora una riga.
- **`min-height` calcolato si arrotonda per eccesso** (`Math.ceil`): per difetto
  resta sotto l'altezza naturale, non morde, e il blocco tiene un'altezza che i
  numeri di riga non contano.
- **Chi imposta `overflow-x` dichiari anche `overflow-y`**: per specifica, se un
  asse è diverso da `visible` l'altro passa ad `auto`.
- **Verificare a tab in primo piano**: Chrome throttla `setTimeout` e `rAF`
  nelle tab in background, quindi le animazioni sembrano bloccate e si misurano
  stati a metà. Un'animazione ferma **a metà carattere** è throttling, non un
  bug. Vale anche per le **transizioni CSS**: `getComputedStyle` durante una
  transizione congelata restituisce il valore di **partenza**, quindi una regola
  sembra non applicarsi. Prima di misurare colori o trasformazioni, iniettare
  `*{transition:none !important; animation:none !important}`.
- **Mai mettere `repositionBrace()` dietro `if (window.indentDone)`**. È l'unico
  posto che scrive l'altezza del documento e `__maxScroll`: sotto quella guardia
  non gira durante la scrittura, e qualunque crescita del contenuto (card aperta,
  titolo allungato) rende il fondo pagina irraggiungibile. La sola parte legata
  al tween è l'altezza della barra, e `repositionBrace` la protegge già da sé.
  Lo stesso errore è stato reintrodotto tre volte.
- Ogni sezione nuova va aggiunta a mano a `BLOCK_CLOSE_MAP`, `syncLnWidth`,
  `SECTION_KEY_BY_ID`, `sec`/`secOrder` e a `buildAll`.
