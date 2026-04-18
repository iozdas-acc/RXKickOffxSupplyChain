# Spec — Sainsbury's × Accenture presentation redesign

**Purpose:** single source of truth for subagents executing the redesign. Read this before any work. Each task below is scoped so it can run in its own subagent context.

**Source plan (human-written):** `/Users/izgin.ozdas/Documents/RX/General/Kick-Off/sainsburys_accenture_redesign_plan.html` — dark sci-fi → light/white premium, cubes → supermarket metaphor.

**Project conventions to respect:** `CLAUDE.md` at repo root. Tokens live in `design-system/MASTER.md`, not a fresh `tokens.css`. Every page has `pages/<slug>/{brief,design,build,state,screenshots,assets}.md`. Screenshot audit after every build.

---

## Current state (as of 2026-04-18)

- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind, `@react-three/fiber`.
- App root: `site/`. Single-page presentation at `site/app/page.tsx` — 5 chapters on one route, paginated by state (`chapter` index).
- Chapter components: `site/components/chapters/Chapter01..05.tsx`.
- Shell: `site/components/presentation/{NavBar,HeroEntrance}.tsx`, `site/components/intro/Hero.tsx`.
- 3D: one file — `site/components/three/SupermarketScene.tsx` (452 lines, switches geometry per chapter). Currently generic cubes.
- Palette: still dark (`#06061A` in `page.tsx:76,92`; vignette at `page.tsx:99-104`). Phase 1 not yet executed.
- Design tokens: `design-system/MASTER.md` exists (read before writing palette — do not fork).
- Page folders already scaffolded: `pages/{intro,the-project,the-learning,the-model,the-template}/`. Each chapter maps to one page folder — use them for briefs/design/build notes.

---

## Target state

**Palette**
- Base `#FAFAF8`, text `#1A1A1A`.
- Primary Sainsbury's orange `#F06C00`, secondary Accenture purple `#A100FF`.
- Card surface `#F0EEE8` with 0.5px tertiary border.
- Per-chapter accent zones: 1 orange, 2 teal, 3 green, 4 purple, 5 orange→purple gradient.

**Typography**
- Keep oversized editorial scale already in place. Flip from white-on-dark to dark-on-light. Orange accent words stay.

**3D (supermarket metaphor, per chapter)**
- Ch.1 Hero — product silhouettes (tin/packet/bottle) drifting, settling onto shelf, warm orange key light.
- Ch.2 — conveyor belt with items moving Mobilise → Delivery, teal lit.
- Ch.3 — slow trolley (left) vs fast self-checkout scan beam (right), green accent.
- Ch.4 — three receding aisles with overhead signs "H1 / H2 / H3", purple wash.
- Ch.5 — lit basket containing 3 items (Story Arc, JAR+AI, Hybrid), orange→purple gradient finish.

**Constraints**
- Reuse existing physics/float logic from current cube code — swap geometry, not motion system.
- No stock-photo grocery realism. Abstracted silhouettes, rounded low-poly, premium studio lighting.
- Mobile: reduce instance counts + DPR cap.

---

## Decisions to log before work starts (serial, blocking)

Add to `memory/decisions/log.md` and `memory/decisions/TAXONOMY.md`:

- `D-VIS-NNN` — Light palette adopted, supersedes prior dark direction.
- `D-3D-NNN` — Supermarket metaphor locked. Abstracted silhouettes, not realistic props.
- `D-MOT-NNN` — Reuse existing float/settle physics for all 5 scenes.

If `D-ARCH-001` (stack) isn't already recorded, log it now: Next.js 15 App Router, R3F.

---

## Execution phases

**Legend:** 🔒 blocking · ⚡ parallelizable · 👥 subagent-sized

### Phase 1 🔒 — Token layer (one subagent, must finish first)

**Owner:** single subagent. Everything else blocks on this.

