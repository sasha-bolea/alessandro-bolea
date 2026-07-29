/*


                             :1;
                             wd8}
                             MM8L
                            lpbMOL
                ,)c)        tCpOcOp}            .1}       .l1}
                cdhp        qwd>;cmq1          !\MB}      {wBb
               +waM[       lc00  ,(Uqa}         QaBL      WBBr
               {pMM;       {c0[    ]CdBa1}       OdB}     8B8
               CbMh        cCO`.    :jq8BB       <cpM     Q8M . `.
              ;qhM0       cwMpcw~     .vv>        jcq[`;~~wM8ff(cLwc
              (baMc   `[cQMMWkp[`            `,![/ZaMbOOUcdMM[[][jv>
             ~ChabQ [cwppMMkf         `,[))c0cwWW8BB8M(.  cUM;
            'cObpbk0ppdqCUcr  `;~1cccwCwaMMMkkMWBOvY0O    ]ck/
         `[1cwhMhMMbpUf ]cbcwdkbpkbbaUvv>,cmw8bv   )Qq    <cqL
     l[cwbhaMWWWWWMr:    daW8W0vvv      [UOhU>     [Cp     cQM!
  ;[waMMMMMMMMMMMMMM)    <v(          lccOv>       cwp     !0ah,
  _qM88MMMaMaMr <aMMML       1L1,    /cQ0>        !whr      j0Mp}
  :vvvvv>]whab   jkM8ML     ~ckMMc ;/cOr          \WM[       jaM8`
       )ZaaMM>   :jaM8b      <vabMMcwp[          ;CMM         <v>
      lMB88k>      <vv>         vb8BMr            _[:
      <BMMv`                     <M8ML
                                  ;vv;


*/
/* ============================================================
   CONFIGURAZIONE
   ============================================================ */
const originalSurname = "bolea";
const originalName    = "Alessandro(){";
const newName         = "Sasha(){";

// Chiavi = periodi, l'ordine di scrittura è l'ordine di visualizzazione.
// Il valore può essere una stringa o { display, href } per rendere la riga un link.
const ilMioPercorso = {
  "2025 — in corso": {
    display: 'ITS Digital Academy "Mario Volpato", Web Developer Full Stack',
    href: "https://itsdigitalacademy.com/corsi/web-developer-full-stack/"
  },
  "2026 — in corso": {
    display: "Stage, ELAN42 digital agency",
    href: "https://elan42.com/"
  },
};

const iMieiStrumenti = {
  linguaggi: ["Python", "Java", "JS", "HTML", "CSS"],
  runtime:   ["Node.js", "Express", "Docker"],
  database:  ["SQL"],
  tools:     ["Git", "GitHub", "VSCode"],
};

const iMieiProgetti = [
    {
        nome: "Game of Life",
        desc: "Sfondo interattivo del sito",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Creato dal matematico <span class="gol-hl">John Horton Conway</span> nel <span class="gol-hl">1970</span>, il Game of Life è un automa cellulare che simula l'evoluzione di una popolazione su una griglia. Non è un gioco nel senso tradizionale — non ci sono giocatori né obiettivi — ma una simulazione che si svolge da sola. Ogni cella può essere viva ■ o morta □ e, in base allo stato delle celle circostanti (dette "vicini"), il suo stato cambierà alla generazione successiva — dimostrando come comportamenti <span class="gol-hl">complessi</span> possano <span class="gol-hl">emergere</span> da poche semplici regole:</p>
  <p class="gol-desc-section-title">// regole</p>
  <div class="gol-rules-row">
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi a"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con meno di 2 vicini vivi → muore (sottopopolazione)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con 2 o 3 vicini vivi → sopravvive</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi a"></b><b class="gi a"></b><b class="gi a"></b>
          <b class="gi a"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con più di 3 vicini vivi → muore (sovrappopolazione)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi a"></b><b class="gi d c"></b><b class="gi a"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">Una cella morta con esattamente 3 vicini vivi → nasce</span>
    </div>
  </div>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">JS</span><span class="tech-tag">Canvas 2D</span><span class="tech-tag">requestAnimationFrame</span></div>
  <p class="gol-desc-section-title">// interfaccia</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">puntatore</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">navigazione, nessun disegno</td></tr>
    <tr><td class="gol-iface-key">disegna</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click / drag aggiunge cellule</td></tr>
    <tr><td class="gol-iface-key">glider</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click piazza un glider casuale</td></tr>
    <tr><td class="gol-iface-key">pattern</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">piazza strutture predefinite</td></tr>
    <tr><td class="gol-iface-key">modalità focus</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">schermo intero</td></tr>
  </table>
  <p class="gol-iface-hint">play/pause · clear · reseed · velocità</p>
</div>`,
        tech: ["JS"],
        status: "LIVE",
        link: "#",
        isGol: true,
    },
    {
        nome: "Royale Arena",
        desc: "Piattaforma per tornei e statistiche tramite Clash Royale API",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">PWA per clan di <span class="gol-hl">Clash Royale</span> progettata per essere usata nel modo più semplice possibile — nessun account, nessuna registrazione. Un codice condiviso è l'unico gate d'accesso. Per avviare un torneo basta <span class="gol-hl">selezionare i giocatori e premere start</span>: l'app recupera automaticamente le battaglie recenti tramite l'<span class="gol-hl">API ufficiale</span>, filtra solo quelle valide per il torneo in corso e aggiorna il bracket senza nessun intervento manuale.</p>
  <p class="gol-desc-section-title">// funzionalità</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">clan</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">creazione via codice condiviso, nessuna registrazione</td></tr>
    <tr><td class="gol-iface-key">tornei</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">bracket automatico, partite collegate alle battaglie reali</td></tr>
    <tr><td class="gol-iface-key">classifiche</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">statistiche per giocatore aggiornate via polling</td></tr>
    <tr><td class="gol-iface-key">manutenzione</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">pg_cron invalida tornei inattivi ogni 30 min, pulisce clan vuoti ogni notte</td></tr>
  </table>
  <p class="gol-desc-section-title">// sicurezza</p>
  <p class="gol-iface-hint">modello flat — niente auth, niente token. codice clan = unico gate. isolamento dati garantito, attrito utente zero.</p>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">Nuxt 4</span><span class="tech-tag">Vue 3</span><span class="tech-tag">Supabase</span><span class="tech-tag">PostgreSQL</span><span class="tech-tag">pg_cron</span><span class="tech-tag">PWA</span></div>
</div>`,
        tech: ["Nuxt 4", "Vue 3", "Supabase", "PWA"],
        status: "LIVE",
        link: "https://royalarena.it",
        github: "https://github.com/sasha-bolea/clash-royale-api",
    },
];

const contatti = {
  email:    "sashabol3a@gmail.com",
  github:   "github.com/sasha-bolea",
  linkedin: { display: "linkedin.com/in/alessandro-bolea", href: "https://www.linkedin.com/in/alessandro-bolea-651393264/" }
};

/* ── DOM refs ── */
const surnameEl      = document.getElementById("surname");
const nameEl         = document.getElementById("name");
const nameLn         = document.getElementById("name-line-numbers");
const indentLine     = document.getElementById("indent-line");
const closingBrace   = document.getElementById("closing-brace");
const revealContent  = document.getElementById("reveal-content");
const revealSection  = document.querySelector(".reveal-section");

/* ── State ── */
let lastNameLines    = 1;
let skipNameAnim     = false;
let animFinished     = false;
let hasTyped         = false;
let currentEditable  = null;

/* ── Section skip/auto-advance state ── */
const sec = {
  reveal:   { started:false, done:false, skip:false, el:null, start:() => revealBio() },
  percorso: { started:false, done:false, skip:false, el:null, start:() => revealPercorso() },
  tools:    { started:false, done:false, skip:false, el:null, start:() => revealTools() },
  projects: { started:false, done:false, skip:false, el:null, start:() => revealProjects() },
  contacts: { started:false, done:false, skip:false, el:null, start:() => revealContatti() },
};
const secOrder = ["reveal","percorso","tools","projects","contacts"];
// id della sezione nel DOM → chiave in sec. Serve al folding durante il typing,
// quando sec[n].el non è ancora assegnato (lo fa l'handler di load).
// skip non è più uno stato per sezione ma un predicato dinamico: i ~20 punti
// che lo leggono restano invariati e diventano per-elemento. Il setter è un
// no-op voluto — lo script non è strict, senza di esso una vecchia
// assegnazione sparirebbe in silenzio invece di non fare nulla.
secOrder.forEach(n => Object.defineProperty(sec[n], "skip", {
  get: skipNow,
  set() {},
}));

const SECTION_KEY_BY_ID = {
  "percorso-section": "percorso",
  "tools-section":    "tools",
  "projects-section": "projects",
  "contact-section":  "contacts",
};
function startSection(name) {
  const s = sec[name];
  if (!s || s.started) return;
  // Se parte la sezione successiva, la precedente ha finito: è il momento di
  // darle la sua freccetta di fold, senza aspettare la fine della pagina.
  ensureFoldHandles();
  s.started = true;
  if (name === "reveal") hasTyped = true;
  s.start();
}
function nextSection(name) {
  const i = secOrder.indexOf(name);
  return i >= 0 && i < secOrder.length - 1 ? secOrder[i+1] : null;
}

/* ============================================================
   UTILITY
   ============================================================ */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd   = (a, b) => Math.random() * (b - a) + a;

/* ── Skip per elemento ──
   Ciò che è già uscito dal viewport verso l'alto viene generato senza
   animazione; l'animazione riprende dal primo elemento ancora visibile, anche
   solo in parte. Il confronto è fra due numeri e non legge il layout: dopo lo
   split build/reveal la pagina è statica, quindi la posizione di documento di
   un elemento si misura una volta sola, quando diventa quello in scrittura. */
let _cursorEl = null;
let _cursorBottom = Infinity;   // fondo dell'elemento in scrittura, coord. documento
let _scrollY = 0;

/* Dichiara qual è l'elemento che si sta scrivendo. el: elemento o null. */
function setCursorEl(el) {
  _cursorEl = el || null;
  _cursorBottom = el ? el.getBoundingClientRect().bottom + window.scrollY : Infinity;
}
/* Rimisura il cursore corrente: serve dopo fold, resize e pin, gli unici casi
   in cui il layout si sposta sotto i piedi della scrittura. */
function refreshCursorPos() { if (_cursorEl) setCursorEl(_cursorEl); }
function skipNow() { return _cursorBottom < _scrollY; }

const fast = (s, ms) => skipNow() ? Promise.resolve() : sleep(ms);


/* ── Typing: build (sincrono) + reveal (animato) ──
   Il testo finale entra nel DOM subito, dentro uno .ty-rest invisibile: il
   layout è quello definitivo dal primo frame. La rivelazione sposta caratteri
   da .ty-rest a .ty-done senza mai cambiare l'ingombro. */

/* Prepara el con il testo già impaginato ma invisibile.
   el: contenitore. text: testo finale. Nessun valore di ritorno. */
