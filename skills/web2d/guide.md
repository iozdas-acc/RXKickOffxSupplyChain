# Skill: Web 2D

HTML, CSS, and JavaScript patterns for layout and interface.
Use this skill for all standard page sections, UI components, and text-driven content.

---

## When to use this skill

- Any layout that can be expressed with CSS (flex, grid, position)
- Text-heavy sections, navigation, footers, forms, cards, modals
- Content that must be accessible and crawlable by default
- Performance-critical above-the-fold sections
- When in doubt — start here, add 3D only when needed

---

## Layout system

### Default: CSS Grid + Flexbox
- Use Grid for two-dimensional page layout (rows AND columns)
- Use Flexbox for one-dimensional alignment (row OR column)
- Never use float for layout

### Container pattern
```css
.container {
  width: 100%;
  max-width: var(--max-width); /* define in design tokens */
  margin-inline: auto;
  padding-inline: var(--space-page-edge);
}
```

### Breakpoints (define in design system)
- Mobile-first: write base styles for mobile, override up
- Standard breakpoints: 480px, 768px, 1024px, 1280px, 1536px
- Prefer `min-width` queries over `max-width`

---

## CSS architecture

### Approach: utility-first with component classes
- Use a design token system (see `skills/design-system/`)
- Component classes for complex, stateful components
- Utility classes for spacing, typography, color overrides

### Custom properties pattern
```css
:root {
  /* Define all tokens at root */
  --color-brand: #000000;
  --space-xs: 0.5rem;
  --font-size-base: 1rem;
}
```

### Avoid
- Deeply nested selectors (max 2–3 levels)
- `!important` except for utility overrides
- Magic numbers — if a value isn't a token, question it

---

## Component patterns

### Image handling
```css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
/* For cover images */
.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

### Aspect ratio (no padding hacks)
```css
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-square { aspect-ratio: 1; }
```

### Visually hidden (accessible)
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## JavaScript patterns

- Prefer vanilla JS for simple interactions (toggle, scroll spy, lazy load)
- Use framework (React/Vue/Svelte) when component state complexity warrants it
- Never use jQuery on new projects

### Scroll detection
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el))
```

---

## 2D vs 3D decision guide

Ask these questions before reaching for 3D:
1. Can this be achieved with CSS transforms and transitions? → Stay 2D
2. Is this content above the fold and performance-sensitive? → Stay 2D
3. Must this be screen-reader accessible? → Stay 2D
4. Is the visual requirement specifically spatial/volumetric? → Consider 3D
