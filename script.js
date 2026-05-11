/* ============================================================
   CONFIGURAZIONE
   ============================================================ */
const originalSurname = "bolea";
const originalName    = "Alessandro(){";
const newName         = "Sasha(){";

const iMieiStrumenti = {
  linguaggi: ["Python", "Java", "JS", "HTML", "CSS"],
  runtime:   ["Node.js", "Express", "Docker"],
  database:  ["SQL"],
  tools:     ["Git", "GitHub", "VSCode"],
};

const iMieiProgetti = [
  {
    nome:   "Game of Life",
    desc:   "Sfondo interattivo del sito",
    dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Creato dal matematico <span class="gol-hl">John Horton Conway</span> nel <span class="gol-hl">1970</span>, il Game of Life è un automa cellulare che simula l'evoluzione di una popolazione su una griglia. Non è un gioco nel senso tradizionale — non ci sono giocatori né obiettivi — ma una simulazione che si svolge da sola. Ogni cella può essere viva ■ o morta □ e, in base allo stato delle celle circostanti, il suo stato cambierà alla generazione successiva — dimostrando come comportamenti complessi possano emergere da poche semplici regole.</p>
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
    tech:   ["JS"],
    status: "LIVE",
    link:   "#",
    isGol:  true
  }
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
  reveal:   { started:false, done:false, skip:false, el:null, start:() => typeRevealText() },
  tools:    { started:false, done:false, skip:false, el:null, start:() => typeToolsSection() },
  projects: { started:false, done:false, skip:false, el:null, start:() => typeProjSection() },
  contacts: { started:false, done:false, skip:false, el:null, start:() => typeContactSection() },
};
const secOrder = ["reveal","tools","projects","contacts"];
function startSection(name) {
  const s = sec[name];
  if (!s || s.started) return;
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
const fast  = (s, ms) => s.skip ? Promise.resolve() : sleep(ms);

function syncLnWidth() {
  const w = nameLn.offsetWidth;
  ["reveal-line-numbers","tools-title-ln","tools-body-ln","tools-close-ln","tools-empty-ln",
   "proj-title-ln","proj-body-ln","proj-close-ln","proj-empty-ln",
   "contact-title-ln","contact-body-ln","contact-close-ln","contact-empty-ln"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.width = w + "px";
    });
}

function singleLineHeight(ref) {
  const t = document.createElement("span");
  t.textContent = "X"; t.style.visibility = "hidden"; t.style.position = "absolute";
  ref.appendChild(t);
  const h = t.offsetHeight;
  t.remove();
  return h;
}

/* ============================================================
   GEOMETRIA
   ============================================================ */
function updateRevealPos() {
  const h1       = document.querySelector("h1");
  const slh      = singleLineHeight(document.getElementById("full-name"));
  const h1Top    = window.innerHeight * 0.2;
  const h1Bottom = h1Top + h1.offsetHeight;
  revealSection.style.marginTop = h1Bottom > window.innerHeight
    ? (h1Bottom + slh) + "px"
    : "100vh";
}

function updateIndentLine() {
  positionIndentLine();
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
  "tools-body":    "tools-close-text",
  "projects-list": "proj-close-text",
  "contact-body":  "contact-close-text",
};
function setBlockH(bodyEl) {
  if (!bodyEl) return;
  const closeId = BLOCK_CLOSE_MAP[bodyEl.id];
  const closeEl = closeId ? document.getElementById(closeId) : null;
  if (!closeEl) {
    setBlockH(bodyEl);
    return;
  }
  const bRect = bodyEl.getBoundingClientRect();
  const cRect = closeEl.getBoundingClientRect();
  const h = Math.max(0, cRect.top - bRect.top);
  bodyEl.style.setProperty("--block-h", h + "px");
}

