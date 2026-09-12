#!/usr/bin/env python3
"""Rebuild section 03 as a horizontal rail. One-shot, idempotent-checked.

Run from the repo root:  python3 tools/build-rail.py

Splices three regions of index.html by unique anchor, never by blind replace:
  1. the .builds-grid markup  -> .builds-rail with 8 cards + an "also built" line
  2. the Builds CSS block     -> rail CSS (old scoped rules deleted, not left behind)
  3. the stagger JS selector  -> .builds-rail, plus the rail controller

Design constraints held deliberately:
  * vertical scroll is NEVER intercepted. The rail is plain overflow-x with
    scroll-snap, so down/back always behave and the page cannot trap the user.
  * every control is a real <button> with an aria-label; the rail itself is a
    focusable region with keyboard arrows.
  * prefers-reduced-motion removes smooth scrolling and the card transitions.
"""
import re, sys, pathlib

p = pathlib.Path("index.html")
src = p.read_text(encoding="utf-8")
orig = src

# ---------------------------------------------------------------- 1. markup
CARDS = [
    # (tag, live?, title, body, anchor-kind, anchor-a, anchor-b)
    ("The programme I run", True,
     "A global Creative AI practice, and the people who run it",
     "I founded it and I lead it. Functional leadership for Creative AI is mine; people leadership sits with the regional managers. I wrote the playbook so a node runs with me out of the room.",
     "stat", "33", "nodes across the regions"),
    ("Upskilling, globally", False,
     "Power Up Weeks, run region by region",
     "Designed by me, then run <strong>through the regional leads rather than by me</strong>, so every region got hands-on in its own timezone instead of watching one central webinar.",
     "stat", "every", "region, not just one"),
    ("Skills marketplace", False,
     "A library of 49 skills, with an AI reviewer on the door",
     "Drop a skill, an automated reviewer scores it against a published bar, approved work publishes. A live tracker carries <strong>79 cards across 15 owners</strong>.",
     "stat", "49", "skills, reviewed and published"),
    ("Live · you are using it", True,
     "This site, and the agent you just spoke to",
     "Hand-built. Grounded on a knowledge base I maintain by hand, answers by voice or text, streams token by token, runs on a serverless function with my own guardrails.",
     "stat", "you", "are talking to the proof"),
    ("Native app · scaling across the firm", False,
     "Parla, a dictation app I built from scratch",
     "Native macOS, with an MCP server beside it. The transcription engine is the easy part. <strong>The dictionary is the product</strong>: it learns the names, jargon and accented edge cases generic speech models get wrong. In daily use by BCGers well beyond my own team.",
     "image", "assets/parla-app.jpg", "The Parla settings pane, running on macOS"),
    ("Publications &amp; editorial", False,
     "A report engine that typesets from the source document",
     "A 40-page report rebuilt straight from its Word file. The build <strong>fails</strong> on typographic defects instead of flagging them. Rebuilding it surfaced two errors in the published original.",
     "stat", "40pp", "and no InDesign in the loop"),
    ("Client work · by sector only", False,
     "Coded proof-of-concepts inside the pitch",
     "Embedded in the case team with BCG X data scientists and engineers and the client's own technical people. Proposals won across agri-food, energy, convenience retail, beverages and banking. The win is never one person's.",
     "stat", "5", "sectors where it won work"),
    ("Motion, cut in code", False,
     "An AI video pipeline, from stills to a finished MP4",
     "Headless-browser stills, generated voiceover, motion, a music bed and the final cut. End to end to a finished film, from the terminal rather than an editing suite.",
     "stat", "MP4", "built from the command line"),
]

ALSO = ("A global Creative AI hackathon built end to end &middot; a self-organising multi-agent studio &middot; "
        "an LLM council that anonymises and merges rival models &middot; Monday, my daily EA agent &middot; "
        "a portable version-controlled AI operating system &middot; two deck engines and a design-system layer &middot; "
        "a nine-skill UX system for the design team &middot; a scientist team's agentic tool made usable &middot; "
        "agentic tools taken into production with engineering &middot; "
        "<a href=\"https://www.estebangz.com/world-clock/v2/\" target=\"_blank\" rel=\"noopener\">World Clock</a>")


