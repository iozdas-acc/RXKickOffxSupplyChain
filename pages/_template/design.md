# [Page Name] — Design Spec

> **How to read this file:**
> Tokens (colors, sizes, spacing, fonts) are defined in `design-system/MASTER.md` — they are NOT repeated here.
> This file describes *composition*: what sections exist, in what order, how content is arranged, which tokens are applied where, and what specifically deviates from the master.
> MASTER.md = the rulebook. This file = the score for this specific page.

---

## Page intent

_One sentence: what does this page achieve emotionally and functionally?_

---

## Emotional arc

_How should the visitor feel as they scroll top to bottom? (e.g., "arrives curious → understands quickly → feels the impact → wants to act")_

---

## Section inventory

| # | Section slug | Purpose |
|---|-------------|---------|
| 1 | `nav` | — |
| 2 | `hero` | — |

---

## Per-section specs

> Reference tokens by name (`--text-d1`, `--accent-kidovation`). Never restate token values — those live in MASTER.md.

### `[section-slug]`

**Layout:** _e.g. "full-bleed, 2-col at desktop: image left 7 cols / text right 5 cols, stacks on mobile"_
**Background:** _e.g. `--bg-page`, `--gradient-hero`, or a specific surface_
**Content:** _what goes here — asset IDs, copy direction, CTA label_
**Tokens in use:** _only the ones applied — e.g. `--text-d1`, `--font-display`, `--accent-kidovation`_
**Deviation from master:** _only fill if this section overrides something — otherwise omit_
**Motion intent:** _what animates, what triggers it, what it communicates_

---

## Responsive behaviour

Document only what *changes* from the desktop baseline. Breakpoint values are in MASTER.md.

| Section | Mobile change |
|---------|--------------|
| `[slug]` | _e.g. headline drops to --text-d2, image moves below text_ |

---

## Preference overrides

Only fill if this page intentionally breaks a rule from `memory/preferences.md`.

| Preference ID | Rule | Override | Reason |
|--------------|------|----------|--------|
| P-XXX-NNN | [rule] | [what this page does instead] | [why] |
