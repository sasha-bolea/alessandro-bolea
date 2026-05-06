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
    dettagli: "Cellular automaton di Conway in JS vanilla. Canvas 2D con topologia toroidale (effetto Pac-Man). Iniezione periodica di gliders dai bordi per mantenere viva la simulazione. Click sullo sfondo aggiunge una cellula. Controlli rapidi nella card: pause/play, clear, reseed.",
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
const revealLn       = document.getElementById("reveal-line-numbers");
const revealSection  = document.querySelector(".reveal-section");

/* ── State ── */
let lastNameLines    = 1;
let lastRevealLines  = 1;
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
   NUMERI DI RIGA
   ============================================================ */
function updateNameLn() {
  const fullName = document.getElementById("full-name");
  const slh      = singleLineHeight(fullName);
  const lines    = Math.max(1, Math.round(fullName.offsetHeight / slh));
  let s = "";
  for (let i = 1; i <= lines; i++) s += i + (i < lines ? "\n" : "");
  nameLn.textContent = s;
  if (lines !== lastNameLines) {
    lastNameLines = lines;
    updateRevealLn();
    updateRevealPos();
  }
  syncLnWidth();
  updateIndentLine();
}

function updateRevealLn() {
  const slh   = singleLineHeight(revealContent.parentElement);
  const lines = Math.max(1, Math.round((revealContent.offsetHeight || slh) / slh));
  const start = lastNameLines + 1;
  let s = "";
  for (let i = start; i < start + lines; i++) s += i + (i < start + lines - 1 ? "\n" : "");
  revealLn.textContent = s;
  lastRevealLines = lines;
  updateIndentLine();
  updateToolsLn();
}

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

function lnRange(start, count) {
  if (count <= 0) return "";
  let s = "";
  for (let i = 0; i < count; i++) s += (start + i) + (i < count - 1 ? "\n" : "");
  return s;
}

function updateToolsLn() {
  if (window._toolsLayoutDone) { updateProjLn(); return; }
  const lh = getLineH();
  let cur = lastNameLines + lastRevealLines + 1;
  const titleEl = document.getElementById("tools-title-text");
  const bodyEl  = document.getElementById("tools-body");
  const closeEl = document.getElementById("tools-close-text");
  const tln     = document.getElementById("tools-title-ln");
  const bln     = document.getElementById("tools-body-ln");
  const cln     = document.getElementById("tools-close-ln");
  if (!tln) return;

  if (titleEl.textContent.length) { tln.textContent = String(cur); cur++; }
  else tln.textContent = "";

  if (bodyEl.offsetHeight > 0) {
    if (!window._toolsRendering) {
      const lines = Math.max(1, Math.round(bodyEl.offsetHeight / lh));
      bln.textContent = lnRange(cur, lines);
      cur += lines;
    } else {
      const lines = bln.textContent ? bln.textContent.split("\n").length : 0;
      cur += lines;
    }
  } else bln.textContent = "";

  if (closeEl.textContent.length) { cln.textContent = String(cur); cur++; }
  else cln.textContent = "";

  const emptyLn = document.getElementById("tools-empty-ln");
  if (emptyLn && emptyLn.textContent.length) { cur++; }

  if (!sec.tools.done) window._afterToolsLine = cur;
  updateProjLn();
}

function updateProjLn() {
  if (window._projLayoutDone) { updateContactLn(); return; }
  const lh = getLineH();
  let cur = window._afterToolsLine || (lastNameLines + lastRevealLines + 10);
  const tln = document.getElementById("proj-title-ln");
  const bln = document.getElementById("proj-body-ln");
  const cln = document.getElementById("proj-close-ln");
  const tEl = document.getElementById("proj-title-text");
  const bEl = document.getElementById("projects-list");
  const cEl = document.getElementById("proj-close-text");
  if (!tln) return;

  if (tEl.textContent.length) { tln.textContent = String(cur); cur++; }
  else tln.textContent = "";

  if (bEl.offsetHeight > 0) {
    if (!window._projRendering) {
      const lines = Math.max(1, Math.round(bEl.offsetHeight / lh));
      bln.textContent = lnRange(cur, lines);
      cur += lines;
    } else {
      const lines = bln.textContent ? bln.textContent.split("\n").length : 0;
      cur += lines;
    }
  } else bln.textContent = "";

  if (cEl.textContent.length) { cln.textContent = String(cur); cur++; }
  else cln.textContent = "";

  const projEmptyLn = document.getElementById("proj-empty-ln");
  if (projEmptyLn && projEmptyLn.textContent.length) { cur++; }

  if (!sec.projects.done) window._afterProjLine = cur;
  updateContactLn();
}

