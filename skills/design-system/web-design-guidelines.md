---
description: Review UI code for Vercel Web Interface Guidelines compliance
argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review these files for compliance: $ARGUMENTS

Read files, check against rules below. Output concise but comprehensive—sacrifice grammar for brevity. High signal-to-noise.

**Rules**

**Accessibility**
- Icon-only buttons need `aria-label`
- Form controls need `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`)
- `<button>` for actions, `<a>`/`<Link>` for navigation (not `<div onClick>`)
- Images need `alt` (or `alt=""` if decorative)
- Decorative icons need `aria-hidden="true"`
- Async updates (toasts, validation) need `aria-live="polite"`
- Use semantic HTML before ARIA
- Headings hierarchical `<h1>`–`<h6>`; include skip link for main content
- `scroll-margin-top` on heading anchors

**Focus States**
- Interactive elements need visible focus: `focus-visible:ring-*` or equivalent
- Never `outline-none` / `outline: none` without focus replacement
- Use `:focus-visible` over `:focus`
- Group focus with `:focus-within` for compound controls

**Forms**
- Inputs need `autocomplete` and meaningful `name`
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- Never block paste (`onPaste` + `preventDefault`)
- Labels clickable (`htmlFor` or wrapping control)
- Disable spellcheck on emails, codes, usernames (`spellCheck={false}`)
- Submit button stays enabled until request starts; spinner during request
- Errors inline next to fields; focus first error on submit
- Placeholders end with `…` and show example pattern
- Warn before navigation with unsaved changes

**Animation**
- Honor `prefers-reduced-motion`
- Animate `transform`/`opacity` only
- Never `transition: all`—list properties explicitly
- Set correct `transform-origin`
- Animations interruptible

**Typography**
- `…` not `...`
- Curly quotes `"` `"` not straight `"`
- Non-breaking spaces for units and brand names
- `font-variant-numeric: tabular-nums` for number columns
- Use `text-wrap: balance` or `text-pretty` on headings

**Content Handling**
- Text containers handle long content: `truncate`, `line-clamp-*`, or `break-words`
- Flex children need `min-w-0` to allow text truncation
- Handle empty states

**Images**
- `<img>` needs explicit `width` and `height`
- Below-fold images: `loading="lazy"`
- Above-fold critical images: `fetchpriority="high"`

**Performance**
- Large lists (>50 items): virtualize
- No layout reads in render
- Batch DOM reads/writes
- Prefer uncontrolled inputs
- `<link rel="preconnect">` for CDN/asset domains
- Critical fonts: `<link rel="preload" as="font">` with `font-display: swap`

**Navigation & State**
- URL reflects state (filters, tabs, pagination)
- Links use `<a>`/`<Link>`
- Deep-link all stateful UI
- Destructive actions need confirmation or undo—never immediate

**Touch & Interaction**
- `touch-action: manipulation`
- `overscroll-behavior: contain` in modals/drawers
- `autoFocus` sparingly—desktop only

**Safe Areas & Layout**
- Full-bleed layouts need `env(safe-area-inset-*)`
- Flex/grid over JS measurement

**Dark Mode & Theming**
- `color-scheme: dark` on `<html>` for dark themes
- `<meta name="theme-color">` matches page background

**Locale & i18n**
- Dates/times: use `Intl.DateTimeFormat`
- Numbers/currency: use `Intl.NumberFormat`
- Detect language via `Accept-Language` / `navigator.languages`, not IP

**Hydration Safety**
- Inputs with `value` need `onChange` (or use `defaultValue`)
- Guard against hydration mismatch for date/time rendering

**Hover & Interactive States**
- Buttons/links need `hover:` state
- Interactive states increase contrast

**Content & Copy**
- Active voice
- Title Case for headings/buttons
- Numerals for counts
- Specific button labels
- Error messages include fix/next step
- Second person

**Anti-patterns (flag these)**
- `user-scalable=no` or `maximum-scale=1`
- `onPaste` with `preventDefault`
- `transition: all`
- `outline-none` without focus-visible replacement
- Inline `onClick` navigation without `<a>`
- `<div>` or `<span>` with click handlers
- Images without dimensions
- Large arrays `.map()` without virtualization
- Form inputs without labels
- Icon buttons without `aria-label`
- Hardcoded date/number formats
- `autoFocus` without justification

**Output Format**

Group by file. Use `file:line` format (VS Code clickable). Terse findings. State issue + location. Skip explanation unless fix non-obvious. No preamble.
