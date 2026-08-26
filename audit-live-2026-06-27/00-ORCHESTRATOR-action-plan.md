# Orchestrator Action Plan — estebangz.com (live, 2026-06-27)

*Synthesis of four independent audits: 01 Market Research (carried), 02 Copywriter/Story, 03 Agent-Backend, 04 Recruiter POV. Grounded against the live `index.html`, `knowledge/esteban.md`, `netlify/functions/ask.mjs`, `cv/resume.html`. The positioning line is fixed by design; streaming, Sonnet 4.6, prompt caching, the tool-use loop, and `save_brief` are DONE and not re-recommended.*

---

## Verdict (5 bullets)

- **The site is already top-quartile and rare-because-true.** All four reads converge: thesis → live agent proof → leadership reassurance → real builds is a genuine narrative, the agent is a category-defining signal, and the work now is *sharpening and de-risking*, not rebuilding. Don't touch the bones.
- **The single highest-value gap is evidence the agent can't currently speak to.** The CV's hard outcomes (9–13% YoY growth, ~2× scale, ~80% cross-border, double-digit conversion lifts) and the *Business and Beyond* podcast exist on the CV but are absent from the agent's brain — so a recruiter reading the numbers on the CV gets vague answers from the agent. The backend and recruiter audits independently flag this as #1.
- **The "builds AND leads" conjunction is each made of one soft half.** Recruiter is ~85% sold on "builds" (the agent proves it) but finds "leads" thinly evidenced — no testimonials, no named people grown, no design case study. Market research confirms: *other people vouching* is the currency for a leadership hire, and the site is silent on it.
- **The agent is framed as a demo, not as the product the visitor is using.** Copywriter's biggest catch: nothing names the streaming/voice/`save_brief` hand-off *as the work he's hired to lead*. The recruiter felt the jolt ("I'm the lead") but read it as ambiguous — brilliant or vain. Naming it as deliberate human-in-the-loop design resolves both.
- **One real robustness liability: the flagship demo can hard-fail live.** Single model, single call — an Anthropic 5xx shows a hiring manager "I couldn't think straight." This is the difference between "impressive" and "it broke when I tried it," and it's a fast fix.

---

## Where the agents agree (high-confidence)

