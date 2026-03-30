Run the full build workflow for a page. Arguments: page slug (e.g. `home`, `kidovation`).

Page to build: $ARGUMENTS

## Pre-flight gates — check all before writing any code

### Gate 1: Page slug valid
- Check that `pages/$ARGUMENTS/` exists.
- If not: tell the user. List available pages. Stop.

### Gate 2: design.md is populated (not template)
- Read `pages/$ARGUMENTS/design.md`.
- If it still contains only template placeholders (no real layout/typography/color decisions): STOP.
- Tell the user: "Design spec hasn't been written yet. Run `/design $ARGUMENTS` first."

### Gate 3: design-system/MASTER.md exists
- If not: STOP. Tell the user to run `/init` first.

### Gate 4: Assets ready
- Read `pages/$ARGUMENTS/assets.md`.
- Check each referenced asset ID against `assets/manifest.md`.
- If any required asset has status `uploaded` (not yet `approved`): warn the user. Ask if they want to proceed anyway or resolve assets first.

### Gate 5: No blocking issues
- Check `memory/issues.md` for open blocking issues on this page.
- If any: list them and stop.

---

## ⚠️ MANDATORY — Read orchestrator before anything else

**Before any build work, Read file: `skills/orchestrate-build.md`**

This file contains:
- The complete skill registry (every skill available for building)
- Signal detection logic — reads design.md and maps signals to specific skills
- The mandatory invocation sequence with exact mechanisms (Read file vs Invoke Skill)
- The law: no code may be written from general knowledge when a skill exists for it
- Skills must ALL be invoked for their category — not just one or two

Follow the orchestrator's steps exactly. Output the Skill Plan. Do not write any code until the Skill Plan is confirmed.

---

## Build workflow (only runs if all gates pass)

Read these before writing any code:
- `pages/$ARGUMENTS/brief.md` (including the `## Copy` section)
- `pages/$ARGUMENTS/design.md`
- `design-system/MASTER.md`
- `memory/preferences.md`
- `memory/decisions/log.md` (relevant decisions for this page)

---

### Step 1 — Skill routing

`web2d/` always runs — it builds the full page foundation. The question is only which enhancement skills to layer on top.

Read `pages/$ARGUMENTS/brief.md` and `pages/$ARGUMENTS/design.md`. For each section, scan for enhancement signals:

**Enhancement signal detection:**

| Signal found | Enhancement skill | Condition |
|---|---|---|
| "3D", "WebGL", "R3F", "interactive model", "canvas scene", "particles", "alien character" | `web3d/` sub-skills | Must create D-3D-NNN decision if none exists |
| "scroll animation", "parallax", "pinned section", "scroll-triggered", "timeline", "sequence" | `motion/gsap-scrolltrigger/` | Must create D-MOT-NNN decision if none exists |
| "page transition", "gesture", "drag", "spring physics", "exit animation" | `motion/` framer-motion | Must create D-MOT-NNN decision if none exists |
| "form", "input", "filter", "search", "cart", "wizard", "multi-step", "dynamic data" | `react-state-management/` | Choose: Zustand (client state) or React Query (server state) |
| "chart", "graph", "data visualization", "dashboard metric" | `ui-ux-pro-max --domain chart` first | Stays within `web2d/` build |
| "hover", "focus", "micro-interaction", "simple fade", "active state" | None — CSS only | Handled within `web2d/` |

**Rules:**
- `web2d/` builds everything — 3D elements are embedded *inside* the 2D layout, not alternatives to it
- A signal in the brief is a hypothesis; a signal in design.md motion intent is a confirmed decision — treat them differently
- If a signal appears but no matching D-NNN decision exists: create it now, before writing any code
- Signals must be explicit — a "hero" section is not automatically 3D

**Output a Skill Plan before writing any code.** Show this to the user:

```
Skill Plan — [page name]
Base: web2d/ runs for all sections.

Section          | +3D element              | +Motion                    | +State  | Notes
-----------------|--------------------------|----------------------------|---------|---------------------------
Hero             | R3F alien (r3f-fundamentals) | —                      | —       | D-DS-002
Ecosystem cards  | —                        | —                          | —       | Static layout
Mission section  | —                        | scroll-fade (gsap)         | —       | D-MOT-001
Event photos     | —                        | —                          | —       | Grid layout
```

If the user disputes any routing decision, resolve it before proceeding.

---

### Step 2 — Populate build.md
Write `pages/$ARGUMENTS/build.md`:
- Component inventory table (section → approach → decision ref → rationale) — derived from Skill Plan
- Interactions and motion spec
- Performance budget (Lighthouse ≥ 90, LCP < 2.5s — adjust per page complexity; 3D scenes: LCP < 3.5s)
- Decision cross-references

---

### Step 3 — Build
Use skills in the order from the Skill Plan. Always build in this sequence per section:
1. `web2d/` — all static layout, UI, text sections first
2. `web3d/` sub-skills — only sections flagged in Skill Plan (see `skills/web3d/guide.md` for sub-skill selection)
3. `motion/` sub-skills — only sections flagged in Skill Plan (see `skills/motion/guide.md` for GSAP vs Framer decision)
4. `react-state-management/` — only if Skill Plan flagged interactive state

**web3d sub-skill selection (if needed):**
- New R3F project → start with `r3f-fundamentals/`
- Loading models → `r3f-loaders/`
- PBR materials → `r3f-materials/`
- Lighting setup → `r3f-lighting/`
- Animation → `r3f-animation/`
- Custom shaders → `r3f-shaders/`
- Post-processing → `r3f-postprocessing/`
- Interaction → `r3f-interaction/`
- Vanilla Three.js (no React) → `threejs-webgl/`

**motion sub-skill selection (if needed):**
- Scroll-triggered, timeline, parallax, pin → `motion/gsap-scrolltrigger/`
- React component transitions, gestures → Framer Motion patterns from `motion/guide.md`
- Simple micro-interactions → CSS only, no skill invocation

---

### Step 4 — Update state
- Update `pages/$ARGUMENTS/state.md` build status.
- Work through the quality gate checklist — tick each item that is genuinely complete.
- Log the session.

### Step 5 — Update memory
- Log new decisions in `memory/decisions/log.md` and `TAXONOMY.md`.
- Log any bugs or implementation caveats in `memory/issues.md` (I-NNN).
- Update `memory/next.md`.
- If this page is complete, update MEMORY.md pages table status.

---

### Step 6 — Screenshot prompt (mandatory after every build)

After all code is written and state is updated, always output this exact block:

```
---
Build output is ready. Now let's verify the geometry.

1. Start your dev server if it isn't running
2. Run this in your terminal:

   node scripts/screenshot.js <url> $ARGUMENTS

   (replace <url> with your local URL, e.g. http://localhost:3000 or http://localhost:3000/$ARGUMENTS)

When it finishes, type: /screenshot $ARGUMENTS
---
```

Do not mark the page `complete` in `state.md` until at least one screenshot audit has been done and its findings logged.
