# Bug risolti

Registro append-only. Il più recente in cima.

---

## 2026-08-06 — Interlinea disuguale fra i numeri di riga ai confini di blocco

**Sintomo** Fra due numeri consecutivi comparivano salti: 23,4px al confine del
blocco progetti, 11px su quello degli strumenti. Visibile come una riga più
distanziata delle altre nella gutter.
**Causa** Due difetti che si sommavano. `singleLineHeight()` misurava con
`offsetHeight`, **arrotondato all'intero**: restituiva `21` dove l'interlinea
reale è `20.67`, e su cinquanta righe l'errore accumulato sfiora una riga
intera. In più lo snap dei body usava `Math.round`: per i progetti
`round(1015/20.67) = 49` dà `min-height: 1013px`, ma `min-height` è un
**minimo** e sotto l'altezza naturale non morde — il blocco restava alto 1015px
mentre i numeri ne contavano 1013.
**Fix** `getBoundingClientRect().height` al posto di `offsetHeight` (misura
frazionaria) e `Math.ceil` al posto di `Math.round` nello snap, così il minimo
calcolato sta sempre sopra l'altezza naturale e vincola davvero. Allineati anche
gli altri due punti che dividevano un `offsetHeight` intero per lo `slh` ora
frazionario (`lineRows` caso `dynamic`, `updateNameLn`).
**Verifica** 86 numeri renderizzati, delta uniforme 20.6/20.7px e un solo salto
voluto (441px, nome → bio).
**File** `script.js`

## 2026-08-06 — Il corpo del sito si sovrapponeva al titolo con un nome lungo

**Sintomo** Scrivendo un nome lungo nell'h1 editabile, il testo del titolo
finiva sopra il corpo della pagina.
**Causa** `updateRevealPos()` calcolava la posizione del corpo con
`(_h1ReservedH || h1.offsetHeight)`, cioè **solo** la riserva misurata una volta
da `measureH1Height()` sui due testi dell'animazione. La riserva serve a tenere
fermo il margine mentre il nome si digita, ma è un `min-height`, non un tetto:
un nome più lungo faceva crescere l'h1 oltre, e il margine del corpo restava
fermo.
**Fix** `Math.max(_h1ReservedH, h1.offsetHeight)` — la riserva diventa un
pavimento. Fino a 40 caratteri il comportamento è identico a prima (vince la
riserva); oltre, il gap resta costante invece di andare in negativo (−119px a 80
caratteri, −1463px a 300 con la formula vecchia).
**File** `script.js`

## 2026-08-06 — Fondo pagina irraggiungibile dopo aver allungato il titolo

**Sintomo** Scrivendo nel titolo non si riusciva più a scorrere fino in fondo,
finché la generazione del testo non era completa.
**Causa** Crescendo l'h1 tutto il contenuto sotto scende, ma l'altezza del
documento è **fissata** in px da `repositionBrace` e `__maxScroll` ne discende:
restavano al valore vecchio. Con 220 caratteri il fondo reale arrivava a 3403px
mentre si poteva scorrere solo a 2351 — 1052px fuori portata, sbloccati solo a
fine generazione da `placeFinalBraceAndLine`.
**Causa a monte** Un guard `if (window.indentDone)` che avevo messo sulla
chiamata a `pinDocHeight()` in `updateNameLn`, nel timore di disturbare il tween
della barra: durante la scrittura del nome `indentDone` è `false`, quindi il
ri-fissaggio non scattava mai.
**Fix** Rimosso il guard. L'unica parte sensibile al tween è
`indentLine.style.height`, e `repositionBrace` la protegge già da sé con
`indentDone`; il resto è sicuro in qualunque momento, tant'è che `pinDocHeight()`
gira già al load.
**File** `script.js`

## 2026-08-06 — Mini scrollbar dentro la card del progetto cb

**Sintomo** Una scrollbar in miniatura compariva nel blocco dell'albero dei rami.
**Causa** Per specifica CSS, se un asse di `overflow` è diverso da `visible`
l'altro passa da `visible` ad `auto`. Avendo scritto solo `overflow-x: auto`,
`overflow-y` risultava `auto` senza averlo dichiarato, e con `line-height: 1` il
contenuto sfora di 1px: quel pixel bastava.
**Fix** `overflow-y: hidden` esplicito accanto a `overflow-x`. Orizzontalmente
non sforava affatto (956 = 956), quindi la scrollbar visibile era solo quella
verticale.
**File** `style.css`

## 2026-08-06 — Griglia dell'albero cb sfalsata a ogni nodo

**Sintomo** Nell'albero dei rami i nodi non stavano in colonna e le giunzioni
non combaciavano.
**Causa** `⬤` (U+2B24) è largo 12,97px contro una cella monospace di 9,06px:
Hack non ha quel carattere e il fallback lo rende 1,43 celle. Ogni nodo
spostava la riga.
**Fix** Sostituiti `⬤ ◯` con `● ○` (U+25CF / U+25CB), il set di ripiego previsto
da cb stesso in `src/vista.js:21` — misurati tutti 9,06px come `━ ┳ ┗`. In più
`line-height: 1`, perché con interlinea maggiore i tratti verticali di `┳` e `┗`
non arrivano a toccarsi.
**Verifica** Le tre righe misurano 28,98 / 24,98 / 29,98 celle contro 29 / 25 /
30 caratteri.
**File** `script.js`, `style.css`

## 2026-08-06 — I link della card si illuminavano tutti insieme

**Sintomo** Passando il mouse sulla card, `npm` e `github` si accendevano
entrambi e non si capiva quale si stesse per cliccare.
**Causa** La regola era `.project-card:hover .proj-open-link`, legata all'hover
della card e non del link.
**Fix** `.proj-open-link:hover`.
**File** `style.css`

## 2026-08-06 — Numero di riga della graffa fuori dalla colonna a tre cifre

**Sintomo** Superate le 99 righe, il numero finale (scritto a 7.5vw come la
graffa) finiva sotto la parentesi.
**Causa** Lo spazio disponibile è la colonna dei numeri più il suo margine,
133px a 1280px di viewport: due cifre stanno (115,6px), tre no (173,4px).
**Fix** `fitBraceLn()` riduce il font solo quando il numero sfora, e blocca
`line-height` all'altezza del font pieno così le cifre restano centrate dove
stavano invece di risalire sopra la graffa. A 1-2 cifre non tocca nulla.
**File** `script.js`

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
