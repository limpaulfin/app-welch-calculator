// UI binder. Range sliders update output displays + recompute + redraw chart on every drag.
function fmt(x, d) { return Number.isFinite(x) ? x.toFixed(d) : "—"; }

function getInputs() {
  return {
    f: parseFloat(document.getElementById("f").value),
    c: parseFloat(document.getElementById("c").value),
    s1: parseFloat(document.getElementById("s1").value),
    s2: parseFloat(document.getElementById("s2").value),
  };
}

function syncOutputs() {
  const decimals = { f: 3, c: 3, s1: 2, s2: 2 };
  ["f", "c", "s1", "s2"].forEach((id) => {
    const v = parseFloat(document.getElementById(id).value);
    document.getElementById(id + "-out").textContent = v.toFixed(decimals[id]);
  });
}

function onCompute() {
  syncOutputs();
  const inp = getInputs();
  const out = document.getElementById("output");
  const stat = document.getElementById("status");
  stat.classList.remove("error");
  const res = computeAppWelch(inp.f, inp.c, inp.s1, inp.s2);
  if (res.error) {
    out.innerHTML = "";
    stat.classList.add("error");
    stat.textContent = res.error;
    return;
  }
  stat.textContent = "Live. Drag any slider to update.";
  out.innerHTML = `
    <table>
      <tr><td>z<sub>(1+c)/2</sub></td><td>${fmt(res.z, 4)}</td></tr>
      <tr><td>n<sub>min</sub> per group</td><td><strong>${res.n_min}</strong></td></tr>
      <tr><td>n<sub>total</sub></td><td>${res.n_total}</td></tr>
      <tr><td>&nu;*</td><td>${fmt(res.nu_star, 2)}</td></tr>
      <tr><td>t-critical</td><td>${fmt(res.t_crit, 4)}</td></tr>
      <tr><td>SE</td><td>${fmt(res.se, 4)}</td></tr>
      <tr><td>CI half-width</td><td>&plusmn;${fmt(res.ci_half, 4)}</td></tr>
      <tr><td>variance ratio</td><td>${fmt(res.ratio, 3)}</td></tr>
    </table>`;
  renderChart(inp);
}

document.addEventListener("DOMContentLoaded", () => {
  ["f", "c", "s1", "s2"].forEach((id) => {
    document.getElementById(id).addEventListener("input", onCompute);
  });
  onCompute();
});
