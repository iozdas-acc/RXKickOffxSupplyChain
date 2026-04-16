# Asset Manifest

Master index of all project assets.
Every image, mockup, logo, video, font, PDF, and reference file is tracked here.

**ID format:** `A-[TYPE]-[NNN]`

| Prefix | Type |
|--------|------|
| `LOGO` | Logos & brand marks |
| `IMG` | Images & photography |
| `MOCK` | Mockups & design references |
| `VID` | Video & media |
| `FONT` | Fonts |
| `DOC` | Documents & PDFs |
| `ICON` | Icons & SVGs |
| `REF` | Reference code — working component implementations extracted from reference apps |

**Pipeline:** `uploaded` → `processed` → `approved` → `in-use`

---

## Logos & Brand `LOGO`

### A-LOGO-001 — rx-logo
- File: `3 Horizons Approach/public/rx-logo.png`
- Type: logo
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: RX brand mark — used in site header and footer
- Added: 2026-04-16
- Notes: PNG, used as `h-8 w-auto` in reference app header. No SVG version found — confirm if vector available.

---

## Images & Photography `IMG`

### A-IMG-001 — slide-the-situation
- File: `The situation.jpg`
- Type: image
- Source: assets/raw/
- Status: processed
- Assigned to: the-project
- Usage: Content reference slide — project entry context: ~£400m deal, 3 weeks in, couldn't restart or slow down, only lever was to differentiate the outputs
- Added: 2026-04-16
- Notes: Accenture + Sainsbury's co-branded slide. Contains narrative content for `the-project` brief. Do not use as a raw image on-screen — extract content into built components.

### A-IMG-002 — slide-what-we-did
- File: `What we did.jpg`
- Type: image
- Source: assets/raw/
- Status: processed
- Assigned to: the-project
- Usage: Content reference slide — three deliverables: Art of the Possible Workshop, Discovery Findings & Opportunities, Future of Retail & Procurement POV. Tagline: "We turned discovery into a sales advantage."
- Added: 2026-04-16
- Notes: Shows screenshot previews of actual outputs (Sarah Website, system maps, mobile app). Content informs `the-project` section inventory.

### A-IMG-003 — slide-what-we-observed
- File: `What we observed.jpg`
- Type: image
- Source: assets/raw/
- Status: processed
- Assigned to: the-learning
- Usage: Content reference slide — Traditional→AI-enabled shift table (6 rows). Results column: clients feel understood, bolder ambition achievable, relationship shifts to partnership, ideas feel real, clients experience AI speed, momentum stays high. Tagline: "Move faster. Experience more. Build belief earlier."
- Added: 2026-04-16
- Notes: The shift table maps directly to the from-to pattern in A-REF-003. Content is the narrative core of `the-learning` page.

### A-IMG-004 — slack-jack-wang-narrative-framing
- File: `4f669007-a018-421a-826a-d706acf1d6e0.jpg`
- Type: image
- Source: assets/raw/
- Status: processed
- Assigned to: global
- Usage: Reference only — Jack Wang Slack screenshot defining the commercial narrative framing: H1-H3 story arc, hybrid model commercial rationale, "key number messaging + pivot to new deal shape"
- Added: 2026-04-16
- Notes: Not for display. Informs narrative strategy across all pages, especially `the-model` and `the-template`.

---

## Mockups & References `MOCK`

### A-MOCK-001 — cobrand-design-tokens
- File: `SNSBRYxRX New Consulting Approach/app/globals.css`
- Type: mockup
- Source: assets/raw/
- Status: processed
- Assigned to: global
- Usage: Co-branded design token reference. Sainsbury's orange `#F06C00`, Accenture purple `#A100FF`, horizon colors (H1: `#0891B2`, H2: `#059669`, H3: `#7C3AED`), Geist font, `--background: #FAFAFA`, light-mode-only executive presentation spec.
- Added: 2026-04-16
- Notes: Primary input for `/init` design-system generation. These token decisions are already validated — `design-system/MASTER.md` should inherit them.

