# Issues

Implementation caveats, browser bugs, performance concerns, open questions.
Severities: `low` | `medium` | `high` | `blocking`

**ID format:** `I-NNN` (sequential). Use this ID to reference from `pages/<name>/state.md` and `memory/next.md`.

---

## Format

```
## I-NNN — [Issue title]
- Date: YYYY-MM-DD
- Page / Component: global | page: <name> | component: <name>
- Description: [what the issue is]
- Severity: low | medium | high | blocking
- Status: open | in-progress | resolved
- Resolution: [how it was resolved — fill when closed]
```

Blocking issues must also appear in `memory/next.md`.
Keep resolved issues in the file — they are a record of what was encountered.

---

## I-001 — Mobile overline wraps to 2 lines
- Date: 2026-04-16
- Page / Component: page: intro / component: IntroHero
- Description: "SAINSBURY'S ENTERPRISE REINVENTION" overline text wraps to 2 lines at 390px mobile due to text length
- Severity: medium
- Status: resolved
- Resolution: Shortened to "SAINSBURY'S REINVENTION" with whitespace-nowrap text-[10px] md:text-xs. Fixed in round 2.

## I-002 — Mobile stats flex-wrap creates uneven stacking
- Date: 2026-04-16
- Page / Component: page: intro / component: IntroHero
- Description: 4 stats in a flex-wrap row produce 2+1+1 layout on mobile instead of 2×2. Last 2 stats appear centred individually rather than in a grid.
- Severity: medium
- Status: resolved
- Resolution: Changed to grid grid-cols-2 md:flex. Fixed in round 2.

## I-003 — Next.js dev badge visible in screenshots
- Date: 2026-04-16
- Page / Component: global
- Description: Next.js development mode badge appears bottom-left in screenshots. Not present in production builds — cosmetic only.
- Severity: low
- Status: resolved
- Resolution: Resolves automatically on production build. Accepted as screenshot artifact.

## I-004 — IntersectionObserver timing: bottom-of-viewport elements semi-transparent in screenshots
- Date: 2026-04-16
- Page / Component: page: the-project / components: Timeline (Week 8 card), KeyOutputs (live example cards)
- Description: Elements near the bottom of the viewport still mid-animation (opacity ~0) when screenshot is captured. Script wait increased from 120ms to 600ms but bottom-of-viewport elements need more time. No user-facing impact — real browsers trigger IntersectionObserver correctly.
- Severity: low
- Status: open
- Resolution: —
