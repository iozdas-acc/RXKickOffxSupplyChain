# Work With Us — Design Spec

> Version: 1 | 2026-03-27
> Skills: anthropic-frontend-design, ui-ux-pro-max (layout), motion/guide.md
> Tokens: design-system/MASTER.md

---

## Aesthetic direction

Conversion page. Editorial restraint — not brochure-ware. Each audience block stands alone. Visitor must find their path in under 3 seconds.

- **Structure**: 3 audience sections with distinct visual identity. Schools = green. Partners = IX gradient/purple. Parents = teal.
- **Tone**: Direct, action-oriented. CTA on every section. No padding.

---

## Section inventory

1. Hero — audience picker, 3 paths
2. Schools section
3. Partners / corporate section
4. Parents section
5. Contact form

---

## Section 1 — Hero

- `min-height: 60dvh`, `--bg-page`, `--section-padding-y`, `--content-max-width`, dot-grid texture
- `--gradient-ix` left border accent: 4px, `position: absolute; left: 0; top: 0; bottom: 0`

**Typography:**
- Label: "Work With Us", `--color-ix-violet`, uppercase `--text-xs`
- H1: `--font-display`, `--weight-display`, `--text-d2`
  - "Let's build something together."
  - "together." in `--color-ix-violet`
- Subhead: "We work with schools, corporate partners, and families. Find your path below."

**Audience anchor links:**
- 3 pills: "Schools" · "Partners" · "Parents"
- `href="#schools"`, `href="#partners"`, `href="#parents"`
- `--radius-full`, border, `--text-sm` — green / purple / teal borders respectively
- `margin-top: --space-10`

---

## Section 2 — Schools

- `id="schools"`, `--bg-surface`, `--section-padding-y`, `--content-max-width`
- 60/40: copy left, illustration right (alien or school A-ICON-004/A-IMG-006)
- Left accent bar: 4px, `--color-kido-green`

**Label:** "For schools", `--color-kido-green`, uppercase `--text-xs`
**H2:** "Everything you need. Already prepared."
**Body:** Ready-to-use lesson plans, age-appropriate challenges, step-by-step guidance, full support. Tested in 115 classrooms across 12 markets.

**Feature checklist (3):**
- ✓ No prep time required
- ✓ Runs in a single school day
- ✓ Works for ages 8–16

Checkmark: Lucide `Check` 18px, `--color-kido-green`. Text: `--text-md`, `--text-primary`.

**CTA:** "Partner with us" → `#contact`, `--btn-primary-bg`

---

## Section 3 — Partners

- `id="partners"`, `--bg-card`, `--section-padding-y`, `--content-max-width`
- `--gradient-ix` top border 3px

**Label:** "For partners & corporates", `--color-ix-violet`, uppercase `--text-xs`
**H2:** "Put your brand at the heart of future innovation."
**Body:** Host a Kidovation or Future Labs event. Sponsor a programme. Bring innovation education to your clients and workforce. Backed by Accenture Song's 10-year track record.

**Partner logos row:** A-ICON-002 (AlderHey, Sky, British Triathlon) — 100px each, `opacity: 0.7`, `filter: grayscale(0.3)`, `margin-top: --space-8`

**CTA:** "Let's talk" → `#contact` — inline purple/gradient btn: `background: --gradient-ix; color: white; border-radius: --radius-full`

---

## Section 4 — Parents

- `id="parents"`, `--bg-surface`, `--section-padding-y`, `--content-max-width`
- 50/50: copy left, alien illustration right (A-ICON-004 small, playful pose)
- Left accent bar: 4px, `--color-kido-teal`

**Label:** "For parents", `--color-kido-teal`, uppercase `--text-xs`
**H2:** "Get your child into a Kidovation event."
**Body:** Kidovation events run in schools and community spaces across 12 markets. Find one near you or ask your school to host one.

**Feature checklist (3):**
- ✓ Ages 8–16
- ✓ No prior experience needed
- ✓ Full-day hackathon format

Checkmark: `--color-kido-teal`.

**CTA:** "Find an event" → `#contact`

---

## Section 5 — Contact form

- `id="contact"`, `--bg-page`, `--section-padding-y`, `--content-narrow-width` (800px), centered
- H2: "Get in touch."
- Subhead: "Tell us who you are and we'll send you the right information."

**Fields:**
- Name (text, required)
- Email (email, required)
- Organisation / school (text, optional)
- I am: radio — School / Corporate partner / Parent / Other
- Message (textarea, optional)
- Submit: "Send message" — `--btn-primary-bg`, `--btn-min-height`

**Input styles:**
- `--bg-card`, `--card-border`, `--radius-md`, padding `--space-4`
- Label: `--text-sm`, `--weight-accent`, `--text-primary`, `margin-bottom: --space-2`
- Focus: `--interactive-focus` 2px ring
- Error: `--color-fl-orange`, `--text-xs`, inline below field

**Motion:** Form section slides up, GSAP ScrollTrigger.

---

## Decisions cross-reference

| ID | Decision | Applied |
|----|---------|---------|
| D-LAY-003 | Distinct visual treatment per audience | Sections 2/3/4 |
