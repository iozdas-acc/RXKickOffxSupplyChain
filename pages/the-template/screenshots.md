# Screenshots — [page-slug]

<!-- CURRENT STATE — updated automatically every round -->
**Latest round:** 0 (no screenshots yet)
**Status:** none
**Load:** nothing yet — run `node scripts/screenshot.js <url> [page-slug]` to capture round 1

---

Visual history of this page. Every round is logged here so Claude always knows the current visual state and how the page evolved.

Images live in `pages/[slug]/screenshots/` as `r<N>-mobile.png`, `r<N>-tablet.png`, `r<N>-desktop.png`.

- Each round = one screenshot session (run before and after a set of fixes)
- **Current State block** at the top is always updated — this is the single source of truth for where to look
- Claude reads this file at session start for any in-progress page to orient itself visually

---

<!-- rounds go below, newest first -->
