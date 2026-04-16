# Quality Benchmark — RX + Sainsbury's executive experience

> Supersedes the previous Pollen360-locked benchmark (see `D-QB-001` in `decisions/log.md`).
> This rubric is the `/run` loop's scoring harness. Every criterion must be concrete, checkable, and tied to a named source — brand tokens, a registered reference component, or a named external reference with an extracted pattern. Taste-words do not belong here.

---

## 1. Sources of truth

| Source | Type | Contributes |
|--------|------|-------------|
| A-MOCK-001 | brand tokens | `#F06C00` primary, `#A100FF` accent, horizon colors (H1 `#0891B2`, H2 `#059669`, H3 `#7C3AED`), Geist font, `#FAFAFA` background, light-mode-only executive palette |
| A-REF-001..012 | registered reference components (SxA + 3HA) | Hero + from-to + horizons + JAR+AI engine + timeline + team + exponential-chart + pillars — see `assets/manifest.md` "By Page" for per-page assignments |
| pierrelouis.design | external reference (**primary weight — user preference**) | Micro-interaction language, selective delight |
| chiaraluzzana.com | external reference | Numbered editorial hierarchy, generous whitespace rhythm |
| uneminiaventure.fr/en | external reference | Scroll-driven chapter progression, illustrative geometric accents |

---

## 2. Pattern extraction map

### pierrelouis.design — primary weight

```
Take:
  - Lottie-driven hover micro-interactions on signature elements (not every element)
  - Selective sound feedback — on ONE primary CTA per chapter, not pervasive
  - One Easter-egg-style reward hidden per page (reveal-on-scroll OR reveal-on-key-sequence)
  - Card-dashboard modal overlays for secondary content (popup, not route change)
  - Texture overlay for tactile depth on at least one section background

Do NOT take:
  - Cartoon character / avatar (this is a B2B executive deliverable)
  - "Gamified credits" / unlock metaphor
  - Anthropomorphic personality or playful copy tone
  - Pervasive sound on every click
```

### chiaraluzzana.com — secondary

```
Take:
  - Numbered section hierarchy (01..NN) — maps to this site's 5 chapters
  - Generous vertical whitespace between sections (≥80px)
  - Editorial typographic restraint — one accent colour per section, not rainbow

Do NOT take:
  - Achromatic palette (the A-MOCK-001 palette is the source of truth)
  - Gallery-only navigation / device-rotation-required mobile
  - Minimalist-to-austere copy posture
```

### uneminiaventure.fr/en — secondary

```
Take:
  - Scroll-driven chapter-to-chapter transitions (not cross-fade — directional motion)
  - Progress indicator (rolling-ball OR adapted equivalent) visible on scroll
  - Geometric SVG accents — hatched circles, triangles, decorative strokes
  - Inline CTAs framed as choices ("Continue", "See how it worked") not "Learn more"

Do NOT take:
  - Hand-drawn aesthetic / illustrated characters
  - Narrative branching / inventory mechanics
  - Literary epigraph anchor
```

---

## 3. Scoring rubric — 5 dimensions × /20 each (total /100, target ≥90)

Every 16–20 cell below is falsifiable via `grep`, a measurable spec, or a citation to a specific asset ID.

### Brand fidelity (/20)

| Band | Criteria (ALL required for this band) |
|------|---------------------------------------|
| 16–20 | A-MOCK-001 `--primary` (`#F06C00`) on every primary CTA; A-MOCK-001 `--accent` (`#A100FF`) on secondary emphasis; Geist loaded via `next/font` (grep `next/font` + `Geist` in `site/app/layout.tsx`); page root background is `#FAFAFA`; **zero hex literals** outside `site/app/globals.css` or `design-system/tokens.css` (verified by `grep -rnE '#[0-9A-Fa-f]{3,8}' site/app site/components` minus token files); no dark-mode-only classes (`bg-black`, `bg-neutral-900`, `text-white` on body-level elements) |
| 11–15 | Tokens mostly used, 1–3 hex literals slipping in, dark-mode leftovers on ≤1 section |
| 6–10 | Palette drifts: multiple hex literals, fonts not wired via `next/font`, mixed light/dark |
| 0–5 | Tokens not wired, hardcoded colours throughout |

### Animation fidelity (/20)