function prepType(el, text) {
  el.innerHTML = `<span class="ty-done"></span><span class="ty-rest"></span>`;
  el.lastChild.textContent = text;
  el.dataset.tyText = text;
}

/* Scopre progressivamente il testo preparato da prepType.
   el: contenitore preparato. s: voce di sec, per lo skip.
   onStep: callback opzionale eseguita a ogni carattere. Ritorna una Promise. */
async function typeInto(el, s, opts = {}) {
  const { onStep, min = 5, max = 25 } = opts;
  const text = el.dataset.tyText || "";
  const done = el.firstChild, rest = el.lastChild;
  // Il cursore vive sull'elemento che si sta scrivendo: tenerlo altrove (per
  // esempio sul valore mentre si scrive la chiave) lo lascerebbe fermo, perché
  // ogni elemento riserva già lo spazio del suo testo completo.
  el.classList.add("typing-cursor");
  for (let i = 1; i <= text.length; i++) {
    if (s.skip) break;
    done.textContent = text.slice(0, i);
    rest.textContent = text.slice(i);
    if (onStep) onStep();
    await fast(s, rnd(min, max));
  }
  done.textContent = text;
  rest.textContent = "";
  el.classList.remove("typing-cursor");
  if (onStep) onStep();
}

/* Numero di righe renderizzate occupate da un elemento già impaginato.
   Usa getBoundingClientRect perché funziona anche sugli inline che si
   estendono su più righe, dove offsetHeight non è affidabile.
   el: elemento da misurare. Ritorna un intero >= 0. */
function rowsOf(el) {
  const slh = singleLineHeight(el.parentElement || el) || 1;
  return Math.round(el.getBoundingClientRect().height / slh);
}

/* Ultimo elemento scoperto per ciascun body. Serve a setBlockH e ai numeri di
   riga: col contenuto già tutto costruito il DOM da solo non basta a sapere
   dove è arrivata la rivelazione, e le card sono annidate in righe e gruppi. */
const _lastRevealed = new WeakMap();
function markRevealed(bodyEl, el) { _lastRevealed.set(bodyEl, el); }

/* Righe occupate dal contenuto scoperto finora, dal top del body al fondo
   dell'ultimo elemento rivelato. bodyEl: contenitore. Ritorna un intero >= 0. */
function revealedRows(bodyEl) {
  const el = _lastRevealed.get(bodyEl);
  if (!el) return 0;
  const lh = getLineH(bodyEl) || 28;
  const span = el.getBoundingClientRect().bottom - bodyEl.getBoundingClientRect().top;
  return Math.max(0, Math.round(span / lh));
}

function syncLnWidth() {
  const w = nameLn.offsetWidth;
  // Le maniglie di fold sono in overlay nella gutter: partono dove finisce la
  // colonna dei numeri, quindi devono conoscerne la larghezza.
  document.documentElement.style.setProperty("--ln-w", w + "px");
  ["reveal-line-numbers","perc-title-ln","perc-body-ln","perc-close-ln","perc-empty-ln",
   "tools-title-ln","tools-body-ln","tools-close-ln","tools-empty-ln",
   "proj-title-ln","proj-body-ln","proj-close-ln","proj-empty-ln",
   "contact-title-ln","contact-body-ln","contact-close-ln","contact-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.width = w + "px";
    });
}

/* Altezza di una singola riga renderizzata dentro ref, misurata inserendo uno
   span temporaneo. La misura forza un reflow sincrono e recomputeLineNumbers()
   la richiede a ogni carattere digitato e a ogni frame durante i pump, quindi
   il risultato è in cache per elemento. Dipende solo dal font-size, perciò la
   cache va invalidata solo su resize e a font caricato (clearLineHCache()).
   ref: elemento contenitore. Ritorna l'altezza in px. */
let _lineHCache = new WeakMap();
function singleLineHeight(ref) {
  const el = ref || document.body;
  const cached = _lineHCache.get(el);
  if (cached) return cached;
  const t = document.createElement("span");
  t.textContent = "X"; t.style.visibility = "hidden"; t.style.position = "absolute";
  el.appendChild(t);
  const h = t.offsetHeight;
  t.remove();
  if (h) _lineHCache.set(el, h);
  return h;
}

/* WeakMap non ha clear(): si riassegna. */
function clearLineHCache() { _lineHCache = new WeakMap(); }

/* ============================================================
   GEOMETRIA
   ============================================================ */
/* Misura una volta sola l'altezza che l'h1 raggiungerà, e la pinna.
   updateRevealPos() leggeva h1.offsetHeight mentre il nome si stava ancora
   digitando: su viewport strette il nome va a capo e torna, e il margine della
   reveal section oscillava a ogni carattere, cambiando l'altezza del documento.
   Si prende il più alto fra i due testi che l'animazione attraversa, non solo
   quello finale: "Alessandro(){" è più lungo di "Sasha(){" e va a capo prima.
   Nessun parametro, nessun valore di ritorno. */
let _h1ReservedH = 0;
function measureH1Height() {
  const h1 = document.querySelector("h1");
  const prevSurname = surnameEl.textContent;
  const prevName    = nameEl.textContent;
  h1.style.minHeight = "";
  let max = 0;
  for (const testo of [originalName, newName]) {
    surnameEl.textContent = originalSurname;
    nameEl.textContent    = testo;
    max = Math.max(max, h1.offsetHeight);
  }
  surnameEl.textContent = prevSurname;
  nameEl.textContent    = prevName;
  _h1ReservedH = max;
  h1.style.minHeight = max + "px";
}

function updateRevealPos() {
  const slh      = singleLineHeight(document.getElementById("full-name"));
  const h1Top    = window.innerHeight * 0.2;
  const h1Bottom = h1Top + (_h1ReservedH || document.querySelector("h1").offsetHeight);
  revealSection.style.marginTop = h1Bottom > window.innerHeight
    ? (h1Bottom + slh) + "px"
    : "100vh";
}

/* ============================================================
   NUMERI DI RIGA — engine unificato
   Singola fonte di verità: tutti gli span .line-numbers sono
   ricalcolati in ordine DOM via recomputeLineNumbers(), in base a
   data-rows e data-source nell'HTML. Per allungare il sito basta
   aggiungere span con i giusti attributi: zero JS extra.
   ============================================================ */

// Costruisce stringa "n\nn+1\n...\nn+count-1"
function lnRange(start, count) {
  if (count <= 0) return "";
  let s = "";
  for (let i = 0; i < count; i++) s += (start + i) + (i < count - 1 ? "\n" : "");
  return s;
}

// Imposta --block-h sul body così che la barra arrivi esattamente
// fino alla riga di chiusura della sezione (sopra la "}")
// Mappa bodyId → closeId
const BLOCK_CLOSE_MAP = {
  "percorso-body": "perc-close-text",
  "tools-body":    "tools-close-text",
  "projects-list": "proj-close-text",
  "contact-body":  "contact-close-text",
};
function setBlockH(bodyEl) {
  if (!bodyEl) return;
  // Blocco piegato: è display:none, i suoi rect valgono 0 e la differenza
  // misurata sarebbe l'intera distanza dalla riga di chiusura. Barra a zero.
  if (bodyEl.closest(".is-folded")) {
    bodyEl.style.setProperty("--block-h", "0px");
    return;
  }
  const closeId = BLOCK_CLOSE_MAP[bodyEl.id];
  const closeEl = closeId ? document.getElementById(closeId) : null;
  // Blocco non mappato: nessuna riga di chiusura da cui misurare, si esce.
  // Ogni nuova sezione va aggiunta a BLOCK_CLOSE_MAP, altrimenti la sua barra
  // verticale resta a 0.
  if (!closeEl) return;
  const bRect = bodyEl.getBoundingClientRect();
  // Durante la rivelazione il contenuto esiste già tutto ma è invisibile: la
  // barra deve fermarsi all'ultimo elemento scoperto, non correre fino in fondo.
  const last = bodyEl.querySelector(".ty-pending") ? _lastRevealed.get(bodyEl) : null;
  const h = bodyEl.querySelector(".ty-pending")
    ? (last ? Math.max(0, last.getBoundingClientRect().bottom - bRect.top) : 0)
    : Math.max(0, closeEl.getBoundingClientRect().top - bRect.top);
  bodyEl.style.setProperty("--block-h", h + "px");
}

/* Rimisura la barra verticale di TUTTE le sezioni mappate. Da usare dopo ogni
   cambio di altezza che non è confinato a un solo blocco (resize, fold).
   Nessun parametro, nessun valore di ritorno. */
function refreshAllBlockH() {
  Object.keys(BLOCK_CLOSE_MAP).forEach(id => setBlockH(document.getElementById(id)));
}

// Stessa misura di singleLineHeight, con fallback per i chiamanti che dividono
// per il risultato e non devono mai ricevere 0.
function getLineH(refEl) {
  return singleLineHeight(refEl) || 20;
}

// Calcola quante righe rappresenta uno span .line-numbers
//   data-fixed-rows="N"        → forza N righe (override per crescita smooth)
//   data-rows="dynamic"        → almeno 1 riga, conta da source.offsetHeight
//   data-rows="dynamic-block"  → 0 se source.offsetHeight==0; sennò righe da altezza
//   data-rows="conditional"    → 1 se source.textContent non vuoto, sennò 0
//   data-rows="empty-after"    → 1 se source.textContent non vuoto (riga vuota dopo sezione)
function lineRows(span) {
  const fixed = span.dataset.fixedRows;
  if (fixed != null) return Math.max(0, parseInt(fixed, 10) || 0);
  const mode = span.dataset.rows;
  const sourceId = span.dataset.source;
  const source = sourceId ? document.getElementById(sourceId) : null;
  if (!source) return 0;
  switch (mode) {
    case "dynamic": {
      const slh = singleLineHeight(source) || 0;
      if (!slh) return 1;
      return Math.max(1, Math.round(source.offsetHeight / slh));
    }
    case "dynamic-block": {
      if (source.offsetHeight === 0) {
        source.style.minHeight = "";
        return 0;
      }
      const slh = singleLineHeight(source) || getLineH(source);
      if (!slh) return 0;
      // Snap altezza body a multiplo esatto di lineHeight per evitare
      // gap visivo fra numeri di riga e contenuto (card più alte del testo).
      source.style.minHeight = "";
      const rows = Math.max(1, Math.round(source.offsetHeight / slh));
      source.style.minHeight = (rows * slh) + "px";
      return rows;
    }
    case "conditional":
    case "empty-after":
      return source.textContent.length > 0 ? 1 : 0;
    default:
      return 0;
  }
}

