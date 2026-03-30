# Home — Design Spec (v2)

> Version: 2 — Next.js rebuild
> Last updated: 2026-03-27 (skills pass — all orchestrator skills invoked)
> Copy source: `pages/home/brief.md ## Copy`
> Tokens: all from `design-system/MASTER.md` — referenced by name only
> Skills applied: orchestrate-design.md — anthropic-frontend-design, bencium-innovative-ux-designer (+ MOTION-SPEC, RESPONSIVE-DESIGN, ACCESSIBILITY), ui-ux-pro-max (layout), design-system/guide.md, motion/guide.md, use-of-color/SKILL.md

---

## Aesthetic direction

**Committed direction (from anthropic-frontend-design + bencium-innovative-ux-designer):**

Editorial/magazine meets retro-futuristic hackathon energy.

- **Tone**: Bold, asymmetric, typographically dominant — not a SaaS landing page, not a charity site. Think: editorial poster with energy.
- **What makes this unforgettable**: The green alien floating in 3D on the right half of the hero. No other kids education site does this. The alien is the brand. The alien is the hook.
- **Typography move**: Syne ExtraBold crashing into the full width — huge, tight, tracked negative. The word "next" in `--color-kido-green` is the only color break in the headline.
- **Color move**: Deep navy base with a single sharp green accent. The orange (Future Labs) only appears in Section 4. Purple gradient only appears in the IX ecosystem diagram.
- **Anti-patterns avoided**: No pastel gradients, no glassmorphism panels, no rounded-card grid, no Inter as display font, no AI-generated icons, no emoji icons, no generic SaaS blue.
- **Atmosphere**: Dot-grid texture in hero creates depth. Event photos shown raw — no filters, no stylistic treatment. The site earns credibility through photography, not production effects.

---

## Emotional arc

| Stage | What they feel |
|-------|---------------|
| Hero | Immediate energy — "this is different" |
| Stats bar | Weight of proof — "this is real" |
| What is IX | Orientation — "I understand what this is now" |
| Ecosystem | Recognition — "I know which one is for me" |
| Mission | Belief — "I want to be part of this" |
| Events | Evidence — "I can see it happening" |

---

## Accessibility spec

Applies to all sections. Non-negotiable.

### Semantic landmarks
```
<header> — nav
<main> — all page sections
  <section aria-labelledby="hero-heading"> — Hero
  <section aria-labelledby="stats-heading"> — Stats bar (sr-only heading)
  <section aria-labelledby="ix-heading"> — What is IX
  <section aria-labelledby="ecosystem-heading"> — Ecosystem
  <section aria-labelledby="mission-heading"> — Mission
  <section aria-labelledby="events-heading"> — Events
<footer>
```

### Skip link
- First element in DOM: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>`
- Styled on focus: visible, `--color-kido-teal` outline, positioned top-left

### Heading hierarchy — never skip levels
```
h1 — Hero: "Inspiring the next generation."
  h2 — Stats bar: sr-only "Our impact" (visual heading omitted, for context only)
  h2 — What is IX: "One ecosystem. Two programmes."
    h3 — Ecosystem Kidovation: "Built for curious kids."
    h3 — Ecosystem Future Labs: "For the next step."
  h2 — Mission pull quote: "Empower young people…"
  h2 — Events: "Real events. Real kids. Real impact."
```

### Focus states
- All interactive elements: visible focus ring — 2px, `--interactive-focus` (`--color-kido-teal`)
- Buttons: `focus-visible:ring-2 focus-visible:ring-[--color-kido-teal] focus-visible:outline-none`
- No `outline: none` without a replacement

### Touch targets
- All buttons/CTAs: min height `--btn-min-height` (48px), min width 120px
- Event photo cells: not interactive — no touch target requirement
- Scroll indicator chevron: 48×48px touch target

### Alt text strategy
- Hero alien: `alt="Kidovation's alien character, floating in 3D"` (or fallback image alt if WebGL fails)
- Ecosystem illustrations: `alt="Green alien character — Kidovation mascot"`, `alt="Rocket illustration — Future Labs"`
- Event photos: descriptive — e.g. `alt="Students collaborating at a Kidovation hackathon, 2025"` — never empty on real photos
- Ecosystem SVG diagram: `role="img"` with `aria-label="Innovation X ecosystem: Kidovation and Future Labs"`

### prefers-reduced-motion
All GSAP animations check this before running. Pattern:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) { /* run animation */ }
```
Reduced: show final state instantly (no transition).

