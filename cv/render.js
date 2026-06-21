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
  await page.pdf({ path: path.join(__dirname,'..','Esteban-Gimenez-Zapiola-Creative-Director-CV.pdf'),
    format:'A4', printBackground:true, margin:{ top:'12mm', bottom:'11mm', left:'13mm', right:'13mm' } });
  await browser.close(); console.log('CV regenerated');
})();
