# WebContext — Controller

This file defines the laws of the system. It does NOT store state.
All state lives in `memory/`, `assets/`, and `pages/`.

---

## Orchestration

### Commands

Slash commands live in `.claude/commands/`. Run them by typing the command name.

| Command | When to use |
|---------|------------|
| `/run` | **Full pipeline with ralph loops.** Orchestrates plan → init → design (human gate) → build → screenshot loops for all pages in priority order. Autonomous except for design approval and medium/low issue review. |
| `/plan` | Site architecture + content strategy. Run at start and whenever structure or content changes. Re-runnable — diffs against existing state. |
| `/init` | Start of any session, or when unsure of project state. Checks all gates, generates missing setup. |
| `/status` | Full project dashboard — pages, assets, decisions, blockers, next actions. |
| `/design [page]` | Design workflow for a specific page. Checks gates before starting. |
| `/build [page]` | Build workflow for a specific page. Checks gates before starting. |
| `/new-page [slug]` | Scaffold a new page, write brief, update sitemap, register in memory. |
| `/sync-assets` | Register any files in `assets/raw/` that aren't in the manifest yet. |
| `/screenshot [page]` | Capture mobile/tablet/desktop screenshots, run spatial audit, save findings to `state.md`. Run after every build. |

### Spatial awareness law — enforced after every build

After any `/build` output, Claude MUST:
1. Tell the user to run `node scripts/screenshot.js <url> <slug>`
2. Wait for them to type `/screenshot <slug>`
3. Read `pages/<slug>/screenshots.md` for visual history, then load and analyse the new screenshots
4. Run the spatial audit, save findings to `pages/<slug>/screenshots.md` and `state.md`
5. Ask if they want fixes applied — all fixes flow through the issue classification system
6. Only mark a page `complete` after at least one screenshot audit passes with no blocking geometry issues

Before any fix work on an existing page, Claude must read `pages/<slug>/screenshots.md` first. Never touch code without visual context.

**A page built without a screenshot audit is not done. No exceptions.**

### Workflow gates — enforced before design or build work

These gates MUST be checked before any design or build action. If a gate fails, stop and tell the user what is missing. Do not proceed until it is resolved.

| Gate | Check | Blocks |
|------|-------|--------|
| **G-1** | `.impeccable.md` exists and has real content | everything |
| **G-2** | `.agents/product-marketing-context.md` exists and has real content | everything |
| **G-3** | `memory/sitemap.md` exists and has real content | design + build |
| **G-4** | `design-system/MASTER.md` exists | design + build |
| **G-5** | `pages/<slug>/brief.md` has real content | design for that page |
| **G-6** | `pages/<slug>/design.md` is populated (not template) | build for that page |
| **G-7** | No `blocking` issues in `memory/issues.md` for the page | design + build for that page |

**G-3 resolution:** Run `/plan`. It will map the site structure, run content strategy, and scaffold all page folders.
**G-4 resolution:** If `design-system/MASTER.md` is missing, ask the user: "Ready to generate the design token system? I'll run `ui-ux-pro-max --design-system --persist` now."

### What Claude must never do without gates passing

- Write any CSS, design tokens, or layout decisions without `design-system/MASTER.md` existing
- Build any component without a populated `pages/<slug>/design.md`
- Start a new page without a brief — even one sentence is enough to unblock G-5
- Design or build any page without first reading `memory/sitemap.md` — every page exists in context of the whole site

---

## New project workflow

This is the canonical sequence for every new website. Follow it in order. Do not skip phases.

When a new session opens and `memory/MEMORY.md` is empty or contains only template content, Claude must detect this is a new project and guide the user through this workflow from Phase 1.

---

### Phase 0 — Gather before you open Claude Code

Collect everything you have before starting. The more context you bring in, the less Claude needs to ask.

**What to gather:**
- Brand files: logos (SVG/PNG), brand guidelines (PDF), color palette references
- Visual references: Figma exports, Mural screenshots, mood boards, competitor screenshots — export/screenshot manually, no live integration
- Content: copy docs, existing page text, decks, vision statements, mission statements
- Photos: real event photos, team headshots, product images — never use stock
- Site structure: any wireframes, sitemap sketches, UX ideas (PDF or screenshot)
- Existing site: old site code or screenshots — for content inventory only, not patterns