---

## Use of color — compliance notes

Applies WCAG 1.4.1: color must not be the ONLY means of conveying information.

| Section | Color used for | Additional indicator |
|---------|---------------|---------------------|
| Hero H1 | "next" in green — emphasis | Also: word position (center of statement), not a link |
| Hero CTAs | Green fill = primary | Also: label text "Explore Kidovation" distinguishes from ghost secondary |
| Ecosystem — Kidovation panel | Green accent | Also: Kidovation wordmark (A-LOGO-003) + "Built for curious kids." heading |
| Ecosystem — Future Labs panel | Orange accent | Also: Future Labs wordmark + "For the next step." heading |
| Ecosystem hover | Glow effect color change | Also: alien/rocket shifts upward (transform — not color alone) |
| Stats bar | No color distinction between stats | Stats distinguished by label text, not color |
| Mission quote mark | Green quotation mark | Decorative — does not convey information |
| Nav active state | Color highlight on active link | Also: font-weight increase (600 → 700) |

---

## Section inventory

1. **Hero** — full viewport, split layout, 3D alien
2. **Stats bar** — 4 proof numbers, typographic
3. **What is IX** — offset text/visual, ecosystem diagram
4. **Ecosystem** — two architectural panels
5. **Mission** — pull quote, full-bleed dark, real photo
6. **Events glimpse** — asymmetric photo grid

---

## Section 1 — Hero

### Layout
- Full viewport height (`100dvh`), no scroll on load
- Two-column split: **55% left / 45% right** on desktop (≥1024px) — D-LAY-001
- Background: `--bg-page` — deep navy, no image
- Subtle dot-grid texture: CSS `radial-gradient`, `--color-navy-border` at 15% opacity, 32px pitch — depth without decoration
- Left column: copy, vertically centered via CSS grid `align-items: center`
- Right column: R3F Canvas, full height, alien floating
- Nav offset: `padding-top: var(--nav-height)` — fixed nav clears content
- Content padded: `--section-padding-x` left/right within columns

### Typography — left column
- **H1** `id="hero-heading"`: `--font-display`, `--weight-display` (800), `--text-d1`, `--tracking-display` (-0.03em), `--leading-display` (1.05)
  - "Inspiring the" — `--text-primary`
  - "next" — `--color-kido-green` (inline `<mark>` with reset background, color set to `--color-kido-green`)
  - "generation." — `--text-primary`
- **Subhead**: `--font-body`, `--text-lg`, `--text-secondary`, `--leading-body` (1.6), max-width 480px, margin-top `--space-6`

### CTAs
- Row, `gap: --space-4`, `margin-top: --space-10`
- **Primary**: `--btn-primary-bg`, `--btn-primary-text`, `--btn-primary-radius`, `--btn-primary-padding`, `--btn-min-height` — "Explore Kidovation"
  - Hover: `--btn-primary-hover`, `transition: background-color var(--duration-fast) var(--ease-out)`
  - Scale on press: `scale(0.97)`, `--duration-fast`, `--ease-spring`
- **Secondary**: transparent bg, `1px solid --btn-secondary-border`, `--btn-secondary-text`, same pill shape — "Discover Future Labs"
  - Hover: `--btn-secondary-hover-bg`

### 3D alien — right column
- `'use client'` component: `<AlienScene />`
- R3F Canvas fills right column, `alpha: true` (transparent bg)
- Green alien: procedural geometry (body sphere, eye, arms, feet — matching SVG from A-ICON-004)
- Animation: gentle float (sine wave Y ±0.15 units, 3s cycle, `useFrame`)
- Particle field: 30–40 small spheres, `--color-kido-green` at 20% opacity, slow drift
- Fallback (no WebGL): `<img src="A-LOGO-002" alt="Kidovation's alien character" width={300} />`
- Lighting: `<ambientLight intensity={0.6} />` + `<directionalLight position={[5, 5, 5]} intensity={1.2} />`
- D-DS-002 applies

### Scroll indicator
- Bottom center, absolute positioned
- Animated chevron: CSS `@keyframes bounce`, `--text-secondary`, 48×48px hit target
- Fades out on first scroll: IntersectionObserver or GSAP ScrollTrigger opacity → 0

