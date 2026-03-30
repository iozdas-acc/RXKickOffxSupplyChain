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

## I-001 — 3D alien model not yet available
- Date: 2026-03-26
- Page / Component: page: home | component: AlienScene
- Description: Hero requires a `.glb` 3D model of the Kidovation alien (D-DS-002). No model file exists yet. AlienScene.tsx is built and wired — using SVG float animation as fallback until model is delivered.
- Severity: medium
- Status: resolved
- Resolution: Built procedurally in R3F using Three.js geometry primitives. No .glb required. AlienScene.tsx constructs the full alien (body, eye, arms, feet, mouth) from spheres and boxes matching the SVG design.
