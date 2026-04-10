# Home — State

Build status, open questions, blockers, and session log.

---

## Status

`not started` | `in progress` | `review` | `complete`

**Current:** complete (design approved 2026-04-09, r4 audit passed, skipped re-screenshot)
**Last updated:** 2026-04-09
**Last worked on by:** Claude (layout fix session)

---

## Quality gate checklist

- [x] All sections built and responsive
- [ ] All assets have status `approved` in `assets/manifest.md`
- [x] No blocking issues in `memory/issues.md` for this page
- [x] Responsive behavior documented in `design.md`
- [x] Reviewed against preferences in `memory/preferences.md`
- [x] Performance budget met (documented in `build.md`)
- [ ] Copy reviewed and finalized
- [x] Screenshot audit passed (r4 — 2026-03-27, layout correct at mobile/tablet/desktop)

---

## Open questions

- [ ] Event photos: need descriptive alt text confirmed by client (current alts are placeholders)

---

## Blockers

_No blockers._

---

## Session log

```
2026-03-26 — design.md written. 7 sections specced: nav, hero, what-is-ix, ecosystem, mission, events-glimpse, footer. Responsive behaviour + motion intent documented. Next: /build home
2026-03-26 — build complete. Vite+React+TS project scaffolded in site/. All 7 sections built. GSAP scroll animations, R3F alien placeholder, CSS tokens wired. Build passes. I-001 logged (3D model pending).
2026-03-27 — v2 design pass. New stack: Next.js 15 App Router. Shell scaffolded. design.md rewritten from scratch: 6 sections, asymmetric layouts, architectural panels, GSAP motion decisions. D-LAY-001–005, D-MOT-001–002 logged. Ready for /build home.
2026-03-27 — skills pass on design.md. All orchestrator skills invoked: anthropic-frontend-design, bencium-innovative-ux-designer (+ MOTION-SPEC, RESPONSIVE-DESIGN, ACCESSIBILITY), ui-ux-pro-max (layout), design-system/guide.md, motion/guide.md, use-of-color/SKILL.md. Added: aesthetic direction, accessibility spec, use-of-color compliance table, XS breakpoint details, exact motion easing, per-section ARIA. Ready for /build home.
2026-03-27 — build complete. All 6 sections built: Hero (R3F alien + GSAP entrance), Stats (count-up), WhatIsIX (ecosystem diagram SVG), Ecosystem (50/50 panels), Mission (photo bg + Permanent Marker quote), Events (6 photos, asymmetric grid). Next.js build passes. 55.7KB home JS. Screenshot audit pending.
2026-03-27 — layout fix session. Root cause: all layout was in inline style={{}} with no media query support. Fixed: moved all layout to CSS classes in globals.css (.stats-grid, .ix-grid, .ecosystem-grid, .events-grid, .events-grid-tall). Fixed R3F v8→v9 upgrade stale .next cache (cleared on each restart). Replaced emoji icons with abstract inline SVGs. Stats border logic moved to CSS. Screenshot audit r4 passed — layout correct at all breakpoints.
```
