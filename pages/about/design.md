# About Us — Design Spec

> Version: 1 | 2026-03-27
> Skills: anthropic-frontend-design, bencium-innovative-ux-designer, ui-ux-pro-max (layout), motion/guide.md
> Tokens: design-system/MASTER.md

---

## Aesthetic direction

Editorial, warm, credible. Not a standard "meet the team" grid — a story of generational progression. 10 years earns real visual weight.

- **Visual move**: Gen 1 (Fiona) gets a full-width spotlight. Gen 2 + 3 are card grids — smaller, equal between them but clearly subordinate to the founder.
- **Photos**: Real headshots only (A-IMG-002). Dark bg, consistent treatment.
- **Timeline**: 2015→2025 horizontal milestone track with SVG line animation.
- **Accent**: `--gradient-ix` (purple→orange) used sparingly — founder card top border, hero left-bar.

---

## Section inventory

1. Hero — "Ten years of real innovation."
2. Story, Philosophy, Values — narrative + 3 pillars
3. Timeline — 2015–2025 milestones
4. Team — generational hierarchy (NOT flat grid)
5. Brand evolution — logo progression

---

## Section 1 — Hero

- `min-height: calc(100dvh - var(--nav-height))`, `--bg-page`, dot-grid texture
- `--gradient-ix` left border accent: 4px, full height, `position: absolute; left: 0`
- Content: `--content-max-width`, `--section-padding-x`, vertically centered

**Typography:**
- Label: "Est. 2015" — `--text-xs`, `--tracking-label`, uppercase, `--text-secondary`
- H1: `--font-display`, `--weight-display`, `--text-d1`, `--tracking-display`
  - "Ten years of" — `--text-primary`
  - "real innovation." — `--color-ix-violet`
- Subhead: `--font-body`, `--text-lg`, `--text-secondary`, max-width 600px

**Motion:** GSAP on mount — label, H1 words, subhead stagger up.

---

## Section 2 — Story, Philosophy, Values

- `--section-padding-y`, `--content-max-width`
- 60/40 split: narrative text left, 3 values right (desktop) / stacked mobile

**Story text:** `--font-body`, `--text-lg`, `--leading-body`, max-width 680px
"Founded in 2015 by Fiona Russell inside Accenture Song, Innovation X started with a single belief: that young people are the world's most underutilised innovators. Over 10 years, 12 markets, and 3,111 young people later — we know that belief was right."

**3 Values:**
| # | Title | Body |
|---|-------|------|
| 01 | Learning by doing | Every session is hands-on. No worksheets. No slideshows. |
| 02 | Believe in every kid | Age, background, school doesn't determine potential. We just provide the spark. |
| 03 | Build what lasts | Programmes designed to outlive any single event, any single year. |

Each: large numeral (`--text-d2`, `--color-kido-green` at 20% opacity) + title (`--text-d3`, `--weight-display`) + body (`--text-md`, `--text-secondary`).

**Motion:** Text fade-up; values stagger in 100ms each.

---

## Section 3 — Timeline

- `--bg-surface`, `--section-padding-y`, full-width
- Horizontal scrollable track: line `--color-navy-border` 1px, nodes `--color-kido-green` 12px circles
- Labels: year `--weight-display` `--text-sm`, event `--text-xs` `--text-secondary`, max-width 120px

**Key milestones:** 2015 Founded · 2016 First hackathon · 2018 500 kids · 2019 Dubai Expo · 2020 Virtual pivot · 2023 Future Labs launches · 2024 3,000+ kids · 2025 10-year anniversary

**Motion:** Nodes reveal L→R, stagger 80ms. SVG line draws in via `stroke-dashoffset`.

---

## Section 4 — Team (generational hierarchy — P-SPACE-002)

**Gen 1 — Founder (Fiona Russell):**
- Full-width spotlight: `--bg-card`, `--radius-xl`, `--gradient-ix` top border 3px
- Photo: 280px, float left (desktop) / full width (mobile)
- Label: "Generation 1 — Founder", `--color-ix-violet`, uppercase `--text-xs`
- Name: `--font-display`, `--weight-display`, `--text-d3`
- Bio + Expertise tag + personal belief quote

**Gen 2 — Leads (Anastasia, Christine, Hannah):**
- 3-col card grid below Gen 1
- `--card-bg`, `--card-border`, `--card-radius`
- Photo: 200px card top, `object-fit: cover`
- Label: "Generation 2", `--text-secondary`, uppercase `--text-xs`
- Name: `--text-xl`, display weight; Bio: `--text-sm` secondary; Expertise: pill tag

**Gen 3 — Current (Izzie, Jack, Azeez):**
- Same 3-col grid, identical card structure to Gen 2
- Label: "Generation 3 — Now", `--color-kido-green`, uppercase `--text-xs`

**Section separators:** Horizontal rule `--color-navy-border` with center label "Leadership" / "Current Team".

**Bios:**
- Fiona: Programme design. "Young people don't need to be taught creativity. They need permission to use it."
- Anastasia: Operations & partnerships. "Every great programme is built on a thousand small decisions by people who care."
- Christine: Curriculum & facilitation. "The best sessions are the ones where you forget you're in school."
- Hannah: Marketing & community. "Stories are how change spreads."
- Izzie: Design & digital. "If the experience isn't beautiful, the message gets lost."
- Jack: Technology & delivery. "Hackathons prove that constraints produce creativity."
- Azeez: Partnerships & growth. "The best innovation comes from the most unexpected places."

**Motion:** Gen 1 fade-up; Gen 2 stagger L→R 100ms; Gen 3 stagger L→R 80ms.

---

## Section 5 — Brand evolution

- `--bg-surface`, `--section-padding-y`, `--content-max-width`
- H2: "A brand that grew with us."
- Narrative: from hand-drawn alien to full design system
- 4 logo variants displayed horizontally: legacy → current (A-LOGO-005 → A-LOGO-003)
- Label per logo: "2016" / "2019" / "2023" / "2025"
- Motion: logos fade in L→R on scroll

---

## Decisions cross-reference

| ID | Decision | Applied |
|----|---------|---------|
| P-SPACE-002 | Generational hierarchy, not flat grid | Section 4 |
| D-DS-001 | Illustrated logos as primary marks | Section 5 |
