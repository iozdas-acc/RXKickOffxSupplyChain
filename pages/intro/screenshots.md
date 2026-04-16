# Screenshots — intro

<!-- CURRENT STATE — updated automatically every round -->
**Latest round:** 1
**Status:** clean — no blocking issues
**Load:** `r1-desktop-s1.png`, `r1-desktop-s2.png`, `r1-mobile-s1.png`, `r1-mobile-s2.png`

---

## Round 1 — 2026-04-16

**Files:**
- `r1-desktop-s1.png` — 1440px, scroll=0 (above fold)
- `r1-desktop-s2.png` — 1440px, scroll=56px (full content visible)
- `r1-mobile-s1.png` — 390px, scroll=0
- `r1-mobile-s2.png` — 390px, scroll=249px

### Desktop — PASS

| Element | Result |
|---------|--------|
| Orange progress bar (20% fill) | ✅ |
| Chapter counter "01 / 05" top-right | ✅ |
| Grid background pattern | ✅ Subtle, correct |
| Orange corner glow | ✅ Top-right, not centred |
| Overline + orange bars | ✅ |
| Headline — bold, dark, large | ✅ |
| Stats: 1.5× / 30% / 2× / 8 wks in orange | ✅ |
| Vertical stat dividers | ✅ |
| JAR+AI node + orange/purple flow lines | ✅ |
| Context line — muted gray | ✅ |
| Advance prompt "Here's how we did it →" | ✅ |
| Co-brand footer "Sainsbury's / Accenture" | ✅ |

### Mobile — 2 medium issues

| Element | Result |
|---------|--------|
| Progress bar | ✅ |
| Chapter counter | ✅ |
| Headline scales via clamp | ✅ |
| Overline | ⚠️ **I-001 medium** — wraps to 2 lines at 390px |
| Stats grid | ⚠️ **I-002 medium** — flex-wrap causes 2+1+1 stacking; should be 2×2 |
| JAR+AI | ✅ |
| Advance prompt | ✅ |

### Issues

| ID | Severity | Description |
|----|----------|-------------|
| I-001 | medium | Overline wraps to 2 lines at 390px mobile |
| I-002 | medium | Stats flex-wrap causes uneven stacking (2+1+1) — needs `grid-cols-2` on mobile |
| I-003 | low | Next.js dev badge bottom-left — dev mode only, not in production |
