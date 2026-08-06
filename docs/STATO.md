# STATO

Ultimo aggiornamento: **2026-08-06 09:15**

## Stato attuale

Sito personale a pagina singola, estetica "code editor": si scrive da solo con
un'animazione di typing, numeri di riga, barre di indentazione, graffa di
chiusura posizionata in px, Game of Life come sfondo su canvas full-document.

Sezioni in ordine: nome (h1) → bio → percorso → strumenti → progetti →
contatti → `}`.

**Bilingue italiano/inglese.** Interruttore `IT | EN` in alto a destra, in riga
col theme toggle. Contenuti in `i18n.js`, uno per lingua; il cambio salva in
`localStorage` e ricarica, riprendendo dallo stesso punto di scroll. Alla prima
visita decide `navigator.language`. Vedi [architettura.md](architettura.md) §6.

Quattro progetti in vetrina: Game of Life (interattivo, con focus mode e
pattern), Royale Arena, ELAN42 Time Tracker (con striscia screenshot), Claude
Code Branching.

Il titolo è editabile in una finestra precisa: fra la fine della sua animazione
e la partenza del corpo, cioè finché la pagina è ancora in cima. Dentro quella
finestra la pagina segue il punto di scrittura e l'altezza del documento si
rifissa a ogni capo di riga; appena il corpo parte, la scrittura si chiude e il
caret si spegne.

## Problemi aperti

| Problema | Note |
|---|---|
| Barra di indentazione e graffa desincronizzate alla chiusura delle card | La graffa risale di colpo, la barra si accorcia col tween: per un istante la fine della barra resta più in basso della graffa. Lasciato aperto per scelta. Da guardare: `_tweenLine` / `_lineTargetH` contro `repositionBrace`. |
| Animazione delle linee di indentazione scattosa | Soprattutto sulle card, che sono alte: il target salta di colpo. Tre tentativi falliti (vedi storico 2026-07-29). Ipotesi rimasta: invertire il pilota, orologio unico in coordinate Y. |
| L'edit del titolo distrugge `#surname` e `#name` | `currentEditable.textContent += e.key` sostituisce gli span interni con un unico nodo di testo: dopo la prima lettera quei due id non esistono più. Non rompe nulla di visibile oggi, ma qualunque codice che li cerchi dopo un edit trova `null`. |
| Freccette di fold irraggiungibili su touch | Dipendono da `:hover`. Si risolve con `@media (hover: none) { .fold-chevron { opacity: 1 } }`. |
| Correzione di 8px allo swap del font | `fonts.ready` rimisura quando arriva Hack dal CDN. Intrinseco, si mitiga solo precaricando il font. |
| `syncLnWidth` con lista di id cablata a mano | Ogni sezione nuova va aggiunta a mano. Stessa trappola di `BLOCK_CLOSE_MAP`. |
| Tema non persistito | Scroll, focus mode GoL e **lingua** vanno in storage, il tema no: al reload torna dark. |
| Accessibilità | `#theme-toggle` è un `<div>` cliccabile senza `role`/`tabindex`; `#ee-close` uno `<span>` con `onclick` inline. L'interruttore di lingua invece usa `<button>`. |
| `getItem("golFocusMode")` senza `try/catch` | Unico accesso a storage non protetto: `i18n.js` e il resto sono in `try`. |

## Decisioni

| Data | Decisione | Motivo |
|---|---|---|
| 2026-08-06 | Contenuti in `i18n.js`, non in `script.js` | Sono testo, non logica, e in due lingue raddoppiano. Separarli lascia `script.js` sul suo lavoro (typing, geometria, numeri di riga) e rende ovvio dove si aggiunge roba. |
| 2026-08-06 | Cambio lingua con **ricarica**, non scambio a caldo | La pagina si scrive con un motore a stati; sostituire i testi a metà animazione vorrebbe dire rifarne il percorso. Lo scroll è già persistito, quindi la ricarica non si vede: stesso punto, testo già scritto. |
| 2026-08-06 | Lingua attiva distinta per **luminosità**, non per bordo | `.is-active` a `--text`, l'altra a `--text-dim`. Nessun elemento decorativo nuovo in un'interfaccia che è tutta testo. |
| 2026-08-06 | `nameScrollTarget` come firma dello scroll, non un timer | L'auto-scroll durante la scrittura del nome andrebbe letto dal gestore come "l'utente se ne va", facendo partire il corpo. Confrontare la destinazione è deterministico e si consuma una volta; una finestra temporale sarebbe stata a occhio. |
| 2026-08-06 | Riserva dell'h1 come pavimento, non come tetto | Serve a tenere fermo il margine del corpo mentre il nome si digita, ma il nome è editabile: oltre i due testi dell'animazione deve vincere l'altezza vera. |
| 2026-08-06 | Glifi `● ○` invece di `⬤ ◯` nell'albero cb | Hack non ha U+2B24 e il fallback lo rende largo 1,43 celle, sfondando la griglia monospace. `● ○` sono il set di ripiego previsto da cb stesso. |
| 2026-08-06 | `linkLabel` opzionale invece di rinominare `open` | La label era cablata per tutti i progetti: cambiarla avrebbe messo "npm" anche su Royale Arena, che è un sito. |
| 2026-07-29 | Split **build/reveal** invece di ghost render | Il ghost render è impossibile qui: solo `tools-body` e `projects-list` si svuotano prima di rigenerarsi, quindi un secondo passaggio duplicherebbe le righe di percorso e contatti. |
| 2026-07-29 | `2.2vh` → `2.2svh` nei font-size | Con `vh` il collasso della barra URL su Android cambia il font-size e quindi l'altezza totale. `svh` è calcolata a barra espansa e non varia. |
| 2026-07-29 | `skip` come **getter** dinamico | Trasforma ~20 punti di lettura in per-elemento senza toccarli, e rende lo skip reversibile per costruzione. |
| 2026-07-29 | Fold: stato nel DOM, non in variabili | `recomputeLineNumbers` gira decine di volte al secondo; `closest(".is-folded")` dà l'annidamento gratis. |

## Backlog

1. Sincronizzare barra di indentazione e graffa alla chiusura delle card (vedi
   problemi aperti) — lasciato aperto per scelta a fine sessione.
2. Animazione linee a velocità costante.
3. Preservare `#surname` / `#name` durante l'edit del titolo.
4. Freccette di fold su touch.
5. Persistenza del tema (la lingua è già persistita, stesso schema).
6. Accessibilità di theme toggle ed easter egg.
7. `syncLnWidth` e `BLOCK_CLOSE_MAP` derivati dal DOM invece che cablati.
8. Favicon assente (404 a ogni caricamento, innocuo).

## Riferimenti

- [architettura.md](architettura.md) — i sei meccanismi non ovvi e le convenzioni
- [design-system.md](design-system.md) — catalogo elementi UI
- [bug-risolti.md](bug-risolti.md) — registro bug
- [storico-sessioni.md](storico-sessioni.md) — archivio sessioni
