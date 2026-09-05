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

    // Walk to the deepest trailing text node. A paragraph whose text is wrapped in
    // <em> or <strong> ends in an ELEMENT, not a text node — looking only at direct
    // children silently marks those unmeasurable, which reads like a pass but isn't.
    function deepestTrailingText(n) {
      const kids = [...n.childNodes].reverse();
      for (const k of kids) {
        if (k.nodeType === 3 && k.textContent.trim()) return k;
        if (k.nodeType === 1) {
          const found = deepestTrailingText(k);
          if (found) return found;
        }
      }
      return null;
    }
    const node = deepestTrailingText(el);
    if (!node) return { unfixable: 'no trailing text node found' };

    const text = node.textContent;
    const words = text.trim().split(/\s+/);
    if (words.length < 2) return { unfixable: 'final text node has fewer than 2 words' };

    const r = document.createRange();
    r.setStart(node, text.length - words[words.length - 1].length);
    r.setEnd(node, text.length);
    const lastTop = r.getBoundingClientRect().top;

    let onLine = 0, idx = text.length;
    for (let i = words.length - 1; i >= 0; i--) {
      idx = text.lastIndexOf(words[i], idx - 1);
      if (idx < 0) break;
      r.setStart(node, idx);
      r.setEnd(node, idx + words[i].length);
      if (Math.abs(r.getBoundingClientRect().top - lastTop) < 2) onLine++;
      else break;
    }
    return { onLine, lastTwo: words.slice(-2).join(' ') };
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