---

## Reference Code `REF`

> These are working component implementations extracted from two reference apps in `assets/raw/`. They are not assets in the traditional sense — they are reference implementations containing validated design patterns, copy, and interaction logic. Each should be reviewed before use and adapted to the new site's architecture.
>
> Source apps:
> - **[SxA]** = `SNSBRYxRX New Consulting Approach/`
> - **[3HA]** = `3 Horizons Approach/`

---

### A-REF-001 — hero-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/hero.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: intro
- Usage: Hero section pattern — co-brand header (Sainsbury's × Accenture), main headline, key stats row (1.5× faster / 30% less effort / 2× ROI), animated JAR+AI central element with flowing motion lines, scroll indicator
- Added: 2026-04-16
- Notes: Uses `motion/react`. Stats (1.5×, 30%, 2×) are the impact numbers — confirm with Raj/Ben before finalising. Colors: primary `#F06C00`, accent `#A100FF`. Directly adaptable for `intro` page hero.

### A-REF-002 — executive-summary-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/executive-summary.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-project
- Usage: Dark section pattern (`#1A1A1A` bg) — PVE description, context block quote, 2×2 highlights grid (Compressed Timeline, AI-Driven Insights, Accelerated Execution, Enhanced Value). Copy: "12 weeks to 8 weeks through intelligent automation"
- Added: 2026-04-16
- Notes: Contains specific timeline claim (12→8 weeks). Verify accuracy before use. Pattern reusable for `the-project` executive summary section.

### A-REF-003 — from-to-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/from-to.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-learning, the-project
- Usage: Traditional→AI-enabled transformation rows (6 rows with animated orange arrows). From: process-led/manual/S&C team/PPT/extended timelines/manual ID. To: Horizons framework/real-time AI/Data&AI integration/AI-generated narratives/JAR+AI/predictive development.
- Added: 2026-04-16
- Notes: Maps exactly to A-IMG-003 (What we observed slide). The 6 rows are the validated "shift" narrative for `the-learning`. Animated arrow motion already built.

### A-REF-004 — horizons-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/horizons.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-model, the-template
- Usage: H1/H2/H3 framework visualization — H1 (cyan) + H3 (purple) run in parallel as STEP 1, animated converging SVG arrows, H2 (emerald) as STEP 2 below. Card format with icon, description, and examples per horizon.
- Added: 2026-04-16
- Notes: This is the core visual model for `the-model` page. Converging arrows are animated SVG paths with `pathLength` motion. Highly reusable.

### A-REF-005 — jar-ai-engine-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/jar-ai-engine.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-project
- Usage: Full JAR+AI Discovery Engine diagram — H3/H1/H2 input cards (left), central pulsing engine box with orbiting icons (centre), H3/H1/H2 output cards (right). Below: 8-week sprint timeline (W1, W2-4, W5-7, W8). Accelerators: JAR+AI, Vercel, Claude Code.
- Added: 2026-04-16
- Notes: Complex animated component (particles, orbiting icons, pulse). Most technically involved ref component. 8-week timeline embedded — note the new model is also 8 weeks (compressed from 12). Consider for `the-project` as the "how it worked" diagram.

### A-REF-006 — timeline-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/timeline.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-project
- Usage: 5-phase engagement timeline with expandable cards. Phases: Mobilise → Parallel Discovery (W1-3) → Validate & Converge (W4-5) → Refine Roadmap (W6-7) → Final Playback (W8). Key outputs: H3 Vision North Star, H1 World on a Page, H2 Transformation Package, Opportunity Roadmap. Links to live example outputs (H3 narrative Vercel deploy, Pain Point Navigator).
- Added: 2026-04-16
- Notes: Contains links to live Sainsbury's output examples. Highly content-rich — directly usable as `the-project` timeline section. `motion/react` + accordion pattern.

### A-REF-007 — team-outputs-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/team-outputs.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-model
- Usage: Team structure diagram — Delivery Lead (orange), AI Strategy Lead (purple), OPT Squad (W1-8) + RX Squad (W1-4) augmented by JAR+AI centre, Project Manager / Process Leads / Data & AI Engineer supporting roles.
- Added: 2026-04-16
- Notes: The "RX Squad W1-4" structure directly illustrates the hybrid model first half. Reusable for `the-model` team shape section. Shows the commercial reality of RX in first half only.

### A-REF-008 — cta-footer-section [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sections/cta.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-template
- Usage: Simple close section — "Thank you" headline + Sainsbury's × Accenture co-brand footer + copyright line
- Added: 2026-04-16
- Notes: Minimal. Adaptable for `the-template` closing section.

### A-REF-009 — sticky-nav [SxA]
- File: `SNSBRYxRX New Consulting Approach/components/sticky-nav.tsx`
- Type: reference code
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Sticky navigation — not yet reviewed. May contain section-jump nav pattern useful for global nav shell.
- Added: 2026-04-16
- Notes: Read before using — may conflict with the chapter-indicator nav planned for this site.

### A-REF-010 — exponential-chart [3HA]
- File: `3 Horizons Approach/components/exponential-chart.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-template
- Usage: SVG exponential curve chart — amber→cyan→emerald gradient curve, dotted linear comparison line, H1/H2/H3 markers, gap annotation ("Seismic shift in customer behaviour, business model, technology and architecture"). Dark background (`#0f172a`). IntersectionObserver-driven animation.
- Added: 2026-04-16
- Notes: Works independently of any framework (plain SVG + useEffect). Strong visual for `the-template` to show the exponential value path. Gap annotation is the key insight.

### A-REF-011 — horizon-cards [3HA]
- File: `3 Horizons Approach/components/horizon-cards.tsx`
- Type: reference code
- Source: assets/raw/
- Status: uploaded
- Assigned to: the-template
- Usage: Horizon cards component — not yet reviewed. Expected to show H1/H2/H3 in card format. Dark theme variant.
- Added: 2026-04-16
- Notes: Review before use. May complement A-REF-010.

### A-REF-012 — how-we-show-up [3HA]
- File: `3 Horizons Approach/components/how-we-show-up.tsx`
- Type: reference code
- Source: assets/raw/
- Status: processed
- Assigned to: the-model
- Usage: Three-pillar layout — Team (deep expertise meets execution), Thinking (AI-native from day one), Tooling (Human + Agent execution). Teal accent (`#14b8a6`), dark background. Each pillar: icon, title, subtitle, description, 3 highlights.
- Added: 2026-04-16
- Notes: "The RX Difference" framing. Directly relevant to `the-model` page — explains how RX shows up differently in the hybrid model. Teal color is from the dark 3HA theme — will need color adjustment to match the light/orange Sainsbury's theme.

---

## Fonts `FONT`

_(None registered — Geist loaded via next/font per A-MOCK-001 token spec)_

---

## Documents & PDFs `DOC`

_(None registered)_

---

## Icons & SVGs `ICON`

_(None registered — Lucide React used throughout reference apps; no custom icon files)_

---

## By Page

| Page | Asset IDs |
|------|-----------|
| global | A-LOGO-001, A-MOCK-001, A-IMG-004, A-REF-009 |
| intro | A-REF-001 |
| the-project | A-IMG-001, A-IMG-002, A-REF-002, A-REF-003, A-REF-005, A-REF-006 |
| the-learning | A-IMG-003, A-REF-003 |
| the-model | A-REF-004, A-REF-007, A-REF-012 |
| the-template | A-REF-004, A-REF-008, A-REF-010, A-REF-011 |

---

## Counts

| Type | Total | Processed | Approved | In Use |
|------|-------|-----------|----------|--------|
| LOGO | 1 | 0 | 0 | 0 |
| IMG | 4 | 4 | 0 | 0 |
| MOCK | 1 | 1 | 0 | 0 |
| REF | 12 | 10 | 0 | 0 |
| All | 18 | 15 | 0 | 0 |