def card_html(i, c):
    tag, live, title, body, kind, a, b = c
    dot = '<span class="live"></span>' if live else ''
    if kind == "image":
        media = (f'      <div class="build-media">\n'
                 f'        <img src="{a}" alt="{b}" loading="lazy" decoding="async" width="1200" height="820">\n'
                 f'      </div>\n')
    else:
        media = (f'      <div class="build-media build-media--stat" aria-hidden="true">\n'
                 f'        <span class="stat-a">{a}</span>\n'
                 f'        <span class="stat-b">{b}</span>\n'
                 f'      </div>\n')
    return (f'    <article class="build" id="build-{i+1}" role="group" '
            f'aria-roledescription="slide" aria-label="{i+1} of {len(CARDS)}">\n'
            f'{media}'
            f'      <div class="build-body">\n'
            f'        <div class="build-tag">{dot}{tag}</div>\n'
            f'        <h3>{title}</h3>\n'
            f'        <p>{body}</p>\n'
            f'      </div>\n'
            f'    </article>\n')


rail = ['  <div class="builds-railwrap reveal">\n',
        '    <div class="rail-controls">\n',
        '      <p class="rail-hint" id="rail-hint">Drag, scroll sideways, or use the arrow keys.</p>\n',
        '      <div class="rail-btns">\n',
        '        <button type="button" class="rail-btn" data-dir="-1" aria-label="Previous build" aria-controls="builds-rail">\n'
        '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>\n'
        '        </button>\n',
        '        <button type="button" class="rail-btn" data-dir="1" aria-label="Next build" aria-controls="builds-rail">\n'
        '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>\n'
        '        </button>\n',
        '      </div>\n',
        '    </div>\n',
        '\n',
        '    <div class="builds-rail" id="builds-rail" tabindex="0" role="region"\n'
        '         aria-label="Things I built, horizontally scrollable" aria-describedby="rail-hint">\n']
rail += [card_html(i, c) for i, c in enumerate(CARDS)]
rail += ['    </div>\n',
         '\n',
         '    <div class="rail-progress" aria-hidden="true"><span class="rail-progress-bar"></span></div>\n',
         f'    <p class="builds-also"><span>Also built</span> {ALSO}.</p>\n',
         '  </div>\n']
rail_html = "".join(rail)

lines = src.split("\n")
start = next(i for i, l in enumerate(lines) if '<div class="builds-grid">' in l)
depth, end = 0, None
for i in range(start, len(lines)):
    depth += lines[i].count("<div") - lines[i].count("</div>")
    if depth == 0:
        end = i
        break
if end is None:
    sys.exit("could not find the end of .builds-grid")
print(f"markup: replacing lines {start+1}-{end+1} ({end-start+1} lines, "
      f"{sum('<article' in l for l in lines[start:end+1])} cards -> {len(CARDS)})")
lines[start:end + 1] = rail_html.rstrip("\n").split("\n")
src = "\n".join(lines)

# ------------------------------------------------------------------- 2. CSS
CSS = """
  /* Builds — a horizontal rail. Chosen over a grid because 18 stacked text cards
     read as a wall; 8 cards with a visual anchor read as a gallery. Vertical
     scrolling is never intercepted: this is plain overflow-x + scroll-snap. */
  .builds-railwrap { margin-top: 26px; }
  .rail-controls { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
  .rail-hint { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--ink-mute); margin: 0; }
  .rail-btns { display: flex; gap: 8px; flex-shrink: 0; }
  .rail-btn {
    width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center;
    background: transparent; border: 1px solid var(--rule); color: var(--ink-soft);
    cursor: pointer; transition: border-color 0.25s var(--ease), color 0.25s var(--ease);
  }
  .rail-btn svg { width: 17px; height: 17px; }
  .rail-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
  .rail-btn:disabled { opacity: 0.3; cursor: default; }
  .rail-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .builds-rail {
    display: grid; grid-auto-flow: column; grid-auto-columns: min(84vw, 380px);
    gap: 18px; overflow-x: auto; overflow-y: hidden;
    scroll-snap-type: x mandatory; scroll-behavior: smooth;
    padding: 4px 4px 18px; margin: -4px -4px 0;
    scrollbar-width: thin; scrollbar-color: var(--rule-strong) transparent;
    overscroll-behavior-x: contain;   /* stop the swipe escaping to page history */
  }
  .builds-rail:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 18px; }
  .builds-rail::-webkit-scrollbar { height: 6px; }
  .builds-rail::-webkit-scrollbar-thumb { background: var(--rule-strong); border-radius: 3px; }

  .build {
    scroll-snap-align: start; background: var(--paper-card); border: 1px solid var(--rule);
    border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    transition: border-color 0.3s var(--ease);
  }
  .build:hover { border-color: var(--rule-strong); }

  .build-media { aspect-ratio: 16 / 10; background: var(--paper-deep); border-bottom: 1px solid var(--rule);
    display: grid; place-items: center; overflow: hidden; }
  .build-media img { width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
  .build-media--stat { flex-direction: column; text-align: center; padding: 18px; gap: 6px; }
  .stat-a { display: block; font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 3.4rem);
    line-height: 1; color: var(--ink); }
  .stat-b { display: block; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--ink-mute); max-width: 22ch; }

  .build-body { padding: 20px 22px 24px; display: flex; flex-direction: column; }
  .build-tag {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 11px; display: inline-flex; align-items: center; gap: 7px;
  }
  .build-tag .live { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-bright); flex-shrink: 0; }
  .build h3 { font-size: 1.12rem; font-family: var(--font-display); margin-bottom: 9px; line-height: 1.22; }
  .build p { font-size: 14px; color: var(--ink-mute); line-height: 1.58; margin: 0; }
  .build p strong { color: var(--ink-soft); font-weight: 600; }

  .rail-progress { height: 2px; background: var(--rule); border-radius: 2px; overflow: hidden; margin-top: 2px; }
  .rail-progress-bar { display: block; height: 100%; width: 0; background: var(--accent);
    transition: width 0.2s linear; }

  .builds-also { margin-top: 22px; font-size: 13.5px; line-height: 1.6; color: var(--ink-mute); max-width: 92ch; }
  .builds-also span { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--ink-soft); margin-right: 8px; }
  .builds-also a { color: var(--accent); }

  @media (prefers-reduced-motion: reduce) {
    .builds-rail { scroll-behavior: auto; }
    .build, .rail-btn { transition: none; }
  }
"""
css_start = src.index("  /* Builds */")
css_end = src.index("  /* Experience —")
old_css = src[css_start:css_end]
print(f"css: replacing {old_css.count(chr(10))} lines of Builds CSS")
assert ".builds-grid" in old_css and ".build-lead" in old_css, "unexpected CSS block"
src = src[:css_start] + CSS.strip("\n") + "\n\n" + src[css_end:]

