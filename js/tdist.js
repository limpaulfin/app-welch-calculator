// Student t-distribution CDF, PDF, and inverse via Newton iteration.
// Depends on qnorm, ibetaReg, lgamma.
function tCDF(t, dof) {
  if (t === 0) return 0.5;
  const x = dof / (dof + t * t);
  const half = 0.5 * ibetaReg(x, dof / 2, 0.5);
  return t > 0 ? 1 - half : half;
}

function tPDF(t, dof) {
  const ln = lgamma((dof + 1) / 2) - lgamma(dof / 2)
           - 0.5 * Math.log(dof * Math.PI)
           - ((dof + 1) / 2) * Math.log(1 + t * t / dof);
  return Math.exp(ln);
}

function qt(p, dof) {
  if (dof <= 0 || p <= 0 || p >= 1) return NaN;
  if (p === 0.5) return 0;
  if (dof > 10000) return qnorm(p);
  let t = qnorm(p);
  for (let i = 0; i < 50; i++) {
    const cdf = tCDF(t, dof);
    const pdf = tPDF(t, dof);
    if (pdf < 1e-14) break;
    const dt = (cdf - p) / pdf;
    t -= dt;
    if (Math.abs(dt) < 1e-9) break;
  }
  return t;
}
