# Decisions — Full Log

> Append only. Never delete. Mark superseded entries with `[SUPERSEDED by: D-XXX-NNN]`.
> For the categorical index and ID registry, see `TAXONOMY.md`.
>
> Format per entry:
> ```
> ## D-[CATEGORY]-[NNN] — [Title]
> - Date: YYYY-MM-DD
> - Status: accepted | rejected | pending | superseded
> - Supersedes: D-XXX-NNN (if replacing a prior decision)
> - Decision: [what was decided]
> - Rationale: [why — include rejected alternatives and their reasons]
> - Affects: global | page: <name> | component: <name>
> ```
> Rejected decisions are as important as accepted ones.

---

## Layout `LAY`

## D-LAY-001 — the-learning hero: Two Speeds split-screen
- Date: 2026-04-16
- Status: accepted
- Decision: `the-learning` hero uses a full-viewport dark split-screen with two panels that animate apart on mount, revealing an orange gap line between them. Left: "We move fast." Right: "You need time."
- Rationale: The structural insight IS the visual metaphor. The gap between the panels makes the pace mismatch tangible — no consulting site would animate a layout split as its core argument. Direction B scored 53/60 vs Direction A (51) and Direction C (44). Won on Distinctiveness (10/10) and Benchmark alignment (9/10). Rejected Direction A (static editorial power, no signature element) and Direction C (standard from-to table — no memorable moment).
- Affects: page: the-learning / component: LearningHero

---

## Architecture `ARCH`

## D-ARCH-001 — Next.js as site framework
- Date: 2026-04-16
- Status: accepted
- Decision: Use Next.js 15 (App Router) as the site framework, deployed to Vercel.
- Rationale: Five-page multi-route experience with immersive transitions. Next.js is already scaffolded in `site/` with R3F, GSAP, and Tailwind installed — zero setup cost. `use client` handles all interactive/3D sections. Rejected Vite+React (SPA routing sufficient but Next.js already in place); rejected Astro (minimal JS philosophy misaligned with immersive motion/3D ambition).
- Affects: global

---

## Design System `DS`

