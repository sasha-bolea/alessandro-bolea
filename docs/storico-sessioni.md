# Storico sessioni

Archivio append-only. Il più recente in cima.

---

## 2026-08-06 12:20 — Generazione a fine pagina, contrasto giorno, GoL domato

Sessione di rifinitura partita da una richiesta di comportamento e finita a
scoprire che stavamo guardando due siti diversi.

### Come è andata

Prima cosa: la **generazione si ferma a fine pagina visibile** e riprende allo
scroll. È lo specchio dello skip che esisteva già, quindi è venuto naturale
(vedi architettura §7). Il nodo non era il cancello ma distinguere il proprio
scroll da quello dell'utente: l'auto-scroll che segue la scrittura del nome
avrebbe fatto partire il corpo. Risolto usando la **destinazione come firma**,
senza timer.

Poi il **contrasto del tema giorno**. Misurando è venuto fuori che i valori
chiari erano il riflesso di quelli scuri, e che il nero su fondo caldo rende
meno: il giorno perdeva su ogni elemento. Le celle del Game of Life invece
andavano nella direzione opposta — più marcate che di notte — e sono state
schiarite.

Il **Game of Life che si ripopolava** dopo "pulisci griglia" ha richiesto un
flag solo, perché le sorgenti erano tre e andavano spente insieme.

Poi il pezzo che è costato di più, ed è colpa mia. Il fix del GoL "non
funzionava" per diversi giri: ho ipotizzato la cache del browser e ho dato a
Sasha un controllo da fare in console. Ha risolto lui mandando una **registrazione
dello schermo**: nella barra degli indirizzi c'era `alessandrobolea.com`, non
`localhost`. Stava provando in produzione, dove il fix non era mai stato
pubblicato. Da lì è nato `docs/deploy.md`, che non esisteva: il sito è su Vercel
collegato a `master`, e nel repo non c'è **nessun file** che lo dica.

Ultimo blocco, due bug di layout scoperti aprendo una card a metà animazione:
scroll bloccato e barra di indentazione ferma. Il primo era di nuovo una guardia
`indentDone` su `repositionBrace()` — la terza volta che lo stesso errore
produce lo stesso danno. Ora è una regola scritta nelle convenzioni.

**Sul metodo**: tre diagnosi false in una sessione, tutte dallo stesso
meccanismo. La tab in background sospende `rAF` e le transizioni CSS, e
`getComputedStyle` durante una transizione congelata restituisce il valore di
partenza — quindi una regola sembra non applicarsi e un'animazione sembra
bloccata. Una volta ho anche letto come "base" un `<style>` di prova rimasto
da una chiamata precedente. Da qui la convenzione di spegnere transizioni e
animazioni prima di misurare, e di ripulire gli stili iniettati.

### Cambiamenti al codice

**Cancello di fine pagina**
- `script.js` → `_cursorTop`, `oltreLaPiega()`, `_attesaRientro`,
  `risvegliaScrittura()`, `attendiRientro()`; `fast()` diventa async e attende
- gestore di scroll e resize → `risvegliaScrittura()`

**Tema chiaro**
- `style.css` → `--text-dim` 0,22 → 0,34 · `--line-bar` 0,15 → 0,30 ·
  `--gol-cell` `rgb(205,200,192)` → `rgb(222,217,209)`

**Interruttore di lingua**
- `style.css` → `#lang-toggle` da `right: 13rem` a `left: 2rem`
- `style.css` → `body.gol-focus-mode #lang-toggle { display: none }`

**Game of Life**
- `gol.js` → flag `spawnAutomatico`, in AND nelle tre sorgenti di ripopolamento;
  abbassato da `clear()` e `loadPattern()`, rialzato da `reseed()`

**Focus mode**
- `style.css` → media query 601–950px: plancia spostata di 148px così plancia e
  info card risultano centrate come gruppo, incluso lo stato collassato

**Apertura card durante la scrittura**
- `script.js` → in `pumpLayoutDuring()` e `recomputeProjLines()`:
  `repositionBrace()` senza guardia `indentDone`,
  `updateIndentLineH(_cursorEl)` per riallineare cursore e bersaglio della barra,
  `risvegliaScrittura()`

**Docs**
- `docs/deploy.md` **nuovo**: Vercel da `master`, push = pubblicazione, come
  verificare cosa c'è online dai contatori `?v=`

## 2026-08-06 09:15 — Card cb, bilinguismo IT/EN, titolo editabile domato

Sessione a raffica: una card nuova, poi otto correzioni nate guardando il
risultato a schermo, poi il pezzo grosso, l'inglese.

### Come è andata

Aperta con un allineamento al remote che ha evitato un guaio: le quattro
modifiche non committate in working tree erano un **rollback stale**, non lavoro
nuovo. `script.js` puntava a `assets/icons/*-original.svg`, file che il commit
`b06ffaa` aveva già sostituito — committarle avrebbe rotto 12 icone in
produzione. Anche i `?v=` andavano indietro (27→26, 39→38). Scartate, pushati i
tre commit sani.

