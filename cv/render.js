// Regenerate the downloadable CV PDF from resume.html.
//   cd cv && npm i puppeteer-core && node render.js   (needs network for Google Fonts)
//
// Uses puppeteer-core against the Chrome already installed on this machine, so there's
// no 150MB Chromium download. Falls back to full puppeteer if that's what's installed.
const fs = require('fs'); const path = require('path');
let puppeteer, launchOpts = { args:['--no-sandbox','--disable-setuid-sandbox'], headless:'new' };
try {
  puppeteer = require('puppeteer');                       // bundles its own browser
} catch {
  puppeteer = require('puppeteer-core');                  // needs an explicit browser
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
  ].filter(Boolean);
  const found = candidates.find(p => { try { return fs.existsSync(p); } catch { return false; } });
  if (!found) throw new Error('No Chrome found. Set CHROME_PATH, or npm i puppeteer.');
  launchOpts.executablePath = found;
}
(async () => {
  const browser = await puppeteer.launch(launchOpts);
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
    margin:{ top:'11mm', bottom:'11mm', left:'13mm', right:'13mm' } });
  await browser.close(); console.log('CV regenerated');
})();
