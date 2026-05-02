# app-welch-calculator

## Zusammenfassung

Browser-Rechner für das A-Priori-Verfahren unter heteroskedastischen Varianzen. Berechnet die Mindeststichprobe, die effektiven Welch-Satterthwaite-Freiheitsgrade und das Konfidenzintervall. Reines HTML, CSS und JavaScript.

## Anforderungen

- Moderner Browser (Chrome, Firefox, Safari, Edge ab 2022).
- Kein Server, keine Installation, keine Abhängigkeit.

## Verwendung

`index.html` im Browser öffnen. Eingaben anpassen. Ergebnis erscheint sofort.

Online-Version: `https://limpaulfin.github.io/app-welch-calculator/`

## Eingaben

- `f`: Genauigkeitsanteil, 0 < f < 1.
- `c`: Sicherheitsniveau, 0 < c < 1.
- `σ1`, `σ2`: Standardabweichungen der zwei Gruppen.

## Ausgaben

- `n_min`: Mindeststichprobe pro Gruppe.
- `ν*`: effektive Freiheitsgrade nach Satterthwaite.
- `t`-Quantil und Konfidenzintervall-Halbweite.

## Rechenkern

- Inverse Normal-CDF: Beasley-Springer-Moro-Algorithmus.
- t-Quantil: Newton-Iteration auf der unvollständigen Beta-Funktion.
- Lentz-Kettenbruch für die Beta-Funktion.

## Methodischer Hintergrund

Trafimow & MacDonald (2017, doi:10.1177/0013164416659745).
Wang, Wang & Trafimow (2019).
Trafimow (2023, doi:10.4324/9781003365167-7).
Welch (1947). Satterthwaite (1946).

## Lizenz

MIT.
