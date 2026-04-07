# Kidovation — Build

Technical spec for this page: component choices, motion, performance budget, and decision refs.

**Design system:** `design-system/MASTER.md`
**Decision rationale:** Full records in `memory/decisions/log.md` — reference by ID here.

---

## Component inventory

| Component / Section    | Approach                        | Decision ref | Rationale |
|------------------------|---------------------------------|--------------|-----------|
| Hero                   | 2D — full-viewport, event photo bg, overlay, SVG alien float | D-DS-002 | Alien is CSS float at full resolution; 3D scene is on home. SVG delivers visual impact without Canvas overhead on a photo-heavy hero. |
| WhatKidsDo (Section 2) | 2D — 3-col card grid, GSAP stagger reveal | D-MOT-001 | Static content; scroll stagger adds life without JS-heavy library |
| Programs (Section 3)   | 2D — numbered card grid, GSAP stagger reveal | D-MOT-001 | Same pattern for consistency |
| EventsGallery (Section 4) | 2D — asymmetric CSS grid, GSAP reveal | D-LAY-005 | Photo grid derived from home Events section |
| ImpactNumbers (Section 5) | 2D — stat band, GSAP count-up on scroll | D-MOT-001 | Same stat band pattern as home Stats |
| Materials (Section 6)  | 2D — two-col panel, GSAP reveal | — | Teacher CTA card; no complex motion needed |

**Icons:** Lucide React (Zap, Lightbulb, Bot, Layers, TrendingUp, Users) — design system rule: never use emojis as icons.

---

## Interactions & motion

All motion respects `prefers-reduced-motion`.

| Element | Motion | Library | Notes |
|---------|--------|---------|-------|
| Hero — label, h1, subhead, CTAs | Stagger up on mount | GSAP timeline | 0.1–0.55s offsets |
| Hero — alien SVG | CSS float, 4s cycle, ±18px | CSS keyframe | `alien-float` keyframe; hidden <768px |
| WhatKidsDo cards | Opacity + y stagger on scroll | GSAP + ScrollTrigger | `start: 'top 80%'` |
| Programs cards | Opacity + y stagger on scroll | GSAP + ScrollTrigger | `start: 'top 80%'` |
| EventsGallery cells | Opacity + y stagger on scroll | GSAP + ScrollTrigger | `start: 'top 80%'` |
| EventsGallery photos | Scale 1.03 on hover | CSS transition | compositor-only |
| ImpactNumbers | Count-up from 0 to value | GSAP tween | `once: true` via ScrollTrigger |
| Materials panel | Opacity + y reveal | GSAP + ScrollTrigger | Single element, `start: 'top 85%'` |
| Activity/Program cards | Border + glow on hover | Inline style toggle | No library needed |

---

## Performance budget

| Metric       | Target  | Notes |
|--------------|---------|-------|
| Lighthouse perf | ≥ 90 | Photo-heavy page; LCP image has `priority` + `fetchpriority="high"` |
| LCP          | < 2.5s  | Hero bg photo served via `next/image` with `priority` |
| CLS          | < 0.1   | All images have `width`+`height` or `fill` with fixed containers |
| Total page weight | < 1.2MB | 6 event photos lazy-loaded below fold; hero eager |
| JS bundle    | < 200KB gzipped | GSAP tree-shaken; no 3D on this page |

**Load strategy:**
- Hero photo: `priority` (LCP candidate)
- Alien SVG: eager (in-viewport at load)
- Event photos 1–6: `loading="lazy"`
- Space rocket illustration: `loading="lazy"` implied by position

---

## Decisions affecting this page

| Decision ID | Summary | Status |
|-------------|---------|--------|
| D-DS-002 | Alien as hero element | accepted — SVG float in hero, R3F lives on home page |
| D-LAY-005 | Asymmetric photo grid (`1fr 2fr 1fr`) | accepted |
| D-MOT-001 | GSAP + ScrollTrigger for all scroll-triggered reveals | accepted |
| D-ARCH-001 | Next.js 15 App Router | accepted |
