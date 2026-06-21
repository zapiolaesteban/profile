# CV source

`resume.html` is the source for the downloadable CV at
`/Esteban-Gimenez-Zapiola-Creative-Director-CV.pdf`. The design mirrors the site
(Fraunces / Geist / JetBrains Mono, green accent) — 2 pages, A4.

## Regenerate
```
cd cv && npm i puppeteer && node render.js
```
Outputs the PDF to the repo root. Fonts load from Google Fonts at render time (needs network).
