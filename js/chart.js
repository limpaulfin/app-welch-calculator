// Three SVG charts. Each highlights how Results respond to slider changes.
const CUD = { blue: "#0072B2", orange: "#E69F00", green: "#009E73", vermillion: "#D55E00" };
const SVGNS = "http://www.w3.org/2000/svg";

function _ns(t, a) { const e = document.createElementNS(SVGNS, t); for (const k in a) e.setAttribute(k, a[k]); return e; }
function _clear(s) { while (s.firstChild) s.removeChild(s.firstChild); }
function _txt(s, x, y, str, anchor) { const t = _ns("text", { x, y, "text-anchor": anchor || "middle", "font-size": "10", fill: "#555" }); t.textContent = str; s.appendChild(t); }

function _frame(s, W, H, p, xL, yL) {
  s.appendChild(_ns("line", { x1: p.l, y1: p.t, x2: p.l, y2: H - p.b, stroke: "#333" }));
  s.appendChild(_ns("line", { x1: p.l, y1: H - p.b, x2: W - p.r, y2: H - p.b, stroke: "#333" }));
  const xt = _ns("text", { x: (p.l + W - p.r) / 2, y: H - 6, "text-anchor": "middle", "font-size": "11", fill: "#333" }); xt.textContent = xL; s.appendChild(xt);
  const yt = _ns("text", { x: 14, y: (p.t + H - p.b) / 2, "text-anchor": "middle", "font-size": "11", fill: "#333", transform: `rotate(-90 14 ${(p.t + H - p.b) / 2})` }); yt.textContent = yL; s.appendChild(yt);
}

function _plot(s, xs, ys, p, W, H, xMin, xMax, yMin, yMax, color) {
  const sx = x => p.l + ((x - xMin) / (xMax - xMin || 1)) * (W - p.l - p.r);
  const sy = y => H - p.b - ((y - yMin) / (yMax - yMin || 1)) * (H - p.t - p.b);
  let d = "";
  for (let i = 0; i < xs.length; i++) d += (i ? "L" : "M") + sx(xs[i]).toFixed(1) + "," + sy(ys[i]).toFixed(1);
  s.appendChild(_ns("path", { d, fill: "none", stroke: color, "stroke-width": "2" }));
  return { sx, sy };
}

function _dot(s, x, y) { s.appendChild(_ns("circle", { cx: x, cy: y, r: 4, fill: CUD.vermillion })); }
function _ticks(s, p, W, H, x0, x1, y0, y1) {
  _txt(s, p.l, H - p.b + 14, x0); _txt(s, W - p.r, H - p.b + 14, x1);
  _txt(s, p.l - 6, H - p.b + 3, y0, "end"); _txt(s, p.l - 6, p.t + 9, y1, "end");
}

function renderChart(inp) {
  const s = document.getElementById("chart"); if (!s) return; _clear(s);
  const W = 400, H = 250, p = { l: 48, r: 14, t: 14, b: 38 };
  const z = qnorm((1 + inp.c) / 2);
  const xs = [], ys = [];
  for (let f = 0.05; f <= 0.4001; f += 0.0025) { xs.push(f); ys.push(Math.ceil((z / f) ** 2)); }
  const yMin = ys[ys.length - 1], yMax = ys[0];
  _frame(s, W, H, p, "f", "n_min");
  const m = _plot(s, xs, ys, p, W, H, 0.05, 0.40, yMin, yMax, CUD.blue);
  _dot(s, m.sx(inp.f), m.sy(Math.ceil((z / inp.f) ** 2)));
  _ticks(s, p, W, H, "0.05", "0.40", yMin, yMax);
}

function renderChart2(inp, res) {
  const s = document.getElementById("chart2"); if (!s || !res) return; _clear(s);
  const W = 400, H = 250, p = { l: 48, r: 14, t: 14, b: 38 };
  const n = res.n_min, xs = [], ys = [];
  for (let r = 1.0; r <= 5.001; r += 0.05) {
    const v1 = 1 / n, v2 = (r * r) / n;
    const num = (v1 + v2) ** 2, den = (v1 * v1) / (n - 1) + (v2 * v2) / (n - 1);
    xs.push(r); ys.push(num / den);
  }
  const yMax = ys[0], yMin = ys[ys.length - 1];
  _frame(s, W, H, p, "σ-ratio", "ν*");
  const m = _plot(s, xs, ys, p, W, H, 1.0, 5.0, yMin, yMax, CUD.green);
  const r0 = Math.max(inp.s1, inp.s2) / Math.min(inp.s1, inp.s2);
  if (r0 >= 1 && r0 <= 5) _dot(s, m.sx(r0), m.sy(res.nu_star));
  _ticks(s, p, W, H, "1.0", "5.0", yMin.toFixed(0), yMax.toFixed(0));
}

function renderChart3(inp, res) {
  const s = document.getElementById("chart3"); if (!s || !res) return; _clear(s);
  const W = 400, H = 250, p = { l: 48, r: 14, t: 14, b: 38 };
  const xs = [], ys = [];
  for (let n = 10; n <= 500; n += 5) {
    const v1 = inp.s1 ** 2 / n, v2 = inp.s2 ** 2 / n;
    const nu = ((v1 + v2) ** 2) / ((v1 * v1) / (n - 1) + (v2 * v2) / (n - 1));
    const t = qt((1 + inp.c) / 2, nu);
    xs.push(n); ys.push(t * Math.sqrt(v1 + v2));
  }
  const yMax = ys[0], yMin = ys[ys.length - 1];
  _frame(s, W, H, p, "n per group", "CI half");
  const m = _plot(s, xs, ys, p, W, H, 10, 500, yMin, yMax, CUD.orange);
  if (res.n_min >= 10 && res.n_min <= 500) _dot(s, m.sx(res.n_min), m.sy(res.ci_half));
  _ticks(s, p, W, H, "10", "500", yMin.toFixed(2), yMax.toFixed(2));
}