function updateContactLn() {
  let cur = window._afterProjLine || (lastNameLines + lastRevealLines + 20);
  const tln = document.getElementById("contact-title-ln");
  const bln = document.getElementById("contact-body-ln");
  const cln = document.getElementById("contact-close-ln");
  const tEl = document.getElementById("contact-title-text");
  const bEl = document.getElementById("contact-body");
  const cEl = document.getElementById("contact-close-text");
  if (!tln) return;

  if (tEl.textContent.length) { tln.textContent = String(cur); cur++; }
  else tln.textContent = "";
  if (bEl.offsetHeight > 0) {
    const lh = getLineH(bEl) || 28;
    const lines = Math.max(1, Math.round(bEl.offsetHeight / lh));
    let s = "";
    for (let i = 0; i < lines; i++) s += (cur + i) + (i < lines - 1 ? "\n" : "");
    bln.textContent = s;
    cur += lines;
  } else if (bEl.textContent.length) {
    const lines = bEl.textContent.split("\n").length;
    let s = "";
    for (let i = 0; i < lines; i++) s += (cur + i) + (i < lines - 1 ? "\n" : "");
    bln.textContent = s;
    cur += lines;
  } else bln.textContent = "";
  if (cEl.textContent.length) { cln.textContent = String(cur); cur++; }
  else cln.textContent = "";
  const eln = document.getElementById("contact-empty-ln");
  if (eln) eln.textContent = cEl.textContent.length ? String(cur) : "";
}

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
  window._afterToolsLine = undefined;
  window._afterProjLine  = undefined;
  window._toolsRendering = false;
  window._projRendering  = false;
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
  const tln = document.getElementById("tools-title-ln");
  const cln = document.getElementById("tools-close-ln");
  const emptyLn = document.getElementById("tools-empty-ln");
  const s = sec.tools;
  const titleTxt = "const strumenti = [";
  const titleNum = String(lastNameLines + lastRevealLines + 1);

  titleEl.classList.add("typing-cursor");
  for (let i = 1; i <= titleTxt.length; i++) {
    if (s.skip) { titleEl.textContent = titleTxt; break; }
    titleEl.textContent = titleTxt.substring(0, i);
    if (tln) tln.textContent = titleNum;
    await sleep(rnd(5, 25));
  }
  if (tln) tln.textContent = titleNum;
  titleEl.classList.remove("typing-cursor");

  await renderToolsItems();

  closeEl.classList.add("typing-cursor");
  for (let i = 1; i <= 2; i++) {
    if (s.skip) { closeEl.textContent = "];"; break; }
    closeEl.textContent = "];".substring(0, i);
    if (cln && window._afterToolsLine) {
      cln.textContent = String(window._afterToolsLine - 2);
      if (emptyLn) emptyLn.textContent = String(window._afterToolsLine - 1);
    }
    await sleep(rnd(5, 25));
  }
  if (cln && window._afterToolsLine) {
    cln.textContent = String(window._afterToolsLine - 2);
    if (emptyLn) emptyLn.textContent = String(window._afterToolsLine - 1);
  }
  closeEl.classList.remove("typing-cursor");
  s.done = true;
  document.getElementById("tools-section").classList.add("section-done");
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
  window._toolsRendering = true;
  const bodyEl = document.getElementById("tools-body");
  const bln    = document.getElementById("tools-body-ln");
  bodyEl.innerHTML = "";
  bln.textContent  = "";
  const wrap = document.createElement("div");
  wrap.className = "tools-categories";
  bodyEl.appendChild(wrap);

  const startNum = lastNameLines + lastRevealLines + 2;

  let lnCur = 0;
  (async () => {
    while (window._toolsRendering) {
      const lh = getLineH(bodyEl) || 28;
      const targetLines = Math.round(bodyEl.offsetHeight / lh);
      while (lnCur < targetLines) {
        bln.textContent += (bln.textContent ? "\n" : "") + (startNum + lnCur);
        lnCur++;
        await fast(sec.tools, 60);
      }
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
      bodyEl.style.setProperty("--block-h", bodyEl.offsetHeight + "px");
      updateIndentLineH(card);
      await fast(sec.tools, 50);
    }
    bodyEl.style.setProperty("--block-h", bodyEl.offsetHeight + "px");
    await fast(sec.tools, 80);
  }
  bodyEl.style.setProperty("--block-h", bodyEl.offsetHeight + "px");

  window._toolsRendering = false;
  await sleep(50);
  const snapLh = getLineH(bodyEl) || 28;
  const finalLines = Math.max(1, Math.round(bodyEl.offsetHeight / snapLh));
  while (lnCur < finalLines) {
    bln.textContent += (bln.textContent ? "\n" : "") + (startNum + lnCur);
    lnCur++;
    if (!sec.tools.skip) await sleep(40);
  }
  let finalCur = startNum + lnCur;
  const cln2 = document.getElementById("tools-close-ln");
  cln2.textContent = String(finalCur);
  finalCur++;
  const emptyLn2 = document.getElementById("tools-empty-ln");
  if (emptyLn2) emptyLn2.textContent = String(finalCur);
  window._afterToolsLine = finalCur + 1;
  window._toolsLayoutDone = true;
  updateProjLn();
}