// Riassegna numeri sequenziali a tutti gli .line-numbers in ordine DOM.
// Le righe dentro una regione piegata non spariscono dalla numerazione:
// consumano i loro numeri senza stamparli, così piegando le righe 4-8 dopo
// il 3 compare direttamente il 9. Il conteggio usato è dataset.trueRows,
// l'ultimo misurato mentre la regione era visibile.
function recomputeLineNumbers() {
  let cur = 1;
  document.querySelectorAll(".line-numbers").forEach(span => {
    if (span.closest(".is-folded")) {
      span.textContent = "";
      cur += parseInt(span.dataset.trueRows || "0", 10);
      return;
    }
    const rows = lineRows(span);
    span.dataset.trueRows = String(rows);
    if (rows > 0) {
      span.textContent = lnRange(cur, rows);
      cur += rows;
    } else {
      span.textContent = "";
    }
  });
}

// Mantiene lastNameLines (usato per posizionare indent line e brace)
function updateNameLn() {
  const fullName = document.getElementById("full-name");
  const slh      = singleLineHeight(fullName);
  const lines    = Math.max(1, Math.round(fullName.offsetHeight / slh));
  if (lines !== lastNameLines) {
    lastNameLines = lines;
    updateRevealPos();
  }
  recomputeLineNumbers();
  syncLnWidth();
}

// Alias di compatibilità — un solo motore di numerazione
function updateRevealLn()  { recomputeLineNumbers(); }
function updateToolsLn()   { recomputeLineNumbers(); }
function updateProjLn()    { recomputeLineNumbers(); }
function updateContactLn() { recomputeLineNumbers(); }


/* ============================================================
   ANIMAZIONI NOME
   ============================================================ */
async function animateName() {
  async function typeName() {
    for (let i = 1; i <= originalSurname.length; i++) {
      if (skipNameAnim) return;
      surnameEl.textContent = originalSurname.substring(0, i);
      updateNameLn(); await sleep(80);
    }
    for (let i = 1; i <= originalName.length; i++) {
      if (skipNameAnim) return;
      nameEl.textContent = originalName.substring(0, i);
      updateNameLn(); await sleep(80);
    }
    await sleep(800);
    for (let i = originalName.length; i >= 0; i--) {
      if (skipNameAnim) return;
      nameEl.textContent = originalName.substring(0, i);
      updateNameLn(); await sleep(40);
    }
    await sleep(150);
    for (let i = 1; i <= newName.length; i++) {
      if (skipNameAnim) return;
      nameEl.textContent = newName.substring(0, i);
      updateNameLn(); await sleep(80);
    }
  }
  await typeName();
}

/* ============================================================
   ANIMAZIONE REVEAL (bio)
   ============================================================ */
function buildBio() {
  const text = "/*\nSono uno sviluppatore web full stack di 19 anni. Progetto e sviluppo applicazioni web curando frontend e backend, con attenzione a performance, usabilità e mantenibilità. Affronto i problemi in modo analitico, con particolare attenzione al debug e all'ottimizzazione.\n*/";
  prepType(revealContent, text + "\n ");
  document.getElementById("reveal-line-numbers").dataset.fixedRows = "0";
}

async function revealBio() {
  const s = sec.reveal;
  const revLn = document.getElementById("reveal-line-numbers");
  // .ty-done è inline e cresce riga per riga: il suo box è la misura di quanto
  // è stato scritto finora, e serve sia ai numeri di riga sia alla linea di
  // indentazione, che altrimenti salterebbero subito all'altezza finale.
  const done = revealContent.firstChild;

  await typeInto(revealContent, s, {
    min: 2, max: 10,
    onStep: () => {
      revLn.dataset.fixedRows = String(rowsOf(done));
      recomputeLineNumbers();
      updateIndentLineH(done);
    },
  });

  delete revLn.dataset.fixedRows;
  recomputeLineNumbers();
  updateIndentLineH(revealContent);
  s.done = true;
  startSection("percorso");
}

/* ============================================================
   PERCORSO SECTION
   ============================================================ */
/* Digita la sezione percorso: righe "periodo: "tappa"" nello stesso stile
   della sezione contatti, ma senza link. Nessun valore di ritorno. */
function buildPercorso() {
  const titleEl = document.getElementById("perc-title-text");
  const bodyEl  = document.getElementById("percorso-body");
  const closeEl = document.getElementById("perc-close-text");

  prepType(titleEl, "const percorso = {");
  prepType(closeEl, "};");

  Object.entries(ilMioPercorso).forEach(([periodo, raw], ei, arr) => {
    const isObj = typeof raw === "object" && raw !== null;
    const valStr = `"${isObj ? raw.display : raw}"${ei < arr.length - 1 ? "," : ""}`;
    // Con href la riga diventa un link, altrimenti resta un div non cliccabile.
    const rowEl = document.createElement(isObj ? "a" : "div");
    rowEl.className = "perc-row ty-pending";
    if (isObj) {
      rowEl.href = raw.href;
      rowEl.target = "_blank";
      rowEl.rel = "noopener noreferrer";
    }
    rowEl.innerHTML = `<span class="perc-key"></span><span class="contact-sep">:</span><span class="perc-val"></span>`;
    bodyEl.appendChild(rowEl);
    prepType(rowEl.querySelector(".perc-key"), periodo);
    prepType(rowEl.querySelector(".perc-val"), valStr);
  });

  // I numeri di riga restano a 0 finché la rivelazione non li scopre: senza
  // questo comparirebbero tutti insieme, visto che il contenuto esiste già.
  ["perc-title-ln","perc-body-ln","perc-close-ln","perc-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      el.dataset.fixedRows = "0";
      // La riga vuota di coda contiene solo lo span dei numeri: azzerandolo
      // collasserebbe, e il documento si allungherebbe a fine scrittura.
      if (id.endsWith("-empty-ln")) el.classList.add("ty-reserve");
    });
}

async function revealPercorso() {
  const titleEl = document.getElementById("perc-title-text");
  const bodyEl  = document.getElementById("percorso-body");
  const closeEl = document.getElementById("perc-close-text");
  const titleLn = document.getElementById("perc-title-ln");
  const bodyLn  = document.getElementById("perc-body-ln");
  const closeLn = document.getElementById("perc-close-ln");
  const s = sec.percorso;

  delete titleLn.dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(titleEl.closest(".code-row"));
  await typeInto(titleEl, s);

  let shown = 0;
  for (const rowEl of bodyEl.querySelectorAll(".perc-row")) {
    rowEl.classList.remove("ty-pending");
    markRevealed(bodyEl, rowEl);
    shown += rowsOf(rowEl);
    bodyLn.dataset.fixedRows = String(shown);
    setBlockH(bodyEl);
    updateIndentLineH(rowEl);
    recomputeLineNumbers();

    const valEl = rowEl.querySelector(".perc-val");
    await typeInto(rowEl.querySelector(".perc-key"), s);
    await typeInto(valEl, s);
  }
  delete bodyLn.dataset.fixedRows;

  delete closeLn.dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(closeEl.closest(".code-row"));
  await typeInto(closeEl, s);
  { const el = document.getElementById("perc-empty-ln"); delete el.dataset.fixedRows; el.classList.remove("ty-reserve"); }

  s.done = true;
  recomputeLineNumbers();
  await fast(s, 200);
  startSection("tools");
}

/* ============================================================
   TOOLS SECTION
   ============================================================ */
async function revealTools() {
  const bodyEl  = document.getElementById("tools-body");
  const titleEl = document.getElementById("tools-title-text");
  const closeEl = document.getElementById("tools-close-text");
  const bodyLn  = document.getElementById("tools-body-ln");
  const s = sec.tools;

  delete document.getElementById("tools-title-ln").dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(titleEl.closest(".code-row"));
  await typeInto(titleEl, s);

  // Scopre un elemento e riallinea numeri di riga, barra e linea di indentazione.
  const scopri = el => {
    el.classList.remove("ty-pending");
    markRevealed(bodyEl, el);
    bodyLn.dataset.fixedRows = String(revealedRows(bodyEl));
    setBlockH(bodyEl);
    updateIndentLineH(el);
    recomputeLineNumbers();
  };

  for (const group of bodyEl.querySelectorAll(".tools-categories > div")) {
    scopri(group.querySelector(".tools-cat-comment"));
    await fast(s, 80);
    for (const card of group.querySelectorAll(".tool-icon-card")) {
      scopri(card);
      card.classList.add("card-reveal");
      await fast(s, 50);
    }
  }
  delete bodyLn.dataset.fixedRows;

  delete document.getElementById("tools-close-ln").dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(closeEl.closest(".code-row"));
  await typeInto(closeEl, s);
  { const el = document.getElementById("tools-empty-ln"); delete el.dataset.fixedRows; el.classList.remove("ty-reserve"); }

  s.done = true;
  recomputeLineNumbers();
  await fast(s, 200);
  startSection("projects");
}

const techIconMap = {
  "Python":     { path: "assets/icons/python-original.svg" },
  "Java":       { path: "assets/icons/java-original.svg" },
  "JS":         { path: "assets/icons/javascript-original.svg" },
  "HTML":       { path: "assets/icons/html5-original.svg" },
  "CSS":        { path: "assets/icons/css3-original.svg" },
  "Node.js":    { path: "assets/icons/nodejs-original.svg" },
  "Express":    { path: "assets/icons/express-original.svg", invert: true },
  "Docker":     { path: "assets/icons/docker-original.svg" },
  "SQL":        { path: "assets/icons/mysql-original.svg" },
  "Git":        { path: "assets/icons/git-original.svg" },
  "GitHub":     { path: "assets/icons/github-original.svg", invert: true },
  "VSCode":     { path: "assets/icons/vscode-original.svg" },
};

function buildTools() {
  const bodyEl = document.getElementById("tools-body");
  prepType(document.getElementById("tools-title-text"), "const strumenti = [");
  prepType(document.getElementById("tools-close-text"), "];");

  bodyEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "tools-categories";
  bodyEl.appendChild(wrap);

  for (const [cat, items] of Object.entries(iMieiStrumenti)) {
    const group = document.createElement("div");
    const comment = document.createElement("span");
    comment.className = "tools-cat-comment ty-pending";
    comment.textContent = "// " + cat;
    group.appendChild(comment);
    const row = document.createElement("div");
    row.className = "tools-icons-row";
    group.appendChild(row);
    wrap.appendChild(group);
    for (const item of items) {
      // card-reveal non va messa qui: è un'animazione, parte alla scoperta.
      const card = document.createElement("div");
      card.className = "tool-icon-card ty-pending";
      const icon = techIconMap[item];
      if (icon) {
        const img = document.createElement("img");
        img.src = icon.path;
        img.alt = item;
        if (icon.invert) img.setAttribute("data-invert", "");
        card.appendChild(img);
      }
      const lbl = document.createElement("span");
      lbl.className = "tool-icon-label";
      lbl.textContent = item;
      card.appendChild(lbl);
      row.appendChild(card);
    }
  }

  ["tools-title-ln","tools-body-ln","tools-close-ln","tools-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      el.dataset.fixedRows = "0";
      // La riga vuota di coda contiene solo lo span dei numeri: azzerandolo
      // collasserebbe, e il documento si allungherebbe a fine scrittura.
      if (id.endsWith("-empty-ln")) el.classList.add("ty-reserve");
    });
}

