# Orchestrate — Design Phase

> This file is read by the `/design` command before any design work begins.
> It contains the complete skill registry and mandatory invocation sequence.
> Claude MUST follow every step. No step may be skipped. No output may be produced from general knowledge when a skill exists for it.

---

## LAW

**Every skill listed as mandatory MUST be executed before design.md is written.**
- `guide.md` skills → use the Read tool on the exact file path listed
- `SKILL.md` skills → use the Invoke Skill tool with the exact skill name listed
- After reading/invoking each skill, apply its output to the design decisions
- Never summarise a skill and move on — extract and use its specific rules

---

## Step 1 — Content pipeline (always runs, unless copy is client-provided)

Check `pages/<slug>/brief.md` for "copy provided" or a copy asset reference in `pages/<slug>/assets.md`.

**If copy NOT provided — run all three in order:**

### 1a — Content strategy
**Mechanism:** Read file
**File:** `skills/content-strategy/guide.md`
**Apply:** Determine content pillars, buyer stage, what this page must make the visitor believe, content priority order (above fold vs secondary)

### 1b — Content structure
**Mechanism:** Read file
**File:** `skills/content/guide.md`
**Apply:** Define heading hierarchy (H1→H2→H3 with intent), SEO title/meta/OG/JSON-LD, landmark roles, image alt strategy, HTML element choices per section

### 1c — Copy
**Mechanism:** Read file
**File:** `skills/copywriting/guide.md`
**Apply:** Write H1, hero subhead, section headlines, body copy, CTAs, microcopy — informed by the guide's frameworks
**Output:** Write all copy to `pages/<slug>/brief.md ## Copy` — this is the canonical source

**If copy IS provided:** Skip 1a–1c. Note in design.md: "Copy: client-provided — see [asset ID]"

---

## Step 2 — Aesthetic direction (always runs)

This project is bold, energetic, real — not corporate, not fluffy (see `.impeccable.md`).
Run both skills. They give different perspectives — use both.

### 2a — Anthropic frontend design
**Mechanism:** Read file
**File:** `skills/frontend-design/anthropic-frontend-design/SKILL.md`
**Apply:** Reject generic AI aesthetics. Force distinctive typography, color, motion choices. This skill actively pushes back on safe defaults.

### 2b — Innovative UX designer
**Mechanism:** Read file
**File:** `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/SKILL.md`
**Apply:** Design thinking, color systems, typography excellence, interaction patterns, motion specs. Use for creative/brand-forward direction.
**Also read (from same skill):**
- `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/MOTION-SPEC.md`
- `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/RESPONSIVE-DESIGN.md`
- `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/ACCESSIBILITY.md`

---

## Step 3 — Layout decisions (always runs)

### 3a — UI/UX rules
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `ui-ux-pro-max`
**Brief it on:** page layout challenges, specific sections that need layout decisions
**Apply:** Layout patterns, spacing rules, accessibility rules, responsive strategy

### 3b — Design system reference
**Mechanism:** Read file
**File:** `skills/design-system/guide.md`
**Apply:** Token architecture confirmation — ensure design.md references correct token names, never raw values

---

## Step 4 — Motion intent (runs if any animation is planned)

Signal: any mention of "scroll", "animate", "transition", "reveal", "motion", "entrance" in brief.md or section intent

### 4a — Motion guide
**Mechanism:** Read file
**File:** `skills/motion/guide.md`
**Apply:** Tool selection (CSS vs GSAP vs Framer), easing choices, timing rules, reduced-motion requirements

---

## Step 5 — Accessibility check (always runs, after layout is decided)

### 5a — Web design guidelines
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `web-design-guidelines`
**Apply:** Flag any layout decisions that violate accessibility, UX, or performance guidelines before they get built

### 5b — Use of color
**Mechanism:** Read file
**File:** `skills/audits/use-of-color/SKILL.md`
**Apply:** Verify no information is conveyed by color alone in the design decisions

---

## Step 6 — Multi-direction evaluation (always runs, before writing design.md)

**First: Read `memory/quality-benchmark.md`.** It defines the motion, visual richness, interactivity, and layout patterns that distinguish great from generic. Use it to calibrate what a high-scoring direction looks like before generating options.

After reading the benchmark, generate **3 competing design directions** and evaluate them before committing to one. This is a reasoning exercise — produce no output files until the winner is selected.

