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

## Output

After all skills above have been read/invoked, write `pages/<slug>/design.md`.
Every decision in design.md must be traceable to a skill output or a logged D-NNN decision.
No section may be designed from general knowledge alone.

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
