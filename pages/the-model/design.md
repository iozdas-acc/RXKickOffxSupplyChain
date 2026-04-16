# the-model — Design Spec

> Architecture: standalone scrollable page at `/the-model`.
> Visual system: same as the-learning and the-project.
> Tokens: see design-system/MASTER.md. Refer by name only.

---

## Emotional arc

Arrives as: tension. The learning named the problem — the delivery model was broken.
Leaves as: clarity and relief. The hybrid model is the direct, structural answer. Inevitable, not pitched.

---

## Section inventory

| # | Section | Background | Component |
|---|---------|------------|-----------|
| 1 | ModelHero | Dark `#1A1A1A` | GSAP, dot grid, ambient purple glow, two-phase statement |
| 2 | PhaseVisualizer | Light `#F5F5F5` | Two-column phase cards, animated connector |
| 3 | WhyItWorks | Dark `#1A1A1A` | Three rationale cards with hover states |
| 4 | CommercialSignal | Light `#FAFAFA` | Stats row + supporting copy |
| 5 | Transition | Dark `#1A1A1A` | "This isn't just the Sainsbury's model." → /the-template |

---

## Section 1 — ModelHero

**Visual concept:** "Two Phases" — like the Two Speeds hero in the-learning but horizontal bar split top-to-bottom (or left-right on desktop). Top = Phase 1 (RX-led, faster, orange). Bottom = Phase 2 (Consulting Agent, steadier, purple). A horizontal split line between them.

**Composition:**
- Top bar: overline "The Hybrid Approach" (orange) + chapter "04 / 05" (muted)
- Main: left half = Phase 1 label + tagline ("RX acceleration at pace."), right half = Phase 2 label + tagline ("Client adoption at theirs.")
- Split line: orange → purple gradient horizontal line dividing the two
- Bottom synthesis: gradient text "Value creation and client change. Running in parallel." 
- Scroll indicator

**Motion (GSAP):**
- Entrance: left panel slides in from left (x: -40→-8), right panel from right (x: 40→8), spring easing back.out(1.2)
- Split line: scaleX 0→1 (0.6s power3.out) after panels arrive
- Gradient glow from split line: opacity 0→0.5 (amber→purple blend)
- Bottom synthesis fades in last
- Mouse parallax: panels diverge slightly on mouse move (desktop only)

**Dark background:** `#1A1A1A`
**Split line:** left-half orange `#F06C00`, right-half purple `#7C3AED` (gradient or two divs)

---

## Section 2 — PhaseVisualizer

**Visual concept:** Two large cards side by side. Phase 1 card (left) has orange border tint. Phase 2 card (right) has purple border tint. Between them: an animated connector showing the handoff point.

**Phase 1 card:**
- Label: "Phase 1 — RX-Led Acceleration"
- Descriptor: "Weeks 1–8" (or relative timing)
- What happens: compressed discovery, AI-native diagnostics, executive narratives
- Bullet points: 3 items showing RX capability at speed
- Tag: "AI-Native Delivery"

**Phase 2 card:**
- Label: "Phase 2 — Consulting Agent"
- Descriptor: "Weeks 9–16" (or relative timing)
- What happens: light-touch support, client team capability build, absorption at client pace
- Bullet points: 3 items showing adoption support
- Tag: "Client-Paced Adoption"

**Connector:** animated arrows or a timeline node between cards. Desktop: horizontal connector. Mobile: vertical.

**Motion:** staggered entry — phase 1 card enters first (delay 0), phase 2 card enters slightly after (delay 0.15).

---

## Section 3 — WhyItWorks

**Visual concept:** Three rationale cards on dark background. Each addresses one structural reason the model works.

**Cards:**
1. "RX keeps moving at speed" — phase 1 is unadulterated RX delivery. No slowdown for adoption.
2. "The client isn't abandoned" — phase 2 keeps a consulting agent present, supporting without dictating pace.
3. "CCI stays high throughout" — value creation and change adoption run in parallel, not sequentially.

**Card design:** dark cards with subtle border (`rgba(255,255,255,0.06)`), orange overline accent, white heading, muted body. Hover: scale 1.02, border brightens.

**Motion:** stagger entry (0.08s per card), slide up from y:16.

---

## Section 4 — CommercialSignal

**Visual concept:** Stats row — 2-3 key commercial signals. Clean, bold, light background.

**Stats:**
- "1.5×" faster delivery — AI-native phase 1
- "CCI maintained" — consulting agent tail prevents drop
- "Parallel" — value creation + change adoption simultaneously

**Layout:** horizontal stats row on desktop (3 columns), stacked on mobile. Each stat: large number/label, small descriptor below.

**Supporting copy:** brief paragraph explaining why the model keeps commercial velocity high.

**Motion:** stats count/fade in on scroll entry.

---

## Section 5 — Transition

**Visual concept:** Dark closing section. Builds anticipation for the final chapter.

**Copy:**
- Overline: "And —"
- Headline: "This isn't just the Sainsbury's model."
- Sub: "H1–H3 Sainsbury's procurement is the proof of concept. What comes next is the template."
- Link: "See the template →" → `/the-template`

**Motion:** standard inView fade-in sequence (same pattern as the-learning Transition).

---

## Responsive notes

- Mobile: all split panels stack vertically. Phase cards stack. Stats stack.
- Tablet: phase cards side by side but narrower. Stats row 2+1.
- Desktop: full horizontal layouts.

---

## Typography

- Hero headline: `clamp(28px, 6vw, 84px)` Space Grotesk 700 italic
- Section headlines: `clamp(28px, 3.5vw, 44px)` Space Grotesk 700
- Body: DM Sans 16px, line-height 1.6
- Overlines: Space Mono 11px uppercase tracking-widest

---

## Color palette (this page)

- Hero dark bg: `#1A1A1A`
- Phase 1 accent: `#F06C00` (orange)
- Phase 2 accent: `#7C3AED` (purple — chapter 4 color)
- Light sections: `#F5F5F5` / `#FAFAFA`
- Split line: gradient `#F06C00` → `#7C3AED`
