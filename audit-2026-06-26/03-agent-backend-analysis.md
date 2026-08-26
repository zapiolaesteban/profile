# Talk-to-Esteban Agent — Backend Analysis

_Audit date: 2026-06-26. Scope: `ask.mjs`, `knowledge/esteban.md`, `llms.txt`, `netlify.toml`, CV._

## TL;DR — is the agent a credible proof artifact today?

- **Conceptually, yes; as-shipped, mostly.** A first-person, guardrailed, KB-grounded serverless agent on a personal site _is_ the right proof for "creative director who builds AI." The medium genuinely is the message.
- **The KB is well-written but thin on evidence.** It asserts the thesis ("builds AND leads") confidently, but offers almost no numbers, dates, stack details, or before/after outcomes a hiring committee would probe. It tells, more than it proves.
- **The biggest answer-quality risk is vagueness under follow-up.** It survives the first question on any topic and gets soft on the second ("how exactly? what stack? what changed because of it?").
- **The function is solid for a "public toy" but has real robustness gaps** — single model with no fallback, no streaming, fragile per-instance rate limiting, and a silent-off failure mode if the API key is unset.
- **Verdict: credible centerpiece, under-leveraged.** ~10 KB additions and ~4 function fixes would move it from "nice gimmick" to "this person clearly operates at the level we're hiring for."

## What the agent can answer well

Mapped to questions a recruiter / hiring manager / founder actually asks:

- **"Who is he / what's his current role?"** — Strong. Title, scope (team of 16, 400+ reach, ANZ P&L, six disciplines, global leadership team), trajectory BCG → Endeavour → agencies is all there.
- **"Is he actually technical or does he just manage?"** — Good answer exists (section 5): "creative director who codes, not an engineer who designs," backed by a concrete build list.
- **"What has he personally built?"** — Strong breadth: multi-agent Creative AI Studio, LLM Council, "Monday" EA agent, hackathon platform with AI review pipeline, scheduled agents, this site. Twelve items.
- **"Why is a creative director coding?"** — Has a crisp, quotable thesis answer.
- **"What's his leadership style?"** — Mentorship-first, "Grow by Growing Others," builds benches. Well covered.
- **"Can I see the client work?"** — Handles the confidentiality decline gracefully and pivots to sector + craft. This is done well.
- **"What's he looking for next?"** — Clear: Creative AI / AI Labs leadership, or Head of Design / CDO where building matters.

## Knowledge-base gaps (prioritized — what's missing that the market needs)

