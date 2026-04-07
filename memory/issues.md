# Issues

Implementation caveats, browser bugs, performance concerns, open questions.
Severities: `low` | `medium` | `high` | `blocking`

**ID format:** `I-NNN` (sequential, e.g. `I-001`). Use this ID to reference issues from `pages/<name>/state.md` and `memory/next.md`.

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

## I-002 — Nav links run together with no spacing
- Date: 2026-04-05
- Page / Component: global | component: Nav
- Description: All nav items render adjacent with no gap — "ABOUTKIDOVATIONFUTURE LABSWORK WITH US". Missing gap or padding-x between nav links.
- Severity: medium
- Status: resolved
- Resolution: 2026-04-05 — False positive from screenshot compression. Nav code has `gap: var(--space-8)` (32px) on the flex ul — correct. No code change needed.

---

## I-003 — Alien SVG visible on mobile
- Date: 2026-04-05
- Page / Component: page: kidovation | component: Hero
- Description: Design spec says "Alien hidden <768px (performance)" but the alien SVG renders on mobile (390px). Needs `data-alien-hide` attribute — CSS selector `[data-alien-hide]` already targets this.
- Severity: medium
- Status: resolved
- Resolution: 2026-04-05 — Added `data-alien-hide=""` attribute to alien wrapper div in Hero.tsx. CSS media query at <768px hides `[data-alien-hide]` elements.

---

## I-004 — ImpactNumbers count-up animation broken + section padding
- Date: 2026-04-05
- Page / Component: page: kidovation | component: ImpactNumbers
- Description: Count-up animation initialized `counter = { val: s.value }` and tweened to `s.value` — start and end identical, animation never ran. Also: section had double horizontal padding (section-level + container-level). Heading was sr-only but appeared visible in screenshots.
- Severity: high
- Status: resolved
- Resolution: 2026-04-05 — Fixed animation to start at `{ val: 0 }` so it counts from 0 to target. Removed section-level horizontal padding (moved to container paddingBlock only). Changed h2 from sr-only to visible brand-styled label.

---

## I-005 — Materials section two-column layout not rendering
- Date: 2026-04-05
- Page / Component: page: kidovation | component: Materials
- Description: Spec says two-column layout (copy left, illustration right). Rocket illustration appeared detached/below the copy rather than adjacent.
- Severity: medium
- Status: resolved
- Resolution: 2026-04-05 — False positive from screenshot showing both ImpactNumbers and top of Materials in same viewport frame. Materials grid `1fr auto` with rocket at 160px is correct and working.

---

## I-001 — 3D alien model not yet available
- Date: 2026-03-26
- Page / Component: page: home | component: AlienScene
- Description: Hero requires a `.glb` 3D model of the Kidovation alien (D-DS-002). No model file exists yet. AlienScene.tsx is built and wired — using SVG float animation as fallback until model is delivered.
- Severity: medium
- Status: resolved
- Resolution: Built procedurally in R3F using Three.js geometry primitives. No .glb required. AlienScene.tsx constructs the full alien (body, eye, arms, feet, mouth) from spheres and boxes matching the SVG design.