// Misura altezza di una singola riga renderizzata dentro refEl
function getLineH(refEl) {
  const tmp = document.createElement("span");
  tmp.textContent = "X";
  tmp.style.visibility = "hidden";
  tmp.style.position = "absolute";
  (refEl || document.body).appendChild(tmp);
  const h = tmp.offsetHeight || 20;
  tmp.remove();
  return h;
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

// Riassegna numeri sequenziali a tutti gli .line-numbers in ordine DOM
function recomputeLineNumbers() {
  let cur = 1;
  document.querySelectorAll(".line-numbers").forEach(span => {
    const rows = lineRows(span);
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
  updateIndentLine();
}

// Alias di compatibilità — un solo motore di numerazione
function updateRevealLn()  { recomputeLineNumbers(); updateIndentLine(); }
function updateToolsLn()   { recomputeLineNumbers(); }
function updateProjLn()    { recomputeLineNumbers(); }
function updateContactLn() { recomputeLineNumbers(); }

/* ============================================================
   INDENT LINE & CLOSING BRACE
   ============================================================ */
function placeBraceAtDocBottom() {
  const h1r = document.querySelector("h1").getBoundingClientRect();
  const lt  = h1r.top + window.scrollY + lastNameLines * singleLineHeight(document.getElementById("full-name"));
  const ll  = h1r.left + nameLn.offsetWidth + parseInt(getComputedStyle(nameLn).marginRight);

  closingBrace.style.display     = "block";
  closingBrace.style.visibility  = "hidden";
  const realBraceH = closingBrace.offsetHeight || 42;
  closingBrace.style.visibility  = "";

  const docH     = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const braceTop = docH - realBraceH - 24;

  closingBrace.style.left = ll + "px";
  closingBrace.style.top  = braceTop + "px";
  indentLine.style.left   = ll + "px";
  indentLine.style.top    = lt + "px";
  indentLine.style.height = Math.max(braceTop - lt, 0) + "px";
  indentLine.style.display = "block";
  window.indentDone = true;
}

// Chiamata dal typeRevealText e typeContactSection se non ancora fatto
function showIndentAndBrace() { placeBraceAtDocBottom(); }

function positionIndentLine() { /* no-op */ }

/* ============================================================
   GHOST RENDER: pre-calcola altezza finale, piazza subito la }
   ============================================================ */
async function ghostRenderAndPlace() {
  // Nascondi visivamente durante il pre-render
  const hiddenEls = [...document.querySelectorAll(".reveal-section, .code-section")];
  hiddenEls.forEach(el => el.style.visibility = "hidden");
  indentLine.style.visibility   = "hidden";
  closingBrace.style.visibility = "hidden";

  // Forza skip → render istantaneo
  const sNames = ["reveal","tools","projects","contacts"];
  sNames.forEach(n => { sec[n].skip = true; sec[n].started = true; });
  hasTyped = true;

  // Esegui tutte le sezioni in sequenza (skip=true = istantaneo)
  await typeRevealText();
  await typeToolsSection();
  await typeProjSection();
  await typeContactSection();

  await sleep(80); // attendi flush DOM

  // Forza ricalcolo layout prima di misurare
  updateRevealPos();
  updateToolsLn();
  await sleep(50);

  // Calcola altezza finale e piazza brace
  document.body.style.minHeight = ""; // reset temporaneo
  const finalDocH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + Math.round(window.innerHeight * 0.35);

  // Mantieni l'altezza del documento anche dopo aver svuotato le sezioni
  document.body.style.minHeight = finalDocH + "px";

  const h1r = document.querySelector("h1").getBoundingClientRect();
  const lt  = h1r.top + window.scrollY + lastNameLines * singleLineHeight(document.getElementById("full-name"));
  const ll  = h1r.left + nameLn.offsetWidth + parseInt(getComputedStyle(nameLn).marginRight);

  closingBrace.style.display    = "block";
  closingBrace.style.visibility = "hidden";
  const realBraceH = closingBrace.offsetHeight || 42;

  const braceTop = finalDocH - realBraceH - 24;
  closingBrace.style.left = ll + "px";
  closingBrace.style.top  = braceTop + "px";
  indentLine.style.left   = ll + "px";
  indentLine.style.top    = lt + "px";
  indentLine.style.height = Math.max(braceTop - lt, 0) + "px";
  indentLine.style.display = "block";
  window.indentDone = true;

  // Nascondi la linea — apparirà animata solo al primo scroll
  indentLine.style.display = "none";
  indentLine.style.height = "0";

  // Pulisci tutte le sezioni
  document.getElementById("reveal-content").textContent = "";
  document.getElementById("reveal-line-numbers").textContent = "";
  ["tools-title-text","tools-close-text","proj-title-text","proj-close-text",
   "contact-title-text","contact-close-text"].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = "";
  });
  ["tools-body","projects-list","contact-body"].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = ""; el.style.minHeight = ""; }
  });
  ["tools-title-ln","tools-body-ln","tools-close-ln","tools-empty-ln",
   "proj-title-ln","proj-body-ln","proj-close-ln","proj-empty-ln",
   "contact-title-ln","contact-body-ln","contact-close-ln"].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = "";
  });

  // Reset stato per le animazioni reali
  sNames.forEach(n => { sec[n].skip = false; sec[n].started = false; sec[n].done = false; });
  hasTyped = false;

  // Ripristina visibilità
  hiddenEls.forEach(el => el.style.visibility = "");
  indentLine.style.visibility   = "";
  closingBrace.style.visibility = "";
}


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
async function typeRevealText() {
  const text = "/*\nSono uno sviluppatore web full stack di 19 anni. Progetto e sviluppo applicazioni web curando frontend e backend, con attenzione a performance, usabilità e mantenibilità. Affronto i problemi in modo analitico, con particolare attenzione al debug e all'ottimizzazione.\n*/";

  revealContent.classList.add("typing-cursor");

  for (let i = 1; i <= text.length; i++) {
    if (sec.reveal.skip) { revealContent.textContent = text; updateRevealLn(); updateIndentLineH(revealContent); break; }
    revealContent.textContent = text.substring(0, i);
    if (text.substring(0, i).includes("\n")) updateRevealLn();
    updateIndentLineH(revealContent);
    await sleep(rnd(2, 10));
  }

  revealContent.textContent = text + "\n ";
  updateRevealLn();
  revealContent.classList.remove("typing-cursor");
  sec.reveal.done = true;
  startSection("tools");
}

