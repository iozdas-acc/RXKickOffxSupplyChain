# Orchestrate — Build Phase

> This file is read by the `/build` command before any code is written.
> It contains the complete skill registry, signal detection logic, and mandatory invocation sequence.
> Claude MUST follow every step. Skills are not optional suggestions — they are the source of implementation knowledge.

---

## LAW

**Every skill flagged as applicable by signal detection MUST be read/invoked before code is written.**
- `guide.md` skills → use the Read tool on the exact file path listed
- `SKILL.md` skills → use the Invoke Skill tool with the exact skill name listed
- Read the skill output, extract its specific patterns and rules, apply them to the code
- Never write code from general knowledge when a skill exists for it
- When multiple skills apply, read ALL of them before writing any code for that section

---

## Step 1 — Always runs: web2d foundation skills

These run for EVERY page, EVERY build, no exceptions.

### 1a — Web2D guide
**Mechanism:** Read file
**File:** `skills/web2d/guide.md`
**Apply:** Foundation patterns for all static layout, UI, and text sections

### 1b — React best practices
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `react-best-practices`
**Apply:** Effects as escape hatches, derived state, useMemo rules, useRef patterns, controlled components

### 1c — React best practices (Vercel)
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `react-best-practices-vercel`
**Apply:** 57-rule performance guide — eliminate waterfalls, bundle size, server perf, re-renders. Priority: eliminate waterfalls first.

### 1d — Composition patterns
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `composition-patterns`
**Apply:** Component API patterns, compound components, explicit variants, no boolean prop proliferation

### 1e — Performance guide
**Mechanism:** Read file
**File:** `skills/performance/guide.md`
**Apply:** Loading strategy, image optimization, code splitting, Core Web Vitals targets

### 1f — Vercel React best practices (supplementary)
**Mechanism:** Read file
**File:** `skills/performance/vercel-react-best-practices.md`
**Apply:** Next.js-specific performance patterns

---

## Step 2 — Signal detection

Read `pages/<slug>/design.md` and `pages/<slug>/brief.md`. Scan every section for the signals below.
A signal in design.md motion intent = confirmed decision. A signal in brief only = hypothesis (note in Skill Plan).

For each signal found, ALL skills listed in the "Invoke" column are mandatory.

---

## Signal → Skill routing table

### 3D / WebGL signals

| Signal | Mandatory skills | Skip |
|--------|-----------------|------|
| Any 3D, R3F, Canvas, WebGL, alien, character | `web3d-guide` + `r3f-fundamentals` + `r3f-best-practices` | — |
| Procedural geometry, shapes, body parts, mesh | + `r3f-geometry` | — |
| Material, colour on mesh, PBR, MeshStandard | + `r3f-materials` | — |
| Lighting, ambient, directional, shadows, env | + `r3f-lighting` | — |
| Animation, float, loop, useFrame, movement | + `r3f-animation` | — |
| Particle system, instanced mesh, many objects | + `r3f-geometry` (instancing section) | — |
| Click, hover, drag on 3D object, raycasting | + `r3f-interaction` | — |
| .glb, .gltf, model file, useGLTF | + `r3f-loaders` | — |
| Texture, image on mesh, useTexture, HDR env | + `r3f-textures` | — (system-reminder only) |
| Bloom, DOF, post-processing, glow effect | + `r3f-postprocessing` | — |
| Custom GLSL, shader, vertex shader | + `r3f-shaders` | — |
| Physics, collision, gravity, rigid body | + `r3f-physics` | — (system-reminder only) |
| Multi-library (Three.js + GSAP + R3F) | + `web3d-integration-patterns` | — |

**Skill names and mechanisms:**

