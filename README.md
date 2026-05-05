# APP-Welch Calculator

A working paper companion. Sample size for two-group means with unequal variances. Runs in the browser.

## Author

Thanh-Phong Lam. HUB 2026. ORCID: <https://orcid.org/0009-0001-7790-5671>.

## How to use

Open `index.html` in any modern browser. Drag any slider for a fast visual sweep, or type a number into the box on its right. The number box accepts any positive value, so $\sigma > 5$ is allowed even though the slider tops out at 5.

Hosted: <https://limpaulfin.github.io/app-welch-calculator/>

## Inputs

- `f`: precision (between 0 and 1).
- `c`: confidence (also called the APP assurance level, between 0 and 1).
- `σ1`, `σ2`: standard deviations of the two groups. Type into the number box for $\sigma > 5$.

## Reading the results

By APP design, $n_{\min} = \lceil(z_{(1+c)/2}/f)^2\rceil$ depends only on $f$ and $c$. The variance ratio $\sigma_1/\sigma_2$ does **not** change $n_{\min}$; it changes $\nu^*$ (Welch effective degrees of freedom), $t$-critical, and the CI half-width. Drag $\sigma_1$ or $\sigma_2$ to see those move while $n_{\min}$ stays fixed.

## Outputs

- `n_min`: minimum sample per group.
- `ν*`: Welch effective degrees of freedom.
- `t`-critical value.
- Confidence interval half-width.
- Variance ratio σ_max / σ_min.

## Math kernel

- Inverse normal: Beasley-Springer-Moro.
- Inverse t: Newton on the regularised incomplete beta.
- Beta: Lentz continued fraction.
- Log gamma: Lanczos.

## License

MIT.
