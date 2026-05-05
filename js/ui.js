// UI binder. Range slider + number input (paired) + i18n EN/VN toggle. Recompute on every input.
function fmt(x, d) { return Number.isFinite(x) ? x.toFixed(d) : "—"; }

const DEC = { f: 3, c: 3, s1: 2, s2: 2 };

function getInputs() {
  // number input is canonical: it accepts values beyond slider range (e.g. sigma > 5).
  const v = id => parseFloat(document.getElementById(id + "-num").value);
  return { f: v("f"), c: v("c"), s1: v("s1"), s2: v("s2") };
}

function syncFromRange(id) {
  const r = document.getElementById(id);
  const n = document.getElementById(id + "-num");
  n.value = parseFloat(r.value).toFixed(DEC[id]);
}

function syncFromNum(id) {
  const r = document.getElementById(id);
  const n = document.getElementById(id + "-num");
  const v = parseFloat(n.value);
  if (Number.isFinite(v)) r.value = v; // slider auto-clamps to its [min,max]; number value preserved
}

function onCompute() {
  const inp = getInputs();
  const out = document.getElementById("output");
  const stat = document.getElementById("status");
  const dict = tdict();
  stat.classList.remove("error");
  const res = computeAppWelch(inp.f, inp.c, inp.s1, inp.s2);
  if (res.errKey) {
    out.innerHTML = "";
    stat.classList.add("error");
    stat.textContent = dict[res.errKey] || res.errKey;
    return;
  }
  stat.textContent = dict.live;
  const rows = [
    ["r_z", fmt(res.z, 4)],
    ["r_n", `<strong>${res.n_min}</strong>`],
    ["r_nt", res.n_total],
    ["r_nu", fmt(res.nu_star, 2)],
    ["r_t", fmt(res.t_crit, 4)],
    ["r_se", fmt(res.se, 4)],
    ["r_ci", `±${fmt(res.ci_half, 4)}`],
    ["r_ratio", fmt(res.ratio, 3)]
  ];
  out.innerHTML = `<table>${rows.map(([k, v]) => {
    const [lbl, hint] = dict[k];
    return `<tr class="r-main"><td>${lbl}</td><td>${v}</td></tr>` +
           `<tr class="r-hint"><td colspan="2">${hint}</td></tr>`;
  }).join("")}</table>`;
  renderChart(inp);
  renderChart2(inp, res);
  renderChart3(inp, res);
  if (window.renderMathInElement) {
    renderMathInElement(out, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}

function setActiveFlag() {
  const lang = getLang();
  document.querySelectorAll("#lang-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18N();
  setActiveFlag();
  ["f", "c", "s1", "s2"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => { syncFromRange(id); onCompute(); });
    document.getElementById(id + "-num").addEventListener("input", () => { syncFromNum(id); onCompute(); });
  });
  document.querySelectorAll("#lang-toggle button").forEach(b => {
    b.addEventListener("click", () => {
      if (b.dataset.lang === getLang()) return;
      setLang(b.dataset.lang);
      applyI18N();
      setActiveFlag();
      onCompute();
    });
  });
  onCompute();
});