/* ============================================================
   PROGETTI SECTION
   ============================================================ */

/* Adatta il contenuto della riga chiusa della card alla larghezza disponibile,
   dando priorità alla descrizione: nasconde i tech tag uno alla volta partendo
   dall'ultimo dell'array `tech` (tecnologia meno usata nel progetto) e lo
   spazio liberato va alla descrizione, che è flex: 1. La descrizione può
   andare a capo, ma solo finché resta dentro l'altezza della card: quando la
   supera si toglie un altro tag. Si ferma quando resta un solo tag; se anche
   così sfora, nasconde la descrizione lasciando il solo tag della tecnologia
   più usata.
   card: elemento .project-card da adattare. Nessun valore di ritorno. */
function fitCardRow(card) {
  if (card.classList.contains("gol-focus-active")) return;
  const row = card.querySelector(".proj-card-row");
  if (!row) return;
  const desc = card.querySelector(".proj-desc");
  const tags = [...card.querySelectorAll(".proj-card-footer .tech-tag")];

  // Reset: riparte sempre dal contenuto completo, così al crescere della
  // finestra gli elementi tolti tornano visibili.
  tags.forEach(t => t.hidden = false);
  if (!desc) return;
  desc.hidden = false;

  const budget = parseFloat(getComputedStyle(row).maxHeight) || 0;
  if (!budget) return;
  // La riga ha max-height fissa: va sbloccata durante la misura, altrimenti
  // offsetHeight resta sempre entro il budget e l'overflow è invisibile.
  row.style.maxHeight = "none";
  const overflows = () => row.offsetHeight > budget + 1;

  for (let i = tags.length - 1; i > 0 && overflows(); i--) tags[i].hidden = true;
  if (overflows()) desc.hidden = true;
  row.style.maxHeight = "";
}

function buildProjects() {
  const listEl = document.getElementById("projects-list");
  prepType(document.getElementById("proj-title-text"), "const progetti = [");
  prepType(document.getElementById("proj-close-text"), "];");

  listEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "projects-grid";
  listEl.appendChild(wrap);

  for (let i = 0; i < iMieiProgetti.length; i++) {
    const p = iMieiProgetti[i];
    const group = document.createElement("div");
    group.className = "ty-pending";
    const comment = document.createElement("span");
    comment.className = "proj-card-comment";
    comment.textContent = "// " + p.nome.toLowerCase().replace(/ /g, "-") + ".js";
    group.appendChild(comment);

    const card = document.createElement("div");
    card.className = "project-card";
    const techTags = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
    const linkHtml = [
      p.link && p.link !== "#" ? `<a href="${p.link}" target="_blank" class="proj-open-link">→ open</a>` : ``,
      p.github ? `<a href="${p.github}" target="_blank" class="proj-open-link">→ github</a>` : ``
    ].join("");
    const golHtml = p.isGol ? `
      <button type="button" class="gol-focus-handle" aria-label="Riduci controlli">
        <svg class="gol-ico gol-ico-handle-down" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
        <svg class="gol-ico gol-ico-handle-up" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,10 8,6 12,10"/></svg>
      </button>
      <div class="gol-controls" data-tweaks-ignore>
        <button type="button" class="gol-btn" data-gol-action="toggle" aria-label="Pausa/Play" data-tooltip="Pausa / Play">
          <svg class="gol-ico gol-ico-pause" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="4" x2="6" y2="12"/><line x1="10" y1="4" x2="10" y2="12"/></svg>
          <svg class="gol-ico gol-ico-play" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4 L12 8 L5.5 12 Z"/></svg>
        </button>
        <button type="button" class="gol-btn gol-step-btn" data-gol-action="step" aria-label="Avanza di una generazione" data-tooltip="Passo singolo">
          <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 4 L10.5 8 L4.5 12 Z" fill="currentColor" stroke="none"/>
            <line x1="12" y1="4" x2="12" y2="12"/>
          </svg>
        </button>
        <button type="button" class="gol-btn" data-gol-action="clear" aria-label="Pulisci" data-tooltip="Pulisci griglia">
          <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4.5" y1="4.5" x2="11.5" y2="11.5"/><line x1="11.5" y1="4.5" x2="4.5" y2="11.5"/></svg>
        </button>
        <button type="button" class="gol-btn" data-gol-action="reseed" aria-label="Re-seed" data-tooltip="Nuova generazione">
          <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 8 A4.5 4.5 0 1 1 8 3.5 L11 3.5"/><polyline points="9.6,2 11,3.5 9.6,5"/></svg>
        </button>
      </div>` : ``;
    const middleHtml = p.isGol ? `` : `<p class="proj-desc">${p.desc}</p>`;
    const speedSliderHtml = p.isGol ? `
      <div class="gol-speed-wrap" data-tweaks-ignore>
        <div class="gol-speed-row">
          <span class="gol-speed-label">velocità</span>
          <span class="gol-speed-edge">lento</span>
          <input type="range" class="gol-speed-slider" data-gol-action="speed"
                 min="100" max="2000" step="50" value="1820">
          <span class="gol-speed-edge">veloce</span>
        </div>
        <div class="gol-pen-row">
          <button type="button" class="gol-btn gol-pen-btn is-active" data-gol-pen="none" data-tooltip="Puntatore (non disegna)">
            <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round">
              <path d="M3 2 L3 12.2 L5.6 9.6 L7.4 13.6 L8.9 13 L7.1 9 L10.6 9 Z"/>
            </svg>
          </button>
          <button type="button" class="gol-btn gol-pen-btn" data-gol-pen="draw" data-tooltip="Disegna trascinando">
            <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11.2 2.6 L13.4 4.8 L5.6 12.6 L2.6 13.4 L3.4 10.4 Z"/>
              <path d="M9.8 4 L12 6.2"/>
              <path d="M2.6 13.4 L4.6 11.4"/>
            </svg>
          </button>
          <button type="button" class="gol-btn gol-pen-btn" data-gol-pen="glider" data-tooltip="Glider">
            <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="6" y="2" width="3" height="3" fill="currentColor"/>
              <rect x="10" y="6" width="3" height="3" fill="currentColor"/>
              <rect x="2" y="10" width="3" height="3" fill="currentColor"/>
              <rect x="6" y="10" width="3" height="3" fill="currentColor"/>
              <rect x="10" y="10" width="3" height="3" fill="currentColor"/>
            </svg>
          </button>
          <div class="gol-pattern-wrap">
            <button type="button" class="gol-btn gol-pattern-trigger" data-gol-action="pattern-toggle" data-tooltip="Pattern">
              <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="3" height="3"/><rect x="7" y="2" width="3" height="3"/><rect x="12" y="2" width="3" height="3" fill="currentColor" stroke="none"/>
                <rect x="2" y="7" width="3" height="3" fill="currentColor" stroke="none"/><rect x="7" y="7" width="3" height="3"/><rect x="12" y="7" width="3" height="3"/>
                <rect x="2" y="12" width="3" height="3"/><rect x="7" y="12" width="3" height="3" fill="currentColor" stroke="none"/><rect x="12" y="12" width="3" height="3"/>
              </svg>
            </button>
            <div class="gol-pattern-dropdown" role="menu">
              <button type="button" class="gol-pattern-option" data-gol-pattern="gosper-gun">gosper gun</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="pulsar">pulsar</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="pentadecathlon">pentadecathlon</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="acorn">acorn</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="diehard">diehard</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="lwss">lwss</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="beacon">beacon</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="pi-heptomino">pi-heptomino</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="switch-engine">switch engine</button>
              <button type="button" class="gol-pattern-option" data-gol-pattern="copperhead">copperhead</button>
            </div>
          </div>
          <button type="button" class="gol-btn gol-focus-btn" data-gol-action="focus" data-tooltip="Modalit&agrave; focus">
            <svg class="gol-ico gol-ico-focus-on" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="2,6 2,2 6,2"/><polyline points="14,6 14,2 10,2"/>
              <polyline points="2,10 2,14 6,14"/><polyline points="14,10 14,14 10,14"/>
            </svg>
            <svg class="gol-ico gol-ico-focus-off" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6,2 6,6 2,6"/><polyline points="10,2 10,6 14,6"/>
              <polyline points="6,14 6,10 2,10"/><polyline points="10,14 10,10 14,10"/>
            </svg>
          </button>
        </div>
      </div>` : ``;
    const expandedHtml = p.dettagli ? `
      <div class="proj-card-expanded">
        <div class="proj-card-expanded-inner">
          <div class="proj-card-expanded-text">${p.dettagli}</div>
          ${linkHtml ? `<div class="proj-card-links">${linkHtml}</div>` : ``}
        </div>
      </div>` : ``;
    const golInfoCardHtml = p.isGol ? `<div class="gol-info-card" aria-hidden="true"><button type="button" class="gol-info-close" aria-label="Chiudi">×</button><p class="gol-info-title"></p><p class="gol-info-desc"></p></div>` : ``;
    card.innerHTML = `
      <div class="proj-card-row">
        <div class="proj-card-body">
          <p class="proj-name">${p.nome}</p>
          ${middleHtml}
        </div>
        <div class="proj-card-footer">${techTags}</div>
      </div>
      ${golHtml}
      ${speedSliderHtml}
      ${expandedHtml}
      ${golInfoCardHtml}`;
    if (p.isGol) {
      bindGolControls(card);
      // Ripristina focus mode se era attiva prima del reload
      if (sessionStorage.getItem("golFocusMode")) {
        requestAnimationFrame(() => {
          enterFocus(card, true);
          _syncFocus(true);
          window.__gol && window.__gol.setCellColor(_focusCellColor(), 0);
        });
      }
    }
    if (p.dettagli) {
      card.classList.add("is-expandable");
      card.addEventListener("click", e => {
        if (card.classList.contains("gol-focus-active")) return;
        if (e.target.closest(".proj-open-link, button, a")) return;
        const wasOpen = card.classList.contains("is-expanded");
        wrap.querySelectorAll(".project-card.is-expanded").forEach(c => {
          if (c !== card) setCardExpanded(c, false);
        });
        setCardExpanded(card, !wasOpen);
      });
    } else if (p.link && p.link !== "#" && !p.isGol) {
      card.addEventListener("click", () => window.open(p.link, "_blank"));
    }
    card.querySelectorAll(".proj-open-link").forEach(linkEl => {
      linkEl.addEventListener("click", e => e.stopPropagation());
    });

    group.appendChild(card);
    wrap.appendChild(group);
    fitCardRow(card);
  }

  ["proj-title-ln","proj-body-ln","proj-close-ln","proj-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      el.dataset.fixedRows = "0";
      // La riga vuota di coda contiene solo lo span dei numeri: azzerandolo
      // collasserebbe, e il documento si allungherebbe a fine scrittura.
      if (id.endsWith("-empty-ln")) el.classList.add("ty-reserve");
    });
  setupProjResizeObserver();
}

