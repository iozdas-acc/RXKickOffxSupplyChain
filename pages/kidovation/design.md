# Kidovation — Design Spec

> Version: 1 | 2026-03-27
> Skills: anthropic-frontend-design, bencium-innovative-ux-designer, ui-ux-pro-max (layout), motion/guide.md
> Tokens: design-system/MASTER.md

---

## Aesthetic direction

Kidovation's own page amplifies the alien-green brand at full volume. Bold, asymmetric, editorial — but unmistakably playful. If the home page introduces the brand, this page IS the brand.

- **Color**: `--color-kido-green` dominant. Teal secondary. Dark navy base.
- **Alien**: used generously — hero, section markers, decorative. It's the thread.
- **Photography**: Real event photos raw — no filters.
- **Anti-pattern**: NOT a generic kids activity flyer. No clip art. No pastel bubbles.

---

## Emotional arc

| Stage | Feeling |
|-------|---------|
| Hero | "What is this? I want to know more" |
| What kids do | "My kid would love this" |
| Programs | "There are options for us" |
| Events gallery | "This is real" |
| Impact numbers | "10 years of proof" |
| Materials | "I could actually run this" |

---

## Section inventory

1. Hero — Kidovation headline, alien, event photo
2. What kids actually do — 6 activity cards
3. Programmes — 5 programme types
4. Events gallery — asymmetric photo grid
5. Impact numbers — stats band
6. Ready-to-use materials — teacher-facing

---

## Section 1 — Hero

- Full viewport `100dvh`, event photo full-bleed background (A-IMG-003)
- Overlay: `linear-gradient(to bottom right, rgba(8,12,24,0.9), rgba(8,12,24,0.5))`
- Alien SVG (A-ICON-004 green standing): right side, 400px desktop, partial overflow top
- Content: left-aligned, bottom 25% of viewport, `--section-padding-x`

**Typography:**
- Label: "Kidovation" — `--text-xs`, `--tracking-label`, uppercase, `--color-kido-green`
- H1: `--font-display`, `--weight-display`, `--text-d1`, `--tracking-display`
  - "Hands-on innovation for curious kids."
- Subhead: `--font-body`, `--text-lg`, `--text-secondary`, max-width 540px

**CTAs:** Primary "Register your child" + Secondary "Run it at your school" → /work-with-us

**Motion:** GSAP on mount — label, h1, subhead, CTAs stagger up. Alien: CSS float, 4s cycle.

**Responsive:** Alien hidden <768px (performance). Copy fills full width.

---

## Section 2 — What kids actually do

- `--bg-surface`, `--section-padding-y`, `--content-max-width`
- H2 + age badge ("Ages 8–16" pill, `--color-kido-green` bg at 15%, green text)
- 3-col desktop / 2-col tablet / 1-col mobile card grid

**6 activities:**
1. Hackathon challenges
2. Design thinking
3. AI & technology
4. Lego & physical making
5. Entrepreneurship
6. Teamwork & leadership

**Card:** `--card-bg`, `--card-border`, `--card-radius`, `--card-padding`; 48px icon top; title `--text-xl` display; body `--text-md` secondary. Hover: `--card-hover-border`, `--card-hover-shadow`.

**Motion:** GSAP ScrollTrigger stagger — opacity/y 24→0, 60ms per card.

---

## Section 3 — Programmes

- `--bg-page`, `--section-padding-y`, `--content-max-width`
- 5 programmes: 3-col first row + 2-col second (desktop) / 2-col tablet / horizontal scroll mobile

**Each card:** Large numeral (`--text-d3`, `--color-kido-green` at 30% opacity) + left accent bar (3px, `--color-kido-green`) + title `--text-xl` + body `--text-sm` secondary.

1. Innovation Labs
2. Kidovation Week Challenge
3. Entrepreneurship Bootcamps
4. STEM Workshops
5. School Partnerships

---

## Section 4 — Events gallery

Same asymmetric photo grid pattern as home Events section:
- H2: "A glimpse into our events"
- Grid: `1fr 2fr 1fr`, rows `280px 380px` (desktop)
- Photos: A-IMG-003, curated selection
- Hover: `scale(1.03)`, `--duration-base`, `--ease-smooth`

---

## Section 5 — Impact numbers

Same stats band as home:
- `--bg-surface`, 4-col desktop / 2×2 mobile
- 10 years · 12 markets · 3,111+ kids · 115 classrooms
- GSAP count-up on scroll

---

## Section 6 — Ready-to-use materials

- `--bg-card` panel, `--radius-xl`, `--shadow-lg`, constrained to `--content-max-width`
- Two-column: copy left, illustration right (A-IMG-006 or space illustration)
- Label: "For teachers and schools"
- H2: "Everything you need. Nothing extra."
- Body: Step-by-step lesson plans, age-appropriate challenges, minimal prep. Tested in 115 classrooms across 12 markets.
- CTA: "Get the materials" → /work-with-us

---

## Decisions cross-reference

| ID | Decision | Applied |
|----|---------|---------|
| D-DS-002 | Alien as hero element | Section 1 |
| D-LAY-005 | Asymmetric photo grid | Section 4 |