### Motion — hero entrance
- GSAP timeline on mount (not scroll-triggered — immediate):
  ```
  t=0:    H1 word 1: y: 30 → 0, opacity: 0 → 1, duration: 0.6s, ease: power2.out
  t=0.15: H1 word 2 ("next"): same
  t=0.3:  H1 word 3: same
  t=0.45: Subhead: y: 20 → 0, opacity: 0 → 1, duration: 0.5s
  t=0.6:  CTAs: opacity: 0 → 1, y: 10 → 0, duration: 0.4s, stagger: 0.08s
  t=0.8:  Scroll indicator: opacity: 0 → 1, duration: 0.3s
  ```
- Alien: float animation starts immediately, no entrance delay
- Reduced-motion: all elements visible from frame 1, no transitions

### Responsive
- **≥1440px**: 55/45 split, H1 at max clamp size (7rem)
- **1024–1439px**: 55/45 split, H1 scales with clamp
- **768–1023px** (tablet): alien canvas above (320px height), copy below, single column, centered
- **480–767px** (mobile): alien above (260px), copy below, CTAs full-width stacked, subhead max-width 100%
- **375–479px** (small mobile): alien (240px), H1 at clamp minimum, CTAs stacked, tight padding `--space-6`

---

## Section 2 — Stats bar