| Skill | Mechanism | Path / Name |
|-------|-----------|-------------|
| web3d-guide | Read file | `skills/web3d/guide.md` |
| r3f-fundamentals | Invoke Skill | `r3f-fundamentals` |
| r3f-best-practices | Invoke Skill | `r3f-best-practices` |
| r3f-geometry | Invoke Skill | `r3f-geometry` |
| r3f-materials | Invoke Skill | `r3f-materials` |
| r3f-lighting | Invoke Skill | `r3f-lighting` |
| r3f-animation | Invoke Skill | `r3f-animation` |
| r3f-interaction | Invoke Skill | `r3f-interaction` |
| r3f-loaders | Invoke Skill | `r3f-loaders` |
| r3f-postprocessing | Invoke Skill | `r3f-postprocessing` |
| r3f-shaders | Invoke Skill | `r3f-shaders` |
| r3f-physics | Invoke Skill | `r3f-physics` |
| react-three-fiber (general) | Read file | `skills/web3d/react-three-fiber/SKILL.md` |
| web3d-integration-patterns | Read file | `skills/web3d/web3d-integration-patterns/SKILL.md` |

---

### Motion / Animation signals

| Signal | Mandatory skills |
|--------|-----------------|
| Any scroll animation, reveal, ScrollTrigger, parallax, pin, count-up, stagger | `motion-guide` + `gsap-scrolltrigger` |
| Page transition, gesture, drag, spring, Framer Motion | `motion-guide` (Framer section) |
| CSS only micro-interaction (hover, focus, active) | No skill — CSS only |

**Skill names and mechanisms:**

| Skill | Mechanism | Path / Name |
|-------|-----------|-------------|
| motion-guide | Read file | `skills/motion/guide.md` |
| gsap-scrolltrigger | Read file | `skills/motion/gsap-scrolltrigger/SKILL.md` |
| gsap api reference | Read file | `skills/motion/gsap-scrolltrigger/references/api_reference.md` |
| gsap common patterns | Read file | `skills/motion/gsap-scrolltrigger/references/common_patterns.md` |

---

### State management signals

| Signal | Mandatory skills |
|--------|-----------------|
| Client state, shared state, Zustand, global | Invoke Skill: `react-state-management` |
| Server data, fetch, cache, React Query | Invoke Skill: `react-state-management` |
| Form, controlled input, validation | Invoke Skill: `react-state-management` (form section) |

---

## Step 3 — Always runs: accessibility and quality

After signal detection skills are read, before writing code:

### 3a — Web design guidelines
**Mechanism:** Invoke Skill (Skill tool)
**Skill name:** `web-design-guidelines`
**Apply:** Audit planned component structure against 100+ rules before writing

### 3b — Contrast checker (if new color combinations)
**Mechanism:** Read file
**File:** `skills/audits/contrast-checker/SKILL.md`
**Apply:** Verify all text/bg color pairs meet WCAG AA before implementing

### 3c — Link purpose (if links/CTAs are in the section)
**Mechanism:** Read file
**File:** `skills/audits/link-purpose/SKILL.md`
**Apply:** All link text must be descriptive and context-aware

### 3d — Accesslint refactor (after code is written, before committing)
**Mechanism:** Read file
**File:** `skills/audits/accesslint-refactor/SKILL.md`
**Apply:** Self-audit for missing alt text, ARIA labels, semantic HTML

---

## Step 4 — Output: Skill Plan

Before writing any code, output the Skill Plan table:

```
Skill Plan — [page-slug]

Foundation (always):
  ✓ web2d/guide.md
  ✓ Invoke: react-best-practices
  ✓ Invoke: react-best-practices-vercel
  ✓ Invoke: composition-patterns
  ✓ performance/guide.md
  ✓ vercel-react-best-practices.md

3D (signals detected: [list signals]):
  ✓ web3d/guide.md
  ✓ Invoke: r3f-fundamentals
  ✓ Invoke: r3f-geometry       ← [reason]
  ✓ Invoke: r3f-materials      ← [reason]
  ✓ Invoke: r3f-lighting       ← [reason]
  ✓ Invoke: r3f-animation      ← [reason]
  ✗ r3f-interaction            ← no interaction signals
  ✗ r3f-loaders                ← no .glb files
  ✗ r3f-postprocessing         ← no post-fx planned
  ✗ r3f-shaders                ← no custom GLSL

Motion (signals detected: [list signals]):
  ✓ motion/guide.md
  ✓ gsap-scrolltrigger/SKILL.md
  ✓ gsap api_reference.md
  ✓ gsap common_patterns.md

Quality (always):
  ✓ Invoke: web-design-guidelines
  ✓ contrast-checker/SKILL.md
  ✓ link-purpose/SKILL.md
  ✓ accesslint-refactor/SKILL.md (post-build)
```

