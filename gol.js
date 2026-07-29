/* ============================================================
   GAME OF LIFE — sfondo decorativo
   ============================================================ */
(function () {
  "use strict";

  // ── Tweak defaults (persistenti via host postMessage) ──
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "cellSize": 18,
    "speedMs": 280,
    "opacityPct": 100,
    "style": "square",
    "seed": "random",
    "stagnationInjection": true,
    "clickToAdd": true,
    "pen": "none",
    "trailFade": 0.92,
    "paused": false
  }/*EDITMODE-END*/;

  // Stato corrente (può essere mutato dai tweaks)
  const tweaks = Object.assign({}, DEFAULTS);

  // ── Canvas setup ──
  const canvas = document.createElement("canvas");
  canvas.id = "gol-canvas";
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.width = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  canvas.style.opacity = String(tweaks.opacityPct / 100);
  canvas.style.transition = "opacity 0.3s";
  // Il body ha background-color: var(--bg) → niente background sul canvas
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext("2d");

  // ── Stato simulazione ──
  let cols = 0, rows = 0, dpr = 1;
  let grid = null;       // Uint8Array, 0/1
  let prevGrid = null;   // per il trail
  let agePrev = null;    // età cellule frame precedente
  let age = null;        // età cellule (per fade/colore)
  let lastStep = 0;
  let stagnationCounter = 0;
  let lastHash = 0;

  // Altezza reale del documento. Se body ha height esplicita (impostata dal
  // codice che pinna il layout) quella &egrave; la fonte di verit&agrave;.
  // Altrimenti il canvas va azzerato PRIMA di misurare: essendo absolute e alto
  // quanto tutto il documento, contribuisce lui stesso allo scrollHeight, e
  // misurarlo in posizione restituirebbe sempre il massimo gi&agrave; raggiunto
  // rendendo invisibile qualunque accorciamento.
  function measureDocH() {
    const explicit = parseFloat(document.body.style.height);
    if (explicit > 0) return explicit;
    const prev = canvas.style.height;
    canvas.style.height = "0px";
    const docH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    canvas.style.height = prev;
    return docH;
  }

  let lastW = 0, lastH = 0;
  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = measureDocH();
    // resize() rialloca e riseeda la griglia: senza questa guardia chiamarla da
    // pi&ugrave; punti perturberebbe la simulazione a ogni giro.
    if (w === lastW && h === lastH) return;
    lastW = w; lastH = h;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const cs = Math.max(4, tweaks.cellSize);
    cols = Math.ceil(w / cs);
    rows = Math.ceil(h / cs);

    const newGrid = new Uint8Array(cols * rows);
    const newAge = new Uint16Array(cols * rows);

    // Preserva stato esistente quando possibile
    if (grid) {
      const oldCols = grid.__cols || 0;
      const oldRows = grid.__rows || 0;
      const minC = Math.min(cols, oldCols);
      const minR = Math.min(rows, oldRows);
      for (let y = 0; y < minR; y++) {
        for (let x = 0; x < minC; x++) {
          newGrid[y * cols + x] = grid[y * oldCols + x];
          if (age) newAge[y * cols + x] = age[y * oldCols + x];
        }
      }
      // Seed delle aree appena aggiunte (nuove righe sotto / nuove colonne
      // a destra). Senza questo, su mobile il documento cresce dopo il primo
      // resize() (gol.js gira in defer: parte prima che il typing costruisca
      // le sezioni, quindi al primo giro docH ≈ innerHeight)
      // e tutte le celle nelle nuove righe restano a 0 → gradient vuoto verso
      // il basso. La fascia superiore (preservata) resta densa.
      if (cols > oldCols || rows > oldRows) {
        seedNewArea(newGrid, cols, rows, oldCols, oldRows, tweaks.seed);
      }
    } else {
      seedInitial(newGrid, cols, rows, tweaks.seed);
    }
    newGrid.__cols = cols;
    newGrid.__rows = rows;
    grid = newGrid;
    prevGrid = new Uint8Array(grid);
    age = newAge;
    agePrev = new Uint16Array(age);
    lastHash = hashGrid(grid);
    stagnationCounter = 0;
    draw(true);
  }

  // ── Seed patterns ──
  function seedInitial(g, c, r, mode) {
    if (mode === "empty") return;
    if (mode === "soup") {
      // Densa "primordial soup" al centro
      const cx = c >> 1, cy = r >> 1;
      const radius = Math.min(c, r) * 0.22;
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const dx = x - cx, dy = y - cy;
          if (dx*dx + dy*dy < radius*radius && Math.random() < 0.42) {
            g[y * c + x] = 1;
          }
        }
      }
      return;
    }
    if (mode === "gliders") {
      // Pochi gliders sparsi
      const count = Math.max(3, Math.round((c * r) / 800));
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * (c - 5)) + 1;
        const y = Math.floor(Math.random() * (r - 5)) + 1;
        injectGlider(g, c, r, x, y, Math.floor(Math.random() * 4));
      }
      return;
    }
    // random sparse (default)
    for (let i = 0; i < g.length; i++) {
      if (Math.random() < 0.18) g[i] = 1;
    }
  }

  // Seed delle sole celle nuove dopo un resize che ingrandisce il grid.
  // Una cella e' "nuova" se y >= oldR o x >= oldC. Le altre sono gia' state
  // preservate dal grid precedente e non devono essere toccate.
  // Density 0.18 (matching seedInitial random). Mode "empty" rispettato.
  function seedNewArea(g, c, r, oldC, oldR, mode) {
    if (mode === "empty") return;
    for (let y = 0; y < r; y++) {
      for (let x = 0; x < c; x++) {
        const isNew = (y >= oldR) || (x >= oldC);
        if (isNew && Math.random() < 0.18) g[y * c + x] = 1;
      }
    }
  }

  // ── Pattern injection ──
  // Gliders nelle 4 orientazioni
  const GLIDERS = [
    // SE
    [[1,0],[2,1],[0,2],[1,2],[2,2]],
    // SW
    [[1,0],[0,1],[0,2],[1,2],[2,2]],
    // NE
    [[0,0],[1,0],[2,0],[2,1],[1,2]],
    // NW
    [[0,0],[1,0],[2,0],[0,1],[1,2]],
  ];
  function injectGlider(g, c, r, x, y, ori) {
    const p = GLIDERS[ori % 4];
    for (const [dx, dy] of p) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && xx < c && yy >= 0 && yy < r) g[yy * c + xx] = 1;
    }
  }
  // LWSS (lightweight spaceship) per varietà
  const LWSS = [
    [1,0],[4,0],[0,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3]
  ];
  function injectLWSS(g, c, r, x, y) {
    for (const [dx, dy] of LWSS) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && xx < c && yy >= 0 && yy < r) g[yy * c + xx] = 1;
    }
  }
  // R-pentomino — caos bellissimo
  const RPENTO = [[1,0],[2,0],[0,1],[1,1],[1,2]];
  function injectRPentomino(g, c, r, x, y) {
    for (const [dx, dy] of RPENTO) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && xx < c && yy >= 0 && yy < r) g[yy * c + xx] = 1;
    }
  }

  // ── Pattern predefiniti (focus mode selector) ──
  const NAMED_PATTERNS = {
    "gosper-gun": [
      [24,0],
      [22,1],[24,1],
      [12,2],[13,2],[20,2],[21,2],[34,2],[35,2],
      [11,3],[15,3],[20,3],[21,3],[34,3],[35,3],
      [0,4],[1,4],[10,4],[16,4],[20,4],[21,4],
      [0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],
      [10,6],[16,6],[24,6],
      [11,7],[15,7],
      [12,8],[13,8],
    ],
    "pulsar": [
      [2,0],[3,0],[4,0],[8,0],[9,0],[10,0],
      [0,2],[5,2],[7,2],[12,2],
      [0,3],[5,3],[7,3],[12,3],
      [0,4],[5,4],[7,4],[12,4],
      [2,5],[3,5],[4,5],[8,5],[9,5],[10,5],
      [2,7],[3,7],[4,7],[8,7],[9,7],[10,7],
      [0,8],[5,8],[7,8],[12,8],
      [0,9],[5,9],[7,9],[12,9],
      [0,10],[5,10],[7,10],[12,10],
      [2,12],[3,12],[4,12],[8,12],[9,12],[10,12],
    ],
    "pentadecathlon": [
      [1,0],[0,1],[2,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[0,8],[2,8],[1,9],
    ],
    "acorn": [
      [1,0],[3,1],[0,2],[1,2],[4,2],[5,2],[6,2],
    ],
    "diehard": [
      [6,0],[0,1],[1,1],[1,2],[5,2],[6,2],[7,2],
    ],
    "lwss": [
      [1,0],[4,0],[0,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3],
    ],
    "beacon": [
      [0,0],[1,0],[0,1],[3,2],[2,3],[3,3],
    ],
    "pi-heptomino": [
      [0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[2,2],
    ],
    "switch-engine": [
      [1,0],[3,0],[0,1],[1,2],[4,2],[3,3],[4,3],[5,3],
    ],
    "copperhead": [
      [1,0],[2,0],[5,0],[6,0],
      [3,1],[4,1],
      [3,2],[4,2],
      [0,3],[2,3],[5,3],[7,3],
      [0,4],[7,4],
      [0,6],[7,6],
      [1,7],[2,7],[5,7],[6,7],
      [2,8],[3,8],[4,8],[5,8],
      [3,10],[4,10],
      [3,11],[4,11],
    ],
  };

  // Piazza un pattern centrato nel viewport visibile, pulisce prima e mette in pausa
  function placePatternCentered(name) {
    const cells = NAMED_PATTERNS[name];
    if (!cells || cols < 4 || rows < 4) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [dx, dy] of cells) {
      if (dx < minX) minX = dx; if (dx > maxX) maxX = dx;
      if (dy < minY) minY = dy; if (dy > maxY) maxY = dy;
    }
    const cs = Math.max(4, tweaks.cellSize);
    // Centro viewport in coordinate griglia (canvas parte da y=0 doc, scrollY è l'offset)
    const vpCx = Math.floor(window.innerWidth / 2 / cs);
    const vpCy = Math.floor((window.scrollY + window.innerHeight / 2) / cs);
    const ox = vpCx - Math.floor((maxX - minX + 1) / 2) - minX;
    const oy = vpCy - Math.floor((maxY - minY + 1) / 2) - minY;
    grid.fill(0);
    age.fill(0);
    for (const [dx, dy] of cells) {
      const x = dx + ox, y = dy + oy;
      if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y * cols + x] = 1;
    }
    tweaks.paused = true;
    lastHash = hashGrid(grid);
    stagnationCounter = 0;
    draw(true);
  }

  function injectRandomPattern() {
    if (cols < 8 || rows < 8) return;
    const x = Math.floor(Math.random() * (cols - 6)) + 1;
    const y = Math.floor(Math.random() * (rows - 6)) + 1;
    const pick = Math.random();
    if (pick < 0.6) injectGlider(grid, cols, rows, x, y, Math.floor(Math.random() * 4));
    else if (pick < 0.85) injectLWSS(grid, cols, rows, x, y);
    else injectRPentomino(grid, cols, rows, x, y);
  }

  // ── Iniezione di gliders dai bordi (tenere viva la simulazione) ──
  // Inietta un glider appena dentro un bordo che si muove verso l'interno
  function injectEdgeGlider() {
    if (cols < 8 || rows < 8) return;
    const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    let x, y, ori;
    if (side === 0) {
      // dall'alto → orientamento SE o SW
      x = Math.floor(Math.random() * (cols - 4)) + 1;
      y = 1;
      ori = Math.random() < 0.5 ? 0 : 1; // SE / SW
    } else if (side === 2) {
      // dal basso → orientamento NE o NW
      x = Math.floor(Math.random() * (cols - 4)) + 1;
      y = rows - 4;
      ori = Math.random() < 0.5 ? 2 : 3; // NE / NW
    } else if (side === 3) {
      // da sinistra → SE o NE
      x = 1;
      y = Math.floor(Math.random() * (rows - 4)) + 1;
      ori = Math.random() < 0.5 ? 0 : 2; // SE / NE
    } else {
      // da destra → SW o NW
      x = cols - 4;
      y = Math.floor(Math.random() * (rows - 4)) + 1;
      ori = Math.random() < 0.5 ? 1 : 3; // SW / NW
    }
    injectGlider(grid, cols, rows, x, y, ori);
  }

  // ── Step (bounded, bordi = vicini morti) ──
  function step() {
    const c = cols, r = rows;
    const next = new Uint8Array(c * r);
    const nextAge = new Uint16Array(c * r);
    for (let y = 0; y < r; y++) {
      const ym1 = y - 1;
      const yp1 = y + 1;
      const rowOff = y * c;
      for (let x = 0; x < c; x++) {
        const xm1 = x - 1;
        const xp1 = x + 1;
        let n = 0;
        if (ym1 >= 0) {
          const rowOffM = ym1 * c;
          if (xm1 >= 0) n += grid[rowOffM + xm1];
          n += grid[rowOffM + x];
          if (xp1 < c) n += grid[rowOffM + xp1];
        }
        if (xm1 >= 0) n += grid[rowOff + xm1];
        if (xp1 < c)  n += grid[rowOff + xp1];
        if (yp1 < r) {
          const rowOffP = yp1 * c;
          if (xm1 >= 0) n += grid[rowOffP + xm1];
          n += grid[rowOffP + x];
          if (xp1 < c) n += grid[rowOffP + xp1];
        }
        const alive = grid[rowOff + x];
        let live = 0;
        if (alive) live = (n === 2 || n === 3) ? 1 : 0;
        else       live = (n === 3) ? 1 : 0;
        next[rowOff + x] = live;
        if (live) {
          nextAge[rowOff + x] = alive ? Math.min(65535, age[rowOff + x] + 1) : 1;
        }
      }
    }
    prevGrid = grid;
    agePrev = age;
    grid = next; grid.__cols = c; grid.__rows = r;
    age = nextAge;

    // Rileva stagnazione (stesso stato per N step)
    if (tweaks.stagnationInjection && !document.body.classList.contains("gol-focus-mode")) {
      const h = hashGrid(grid);
      if (h === lastHash) {
        stagnationCounter++;
        if (stagnationCounter >= 2) {
          injectRandomPattern();
          injectRandomPattern();
          stagnationCounter = 0;
        }
      } else {
        stagnationCounter = 0;
      }
      lastHash = h;
    }
  }

  function hashGrid(g) {
    // FNV-ish quick hash
    let h = 2166136261 >>> 0;
    const step = Math.max(1, Math.floor(g.length / 256));
    for (let i = 0; i < g.length; i += step) {
      h ^= g[i];
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // ── Override colore cella + fade ──
  // _cellOverride: hex string fissato (es. "#ffffff") o null per usare CSS var
  // _cellFade*: stato animazione interpolata da from a to su durata
  let _cellOverride = null;
  let _cellFadeFrom = null;
  let _cellFadeTo = null;
  let _cellFadeStart = 0;
  let _cellFadeDur = 600;

  // Parsing colore → [r,g,b]. Supporta "#rgb", "#rrggbb", "rgb(...)", "rgba(...)"
  function parseHex(h) {
    if (!h) return [30, 30, 30];
    h = h.trim();
    const rgb = h.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgb) return [+rgb[1], +rgb[2], +rgb[3]];
    h = h.replace(/^#/, "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  // Lerp tra due colori hex su t∈[0,1]
  function lerpHex(a, b, t) {
    const [ar, ag, ab] = parseHex(a);
    const [br, bg, bb] = parseHex(b);
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const bl = Math.round(ab + (bb - ab) * t);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1);
  }

  // ── Render ──
  function getThemeCellColor() {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--gol-cell").trim();
    return v || "#3e3e3e";
  }
  function getCellColor() {
    if (_cellFadeStart) {
      const t = Math.min(1, (performance.now() - _cellFadeStart) / _cellFadeDur);
      if (t >= 1) {
        _cellOverride = _cellFadeTo;
        _cellFadeStart = 0;
        return _cellOverride === null ? getThemeCellColor() : _cellOverride;
      }
      // Durante fade, "to=null" significa target = colore tema corrente
      const target = _cellFadeTo === null ? getThemeCellColor() : _cellFadeTo;
      return lerpHex(_cellFadeFrom, target, t);
    }
    if (_cellOverride !== null) return _cellOverride;
    return getThemeCellColor();
  }
  function getBgColor() {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    return v || "#1a1a1a";
  }

  function draw(forceClear) {
    const cs = Math.max(4, tweaks.cellSize);
    const cw = canvas.width;
    const ch = canvas.height;
    const cellPx = cs * dpr;

    // Trail mode: copre lievemente l'intero canvas con il bg → fade
    if (tweaks.style === "trail" && !forceClear) {
      ctx.fillStyle = getBgColor();
      ctx.globalAlpha = 1 - tweaks.trailFade;
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalAlpha = 1;
    } else {
      ctx.clearRect(0, 0, cw, ch);
    }

    const color = getCellColor();
    ctx.fillStyle = color;

    if (tweaks.style === "circle") {
      const radius = cellPx * 0.42;
      const half = cellPx / 2;
      for (let y = 0; y < rows; y++) {
        const py = y * cellPx + half;
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            ctx.beginPath();
            ctx.arc(x * cellPx + half, py, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    } else if (tweaks.style === "outline") {
      ctx.lineWidth = Math.max(1, dpr);
      ctx.strokeStyle = color;
      const inset = Math.max(1, dpr);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            ctx.strokeRect(
              x * cellPx + inset/2,
              y * cellPx + inset/2,
              cellPx - inset,
              cellPx - inset
            );
          }
        }
      }
    } else {
      // square (default) o trail (anche trail usa quadrati pieni)
      // Delta tra celle adiacenti per eliminare gap sub-pixel su DPR non intero
      for (let y = 0; y < rows; y++) {
        const py = Math.round(y * cellPx);
        const ph = Math.round((y + 1) * cellPx) - py;
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            const px = Math.round(x * cellPx);
            ctx.fillRect(px, py, Math.round((x + 1) * cellPx) - px, ph);
          }
        }
      }
    }
  }

  // ── Loop ──
  let rafId = 0;
  let stepCount = 0;
  function loop(t) {
    if (!lastStep) lastStep = t;
    if (!tweaks.paused && t - lastStep >= Math.max(50, tweaks.speedMs)) {
      step();
      stepCount++;
      if (stepCount % 3 === 0 && !document.body.classList.contains("gol-focus-mode")) injectEdgeGlider();
      lastStep = t;
    }
    if (tweaks.paused) lastStep = t;
    draw(false);
    rafId = requestAnimationFrame(loop);
  }

  // ── Pointer-based input: cell / draw / glider ──
  let isDrawing = false;

  // Restituisce true se il target è un elemento UI da ignorare
  function isIgnoredTarget(t) {
    return !!(t && t.closest && t.closest(
      "#theme-toggle, a, button, .project-card, #easter-egg, #tweaks-panel, [data-tweaks-ignore]"
    ));
  }

  // Converte coordinate evento in coordinate cella
  function cellFromEvent(e) {
    const cs = Math.max(4, tweaks.cellSize);
    const x = Math.floor((e.clientX + window.scrollX) / cs);
    const y = Math.floor((e.clientY + window.scrollY) / cs);
    return [x, y];
  }

  // Setta una cella viva con bounds check
  function paintCell(x, y) {
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      grid[y * cols + x] = 1;
    }
  }

  function handlePointerDown(e) {
    if (!tweaks.clickToAdd) return;
    if (tweaks.pen === "none") return;
    if (isIgnoredTarget(e.target)) return;
    const [x, y] = cellFromEvent(e);
    if (tweaks.pen === "draw") {
      isDrawing = true;
      paintCell(x, y);
    } else if (tweaks.pen === "glider") {
      if (cols >= 8 && rows >= 8) {
        const ori = Math.floor(Math.random() * 4);
        injectGlider(grid, cols, rows, x, y, ori);
      }
    } else {
      paintCell(x, y);
    }
    draw(false);
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    const [x, y] = cellFromEvent(e);
    paintCell(x, y);
    draw(false);
  }

  function handlePointerUp() { isDrawing = false; }

  // ── Public API per Tweaks ──
  window.__gol = {
    get: () => Object.assign({}, tweaks),
    set: (patch) => {
      const oldCellSize = tweaks.cellSize;
      Object.assign(tweaks, patch);
      canvas.style.opacity = String(tweaks.opacityPct / 100);
      if (patch.cellSize !== undefined && patch.cellSize !== oldCellSize) {
        resize();
      }
    },
    reseed: (mode) => {
      grid.fill(0);
      age.fill(0);
      seedInitial(grid, cols, rows, mode || tweaks.seed);
      lastHash = hashGrid(grid);
      stagnationCounter = 0;
      draw(true);
    },
    clear: () => {
      grid.fill(0);
      age.fill(0);
      draw(true);
    },
    inject: () => injectRandomPattern(),
    loadPattern: (name) => placePatternCentered(name),
    // Forza una ri-misura del canvas (es. dopo che il documento si rimpicciolisce
    // a fine typing in placeFinalBraceAndLine, l'interval da 800 ms non
    // scatta perché lo scrollHeight è "auto-bloccato" sull'altezza del canvas).
    resize: () => resize(),
    tick: () => { step(); draw(true); },
    // Cambia colore celle con fade.
    // target: hex string (es. "#ffffff") oppure null per tornare al colore tema (CSS var --bg-glyph).
    // durMs: durata fade ms (default 600).
    setCellColor: (target, durMs) => {
      _cellFadeFrom = getCellColor();
      _cellFadeTo = (target === undefined) ? null : target;
      _cellFadeStart = performance.now();
      _cellFadeDur = Math.max(1, durMs == null ? 600 : durMs);
    },
    DEFAULTS,
  };

  // ── Init ──
  // Listener pointer su tutto il documento (canvas è pointer-events:none)
  document.addEventListener("pointerdown", handlePointerDown, { passive: true });
  document.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("pointerup",   handlePointerUp,   { passive: true });
  document.addEventListener("pointercancel", handlePointerUp, { passive: true });

  // Resize debounced
  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  // Riadatta il canvas quando l'altezza del documento cambia, in pi&ugrave; o in
  // meno. Deve passare da measureDocH(): misurando scrollHeight con il canvas
  // ancora in posizione il valore non scendeva mai e gli accorciamenti erano
  // invisibili, lasciando spazio vuoto in fondo alla pagina.
  let lastDocH = 0;
  setInterval(() => {
    const docH = measureDocH();
    if (Math.abs(docH - lastDocH) > 20) {
      lastDocH = docH;
      resize();
    }
  }, 800);

  resize();
  rafId = requestAnimationFrame(loop);
})();