/* ============================================================
   PROGETTI SECTION
   ============================================================ */
async function typeProjSection() {
  const titleEl = document.getElementById("proj-title-text");
  const closeEl = document.getElementById("proj-close-text");
  const tln = document.getElementById("proj-title-ln");
  const cln = document.getElementById("proj-close-ln");
  const emptyLn = document.getElementById("proj-empty-ln");
  const s = sec.projects;
  const titleTxt = "const progetti = [";
  const titleNum = String(window._afterToolsLine || (lastNameLines + lastRevealLines + 10));

  titleEl.classList.add("typing-cursor");
  for (let i = 1; i <= titleTxt.length; i++) {
    if (s.skip) { titleEl.textContent = titleTxt; break; }
    titleEl.textContent = titleTxt.substring(0, i);
    if (tln) tln.textContent = titleNum;
    await sleep(rnd(5, 25));
  }
  if (tln) tln.textContent = titleNum;
  titleEl.classList.remove("typing-cursor");

  await renderProjItems();
  closeEl.classList.add("typing-cursor");
  const closeTxt = "];";
  for (let i = 1; i <= closeTxt.length; i++) {
    if (s.skip) { closeEl.textContent = closeTxt; break; }
    closeEl.textContent = closeTxt.substring(0, i);
    if (cln && window._afterProjLine) {
      cln.textContent = String(window._afterProjLine - 2);
      if (emptyLn) emptyLn.textContent = String(window._afterProjLine - 1);
    }
    await sleep(rnd(5, 25));
  }
  if (cln && window._afterProjLine) {
    cln.textContent = String(window._afterProjLine - 2);
    if (emptyLn) emptyLn.textContent = String(window._afterProjLine - 1);
  }
  closeEl.classList.remove("typing-cursor");
  s.done = true;
  document.getElementById("projects-section").classList.add("section-done");
  await fast(s, 200);
  startSection("contacts");
}