**Where to put it:** All of it goes into `assets/raw/` before starting.

---

### Phase 1 — Context ingestion

> Goal: Claude understands who the client is, what they're building, and why.

**Step 1.1 — Register assets**
```
/sync-assets
```
Walks through every file in `assets/raw/` and logs it in `assets/manifest.md` with an ID, description, and page assignment. Do this before anything else so Claude knows what reference material exists.

**Step 1.2 — Fill context files**

Two files must be populated before any design or copy work can begin:

| File | What it is | How to fill it |
|------|-----------|----------------|
| `.impeccable.md` | Brand personality, audience, visual direction, hard constraints | Paste or describe context — Claude writes the file and asks gap questions |
| `.agents/product-marketing-context.md` | Product, proof points, audience objections, CTA, voice | Paste or describe context — Claude writes the file and asks gap questions |

Give Claude whatever you have (brand docs, a deck, a brief, a description) and it will write both files from that, then confirm before saving. Claude will ask only what the context doesn't already answer.

**Step 1.3 — Plan the site**
```
/plan
```
Run content strategy, define the page hierarchy and user journey, scaffold all page folders, write `memory/sitemap.md`. `/plan` reads all assets already registered — drop a sitemap PDF or wireframe into `assets/raw/` first and it will derive the structure from that.

**`/plan` is re-runnable at any time.** When the site structure or content changes, run it again. It diffs against existing state, proposes what would change, and flags affected pages for revision. It never destroys existing work.

**Tech stack selection — required step inside every `/plan` run**

`/plan` MUST surface a tech stack proposal before writing any architecture. Claude evaluates the project signals and presents options. User confirms. Decision is locked as `D-ARCH-001` before planning continues.

**Signals to evaluate:**

| Signal | What to check |
|--------|--------------|
| Page count | How many pages/routes does this site need? |
| SEO requirement | Is this public-facing and searchable? |
| Content type | Mostly static copy, or dynamic/CMS-driven? |
| Interactivity | 3D, complex state, forms, real-time? |
| Deployment target | Known host? Vercel, static, custom server? |
| Handoff | Will non-devs maintain it? Simpler = better |

**Options to surface (always show all relevant ones with a one-line tradeoff):**

| Option | Stack | Suggest when |
|--------|-------|-------------|
| A | Next.js | 3+ pages, public site, SEO matters, 3D compatible (`use client`), standard choice for handoff |
| B | Vite + React | SPA or internal tool, 1–2 views, no SSR needed, lightest setup |
| C | Astro | Content-heavy, minimal JS, blog/docs/marketing, fastest static output |
| D | Remix | Form-heavy, real-time data, complex server mutations |
| E | SvelteKit | Performance-critical, smallest bundle priority, team knows Svelte |
| F | Plain HTML/CSS/JS | Single landing page, zero interactivity, fastest delivery |

**Presentation format — Claude must use this exact format:**

```
Tech stack options for [project name]:

→ [A] Next.js       — [one-line reason specific to this project]
  [B] Vite + React  — [one-line reason specific to this project]
  [C] ...

Recommended: A — confirm or pick another.
```

**Rules:**
- Claude proposes, user confirms — Claude never picks without confirmation
- Only surface options that are plausible for this project (max 3–4)
- After confirmation: log as `D-ARCH-001` in `memory/decisions/log.md` and `memory/decisions/TAXONOMY.md`
- If D-ARCH-001 already exists (re-run): show the locked decision, ask if they want to supersede it
- Stack choice informs the scaffold phase in `/build` — shell, routing, and folder structure all derive from it

---

### Phase 2 — Initialisation

> Goal: design system generated, all gates pass, project is ready to design.

```
/init
```

This checks all six gates in order:
- G-1: `.impeccable.md` populated ← must pass before anything
- G-2: `.agents/product-marketing-context.md` populated ← must pass before anything
- G-3: `design-system/MASTER.md` exists ← if missing, generates it now via `ui-ux-pro-max --design-system --persist`
- G-4: pages registered ← flags any missing page folders
- G-5: asset manifest complete ← flags unregistered files
- G-6: no blocking issues ← surfaces anything that would prevent work

