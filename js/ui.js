// UI binder. Range sliders + i18n EN/VN toggle. Recompute + redraw on every drag.
function fmt(x, d) { return Number.isFinite(x) ? x.toFixed(d) : "—"; }

function getInputs() {
  return {
    f: parseFloat(document.getElementById("f").value),
    c: parseFloat(document.getElementById("c").value),
    s1: parseFloat(document.getElementById("s1").value),
    s2: parseFloat(document.getElementById("s2").value)
  };
}

function syncOutputs() {
  const dec = { f: 3, c: 3, s1: 2, s2: 2 };
  ["f", "c", "s1", "s2"].forEach(id => {
    const v = parseFloat(document.getElementById(id).value);
    document.getElementById(id + "-out").textContent = v.toFixed(dec[id]);
  });
}

function onCompute() {
  syncOutputs();
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
    document.getElementById(id).addEventListener("input", onCompute);
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