## D-DS-001 — Dark immersive Pollen360 aesthetic
- Date: 2026-04-10
- Status: superseded
- Supersedes: —
- Superseded by: D-DS-002
- Decision: Single-page immersive experience with dark `#06061A` canvas, R3F supermarket scene, glass-morphism cards, Space Grotesk + DM Sans + Space Mono typography, chapter-specific accent colors (orange→cyan→emerald→purple), 3D particles + InstancedMesh product boxes.
- Rationale: Informal decision logged retroactively. Approach was borrowed wholesale from Pollen360 (Sainsbury's/Accenture internal demo). Never formally recorded when made.
- Affects: global

## D-DS-002 — RX + Sainsbury's light executive aesthetic (multi-reference synthesis)
- Date: 2026-04-16
- Status: accepted
- Supersedes: D-DS-001
- Decision: Light-mode executive presentation grounded in A-MOCK-001 tokens (`#F06C00` primary, `#A100FF` accent, horizon cyan/emerald/purple, Geist, `#FAFAFA` background). Animations derive from registered A-REF-001..012 reference components (SxA + 3HA). Three external references contribute extractable patterns: pierrelouis.design (primary weight — selective delight, Lottie micro-interactions, sound on key CTAs, Easter-egg rewards), chiaraluzzana.com (numbered hierarchy, whitespace rhythm), uneminiaventure.fr/en (scroll-driven chapter progression, geometric SVG accents, choice-framed CTAs).
- Rationale: D-DS-001 locked the site to Pollen360's dark immersive aesthetic, which contradicts the actual brand source of truth (A-MOCK-001 is a light co-branded executive palette) and ignored the 12 validated A-REF-NNN animation components already registered. The new `/run` quality benchmark (D-QB-001) scores synthesis across these three references AND guards against wholesale imitation via a blend check. Primary weight on pierrelouis is explicit user preference for its micro-interaction language — NOT an instruction to copy its character/sound/gamification wholesale (blend check enforces this).
- Affects: global — requires rebuild of `site/` (current build was produced against D-DS-001 and will score <50 against the new benchmark)

## D-DS-003 — Per-chapter accent zones + token operationalisation
- Date: 2026-04-18
- Status: accepted
- Supersedes: —
- Extends: D-DS-002
- Decision: Operationalise D-DS-002 into a named token architecture across `design-system/MASTER.md`, `site/app/globals.css`, and `site/tailwind.config.ts`. Introduce per-chapter accent tokens `--accent-ch1..5`: Ch.1 `--sainsburys-orange`, Ch.2 `--horizon-1` (teal), Ch.3 `--horizon-2` (green), Ch.4 `--horizon-3` (purple), Ch.5 `--accenture-purple` + `--accent-ch5-gradient` (orange→purple). Add surface-card / surface-tinted utility classes to replace dark glass panels. Ban hex literals outside `site/app/globals.css` (P-COLOR-001). Chapters consume colours only via `--accent-chN` indirection (P-TECH-001).
- Rationale: D-DS-002 locked the aesthetic but left the token layer in dark-mode shape and left plan-HTML zone colours (orange/teal/green/purple/gradient) unmapped to registered brand tokens. Phase 2 fans out to 7 parallel subagents migrating 5 chapters + shell + nav/entrance — a semantic accent token per chapter means zone tuning is a one-line change in `globals.css`, not a five-file search-and-replace. Chapter→horizon mapping chosen because horizon hues match the plan's teal/green/purple within perceptible tolerance and introducing a second parallel system would dilute the registered semantics. Indirection (`--accent-chN` not `--horizon-N`) preserves horizon semantics for Ch.4 while letting Ch.2/3 borrow the hues without implying horizon meaning.
- Affects: global — `site/app/globals.css`, `site/tailwind.config.ts`, `design-system/MASTER.md`. Unblocks Phase 2 of `memory/specs/sainsburys-redesign-plan.md`.

---

## Layout `LAY`

_(No decisions yet)_

---

## Motion `MOT`

## D-MOT-001 — Reuse float/settle physics, add reduced-motion gate
- Date: 2026-04-18
- Status: accepted
- Supersedes: —
- Decision: All five new chapter 3D scenes reuse the float/settle physics from the current cube animation. Geometry swaps (cubes → supermarket primitives per D-3D-001); the motion system itself is untouched. Add a `prefers-reduced-motion` gate at the scene-dispatcher level so the reduced-motion fallback is a single static pose, not five per-scene implementations.
- Rationale: The existing physics is already tuned and visually approved. Plan HTML explicitly calls it out ("same physics as the cube animation, new geometry"). Rewriting it five times adds risk for zero visible gain. Reduced-motion support was missing in the dark build — this closes that gap once, centrally.
- Affects: component: SupermarketScene, components/three/primitives/*, components/three/scenes/*

---

## 3D / WebGL `3D`

## D-3D-001 — Supermarket primitive library (abstracted silhouettes)
- Date: 2026-04-18
- Status: accepted
- Supersedes: —
- Decision: Replace generic cube geometry in `site/components/three/SupermarketScene.tsx` with a reusable low-poly primitive library at `site/components/three/primitives/`: `Tin`, `Packet`, `Bottle`, `Basket`, `Shelf`, `ConveyorBelt`, `AisleSign`, `Trolley`, `Scanner`, plus a shared `StudioLights` rig tuned for the light world. Abstracted silhouettes only — rounded low-poly, PBR materials with roughness/metalness, no textures, no brand labels, no stock-photo realism. Primitives expose `color` / `accent` / `scale` props so scenes control palette via `--accent-chN` tokens.
- Rationale: Source plan HTML mandates the supermarket metaphor (tins, conveyor, trolley, aisles, basket). Scene rebuild fans out to 5 parallel subagents (one per chapter) — a shared primitive library is the serial prereq that keeps parallelisation safe (no geometry divergence across scenes). Rejected "per-scene bespoke geometry" because identical tin/bottle code would scatter across 5 files. Rejected realistic grocery props because the plan warns against "generic floating cubes" — realism is the opposite failure mode (stock-photo cheesy). Abstraction + lighting discipline is the mitigation for the metaphor-cheesy risk flagged in the spec.
- Affects: global — `site/components/three/**`. Blocks Phase 3.1–3.5 fan-out in `memory/specs/sainsburys-redesign-plan.md`.

---

## Performance `PERF`

_(No decisions yet)_

---

## Tooling `TOOL`

_(No decisions yet)_

---

## Content `CONT`

_(No decisions yet)_

---

## Quality Benchmark `QB`

## D-QB-001 — Multi-reference synthesis benchmark supersedes Pollen360-locked rubric
- Date: 2026-04-16
- Status: accepted
- Supersedes: (prior `memory/quality-benchmark.md` — file-level, not a logged decision)
- Decision: `memory/quality-benchmark.md` rewritten as a multi-reference synthesis harness. Five dimensions (each /20): Brand fidelity, Animation fidelity, Narrative structure, Signature element, Polish & completeness. Every 16–20 cell cites either a specific A-MOCK-NNN token, a specific A-REF-NNN component, a named external reference + extracted pattern, or a numeric threshold — nothing is scored on taste alone. A mandatory blend check caps Polish at 14/20 if the page is visually indistinguishable from any single reference (including pierrelouis despite its primary weight).
- Rationale: The prior rubric locked the loop to Pollen360 patterns (cinematic GSAP sequences, glass-morphism, orbital carousels, 3D supermarket scenes). The project is RX + Sainsbury's — a light executive co-branded experience with 12 already-validated animation components (A-REF-001..012) and three user-named reference sites that pull in distinct directions. Under the old rubric the loop reinforced imitation and could not reward brand fidelity or reference-component reuse. The new rubric was authored via the `authoring-quality-benchmark` skill (`~/.claude/skills/authoring-quality-benchmark/SKILL.md`).
- Affects: global — every `/run` loop iteration from this point scores against the new rubric


