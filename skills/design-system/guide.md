# Skill: Design System

Tokens, typography scale, color system, spacing, and component API.
Define tokens first. Build components second.

---

## Token architecture

Tokens have two layers:
1. **Primitive tokens** — raw values (the palette, the scale)
2. **Semantic tokens** — named roles that reference primitives

```css
/* 1. Primitives — never use these directly in components */
:root {
  --_gray-50: #f9fafb;
  --_gray-900: #111827;
  --_brand-500: #6366f1;
}

/* 2. Semantic — use these in components */
:root {
  --color-bg: var(--_gray-50);
  --color-text: var(--_gray-900);
  --color-accent: var(--_brand-500);
}
```

Why: when the design changes, you update the semantic token's value — not every component.

---

## Typography scale

### Modular scale (default: 1.25 ratio — Major Third)
```css
:root {
  --text-xs:   0.64rem;   /* 10.24px */
  --text-sm:   0.8rem;    /* 12.8px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.25rem;   /* 20px */
  --text-xl:   1.563rem;  /* 25px */
  --text-2xl:  1.953rem;  /* 31.25px */
  --text-3xl:  2.441rem;  /* 39px */
  --text-4xl:  3.052rem;  /* 48.8px */
  --text-5xl:  3.815rem;  /* 61px */
}
```

### Font stack
```css
:root {
  --font-sans: [Client font], ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-serif: [Client font], ui-serif, Georgia, serif;
  --font-mono: ui-monospace, 'Cascadia Code', monospace;
}
```

### Line heights
```css
:root {
  --leading-tight: 1.2;   /* headings */
  --leading-snug:  1.35;  /* subheadings */
  --leading-normal: 1.5;  /* body */
  --leading-relaxed: 1.65; /* long-form */
}
```

---

## Spacing scale

Base: 4px (0.25rem)
```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Page-level */
  --space-page-edge: clamp(1rem, 5vw, 4rem);
  --max-width: 1280px;
  --max-width-prose: 72ch;
}
```

---

## Color system

### Required semantic roles (minimum)
```css
:root {
  /* Backgrounds */
  --color-bg:           ;  /* page background */
  --color-bg-surface:   ;  /* card, panel background */
  --color-bg-subtle:    ;  /* subtle differentiation */

  /* Text */
  --color-text:         ;  /* primary body text */
  --color-text-muted:   ;  /* secondary text */
  --color-text-subtle:  ;  /* placeholder, disabled */
  --color-text-inverse: ;  /* text on dark backgrounds */

  /* Brand */
  --color-accent:       ;  /* primary brand action */
  --color-accent-hover: ;  /* hover state */

  /* Borders */
  --color-border:       ;  /* default border */
  --color-border-strong: ; /* emphasized border */

  /* Feedback */
  --color-success:      ;
  --color-warning:      ;
  --color-error:        ;
}
```

### Dark mode
Implement via `[data-theme="dark"]` attribute or `prefers-color-scheme`:
```css
[data-theme="dark"] {
  --color-bg: var(--_gray-950);
  --color-text: var(--_gray-50);
  /* ...override all semantic tokens */
}
```

---

## Component API conventions

### Naming
- Use noun-based component names: `Button`, `Card`, `Modal`, not `ClickThing`
- Modifier pattern: `Button--primary`, `Button--ghost`, `Button--sm`
- State classes: `is-active`, `is-disabled`, `is-loading`

### Size variants (standard)
```
sm | md (default) | lg | xl
```

### Color variants (standard)
```
default | primary | secondary | ghost | destructive
```

### Props/attributes pattern (HTML)
```html
<button class="btn btn--primary btn--lg" aria-busy="false">
  Label
</button>
```

---

## Motion tokens

```css
:root {
  --duration-fast:    100ms;
  --duration-normal:  200ms;
  --duration-slow:    400ms;
  --duration-slower:  600ms;

  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in:     cubic-bezier(0.4, 0.0, 1, 1);
  --ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Border radius scale

```css
:root {
  --radius-sm:   0.25rem;  /* 4px — inputs, small elements */
  --radius-md:   0.5rem;   /* 8px — cards, buttons */
  --radius-lg:   1rem;     /* 16px — modals, larger cards */
  --radius-xl:   1.5rem;   /* 24px — featured elements */
  --radius-full: 9999px;   /* pills, avatars */
}
```

---

## Shadow scale

```css
:root {
  --shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```
