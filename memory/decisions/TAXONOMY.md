# Decisions — Taxonomy Index

> Quick-retrieval map of all decisions by category.
> Full detail lives in `log.md`. IDs are anchors: `log.md#d-arch-001`.
> Append only. Mark superseded entries with → see D-XXX-NNN.

---

## ID format

`D-[CATEGORY]-[NNN]`

| Prefix | Category |
|--------|----------|
| `ARCH` | Architecture — framework, rendering strategy, hosting, build tools |
| `DS` | Design System — typography, color, spacing scale, component library |
| `LAY` | Layout — grid, responsive strategy, page structure patterns |
| `MOT` | Motion — animation library, interaction paradigms, timing rules |
| `3D` | 3D / WebGL — Three.js scenes, WebGL vs CSS 3D tradeoffs |
| `PERF` | Performance — loading strategy, image optimization, code splitting |
| `TOOL` | Tooling — dev tools, CI/CD, linting, formatting |
| `CONT` | Content — copy tone, structure, localization approach |

---

## Architecture `ARCH`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| D-ARCH-001 | Next.js as site framework | accepted | 2026-03-27 | — |

---

## Design System `DS`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| D-DS-001 | Illustrated logos as primary brand marks | accepted | 2026-03-25 | — |
| D-DS-002 | Kidovation alien as 3D hero element | accepted | 2026-03-26 | — |

---

## Layout `LAY`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| D-LAY-001 | Hero: 55/45 asymmetric split | accepted | 2026-03-27 | — |
| D-LAY-002 | Stats bar as standalone typographic band | accepted | 2026-03-27 | — |
| D-LAY-003 | Ecosystem as full-width architectural panels | accepted | 2026-03-27 | — |
| D-LAY-004 | Mission: center-aligned manifesto | accepted | 2026-03-27 | — |
| D-LAY-005 | Events grid: asymmetric 1fr 2fr 1fr | accepted | 2026-03-27 | — |

---

## Motion `MOT`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| D-MOT-001 | Stats count-up via GSAP ScrollTrigger | accepted | 2026-03-27 | — |
| D-MOT-002 | All motion gated on prefers-reduced-motion | accepted | 2026-03-27 | — |

---

## 3D / WebGL `3D`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| — | — | — | — | No decisions yet |

---

## Performance `PERF`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| — | — | — | — | No decisions yet |

---

## Tooling `TOOL`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| — | — | — | — | No decisions yet |

---

## Content `CONT`

| ID | Title | Status | Date | Version chain |
|----|-------|--------|------|---------------|
| — | — | — | — | No decisions yet |

---

## How to add a decision

1. Assign the next ID in the relevant category (e.g. `D-ARCH-001`)
2. Add a row to the table above: ID · title · status · date · version chain
3. Append the full record to `log.md` under the matching category heading
4. If this supersedes a prior decision, update the old row's version chain column and mark the old log entry `[SUPERSEDED by: D-XXX-NNN]`
