# Next Actions

---

## Now

- [x] ✅ Phase 1 (tokens) — 2026-04-18. Light palette locked in `design-system/MASTER.md`, `site/app/globals.css`, `site/tailwind.config.ts`. Decisions D-DS-003, D-3D-001, D-MOT-001 logged. Prefs P-COLOR-001, P-TECH-001 recorded.
- [x] ✅ Phase 2 (palette migration) — 2026-04-18. All 7 tasks complete (shell, nav+entrance, 5× chapter). Zero hex outside globals.css across `site/app/**` and `site/components/{chapters,presentation,intro}/**`. Verified via grep.
- [ ] **Run `cd site && npm install`** — `next` bumped `15.2.4 → ^15.5.15`; node_modules need reinstall before `npm run dev` will start.
- [ ] First visual QA pass — open `http://localhost:3000`, verify the light world renders, capture screenshots for each chapter.
- [ ] Review I-005/006/007/008 contrast + frosted-nav concerns — triage before Phase 3.
- [ ] Phase 3 fan-out — primitive library (3.0, serial) → 5 scene agents (3.1–3.5, parallel). 3D lighting depends on locked light palette, so only start after visual QA signs off.
- [ ] Check: cinematic hero entrance → Enter Experience → chapter navigation
- [ ] Check: keyboard ← → navigation between all 5 chapters
- [ ] Check: 3D scene transitions (products assembling, shelves, chaos/order, zones, network)
- [ ] Chase Raj/Ben for real impact numbers (TBD in Chapter01.tsx STATS array)

## Soon

- [ ] Run `/screenshot intro` — spatial audit of the experience
- [ ] Polish pass: glass card hover transitions, particle color transitions between chapters
- [ ] Consider adding a `useEffect` on chapter change to update `document.title`

## Blocked

- **Impact data** — real numbers for Chapter 01 stats. `1.5×`, `30%`, `2×`, `8 wks` are placeholders from reference app. Unblocks when Raj/Ben data arrives.
