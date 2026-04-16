# [Page Name] — Build

Technical spec for this page: component choices, motion, performance budget, and decision refs.

**Design system:** Read `design-system/MASTER.md`. Override with `design-system/pages/<this-page>.md` if it exists.
**Decision rationale:** Full records in `memory/decisions/log.md` — reference by ID here.

---

## Component inventory

| Component / Section | Approach | Decision ref | Rationale |
|--------------------|----------|--------------|-----------|
| [name] | 2D — HTML/CSS | — | [why] |
| [name] | 3D — Three.js | D-3D-NNN | [why] |
| [name] | Motion — GSAP | D-MOT-NNN | [why] |

**Rule: default 2D. Justify every 3D or JS-animation choice with a decision ID.**

## Interactions & motion

_[Scroll behavior, hover states, entrance animations, page transitions. Reference `skills/motion/` patterns. Tie each to a D-MOT-NNN ID if a library or approach was explicitly decided.]_

## Performance budget

| Metric | Target | Notes |
|--------|--------|-------|
| Lighthouse perf | ≥ 90 | |
| LCP | < 2.5s | |
| Total page weight | [TBD] | |
| JS bundle | [TBD] | |

_[Any additional load-order rules, lazy-loading decisions, or code-splitting strategy specific to this page.]_

## Decisions affecting this page

_Cross-references to `memory/decisions/log.md` entries that apply here:_

| Decision ID | Summary | Status |
|-------------|---------|--------|
| D-XXX-NNN | [brief description] | accepted |