async function revealProjects() {
  const listEl  = document.getElementById("projects-list");
  const titleEl = document.getElementById("proj-title-text");
  const closeEl = document.getElementById("proj-close-text");
  const bodyLn  = document.getElementById("proj-body-ln");
  const s = sec.projects;

  delete document.getElementById("proj-title-ln").dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(titleEl.closest(".code-row"));
  await typeInto(titleEl, s);

  for (const group of listEl.querySelectorAll(".projects-grid > .ty-pending")) {
    group.classList.remove("ty-pending");
    group.classList.add("card-reveal");
    markRevealed(listEl, group);
    bodyLn.dataset.fixedRows = String(revealedRows(listEl));
    setBlockH(listEl);
    updateIndentLineH(group);
    recomputeLineNumbers();
    await fast(s, 180);
  }
  delete bodyLn.dataset.fixedRows;

  delete document.getElementById("proj-close-ln").dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(closeEl.closest(".code-row"));
  await typeInto(closeEl, s);
  { const el = document.getElementById("proj-empty-ln"); delete el.dataset.fixedRows; el.classList.remove("ty-reserve"); }

  s.done = true;
  recomputeLineNumbers();
  await fast(s, 200);
  startSection("contacts");
}

/* ============================================================
   CONTATTI SECTION
   ============================================================ */
