# Home — Screenshots

Visual history of every screenshot audit round.

**Latest round:** r4 (2026-03-27)

---

## Round 4 — 2026-03-27

**Status:** Pass — layout correct across all breakpoints

| Breakpoint | File | Notes |
|---|---|---|
| Mobile 390px | r4-mobile.png | Single-column stacked, stats 2-col ✓ |
| Tablet 768px | r4-tablet.png | Single-column, events 2-col photos ✓ |
| Desktop 1440px | r4-desktop.png | 2-col hero (55/45), 4-col stats with borders, events grid ✓ |

**Fixes applied this round:** Stats border logic moved to CSS (even pattern across 4-col and 2-col breakpoints)

---

## Round 3 — 2026-03-27

**Status:** Layout substantially fixed. Stale .next cache cleared, dev server restarted.

| Breakpoint | File | Notes |
|---|---|---|
| Mobile 390px | r3-mobile.png | Renders correctly, dark theme applied ✓ |
| Tablet 768px | r3-tablet.png | Renders correctly ✓ |
| Desktop 1440px | r3-desktop.png | Renders correctly ✓ |

**Fixes applied this round:**
- All layout moved from inline `style={{}}` to CSS classes (`.stats-grid`, `.ix-grid`, `.ecosystem-grid`, `.events-grid`)
- Emoji icons in Ecosystem replaced with abstract inline SVGs
- `flex-col-mobile` (non-existent class) removed from Ecosystem
- WhatIsIX `<style>` tag with broken `[data-ix-grid]` selector removed
- Events duplicate `<style>` tag removed; tall cell uses `.events-grid-tall` class
- Stale `.next` cache cleared

---

## Round 2 — 2026-03-27

**Status:** Failed — server returning 500 (stale .next cache from `npm run build` conflicting with dev server)

All screenshots blank white. Root cause: `Cannot find module './548.js'`.

---

## Round 1 — 2026-03-27

**Status:** Failed — layout completely broken

Desktop showing 500 error (R3F reconciler crash). Mobile showing broken inline-style-only layout with no responsive behavior.

**Issues identified:**
- R3F v8 + React 19 reconciler crash → upgraded to v9.5.0 + Drei v10.7.7
- All layout used inline `style={{}}` with no media query support → moved to CSS classes
- Emoji icons in Ecosystem (👽 🚀) → replaced with abstract SVGs
- Double `<main>` tag (layout.tsx + page.tsx) → removed from layout.tsx
- Skip link event handlers on server component → CSS-only solution
