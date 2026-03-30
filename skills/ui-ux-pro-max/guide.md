# Skill: UI/UX Pro Max

Comprehensive design intelligence for web and mobile UI/UX across 10 technology stacks.
Priority-ranked rules database (99 UX guidelines, 50+ styles, 161 color palettes, 57 font pairings, 25 chart types).

> **Security note:** This skill has a Gen Agent Trust Hub: FAIL audit. Socket and Snyk pass. Review before use.

---

## When to use this skill

### Must use
- Designing new pages (Landing Page, Dashboard, Admin, SaaS, Mobile App)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts)
- Choosing color schemes, typography systems, spacing standards, or layout systems
- Reviewing UI code for UX, accessibility, or visual consistency
- Implementing navigation structures, animations, or responsive behavior
- Making product-level design decisions (style, information hierarchy, brand expression)

### Recommended
- UI looks "not professional enough" but the reason is unclear
- Receiving feedback on usability or experience
- Pre-launch UI quality optimization
- Aligning cross-platform design (Web / iOS / Android)
- Building design systems or reusable component libraries

### Skip
- Pure backend logic development
- API or database design only
- Performance optimization unrelated to the interface
- Infrastructure or DevOps work
- Non-visual scripts or automation tasks

**Decision criteria:** If the task changes how a feature looks, feels, moves, or is interacted with — use this skill.

---

## Relationship to other skills

| Skill | This skill vs. others |
|-------|----------------------|
| `design-system/` | This skill: reference database for decisions. `design-system/`: how to implement token architecture |
| `frontend-design/` | This skill: priority-ranked rules and palettes. `frontend-design/`: creative direction and aesthetic intent |
| `motion/` | This skill: animation rules with durations/easing. `motion/`: GSAP/Framer implementation patterns |
| `performance/` | This skill: CLS, LCP, input latency rules. `performance/`: implementation-level optimization |

Use this skill to **decide** what to build; use the other skills to **build** it.

---

## Rule priority order

Follow priority 1→10 when deciding which rules to apply first:

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Accessibility | CRITICAL |
| 2 | Touch & Interaction | CRITICAL |
| 3 | Performance | HIGH |
| 4 | Style Selection | HIGH |
| 5 | Layout & Responsive | HIGH |
| 6 | Typography & Color | MEDIUM |
| 7 | Animation | MEDIUM |
| 8 | Forms & Feedback | MEDIUM |
| 9 | Navigation Patterns | HIGH |
| 10 | Charts & Data | LOW |

---

## Workflow

### Step 1 — Analyze requirements
Extract from user request:
- **Product type:** Entertainment, Tool, Productivity, or hybrid
- **Target audience:** Age group, usage context
- **Style keywords:** playful, minimal, dark mode, immersive, etc.
- **Stack:** React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, HTML/CSS

### Step 2 — Generate design system (required first step)
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```
Returns: pattern, style, colors, typography, effects, anti-patterns.

### Step 2b — Persist design system (master + overrides pattern)
```bash
# Global master
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
# Page-specific override
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```
Creates `design-system/MASTER.md` and `design-system/pages/<page>.md`.

**Retrieval pattern when building a page:**
> "I am building the [Page Name] page. Read design-system/MASTER.md. Check if design-system/pages/[page-name].md exists — if so, its rules override the Master."

### Step 3 — Domain searches (supplement as needed)
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `"entertainment social"` |
| Style options | `style` | `"glassmorphism dark"` |
| Color palettes | `color` | `"entertainment vibrant"` |
| Font pairings | `typography` | `"playful modern"` |
| Chart recommendations | `chart` | `"real-time dashboard"` |
| UX best practices | `ux` | `"animation accessibility"` |
| Individual Google Fonts | `google-fonts` | `"sans serif popular variable"` |
| Landing page structure | `landing` | `"hero social-proof"` |
| React Native perf | `react` | `"rerender memo list"` |
| AI prompts / CSS keywords | `prompt` | `"minimalism"` |

### Step 4 — Stack guidelines
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react-native
```
Available stacks: `react-native`

---

## Key rules by category (critical sections)

### 1. Accessibility (CRITICAL)
- Contrast 4.5:1 for normal text, 3:1 for large text
- Visible focus rings on interactive elements
- Descriptive alt text for meaningful images
- aria-labels for icon-only buttons
- Tab order matches visual order
- Never convey info by color alone
- Support prefers-reduced-motion

### 2. Touch & Interaction (CRITICAL)
- Min touch target: 44×44pt (Apple) / 48×48dp (Material)
- Min 8px gap between touch targets
- Use click/tap for primary interactions — never hover-only
- Disable buttons during async operations; show spinner
- Use `touch-action: manipulation` to reduce 300ms tap delay

### 3. Performance (HIGH)
- WebP/AVIF images with responsive srcset
- Declare width/height on images to prevent CLS
- font-display: swap/optional to avoid FOIT
- Lazy load non-hero components
- Virtualize lists with 50+ items
- Keep per-frame work under ~16ms for 60fps

### 4. Style Selection (HIGH)
- Match style to product type
- Use SVG icons (Heroicons, Lucide) — never emojis as icons
- Shadows, blur, radius must align with chosen style
- Each screen has only one primary CTA

### 7. Animation (MEDIUM)
- Duration 150–300ms for micro-interactions; ≤400ms complex transitions
- Use transform/opacity only — never animate width/height/top/left
- Every animation must express cause-effect, not just decoration
- Respect prefers-reduced-motion

### 9. Navigation Patterns (HIGH)
- Bottom nav max 5 items with labels
- Back navigation must be predictable; preserve scroll/state
- All key screens reachable via deep link
- Modals must not be used for primary navigation flows

---

## Common pitfalls (frequently overlooked)

- Emojis as icons — use vector-based icons instead
- Icon style mixing — one icon family, consistent stroke width
- Missing pressed-state feedback (should appear within 80–150ms)
- Safe area violations (notch, Dynamic Island, gesture bar)
- Placeholder-only form labels (no visible label)
- Errors shown only at top of form instead of near field
- Dark mode defined for one theme only, not verified independently

---

## Pre-delivery checklist

Run before any UI delivery:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility z-index loading" --domain ux
```

Then verify manually:
- [ ] No emojis used as icons
- [ ] All touch targets ≥44pt / 48dp
- [ ] Primary text contrast ≥4.5:1 in both light and dark mode
- [ ] Safe areas respected for headers, tab bars, bottom CTAs
- [ ] Scroll content not hidden behind fixed bars
- [ ] Verified on 375px small phone + landscape orientation
- [ ] Reduced-motion and Dynamic Type at largest size tested
- [ ] All interactive elements have accessibility labels

---

## Source

`nextlevelbuilder/ui-ux-pro-max-skill` — skill `ui-ux-pro-max`
Security: Gen Agent Trust Hub FAIL / Socket PASS / Snyk PASS
