// Inline-SVG chart of n_min(f) at the current assurance level c.
// Marker dot + dashed guides at the user's current f. Updates on every input.
function renderChart(inp) {
  const svg = document.getElementById("chart");
  if (!svg) return;
  const W = 400, H = 250, padL = 50, padB = 40, padT = 18, padR = 18;
  const fMin = 0.05, fMax = 0.40;
  const z_c = qnorm((1 + inp.c) / 2);
  const fs = [], ns = [];
  for (let f = fMin; f <= fMax + 1e-9; f += 0.0025) {
    fs.push(f);
    ns.push(Math.ceil(Math.pow(z_c / f, 2)));
  }
  const nMax = Math.max(...ns);
  const x = f => padL + (f - fMin) / (fMax - fMin) * (W - padL - padR);
  const y = n => H - padB - n / nMax * (H - padT - padB);
  const p = [];
  p.push(`<rect x="${padL}" y="${padT}" width="${W-padL-padR}" height="${H-padT-padB}" fill="white"/>`);
  p.push(`<line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="#444"/>`);
  p.push(`<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H-padB}" stroke="#444"/>`);
  for (let f = 0.05; f <= 0.401; f += 0.05) {
    p.push(`<line x1="${x(f)}" y1="${H-padB}" x2="${x(f)}" y2="${H-padB+5}" stroke="#444"/>`);
    p.push(`<text x="${x(f)}" y="${H-padB+18}" font-size="11" text-anchor="middle">${f.toFixed(2)}</text>`);
  }
  for (let i = 0; i <= 4; i++) {
    const n = Math.round(nMax * i / 4);
    p.push(`<line x1="${padL-5}" y1="${y(n)}" x2="${padL}" y2="${y(n)}" stroke="#444"/>`);
    p.push(`<text x="${padL-8}" y="${y(n)+4}" font-size="11" text-anchor="end">${n}</text>`);
  }
  p.push(`<text x="${(W+padL-padR)/2}" y="${H-6}" font-size="12" text-anchor="middle">precision f</text>`);
  p.push(`<text x="14" y="${(H+padT-padB)/2}" font-size="12" text-anchor="middle" transform="rotate(-90 14 ${(H+padT-padB)/2})">n_min per group</text>`);
  let d = `M ${x(fs[0])} ${y(ns[0])}`;
  for (let i = 1; i < fs.length; i++) d += ` L ${x(fs[i])} ${y(ns[i])}`;
  p.push(`<path d="${d}" fill="none" stroke="#0072B2" stroke-width="2"/>`);
  const fNow = inp.f;
  if (fNow >= fMin && fNow <= fMax) {
    const nNow = Math.ceil(Math.pow(z_c / fNow, 2));
    p.push(`<line x1="${x(fNow)}" y1="${H-padB}" x2="${x(fNow)}" y2="${y(nNow)}" stroke="#D55E00" stroke-dasharray="3,3"/>`);
    p.push(`<line x1="${padL}" y1="${y(nNow)}" x2="${x(fNow)}" y2="${y(nNow)}" stroke="#D55E00" stroke-dasharray="3,3"/>`);
    p.push(`<circle cx="${x(fNow)}" cy="${y(nNow)}" r="5" fill="#D55E00"/>`);
    p.push(`<text x="${x(fNow)+9}" y="${y(nNow)-7}" font-size="12" fill="#D55E00" font-weight="bold">n=${nNow}</text>`);
  }
  p.push(`<text x="${W-padR-2}" y="${padT+12}" font-size="12" text-anchor="end" fill="#666">c = ${inp.c.toFixed(3)}</text>`);
  svg.innerHTML = p.join("");
}