function buildContatti() {
  const titleEl = document.getElementById("contact-title-text");
  const bodyEl  = document.getElementById("contact-body");
  const closeEl = document.getElementById("contact-close-text");

  prepType(titleEl, "const contatti = {");
  prepType(closeEl, "};");

  const isMobile = window.innerWidth <= 600;
  Object.entries(contatti).forEach(([k, raw], ei, arr) => {
    const isObj = typeof raw === "object" && raw !== null;
    const fullDisplay = isObj ? raw.display : raw;
    const display = (isMobile && k !== "email")
      ? fullDisplay.slice(fullDisplay.lastIndexOf("/") + 1)
      : fullDisplay;
    // Email punta a Gmail web compose: funziona ovunque (no client mail richiesto)
    // e tasto destro "apri in nuova scheda" carica davvero la pagina invece di about:blank.
    const href = isObj
      ? raw.href
      : (k === "email"
          ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(raw)}`
          : `https://${raw}`);
    const a = document.createElement("a");
    a.className = "contact-link ty-pending";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<span class="contact-key"></span><span class="contact-sep">:</span><span class="contact-val"></span>`;
    bodyEl.appendChild(a);
    prepType(a.querySelector(".contact-key"), k);
    prepType(a.querySelector(".contact-val"), `"${display}"${ei < arr.length - 1 ? "," : ""}`);
  });

  ["contact-title-ln","contact-body-ln","contact-close-ln","contact-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      el.dataset.fixedRows = "0";
      // La riga vuota di coda contiene solo lo span dei numeri: azzerandolo
      // collasserebbe, e il documento si allungherebbe a fine scrittura.
      if (id.endsWith("-empty-ln")) el.classList.add("ty-reserve");
    });
}

async function revealContatti() {
  const titleEl = document.getElementById("contact-title-text");
  const bodyEl  = document.getElementById("contact-body");
  const closeEl = document.getElementById("contact-close-text");
  const titleLn = document.getElementById("contact-title-ln");
  const bodyLn  = document.getElementById("contact-body-ln");
  const closeLn = document.getElementById("contact-close-ln");
  const s = sec.contacts;

  delete titleLn.dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(titleEl.closest(".code-row"));
  await typeInto(titleEl, s);

  let shown = 0;
  for (const a of bodyEl.querySelectorAll(".contact-link")) {
    a.classList.remove("ty-pending");
    markRevealed(bodyEl, a);
    shown += rowsOf(a);
    bodyLn.dataset.fixedRows = String(shown);
    setBlockH(bodyEl);
    updateIndentLineH(a);
    recomputeLineNumbers();

    const valEl = a.querySelector(".contact-val");
    await typeInto(a.querySelector(".contact-key"), s);
    await typeInto(valEl, s);
  }
  delete bodyLn.dataset.fixedRows;

  delete closeLn.dataset.fixedRows;
  recomputeLineNumbers();
  setCursorEl(closeEl.closest(".code-row"));
  await typeInto(closeEl, s);
  { const el = document.getElementById("contact-empty-ln"); delete el.dataset.fixedRows; el.classList.remove("ty-reserve"); }

  s.done = true;
  recomputeLineNumbers();
  await fast(s, 120);
  placeFinalBraceAndLine();
}

function placeFinalBraceAndLine() {
  closingBrace.style.display = "block";
  const braceLn = document.getElementById("brace-line-numbers");
  if (braceLn) braceLn.style.display = "block";
  indentLine.style.display = "block";

  // Posiziona graffa e altezza. indentDone è ancora false, quindi la linea di
  // indentazione non viene scritta qui: il suo ultimo tratto è animato sotto.
  pinDocHeight();

  const h1r = document.querySelector("h1").getBoundingClientRect();
  const lt  = h1r.top + window.scrollY + lastNameLines * singleLineHeight(document.getElementById("full-name"));
  const braceTop = parseFloat(closingBrace.style.top) || lt;
  _lineTargetH = Math.max(braceTop - lt, 0);
  if (!_lineTweenRunning) { _lineTweenRunning = true; requestAnimationFrame(_tweenLine); }
  window.indentDone = true;

  // Ultima sezione e blocco globale: le regioni che diventano pronte solo ora.
  ensureFoldHandles();
}

/* ============================================================
   CODE FOLDING
   Ogni barra di indentazione delimita una regione piegabile. Ci sono due
   livelli annidati: la barra globale (#indent-line, dalla riga del nome fino
   alla graffa) e le barre di sezione (.code-block::before, il corpo di ogni
   sezione). La freccetta vive in overlay nella gutter, cioè nello spazio fra
   la colonna dei numeri e la barra della propria regione.
   ============================================================ */

/* Elenca le regioni piegabili. Ritorna array di
   { handleRow, global, targets, ready }: handleRow è la riga che porta la
   freccetta, targets gli elementi che il fold nasconde, ready() dice se il
   contenuto della regione è già stato generato per intero. */
function foldRegions() {
  const sections = [...document.querySelectorAll(".code-section")];
  const regions = [{
    handleRow: document.querySelector("h1"),
    global: true,
    targets: [revealSection, ...sections],
    // Racchiude tutte le sezioni: pronta solo a pagina completa, altrimenti
    // piegarla nasconderebbe sezioni ancora in scrittura.
    ready: () => secOrder.every(n => sec[n].done),
  }];
  sections.forEach(secEl => {
    const titleRow = secEl.querySelector(".code-row");
    const bodyRow  = secEl.querySelector(".code-block")?.closest(".code-row");
    if (!titleRow || !bodyRow) return;
    const key = SECTION_KEY_BY_ID[secEl.id];
    regions.push({
      handleRow: titleRow,
      global: false,
      targets: [bodyRow],
      ready: () => !!(key && sec[key].done),
    });
  });
  return regions;
}

/* Piega o espande una regione e riallinea la geometria.
   region: voce di foldRegions(). handle: il bottone che l'ha innescata. */
function toggleFold(region, handle) {
  const fold = !handle.classList.contains("is-folded-on");
  region.targets.forEach(el => el.classList.toggle("is-folded", fold));
  handle.classList.toggle("is-folded-on", fold);
  handle.setAttribute("aria-expanded", String(!fold));

  // recomputeLineNumbers ri-pinna minHeight sui body: le barre e la graffa
  // vanno misurate dopo, sulle altezze definitive.
  recomputeLineNumbers();
  refreshAllBlockH();
  pinDocHeight();
  // Il documento si è accorciato sotto la posizione corrente: senza questo
  // ci pensa il clamp listener, ma strattonando a scroll già avvenuto.
  if (window.__maxScroll != null && window.scrollY > window.__maxScroll) {
    window.scrollTo(0, window.__maxScroll);
  }
  // Assesta e ridimensiona il canvas GoL alla nuova altezza del documento.
  pumpLayoutDuring(120);
}

/* Accende la classe gutter-hover finché il puntatore sta a sinistra della prima
   barra di indentazione, così tutte le freccette compaiono insieme.
   Confronta con indentLine.style.left invece di getBoundingClientRect per non
   forzare un layout a ogni mousemove; la pagina non scrolla in orizzontale
   (html ha overflow-x: hidden), quindi x di viewport e di pagina coincidono. */
function bindGutterHover() {
  let inside = false;
  const setInside = next => {
    if (next === inside) return;
    inside = next;
    document.body.classList.toggle("gutter-hover", inside);
  };
  document.addEventListener("mousemove", e => {
    const edge = parseFloat(indentLine.style.left) || 0;
    setInside(edge > 0 && e.clientX < edge);
  }, { passive: true });
  document.addEventListener("mouseleave", () => setInside(false));
}

/* Crea le maniglie mancanti. Idempotente: va richiamata via via che le sezioni
   si completano, così ogni freccetta compare appena il suo blocco esiste
   invece di aspettare che tutta la pagina sia generata. */
let _gutterHoverBound = false;
function ensureFoldHandles() {
  if (!_gutterHoverBound) { _gutterHoverBound = true; bindGutterHover(); }
  foldRegions().forEach(region => {
    if (!region.ready()) return;
    if (region.handleRow.querySelector(":scope > .fold-handle")) return;
    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "fold-handle" + (region.global ? " fold-handle--global" : "");
    handle.setAttribute("aria-label", "Piega o espandi il blocco");
    handle.setAttribute("aria-expanded", "true");
    // viewBox stretto attorno alla sola freccetta + preserveAspectRatio="none":
    // il disegno riempie esattamente il box, senza il letterboxing che con un
    // viewBox quadrato lasciava la freccetta a una frazione della cella.
    handle.innerHTML = `<svg class="fold-chevron" viewBox="0 0 6 10" preserveAspectRatio="none" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="1,1 5,5 1,9" vector-effect="non-scaling-stroke" stroke-width="1.4"/></svg>`;
    handle.addEventListener("click", e => {
      e.stopPropagation();
      toggleFold(region, handle);
    });
    region.handleRow.appendChild(handle);
  });
}

/* ============================================================
   INPUT / TASTIERA
   ============================================================ */
function activateCursor(el)   { el.classList.add("cursor-active"); currentEditable = el; }
function deactivateCursor(el) { el.classList.remove("cursor-active"); if (currentEditable === el) currentEditable = null; }

document.addEventListener("keydown", e => {
  handleEasterEggKey(e.key);
  if (!currentEditable) return;
  const isName = currentEditable === document.getElementById("full-name");
  if (isName && !animFinished) return;
  if (e.key === "a" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); return; }
  if (e.key === "Backspace") {
    e.preventDefault();
    const t = currentEditable.textContent;
    if (t.length) { currentEditable.textContent = t.slice(0, -1); updateNameLn(); }
    return;
  }
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    currentEditable.textContent += e.key;
    updateNameLn();
  }
});
document.addEventListener("paste",     e => e.preventDefault());
document.addEventListener("mousedown", e => { if (currentEditable?.contains(e.target)) e.preventDefault(); });

/* ============================================================
   EASTER EGG — digita "sudo" ovunque
   ============================================================ */
let sudoBuffer = "";
function handleEasterEggKey(key) {
  if (key.length !== 1) { sudoBuffer = ""; return; }
  sudoBuffer = (sudoBuffer + key).slice(-4);
  if (sudoBuffer === "sudo") showEasterEgg();
}

function showEasterEgg() {
  const ee = document.getElementById("easter-egg");
  const cnt = document.getElementById("ee-content");
  ee.classList.add("visible");
  cnt.innerHTML = "";

  const lines = [
    { html: '<span class="ee-dim">$</span> sudo rm -rf /ego', delay: 0 },
    { html: '<span class="ee-dim">[sudo] password for sasha: </span><span class="ee-cursor"></span>', delay: 600 },
    { html: '', delay: 1800 },
    { html: '<span class="ee-dim">Verifying...</span>', delay: 2000 },
    { html: '', delay: 2800 },
    { html: '<span class="ee-green">✓ Accesso concesso.</span>', delay: 3000 },
    { html: '<span class="ee-green">✓ Easter egg trovato!</span>', delay: 3600 },
    { html: '<span class="ee-dim">  — hai digitato "sudo", bravo hacker.</span>', delay: 4200 },
  ];
  lines.forEach(({ html, delay }) => {
    setTimeout(() => {
      cnt.querySelectorAll(".ee-cursor").forEach(c => c.parentElement.remove());
      const d = document.createElement("div");
      d.innerHTML = html;
      if (html) cnt.appendChild(d);
      else cnt.appendChild(document.createElement("br"));
    }, delay);
  });
  sudoBuffer = "";
}
function closeEasterEgg() {
  document.getElementById("easter-egg").classList.remove("visible");
  document.getElementById("ee-content").innerHTML = "";
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
// Colore cella in focus mode: bianco su tema dark, nero su tema light
function _focusCellColor() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "#000000" : "#ffffff";
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const html  = document.documentElement;
  const label = document.getElementById("theme-label");
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  label.textContent = isDark ? "//Back to the Cave" : "//Devs: Beware";
  // Se focus mode attivo, fada celle al nuovo colore di contrasto
  if (document.body.classList.contains("gol-focus-mode") && window.__gol) {
    window.__gol.setCellColor(_focusCellColor(), 300);
  }
});

/* ============================================================
   GOL CONTROLS
   ============================================================ */
/* Smoothly expand/collapse a project card via max-height (animate both directions).
   On open: set explicit px height of inner, then unset to 'none' after transition (so dynamic content fits).
   On close: re-pin current px height, then on next frame set to 0 to trigger collapse transition. */
// Durata transizione card in ms — deve corrispondere al valore in CSS (.proj-card-expanded, .gol-speed-wrap)
const CARD_TRANSITION_MS = 540;

/* Scroll animato con la stessa curva ease-in-out e durata del CSS transition.
   Garantisce che scroll e collapse partano insieme e finiscano insieme. */
function animateScrollTo(targetY, durationMs) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) return;
  const startTime = performance.now();
  function easeInOut(t) {
    return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
  }
  function tick(now) {
    const progress = Math.min(1, (now - startTime) / durationMs);
    window.scrollTo(0, Math.round(startY + delta * easeInOut(progress)));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function setCardExpanded(card, open) {
  const exp = card.querySelector(".proj-card-expanded");
  if (!exp) return;
  const inner = exp.querySelector(".proj-card-expanded-inner");
  if (!inner) return;
  const speedWrap = card.querySelector(".gol-speed-wrap");
  exp.removeEventListener("transitionend", exp._golEndHandler || (()=>{}));
  if (open) {
    card.classList.add("is-expanded");
    const target = inner.scrollHeight;
    exp.style.maxHeight = target + "px";
    if (speedWrap) speedWrap.style.maxHeight = speedWrap.scrollHeight + "px";
    const onEnd = e => {
      if (e.propertyName !== "max-height") return;
      exp.style.maxHeight = "none";
      if (speedWrap) speedWrap.style.maxHeight = "none";
      exp.removeEventListener("transitionend", onEnd);
    };
    exp._golEndHandler = onEnd;
    exp.addEventListener("transitionend", onEnd);
  } else {
    const expH = exp.scrollHeight;
    const speedH = speedWrap ? speedWrap.scrollHeight : 0;
    exp.style.maxHeight = expH + "px";
    if (speedWrap) speedWrap.style.maxHeight = speedH + "px";

    // Forza reflow: i valori px sopra devono essere committati prima che
    // la transizione parta, altrimenti il browser salta direttamente a 0.
    void exp.offsetHeight;

    // Scroll animato + inizio collapse nello stesso frame sincrono: stessa
    // curva ease-in-out e stessa durata del CSS transition → un'unica motion.
    const newMaxScroll = document.documentElement.scrollHeight - window.innerHeight - expH - speedH;
    if (window.scrollY > newMaxScroll) {
      animateScrollTo(Math.max(0, newMaxScroll), CARD_TRANSITION_MS);
    }
    card.classList.remove("is-expanded");
    exp.style.maxHeight = "0px";
    if (speedWrap) speedWrap.style.maxHeight = "0px";
    if (card.querySelector(".gol-controls")) {
      window.__gol && window.__gol.set({ pen: "none" });
      _syncPen("none");
    }
  }
  pumpLayoutDuring(CARD_TRANSITION_MS + 80);
}

/* rAF loop che ricalcola brace + indent-line per durationMs ms.
   Usato durante apertura/chiusura card per tenere indent line allineata in tempo reale. */
let _layoutPumpEnd = 0;
let _layoutPumpRunning = false;
function pumpLayoutDuring(durationMs) {
  _layoutPumpEnd = Math.max(_layoutPumpEnd, performance.now() + durationMs);
  // Durante un'animazione la transition CSS di --block-h (320ms) farebbe
  // inseguire le barre con un ritardo visibile: va disattivata su tutte.
  document.querySelectorAll(".code-block").forEach(b => b.classList.add("no-block-transition"));
  if (_layoutPumpRunning) return;
  _layoutPumpRunning = true;
  const tick = () => {
    refreshAllBlockH();
    // Ricalcola line-numbers durante la transizione: lineRows() per
    // "dynamic-block" pinna minHeight sul source, impedendo allo
    // shrink di propagarsi e al ResizeObserver di scattare in chiusura.
    recomputeLineNumbers();
    if (window.indentDone) repositionBrace();
    if (performance.now() < _layoutPumpEnd) {
      requestAnimationFrame(tick);
    } else {
      _layoutPumpRunning = false;
      document.querySelectorAll(".code-block.no-block-transition")
        .forEach(b => b.classList.remove("no-block-transition"));
      // Canvas shrink: dopo l'animazione, ridimensiona il canvas GoL alla nuova
      // altezza del documento (già aggiornata da repositionBrace nell'ultimo tick).
      if (window.__gol && window.__gol.resize) window.__gol.resize();
    }
  };
  requestAnimationFrame(tick);
}

/* Recompute proj-body line numbers smoothly when listEl resizes (card expand/collapse).
   Append/remove one line every ~25ms. Fixed numbers stay; new ones append at end. */
let _projRO = null;
let _projAppendTimer = null;
function setupProjResizeObserver() {
  const listEl = document.getElementById("projects-list");
  if (!listEl || _projRO) return;
  _projRO = new ResizeObserver(() => recomputeProjLines());
  _projRO.observe(listEl);
}
function recomputeProjLines() {
  if (_projAppendTimer) { clearInterval(_projAppendTimer); _projAppendTimer = null; }
  let stableTicks = 0;
  let lastH = -1;
  _projAppendTimer = setInterval(() => {
    const listEl = document.getElementById("projects-list");
    if (!listEl) { clearInterval(_projAppendTimer); _projAppendTimer = null; return; }
    recomputeLineNumbers();
    if (window.indentDone) repositionBrace();
    // Stoppa quando l'altezza si stabilizza (~100ms invariata)
    if (listEl.offsetHeight === lastH) stableTicks++;
    else { stableTicks = 0; lastH = listEl.offsetHeight; }
    if (stableTicks >= 4) {
      clearInterval(_projAppendTimer);
      _projAppendTimer = null;
    }
  }, 25);
}

// Sync helpers — aggiornano TUTTI i bottoni/slider gemelli (card + focus bar)
function _syncPaused(paused) {
  document.querySelectorAll('[data-gol-action="toggle"]').forEach(b =>
    b.classList.toggle("is-paused", paused));
}
function _syncPen(mode) {
  document.querySelectorAll('[data-gol-pen]').forEach(b =>
    b.classList.toggle("is-active", b.dataset.golPen === mode));
}
function _syncSpeed(speedMs) {
  document.querySelectorAll('[data-gol-action="speed"]').forEach(s => {
    s.value = 2100 - speedMs;
  });
}
function _syncFocus(isFocus) {
  document.querySelectorAll('[data-gol-action="focus"]').forEach(b =>
    b.classList.toggle("is-active", isFocus));
}

function bindGolControls(root) {
  const toggleBtn = root.querySelector('[data-gol-action="toggle"]');
  const clearBtn  = root.querySelector('[data-gol-action="clear"]');
  const reseedBtn = root.querySelector('[data-gol-action="reseed"]');
  if (!toggleBtn) return;

  const stop = e => { e.stopPropagation(); e.preventDefault(); };

  // Click sui gap dei controlli (tra i bottoni) non deve far espandere la card
  const ctrlsEl = root.querySelector(".gol-controls");
  if (ctrlsEl) ctrlsEl.addEventListener("click", e => e.stopPropagation());

  toggleBtn.addEventListener("click", e => {
    stop(e);
    if (!window.__gol) return;
    const paused = !window.__gol.get().paused;
    window.__gol.set({ paused });
    _syncPaused(paused);
  });
  clearBtn.addEventListener("click", e => { stop(e); window.__gol && window.__gol.clear(); });
  reseedBtn.addEventListener("click", e => { stop(e); window.__gol && window.__gol.reseed(); });

  const stepBtn = root.querySelector('[data-gol-action="step"]');
  if (stepBtn) stepBtn.addEventListener("click", e => { stop(e); window.__gol && window.__gol.tick(); });

  const speedSlider = root.querySelector('[data-gol-action="speed"]');
  if (speedSlider) {
    if (window.__gol) speedSlider.value = 2100 - window.__gol.get().speedMs;
    speedSlider.addEventListener("input", e => {
      e.stopPropagation();
      const speedMs = 2100 - Number(speedSlider.value);
      window.__gol && window.__gol.set({ speedMs });
      _syncSpeed(speedMs);
    });
    speedSlider.addEventListener("click", e => e.stopPropagation());
  }

  const penBtns = root.querySelectorAll('[data-gol-pen]');
  if (penBtns.length) {
    const currentPen = window.__gol ? window.__gol.get().pen : "none";
    penBtns.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.golPen === currentPen);
      btn.addEventListener("click", e => {
        stop(e);
        const mode = btn.dataset.golPen;
        window.__gol && window.__gol.set({ pen: mode });
        _syncPen(mode);
      });
    });
  }

  // Pattern picker (solo focus mode)
  const GOL_PATTERN_INFO = {
    "gosper-gun":     { title: "Gosper Glider Gun", desc: "Prima struttura capace di generazione infinita, scoperta da William Gosper nel 1970. Produce un glider ogni 30 generazioni." },
    "pulsar":         { title: "Pulsar", desc: "Oscillatore di periodo 3. Uno dei pattern più simmetrici e visivamente ipnotici del GoL." },
    "pentadecathlon": { title: "Pentadecathlon", desc: "Oscillatore di periodo 15 — tra i più alti per una struttura così semplice. Prende il nome dal ciclo olimpico." },
    "acorn":          { title: "Acorn", desc: "Methuselah da 7 celle. Cresce in modo caotico per 5206 generazioni prima di stabilizzarsi in 633 celle." },
    "diehard":        { title: "Diehard", desc: "Methuselah da 7 celle. Sopravvive per 130 generazioni, poi scompare completamente senza lasciare traccia." },
    "lwss":           { title: "Lightweight Spaceship", desc: "Il più piccolo degli spaceship standard. Si muove orizzontalmente di 2 celle ogni 4 generazioni (velocità c/2). Scoperto da John Conway nel 1970." },
    "beacon":         { title: "Beacon", desc: "Oscillatore di periodo 2 formato da due blocchi 2×2 sovrapposti a un angolo. Uno dei più semplici e comuni oscillatori del GoL." },
    "pi-heptomino":   { title: "Pi-Heptomino\n(il mio preferito)", desc: "Methuselah da 7 celle a forma di π. Evolve in modo caotico per 173 generazioni prima di stabilizzarsi in una configurazione con glider." },
    "switch-engine":  { title: "Switch Engine", desc: "Struttura da 8 celle scoperta da Charles Corderman nel 1971. Cresce in modo infinito lasciando una scia di detriti, muovendosi in diagonale a velocità c/12." },
    "copperhead":     { title: "Copperhead", desc: "Spaceship di periodo 10 scoperto nel 2016. Si muove verticalmente a velocità c/10. Notevole per la sua forma compatta e simmetrica." },
  };
  const patternTrigger = root.querySelector('[data-gol-action="pattern-toggle"]');
  const patternDropdown = root.querySelector('.gol-pattern-dropdown');
  const card = root.closest(".project-card");
  const infoCard = card ? card.querySelector('.gol-info-card') : null;
  let _infoLocked = false; // true dopo selezione pattern — card rimane visibile finché X chiude

  function _populateInfo(key) {
    if (!infoCard) return;
    const data = GOL_PATTERN_INFO[key];
    if (!data) return;
    infoCard.querySelector('.gol-info-title').textContent = data.title;
    infoCard.querySelector('.gol-info-desc').textContent = data.desc;
    infoCard.classList.add("is-visible");
  }
  function _hideInfo() {
    if (!infoCard) return;
    infoCard.classList.remove("is-visible", "is-locked");
    _infoLocked = false;
  }

  if (patternTrigger && patternDropdown) {
    patternTrigger.addEventListener("click", e => {
      stop(e);
      patternDropdown.classList.toggle("is-open");
    });

    patternDropdown.querySelectorAll('[data-gol-pattern]').forEach(btn => {
      // Hover: mostra info del pattern corrente, sempre
      btn.addEventListener("mouseenter", () => {
        _populateInfo(btn.dataset.golPattern);
      });
      btn.addEventListener("mouseleave", () => {
        if (!_infoLocked) _hideInfo();
      });
      // Click: carica pattern, blocca info card visibile
      btn.addEventListener("click", e => {
        stop(e);
        const name = btn.dataset.golPattern;
        if (window.__gol) {
          window.__gol.loadPattern(name);
          _syncPaused(true);
        }
        _populateInfo(name);
        _infoLocked = true;
        infoCard && infoCard.classList.add("is-locked");
        patternDropdown.classList.remove("is-open");
      });
    });

    // X sulla info card chiude
    if (infoCard) {
      infoCard.querySelector('.gol-info-close').addEventListener("click", e => {
        stop(e);
        _hideInfo();
      });
    }

    // Chiudi dropdown cliccando fuori
    document.addEventListener("click", e => {
      if (!patternTrigger.contains(e.target) && !patternDropdown.contains(e.target)) {
        patternDropdown.classList.remove("is-open");
      }
    });
  }

  // Toggle focus mode (FLIP morph + fade sezioni)
  const focusBtn = root.querySelector('[data-gol-action="focus"]');
  if (focusBtn) {
    focusBtn.addEventListener("click", e => {
      stop(e);
      const card = root.closest(".project-card") || root;
      const isFocus = !document.body.classList.contains("gol-focus-mode");
      if (isFocus) enterFocus(card);
      else exitFocus(card);
      _syncFocus(isFocus);
      window.__gol && window.__gol.setCellColor(isFocus ? _focusCellColor() : null, FOCUS_DUR + 220);
    });
  }

  const handleBtn = root.querySelector('.gol-focus-handle');
  if (handleBtn) {
    handleBtn.addEventListener('click', e => {
      stop(e);
      root.classList.toggle('gol-focus-collapsed');
    });
  }
}

/* ============================================================
   GOL FOCUS MODE — FLIP morph
   La card stessa si sposta/ridimensiona da posizione in-flow a fixed
   bottom-center via FLIP. Reparenting in <body> per disaccoppiare dal
   fade opacity delle sezioni.
   ============================================================ */
const FOCUS_DUR = 700;
let _golCardOriginalParent = null;
let _golCardOriginalNextSibling = null;

// Applica FLIP transform da rect "first" a layout corrente
function _flipFromTo(card, first) {
  const last = card.getBoundingClientRect();
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const sx = first.width / Math.max(1, last.width);
  const sy = first.height / Math.max(1, last.height);
  card.style.transformOrigin = "top left";
  card.style.transition = "none";
  card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  // Force reflow per applicare transform "iniziale" prima della transizione
  void card.offsetWidth;
  requestAnimationFrame(() => {
    card.style.transition = `transform ${FOCUS_DUR}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
    card.style.transform = "";
  });
  setTimeout(() => {
    card.style.transition = "";
    card.style.transform = "";
    card.style.transformOrigin = "";
  }, FOCUS_DUR + 60);
}