**Scope:**
- Read `design-system/MASTER.md`. Update (don't replace) with the target palette, card surface, per-chapter accent map, dark→light type treatment.
- Wire tokens into `site/app/globals.css` + `site/tailwind.config.ts`. No hardcoded hex anywhere in `site/` after this task.
- Add one semantic token per chapter accent: `--accent-ch1` … `--accent-ch5`.

**Out of scope:** any component changes, any 3D work.

**Done when:**
- `design-system/MASTER.md` reflects the full target palette + per-chapter accents.
- `globals.css` exposes all tokens as CSS variables.
- `grep -E "#[0-9a-fA-F]{3,6}" site/app site/components` returns no hardcoded hex (except SVG assets and the 3D scene — 3D gets cleaned in Phase 3).
- Append `P-TOK-NNN` to `memory/preferences.md`: "All colours via tokens — no inline hex in components."

---

### Phase 2 ⚡ — Palette migration (fan out after Phase 1)

Each task below is one subagent. They do not share state and can run in parallel.

#### 2A 👥 — Page shell
- Files: `site/app/page.tsx`, `site/app/layout.tsx`.
- Flip background `#06061A` → token `--color-background-primary`. Remove dark vignette at `page.tsx:99-104` or re-tune it for light (subtle warm wash, not radial darkening).
- Out of scope: 3D canvas contents (Phase 3), chapter components (2C).

#### 2B 👥 — Navigation + entrance
- Files: `site/components/presentation/NavBar.tsx`, `site/components/presentation/HeroEntrance.tsx`, `site/components/intro/Hero.tsx`.
- Dark-on-light treatment. Sticky top nav stays.
- Numbered nav 1–5 gets per-chapter accent when active (read token `--accent-chN`).

#### 2C1–2C5 👥 — One subagent per chapter
- Files per task: `site/components/chapters/ChapterNN.tsx` only.
- Flip text colours, card surfaces, accent tints to the chapter's assigned zone.
- Do not touch sibling chapters. Do not touch shell or 3D.
- Each subagent updates `pages/<slug>/design.md` with a one-line record of the new palette applied.

**Coordination:** all 2x tasks read `design-system/MASTER.md` only — never define a new colour. If a colour is missing from tokens, block and flag back to Phase 1.

---

### Phase 3 ⚡ — 3D scene rebuild

**3.0 🔒 — Primitive library (serial prereq)**

One subagent. Creates reusable meshes. Blocks 3.1–3.5.

- New folder: `site/components/three/primitives/`.
- Files: `Tin.tsx`, `Packet.tsx`, `Bottle.tsx`, `Basket.tsx`, `Shelf.tsx`, `ConveyorBelt.tsx`, `AisleSign.tsx`, `Trolley.tsx`, `Scanner.tsx`.
- Low-poly, abstracted silhouettes. Rounded edges. Expose `color`, `accent`, `scale` props. No textures beyond roughness/metalness.
- Shared lighting rig exported from `primitives/StudioLights.tsx` (key/fill/rim tuned for light world).
- Done when each primitive renders standalone in a `*.stories.tsx` (or minimal mount page under `site/app/_dev/primitives/`) and matches the target aesthetic.

**3.1–3.5 👥 ⚡ — One subagent per chapter scene (parallel after 3.0)**

Refactor `site/components/three/SupermarketScene.tsx` into a per-chapter dispatcher. Each subagent owns one subscene.

- **3.1 — HeroScene** (Ch.1): products drift → settle on shelf. Reuse existing float physics.
- **3.2 — ConveyorScene** (Ch.2): items translate along belt; tie position to the 5-stage delivery state.
- **3.3 — PaceScene** (Ch.3): split stage — slow trolley left, fast scan beam right.
- **3.4 — AislesScene** (Ch.4): three receding aisles, overhead signs `H1/H2/H3`.
- **3.5 — BasketScene** (Ch.5): lit basket, 3 items inside, orange→purple gradient rim light.

**Per-scene acceptance:**
- Uses only primitives from 3.0 + palette tokens. No inline hex.
- Lighting matches `StudioLights` rig; no scene overrides the world colour.
- Respects `prefers-reduced-motion` — static fallback pose.
- Mobile: instance count halved when `window.innerWidth < 768`; DPR capped at 1.5 (already set in `page.tsx:91`).

**Structural refactor of `SupermarketScene.tsx`:**
- Reduce to a dispatcher that mounts one subscene based on `chapter` prop.
- Shared camera rig + lights hoisted to dispatcher. Per-scene content is a child component from `site/components/three/scenes/`.
- One subagent should handle this dispatcher refactor before 3.1–3.5 fan out, OR 3.0 owner produces it alongside primitives.

---

### Phase 4 🔒 — Screenshot audit + QA

Per project law (`CLAUDE.md` §Spatial awareness): every page gets a screenshot round after build.

- Run `node scripts/screenshot.js <url> <slug>` for each chapter (or the single presentation URL capturing all five via navigation).
- Save rounds to `pages/<slug>/screenshots/` and log in `pages/<slug>/screenshots.md`.
- Open blocking issues in `memory/issues.md` as `I-NNN` for any geometry/contrast/mobile regressions.
- Do not mark any `state.md` as `complete` until one clean audit round passes.

---

## Parallelization map

```
Phase 1 (1 agent) ──► Phase 2 (fan out to 7 agents: 2A, 2B, 2C1..2C5) ──►
Phase 3.0 (1 agent) ──► Phase 3.1..3.5 (fan out to 5 agents) ──►
Phase 4 (1 agent, screenshot + audit)
```

Theoretical min wall-clock: 4 serial hops. Max concurrency: 7 agents in Phase 2, 5 in Phase 3.1–3.5.

---

## Per-subagent brief template

When spawning a subagent for any task above, pass this block verbatim and fill the `{...}` slots:

```
Read first: CLAUDE.md, memory/specs/sainsburys-redesign-plan.md, design-system/MASTER.md,
            pages/{slug}/{brief.md,design.md}.

Task: {Phase/task id + one-line goal, e.g. "Phase 2C3 — repaint Chapter03 to light palette, teal accent zone"}

Files you may modify: {explicit list}
Files you may read only: {explicit list}
Out of scope (do not touch): {explicit list}

Acceptance:
- {bullet list from the phase spec above}
- No hardcoded hex added.
- Update pages/{slug}/design.md with one line recording the change + date.
- Report: files changed, any blockers, any tokens you needed but didn't find.

Do not run npm install, do not start dev server, do not create commits.
```

---

## Risks + open questions

- **Cheesy metaphor risk** — conveyor-as-timeline, trolley-vs-scanner tips corporate-stock quickly. Mitigate via abstraction (silhouettes only, no labels/logos on products). Flag for review after 3.1 lands — if it reads literal, retreat to pure-form geometry and keep the metaphor in copy only.
- **3D lighting/palette coupling** — if palette shifts mid-flight, all 5 scenes need re-tuning. Do not start Phase 3 until Phase 2 visuals are signed off.
- **Text-on-tinted-zone contrast** — per-chapter tints can push WCAG AA below threshold. Each Phase 2C task must run `skills/audits/contrast-checker` before closing.
- **Reduced motion** — current physics doesn't gate on `prefers-reduced-motion`. Phase 3.0 must add the gate in `StudioLights`/scene mount.
- **Mobile perf** — 5 scenes + persistent canvas on low-end Android is the biggest risk. Phase 4 must include a Lighthouse mobile run on each chapter.
