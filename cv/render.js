// Regenerate the downloadable CV PDF from resume.html.
//   cd cv && npm i puppeteer && node render.js   (needs network for Google Fonts)
const puppeteer = require('puppeteer');
const fs = require('fs'); const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args:['--no-sandbox','--disable-setuid-sandbox'], headless:'new' });
  const page = await browser.newPage();
  await page.setContent(fs.readFileSync(path.join(__dirname,'resume.html'),'utf8'), { waitUntil:'networkidle0', timeout:60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch(e){}
  await new Promise(r => setTimeout(r, 400));
  const foot = `<div style="width:100%; font-family:'JetBrains Mono',monospace; font-size:6.6pt; color:#A8A6A0; padding:0 14mm; display:flex; justify-content:space-between; align-items:center; -webkit-print-color-adjust:exact;">
    <span>Esteban Gimenez Zapiola &nbsp;·&nbsp; Global Creative Director &amp; Creative AI Lead</span>
    <span>estebangz.com &nbsp;·&nbsp; <span class="pageNumber"></span>/<span class="totalPages"></span></span>
  </div>`;
  await page.pdf({ path: path.join(__dirname,'..','Esteban-Gimenez-Zapiola-Creative-Director-CV.pdf'),
    format:'A4', printBackground:true,
    displayHeaderFooter:true, headerTemplate:'<span></span>', footerTemplate:foot,
    margin:{ top:'13mm', bottom:'12mm', left:'13mm', right:'13mm' } });
  await browser.close(); console.log('CV regenerated');
})();
