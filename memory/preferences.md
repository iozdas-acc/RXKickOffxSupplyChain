# Preferences

Durable taste rules — patterns the client keeps choosing.
Write here when a preference is confirmed twice or explicitly stated.
Preferences are applied silently — no need to re-explain them each session.

**ID format:** `P-[CATEGORY]-[NNN]`

| Prefix | Category |
|--------|----------|
| `TYPO` | Typography |
| `COLOR` | Color |
| `SPACE` | Spacing & Layout |
| `TONE` | Tone & Copy |
| `MOT` | Motion & Animation |
| `TECH` | Technical |

---

## Typography `TYPO`

_No preferences recorded yet._

---

## Color `COLOR`

### P-COLOR-001 — Tokens only, no inline hex
- Rule: All colour references in `site/app/**` and `site/components/**` resolve to CSS variables declared in `site/app/globals.css`, or to Tailwind colour classes that themselves resolve to those variables. Zero hex literals outside the token file.
- Origin: Phase 1 of `memory/specs/sainsburys-redesign-plan.md` (2026-04-18). Enforced by `memory/quality-benchmark.md` scoring rubric.
- Scope: global — every component, every page. The only legal hex literals in `site/` are inside `app/globals.css`.
- Enforcement: `grep -rnE '#[0-9A-Fa-f]{3,8}' site/app site/components` should return only matches inside `globals.css`. If a colour is needed that isn't tokenised, add it to `globals.css` first, then reference.
- Date: 2026-04-18

---

## Spacing & Layout `SPACE`

_No preferences recorded yet._

---

## Tone & Copy `TONE`

_No preferences recorded yet._

---

## Motion & Animation `MOT`

_No preferences recorded yet._

---

## Technical `TECH`

### P-TECH-001 — Chapters reference accent via `--accent-chN` indirection
- Rule: Chapter components (`site/components/chapters/*`) apply their accent colour via `var(--accent-chN)` or the Tailwind `accent-chN` class. Never reference `--horizon-N`, `--sainsburys-orange`, or `--accenture-purple` directly inside a chapter component. Go through the `--accent-chN` alias so zone retuning happens in one place (`globals.css`).
- Origin: D-DS-003 + Phase 1 of redesign spec (2026-04-18).
- Scope: all `site/components/chapters/*`. Applies to `site/components/three/scenes/*` once Phase 3 lands.
- Enforcement: Phase 2 acceptance checks for per-chapter files include `grep -E "horizon-[123]|sainsburys-orange|accenture-purple" site/components/chapters/ChapterNN.tsx` returning zero matches.
- Date: 2026-04-18
