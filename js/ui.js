// UI binder: read inputs, call computeAppWelch, render results.
// Depends on computeAppWelch.
function fmt(x, d) { return Number.isFinite(x) ? x.toFixed(d) : "—"; }

function onCompute() {
  const f = parseFloat(document.getElementById("f").value);
  const c = parseFloat(document.getElementById("c").value);
  const s1 = parseFloat(document.getElementById("s1").value);
  const s2 = parseFloat(document.getElementById("s2").value);
  const out = document.getElementById("output");
  const stat = document.getElementById("status");
  stat.classList.remove("error");
  const res = computeAppWelch(f, c, s1, s2);
  if (res.error) {
    out.innerHTML = "";
    stat.classList.add("error");
    stat.textContent = res.error;
    return;
  }
  stat.textContent = "Computed at " + new Date().toLocaleTimeString();
  out.innerHTML = `
    <table>
      <tr><td>z<sub>(1+c)/2</sub></td><td>${fmt(res.z, 4)}</td></tr>
      <tr><td>n<sub>min</sub> per group</td><td><strong>${res.n_min}</strong></td></tr>
      <tr><td>n<sub>total</sub> (both groups)</td><td>${res.n_total}</td></tr>
      <tr><td>&nu;* (Satterthwaite)</td><td>${fmt(res.nu_star, 2)}</td></tr>
      <tr><td>t<sub>(&nu;*, (1+c)/2)</sub></td><td>${fmt(res.t_crit, 4)}</td></tr>
      <tr><td>SE(&theta;&#770;<sub>W</sub>)</td><td>${fmt(res.se, 4)}</td></tr>
      <tr><td>CI half-width</td><td>&plusmn;${fmt(res.ci_half, 4)}</td></tr>
      <tr><td>variance ratio &sigma;<sub>max</sub>/&sigma;<sub>min</sub></td><td>${fmt(res.ratio, 3)}</td></tr>
    </table>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("compute-btn").addEventListener("click", onCompute);
  ["f", "c", "s1", "s2"].forEach((id) => {
    document.getElementById(id).addEventListener("change", onCompute);
  });
  onCompute();
});
