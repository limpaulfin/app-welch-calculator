# APP-Welch Calculator

A working paper companion. Sample size for two-group means with unequal variances. Runs in the browser.

## Author

Thanh-Phong Lam - HUB 2026.

## How to use

Open `index.html` in any modern browser. Type the four inputs. Read the results. Nothing to install.

Hosted: <https://limpaulfin.github.io/app-welch-calculator/>

## Inputs

- `f`: precision (between 0 and 1).
- `c`: assurance level (between 0 and 1).
- `σ1`, `σ2`: standard deviations of the two groups.

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
