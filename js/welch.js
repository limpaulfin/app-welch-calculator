// APP-Welch core for balanced two-group design.
// Depends on qnorm, qt.
function computeAppWelch(f, c, sigma1, sigma2) {
  if (!Number.isFinite(f) || !Number.isFinite(c) ||
      !Number.isFinite(sigma1) || !Number.isFinite(sigma2)) {
    return { errKey: "err_num" };
  }
  if (f <= 0 || f >= 1) return { errKey: "err_f" };
  if (c <= 0 || c >= 1) return { errKey: "err_c" };
  if (sigma1 <= 0 || sigma2 <= 0) return { errKey: "err_s" };

  const z = qnorm((1 + c) / 2);
  const n_min = Math.ceil(Math.pow(z / f, 2));
  const n = n_min;
  const v1 = (sigma1 * sigma1) / n;
  const v2 = (sigma2 * sigma2) / n;
  const num = Math.pow(v1 + v2, 2);
  const den = (v1 * v1) / (n - 1) + (v2 * v2) / (n - 1);
  const nu_star = num / den;
  const t_crit = qt((1 + c) / 2, nu_star);
  const se = Math.sqrt(v1 + v2);
  const ci_half = t_crit * se;
  const ratio = Math.max(sigma1, sigma2) / Math.min(sigma1, sigma2);
  return { z, n_min, n_total: 2 * n_min, nu_star, t_crit, se, ci_half, ratio };
}
