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

## Convenzioni

- **Cache busting**: dopo ogni modifica alzare `?v=` in `index.html`
  (`style.css`, `script.js`, `gol.js` hanno contatori separati).
- Ogni sezione nuova va aggiunta a mano a `BLOCK_CLOSE_MAP`, `syncLnWidth`,
  `SECTION_KEY_BY_ID`, `sec`/`secOrder` e a `buildAll`.
