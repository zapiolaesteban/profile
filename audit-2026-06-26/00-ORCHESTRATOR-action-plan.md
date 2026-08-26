# ORCHESTRATOR — Action Plan for estebangz.com

*Synthesis of four independent audits (market research · copywriter/story · agent backend · recruiter POV), judged against the goal: make the site more authentic, more productized, more robust, so any reader instantly reads Esteban as an AI architect / AI-native creative who understands the medium — in service of Head of Design / CDO / Creative-AI-Labs leadership.*

*Prepared 2026-06-27. Grounded in the live site, local `index.html`, `knowledge/esteban.md`, `netlify/functions/ask.mjs`, and git state.*

---

## Verdict in 5 bullets

1. **The bones are genuinely strong — the recruiter was "re-recruited in 30 seconds," and that almost never happens.** The "builds AND leads" thesis is rare and credible, the live agent is a category-defining proof artifact, and the personal-build volume is hard to fake. We are closer to the bar than most candidates ever get.
2. **But the best version of the site isn't live.** Verified: the local repo has the sharp hero — *"Most design leaders talk about AI. I build it."* — committed, while **estebangz.com still serves the older, softer "I lead design as a business"** title, meta, and hero. The single highest-value win is already written and merely needs deploying.
3. **The "builds" half is proven; the "leads" half is only asserted.** Two agents independently land this. The agent demonstrates building; the team/P&L/client-craft leadership is told, never shown. That asymmetry is the main thing standing between "strong shortlist" and "undeniable."
4. **The agent's brain is thinner than the agent's architecture.** It argues the thesis with almost no numbers, stack, adoption metrics, sector range, or the Business and Beyond podcast — all of which already exist in the CV. It tells where a hiring committee needs it to prove.
5. **Positioning is split between two theses and one target role too many.** Market research + recruiter agree: pick ONE spine ("creative director who architects and ships AI systems") and ONE primary role. Breadth currently reads as undecided.

---

## Where the agents agree (high-confidence — flagged)

- **[3 of 4] The live agent is the single best asset and is under-leveraged.** Market ("portfolio that talks back" is the genre the market rewards), copywriter ("under-sold as story"), recruiter ("a different category of artifact"). Unanimous direction: make it the hero/front door and close the proof loop inside it.
- **[3 of 4] Quantified outcomes are missing where they matter.** Market ("outcomes, not adjectives"), backend ("the single highest-value KB gap"), recruiter ("he leads with money — good — but the AI builds lack scale numbers"). The CV has the numbers (9–13% YoY, ~2× audience, double-digit conversion lifts); the site and the agent brain don't carry them.
- **[3 of 4] Narrow the positioning / pick one role.** Market ("kitchen-sink mandates self-select out"), copywriter ("the through-line wobbles between two theses"), recruiter ("broad reads as undecided — pick ONE").
- **[2 of 4] The enterprise/mining-sector shipment is the strongest commercial proof and the thinnest item on the site.** Backend (thinnest described build) + recruiter ("make it the hero, not a footnote"). It is the one example of AI shipped to real users at scale — and it's one cautious line.
- **[2 of 4] "AI-native" must be earned with specifics, not adjectives.** Market (say it, name the stack) + backend (the KB has "builds agentic AI" with zero nouns).
- **[2 of 4] Authenticity is high but currency must be visible.** Copywriter ("the 'right now in London' liveness signal is gold") + backend ("add a freshness/as-of-2026 anchor").

When 2+ independent reads converge, treat it as settled. The deploy gap, the proof-loop, the missing numbers, and the single-spine positioning are not opinions — they're consensus.

---

## Where they conflict (and my call)