1. **Load the CV's hard proof into the agent's brain.** Backend (P1) and Recruiter (#3, "firm up the numbers") agree directly; Market Research demands "outcomes, not adjectives." *Three agents.* This is the consensus #1 content fix.
2. **Surface the *Business and Beyond* podcast.** Backend (P1) names it as a standout non-AI business-builder credential proving range; it appears nowhere on the live site. *Single agent caught it, zero conflict — clean add.*
3. **Add model fallback + retry to `ask.mjs`.** Backend (#1 robustness). Recruiter implicitly depends on it — his entire "builds" conviction rests on the agent working when he tries it. *High agreement on stakes.*
4. **Name the agent as the product, at the moment of use.** Copywriter (highest-leverage section) and Recruiter (the lead-capture "jolt") describe the same moment from two sides. Market Research frames it as "the live demo is the new portfolio currency — make it the hero proof." *Three agents, same target.*
5. **Productize by subtraction.** Copywriter (cut Builds 11→~7, drop the generic "Capabilities" block, kill repeated lines) and Market Research ("curate ruthlessly; a few deep proofs beat a wall of AI output"; "narrow, sharp positioning") agree. Recruiter's "everything in Built & shipped is personal tooling" is the same problem seen from severity, not volume.
6. **Honest answers to predictable hard questions.** Backend (weakness / measurable impact / first-90-days) and Recruiter ("why now," level/intent, mobility) overlap. The agent should field these instead of deflecting.

---

## Conflicts + my call

- **"400+ designers" — keep the energy or kill the ambiguity?** Copywriter treats it as a fine scale signal; Recruiter says it "flirts with span-of-control" and *makes him trust the other numbers less.* **My call: Recruiter wins — this is the audience that decides.** Disambiguate everywhere to "16 direct; influence across a 400+ designer network." Precision reads as *more* senior, not less. Low effort, removes a credibility leak.
- **`save_brief` — make it louder, or could it read as vain?** Copywriter says surface it boldly as a conversion path; Recruiter says a stuffy client (bank, law-adjacent) might read self-instrumentation as a gimmick. **My call: surface it, but frame it as judgement, not vanity** — exactly Recruiter's own fix #5 ("a 'for recruiters' mode… reframes the agent from 'look what I can build' to 'look how I think about funnels and human-in-the-loop'"). The two reconcile: loud *and* legibly intentional.
- **Builds 11→7 vs. "small-scale / self-serving."** Copywriter frames it as a *trim* (too much inventory); Recruiter frames it as a *substance* gap (all personal tooling, no product with users/outcomes). **My call: both, sequenced.** Trim to ~7 now (cheap), but the deeper fix is adding one real *design* case study with a business outcome (the Endeavour/Dan Murphy's chapter) — which answers Recruiter's "show me the design" and reframes the cluster from hobby tools to shipped product.
- **Thought-leadership weight.** Market Research notes the HBR/McKinsey tension (writing is contested; showing wins). No other agent pushes essays. **My call: non-issue for now** — the site already *shows*. Don't add a blog; the podcast addition covers the "creates IP" signal.

---

## Scorecard (current → done)

| Pillar | Current | At "done" | Gap to close |
|---|---|---|---|
| **Authentic** | 8/10 — rare-because-true, shows not tells; agent is genuine proof. Dinged by repeated signature lines ("medium is the proof" ×3, "I do both", "prototype to production") reading as tics, and the weak hero subhead. | 9.5/10 | Trim repeated lines to once each; rewrite hero subhead; add one honest "weakness" answer. |
| **Productized** | 6.5/10 — agent is a strong product, but framed as a demo; `save_brief` invisible in copy; 11 Builds read as inventory; Capabilities duplicates About. | 9/10 | Name the agent-as-product at use; surface `save_brief` + recruiter mode; cut Builds to ~7; drop/merge Capabilities; add a product datasheet line. |
| **Robust** | 6/10 — clean architecture, but single-model demo can hard-fail; `save_brief` can silently drop a lead; no observability; brain missing the CV's hard proof. | 8.5/10 | Model fallback + retry; harden `save_brief` end-to-end + canonical URL; load outcomes/podcast into KB; confirm client-side error UX. |
| **Career target** (reads as AI architect / AI-native creative advancing to Head of Design / Creative-AI-Labs) | 7.5/10 — Recruiter "strong shortlist" for the Creative-AI/Head-of-Creative lane; conditional for CDO. Builds-half is hobbyist-scale; leads-half is testimonial-thin. | 9/10 | Testimonials/named growth (the keystone); one design case study; firm numbers; a "what I'm looking for / level" line. |

---

## Prioritized backlog (ranked)

`PR?` column flags the prepared salvage PR: **YES** = covered, **PARTIAL** = started but not finished, **NO** = not covered.

| # | Action | Why (goal pillar) | Source(s) | Effort | Impact | PR? |
|---|---|---|---|---|---|---|
| 1 | **Load CV hard outcomes into KB** (9–13% YoY, ~2× scale, ~80% cross-border, double-digit lifts) as team outcomes | Robust + Authentic — agent can finally answer "what business impact?" | 03 (P1), 04 (#3), 01 | S | High | **YES** |
| 2 | **Add model fallback + one retry in `ask.mjs`** (secondary model on 429/5xx) | Robust — flagship demo never hard-fails in front of a hiring manager | 03 (#1) | S | High | **YES** |
| 3 | **Add *Business and Beyond* podcast to KB** (pitched/launched/exec-produces) | Authentic + career — proves he builds audience-facing IP, not just tooling | 03 (P1) | S | High | **YES** |
| 4 | **Add first-person "how did you build this agent?" answer to KB** | Productized — lets the agent narrate its own build as proof | 03 (#4-adjacent), 02 | S | Med | **YES** |
| 5 | **Disambiguate "400+"** → "16 direct; influence across a 400+ network", everywhere | Authentic — removes the one inflation that taints the real numbers | 04 (#3) | S | High | NO |
| 6 | **Name the agent as the product, at the moment of use** (one quiet line: "you're not reading about the work, you're using it") | Productized — converts a passive feature into a live argument | 02 (key), 01, 04 | S | High | NO |
| 7 | **Surface `save_brief` + add a "for recruiters / I'm hiring" chip** that qualifies (role, level, timeline) and frames the hand-off as human-in-the-loop design | Productized + career — turns the gimmick into legible judgement, captures the lead | 02, 04 (#5) | M | High | NO |
| 8 | **Rewrite the hero subhead** (lead with BCG/practice, cut "in the business of creativity and design", hand straight to the agent) | Authentic — the headline currently writes a cheque the first sentence doesn't cash | 02 (Option A/C) | S | Med | NO |
| 9 | **Trim repeated signature lines to once each** ("medium is the proof", "I do both", "prototype to production", "hands-on") | Authentic — scarcity makes the lines land; repetition reads as a tic | 02 | S | Med | NO |
| 10 | **Cut Builds 11→~7, grouped**; fold daily tooling into one "toolkit I run my own work on" cluster | Productized — fewer, sharper = product not résumé | 02, 04 (#2), 01 | M | Med | NO |
| 11 | **Drop or merge the "Capabilities / Where I make the difference" block into About** | Authentic + Productized — removes the one generic LinkedIn-flavoured section | 02 | S | Med | NO |
| 12 | **Harden `save_brief` end-to-end**: verify form is detected + notifications on; post to a canonical URL (env var) not inbound origin; never silently drop a lead | Robust — a captured lead is the most productized outcome; losing it is the worst failure | 03 (#2, #3) | M | Med | NO |
| 13 | **Add honest answers to hard questions in KB**: a real weakness, measurable impact, "first 90 days", warmer relocation steer | Authentic + career — pre-answers the exact interview probes | 03 (#4), 04 (#5) | S | Med | NO |
| 14 | **Add a "what I'm looking for" line naming the level** (Head of / VP / Creative-AI Labs; right-sized for CDO) | Career — stops a recruiter mispitching him; one crisp sentence | 04 (#4) | S | Med | NO |
| 15 | **Add ONE real design case study with an outcome** (Endeavour / Dan Murphy's: before→after + business result) | Career — answers "show me the design"; reframes Builds from hobby to shipped product | 04 (#2), 03 (P2 Endeavour) | M | High | NO |
| 16 | **Add leadership proof: 2–3 short testimonials + one named person grown** | Career — THE keystone; the weakest-evidenced half is the half clients buy | 04 (#1), 01 | L | High | NO |
| 17 | Add India team scope, Mini-MBA, Endeavour tooling specifics (Frontify/Responsys/sub-brands) to KB | Authentic — cross-geo leadership + pre-AI craft depth | 03 (P2/P3) | S | Low | NO |
| 18 | Light observability (count conversations/leads/fallbacks) | Robust — itself more proof; a citable metric | 03 (#5) | M | Low | NO |

---

## Low-hanging fruit (do first — all S effort, mostly High/Med impact)

- **#5 Disambiguate "400+"** — find/replace across `index.html` + KB. 10 minutes, removes a credibility leak the recruiter explicitly flagged.
- **#1 / #3 / #4** — the KB additions (outcomes, podcast, "how I built the agent"). These are the salvage PR's core and the highest content ROI on the site.
- **#2 Model fallback** — small code change, kills the one demo-killing failure mode.
- **#6 "You're using it" line** — one sentence under the composer, converts the agent from demo to argument.
- **#8 / #9 Hero subhead + de-duplicate signature lines** — pure copy, high authenticity payoff, no engineering.

That cluster (≈half a session) lifts Robust and Authentic materially and ships the salvage PR's value plus three quick wins it doesn't include.

## The keystone move (biggest / hardest)

**Add third-party proof of leadership — testimonials + named people grown (#16), paired with one real design case study with an outcome (#15).**

This is the hardest because it needs *other people* (quotes from a Partner/MD, a peer, someone he promoted) and real artefacts, not just editing. But it's the keystone because every audit's deepest critique points here: the recruiter is only ~85% sold on "builds" and *thinly* sold on "leads"; market research says *vouching is the currency* for a leadership hire and *outcomes beat credentials*; the agent backend can load the numbers but can't manufacture a testimonial. The site is a brilliant top-of-funnel that wins the meeting — this is what de-risks the *hire*. It's the move that converts "strong shortlist" into "pitch him higher." Everything else sharpens what's there; this adds the one class of evidence that's currently missing.

---

## Next-session plan (ordered, quick wins front-loaded)

**Phase 1 — ship the salvage PR + adjacent quick wins (this session, ~1–2 hrs):**
1. Confirm the parked-branch edits cover #1 (outcomes), #3 (podcast), #4 (agent-build answer), #2 (model fallback). Review and merge via PR.
2. While in the files, add the three quick wins the PR misses: **#5** (disambiguate 400+), **#8** (hero subhead — use Copywriter Option A or C), **#9** (trim repeated lines to once each).
3. Add **#6** (the "you're using it" line under the composer) — one sentence, big framing payoff.
4. Smoke-test the agent live: ask it "what business results has Esteban driven?" and "tell me about the podcast" — confirm the new KB content surfaces. Trigger a `save_brief` and confirm the email lands (closes part of #12).

**Phase 2 — productize the agent + tighten the page (next session, ~half day):**
5. **#7** recruiter/"I'm hiring" chip + visible `save_brief` framing as human-in-the-loop.
6. **#10 / #11** cut Builds to ~7, merge Capabilities into About.
7. **#13 / #14** honest hard-question answers + "what I'm looking for" line.
8. **#12** finish hardening `save_brief` (canonical URL env var, never-drop fallback).

**Phase 3 — the keystone (needs Esteban to gather inputs, own work-block):**
9. **#16** collect 2–3 testimonials + one named growth story → add a Recognition/leadership-proof block.
10. **#15** build one Endeavour design case study with a business outcome.
11. **#17 / #18** KB depth additions + light observability as cleanup.

**Front-load rule:** Phase 1 is all S-effort and ships the salvage PR plus three things it doesn't cover, lifting Robust + Authentic the same day. The keystone (Phase 3) is gated on Esteban gathering human inputs, so flag it to him now so collection can run in parallel.

---

## What the salvage PR covers vs. doesn't

**The prepared PR (parked branch) covers backlog #1, #2, #3, #4** — the outcome numbers, the *Business and Beyond* podcast, a first-person "how I built the agent" KB answer, and the model fallback in `ask.mjs`. That's an excellent, high-ROI quick win: it closes the agent's worst content gap (it can finally quote his own outcomes and his standout non-AI credential) and kills the one demo-killing failure mode. It moves **Robust ~6→7.5** and **Authentic ~8→8.5** on its own.

**It does NOT cover the higher-value structural items** that still need a real decision or human input:
- **#16 leadership proof (testimonials / named growth)** — the keystone, and the single biggest gap to the career target. Needs other people.
- **#15 one real design case study** — answers "show me the design"; needs artefacts.
- **#7 surfacing `save_brief` + recruiter mode** — the biggest *productized* win; needs design + copy.
- **#5 disambiguating "400+"** — cheap but not in the PR; a credibility leak the recruiter flagged hard.
- **#6 / #8 / #9** hero subhead, "you're using it" line, de-duplicating signature lines — pure copy, not in the PR.
- **#10 / #11** trimming Builds and merging Capabilities.

In short: **the salvage PR is the right first move and ships real value, but it's the "brain + resilience" layer. The "productize the agent," "fix the framing," and "prove leadership" layers — which is where the bigger career upside lives — still need a real decision and effort.**