# -------------------------------------------------------------------- 3. JS
src = src.replace("document.querySelectorAll('.builds-grid, .caps-grid",
                  "document.querySelectorAll('.caps-grid")
assert "'.caps-grid, .honours-grid" in src, "stagger selector not updated"

RAIL_JS = """
  /* ---- Builds rail: arrows, keyboard, progress ----
     Deliberately does NOT touch wheel or touch events. Horizontal movement is
     native overflow-x, so vertical page scrolling can never be hijacked. */
  (function () {
    var rail = document.getElementById('builds-rail');
    if (!rail) return;
    var btns = Array.prototype.slice.call(document.querySelectorAll('.rail-btn'));
    var bar = document.querySelector('.rail-progress-bar');

    function step() {
      var card = rail.querySelector('.build');
      if (!card) return rail.clientWidth;
      return card.getBoundingClientRect().width + 18;
    }
    function maxScroll() { return rail.scrollWidth - rail.clientWidth; }

    /* The rail has inline padding and scroll-snap, so scrollLeft RESTS a few px
       above 0 at the first card rather than at 0. Deriving the tolerance from the
       real padding instead of guessing a number keeps the end-state buttons
       correct if that padding ever changes. */
    function slack() {
      var pad = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      return pad + 6;
    }

    function sync() {
      var max = maxScroll(), eps = slack(), x = rail.scrollLeft;
      var pct = max <= eps ? 100 : Math.min(100, Math.max(0, ((x - eps) / (max - eps)) * 100));
      if (bar) bar.style.width = pct + '%';
      btns.forEach(function (b) {
        var dir = parseInt(b.getAttribute('data-dir'), 10);
        b.disabled = dir < 0 ? x <= eps : x >= max - eps;
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        rail.scrollBy({ left: parseInt(b.getAttribute('data-dir'), 10) * step(), behavior: 'smooth' });
      });
    });

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior: 'smooth' }); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: 'smooth' }); }
      else if (e.key === 'Home') { e.preventDefault(); rail.scrollTo({ left: 0, behavior: 'smooth' }); }
      else if (e.key === 'End') { e.preventDefault(); rail.scrollTo({ left: maxScroll(), behavior: 'smooth' }); }
    });

    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  })();
"""
anchor = "  /* ---- Reveal on scroll ---- */"
assert anchor in src, "reveal anchor missing"
src = src.replace(anchor, RAIL_JS.strip("\n") + "\n\n" + anchor, 1)

if src == orig:
    sys.exit("nothing changed - aborting")
p.write_text(src, encoding="utf-8")
print("index.html rewritten")
