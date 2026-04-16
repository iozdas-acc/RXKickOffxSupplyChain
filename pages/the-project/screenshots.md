# Screenshots — the-project

<!-- CURRENT STATE — updated automatically every round -->
**Latest round:** 2
**Status:** clean — no blocking issues
**Load:** `pages/the-project/screenshots/r2-desktop-s*.png` (6 slices) + `r2-mobile-s*.png` (10 slices)

---

## Round 2 — 2026-04-16

**Trigger:** Initial build complete (all 6 components wired). Screenshot script wait fixed 120ms → 600ms to allow IntersectionObserver animations.

### Desktop (1440×900)

| File | Section | Status |
|------|---------|--------|
| r2-desktop-s1.png | Hero + top of ExecutiveSummary | ✅ Clean |
| r2-desktop-s2.png | ExecutiveSummary cards (2×2 dark grid) | ✅ Clean |
| r2-desktop-s3.png | AI Tools (3-col) + Timeline header | ✅ Clean |
| r2-desktop-s4.png | Full Timeline (5 phases, legend) | ✅ Clean — Week 8 slight fade (timing artifact) |
| r2-desktop-s5.png | Key Outputs (4 cards + live links partial) | ✅ Clean — live links fading at bottom (timing artifact) |
| r2-desktop-s6.png | Live links complete + Transition section | ✅ Clean |

### Issues found this round

| ID | Severity | Description |
|----|----------|-------------|
| I-004 | low | Timeline Week 8 card and bottom live-example cards appear semi-transparent in screenshots — IntersectionObserver hasn't fired before capture. No user-facing impact. |

### Delta from round 1
Round 1 not taken (first screenshot session was round 2 after fixing animation timing).

---

## Round 1 — not captured
First screenshot attempt was skipped — script wait was 120ms which caused all below-fold content to capture at opacity 0. Fixed in script before capturing.