Poi la **card del progetto cb** (`claude-code-branching`, CLI pubblicata su
npm), costruita riusando i pattern esistenti dei dettagli: zero CSS nuovo
tranne il blocco dell'albero.

Da lì una sequenza di correzioni tutte partite da uno screenshot: l'albero dei
rami con i glifi che sfondavano la griglia, la mini scrollbar, l'hover dei link,
il numero della graffa a tre cifre, l'interlinea disuguale, il corpo che si
sovrapponeva al titolo, il fondo pagina irraggiungibile. Sette bug, tutti in
`bug-risolti.md`.

Due li ho causati io e corretti nella stessa sessione: lo sfalsamento del terzo
ramo dell'albero (l'avevo introdotto su richiesta, ma si legge come errore) e il
guard `indentDone` su `pinDocHeight`, che bloccava il ri-fissaggio dell'altezza
proprio durante la scrittura del nome.

**Un falso allarme da ricordare**: avevo riportato come bug preesistente dei
`data-fixed-rows` residui e tre sezioni ferme a `done=false`. Non era vero. Era
Chrome che **throttla i timer nelle tab in background**, con `setTimeout` a una
volta al secondo o meno: fotografavo stati a metà animazione. La prova è che il
github era fermo a metà carattere (`"github.com/sasha-bo`) — un blocco vero non
si ferma a metà stringa. Confermato identico su HEAD con `git stash`.

Chiusa con il **bilinguismo**. Scelte concordate: ricarica invece di scambio a
caldo, interruttore `IT | EN`, default dalla lingua del browser.

### Cambiamenti al codice

**Card progetto cb**
- `script.js` → voce in `iMieiProgetti`: nome, desc, 5 righe di funzionalità,
  albero dei rami, tech, `status: LIVE`, link npm e github
- `script.js` → `buildProjects()`: campo opzionale `linkLabel` (default `open`),
  perché la label era cablata per tutti i progetti e Royale Arena è un sito, non
  un pacchetto
- `style.css` → `.cb-tree`, `.cb-on`, `.cb-cur`

**Albero dei rami**
- glifi `⬤ ◯` → `● ○`; `line-height: 1` vincolante; `overflow-y: hidden`
  esplicito; colori `#ff8c66` / `#8c8c8c` presi da `cb/src/stile.js`

**Numeri di riga**
- `singleLineHeight()` → `getBoundingClientRect().height` (misura frazionaria)
- `lineRows()` caso `dynamic-block` → `Math.ceil` al posto di `Math.round`
- `lineRows()` caso `dynamic` e `updateNameLn()` → rect frazionario anche lì

**Graffa finale**
- `script.js` → `fitBraceLn()`, chiamata da `repositionBrace()`

**Titolo editabile**
- `updateRevealPos()` → `Math.max(_h1ReservedH, h1.offsetHeight)`
- `updateNameLn()` → `pinDocHeight()` quando cambia il numero di righe
- `keydown` → guardia `(!animFinished || hasTyped)`: si scrive solo nella
  finestra fra fine animazione del nome e partenza del corpo
- gestore di scroll → `deactivateCursor(fullName)` quando il corpo parte
- `keepNameCaretVisible()` + `nameScrollTarget`: la pagina segue il punto di
  scrittura, e il gestore di scroll riconosce il proprio scroll dalla
  destinazione invece di usare un timer

**Interfaccia**
- `style.css` → `.proj-open-link:hover` al posto di
  `.project-card:hover .proj-open-link`
- `style.css` → `#lang-toggle`, `.lang-opt`, `.lang-sep`

**Bilinguismo**
- `i18n.js` **nuovo** (507 righe): `LANG`, `T`, `U`, `cambiaLingua()`, contenuti
  completi in italiano e inglese
- `script.js` → −175 righe di dati, sostituite da sei binding su `T`; bio,
  titoli di sezione, tooltip, aria-label, slider GoL, easter egg,
  `GOL_PATTERN_INFO` e label del theme toggle parametrizzati
- `index.html` → `#lang-toggle`, `i18n.js` prima di `script.js`
- `script.js` → `document.documentElement.setAttribute("lang", T.htmlLang)`

## 2026-07-29 17:52 — Percorso, code folding, altezza fissa, skip per elemento

Sessione lunga, quattro blocchi di lavoro più una review e un incidente.

### Come è andata

Partiti da due modifiche piccole alle card progetto (link spostati nel
dettaglio, card ad altezza fissa), poi la sezione **percorso**, poi il **code
folding**, e infine il pezzo grosso: **altezza di pagina fissa** e **skip di
generazione per elemento**, pianificati insieme dopo una review del codice.

La review è nata su richiesta: prima di costruire il folding ho cercato bug
nella macchina di layout. Ne sono usciti tre reali (ricorsione in `setBlockH`,
barre stale dopo resize, `pumpLayoutDuring` parziale) più ~120 righe di codice
morto. Due segnalazioni raccolte in esplorazione si sono rivelate **false** e
sono state scartate dopo verifica diretta: un commento CSS presunto rotto e una
funzione presunta duplicata.