| Band | Criteria |
|------|----------|
| 16–20 | Every A-REF-NNN assigned to this page in `assets/manifest.md` "By Page" is either wired in OR has a `D-MOT-NNN` decision logged with explicit deviation reason. Entrance staggers are 0.15–0.25s between elements (numeric). Converging SVG arrows use `pathLength` motion where A-REF-004 applies. Motion library is `motion/react` consistently across adapted refs. |
| 11–15 | Most A-REF-NNN wired; 1–2 missing without deviation log |
| 6–10 | Ad-hoc animations replacing validated refs without documentation |
| 0–5 | No A-REF-NNN used; generic animations |

### Narrative structure (/20)

| Band | Criteria |
|------|----------|
| 16–20 | Each chapter has a **visible numeric label** (`01..05`) in the DOM (grep chapter component JSX for `>0[1-9]<` or semantic equivalent). A scroll progress indicator exists — rolling-ball from uneminiaventure OR documented adapted variant. At least one choice-framed CTA per chapter (not "Learn more" — options like "Continue", "See how we did it", "Read the model"). Chapter-to-chapter transitions use directional motion (y-translate ≥40px, x-translate ≥40px, OR equivalent), not cross-fade. |
| 11–15 | Numbers present, progress indicator missing, CTA copy generic |
| 6–10 | No numbers, cross-fade transitions, generic CTAs |
| 0–5 | Chapter structure not visible, no progression signal |

### Signature element (/20)

| Band | Criteria |
|------|----------|
| 16–20 | Page has ONE signature feature that is (a) **adapted** from ≥1 named reference (cite which in `pages/<slug>/design.md`), (b) not replicable with generic Tailwind utilities alone, (c) has a micro-interaction — hover, click, or scroll-trigger (grep event handlers). Examples meeting bar: `A-REF-004` converging arrows × uneminiaventure geometric accents; `A-REF-005` JAR+AI engine × pierrelouis Lottie hover; `A-REF-010` exponential chart × uneminiaventure scroll-triggered path draw. |
| 11–15 | Signature present but copies a single reference directly, OR has no micro-interaction |
| 6–10 | Decorative flourish, no genuine signature |
| 0–5 | Nothing distinguishes this page from generic Tailwind templates |

### Polish & completeness (/20, **capped at 14 by blend check — see §4**)

| Band | Criteria |
|------|----------|
| 16–20 | Zero placeholder text (grep `Lorem ipsum`, `TODO`, `TBD`, `XXX`, `FIXME`). Every `color:`/`background:` declaration resolves to an A-MOCK-001 token reference. Every interactive element has BOTH `:hover` AND `:focus-visible` styles (grep counts within ±10%). Copy either passed through the `rx-voice` skill OR is noted as source-provided in `pages/<slug>/brief.md`. All images load via `next/image` with explicit dimensions. |
| 11–15 | Minor polish gaps — 1–2 placeholder strings, hover/focus parity uneven |
| 6–10 | Visible placeholders, mixed token/hex usage, missing focus states |
| 0–5 | Unfinished — obvious gaps, broken states, no focus handling |

---

## 4. Blend check — mandatory cap on Polish

**If the page is visually indistinguishable from any single named reference, Polish caps at 14/20 regardless of other criteria.** The rubric rewards synthesis across ≥2 references + brand. Primary-weight for pierrelouis does NOT mean copy pierrelouis.

### Signals of imitation (any one triggers the cap)

- Color palette matches any reference exactly (not the A-MOCK-001 palette)
- ≥3 sections share composition pattern with one single reference
- Motion: identical easing + timing + choreography across ≥3 elements

### pierrelouis-specific imitation alarms (triggers the cap even if the above don't)

- Cartoon avatar or character animation as central UX element
- Sound on >20% of interactions (i.e. pervasive, not selective)
- Playful / irreverent copy tone — incompatible with executive register
- "Gamified" credits / unlock / inventory metaphor

When triggered: the loop logs the reference being imitated and revises — it does not simply re-score.

---

## 5. Improvement playbook — highest-ROI fix per dimension

### Brand fidelity <16

```bash
grep -rnE '#[0-9A-Fa-f]{3,8}' site/app site/components \
  | grep -vE 'tokens\.css|globals\.css'
```

For every hit: replace the hex literal with a token reference from `design-system/tokens.css`. No exceptions. If a colour is needed that isn't tokenised, add it to A-MOCK-001 first, then reference it.

### Animation fidelity <16

