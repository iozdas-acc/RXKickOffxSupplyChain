# Work With Us — State

Build status, open questions, blockers, and session log.

---

## Status

`review`

**Current:** Built + screenshot audited (r7). All sections confirmed visible at desktop and mobile.
**Last updated:** 2026-04-05
**Last worked on by:** Claude (QA session)

---

## Quality gate checklist

- [x] All sections built and responsive (Hero, Schools, Partners, Parents, ContactForm)
- [ ] All assets have status `approved` in `assets/manifest.md` — alien SVGs are `uploaded`
- [x] No blocking issues in `memory/issues.md` for this page
- [x] Responsive behavior documented (single column on mobile)
- [x] Reviewed against preferences in `memory/preferences.md`
- [x] Performance budget met
- [x] Copy reviewed and finalized
- [x] Screenshot audit passed — r7 desktop confirmed: hero tabs, Schools, Partners, Parents, contact form all visible

---

## Open questions

- [ ] Contact form: confirm email destination before launch
- [ ] Partners section: placeholder logos — real partner logos to replace before launch

---

## Blockers

None.

---

## Session log

```
2026-04-05 — Build session. Sections: Hero (anchor tabs to Schools/Partners/Parents),
  Schools (checklist + CTA), Partners (corp + alien), Parents (family + alien),
  ContactForm (name/email/org/radio/message).
  Fixed: SVG aliens via <img> tag. Fixed: blue-alien.svg rename (was "Blue alien.svg").
2026-04-05 — QA session. Screenshot audit r6+r7. All sections confirmed visible.
```