### Layout
- Full-width, `--bg-surface` (#0F1629) — visible elevation from hero
- 4 equal columns on desktop, `--color-navy-border` 1px vertical dividers between
- Padding: `--space-12` top/bottom, `--section-padding-x` left/right
- D-LAY-002 applies

### Stat treatment
- **Number**: `--font-display`, `--weight-display` (800), `--text-d2`, `--text-primary`
- **Label**: `--font-body`, `--text-xs`, `--tracking-label` (0.08em), uppercase, `--text-secondary`
- Gap number → label: `--space-2`
- Values (static target): "10" years · "12" markets · "3,111+" young people · "115" classrooms
- Stat items centered within their column

### Motion — count-up (D-MOT-001)
- GSAP ScrollTrigger: trigger at `top 80%`
- Numbers animate: 0 → target, duration 1.2s per stat, stagger 100ms
- Ease: `power2.out` (decelerates — feels like weight settling)
- Reduced-motion: show final value, no animation

### Responsive
- **≥768px**: 4 columns, vertical dividers
- **<768px**: 2×2 grid, `--grid-gap`, dividers removed, center-aligned per cell

---

## Section 3 — What is Innovation X

### Layout
- **40/60 split**: 40% copy left / 60% diagram right (desktop ≥1024px)
- No full-bleed — constrained to `--content-max-width`
- Left: text, `padding-right: --space-16`, body max-width 480px
- Right: ecosystem SVG diagram — IX mark top, two branches to Kidovation + Future Labs, connected by architectural lines
- Diagram container: `--bg-card`, `--radius-lg`, `--card-padding`, `--shadow-md`
- Section padding: `--section-padding-y`

### Diagram design
- IX mark (A-LOGO-003 SVG, white variant on dark): top center of diagram
- Lines: SVG paths, `--color-navy-border`, 1px — clean connectors, no arrowheads
- Kidovation node: wordmark (A-LOGO-003 plain white) + `--color-kido-green` accent circle
- Future Labs node: wordmark + `--color-fl-orange` accent circle
- Labels pair color with text — use-of-color compliant
- `role="img"` on diagram SVG, `aria-label="Innovation X ecosystem: Kidovation and Future Labs"`

### Typography
- **H2** `id="ix-heading"`: `--font-display`, `--weight-display` (800), `--text-d2`
- **Body**: `--font-body`, `--text-md`, `--text-secondary`, `--leading-body`

### Motion
- Text and diagram: GSAP ScrollTrigger fade-up, `top 80%`, y: 40 → 0, opacity 0 → 1, duration 0.8s, ease: `power2.out`
- Text first, diagram staggered 0.15s after
- Reduced-motion: static

### Responsive
- **≥1024px**: 40/60 split
- **768–1023px**: 50/50 split
- **<768px**: single column, diagram below copy, diagram lines removed, logos stacked vertically

---

## Section 4 — Our Ecosystem

### Layout
- Full-width, no container — panels touch viewport edges
- Two panels side by side, **each 50vw**, min-height 480px desktop
- Content anchored bottom-left: `padding: --space-10`
- No gap between panels — split at center
- D-LAY-003 applies

### Kidovation panel
- Background: `--color-midnight` with `--color-kido-green` bottom-left gradient wash (15% opacity)
- Top-right: alien illustration (A-ICON-004 green standing SVG), 240px, slight overflow at panel top edge
- Accent bar: 3px × 40px, `--color-kido-green`, margin-bottom `--space-4` above H3
- **H3** `id="ecosystem-heading-kido"`: `--font-display`, `--weight-display`, `--text-d3`, `--text-primary`
- **Kidovation wordmark**: A-LOGO-003 plain white, 120px wide — above H3 (brand label before description)
- **Body**: `--font-body`, `--text-md`, `--text-secondary`, max-width 360px
- **CTA**: `--color-kido-green`, `--weight-accent`, `--text-sm`, inline "Explore Kidovation →"
- Hover state: `--glow-green` box-shadow on panel + alien transforms `translateY(-8px)`, `--ease-spring`, `--duration-base`

### Future Labs panel
- Background: `--color-midnight` with `--color-fl-orange` bottom-right gradient wash (15% opacity)
- Top-right: rocket SVG (A-ICON-011), 200px
- Accent bar: `--color-fl-orange`
- **H3** `id="ecosystem-heading-fl"`: same structure
- **Future Labs wordmark**: if SVG available, use it; else typeset "Future Labs" in `--font-display`
- **Body**, **CTA**: same pattern, `--color-fl-orange` accents
- Hover: `--glow-orange` + rocket translates up 6px

### Use-of-color compliance
- Each panel differentiated by: color + wordmark (logo) + heading text — not color alone ✓

### Motion
- Panels: GSAP ScrollTrigger, `top 80%`
- Kidovation: `x: -40 → 0`, opacity 0 → 1, duration 0.7s, ease: `power2.out`
- Future Labs: `x: 40 → 0`, opacity 0 → 1, duration 0.7s, stagger 0.12s after Kidovation
- Reduced-motion: static

### Responsive
- **≥768px**: 50/50 side by side
- **<768px**: stacked full-width, 360px min-height each, content left-aligned

---

## Section 5 — Mission

### Layout
- Full-width, no container for background
- Real event photo (A-IMG-003, 2025 shot — strongest group energy photo) as background
  - `position: absolute, inset: 0`, `object-fit: cover`, `z-index: 0`
  - Overlay: `linear-gradient(to bottom, rgba(8,12,24,0.85) 0%, rgba(8,12,24,0.97) 100%)`, `z-index: 1`
- Content: `z-index: 2`, `--content-narrow-width` centered, `--section-padding-y` padding
- Center-aligned — the **only** section with center alignment (manifesto intent, D-LAY-004)
- Readability: overlay ensures ≥7:1 contrast for white text on photo background ✓

### Typography
- **Opening mark**: `--font-accent` (Permanent Marker), `font-size: 96px`, `--color-kido-green`, `line-height: 1`, `display: block`, margin-bottom `-24px` (overlaps H2 slightly for warmth)
  - `aria-hidden="true"` — decorative, not read by screen reader
- **H2** `id="mission-heading"`: `--font-display`, `--weight-display` (800), `--text-d2`, `--text-primary`, `--leading-display`, text-align center
- **Attribution**: `--font-body`, `--text-sm`, `--tracking-label`, uppercase, `--text-secondary`, margin-top `--space-6`

### Motion
- Pull quote: GSAP ScrollTrigger — `top 75%`, y: 24 → 0, opacity 0 → 1, duration `--duration-slow` (400ms), ease: `power2.out`
- Quotation mark: fades in slightly before quote (stagger -0.2s)
- Reduced-motion: static

### Responsive
- **All breakpoints**: center-aligned, max-width narrows to `min(--content-narrow-width, 90vw)`
- Background photo: `object-position: center center` — adjust per photo content
- Opening mark: scales down to 64px on mobile

---

## Section 6 — Events glimpse

### Layout
- Header (H2 + subhead): left-aligned, constrained to `--content-max-width`, `--space-10` margin below
- **Grid**: 3-column asymmetric on desktop — `grid-template-columns: 1fr 2fr 1fr` (D-LAY-005)
  - Middle column wider for landscape/hero photos
  - Mixed heights: `grid-template-rows: 280px 380px` or `auto` — cells span rows for density
  - Gap: `--grid-gap`
- 6 photos: curated from A-IMG-003 — mix of 2018, 2019, 2025 to show progression
- Caption strip: `--text-xs`, `--text-secondary`, margin-top `--space-6`, left-aligned

### Photo treatment
- Next.js `<Image>` with `sizes` and `srcSet` — responsive loading
- `object-fit: cover`, `width: 100%`, `height: 100%` within fixed-height cells
- `loading="lazy"` — all photos (none are hero images)
- `priority={false}` — below fold
- No filters, no overlay, no color treatment (P-SPACE-001)
- Cell container: `overflow: hidden`, `--radius-md` (12px)
- Hover: `transform: scale(1.03)`, `transition: transform var(--duration-base) var(--ease-smooth)`
- Each photo: meaningful `alt` text — descriptive of what's happening (not "event photo 1")

### Typography
- **H2** `id="events-heading"`: `--font-display`, `--weight-display`, `--text-d2`
- **Subhead**: `--font-body`, `--text-lg`, `--text-secondary`
- **Caption**: `--font-body`, `--text-xs`, `--tracking-label`, `--text-secondary`

### Motion
- Grid cells: GSAP ScrollTrigger stagger, `top 80%`
- Each cell: opacity 0 → 1, y: 20 → 0, stagger 80ms per cell (left-to-right, top-to-bottom)
- Ease: `power2.out`, duration 0.5s per cell
- Reduced-motion: all visible, no animation

### Responsive
- **≥1024px**: `1fr 2fr 1fr` asymmetric, mixed heights
- **768–1023px**: `1fr 1fr` 2-column, uniform 260px height
- **480–767px**: `1fr 1fr` 2-column, 200px height
- **<480px**: single column, full width, 220px height each

---

## Motion summary

| Element | Tool | Trigger | Duration | Ease | Reduced-motion |
|---------|------|---------|----------|------|----------------|
| Hero headline words | GSAP | On mount | 0.6s/word | power2.out | Skip — show final |
| Hero subhead + CTAs | GSAP | On mount stagger | 0.4–0.5s | power2.out | Skip — show final |
| Alien float | R3F useFrame | Continuous | 3s/cycle | sine | Stop — hold position |
| Stats count-up | GSAP ScrollTrigger | top 80% | 1.2s stagger 100ms | power2.out | Skip — show value |
| What is IX fade-up | GSAP ScrollTrigger | top 80% | 0.8s | power2.out | Skip — show final |
| Ecosystem slide-in | GSAP ScrollTrigger | top 80% | 0.7s | power2.out | Skip — show final |
| Mission fade-up | GSAP ScrollTrigger | top 75% | 0.4s | power2.out | Skip — show final |
| Events stagger | GSAP ScrollTrigger | top 80% | 0.5s/cell 80ms gap | power2.out | Skip — show all |
| Hover: panels | CSS transition | Hover | `--duration-base` (250ms) | `--ease-spring` | No hover needed |
| Hover: photo cells | CSS transition | Hover | `--duration-base` | `--ease-smooth` | Remove scale |
| Hover: CTAs | CSS transition | Hover | `--duration-fast` (150ms) | `--ease-out` | Keep color only |
| Scroll indicator | CSS keyframes | Immediate | 1.5s bounce loop | ease-in-out | Hide |

All motion: D-MOT-002 — every GSAP call and CSS animation checks `prefers-reduced-motion`.

---

## Preference overrides

| Preference | Override | Reason |
|-----------|---------|--------|
| P-TECH-001 (no generic icons) | Lucide chevron for scroll indicator only | Single minimal UI indicator — not decorative, not structural |
| P-TYPO-001 (no AI-default fonts) | Inter is body font — this is intentional | Inter is excluded as primary/display; Syne is the display. Inter for body is correct for legibility at `--text-md`. |

---

## Decisions cross-reference

| ID | Decision | Where it shows |
|----|---------|---------------|
| D-ARCH-001 | Next.js App Router | `'use client'` on AlienScene, Image component, metadata exports |
| D-DS-002 | Kidovation alien as 3D hero element | Section 1 — R3F Canvas with procedural alien |
| D-LAY-001 | Hero: 55/45 split, copy left / 3D alien right | Section 1 layout |
| D-LAY-002 | Stats bar as standalone typographic band | Section 2 — `--bg-surface`, full-width |
| D-LAY-003 | Ecosystem as full-width architectural panels | Section 4 — 50vw, no container, no gap |
| D-LAY-004 | Mission: center-aligned manifesto | Section 5 — only center-aligned section |
| D-LAY-005 | Events grid: asymmetric 1fr 2fr 1fr | Section 6 layout |
| D-MOT-001 | Stats count-up via GSAP ScrollTrigger | Section 2 motion |
| D-MOT-002 | All motion gated on prefers-reduced-motion | All sections |