/* ============================================================
   TOOLS SECTION
   ============================================================ */
async function typeToolsSection() {
  const titleEl = document.getElementById("tools-title-text");
  const closeEl = document.getElementById("tools-close-text");
  const s = sec.tools;
  const titleTxt = "const strumenti = [";

  titleEl.classList.add("typing-cursor");
  for (let i = 1; i <= titleTxt.length; i++) {
    if (s.skip) { titleEl.textContent = titleTxt; break; }
    titleEl.textContent = titleTxt.substring(0, i);
    recomputeLineNumbers();
    await sleep(rnd(5, 25));
  }
  recomputeLineNumbers();
  titleEl.classList.remove("typing-cursor");

  await renderToolsItems();

  closeEl.classList.add("typing-cursor");
  for (let i = 1; i <= 2; i++) {
    if (s.skip) { closeEl.textContent = "];"; break; }
    closeEl.textContent = "];".substring(0, i);
    recomputeLineNumbers();
    await sleep(rnd(5, 25));
  }
  recomputeLineNumbers();
  closeEl.classList.remove("typing-cursor");
  s.done = true;
  document.getElementById("tools-section").classList.add("section-done");
  recomputeLineNumbers();
  await fast(s, 200);
  startSection("projects");
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
const techIconMap = {
  "Python":     { path: "python/python-original.svg" },
  "Java":       { path: "java/java-original.svg" },
  "JS":         { path: "javascript/javascript-original.svg" },
  "HTML":       { path: "html5/html5-original.svg" },
  "CSS":        { path: "css3/css3-original.svg" },
  "Node.js":    { path: "nodejs/nodejs-original.svg" },
  "Express":    { path: "express/express-original.svg", invert: true },
  "Docker":     { path: "docker/docker-original.svg" },
  "SQL":        { path: "mysql/mysql-original.svg" },
  "Git":        { path: "git/git-original.svg" },
  "GitHub":     { path: "github/github-original.svg", invert: true },
  "VSCode":     { path: "vscode/vscode-original.svg" },
};

async function renderToolsItems() {
  const bodyEl = document.getElementById("tools-body");
  const bln    = document.getElementById("tools-body-ln");
  bodyEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "tools-categories";
  bodyEl.appendChild(wrap);

  // Crescita smooth: una riga per tick (60ms) finché shown < target
  bln.dataset.fixedRows = "0";
  let shown = 0;
  let renderingDone = false;
  (async () => {
    while (!renderingDone) {
      const lh = getLineH(bodyEl) || 28;
      const target = Math.round(bodyEl.offsetHeight / lh);
      if (shown < target) {
        shown++;
        bln.dataset.fixedRows = String(shown);
      }
      recomputeLineNumbers();
      await fast(sec.tools, 60);
    }
  })();

  for (const [cat, items] of Object.entries(iMieiStrumenti)) {
    const group = document.createElement("div");
    const comment = document.createElement("span");
    comment.className = "tools-cat-comment";
    comment.textContent = "// " + cat;
    group.appendChild(comment);
    const row = document.createElement("div");
    row.className = "tools-icons-row";
    group.appendChild(row);
    wrap.appendChild(group);
    for (const item of items) {
      const card = document.createElement("div");
      card.className = "tool-icon-card card-reveal";
      const icon = techIconMap[item];
      if (icon) {
        const img = document.createElement("img");
        img.src = DEVICON + icon.path;
        img.alt = item;
        if (icon.invert) img.setAttribute("data-invert", "");
        card.appendChild(img);
      }
      const lbl = document.createElement("span");
      lbl.className = "tool-icon-label";
      lbl.textContent = item;
      card.appendChild(lbl);
      row.appendChild(card);
      setBlockH(bodyEl);
      updateIndentLineH(card);
      await fast(sec.tools, 50);
    }
    setBlockH(bodyEl);
    await fast(sec.tools, 80);
  }
  setBlockH(bodyEl);
  renderingDone = true;
  await sleep(50);
  // Catch-up smooth fino al numero finale di righe
  const finalLh = getLineH(bodyEl) || 28;
  const finalTarget = Math.max(1, Math.round(bodyEl.offsetHeight / finalLh));
  while (shown < finalTarget) {
    shown++;
    bln.dataset.fixedRows = String(shown);
    recomputeLineNumbers();
    if (!sec.tools.skip) await sleep(40);
  }
  delete bln.dataset.fixedRows;
  recomputeLineNumbers();
}

/* ============================================================
   PROGETTI SECTION
   ============================================================ */
async function typeProjSection() {
  const titleEl = document.getElementById("proj-title-text");
  const closeEl = document.getElementById("proj-close-text");
  const s = sec.projects;
  const titleTxt = "const progetti = [";

  titleEl.classList.add("typing-cursor");
  for (let i = 1; i <= titleTxt.length; i++) {
    if (s.skip) { titleEl.textContent = titleTxt; break; }
    titleEl.textContent = titleTxt.substring(0, i);
    recomputeLineNumbers();
    await sleep(rnd(5, 25));
  }
  recomputeLineNumbers();
  titleEl.classList.remove("typing-cursor");

  await renderProjItems();
  closeEl.classList.add("typing-cursor");
  const closeTxt = "];";
  for (let i = 1; i <= closeTxt.length; i++) {
    if (s.skip) { closeEl.textContent = closeTxt; break; }
    closeEl.textContent = closeTxt.substring(0, i);
    recomputeLineNumbers();
    await sleep(rnd(5, 25));
  }
  recomputeLineNumbers();
  closeEl.classList.remove("typing-cursor");
  s.done = true;
  document.getElementById("projects-section").classList.add("section-done");
  recomputeLineNumbers();
  await fast(s, 200);
  startSection("contacts");
}

async function renderProjItems() {
  const listEl = document.getElementById("projects-list");
  const bln    = document.getElementById("proj-body-ln");
  listEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "projects-grid";
  listEl.appendChild(wrap);

  // Crescita smooth: una riga per tick (60ms) finché shown < target
  bln.dataset.fixedRows = "0";
  let shown = 0;
  let renderingDone = false;
  (async () => {
    while (!renderingDone) {
      const lh = getLineH(listEl) || 28;
      const target = Math.round(listEl.offsetHeight / lh);
      if (shown < target) {
        shown++;
        bln.dataset.fixedRows = String(shown);
      }
      recomputeLineNumbers();
      await fast(sec.projects, 60);
    }
  })();

  for (let i = 0; i < iMieiProgetti.length; i++) {
    const p = iMieiProgetti[i];
    const group = document.createElement("div");
    group.className = "card-reveal";
    const comment = document.createElement("span");
    comment.className = "proj-card-comment";
    comment.textContent = "// " + p.nome.toLowerCase().replace(/ /g, "-") + ".js";
    group.appendChild(comment);

    const card = document.createElement("div");
    card.className = "project-card";
    const techTags = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
    const linkHtml = p.link && p.link !== "#"
      ? `<a href="${p.link}" target="_blank" class="proj-open-link">→ open</a>`
      : ``;
    const golHtml = p.isGol ? `
      <div class="gol-controls" data-tweaks-ignore>
        <button type="button" class="gol-btn" data-gol-action="toggle" aria-label="Pausa/Play" data-tooltip="Pausa / Play">
          <svg class="gol-ico gol-ico-pause" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="4" x2="6" y2="12"/><line x1="10" y1="4" x2="10" y2="12"/></svg>
          <svg class="gol-ico gol-ico-play" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4 L12 8 L5.5 12 Z"/></svg>
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
        </div>
      </div>` : ``;
    const golInfoCardHtml = p.isGol ? `<div class="gol-info-card" aria-hidden="true"><button type="button" class="gol-info-close" aria-label="Chiudi">×</button><p class="gol-info-title"></p><p class="gol-info-desc"></p></div>` : ``;
    card.innerHTML = `
      <div class="proj-card-row">
        <div class="proj-card-body">
          <p class="proj-name">${p.nome}</p>
          ${middleHtml}
        </div>
        <div class="proj-card-footer">${techTags}${linkHtml}</div>
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
    const linkEl = card.querySelector(".proj-open-link");
    if (linkEl) linkEl.addEventListener("click", e => e.stopPropagation());

    group.appendChild(card);
    wrap.appendChild(group);
    setBlockH(listEl);
    updateIndentLineH(card);
    await fast(sec.projects, 180);
  }
  setBlockH(listEl);
  renderingDone = true;
  await sleep(50);
  // Catch-up smooth fino al numero finale di righe
  const finalLh = getLineH(listEl) || 28;
  const finalTarget = Math.max(1, Math.round(listEl.offsetHeight / finalLh));
  while (shown < finalTarget) {
    shown++;
    bln.dataset.fixedRows = String(shown);
    recomputeLineNumbers();
    if (!sec.projects.skip) await sleep(40);
  }
  delete bln.dataset.fixedRows;
  recomputeLineNumbers();
  setupProjResizeObserver();
  requestAnimationFrame(() => document.body.classList.add("cards-animatable"));
}

/* ============================================================
   CONTATTI SECTION
   ============================================================ */
async function typeContactSection() {
  const titleEl = document.getElementById("contact-title-text");
  const bodyEl  = document.getElementById("contact-body");
  const closeEl = document.getElementById("contact-close-text");

  const s = sec.contacts;
  const titleTxt = "const contatti = {";

  titleEl.classList.add("typing-cursor");
  for (let i = 1; i <= titleTxt.length; i++) {
    if (s.skip) { titleEl.textContent = titleTxt; updateContactLn(); break; }
    titleEl.textContent = titleTxt.substring(0, i);
    updateContactLn();
    await sleep(rnd(5, 25));
  }
  titleEl.classList.remove("typing-cursor");

  const entries = Object.entries(contatti);
  for (let ei = 0; ei < entries.length; ei++) {
    const [k, raw] = entries[ei];
    const isObj = typeof raw === "object" && raw !== null;
    const fullDisplay = isObj ? raw.display : raw;
    const isMobile = window.innerWidth <= 600;
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
    const valStr = `"${display}"${ei < entries.length - 1 ? "," : ""}`;
    const a = document.createElement("a");
    a.className = "contact-link";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<span class="contact-key"></span><span class="contact-sep">:</span><span class="contact-val contact-cursor"></span>`;
    bodyEl.appendChild(a);
    setBlockH(bodyEl);
    updateIndentLineH(a);
    updateContactLn();

    const keyEl = a.querySelector(".contact-key");
    const valEl = a.querySelector(".contact-val");

    if (s.skip) {
      keyEl.textContent = k;
      valEl.textContent = valStr;
      valEl.classList.remove("contact-cursor");
      updateContactLn();
      continue;
    }
    for (let i = 1; i <= k.length; i++) {
      if (s.skip) { keyEl.textContent = k; break; }
      keyEl.textContent = k.substring(0, i);
      await sleep(rnd(5, 25));
    }
    for (let i = 1; i <= valStr.length; i++) {
      if (s.skip) { valEl.textContent = valStr; break; }
      valEl.textContent = valStr.substring(0, i);
      updateContactLn();
      await sleep(rnd(5, 25));
    }
    valEl.classList.remove("contact-cursor");
    updateContactLn();
  }

  closeEl.classList.add("typing-cursor");
  const closeTxt = "};";
  for (let i = 1; i <= closeTxt.length; i++) {
    if (s.skip) { closeEl.textContent = closeTxt; updateContactLn(); break; }
    closeEl.textContent = closeTxt.substring(0, i);
    updateContactLn();
    await sleep(rnd(5, 25));
  }
  closeEl.classList.remove("typing-cursor");
  s.done = true;
  document.getElementById("contact-section").classList.add("section-done");
  await sleep(120);
  placeFinalBraceAndLine();
}

function placeFinalBraceAndLine() {
  const contactSec = document.getElementById("contact-section");
  const h1r = document.querySelector("h1").getBoundingClientRect();
  const fullName = document.getElementById("full-name");
  const slh = singleLineHeight(fullName);
  const lt  = h1r.top + window.scrollY + lastNameLines * slh;
  const ll  = h1r.left + nameLn.offsetWidth + parseInt(getComputedStyle(nameLn).marginRight);

  closingBrace.style.display    = "block";
  closingBrace.style.visibility = "hidden";
  const braceH = closingBrace.offsetHeight || 42;
  closingBrace.style.visibility = "";

  const emptyRow = document.getElementById("contact-empty-ln")?.closest(".code-row");
  const closeRow = document.getElementById("contact-close-text").closest(".code-row");
  const refRect  = (emptyRow || closeRow || contactSec).getBoundingClientRect();
  const refBottom = refRect.bottom + window.scrollY;
  const braceTop  = refBottom;

  closingBrace.style.left = ll + "px";
  closingBrace.style.top  = braceTop + "px";
  const braceLn = document.getElementById("brace-line-numbers");
  if (braceLn) {
    braceLn.style.left = (h1r.left + window.scrollX) + "px";
    braceLn.style.top  = braceTop + "px";
    braceLn.style.display = "block";
    recomputeLineNumbers();
  }
  const finalH = braceTop + braceH + 8;
  document.body.style.minHeight = "";
  // Pulisci anche minHeight su <html> (eventualmente impostato dal session-restore
  // a (scrollY + innerHeight + 200)px): se rimane > finalH, "height" non lo rispetta
  // e lo scroll può sforare la graffa.
  document.documentElement.style.minHeight = "";
  document.body.style.height = finalH + "px";
  document.documentElement.style.height = finalH + "px";
  // Forza ri-misura del canvas GoL: senza questo il canvas (absolute, full-doc)
  // resta gigante perch&eacute; il poll-interval interno legge scrollHeight =
  // canvas.height e non rileva shrink. Risultato: scrollbar mostra spazio oltre
  // la graffa.
  if (window.__gol && window.__gol.resize) window.__gol.resize();
  window.__maxScroll = Math.max(0, finalH - window.innerHeight);
  if (!window.__scrollClampBound) {
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
    // Track Y precedente per determinare direzione del gesto: solo lo
    // scroll verso il basso oltre __maxScroll va bloccato; quello verso
    // l'alto deve restare libero.
    let _lastTouchY = 0;
    window.addEventListener("touchstart", e => {
      if (e.touches && e.touches[0]) _lastTouchY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener("touchmove", e => {
      // Non bloccare drag su slider/input interattivi (es. velocità GoL su mobile)
      if (e.target && e.target.closest && e.target.closest("input, [data-tweaks-ignore]")) return;
      const cur = (e.touches && e.touches[0]) ? e.touches[0].clientY : _lastTouchY;
      const delta = cur - _lastTouchY; // > 0 = dito gi&ugrave; (scroll up); < 0 = dito su (scroll down)
      _lastTouchY = cur;
      if (window.__maxScroll != null && window.scrollY >= window.__maxScroll && delta < 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  indentLine.style.left = ll + "px";
  indentLine.style.top  = lt + "px";
  const targetH = Math.max(braceTop - lt, 0);
  indentLine.style.display = "block";
  _lineTargetH = targetH;
  if (!_lineTweenRunning) { _lineTweenRunning = true; requestAnimationFrame(_tweenLine); }
  window.indentDone = true;
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
  }
  pumpLayoutDuring(CARD_TRANSITION_MS + 80);
}

/* rAF loop che ricalcola brace + indent-line per durationMs ms.
   Usato durante apertura/chiusura card per tenere indent line allineata in tempo reale. */
let _layoutPumpEnd = 0;
let _layoutPumpRunning = false;
function pumpLayoutDuring(durationMs) {
  _layoutPumpEnd = Math.max(_layoutPumpEnd, performance.now() + durationMs);
  const listEl = document.getElementById("projects-list");
  if (listEl) listEl.classList.add("no-block-transition");
  if (_layoutPumpRunning) return;
  _layoutPumpRunning = true;
  const tick = () => {
    const list = document.getElementById("projects-list");
    if (list) setBlockH(list);
    // Ricalcola line-numbers durante la transizione: lineRows() per
    // "dynamic-block" pinna minHeight sul source, impedendo allo
    // shrink di propagarsi e al ResizeObserver di scattare in chiusura.
    recomputeLineNumbers();
    if (window.indentDone) repositionBrace();
    if (performance.now() < _layoutPumpEnd) {
      requestAnimationFrame(tick);
    } else {
      _layoutPumpRunning = false;
      if (list) list.classList.remove("no-block-transition");
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
    "pi-heptomino":   { title: "Pi-Heptomino", desc: "Methuselah da 7 celle a forma di π. Evolve in modo caotico per 173 generazioni prima di stabilizzarsi in una configurazione con glider." },
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
      if (!s.done) s.skip = true;
      if (!s.started) { s.started = true; if (name === "reveal") hasTyped = true; s.start(); }
      const nx = nextSection(name);
      if (nx) startSection(nx);
    }
  }
}

window.addEventListener("scroll", () => {
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
    typeRevealText();
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
  updateNameLn(); syncLnWidth(); updateRevealPos(); updateToolsLn();
  if (window.indentDone) repositionBrace();
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
  const braceTop = refRect.bottom + window.scrollY;
  closingBrace.style.left = ll + "px";
  closingBrace.style.top  = braceTop + "px";
  const braceLn = document.getElementById("brace-line-numbers");
  if (braceLn) {
    braceLn.style.left = (h1r.left + window.scrollX) + "px";
    braceLn.style.top  = braceTop + "px";
  }
  indentLine.style.left   = ll + "px";
  indentLine.style.top    = lt + "px";
  indentLine.style.height = Math.max(braceTop - lt, 0) + "px";
  const bh = closingBrace.offsetHeight || 42;
  const finalH = braceTop + bh + 8;
  document.body.style.height = finalH + "px";
  document.documentElement.style.height = finalH + "px";
  window.__maxScroll = Math.max(0, finalH - window.innerHeight);
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

window.addEventListener("load", () => {
  updateRevealPos(); syncLnWidth();
  sec.reveal.el   = revealSection;
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
      typeRevealText();
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
          typeRevealText();
        }
      }
    });
  }
});