async function renderProjItems() {
  window._projRendering = true;
  const listEl = document.getElementById("projects-list");
  listEl.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "projects-grid";
  listEl.appendChild(wrap);

  const bln = document.getElementById("proj-body-ln");
  bln.textContent = "";
  const startNum = (window._afterToolsLine || (lastNameLines + lastRevealLines + 10)) + 1;

  let lnCur = 0;
  (async () => {
    while (window._projRendering) {
      const lh = getLineH(listEl) || 28;
      const targetLines = Math.round(listEl.offsetHeight / lh);
      while (lnCur < targetLines) {
        bln.textContent += (bln.textContent ? "\n" : "") + (startNum + lnCur);
        lnCur++;
        await fast(sec.projects, 60);
      }
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
        <button type="button" class="gol-btn" data-gol-action="toggle" aria-label="Pausa/Play">
          <svg class="gol-ico gol-ico-pause" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="4" x2="6" y2="12"/><line x1="10" y1="4" x2="10" y2="12"/></svg>
          <svg class="gol-ico gol-ico-play" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4 L12 8 L5.5 12 Z"/></svg>
        </button>
        <button type="button" class="gol-btn" data-gol-action="clear" aria-label="Pulisci">
          <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4.5" y1="4.5" x2="11.5" y2="11.5"/><line x1="11.5" y1="4.5" x2="4.5" y2="11.5"/></svg>
        </button>
        <button type="button" class="gol-btn" data-gol-action="reseed" aria-label="Re-seed">
          <svg class="gol-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 8 A4.5 4.5 0 1 1 8 3.5 L11 3.5"/><polyline points="9.6,2 11,3.5 9.6,5"/></svg>
        </button>
      </div>` : ``;
    const middleHtml = p.isGol ? golHtml : `<p class="proj-desc">${p.desc}</p>`;
    const expandedHtml = p.dettagli ? `
      <div class="proj-card-expanded">
        <div class="proj-card-expanded-inner">
          <p class="proj-card-expanded-text">${p.dettagli}</p>
        </div>
      </div>` : ``;
    card.innerHTML = `
      <div class="proj-card-row">
        <div class="proj-card-body">
          <p class="proj-name">${p.nome}</p>
          ${middleHtml}
        </div>
        <div class="proj-card-footer">${techTags}${linkHtml}</div>
      </div>
      ${expandedHtml}`;
    if (p.isGol) bindGolControls(card);
    if (p.dettagli) {
      card.classList.add("is-expandable");
      card.addEventListener("click", e => {
        if (e.target.closest(".gol-controls, .proj-open-link, button, a")) return;
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
    listEl.style.setProperty("--block-h", listEl.offsetHeight + "px");
    updateIndentLineH(card);
    await fast(sec.projects, 180);
  }
  listEl.style.setProperty("--block-h", listEl.offsetHeight + "px");

  window._projRendering = false;
  await sleep(50);
  const lhF = getLineH(listEl) || 28;
  const finalLinesPr = Math.max(1, Math.round(listEl.offsetHeight / lhF));
  while (lnCur < finalLinesPr) {
    bln.textContent += (bln.textContent ? "\n" : "") + (startNum + lnCur);
    lnCur++;
    if (!sec.projects.skip) await sleep(40);
  }
  const cur = startNum + lnCur;
  const cln2p = document.getElementById("proj-close-ln");
  cln2p.textContent = String(cur);
  const projEmptyLn = document.getElementById("proj-empty-ln");
  if (projEmptyLn) projEmptyLn.textContent = String(cur + 1);
  window._afterProjLine = cur + 2;
  window._projLayoutDone = true;
  setupProjResizeObserver();
  requestAnimationFrame(() => document.body.classList.add("cards-animatable"));
  updateContactLn();
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
    const display = isObj ? raw.display : raw;
    const href = isObj ? raw.href : (k === "email" ? `mailto:${raw}` : `https://${raw}`);
    const valStr = `"${display}"${ei < entries.length - 1 ? "," : ""}`;
    const a = document.createElement("a");
    a.className = "contact-link";
    a.href = href;
    a.target = "_blank";
    a.innerHTML = `<span class="contact-indent">    </span><span class="contact-key"></span><span class="contact-sep">:    </span><span class="contact-val contact-cursor"></span>`;
    bodyEl.appendChild(a);
    bodyEl.style.setProperty("--block-h", bodyEl.offsetHeight + "px");
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
    const lastLn = parseInt(document.getElementById("contact-empty-ln").textContent || "0") || 0;
    braceLn.textContent = String(lastLn + 1);
    braceLn.style.left = (h1r.left + window.scrollX) + "px";
    braceLn.style.top  = braceTop + "px";
    braceLn.style.display = "block";
  }
  const finalH = braceTop + braceH + 8;
  document.body.style.height = finalH + "px";
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
    window.addEventListener("touchmove", e => {
      if (window.__maxScroll != null && window.scrollY >= window.__maxScroll) {
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
document.getElementById("theme-toggle").addEventListener("click", () => {
  const html  = document.documentElement;
  const label = document.getElementById("theme-label");
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  label.textContent = isDark ? "//Back to the Cave" : "//Devs: Beware";
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});
document.addEventListener("mouseleave", () => cursor.style.display = "none");
document.addEventListener("mouseenter", () => cursor.style.display = "block");

/* ============================================================
   GOL CONTROLS
   ============================================================ */
/* Smoothly expand/collapse a project card via max-height (animate both directions).
   On open: set explicit px height of inner, then unset to 'none' after transition (so dynamic content fits).
   On close: re-pin current px height, then on next frame set to 0 to trigger collapse transition. */
function setCardExpanded(card, open) {
  const exp = card.querySelector(".proj-card-expanded");
  if (!exp) return;
  const inner = exp.querySelector(".proj-card-expanded-inner");
  if (!inner) return;
  exp.removeEventListener("transitionend", exp._golEndHandler || (()=>{}));
  if (open) {
    card.classList.add("is-expanded");
    const target = inner.scrollHeight;
    exp.style.maxHeight = target + "px";
    const onEnd = e => {
      if (e.propertyName !== "max-height") return;
      exp.style.maxHeight = "none";
      exp.removeEventListener("transitionend", onEnd);
    };
    exp._golEndHandler = onEnd;
    exp.addEventListener("transitionend", onEnd);
  } else {
    const cur = exp.scrollHeight;
    exp.style.maxHeight = cur + "px";
    void exp.offsetHeight;
    requestAnimationFrame(() => {
      card.classList.remove("is-expanded");
      exp.style.maxHeight = "0px";
    });
  }
  pumpLayoutDuring(400);
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
    if (list) list.style.setProperty("--block-h", list.offsetHeight + "px");
    if (window.indentDone) repositionBrace();
    if (performance.now() < _layoutPumpEnd) {
      requestAnimationFrame(tick);
    } else {
      _layoutPumpRunning = false;
      if (list) list.classList.remove("no-block-transition");
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
  if (window._projRendering || !window._projLayoutDone) return;
  const listEl = document.getElementById("projects-list");
  const bln = document.getElementById("proj-body-ln");
  if (!listEl || !bln) return;
  const lh = getLineH(listEl) || 28;
  const startNum = (window._afterToolsLine || (lastNameLines + lastRevealLines + 10)) + 1;
  if (_projAppendTimer) { clearInterval(_projAppendTimer); _projAppendTimer = null; }
  _projAppendTimer = setInterval(() => {
    let lines = bln.textContent ? bln.textContent.split("\n").length : 0;
    const desired = Math.max(1, Math.round(listEl.offsetHeight / lh));
    if (lines === desired) {
      clearInterval(_projAppendTimer);
      _projAppendTimer = null;
    } else if (lines < desired) {
      bln.textContent += (bln.textContent ? "\n" : "") + (startNum + lines);
      lines++;
    } else {
      const arr = bln.textContent.split("\n");
      arr.pop();
      bln.textContent = arr.join("\n");
      lines--;
    }
    const cln = document.getElementById("proj-close-ln");
    const eEmpty = document.getElementById("proj-empty-ln");
    if (cln) cln.textContent = String(startNum + lines);
    if (eEmpty) eEmpty.textContent = String(startNum + lines + 1);
    window._afterProjLine = startNum + lines + 2;
    updateContactLn();
    if (window.indentDone) repositionBrace();
  }, 25);
}

function bindGolControls(root) {
  const toggleBtn = root.querySelector('[data-gol-action="toggle"]');
  const clearBtn  = root.querySelector('[data-gol-action="clear"]');
  const reseedBtn = root.querySelector('[data-gol-action="reseed"]');
  if (!toggleBtn) return;

  const stop = e => { e.stopPropagation(); e.preventDefault(); };

  toggleBtn.addEventListener("click", e => {
    stop(e);
    if (!window.__gol) return;
    const paused = !window.__gol.get().paused;
    window.__gol.set({ paused });
    toggleBtn.classList.toggle("is-paused", paused);
  });
  clearBtn.addEventListener("click", e => { stop(e); window.__gol && window.__gol.clear(); });
  reseedBtn.addEventListener("click", e => { stop(e); window.__gol && window.__gol.reseed(); });
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