function enterFocus(card, instant) {
  const first = card.getBoundingClientRect();
  // Salva posizione originale per ripristino
  _golCardOriginalParent = card.parentNode;
  _golCardOriginalNextSibling = card.nextSibling;
  // Pin altezza del parent così che il document non si rimpicciolisca
  // quando reparentiamo la card (altrimenti scroll si blocca a metà)
  if (_golCardOriginalParent) {
    _golCardOriginalParent.style.minHeight = _golCardOriginalParent.offsetHeight + "px";
  }
  document.body.appendChild(card);
  card.classList.add("gol-focus-active");
  document.body.classList.add("gol-focus-mode");
  document.documentElement.style.overflow = "hidden";
  sessionStorage.setItem("golFocusMode", "1");
  if (!instant) {
    _flipFromTo(card, first);
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.classList.remove("gol-focus-entering");
      void themeToggle.offsetWidth;
      themeToggle.classList.add("gol-focus-entering");
      themeToggle.addEventListener("animationend", () => {
        themeToggle.classList.remove("gol-focus-entering");
      }, { once: true });
    }
    if (typeof pumpLayoutDuring === "function") pumpLayoutDuring(FOCUS_DUR + 100);
  }
}

function exitFocus(card) {
  card.classList.remove("gol-focus-collapsed");
  const first = card.getBoundingClientRect();
  card.classList.remove("gol-focus-active");
  document.body.classList.remove("gol-focus-mode");
  document.documentElement.style.overflow = "";
  sessionStorage.removeItem("golFocusMode");
  // Slide-out toggle verso l'alto (position: fixed autonomo nella classe)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.classList.remove("gol-focus-entering");
    themeToggle.classList.add("gol-focus-leaving");
    themeToggle.addEventListener("animationend", () => {
      themeToggle.classList.remove("gol-focus-leaving");
    }, { once: true });
  }
  // Reparent dove era prima + libera min-height pinnata
  if (_golCardOriginalParent) {
    _golCardOriginalParent.style.minHeight = "";
    if (_golCardOriginalNextSibling && _golCardOriginalNextSibling.parentNode === _golCardOriginalParent) {
      _golCardOriginalParent.insertBefore(card, _golCardOriginalNextSibling);
    } else {
      _golCardOriginalParent.appendChild(card);
    }
  }
  _flipFromTo(card, first);
  if (typeof pumpLayoutDuring === "function") pumpLayoutDuring(FOCUS_DUR + 100);
}

/* ============================================================
   SCROLL + RESIZE + INIT
   ============================================================ */
/* ScrollHandler gestisce il trigger della reveal section */

function checkSectionsPassed() {
  for (let i = 0; i < secOrder.length; i++) {
    const name = secOrder[i];
    const s = sec[name];
    if (!s.el) continue;
    const rect = s.el.getBoundingClientRect();
    const passed = rect.bottom < 0;
    if (passed) {
      if (!s.started) { s.started = true; if (name === "reveal") hasTyped = true; s.start(); }
      const nx = nextSection(name);
      if (nx) startSection(nx);
    }
  }
}

window.addEventListener("scroll", () => {
  // Unica sorgente di scrollY per skipNow: il predicato non deve leggere il
  // layout, viene interrogato a ogni carattere.
  _scrollY = window.scrollY;
  const h1       = document.querySelector("h1");
  const fullName = document.getElementById("full-name");
  if (window.scrollY > 0 && animFinished) fullName.classList.add("no-cursor");
  const outOfView = window.scrollY > window.innerHeight * 0.3 + h1.offsetHeight;
  if (outOfView && !animFinished) {
    skipNameAnim = true;
    surnameEl.textContent = originalSurname;
    nameEl.textContent    = newName;
    updateNameLn();
    animFinished = true;
  }
  if (((!animFinished && outOfView) || (animFinished && window.scrollY > 0)) && !hasTyped) {
    hasTyped = true;
    sec.reveal.started = true;
    startIndentLine();
    revealBio();
  }
  if (animFinished && window.scrollY > 0) startIndentLine();
  checkSectionsPassed();
});