### 6a — Generate 3 directions

Each direction must be a distinct, named approach — not minor variations of the same idea. Differentiate on: layout philosophy, typography personality, color strategy, motion intensity, and emotional register.

Format each direction as:

```
Direction [A/B/C]: [Name]
Concept: [One sentence on the core idea — what makes this distinct]
Layout: [primary layout pattern]
Typography: [typeface personality + scale approach]
Color: [strategy — which tokens dominate, what mood]
Motion: [none / subtle / expressive — one-liner on what moves]
Unique bet: [the one thing this direction does that no generic site would]
```

### 6b — Score each direction

Score every direction on five criteria. Each criterion: 1–10.

| Criterion | What it measures |
|-----------|-----------------|
| **Brand fit** | How well it reflects `.impeccable.md` personality and `.agents/product-marketing-context.md` audience |
| **Conversion clarity** | How directly it supports the primary CTA and buyer stage from content strategy |
| **Distinctiveness** | How far it departs from generic AI/agency aesthetics — a 10 would be immediately recognisable |
| **UX integrity** | Accessibility, readability, touch targets, responsive logic — penalise anything that sacrifices usability for style |
| **Technical feasibility** | Realistic to build within the confirmed tech stack — penalise approaches that require unconfirmed new dependencies |
| **Benchmark alignment** | How closely the direction's interaction patterns, motion intent, and visual richness align with `memory/quality-benchmark.md` — specifically: does it plan for glass-morphism, clamp() typography, GSAP entrance sequences, hover micro-interactions, and at least one signature interactive element? |

Produce a score table:

```
Direction  Brand  Conv.  Distinct.  UX  Feasib.  Benchmark  TOTAL
A          /10    /10    /10       /10   /10      /10        /60
B          /10    /10    /10       /10   /10      /10        /60
C          /10    /10    /10       /10   /10      /10        /60
```

### 6c — Select winner and log decision

Select the direction with the highest total score. If two directions tie, pick the one with higher Brand fit + Benchmark alignment combined — the benchmark captures what separates great from generic.

Log the evaluation as a design decision:
- ID: next available `D-VIS-NNN` in `memory/decisions/TAXONOMY.md`
- Include: all three directions, scores, winner, and one-line rationale for why the winner beats the runner-up

Print to the conversation:
```
Design evaluation — [slug]
Winner: Direction [X] — [Name]  (score: XX/60)
Runner-up: Direction [Y] — [Name]  (score: XX/60)
Key win: [one sentence on the decisive differentiator]
Proceeding with [X].
```

No human approval needed. Continue immediately to the Output step.

---

## Output

After all skills above have been read/invoked and the evaluation winner is selected, write `pages/<slug>/design.md`.
Every decision in design.md must be traceable to a skill output, the evaluation winner (D-VIS-NNN), or a logged D-NNN decision.
No section may be designed from general knowledge alone.

Include a `## Design Evaluation` section at the top of design.md summarising the three directions and the winner — so future sessions have context for why this direction was chosen.

---

## Skill registry — complete

| Skill | Path / Name | Type | Phase |
|-------|-------------|------|-------|
| Content strategy | `skills/content-strategy/guide.md` | Read file | 1a |
| Content structure | `skills/content/guide.md` | Read file | 1b |
| Copywriting | `skills/copywriting/guide.md` | Read file | 1c |
| Anthropic frontend design | `skills/frontend-design/anthropic-frontend-design/SKILL.md` | Read file | 2a |
| Bencium innovative UX | `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/SKILL.md` | Read file | 2b |
| Bencium motion spec | `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/MOTION-SPEC.md` | Read file | 2b |
| Bencium responsive | `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/RESPONSIVE-DESIGN.md` | Read file | 2b |
| Bencium accessibility | `skills/frontend-design/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/ACCESSIBILITY.md` | Read file | 2b |
| UI/UX Pro Max | `ui-ux-pro-max` | Invoke Skill | 3a |
| Design system | `skills/design-system/guide.md` | Read file | 3b |
| Motion guide | `skills/motion/guide.md` | Read file | 4a (if motion) |
| Web design guidelines | `web-design-guidelines` | Invoke Skill | 5a |
| Use of color | `skills/audits/use-of-color/SKILL.md` | Read file | 5b |
| Multi-direction evaluation | Internal reasoning (no skill file) | Self-contained | 6 |
