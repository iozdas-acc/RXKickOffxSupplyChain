# Decisions — Full Log

> Append only. Never delete. Mark superseded entries with `[SUPERSEDED by: D-XXX-NNN]`.
> For the categorical index and ID registry, see `TAXONOMY.md`.
>
> Format per entry:
> ```
> ## D-[CATEGORY]-[NNN] — [Title]
> - Date: YYYY-MM-DD
> - Status: accepted | rejected | pending | superseded
> - Supersedes: D-XXX-NNN (if replacing a prior decision)
> - Decision: [what was decided]
> - Rationale: [why — include rejected alternatives and their reasons]
> - Affects: global | page: <name> | component: <name>
> ```
> Rejected decisions are as important as accepted ones.
> If we rejected something, record WHY so we don't revisit it.

---

## Architecture `ARCH`

## D-ARCH-001 — Next.js as site framework
- Date: 2026-03-27
- Status: accepted
- Supersedes: —
- Decision: Next.js (App Router) is the framework for v2 of the Innovation X website.
- Rationale: 5 public pages, SEO-critical (parents/teachers/partners search for this), R3F works cleanly with `use client`, GSAP fully compatible, file-based routing removes manual wiring, easier handoff to Gen 3 team. Vite + React rejected: no SSR, weaker SEO, manual routing overhead. Astro rejected: too much client-side interactivity (3D hero, GSAP scroll animations).
- Affects: global — all scaffold, routing, and build decisions derive from this.

---

## Design System `DS`

## D-DS-001 — New illustrated logos adopted as brand direction
- Date: 2026-03-25
- Status: accepted
- Decision: Use the detailed illustrated logo versions (alien-in-planet for Kidovation, rocket-flask for Future Labs, X-with-orbit for Innovation X) as primary brand marks. Flat gradient versions as secondary/small-scale use.
- Rationale: Illustrated versions carry character and energy — consistent with playful, bold brand personality. Flat versions useful for favicon, small UI contexts.
- Affects: global

## D-DS-002 — Kidovation alien as 3D interactive hero element
- Date: 2026-03-26
- Status: accepted
- Decision: Build the Kidovation alien character as an interactive 3D asset in React Three Fiber. Used in the hero section on home and kidovation pages. The green alien (A-IMG-004, A-LOGO-002) is the primary character. Three alien variants (green/blue/pink from A-IMG-004) are available as supporting characters.
- Rationale: Client confirmed. Differentiates from every other kids education site. Aligns with Kidovation's AI/tech/innovation theme. Character system (3 variants) gives creative range.
- Implementation notes: R3F + @react-three/drei. Hero must degrade gracefully if WebGL unavailable — fallback to 2D illustrated version (A-LOGO-002). Reference skills/web3d/r3f-fundamentals/ and r3f-animation/.
- Affects: page: home, page: kidovation

---

## Layout `LAY`

## D-LAY-001 — Hero: 55/45 asymmetric split, copy left / 3D alien right
- Date: 2026-03-27
- Status: accepted
- Decision: Hero is a two-column split — 55% copy, 45% 3D scene. NOT centered layout.
- Rationale: Centering feels generic/AI-default. Asymmetric split creates tension and draws the eye to both the copy and the alien simultaneously. Copy-left is natural reading direction.
- Affects: page: home

## D-LAY-002 — Stats bar as standalone typographic band
- Date: 2026-03-27
- Status: accepted
- Decision: Impact numbers live in their own full-width band between hero and content — not embedded in a card or in the hero itself.
- Rationale: Gives the proof points structural weight. Forces the reader to pause on the numbers before entering the content.
- Affects: page: home

## D-LAY-003 — Ecosystem as full-width architectural panels
- Date: 2026-03-27
- Status: accepted
- Decision: Kidovation and Future Labs are presented as two full-width architectural panels (each 50vw), no container, touching viewport edges. NOT rounded cards in a grid.
- Rationale: Cards feel UI-generic. Panels feel spatial and brand-differentiated — each sub-brand owns its half of the screen.
- Affects: page: home

## D-LAY-004 — Mission section: center-aligned manifesto
- Date: 2026-03-27
- Status: accepted
- Decision: Mission section is the only center-aligned section on the page. Pull quote treatment with Permanent Marker accent mark.
- Rationale: Center alignment signals a pause — this is a statement, not a sales section. The Permanent Marker quotation mark adds warmth and handcrafted energy.
- Affects: page: home

## D-LAY-005 — Events grid: asymmetric 1fr 2fr 1fr
- Date: 2026-03-27
- Status: accepted
- Decision: Photo grid uses asymmetric column structure (narrow/wide/narrow) with mixed row heights.
- Rationale: Uniform grids feel like a stock photo gallery. Asymmetric editorial grid communicates curation and intentionality.
- Affects: page: home

---

## Motion `MOT`

## D-MOT-001 — Stats count-up via GSAP ScrollTrigger
- Date: 2026-03-27
- Status: accepted
- Decision: Stats bar numbers animate from 0 to target value when scrolled into view. GSAP ScrollTrigger, staggered 100ms per stat.
- Rationale: Static numbers feel inert. Count-up makes the proof feel earned — the visitor watches the impact accumulate.
- Affects: page: home

## D-MOT-002 — All motion gated on prefers-reduced-motion
- Date: 2026-03-27
- Status: accepted
- Decision: Every animation (count-up, scroll reveals, alien float, hover transitions) checks `prefers-reduced-motion`. Reduced: show final state, skip animation.
- Rationale: Accessibility baseline. Non-negotiable.
- Affects: global

---

## 3D / WebGL `3D`

_No decisions recorded yet._

---

## Performance `PERF`

_No decisions recorded yet._

---

## Tooling `TOOL`

_No decisions recorded yet._

---

## Content `CONT`

_No decisions recorded yet._