let indentLineStarted = false;
function startIndentLine() {
  if (indentLineStarted) return;
  indentLineStarted = true;
  const h1r = document.querySelector("h1").getBoundingClientRect();
  const slh = singleLineHeight(document.getElementById("full-name"));
  const lt  = h1r.top + window.scrollY + lastNameLines * slh;
  const ll  = h1r.left + nameLn.offsetWidth + parseInt(getComputedStyle(nameLn).marginRight);
  indentLine.style.left   = ll + "px";
  indentLine.style.top    = lt + "px";
  indentLine.style.height = "0";
  indentLine.style.display = "block";
  requestAnimationFrame(() => updateIndentLineH());
}

let _lineTargetH = 0, _lineCurH = 0, _lineTweenRunning = false;
function _tweenLine() {
  const diff = _lineTargetH - _lineCurH;
  if (Math.abs(diff) < 0.5) {
    _lineCurH = _lineTargetH;
    indentLine.style.height = _lineCurH + "px";
    _lineTweenRunning = false;
    return;
  }
  _lineCurH += diff * 0.12;
  indentLine.style.height = _lineCurH + "px";
  requestAnimationFrame(_tweenLine);
}
function updateIndentLineH(el) {
  // Ogni punto di generazione passa di qui con l'elemento appena scoperto:
  // è il posto naturale per aggiornare il cursore dello skip. Va sopra la
  // guardia, che altrimenti lo congelerebbe a fine typing.
  setCursorEl(el || revealContent);
  if (!indentLineStarted || window.indentDone) return;
  const h1r = document.querySelector("h1").getBoundingClientRect();
  const slh = singleLineHeight(document.getElementById("full-name"));
  const lt  = h1r.top + window.scrollY + lastNameLines * slh;
  const refEl = el || revealContent;
  const bottom = refEl.getBoundingClientRect().bottom + window.scrollY;
  _lineTargetH = Math.max(bottom - lt, 0);
  if (!_lineTweenRunning) {
    _lineTweenRunning = true;
    requestAnimationFrame(_tweenLine);
  }
}

window.addEventListener("resize", () => {
  // Il font-size dipende da vh/clamp: le altezze riga in cache non valgono più.
  clearLineHCache();
  // h1 usa 7.5vw: cambiando larghezza la riserva va rimisurata prima di
  // ricalcolare il margine della reveal section, che ci si appoggia.
  measureH1Height();
  updateNameLn(); syncLnWidth(); updateRevealPos(); updateToolsLn();
  // Il testo si ri-manda a capo: i body cambiano altezza e le barre verticali
  // vanno rimisurate, altrimenti restano al valore px precedente.
  refreshAllBlockH();
  // fitCardRow può nascondere tag e descrizione, cambiando l'altezza delle
  // card: va prima dello snap, che misura i body.
  document.querySelectorAll(".project-card").forEach(fitCardRow);
  snapBodyHeights();
  pinDocHeight();
});

// Il font monospace cambia larghezze e altezza riga: butta la cache e rimisura
// quando è davvero caricato.
document.fonts?.ready.then(() => {
  clearLineHCache();
  document.querySelectorAll(".project-card").forEach(fitCardRow);
  // Cambia l'altezza di riga, quindi cambia anche il multiplo a cui i body
  // vanno arrotondati: va rifatto prima di ri-fissare l'altezza del documento.
  snapBodyHeights();
  pinDocHeight();
});

function repositionBrace() {
  const contactSec = document.getElementById("contact-section");
  const h1r = document.querySelector("h1").getBoundingClientRect();
  const slh = singleLineHeight(document.getElementById("full-name"));
  const lt  = h1r.top + window.scrollY + lastNameLines * slh;
  const ll  = h1r.left + nameLn.offsetWidth + parseInt(getComputedStyle(nameLn).marginRight);
  const emptyRow = document.getElementById("contact-empty-ln")?.closest(".code-row");
  const closeRow = document.getElementById("contact-close-text").closest(".code-row");
  const refRect  = (emptyRow || closeRow || contactSec).getBoundingClientRect();
  // Con il blocco globale piegato la riga di ancoraggio è display:none e il suo
  // rect è tutto a zero: la graffa va invece subito sotto la riga del nome.
  const refHidden = refRect.width === 0 && refRect.height === 0;
  const braceTop = refHidden ? lt : refRect.bottom + window.scrollY;
  closingBrace.style.left = ll + "px";
  closingBrace.style.top  = braceTop + "px";
  const braceLn = document.getElementById("brace-line-numbers");
  if (braceLn) {
    braceLn.style.left = (h1r.left + window.scrollX) + "px";
    braceLn.style.top  = braceTop + "px";
  }
  indentLine.style.left   = ll + "px";
  indentLine.style.top    = lt + "px";
  // Finché il typing non è finito l'altezza della linea è guidata dal tween di
  // updateIndentLineH, che la fa crescere insieme al contenuto scoperto.
  if (window.indentDone) indentLine.style.height = Math.max(braceTop - lt, 0) + "px";

  // La graffa può essere ancora display:none: va misurata lo stesso, altrimenti
  // lo spazio riservato in fondo al documento non la comprenderebbe.
  const hidden = !closingBrace.style.display || closingBrace.style.display === "none";
  if (hidden) {
    closingBrace.style.display = "block";
    closingBrace.style.visibility = "hidden";
  }
  const bh = closingBrace.offsetHeight || 42;
  if (hidden) {
    closingBrace.style.display = "";
    closingBrace.style.visibility = "";
  }

  const finalH = braceTop + bh + 8;
  document.body.style.height = finalH + "px";
  document.documentElement.style.height = finalH + "px";
  window.__maxScroll = Math.max(0, finalH - window.innerHeight);
}

/* Unico punto che fissa l'altezza del documento. L'ordine è obbligato:
   recomputeLineNumbers ri-pinna le minHeight dei body, quindi barre e graffa
   vanno misurate dopo, sulle altezze definitive.
   Nessun parametro, nessun valore di ritorno. */
function pinDocHeight() {
  refreshCursorPos();
  recomputeLineNumbers();
  refreshAllBlockH();
  repositionBrace();
  // Il floor scritto a parse-time dal restore dello scroll va tolto: se resta
  // più alto di height, lo scroll sfora la graffa.
  document.documentElement.style.minHeight = "";
  document.body.style.minHeight = "";
  if (window.__gol && window.__gol.resize) window.__gol.resize();
}

/* Impedisce di scrollare oltre la graffa. Bindato una sola volta all'init:
   con il contenuto costruito subito, __maxScroll è noto dal primo frame. */
function bindScrollClamp() {
  if (window.__scrollClampBound) return;
  window.__scrollClampBound = true;
  window.addEventListener("scroll", () => {
    if (window.__maxScroll != null && window.scrollY > window.__maxScroll) {
      window.scrollTo(0, window.__maxScroll);
    }
  }, { passive: true });
  window.addEventListener("wheel", e => {
    if (window.__maxScroll != null && window.scrollY >= window.__maxScroll && e.deltaY > 0) {
      e.preventDefault();
    }
  }, { passive: false });
  // Track Y precedente per determinare direzione del gesto: solo lo scroll
  // verso il basso oltre __maxScroll va bloccato, quello verso l'alto no.
  let lastTouchY = 0;
  window.addEventListener("touchstart", e => {
    if (e.touches && e.touches[0]) lastTouchY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener("touchmove", e => {
    // Non bloccare drag su slider/input interattivi (es. velocità GoL su mobile)
    if (e.target && e.target.closest && e.target.closest("input, [data-tweaks-ignore]")) return;
    const cur = (e.touches && e.touches[0]) ? e.touches[0].clientY : lastTouchY;
    const delta = cur - lastTouchY; // > 0 = dito giù (scroll up); < 0 = scroll down
    lastTouchY = cur;
    if (window.__maxScroll != null && window.scrollY >= window.__maxScroll && delta < 0) {
      e.preventDefault();
    }
  }, { passive: false });
}

if ("scrollRestoration" in history) history.scrollRestoration = "auto";

try {
  const sy = sessionStorage.getItem("__scrollY");
  if (sy) {
    document.documentElement.style.minHeight = (parseInt(sy) + window.innerHeight + 200) + "px";
  }
} catch (e) {}
window.addEventListener("beforeunload", () => {
  try { sessionStorage.setItem("__scrollY", String(window.scrollY)); } catch (e) {}
});

/* Costruisce subito tutto il contenuto che verrà rivelato dopo, così il layout
   è definitivo dal primo frame. Lo script è caricato con defer: il DOM esiste.
   Le sezioni non ancora convertite continuano a costruirsi durante il typing. */
/* Applica subito l'arrotondamento al multiplo di riga che lineRows() fa sui
   .code-block in modalità dynamic-block. Durante la scrittura quei body hanno
   data-fixed-rows, quindi lineRows esce prima e non pinna: senza questo il pin
   arriverebbe tutto insieme a scrittura finita e la pagina si allungherebbe di
   una frazione di riga per sezione. Nessun valore di ritorno. */
function snapBodyHeights() {
  const lns = ["perc-body-ln","tools-body-ln","proj-body-ln","contact-body-ln"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const saved = lns.map(el => el.dataset.fixedRows);
  lns.forEach(el => delete el.dataset.fixedRows);
  recomputeLineNumbers();   // misura libera e pinna minHeight sui body
  lns.forEach((el, i) => { if (saved[i] != null) el.dataset.fixedRows = saved[i]; });
  recomputeLineNumbers();   // ripristina la numerazione parziale in corso
}

function buildAll() {
  buildPercorso();
  buildContatti();
  buildBio();
  buildTools();
  buildProjects();
  snapBodyHeights();
}
buildAll();
bindScrollClamp();
pinDocHeight();

window.addEventListener("load", () => {
  measureH1Height();
  updateRevealPos(); syncLnWidth();
  pinDocHeight();
  // Lo scroll pu� essere gi� stato ripristinato dal browser prima di qui.
  _scrollY = window.scrollY;
  sec.reveal.el   = revealSection;
  sec.percorso.el = document.getElementById("percorso-section");
  sec.tools.el    = document.getElementById("tools-section");
  sec.projects.el = document.getElementById("projects-section");
  sec.contacts.el = document.getElementById("contact-section");

  let restoredScroll = window.scrollY;
  if (restoredScroll === 0) {
    try {
      const sy = parseInt(sessionStorage.getItem("__scrollY") || "0");
      if (sy > 0) { window.scrollTo(0, sy); restoredScroll = sy; }
    } catch (e) {}
  }
  const wasScrolled = restoredScroll > 0;

  if (wasScrolled) {
    skipNameAnim = true;
    surnameEl.textContent = originalSurname;
    nameEl.textContent    = newName;
    updateNameLn();
    animFinished = true;
    startIndentLine();
    checkSectionsPassed();
    if (!sec.reveal.started) {
      hasTyped = true;
      sec.reveal.started = true;
      revealBio();
    }
  } else {
    animateName().then(() => {
      animFinished = true;
      if (window.scrollY <= 50) activateCursor(document.getElementById("full-name"));
      if (window.scrollY > 0) {
        startIndentLine();
        if (!hasTyped) {
          hasTyped = true;
          sec.reveal.started = true;
          revealBio();
        }
      }
    });
  }
});
