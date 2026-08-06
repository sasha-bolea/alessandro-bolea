# STATO

Ultimo aggiornamento: **2026-08-06 12:20**

## Stato attuale

Sito personale a pagina singola, estetica "code editor": si scrive da solo con
un'animazione di typing, numeri di riga, barre di indentazione, graffa di
chiusura posizionata in px, Game of Life come sfondo su canvas full-document.

Sezioni in ordine: nome (h1) → bio → percorso → strumenti → progetti →
contatti → `}`.

**Pubblicato su [alessandrobolea.com](https://alessandrobolea.com) via Vercel,
collegato al branch `master`: `git push` pubblica.** Nel repo non c'è nessun
file che lo dichiari — vedi [deploy.md](deploy.md).

**Bilingue italiano/inglese.** Interruttore `IT | EN` in alto a sinistra, nascosto
in focus mode. Contenuti in `i18n.js`; il cambio salva in `localStorage` e
ricarica, riprendendo dallo stesso punto di scroll. Alla prima visita decide
`navigator.language`.

La generazione del testo **si ferma alla fine della pagina visibile** e riprende
allo scroll (architettura §7). Il titolo è editabile nella finestra fra la fine
della sua animazione e la partenza del corpo, e la pagina segue il punto di
scrittura.

Quattro progetti: Game of Life (interattivo, focus mode, pattern), Royale Arena,
ELAN42 Time Tracker, Claude Code Branching.

## Problemi aperti

| Problema | Note |
|---|---|
| Barra di indentazione e graffa desincronizzate alla chiusura delle card | La graffa risale di colpo, la barra si accorcia col tween: per un istante la fine della barra resta più in basso della graffa. Lasciato aperto per scelta. Da guardare: `_tweenLine` / `_lineTargetH` contro `repositionBrace`. |
| Barra ferma a metà — da riconfermare in primo piano | Il bersaglio ora si ricalcola a ogni tick del pump. Se il sintomo torna, la causa è un'altra: `_lineTweenRunning` che resta `true` senza un rAF in coda, e il rimedio è rilanciare il tween. Non riproducibile in tab background, dove il throttling produce un ritardo identico. |
| Animazione delle linee di indentazione scattosa | Il target salta di colpo sulle card, che sono alte. Ipotesi rimasta: orologio unico in coordinate Y. |
| L'edit del titolo distrugge `#surname` e `#name` | `currentEditable.textContent += e.key` sostituisce gli span interni con un unico nodo di testo. Non rompe nulla di visibile, ma chi li cerca dopo un edit trova `null`. |
| `spawnAutomatico` non sopravvive al reload | Dopo un ricaricamento il Game of Life riparte popolato. Coerente col fatto che nemmeno la griglia è persistita. |
| Freccette di fold irraggiungibili su touch | Dipendono da `:hover`. `@media (hover: none) { .fold-chevron { opacity: 1 } }`. |
| Correzione di 8px allo swap del font | `fonts.ready` rimisura quando arriva Hack dal CDN. Si mitiga solo precaricando il font. |
| `syncLnWidth` con lista di id cablata a mano | Ogni sezione nuova va aggiunta a mano, come per `BLOCK_CLOSE_MAP`. |
| Tema non persistito | Scroll, focus mode GoL e lingua vanno in storage, il tema no: al reload torna dark. |
| Accessibilità | `#theme-toggle` è un `<div>` cliccabile senza `role`/`tabindex`; `#ee-close` uno `<span>` con `onclick` inline. L'interruttore di lingua usa `<button>`. |
| `getItem("golFocusMode")` senza `try/catch` | Unico accesso a storage non protetto. |

## Decisioni

| Data | Decisione | Motivo |
|---|---|---|
| 2026-08-06 | Generazione fermata alla piega, non solo accelerata | Lo skip risolveva metà del problema (contenuto già passato); mancava l'altra metà, il contenuto non ancora guardato. Così l'animazione accompagna la lettura invece di correre avanti. |
| 2026-08-06 | Scroll proprio riconosciuto dalla **destinazione**, non da un timer | L'auto-scroll che segue la scrittura del nome sarebbe stato letto come "l'utente se ne va" e avrebbe fatto partire il corpo. Confrontare la destinazione è deterministico e si consuma una volta; una finestra temporale sarebbe stata a occhio. |
| 2026-08-06 | Valori del tema chiaro **misurati**, non riflessi da quelli scuri | Il nero su fondo caldo rende meno del bianco su fondo scuro: con le stesse alpha il giorno perdeva su ogni elemento. Le celle del GoL vanno nella direzione opposta, schiarite. |
| 2026-08-06 | Un flag solo per le tre sorgenti di ripopolamento del GoL | Spegnerle separatamente avrebbe lasciato scoperto il caso del resize, che è quello che si nota di meno e dà più fastidio. |
| 2026-08-06 | `repositionBrace()` mai dietro `indentDone` | Terza volta che quella guardia rende il fondo pagina irraggiungibile. Ora è una convenzione scritta. |
| 2026-08-06 | Soglia del media query calcolata, non a occhio | `0,5vw + 0,18vw + 296 > vw` dà 925px: il numero dice anche *perché*, e regge se cambiano le larghezze. |
| 2026-08-06 | Contenuti in `i18n.js`, cambio lingua con **ricarica** | Sono testo, non logica, e in due lingue raddoppiano. Sostituire i testi a metà animazione vorrebbe dire rifare il percorso del motore di rivelazione; lo scroll è già persistito, quindi la ricarica non si vede. |
| 2026-07-29 | Split **build/reveal** invece di ghost render | Solo `tools-body` e `projects-list` si svuotano prima di rigenerarsi: un secondo passaggio duplicherebbe percorso e contatti. |
| 2026-07-29 | `2.2vh` → `2.2svh` nei font-size | Con `vh` il collasso della barra URL su Android cambia il font-size e quindi l'altezza totale. |
| 2026-07-29 | `skip` come **getter** dinamico | Rende lo skip per-elemento e reversibile per costruzione, senza toccare i ~20 punti di lettura. |

## Backlog

1. Sincronizzare barra di indentazione e graffa alla chiusura delle card.
2. Riconfermare in primo piano la barra ferma a metà (vedi problemi aperti).
3. Animazione linee a velocità costante.
4. Preservare `#surname` / `#name` durante l'edit del titolo.
5. Freccette di fold su touch.
6. Persistenza del tema (la lingua è già persistita, stesso schema).
7. Accessibilità di theme toggle ed easter egg.
8. `syncLnWidth` e `BLOCK_CLOSE_MAP` derivati dal DOM invece che cablati.
9. Favicon assente (404 a ogni caricamento, innocuo).

## Riferimenti

- [deploy.md](deploy.md) — **come si pubblica e come verificare cosa c'è online**
- [architettura.md](architettura.md) — i sette meccanismi non ovvi e le convenzioni
- [design-system.md](design-system.md) — catalogo elementi UI
- [bug-risolti.md](bug-risolti.md) — registro bug
- [storico-sessioni.md](storico-sessioni.md) — archivio sessioni