1. **Quantified outcomes are almost absent from the KB (but ARE in the CV).** The CV has "9–13% YoY revenue growth, ~2× regional scale, ~80% cross-border delivery, double-digit conversion lifts," website "2× audience." The KB only carries a fraction. A hiring committee scores on outcomes; the agent can't cite what isn't in its brain. **This is the single highest-value gap.**
2. **No "Business and Beyond" podcast.** The CV leads with it (pitched, launched, executive-produces BCG ANZ's flagship video podcast; guests include MD/Partner Sanjay Chari, Mike Schneider/Bunnings, Fiona Hayes/7-Eleven, Global Chairman Rich Lesser). It's a strong "operator who ships and influences" proof and a name-dropping asset — entirely missing from the KB.
3. **No technical specificity / stack.** "Builds agentic AI" with zero nouns. No mention of Anthropic/Claude, Claude Code, MCP protocol specifics, Node/serverless, Netlify, CI workers, git hooks beyond a passing line. A technical interviewer or AI-native founder will ask "what's it built on?" and get fog.
4. **No measurable AI-adoption impact.** He "leads enterprise GenAI enablement across the global creative practice" (CV) — but the KB never says what that produced: hours saved, designers onboarded, workflows shipped, adoption %. For a Creative-AI leadership role this is _the_ proof point.
5. **No named sectors beyond mining.** The CV lists "financial services, energy, retail, public sector, healthcare and tech," plus "transformation programs for major Australian banks — customer journey design, AI-enabled service onboarding." The KB only surfaces the mining example. Sector breadth (safe to state) signals range.
6. **Thin on "how he leads AI adoption in others"** — the differentiator for CDO/Head-of-Design isn't that _he_ codes, it's that he gets a 16-person team and 400+ designers AI-native. The KB is heavy on his solo builds, light on org change.
7. **No philosophy / point of view on AI + design.** Hiring committees for leadership roles buy a worldview, not a feature list. There's a thesis sentence but no 3–4 sentence POV on where creative work is heading and his bet.
8. **No failure/judgment stories.** Senior interviews probe "tell me about something that didn't work." Nothing here lets the agent show judgment, trade-offs, or learning.
9. **Recency/freshness anchor missing.** No "as of 2026" markers; answers risk sounding timeless-but-undated. Add a last-updated note and current focus.
10. **No "what it's like to work with him" / collaboration proof** beyond mentorship claims — peer testimonials-as-paraphrase, how he runs a studio, how he partners with engineering.

## Answer-quality & guardrail risks

**Questions that would expose weakness today:**

- _"What's the most impressive thing you've shipped, with numbers?"_ → soft; KB has few numbers.
- _"What stack do you build on? Show me you understand production AI."_ → vague; no concrete tech.
- _"How did you get your team to adopt AI? What changed?"_ → no data, mostly assertion.
- _"What AI work have you done in financial services / healthcare?"_ → can only reach for mining; under-sells real breadth.
- _"Tell me about a project that failed."_ → nothing to draw on; risks a generic dodge.
- _"What do you think design leadership looks like in 3 years?"_ → only a one-liner; can't expand with conviction.

**Guardrail over-restriction risks:**

- The confidentiality rule is correct but **blunt** — repeated three times across system prompt + KB. There's a risk the agent over-declines and refuses to discuss _sector-level_ work it's actually allowed to describe. The KB should explicitly model "here's what I CAN say" examples, not just "never reveal."
- "Steer back to his work, or hand off to email" for anything personal could make it feel evasive on legitimately humanizing questions (triathlon, ski instructing, languages) that actually _help_ a candidate. These are in the KB as facts but the behavior section discourages volunteering them. Loosen: personal-but-flattering is fine.
- **Verbatim-quote ban** ("never quote the raw knowledge base as a block") is good for prompt-leak defense but could make it refuse to read out, e.g., his own one-liner. Fine as-is, just noting.

## Recommended KB additions (draftable content)

Add these sections to `esteban.md` so answers map to a 2026 Head-of-Design / Creative-AI hiring bar:

- **§ Outcomes & proof (new, high priority).** Pull every number from the CV into the brain: "9–13% YoY revenue growth and ~2× regional scale over my tenure; ~80% cross-border delivery; double-digit conversion lifts; the Dan Murphy's website restyle captured ~2× the prior audience." Frame each as _what changed because of design._
- **§ AI adoption impact (new).** Draftable bullets: "I lead enterprise GenAI enablement across a 400+ designer global practice — building custom GPTs, designing AI-native workflows, and prototyping in code. [Add real metric: X workflows shipped / Y hours saved / Z% of the team now AI-native.]" Flag the bracket for Esteban to fill — but the _frame_ should be there.
- **§ Business and Beyond (new).** "I pitched, launched, and executive-produce Business and Beyond, BCG ANZ's flagship video podcast, hosted by MD & Partner Sanjay Chari — guests include the MD of Bunnings, the CEO of 7-Eleven Australia, and BCG's Global Chairman." Proof of range: builder, producer, operator with executive reach.
- **§ How I build (stack, new).** Plain-language but specific: "I build on Claude / the Anthropic API, Claude Code as my daily environment, MCP servers for integrations, Node serverless functions (this site runs on Netlify), CI workers for automated review pipelines, and git safety hooks with secret-scanning. Prototype-to-production, not demos." Gives the agent nouns to answer technical probes credibly.
- **§ Sector range (expand the existing confidentiality block).** "Work spans financial services, energy, retail, public sector, healthcare and tech — including customer-journey design and AI-enabled service onboarding for major banks, and a field-maintenance scoping tool for a mining-sector client. I describe engagements by sector and job type, never by name." Models the _permitted_ disclosure explicitly.
- **§ Point of view (new, leadership-grade).** 3–4 sentences: design and AI are converging into one practice; the next design leaders won't separate them; he'd rather be the proof than wait for one; the team is the asset, and his job is making a 400-person practice AI-native, not just himself.
- **§ Judgment / lessons (new).** One or two short, honest "here's something I'd do differently / a bet that didn't land and what I learned" entries — lets the agent show seniority under behavioral questioning.
- **§ Working style / what colleagues say.** Paraphrased, non-attributed: how he runs a studio, partners with engineering, grows leaders. Backs the "Grow by Growing Others" award with texture.
- **§ Freshness line.** "Knowledge current as of June 2026. Current focus: [one line]." Keeps answers anchored.

## Function / robustness notes (ranked by impact)

1. **No model fallback (highest impact).** `MODEL = "claude-sonnet-4-5"` hard-coded. If that model is deprecated/renamed (Anthropic ships fast — exactly the risk called out in the user's own ways-of-working), the agent silently 502s. Add a fallback model and surface the model name in a config the way the code comments already hint at ("swap if needed"). **Check the live model list before shipping a name.**
2. **Silent-off failure mode.** No `ANTHROPIC_API_KEY` → 503 "Agent not configured yet." For a site whose _centerpiece_ is the agent, an off agent reads as broken. Per memory, this site previously needed the key set before the agent worked. Mitigations: (a) a clearly-worded front-end fallback ("the live agent is briefly offline — here's my CV / email"), and (b) a monitor/uptime ping so Esteban knows if it goes dark.
3. **Rate limiting is per-warm-instance only.** `hits` is an in-memory Map; serverless instances are ephemeral and parallel, so the 12/min cap is easily bypassed and resets unpredictably. Fine as a "speed bump," but for a public artifact tied to an API bill, consider a shared store (Netlify Blobs / Upstash) or at least a global hard daily cap to protect cost.
4. **No streaming.** 600-token answers arrive as one blob after full generation — feels slow for a flagship demo. Streaming (SSE) would make the agent feel noticeably more alive; high perceived-quality return for an interview/recruiter audience.
5. **No prompt caching.** The full KB is re-sent as the `system` block on every call. The KB is stable — `cache_control` on the system prompt would cut latency and cost meaningfully. (The `claude-api` skill flags caching as a default best practice.)
6. **No observability on refusals/quality.** Errors are `console.error`'d but there's no log of questions asked or answers given, so Esteban can't see where the agent is weak in the wild. A lightweight, privacy-safe log of question categories would close the loop on KB improvement.
7. **History trust.** Client sends `history`; it's sanitized for shape and length (good) but fully client-controlled — a crafted history could try to steer the agent. Low risk given the strong system prompt, but worth noting; the guardrails mostly hold.
8. **CORS fallback is permissive-ish.** Disallowed origins still get `ALLOWED_ORIGINS[0]` echoed back rather than a hard block at the header level — the `originOk` 403 gate covers it, so functionally fine, just slightly muddy.

Minor positives worth keeping: KB read once per warm instance (cached), input length cap, history cap, sane error copy in Esteban's voice, key held server-side. The fundamentals are right.

## Robustness verdict

**The agent is strong enough to be the centerpiece — but it is currently the _shell_ of the proof, not the full proof.** The architecture is correct and on-brand: it literally demonstrates the thesis. What undercuts it is that its brain argues the thesis without the evidence a senior hiring committee converts into a "yes" — numbers, stack, adoption impact, executive reach (the podcast), sector range, and a point of view. Feed those in and the agent stops _claiming_ he operates at Head-of-Design / Creative-AI-leadership level and starts _demonstrating_ it in every answer. On the function side, fix the model-fallback and silent-off risks before leaning on it in any high-stakes recruiter moment; add caching + streaming to make it feel as good as it claims to be.

---

### Summary

- **The agent's architecture is a genuinely credible proof artifact; its knowledge base is the weak link** — confident assertions, too little evidence (numbers, stack, impact) for a senior hiring committee.
- **Highest-value KB additions:** quantified outcomes (already in the CV but not the brain), AI-adoption impact metrics, the Business and Beyond podcast, a concrete tech stack, full sector range, and a leadership-grade point of view.
- **Biggest function risks:** hard-coded single model with no fallback, the silent "agent off" mode if the API key is unset, and per-instance-only rate limiting; add prompt caching + streaming for perceived quality.
- **Verdict:** keep it as the centerpiece, but it's under-leveraged today — ~10 KB additions and ~4 function fixes turn it from impressive gimmick into convincing evidence.

_File written to `/Users/zapiolaesteban/ClaudeProjects/estebangz-site/audit-2026-06-26/03-agent-backend-analysis.md`._