- **Hero strategy: "near-empty agent-first front door" (copywriter, option to strip the hero to one line + blinking cursor) vs. "lead with a strong declarative claim" (market + recruiter both reacted to the headline copy, not an empty page).**
  **My call: keep the declarative headline, make the agent the immediate co-star beneath it — do NOT strip the hero bare.** The recruiter's 30-second conversion was driven by *reading the line AND seeing the agent together*. A blank agent-first page is a bigger, riskier bet that throws away the headline that already works. Ship the sharp headline first (cheap, proven), and treat "agent as front door" as a later, optional experiment — not Day 1.

- **Thought leadership / external validation: market says "demonstrated building out-signals written thought leadership"; recruiter says "add a talk, an article, a public repo — one third-party signal de-risks the whole story."**
  **My call: they're compatible, recruiter wins on sequencing.** Esteban shouldn't write essays to lead — but ONE external proof point (a public sanitised repo link, a talk, a quote from an MD/Partner) is high-leverage because it breaks the "everything is self-hosted, trust me" wall. Demonstrated building stays the spine; one external signal is the cheapest credibility multiplier.

- **CDO readiness: recruiter is cautious ("consultancy-flavoured scale, internal services org") where the goal statement lists CDO as a target.**
  **My call: trust the recruiter.** Lead the site at Creative-AI / AI-Labs leadership + Head of Design (his bullseye), position CDO as the stretch — and explicitly disambiguate the BCG context (P&L-owning global practice, not an internal print desk) to stop a committee under-reading the title.

No agent is wrong on facts; the conflicts are about emphasis and sequencing, resolved above.

---

## Scorecard (current → done)