`/init` will not proceed past a failed gate without either resolving it or explicit confirmation from you to skip (only skip if you know what you're doing).

After `/init` passes all gates, print the output of `/status` so the full project state is visible.

---

### Phase 3 — Design

> Goal: every page has a written design spec before any code is touched.

For each page, in priority order:
```
/design [page]
```

This runs the full design workflow:
1. Reads brief, design system, preferences, brand context
2. Runs `frontend-design/` skill for aesthetic direction
3. Runs `ui-ux-pro-max --domain layout` for layout decisions
4. Writes `pages/[page]/design.md` — section inventory, per-section composition, emotional arc, responsive changes, motion intent. References tokens by name — never redefines values already in MASTER.md
5. Logs any new decisions (D-XXX) and preferences (P-XXX)

**Do not start Phase 4 until all priority pages have a populated `design.md`.**

---

### Phase 4 — Build

> Goal: each page is built to spec, tested, and quality-gated.

**Step 4.0 — Scaffold the site shell (run once, before any page build)**

Before building any page, Claude must scaffold the shared site structure. This is done once at the start of Phase 4 and never repeated.

The scaffold contains:
- Project initialised with the confirmed stack (D-ARCH-001)
- Router / routing set up with empty route for every page in `memory/sitemap.md`
- Shared layout shell: `Nav`, `Footer`, page `<Outlet>` or slot
- Design token file wired to global CSS / Tailwind config
- One empty page component per route — renders nothing but the shell

**Rules:**
- Scaffold derives from D-ARCH-001 — do not scaffold until stack is confirmed
- Every page in the sitemap gets a route and an empty component, even if not yet designed
- Nav + Footer are built once here, shared by all pages — never rebuilt per page
- No page content until `/build [page]` is run for that page

For each page, in same priority order as design:
```
/build [page]
```

This runs the full build workflow:
1. Reads brief, design spec, design system, decisions
2. Identifies enhancement skills to layer on top of `web2d/` — justifies every addition
3. Writes `pages/[page]/build.md` — component inventory, interactions, performance budget
4. Builds: `web2d/` always first (full page foundation), then `web3d/` + `motion/` + `react-state-management/` as needed per section
5. Updates `pages/[page]/state.md` quality gate checklist
6. Logs issues (I-NNN) for anything unresolved

---

### Phase 5 — QA and delivery

> Goal: site is complete, audited, and ready to hand over.

**Step 5.1 — Project check**
```
/status
```
Every page should show `complete` in state. No blocking issues. All assets `approved`.

**Step 5.2 — Audit**
Use the `audits/` skill — runs `squirrel` CLI against the live or staged site.
Target: score ≥ 95 across SEO, performance, accessibility, security, structured data.
Log any failures as I-NNN issues and resolve before delivery.

**Step 5.3 — Session end**
Run the session end protocol. Compact `memory/MEMORY.md`. Clear `memory/next.md`.

---

### Quick reference

```
# Before Claude Code
→ Gather all assets → drop into assets/raw/

# Phase 1 — Context
/sync-assets                  register all assets
                              give context → Claude writes .impeccable.md + product-marketing-context.md

# Phase 2 — Plan  ← site architecture + content strategy
/plan                         map pages + hierarchy, run content-strategy/, scaffold folders,
                              write memory/sitemap.md

# Phase 3 — Init
/init                         check all gates → generate design-system/MASTER.md

# Phase 4 — Design + Build  ← iterative, repeat in any order
/design [page]                design a page (reads sitemap for context)
/build [page]                 build a page

# Anytime something changes
/plan                         re-run with new input → diffs, proposes changes, flags affected pages
/design [page]                re-design affected pages
/build [page]                 re-build affected pages

# Adding a page mid-project
/new-page [slug]              creates folder, writes brief, updates sitemap

# Phase 5 — QA
/status                       confirm all complete
audits skill                  squirrel CLI → score ≥ 95
```

---

## Classification rules

Every input must be classified before routing. One input can be multiple types.

| Type | Definition | Route to |
|------|-----------|----------|
| **asset** | Image, mockup, logo, video, font, PDF, reference file | `assets/manifest.md` + `assets/raw/` |
| **preference** | Durable taste rule the client keeps choosing (font, tone, spacing) | `memory/preferences.md` |
| **decision** | An accepted or rejected design/tech choice with reasoning | `memory/decisions/log.md` + `memory/decisions/TAXONOMY.md` |
| **page context** | Layout approach, design intent, component choices for a specific page | `pages/<name>/design.md` + `pages/<name>/build.md` |
| **issue** | Browser bug, performance concern, implementation caveat, open question | `memory/issues.md` |
| **next action** | What to do next, session handoff item | `memory/next.md` |

When uncertain: prefer over-classification. Write to all plausible targets.

---

## Routing rules

### New page or section
1. Create `pages/<slug>/` with all six files: `brief.md`, `design.md`, `build.md`, `assets.md`, `state.md`, `screenshots.md` — plus a `screenshots/` subfolder
2. Copy scaffolding from `pages/_template/`
3. Populate `brief.md` immediately from available input
4. Register the page in `memory/MEMORY.md`

### New asset
1. Assign the next ID from `assets/manifest.md` for the relevant type (e.g. `A-IMG-001`)
2. Note it in `assets/manifest.md` with: ID, name, type, source, status, assigned page(s)
3. Add it to the "By Page" index table in `assets/manifest.md`
4. Reference it from `pages/<name>/assets.md` for the pages that use it
5. Do NOT inline asset decisions into page files — cross-reference by ID only

### Design decision
1. Assign the next ID from `memory/decisions/TAXONOMY.md` for the relevant category (e.g. `D-ARCH-001`)
2. Add a row to the taxonomy table: ID · title · status · date · version chain
3. Append the full record to `memory/decisions/log.md` under the matching category heading
4. If superseding a prior decision, mark the old entry `[SUPERSEDED by: D-XXX-NNN]` in both files
5. If it affects a specific page, add a reference row in `pages/<name>/build.md` decision table
6. If it becomes a pattern, extract to `memory/preferences.md`

### Preference
1. Assign the next ID for the relevant category (e.g. `P-TYPO-001`)
2. Write to `memory/preferences.md` with: ID, rule, origin, scope, date
3. Preferences override defaults silently — no need to re-explain them each session
4. When a page overrides a preference, document it in the override table in `pages/<name>/design.md`

### Issue
1. Assign the next sequential ID (e.g. `I-001`)
2. Write to `memory/issues.md` with: ID, date, page/component, description, severity, status
3. If blocking: add the issue ID to `memory/next.md` and to `pages/<name>/state.md` blockers table

---

## Page file responsibilities

Each page folder `pages/<slug>/` contains six files plus a `screenshots/` subfolder:

| File | Responsibility |
|------|---------------|
| `brief.md` | WHY/WHAT — purpose, audience, success criteria, sections, constraints |
| `design.md` | HOW IT LOOKS — section inventory, composition per section, emotional arc, responsive changes, motion intent. Token values are NOT repeated here — reference by name only |
| `build.md` | HOW IT'S BUILT — component inventory (2D/3D/motion), interactions, performance budget, decision refs |
| `assets.md` | WHAT IT USES — cross-reference to `assets/manifest.md` by asset ID |
| `state.md` | WHERE IT IS — build status, quality gate checklist, blockers (by issue ID), audit history |
| `screenshots.md` | VISUAL HISTORY — indexed log of every screenshot round with image links, issue counts, and before/after deltas. Claude reads this before any build or fix to understand the current visual state. |

`pages/<slug>/screenshots/` contains the actual PNG files, named `r<N>-mobile.png`, `r<N>-tablet.png`, `r<N>-desktop.png`.

**Before any fix work on an existing page, Claude must read `screenshots.md` to understand what the page looks like and how it has evolved. Never fix blind.**

---

## Skill selection rules

### Design workflow — correct sequence for any new page

**Phase: Design** (`/design [page]`)

| Step | Skill | Action |
|------|-------|--------|
| 1a | `content-strategy/` | Pillars, buyer stage, what this page must say — skip if copy provided by client |
| 1b | `content/` | Heading hierarchy, SEO meta, HTML structure — skip if copy provided |
| 1c | `copywriting/` | Headlines, CTAs, body copy → written to `brief.md ## Copy` — skip if copy provided |
| 2 | `frontend-design/` | Aesthetic direction — informed by content shape from step 1 |
| 3 | `ui-ux-pro-max --domain layout` | Layout decisions for this page's specific challenges |
| 4 | — | Write `design.md` (references tokens by name, references copy by section) |

**Phase: Build** (`/build [page]`)

| Step | Skill | Action |
|------|-------|--------|
| 5 | — | Skill routing: read brief + design.md → produce Skill Plan table (see `/build` command) |
| 6 | `web2d/` | All static layout, UI, text sections — always runs |
| 6b | `web3d/` sub-skills | Only sections flagged in Skill Plan — requires D-3D-NNN decision |
| 6c | `motion/` sub-skills | Only sections flagged in Skill Plan — requires D-MOT-NNN decision |
| 6d | `react-state-management/` | Only if Skill Plan flagged interactive state |

**Phase: QA** (after build)

| Step | Skill | Action |
|------|-------|--------|
| 7 | `audits/` | Live site audit via squirrel CLI — score ≥ 95 |

**Project init only** (run once via `/init`)

| Step | Skill | Action |
|------|-------|--------|
| — | `ui-ux-pro-max --design-system --persist` | Generates `design-system/MASTER.md` |
| — | `design-system/` | Token architecture implementation |

---

### Decide — `skills/ui-ux-pro-max/`
- Priority-ranked rules database: accessibility, touch, performance, style, layout, animation, forms, nav, charts
- Run `--design-system --persist` first on every new project → writes `design-system/MASTER.md`
- Use `--domain <domain>` to deep-dive (color, typography, ux, chart, etc.)
- **Decide here, build with other skills** — reference database, not implementation guide
- ⚠️ Security: Gen Agent Trust Hub FAIL; Socket + Snyk pass

### Direction — `skills/frontend-design/`
- Establish bold aesthetic direction before writing a line of code
- Reads `.impeccable.md` — populate that file before running this skill
- Prevents generic AI aesthetics: tone, typography, spatial composition, differentiation
- Use alongside `ui-ux-pro-max/` — rules inform direction, direction guides execution
- Skills available in `skills/frontend-design/`:
  - `anthropic-frontend-design/` — Anthropic's skill: rejects generic AI aesthetics, forces distinctive typography/color/motion choices. Use on every project.
  - `bencium-innovative-ux-designer/` — 28k-char UX reference: design thinking, color systems, typography excellence, interaction patterns, motion specs. Use for creative/brand-forward projects.
  - `bencium-controlled-ux-designer/` — Same depth as innovative variant but favors consistency and systematic decisions. Use for design systems or enterprise projects.

### Tokens — `skills/design-system/`
- Token architecture (primitive → semantic), typography scale, color system, spacing, motion tokens, component API
- Implement after `ui-ux-pro-max --persist` generates the recommendation
- Page templates read `design-system/MASTER.md` + `design-system/pages/<slug>.md` for overrides

### Content Strategy — `skills/content-strategy/`
- Use before writing anything: topic clusters, buyer stages, content priorities
- Sources: keyword data, call transcripts, competitor analysis, support tickets
- Distinct from `copywriting/` (writing) and `content/` (HTML structure) — this is the planning layer
- ⚠️ Security: Snyk WARN; Gen Agent Trust Hub + Socket pass

### Content Structure — `skills/content/`
- Heading hierarchy, SEO (title, meta, OG, JSON-LD), accessibility requirements, HTML semantics
- Defines **structure** per page — what goes where and in what HTML elements
- Distinct from `copywriting/`: `content/` = structure; `copywriting/` = persuasion

### Copy — `skills/copywriting/`
- Headlines, CTAs, body copy, page sections — conversion-focused
- Read `.agents/product-marketing-context.md` first — skill will ask for it if missing
- Distinct from `content/`: words, not structure
- All security audits pass

### Layout & UI — `skills/web2d/`
- Builds the full page foundation — every page, every section, always
- Static layouts, UI components, forms, navigation, text-heavy sections, performance-critical and indexable content
- `web3d/` and `motion/` layer on top of this — they don't replace it
- Skills available in `skills/web2d/`:
  - `react-best-practices/` — Effects as escape hatches, derived state, useMemo, key resets, useEffectEvent, refs, custom hooks, controlled components
  - `react-best-practices-vercel/` — Vercel's 57-rule performance guide (8 categories). Priority order: eliminate waterfalls → bundle size → server perf → re-renders. Run when auditing or optimizing any React/Next.js page.
  - `composition-patterns/` — Component API patterns: compound components, context providers, explicit variants, no boolean prop proliferation. Run when designing reusable component APIs or refactoring prop-heavy components.
  - `web-design-guidelines/` — 100+ Web Interface Guidelines rules (accessibility, UX, performance). Invoke as `/web-design-guidelines <file-pattern>` to audit any component before marking it done.

### 3D & WebGL — `skills/web3d/`
- 3D elements embedded inside sections built with `web2d/` — always additive, never a replacement
- Use for: product visualization, hero character scenes, interactive objects, particle effects
- **Never use WebGL to solve a layout problem**
- Skills available in `skills/web3d/`:
  - `guide.md` — 3D element selection, scene defaults, model formats, performance rules
  - `threejs-webgl/` — vanilla Three.js scenes, WebGL/WebGPU, instancing, loaders, GSAP integration
  - `react-three-fiber/` — general R3F skill with starter assets, Drei helpers, Zustand, Framer Motion 3D
  - `r3f-fundamentals/` — Canvas, useFrame, useThree, JSX elements, events, refs
  - `r3f-animation/` — useAnimations, spring physics, morph targets, skeletal animation
  - `r3f-materials/` — PBR, MeshPhysical, Drei materials (MeshTransmission, MeshReflector, etc.)
  - `r3f-lighting/` — light types, shadows, Environment, IBL, ContactShadows, AccumulativeShadows
  - `r3f-postprocessing/` — Bloom, DOF, SSAO, Outline, color grading, custom effects
  - `r3f-shaders/` — GLSL, shaderMaterial, uniforms, varyings, noise, onBeforeCompile
  - `r3f-geometry/` — built-in shapes, BufferGeometry, instancing, particles, lines
  - `r3f-interaction/` — pointer events, OrbitControls, CameraControls, keyboard, scroll, gestures
  - `web3d-integration-patterns/` — multi-library architecture (Three.js + GSAP + R3F + Spring)

### Motion — `skills/motion/`
- GSAP: sequence-driven timelines, scroll-triggered effects
- Framer Motion: React component transitions, gesture interactions
- CSS: simple micro-interactions — never use JS for what CSS handles well
- Skills available in `skills/motion/`:
  - `guide.md` — tool selection, CSS animation rules, GSAP patterns, Framer Motion patterns, easing reference
  - `gsap-scrolltrigger/` — full GSAP + ScrollTrigger skill: tweens, timelines, scrub, pin, parallax, Three.js integration, React (useGSAP)

### State Management — `skills/react-state-management/`
- Redux Toolkit, Zustand, Jotai, React Query — full TypeScript patterns for every state category
- Local state → `useState`/`useReducer`; Global state → Zustand (simple) or RTK (complex); Server state → React Query; Form state → React Hook Form; URL state → nuqs/React Router
- Use **Zustand** by default for new projects; reach for RTK only when app complexity warrants it
- Combine: Zustand for client state + React Query for server state — never duplicate server data in client store
- All security audits pass (Gen Agent Trust Hub · Socket · Snyk)

### JSON Render — `skills/json-render/`
- Dynamic UIs driven by JSON specs (from CMS, server, or AI output)
- Converts JSON element trees into React component trees with Zod-validated props
- Built-in state, two-way binding, event system, visibility conditions; use `useUIStream` for streaming
- All security audits pass

### Audits — `skills/audits/`
- `audit-website` — live site via `squirrel` CLI: 230+ rules across SEO, performance, security, accessibility, structured data
- Use after launch or before delivery — only catches real-world issues, not code review issues
- Requires `squirrel` CLI (squirrelscan.com/download); score target ≥ 95 with full coverage
- AccessLint skills (run during build and QA, not just delivery):
  - `contrast-checker/` — interactive WCAG contrast analysis; calculates ratios, checks AA/AAA, suggests accessible alternatives that preserve design intent. Run whenever a color decision is made.
  - `accesslint-refactor/` — multi-file a11y auto-fixer: adds missing alt text, ARIA labels, semantic HTML. Run before any page is marked `complete`.
  - `use-of-color/` — WCAG 1.4.1 checker: finds links, errors, status indicators, and interactive states that rely solely on color. Run during design review.
  - `link-purpose/` — audits link text for descriptiveness and context. Run as part of content QA.

---

## Context files

Populate at project start. Skills read these before executing — missing files slow things down.

**To fill them:** paste or describe your context (brand docs, deck, brief) and Claude will write both files, asking only what's missing.

**Figma + Mural:** no live integration — export/screenshot manually and drop into `assets/raw/`. Live Figma and Mural integrations are planned future features.

| File | Read by | Contains |
|------|---------|----------|
| `.impeccable.md` | `frontend-design/` | Target audience, use cases, brand personality |
| `.agents/product-marketing-context.md` | `copywriting/` | Product, audience, offer, traffic source |
| `design-system/MASTER.md` | page templates | Generated design system — run `ui-ux-pro-max --persist` |
| `design-system/pages/<slug>.md` | page templates | Page-specific overrides — run `--persist --page <slug>` |

---

## ID systems

| Entity | Format | Where assigned | Where used |
|--------|--------|----------------|------------|
| Decision | `D-[CATEGORY]-[NNN]` | `memory/decisions/TAXONOMY.md` | `pages/<name>/build.md`, `memory/MEMORY.md` |
| Preference | `P-[CATEGORY]-[NNN]` | `memory/preferences.md` | `pages/<name>/design.md` override table |
| Issue | `I-NNN` | `memory/issues.md` | `pages/<name>/state.md`, `memory/next.md` |
| Asset | `A-[TYPE]-[NNN]` | `assets/manifest.md` | `pages/<name>/assets.md`, manifest by-page index |

---

## Memory compaction rules

After every major action (page built, major decision made, asset approved, session ending):

1. Rewrite `memory/MEMORY.md` as a tight summary — what exists, what's done, what's open
2. Keep MEMORY.md under 80 lines. If it grows beyond that, it is no longer a summary.
3. Archive resolved issues in `memory/issues.md` (mark status: resolved, keep the record)
4. Clear `memory/next.md` of completed items
5. Do NOT delete decisions — append only, mark old ones superseded if replaced

---

## Quality gates

A page is NOT done until:
- [ ] `pages/<name>/state.md` status is `complete`
- [ ] All assets referenced in `pages/<name>/assets.md` have status `approved` in `assets/manifest.md`
- [ ] No open issues in `memory/issues.md` with severity `blocking` for this page
- [ ] Responsive behavior is documented in `pages/<name>/design.md`
- [ ] The page has been reviewed against preferences in `memory/preferences.md`
- [ ] Performance budget is documented in `pages/<name>/build.md`

A decision is NOT recorded until:
- [ ] It has a date, a rationale, and a status
- [ ] Rejected decisions include WHY they were rejected (so we don't revisit them)

---

## Page context inheritance

Page design and build specs inherit project-level preferences by default.
A page CAN override a global preference — document the override in `pages/<name>/design.md`.
Home page decisions do NOT propagate to other pages unless explicitly noted as global.

---

## Session start protocol

**First: detect whether this is a new or existing project.**

Read `memory/MEMORY.md`. If it is empty or contains only template placeholder content (no real project name, no pages, no assets):
→ This is a new project. Say: "Looks like this is a new project. Let's set it up. Do you have files ready to drop into `assets/raw/`?" Then guide through the New Project Workflow from Phase 1.

If `memory/MEMORY.md` has real content:
→ Existing project. Continue with steps below.

1. Read `memory/MEMORY.md` — understand current state
2. Read `memory/next.md` — know what's queued
3. Check `memory/issues.md` for any blocking items
4. Check gates G-1 and G-2 silently — if either fails, flag it before doing anything else
5. For any page with status `in-progress` in MEMORY.md: read `pages/<name>/screenshots.md` and check the **Latest round** line at the top. If latest round > 0, load those screenshots (`r<N>-desktop.png`, `r<N>-tablet.png`, `r<N>-mobile.png`). This gives Claude visual context of the current page state before any work begins.
6. Load the relevant `pages/<name>/` files + `design-system/MASTER.md` for the work at hand
7. Proceed

## Session end protocol

1. Write back all state changes to affected files
2. Update `memory/next.md` with handoff items
3. Compact `memory/MEMORY.md`
4. Update CLAUDE.md if any structural change was made this session
