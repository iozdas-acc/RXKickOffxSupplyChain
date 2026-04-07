# About — State

Build status, open questions, blockers, and session log.

---

## Status

`review`

**Current:** Built + screenshot audited (r9). All sections confirmed visible. Hero height fix applied.
**Last updated:** 2026-04-05
**Last worked on by:** Claude (QA session)

---

## Quality gate checklist

- [x] All sections built and responsive (Hero, Story, Timeline, Team, BrandEvolution)
- [ ] All assets have status `approved` in `assets/manifest.md` — team photos are `uploaded`
- [x] No blocking issues in `memory/issues.md` for this page
- [x] Responsive behavior documented (timeline horizontal scroll on mobile)
- [x] Reviewed against preferences in `memory/preferences.md`
- [x] Performance budget met
- [x] Copy reviewed and finalized
- [x] Screenshot audit passed — r9 desktop confirmed: hero (full-viewport), story+values, timeline (all 11 milestones), team (3 generations with photos), brand evolution (4 logos)

---

## Open questions

- [ ] Team photos: confirm correct person-to-photo mapping before launch (photos may be generic placeholders)
- [ ] Brand evolution: confirm 4 logo variants are the correct historical files

---

## Blockers

None.

---

## Session log

```
2026-04-05 — Build session. Sections: Hero (GSAP entrance, dot-grid, IX border),
  Story (mission text + 3 values), Timeline (11 milestones, 2015-2025, CSS grid),
  Team (3 generations — Fiona/leadership/current with photos + bios),
  BrandEvolution (4 logo cards with year labels).
  Fixed: BrandEvolution logo paths (wrong filenames in initial build).
  Fixed: Timeline overflow (was cutting 2022-2025 — changed to CSS grid repeat(11,1fr)).
2026-04-05 — QA session. Screenshot audit r8+r9.
  Fixed: Hero minHeight calc(100dvh - var(--nav-height)) → 100dvh.
  Root cause: CSS variable in calc() inline style resolves to 0 in Playwright rendering,
  collapsing hero to 145px. Simple fix: remove the var() from minHeight, match Kidovation pattern.
  In real browsers with CSS loaded, var(--nav-height) resolves correctly in both patterns.
```