| Pillar | Current state | What "done" looks like |
|---|---|---|
| **Authentic** | **Strong (8/10).** Hand-built site + agent, specific un-fakeable builds, honest confidentiality stance, "right now in London" currency. The most convincing pillar. | The shipped copy names authorship at the point of use ("I built the thing you're using"), surfaces the colophon, carries a live "Currently" status, and one external/third-party signal exists so it's not 100% self-hosted. |
| **Productized** | **Medium (5/10).** Reads as an excellent CV with a chatbot bolted on, not a tool you use. Build cards are inconsistent (some link, some don't; status chips uneven). | Agent is the front door / co-hero; asking "how did you build this?" returns a real architecture answer (using it = the case study); every build card has a consistent status chip + verb-first one-liner; the experience has a name. |
| **Robust** | **Medium (5/10).** Architecture is right (server-side key, guardrails, KB caching, input caps) but: single hard-coded model with no fallback, silent-off if key unset, per-instance-only rate limit, no streaming, no prompt caching, no observability. | Model fallback + verified current model name; graceful front-end fallback when agent is offline + uptime monitor; prompt caching on the stable KB; streaming for perceived quality; lightweight question-category logging to find KB weak spots. |
| **Career target** | **Strong-shortlist, not undeniable (6/10).** "Builds" proven; "leads" asserted; one target role too many; enterprise proof too thin; no external validation. | One primary role stated; BCG context disambiguated (P&L global practice); the enterprise/mining shipment given depth (his role, outcome, scale); leadership shown not just told (team-craft proof, even NDA/reference-gated); agent brain carries the CV's numbers so every answer demonstrates the level. |

**Honest distance from the bar:** the *authentic* pillar is essentially there; *productized* and *robust* are half-done with clear, mostly-cheap closers; the *career target* is one deploy + one KB pass + two structural moves away from "undeniable for the Creative-AI lane."

---

## Prioritized backlog (ranked)

| # | Action | Why | Source | Effort | Impact |
|---|---|---|---|---|---|
| 1 | **Deploy the local repo to production** (sharp hero, title, meta, banked builds all exist locally; live site is behind) | The best version of the site literally isn't live; the #1 win is already written | Copy (verified) | **S** | **High** |
| 2 | **Pour CV numbers into `esteban.md`** (9–13% YoY, ~2× audience, double-digit conversion, ~80% cross-border) + AI-adoption metrics frame | Agent can't cite what isn't in its brain; outcomes are how committees score | Backend, Market, Recruiter | **S** | **High** |
| 3 | **Add the stack section to the KB** (Claude/Anthropic API, Claude Code, MCP, Node serverless/Netlify, CI workers, git hooks) | "Builds agentic AI" with zero nouns fogs every technical probe; earns "AI-native" | Backend, Market | **S** | **High** |
| 4 | **Add Business and Beyond podcast to the KB** (pitched, launched, exec-produces; C-suite guests) | Proof of operator range + executive reach, entirely missing today | Backend | **S** | **Med** |
| 5 | **Close the proof loop in the agent**: a real "how did you build this?" answer (serverless, KB, guardrails) + add that chip | Using the product becomes the case study — highest-leverage productizing move | Copy, Backend, Market | **S** | **High** |
| 6 | **Name authorship at point of use** + surface the colophon near the agent ("I built the thing you're using") | Turns the agent from feature into the closing argument | Copy | **S** | **High** |
| 7 | **Pick ONE primary role + disambiguate BCG context** (P&L-owning global practice, not internal print desk) | Breadth reads as undecided; title gets under-read by sharp committees | Market, Recruiter, Copy | **S** | **High** |
| 8 | **Model fallback + verify current model name; graceful offline fallback** | If the centerpiece silently 502s/offline, the whole flex reads as broken | Backend | **S/M** | **High** |
| 9 | **Give the enterprise/mining shipment depth** (his role, outcome, scale, concept→production) | The single strongest commercial proof is the thinnest item | Recruiter, Backend | **S** | **Med** |
| 10 | **Add a leadership-grade POV + expand sector range in the KB** (financial services, energy, retail, public sector, healthcare, tech) | Committees buy a worldview; sector breadth signals range safely | Backend, Recruiter | **M** | **Med** |
| 11 | **Prompt caching + streaming on the function** | Cheaper + feels as good as it claims; perceived quality for recruiter audience | Backend | **M** | **Med** |
| 12 | **Standardize build cards** (status chip Live/Internal/Sanitised + verb-first one-liner) + give the experience a name | Products feel systematic; portfolios feel like sections | Copy | **M** | **Med** |
| 13 | **Trim crutch phrases** ("the medium is the proof" ×3, "prototype to production, not demos" ×3, "the team is the asset") to one use each | Repetition turns a mic-drop into a slogan you stopped believing | Copy | **S** | **Low** |
| 14 | **Add one external/third-party validation** (sanitised public repo link, a talk, an MD/Partner quote) | Breaks the all-self-hosted "trust me" wall — cheap credibility multiplier | Recruiter, Market | **M** | **Med** |
| 15 | **Show the "leads" half** — a reference-gated/NDA team-craft walk-through or proof of team output | The asserted-not-shown leadership half is the gap to "undeniable" | Recruiter | **L** | **High** |
| 16 | **Add lightweight observability** (question-category logging) + uptime monitor | Closes the loop on where the agent is weak in the wild | Backend | **S** | **Low** |

---

## Low-hanging fruit (do FIRST)

The highest impact-per-effort, all **S** effort, several "already written, not shipped":

1. **Deploy (backlog #1).** The repositioning is committed locally and absent live. Pure upside, near-zero effort, fixes the worst gap on the site (visitors today still see the soft hero).
2. **Bank the CV numbers + stack + podcast into `esteban.md` (#2, #3, #4).** Source material already exists in the CV; it's copy-paste-and-sanitise into the KB. Instantly upgrades every agent answer from assertion to evidence.
3. **Close the agent proof loop + name authorship (#5, #6).** A few lines of copy and one new chip turn "using the chatbot" into "experiencing the case study." This is the move the market most rewards and it's nearly free.

Front-loading these means within one session the site is live with the right story, the agent answers with real numbers and a stack, and using it teaches the thesis — momentum visible immediately.

---

## The biggest, hardest thing (the keystone move)

**Show the "leads" half — make leadership and the enterprise shipment as experienceable as the agent (backlog #15, supported by #9 and #14).**

Every audit that scored the candidate landed the same asymmetry: *the builder half is demonstrated, the leader half is only asserted.* The agent proves Esteban can build; nothing on the site lets you *experience* that he multiplies a 16-person team, runs a P&L, directs the craft of work that ships at scale, or took an AI prototype to production for a real enterprise client. That gap is exactly what keeps a rigorous committee at "strong shortlist, references pending" instead of "undeniable hire."

It's the hardest because it runs straight into the confidentiality wall — the team/client work can't be shown the way the personal builds can. Solving it well means doing something genuinely creative: a reference-backed or NDA-gated walk-through, a depth treatment of the mining-sector shipment (his actual hands-on role, the outcome, the scale), a sanitised public artifact, and at least one external/third-party signal so it isn't all self-hosted. It's the move that converts "rare and credible combination" into "the combination, proven." Everything else sharpens the existing flex; this one closes the one structural doubt.

---

## Day 1 plan (ordered, executable — one focused session with Claude)

Quick wins front-loaded so the site is *live and better* within the first hour, then progressively heavier.

1. **Pre-flight (5 min).** Confirm `ANTHROPIC_API_KEY` is set in Netlify (memory flags this site previously shipped with the agent dark). Verify the deploy will carry the agent live, not dark.
2. **Verify the live model name (5 min).** Check the current Anthropic model list before touching the function — `claude-sonnet-4-5` is hard-coded; confirm it's still valid, note a fallback. (Per ways-of-working: read the live docs, models ship fast.)
3. **Ship the repositioning (15 min).** Deploy the local `index.html` + meta to production. This alone flips the live hero from "I lead design as a business" to "Most design leaders talk about AI. I build it." Confirm live with a fetch. *Biggest single win, done first.*
4. **KB evidence pass (30 min).** Add to `esteban.md`: the § Outcomes (CV numbers), § AI-adoption impact (with a bracket for Esteban to fill the real metric), § Stack, § Business and Beyond, § expanded Sector range, § leadership POV, § freshness line ("current as of June 2026"). Sanitise — sector + job type only, no client names.
5. **Close the agent proof loop (20 min).** Add a "How did you build this agent?" suggestion chip; ensure the KB has a crisp first-person architecture answer (serverless function, KB grounding, own guardrails). Re-tag the agent label/footer to name authorship ("Ask the agent I built — you're using my work right now").
6. **Function robustness — the two that matter (30 min).** Add a model fallback + a clear front-end "agent briefly offline, here's my CV/email" fallback so the centerpiece never reads as broken. (Prompt caching + streaming can follow in a later pass — see the `claude-api` skill.)
7. **Positioning decision — a taste fork for Esteban (15 min, needs his call).** Pick the ONE primary role to lead with (recommendation: Creative-AI / AI-Labs leadership + Head of Design as the lane; CDO as stretch). Add one line disambiguating the BCG context as a P&L-owning global practice. Trim the worst crutch-phrase repeats while in the file.
8. **Redeploy + smoke test (10 min).** Ship the KB + copy + function changes. Ask the live agent the six "exposure" questions from the backend audit ("most impressive thing with numbers?", "what stack?", "how did you get your team to adopt AI?") and confirm it now answers with evidence, not fog.
9. **Queue the keystone (close-out).** Capture the heavy lift — the "show the leads half" / enterprise-shipment depth / external-validation work — as the next session's brief. It's not a Day-1 task; it's the thing Day 1 sets up.

Steps 1–5 are the momentum block (live and materially better within ~90 minutes). Steps 6–8 harden it. Step 9 names the real next mountain.

---

*File written by the orchestrator after reading all four audits and the live site cold. Verified finding: the sharp repositioning is committed in the local repo but the live site (title, meta, hero) still serves the older "design as a business" framing — deploying it is the #1 action.*
