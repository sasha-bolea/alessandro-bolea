# STATO

Ultimo aggiornamento: **2026-07-29 17:52**

## Stato attuale

Sito personale a pagina singola, estetica "code editor": si scrive da solo con
un'animazione di typing, numeri di riga, barre di indentazione, graffa di
chiusura posizionata in px, Game of Life come sfondo su canvas full-document.

Sezioni in ordine: nome (h1) → bio → **percorso** → strumenti → progetti →
contatti → `}`.

Funzionalità completate e verificate in sessione:

- **Sezione percorso** — nuova, formato chiave → valore come i contatti, con le
  righe rese link (ITS Digital Academy "Mario Volpato", stage ELAN42).
- **Card progetto ad altezza fissa** — non crescono mai: al restringersi della
  pagina cadono i tech tag dall'ultimo dell'array, poi la descrizione.
- **Code folding stile VS Code** — freccette nella gutter, due livelli annidati
  (barra globale + barre di sezione). I numeri di riga **non** si ricalcolano:
  le righe piegate consumano i loro numeri senza stamparli.
- **Altezza di pagina fissa** — il DOM completo esiste dal primo frame,
  l'animazione è una rivelazione di contenuto già impaginato.
- **Skip di generazione per elemento** — scrollando in basso, ciò che è già
  uscito dal viewport si genera senza animazione; risalendo l'animazione
  riprende.

## Problemi aperti

| Problema | Note |
|---|---|
| Animazione delle linee di indentazione scattosa | Soprattutto sulle card, che sono alte: il target salta di colpo. Tre tentativi falliti (vedi decisioni). Ipotesi rimasta: invertire il pilota, far dettare il ritmo del contenuto alla linea con un orologio unico in coordinate Y e distribuzione dei caratteri sull'altezza dell'elemento. Fattibile perché il layout è statico. |
| Freccette di fold irraggiungibili su touch | Dipendono da `:hover`. Si risolve con `@media (hover: none) { .fold-chevron { opacity: 1 } }`. |
| Correzione di 8px allo swap del font | `fonts.ready` rimisura quando arriva Hack dal CDN. Intrinseco, si mitiga solo precaricando il font. |
| `syncLnWidth` con lista di id cablata a mano | `script.js` — ogni sezione nuova va aggiunta a mano. Stessa trappola di `BLOCK_CLOSE_MAP`. |
| Tema non persistito | Scroll e focus mode GoL vanno in `sessionStorage`, il tema no: al reload torna dark. |
| Accessibilità | `#theme-toggle` è un `<div>` cliccabile senza `role`/`tabindex`; `#ee-close` uno `<span>` con `onclick` inline. |
| `getItem("golFocusMode")` senza `try/catch` | Unico accesso a storage non protetto. |

## Decisioni

| Data | Decisione | Motivo |
|---|---|---|
| 2026-07-29 | Split **build/reveal** invece di ghost render | Per conoscere l'altezza prima del contenuto serviva o pre-renderizzare o costruire subito. Il ghost render è **impossibile** qui: solo `tools-body` e `projects-list` si svuotano prima di rigenerarsi, quindi un secondo passaggio duplicherebbe le righe di percorso e contatti. |
| 2026-07-29 | `2.2vh` → `2.2svh` nei font-size | Con `vh` il collasso della barra URL su Android cambia il font-size e quindi l'altezza totale: "lunghezza fissa" sarebbe irraggiungibile. `svh` è calcolata a barra espansa e non varia. |
| 2026-07-29 | `skip` come **getter** dinamico | Trasforma ~20 punti di lettura in per-elemento senza toccarli, e rende lo skip reversibile per costruzione: il predicato è puro rispetto a `scrollY`. |
| 2026-07-29 | Numeri di riga rivelati riusando `data-fixed-rows` | Col DOM completo comparirebbero tutti insieme. Il meccanismo esisteva già: build lo mette a `"0"`, reveal lo alza. Zero modifiche a `recomputeLineNumbers`. |
| 2026-07-29 | Fold: stato nel DOM, non in variabili | `recomputeLineNumbers` gira decine di volte al secondo; `closest(".is-folded")` dà l'annidamento gratis a qualunque profondità. |
| 2026-07-29 | Rimosse le riserve `min-height: 80vh` | 320vh mai usati, rilasciati tutti insieme all'ultimo frame: erano la causa dello scatto finale. |

## Backlog

1. Animazione linee a velocità costante (vedi problemi aperti) — il prossimo pezzo.
2. Freccette di fold su touch.
3. Persistenza del tema.
4. Accessibilità di theme toggle ed easter egg.
5. `syncLnWidth` e `BLOCK_CLOSE_MAP` derivati dal DOM invece che cablati.
6. Favicon assente (404 a ogni caricamento, innocuo).

## Riferimenti

- [architettura.md](architettura.md) — come funzionano typing, numeri di riga, altezza, folding
- [design-system.md](design-system.md) — catalogo elementi UI
- [bug-risolti.md](bug-risolti.md) — registro bug
- [storico-sessioni.md](storico-sessioni.md) — archivio sessioni
