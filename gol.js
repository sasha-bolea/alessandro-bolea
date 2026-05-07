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
    "pen": "cell",
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

  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const docH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    const h = docH;
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

  // ── Step (toroidal) ──
  function step() {
    const c = cols, r = rows;
    const next = new Uint8Array(c * r);
    const nextAge = new Uint16Array(c * r);
    for (let y = 0; y < r; y++) {
      const ym1 = (y - 1 + r) % r;
      const yp1 = (y + 1) % r;
      const rowOff = y * c;
      const rowOffM = ym1 * c;
      const rowOffP = yp1 * c;
      for (let x = 0; x < c; x++) {
        const xm1 = (x - 1 + c) % c;
        const xp1 = (x + 1) % c;
        const n =
          grid[rowOffM + xm1] + grid[rowOffM + x] + grid[rowOffM + xp1] +
          grid[rowOff  + xm1] +                      grid[rowOff  + xp1] +
          grid[rowOffP + xm1] + grid[rowOffP + x] + grid[rowOffP + xp1];
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
    if (tweaks.stagnationInjection) {
      const h = hashGrid(grid);
      if (h === lastHash) {
        stagnationCounter++;
        if (stagnationCounter >= 3) {
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

  // ── Render ──
  function getCellColor() {
    // Legge il colore corrente di --bg-glyph dal tema
    const v = getComputedStyle(document.documentElement).getPropertyValue("--bg-glyph").trim();
    return v || "#1e1e1e";
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
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
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
      if (stepCount % 6 === 0) injectEdgeGlider();
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

  // Riadatta il canvas quando la pagina cresce (sezioni che si rivelano)
  let lastDocH = 0;
  setInterval(() => {
    const docH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    if (Math.abs(docH - lastDocH) > 20) {
      lastDocH = docH;
      resize();
    }
  }, 800);

  resize();
  rafId = requestAnimationFrame(loop);
})();