1. Read `assets/manifest.md` "By Page" for the current page
2. List every A-REF-NNN assigned
3. For each: `grep -rn "<ComponentName" site/` → if missing, wire it in OR log `D-MOT-NNN` with the deviation reason
4. Verify stagger timing: search for `delay:` in motion props — targets must be in the 0.15–0.25s range

### Narrative structure <16

- Add `<span aria-hidden="true">0{N}</span>` chapter markers to each chapter component
- Build (or import if shared) a `ChapterProgress` component adapted from uneminiaventure rolling-ball pattern — visible in the bottom right on scroll
- Audit every CTA: reject "Learn more" / "Click here" — replace with choice-framed copy from `rx-voice`

### Signature element <16

- Pick the one A-REF-NNN with highest narrative importance for this chapter
- Blend it with ONE pattern from pierrelouis (Lottie micro-interaction) OR uneminiaventure (scroll-triggered draw) OR chiaraluzzana (extreme whitespace framing)
- Document the blend in `pages/<slug>/design.md` — source + what was taken + what was adapted

### Polish <16

Three sequential passes:
1. `grep -rnE '(Lorem|TODO|TBD|XXX|FIXME|PLACEHOLDER)' site/` → resolve all
2. Brand fidelity grep (above) → resolve all hex literals
3. Compare `grep -c ':hover' site/app/globals.css` vs `grep -c ':focus-visible' site/app/globals.css` → parity within ±10%

---

## 6. Where this came from

| Criterion | Source | Why |
|-----------|--------|-----|
| `--primary` = `#F06C00` on primary CTA | A-MOCK-001 | Registered co-brand token — Sainsbury's orange |
| `--accent` = `#A100FF` on secondary emphasis | A-MOCK-001 | Accenture purple, registered co-brand pair |
| Geist font via `next/font` | A-MOCK-001 | Token spec mandates Geist for executive register |
| `#FAFAFA` page bg, no dark mode | A-MOCK-001 | Light-mode-only executive presentation spec |
| From-to arrows via `motion/react` | A-REF-003 | Already built, validated in SxA reference |
| Converging `pathLength` SVG arrows | A-REF-004 | Validated, highly reusable horizons visualization |
| `01..05` chapter numbers visible | chiaraluzzana.com + uneminiaventure.fr/en | Editorial + narrative convergence across both refs |
| Rolling-ball scroll progress indicator | uneminiaventure.fr/en | Scroll-driven chapter progression pattern |
| Choice-framed inline CTAs | uneminiaventure.fr/en | Reader agency without narrative branching |
| Lottie hover micro-interactions on signature elements | pierrelouis.design (primary) | Personality without avatar |
| Selective sound on ONE primary CTA per chapter | pierrelouis.design (primary) | Adapted from pervasive → selective |
| Easter-egg reward hidden per page | pierrelouis.design (primary) | Delight without gamification |
| Geometric SVG accents (hatched circles, triangles) | uneminiaventure.fr/en | Illustrative depth without hand-drawn aesthetic |
| Texture overlay on ≥1 section bg | pierrelouis.design (primary) | Tactile depth, breaks flat defaults |
| **Blend check cap at 14 Polish** | non-negotiable | Prevents single-reference lock-in — primary weight ≠ copy |
| No cartoon avatar / no sound-per-click | pierrelouis "Do NOT take" | Executive register incompatible |
| Zero hex literals outside `tokens.css` | non-negotiable #1 | Falsifiable via `grep` |
| Hover AND focus-visible parity | non-negotiable | Accessibility + signal-based |
| ≥0.15s–0.25s entrance stagger | A-REF-001 pattern + numeric spec | Consistent cinematic rhythm across refs |

---

## What the loop will now reward that it previously did not

- Synthesis across three named references — **any wholesale imitation caps Polish at 14**
- Brand fidelity to A-MOCK-001 specifically — no generic "dark immersive" drift
- A-REF-NNN component usage as the animation source-of-truth, not ad-hoc motion
- Visible numbered chapter structure — narrative spine made legible
- Selective delight (one Lottie micro-interaction, one hidden reward) over pervasive effects

## What the loop will no longer reward

- "Cinematic" / "magazine-quality" / "asymmetric whitespace" (taste-words removed)
- Dark-mode / glass-morphism defaults (Pollen360 aesthetic removed)
- 3D R3F supermarket scenes as the default signature (moved to case-by-case, must cite A-REF source)
- Any dimension scored on impression alone — every claim must be falsifiable