Show this to the user. Resolve any disputes before proceeding to code.

---

## Step 5 — Execute skills in order, then write code

**Order matters:**
1. Foundation skills (web2d, react best practices, composition, performance)
2. 3D skills (all flagged, in order: guide → fundamentals → geometry → materials → lighting → animation → others)
3. Motion skills (guide → gsap-scrolltrigger → references)
4. State skills (if flagged)
5. Quality skills (web-design-guidelines, contrast, link-purpose)
6. Write code — informed by all skills above
7. Self-audit with accesslint-refactor

**Never write code between skills.** Complete all skill reading/invocation for a section before writing that section's code.

---

## Complete skill registry

| Skill | Path / Invoke name | Type | When |
|-------|--------------------|------|------|
| web2d guide | `skills/web2d/guide.md` | Read | Always |
| react-best-practices | `react-best-practices` | Invoke | Always |
| react-best-practices-vercel | `react-best-practices-vercel` | Invoke | Always |
| composition-patterns | `composition-patterns` | Invoke | Always |
| performance guide | `skills/performance/guide.md` | Read | Always |
| vercel react best practices | `skills/performance/vercel-react-best-practices.md` | Read | Always |
| web3d guide | `skills/web3d/guide.md` | Read | 3D signal |
| r3f-fundamentals | `r3f-fundamentals` | Invoke | 3D signal |
| r3f-best-practices | `r3f-best-practices` | Invoke | 3D signal |
| r3f-geometry | `r3f-geometry` | Invoke | geometry signal |
| r3f-materials | `r3f-materials` | Invoke | material signal |
| r3f-lighting | `r3f-lighting` | Invoke | lighting signal |
| r3f-animation | `r3f-animation` | Invoke | animation signal |
| r3f-interaction | `r3f-interaction` | Invoke | interaction signal |
| r3f-loaders | `r3f-loaders` | Invoke | .glb/model signal |
| r3f-postprocessing | `r3f-postprocessing` | Invoke | post-fx signal |
| r3f-shaders | `r3f-shaders` | Invoke | GLSL signal |
| r3f-physics | `r3f-physics` | Invoke | physics signal |
| react-three-fiber | `skills/web3d/react-three-fiber/SKILL.md` | Read | R3F general |
| web3d-integration-patterns | `skills/web3d/web3d-integration-patterns/SKILL.md` | Read | multi-lib signal |
| motion guide | `skills/motion/guide.md` | Read | motion signal |
| gsap-scrolltrigger SKILL | `skills/motion/gsap-scrolltrigger/SKILL.md` | Read | scroll/GSAP signal |
| gsap api reference | `skills/motion/gsap-scrolltrigger/references/api_reference.md` | Read | GSAP signal |
| gsap common patterns | `skills/motion/gsap-scrolltrigger/references/common_patterns.md` | Read | GSAP signal |
| react-state-management | `react-state-management` | Invoke | state signal |
| web-design-guidelines | `web-design-guidelines` | Invoke | Always |
| contrast-checker | `skills/audits/contrast-checker/SKILL.md` | Read | new color combos |
| link-purpose | `skills/audits/link-purpose/SKILL.md` | Read | links/CTAs present |
| accesslint-refactor | `skills/audits/accesslint-refactor/SKILL.md` | Read | Post-build always |
| design-motion-principles | `design-motion-principles` | Invoke | motion review |
