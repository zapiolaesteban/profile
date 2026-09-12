// Widow auditor for estebangz.com.
//
//   node tools/widow-audit.js            # audit index.html at every screen viewport
//   node tools/widow-audit.js --cv       # audit cv/resume.html in PRINT media, A4 column
//   node tools/widow-audit.js --json     # machine-readable
//
// Both modes are validated: the probe was proven to catch a deliberately widowed
// paragraph before its "0" was believed. On the CV that took a 44-character token to
// force a one-word final line. A checker that has never failed is not a checker.
//
// A widow here means: a paragraph or list item that wraps to more than one line and
// leaves exactly ONE word alone on its final line. That's a hard bar on this site, and
// text-wrap:pretty only catches a fraction of them, so this measures the rendered result
// rather than trusting the CSS.
//
// Measurement is geometric, not heuristic: it walks backwards through the final text node
// word by word, comparing each word's client rect top against the last word's. Words
// sharing a top are on the same visual line.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const puppeteer = require(path.join(ROOT, 'cv', 'node_modules', 'puppeteer-core'));

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean).find(p => { try { return fs.existsSync(p); } catch { return false; } });

if (!CHROME) throw new Error('No Chrome found. Set CHROME_PATH.');

// Viewports the page is actually read at. A break that is clean at 1440 can strand a
// word at 1280, so a single-width check is not a check.
const SITE_VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280',  width: 1280, height: 800 },
  { name: 'small-1024',   width: 1024, height: 768 },
  { name: 'tablet-768',   width: 768,  height: 1024 },
  { name: 'phone-390',    width: 390,  height: 844 },
];

// The CV is never read at a browser width — it is read as an A4 PDF. render.js uses
// format A4 with 13mm side and 11mm top/bottom margins, so the actual text column is
// 210-26 = 184mm wide and 297-22 = 275mm tall. At 96dpi that is 695 x 1039 CSS px.
// Measuring it at 1440 would report a layout nobody ever sees.
const MM = mm => Math.round((mm / 25.4) * 96);
const CV_VIEWPORTS = [
  { name: 'A4-print-column', width: MM(184), height: MM(275), print: true },
];

const CV_MODE = process.argv.includes('--cv');
const VIEWPORTS = CV_MODE ? CV_VIEWPORTS : SITE_VIEWPORTS;
const TARGET = CV_MODE ? path.join(ROOT, 'cv', 'resume.html') : path.join(ROOT, 'index.html');

const PROBE = () => {
  // Runs in page context.
  function finalLineWords(el) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return null;
    const lh = parseFloat(cs.lineHeight);
    if (!lh) return null;
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return null;
    const lines = Math.round(rect.height / lh);
    if (lines < 2) return null; // single-line elements cannot have a widow

    // Build a flat word index across EVERY text node in the element, in document
    // order. Anything less fails on real markup: a paragraph ending in
    // "<strong>…</strong>." leaves a trailing text node of just "." and a paragraph
    // wrapped in <em> ends in an element. Both used to come back "unmeasurable",
    // which prints like a pass and is not one.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const words = [];   // {node, start, end, text}
    let tn;
    while ((tn = walker.nextNode())) {
      const t = tn.textContent;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(t))) words.push({ node: tn, start: m.index, end: m.index + m[0].length, text: m[0] });
    }
    if (words.length < 2) return null;   // genuinely too short to widow

    const r = document.createRange();
    const rectTop = (w) => { r.setStart(w.node, w.start); r.setEnd(w.node, w.end); return r.getBoundingClientRect().top; };

    const lastTop = rectTop(words[words.length - 1]);
    let onLine = 0;
    for (let i = words.length - 1; i >= 0; i--) {
      if (Math.abs(rectTop(words[i]) - lastTop) < 2) onLine++;
      else break;
    }
    // A lone trailing punctuation token ("." after </strong>) is not a real word.
    const tail = words.slice(-onLine).map(w => w.text);
    if (onLine === 1 && /^[.,;:!?)"'’”]+$/.test(tail[0])) onLine = 2;
    return { onLine, lastTwo: words.slice(-2).map(w => w.text).join(' ') };
  }

  const out = [];
  [...document.querySelectorAll('p, li')].forEach((el, i) => {
    const res = finalLineWords(el);
    if (!res) return;
    if (res.unfixable) { out.push({ i, unfixable: res.unfixable, text: el.innerText.slice(0, 60) }); return; }
    if (res.onLine === 1) {
      out.push({
        i,
        lastTwo: res.lastTwo,
        htmlTail: el.innerHTML.slice(-80),
        text: el.innerText.slice(0, 70),
      });
    }
  });
  // sanity: if the probe found no text at all, it is broken, not clean
  const scanned = document.querySelectorAll('p, li').length;
  const anyText = document.body.innerText.length;
  return { widows: out, scanned, anyText };
};

(async () => {
  const jsonMode = process.argv.includes('--json');
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const results = {};
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    // The CV's real layout is the print stylesheet, so measure that, not the screen one.
    if (vp.print) await page.emulateMediaType('print');
    await page.goto('file://' + TARGET, { waitUntil: 'networkidle0' });
    try { await page.evaluate(() => document.fonts.ready); } catch (e) {}
    // Reveal animations start at opacity 0; force the end state so geometry is real.
    await page.addStyleTag({ content: `
      .reveal,[class*=reveal]{opacity:1!important;transform:none!important}
      *{animation:none!important;transition:none!important}
    ` });
    await new Promise(r => setTimeout(r, 250));
    const res = await page.evaluate(PROBE);

    if (res.anyText < 500) throw new Error(`Probe is blind at ${vp.name}: page innerText was ${res.anyText} chars. Refusing to report a clean result.`);

    results[vp.name] = res;
    await page.close();
  }
  await browser.close();

  if (jsonMode) { console.log(JSON.stringify(results, null, 2)); return; }

  let total = 0;
  for (const [name, res] of Object.entries(results)) {
    console.log(`\n${name}  —  scanned ${res.scanned} p/li, sanity ${res.anyText} chars of text`);
    if (!res.widows.length) { console.log('  no widows'); continue; }
    res.widows.forEach(w => {
      total++;
      if (w.unfixable) console.log(`  [needs hand-fix] ${w.unfixable}  ::  ${w.text}`);
      else console.log(`  "${w.lastTwo}"   <-   ${w.text}`);
    });
  }
  console.log(`\nTotal widow instances across all viewports: ${total}`);
})();
