# Future Labs — Design Spec

> Version: 1 | 2026-03-27
> Skills: anthropic-frontend-design, bencium-innovative-ux-designer, ui-ux-pro-max (layout), motion/guide.md
> Tokens: design-system/MASTER.md

---

## Aesthetic direction

Future Labs must feel like a step up from Kidovation. Cooler, more technical, sci-fi edge. Teenage hacker meets R&D lab. Orange palette cuts through dark navy. No alien, no cartoon — precision over playfulness.

- **Color**: `--color-fl-orange` primary, `--color-fl-amber` secondary
- **Texture**: Circuit/grid (SVG `<pattern>`, 40px grid, `--color-navy-border` at 20%)
- **Orange radial glow**: `radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,107,53,0.08), transparent)`
- **Typography**: Same Syne but more negative space — feels more premium

---

## Section inventory

1. Hero — Future Labs identity, rocket-flask, sci-fi
2. Mission & Vision — what it exists to do
3. What participants do — 4 advanced activities
4. More coming — honest flag, early interest CTA

---

## Section 1 — Hero

- Full viewport `100dvh`, `--bg-page` + circuit grid texture + orange radial glow (right side)
- Rocket/space illustration (A-ICON-011): right side, 360px desktop, orange CSS filter overlay

**Typography:**
- Label: "Future Labs" — `--text-xs`, `--tracking-label`, uppercase, `--color-fl-orange`
- H1: `--font-display`, `--weight-display`, `--text-d1`, `--tracking-display`
  - "Advanced innovation" — `--text-primary`
  - "for what's next." — `--color-fl-orange`
- Subhead: `--font-body`, `--text-lg`, `--text-secondary`, max-width 520px
  - "Future Labs is where Kidovation graduates and 16+ innovators go deeper — into AI, product design, R&D, and the future of work."

**CTAs:** Primary "Apply to Future Labs" + Secondary "For schools & colleges" → /work-with-us
- Primary btn: override locally — `background: --color-fl-orange; color: --text-inverted`

**Motion:** GSAP on mount — same stagger pattern as kidovation hero.

**Responsive:** Illustration hidden <768px.

---

## Section 2 — Mission & Vision

- `--bg-surface`, `--section-padding-y`, `--content-max-width`
- 50/50 split desktop / stacked mobile. Vertical divider `--color-navy-border` between.

**Mission block:**
- Label: "Mission", `--color-fl-orange`, uppercase `--text-xs`
- Pull statement: `--font-display`, `--weight-display`, `--text-d3`, `--text-primary`
- "Equip young people for the future of work — not with theory, but with real skills, real tools, real problems."

**Vision block:**
- Label: "Vision", `--color-fl-amber`, uppercase `--text-xs`
- "A generation that doesn't just use technology — that creates it."

**Motion:** Both blocks fade-up, stagger 0.2s.

---

## Section 3 — What participants do

- `--bg-page`, `--section-padding-y`, `--content-max-width`
- H2: "What you'll actually do"
- 2×2 card grid desktop / 1-col mobile

**4 activities:**
| Title | Body |
|-------|------|
| AI & machine learning | Build and test real AI models — no black box |
| R&D challenges | Take a research question and prototype a solution |
| Product design sprint | Problem → wireframe → pitch in 24 hours |
| Human-centred innovation | Design for real communities, not hypothetical users |

**Card:** `--card-bg`, `--card-border`, `--card-radius`, `--card-padding`
- Top-left accent: 40px × 3px, `--color-fl-orange`
- Icon: 48px, Lucide (orange stroke)
- Title: `--font-display`, `--weight-title`, `--text-xl`
- Body: `--font-body`, `--text-md`, `--text-secondary`
- Hover: `box-shadow: 0 0 24px rgba(255,107,53,0.2)`, `border-color: --color-fl-orange`

**Motion:** Cards stagger in opacity/y, 80ms each.

---

## Section 4 — More coming

- `--bg-surface`, `--section-padding-y`, `--content-narrow-width`, center-aligned
- Label: "In development"
- H2: "More from Future Labs coming soon."
- Body: "We're building out the Future Labs programme for 2025–2026. If you're a school, college, or corporate partner interested in getting involved early — we'd love to hear from you."
- CTA: "Get in touch early" → /work-with-us — orange primary btn

**Motion:** Fade-up, ScrollTrigger.

---

## Decisions cross-reference

| ID | Decision | Applied |
|----|---------|---------|
| P-COLOR-002 | Orange for Future Labs, less vibrant | All |
| D-DS-001 | Illustrated logos | Hero wordmark |
