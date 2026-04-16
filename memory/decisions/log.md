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

---

## Layout `LAY`

_(No decisions yet)_

---

## Motion `MOT`

_(No decisions yet)_

---

## 3D / WebGL `3D`

_(No decisions yet)_

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


