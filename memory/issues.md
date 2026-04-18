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

## I-005 — Orange on #FAFAFA at small sizes fails WCAG AA normal-text
- Date: 2026-04-18
- Page / Component: global / components: HeroEntrance (orange tag), intro/Hero (overlines, co-brand marks), Chapter01 (overline)
- Description: `--sainsburys-orange` (#F06C00) on `--color-background-primary` (#FAFAFA) measures ≈3.4:1. Passes AA large-text (≥18px or ≥14px bold) but fails AA normal (4.5:1) at 10–12px overlines where this colour is used. Raised by 2B agent during Phase 2 migration.
- Severity: medium
- Status: open
- Resolution: — (options: swap small overlines to `--color-text-tertiary`; or darken to `--sainsburys-orange-dark` #E55000 ≈ 4.0:1 — still borderline; or reserve orange for ≥14px-bold contexts only. Decide during Phase 4 audit.)

## I-006 — Chapter-2 teal borderline on white
- Date: 2026-04-18
- Page / Component: component: NavBar (ch2 numeral), Chapter02 (overline, rule strokes)
- Description: `--horizon-1` (#0891B2, resolves via `--accent-ch2`) on `#FAFAFA` measures ≈4.1:1 — borderline below AA normal. Acceptable at display sizes, risky at 10–12px. Raised by 2B agent.
- Severity: low
- Status: open
- Resolution: — (Phase 4 audit to decide: accept as large-text only, or darken horizon-1 token.)

## I-007 — Orange leading edge of ch5 gradient at finale
- Date: 2026-04-18
- Page / Component: component: Chapter05 (ENGAGEMENT gradient headline, co-brand rule)
- Description: `--accent-ch5-gradient` (linear 135deg, #F06C00 → #A100FF) applied as `background-clip: text` on the finale headline. Left edge sits in orange territory (≈3.4:1 on #FAFAFA) before ramping to deep purple (≈7.7:1). Headline is large-text at `clamp(36px, 5vw, 72px)` so WCAG AA passes, but the leading letters feel lighter. Raised by 2C5.
- Severity: low
- Status: open
- Resolution: — (Phase 4 audit: accept as large-text compliance, or shift gradient start to 20% (skip the lightest orange zone).)

## I-008 — NavBar frosted-blur override of no-glass anti-pattern
- Date: 2026-04-18
- Page / Component: component: NavBar
- Description: 2B agent kept `backdrop-filter: blur(20px)` over a 15% transparent `--color-surface-card` for the nav bar, arguing nav chrome is distinct from content panels flagged by MASTER.md's no-frosted-glass rule. Pragmatic but explicitly contradicts the anti-pattern. Needs sign-off: accept as nav-only exemption, or switch to opaque `var(--color-surface-card)`.
- Severity: low
- Status: open
- Resolution: — (Phase 4 audit decision.)
