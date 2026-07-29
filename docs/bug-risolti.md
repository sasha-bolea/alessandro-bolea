# Bug risolti

Registro append-only. Il più recente in cima.

---

## 2026-07-29 — Snap al multiplo di riga rimandato a fine scrittura

**Sintomo** La pagina è più corta di circa mezzo centimetro durante la
scrittura; a fine animazione si assesta con un piccolo scroll automatico.
**Causa** `lineRows()` in modalità `dynamic-block` arrotonda l'altezza dei
`.code-block` al multiplo di riga scrivendone la `minHeight`, ma controlla
`data-fixed-rows` **prima** di tutto e ritorna subito. Durante la rivelazione
quei body hanno `fixed-rows`, quindi non venivano mai pinnati: il pin arrivava
tutto insieme quando l'ultima sezione cancellava l'attributo, e quattro body
crescevano ciascuno fino a una frazione di riga.
**Fix** `snapBodyHeights()`: toglie temporaneamente `fixed-rows`, lascia che
`recomputeLineNumbers` misuri e pinni, poi lo rimette. Chiamata a fine
`buildAll`, su `fonts.ready` e su resize dopo `fitCardRow`.
**File** `script.js`

## 2026-07-29 — Righe vuote di coda che collassavano

**Sintomo** Il documento cresceva di una riga per sezione a fine scrittura.
**Causa** Le righe vuote in coda a ogni sezione contengono **solo** lo span dei
numeri; azzerandolo con `fixed-rows="0"` collassavano a zero.
**Fix** Classe `.ty-reserve` con `min-height: 1lh` finché il numero non compare.
**File** `script.js`, `style.css`

## 2026-07-29 — Scatto finale dell'altezza di pagina

**Sintomo** Scrollando in fondo durante la generazione il contenuto compariva
prima della fine, e a scrittura conclusa la vista saltava di ~1.5 schermate.
**Causa** Due cose insieme. Le quattro sezioni riservavano `min-height: 80vh`
(320vh mai usati) rilasciati tutti insieme a fine typing. E il canvas del Game
of Life, `absolute` e alto quanto il documento, mascherava ogni accorciamento:
il suo poll misurava `scrollHeight` con il canvas in posizione, quindi il valore
non scendeva mai. Il debito si accumulava e `placeFinalBraceAndLine` lo saldava
in un frame.
**Fix** Riserve rimosse (split build/reveal), `measureDocH()` in `gol.js` che
azzera il canvas prima di misurare, altezza consolidata in `pinDocHeight()`.
**File** `script.js`, `style.css`, `gol.js`

## 2026-07-29 — Cursore di scrittura fermo a fine riga

**Sintomo** Mentre si scrive la chiave di una riga, il cursore lampeggiante
resta fermo dopo la chiave a lunghezza piena invece di seguire i caratteri.
**Causa** `contact-cursor` era una classe statica sul **valore**, messa alla
costruzione. Con il testo completo già nel DOM ogni elemento riserva il suo
spazio, quindi il cursore finiva dove il testo *finirà*, non dove sta scrivendo.
**Fix** È `typeInto` a mettere e togliere `typing-cursor` sull'elemento che sta
effettivamente scrivendo; il CSS lo aggancia a `.ty-done`. Classe
`contact-cursor` eliminata.
**File** `script.js`, `style.css`

## 2026-07-29 — Barra di sezione a lunghezza piena prima della scrittura

**Sintomo** La barra verticale di una sezione era già lunga tutta prima che il
titolo venisse scritto.
**Causa** `setBlockH` misura fino alla riga di chiusura, e col contenuto già
costruito quella distanza è subito quella finale. `refreshAllBlockH()` gira su
`document.fonts.ready`, quindi scattava ancora prima del typing.
**Fix** Se nel body c'è ancora un `.ty-pending`, la barra si ferma al fondo
dell'ultimo elemento scoperto (tracciato in `_lastRevealed`), zero se nessuno.
**File** `script.js`

## 2026-07-29 — Freccette di fold di sezione invisibili

**Sintomo** Compariva solo la freccetta del blocco globale.
**Causa** I `<button>` non ereditano il font: lo user agent impone
`13.3px Arial`. Solo la maniglia globale aveva un `font-size` esplicito; le
altre dimensionavano il chevron a `1ch` di Arial 13px, circa 7px.
**Fix** `font: inherit` su `.fold-handle`.
**File** `style.css`

## 2026-07-29 — Freccetta di fold non riempiva la sua cella

**Sintomo** Il chevron risultava di dimensione imprevedibile rispetto al box.
**Causa** `viewBox="0 0 16 16"` con `preserveAspectRatio` di default: scalatura
uniforme fino a entrare nella dimensione minore, e la polilinea occupava solo la
fascia centrale del viewBox.
**Fix** viewBox stretto attorno alla sola freccetta (`0 0 6 10`) con
`preserveAspectRatio="none"` e `vector-effect="non-scaling-stroke"`.
**File** `script.js`, `style.css`

## 2026-07-29 — Rimozione dei tech tag non partiva mai

**Sintomo** Restringendo la pagina, i tag delle card progetto non venivano mai
rimossi e la descrizione si schiacciava.
**Causa** `.proj-desc` andava a capo invece di traboccare, quindi la riga non
superava mai il budget di 4.5em e la logica di rimozione non scattava.
**Fix** Prima misura in larghezza con desc su riga singola, poi (su richiesta)
misura in altezza con desc che può andare a capo entro l'altezza della card.
**File** `script.js`, `style.css`

## 2026-07-29 — Barre di sezione stale dopo resize

**Sintomo** Ridimensionando la finestra, le barre verticali di percorso,
strumenti e contatti restavano dell'altezza precedente.
**Causa** Il listener di resize chiamava `recomputeLineNumbers()` ma mai
`setBlockH()`, e solo `#projects-list` aveva un `ResizeObserver`.
**Fix** `refreshAllBlockH()`, che gira sulle chiavi di `BLOCK_CLOSE_MAP`.
**File** `script.js`

## 2026-07-29 — Ricorsione infinita in `setBlockH`

**Sintomo** Latente, mai osservato. Chiamare `setBlockH` con un `.code-block`
non presente in `BLOCK_CLOSE_MAP` causava stack overflow immediato.
**Causa** Il ramo `if (!closeEl)` richiamava `setBlockH(bodyEl)` con lo stesso
identico argomento invece di uscire.
**Fix** `return`.
**File** `script.js`

## 2026-07-29 — `pumpLayoutDuring` copriva solo i progetti

**Sintomo** Latente fino al folding. `setBlockH` e `no-block-transition` erano
cablati su `#projects-list`, quindi ogni animazione di altezza in altre sezioni
avrebbe lasciato le loro barre indietro di 320ms.
**Fix** Generalizzato a tutti i `.code-block`.
**File** `script.js`

## 2026-07-29 — Solo il primo link di una card fermava la propagazione

**Sintomo** Cliccando il secondo link di una card progetto la card si apriva o
chiudeva.
**Causa** `querySelector` invece di `querySelectorAll`.
**Fix** `querySelectorAll(...).forEach(...)`.
**File** `script.js`