L'altezza fissa ha richiesto di scartare la strada ovvia. Un ghost render
(renderizza tutto, misura, svuota, rigioca) esisteva già in forma di codice
morto, ma è **impossibile** qui: solo `tools-body` e `projects-list` si svuotano
prima di rigenerarsi, quindi un secondo passaggio duplicherebbe le righe di
percorso e contatti. Da lì la scelta dello split build/reveal.

Tentativo fallito, poi annullato: rendere più fluida l'animazione delle linee di
indentazione. Tre giri (rampa a velocità costante, `lineSettled`, easing
lineare) e il risultato è peggiorato ogni volta. La combinazione fatale è stata
`easeOutCubic` più l'attesa di fine rampa: la linea si fermava del tutto a ogni
elemento. Tutto riportato allo stato precedente.

### Incidente

Un "restore code and conversation" ha riportato indietro la conversazione ma
**non** i file, e ha lasciato `script.js` corrotto: dentro `recomputeLineNumbers`
mancava una parentesi di chiusura, sostituita da sei righe vuote. Errore di
sintassi, quindi pagina completamente morta. Nessun commit era stato fatto in
tutta la sessione, quindi git non è servito a nulla: l'unico commit precedeva
l'intero lavoro. Riparato a mano dopo aver localizzato il danno con
`node --check` e una scansione dei cluster di righe vuote.

**Lezione:** committare a ogni checkpoint verificato, non a fine sessione.

### Cambiamenti al codice

**Card progetto**
- Link `→ open` / `→ github` spostati dal footer al blocco espanso
  (`.proj-card-links`); `querySelector` → `querySelectorAll` per fermare la
  propagazione su entrambi.
- `fitCardRow()`: la riga chiusa non cresce mai oltre `4.5em`. Nasconde i tech
  tag dall'ultimo dell'array `tech` tenendone almeno uno, poi la descrizione.
  Chiamata alla creazione, su resize e su `fonts.ready`.

**Sezione percorso** (nuova)
- `#percorso-section` in `index.html` fra reveal e strumenti, con i quattro
  `.code-row` standard.
- Dato `ilMioPercorso`, voci `{display, href}` rese come `<a>`.
- Aggiunta a `sec`/`secOrder`, `syncLnWidth`, `BLOCK_CLOSE_MAP`,
  `SECTION_KEY_BY_ID`; CSS `.perc-row`/`.perc-key`/`.perc-val`.

**Code folding**
- `foldRegions()`, `toggleFold()`, `ensureFoldHandles()`, `bindGutterHover()`.
- `recomputeLineNumbers`: ramo `.is-folded` che consuma numeri senza stamparli,
  con `dataset.trueRows`.
- `setBlockH`: barra a zero sui blocchi piegati; `repositionBrace`: graffa
  ancorata sotto il nome quando la riga di riferimento è nascosta.
- CSS `.fold-handle`, `.fold-chevron`, `.is-folded`, `--ln-w`.

**Review — fix**
- `setBlockH`: ricorsione infinita → `return`.
- `refreshAllBlockH()` nuova, usata su resize e nel pump.
- `pumpLayoutDuring` generalizzato a tutti i `.code-block`.
- Rimosse `placeBraceAtDocBottom`, `showIndentAndBrace`, `ghostRenderAndPlace`,
  `positionIndentLine`, `updateIndentLine` (~120 righe). Commento stantio in
  `gol.js` corretto.
- `singleLineHeight` con cache `WeakMap`, `getLineH` ridotta a wrapper;
  invalidazione su resize e `fonts.ready`.

**Altezza fissa**
- `gol.js`: `measureDocH()` condivisa fra `resize()` e il poll; guardia di
  idempotenza in `resize()`.
- `2.2vh` → `2.2svh` nei quattro font-size.
- `measureH1Height()`: riserva l'altezza dell'h1 sul più alto dei due testi
  dell'animazione.
- Le cinque funzioni di typing divise in `buildX()` + `revealX()`; helper
  `prepType`, `typeInto`, `rowsOf`, `markRevealed`, `revealedRows`.
- Cancellati i due pump di misura di tools e progetti e i cicli di catch-up.
- Rimosse le riserve `min-height: 80vh` e i quattro `section-done`.
- `pinDocHeight()` unico scrittore dell'altezza; `bindScrollClamp()` all'init;
  `placeFinalBraceAndLine` da 83 a 19 righe.
- `snapBodyHeights()`; classe `.ty-reserve`.

**Skip per elemento**
- `skipNow()`, `setCursorEl()`, `refreshCursorPos()`; `skip` come getter via
  `Object.defineProperty` su ogni voce di `sec`.
- `updateIndentLineH` aggiorna il cursore sopra la guardia; otto `setCursorEl`
  espliciti per titoli e righe di chiusura.
- Rimosso `s.skip = true` da `checkSectionsPassed`.

**Annullato**
- Esperimento sull'animazione delle linee: `setLineTarget`, `lineSettled`,
  costanti `LINE_*`, `--block-dur`. Tween e transizione CSS tornati agli
  originali.
