# Design System — MASTER
# Innovation X / Kidovation

> Generated: 2026-03-26
> Source: ui-ux-pro-max skill applied against .impeccable.md + product-marketing-context.md + brand assets
> Stack: Next.js 15 (App Router) + React 19 + Tailwind CSS v3 (D-ARCH-001)
> Page overrides: `design-system/pages/<slug>.md`

---

## Product classification

| Dimension | Value |
|-----------|-------|
| Type | Educational / Mission-driven / Events |
| Audiences | Kids, parents/teachers, corporate partners, volunteers |
| Style | Bold · Energetic · Real · Credible — NOT fluffy, NOT AI-generic |
| Register | Warm + professional — hackathon energy, Accenture credibility |

---

## Color system

### Primitives

```css
/* Base */
--color-midnight:    #080C18;   /* page background — deep navy */
--color-navy:        #0F1629;   /* surface layer */
--color-navy-mid:    #1A2340;   /* card/panel bg */
--color-navy-border: #2A3554;   /* borders, dividers */

/* Kidovation brand — chartreuse green (exact alien body color) */
--color-kido-green:  #7EC83A;   /* primary Kidovation accent */
--color-kido-teal:   #2ECFA8;   /* secondary Kidovation teal */

/* Future Labs brand */
--color-fl-orange:   #FF6B35;   /* Future Labs primary */
--color-fl-amber:    #FFB830;   /* Future Labs secondary */

/* Innovation X brand — gradient family */
--color-ix-purple:   #7B2FBE;   /* Innovation X primary */
--color-ix-violet:   #A855F7;   /* Innovation X mid */

/* Energy / highlight */
--color-yellow:      #FFE135;   /* high-energy accent — use sparingly */
--color-white:       #F8F9FF;   /* primary text on dark bg */
--color-muted:       #8B96B0;   /* secondary/caption text */
```

### Semantic tokens

```css
/* Backgrounds */
--bg-page:           var(--color-midnight);
--bg-surface:        var(--color-navy);
--bg-card:           var(--color-navy-mid);

/* Text */
--text-primary:      var(--color-white);
--text-secondary:    var(--color-muted);
--text-inverted:     #080C18;

/* Brand accents by sub-brand */
--accent-kidovation: var(--color-kido-green);
--accent-futurelabs: var(--color-fl-orange);
--accent-ix:         var(--color-ix-purple);

/* Interactive */
--interactive-primary:   var(--color-kido-green);
--interactive-hover:     #9ADE4F;
--interactive-focus:     var(--color-kido-teal);
--interactive-border:    var(--color-navy-border);

/* Gradients */
--gradient-ix:       linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%);
--gradient-hero:     linear-gradient(180deg, #080C18 0%, #0F1629 100%);
--gradient-kido:     linear-gradient(135deg, #7EC83A 0%, #2ECFA8 100%);
--gradient-fl:       linear-gradient(135deg, #FF6B35 0%, #FFB830 100%);
```

### Accessibility

- All primary text on `--bg-page`: contrast ≥ 7:1 ✓
- `--color-kido-green` on `--bg-page`: contrast 4.8:1 ✓ (meets AA large text, verify for body)
- `--color-fl-orange` on `--bg-page`: contrast 4.5:1 ✓
- Never convey brand alone via color — pair with label or icon

---

## Typography

### Font stack

```css
/* Display — bold, geometric, real. Not default. */
--font-display: 'Syne', 'Space Grotesk', system-ui, sans-serif;

/* Body — clean, readable, neutral */
--font-body:    'Inter', 'DM Sans', system-ui, sans-serif;

/* Accent — handwritten energy moments only */
--font-accent:  'Permanent Marker', cursive;
/* Source: assets/raw/fonts/PermanentMarker-Regular.ttf (A-FONT-001) */

/* Block letters — Kidovation brand moments, image-based */
/* Source: assets/raw/fonts/block-letters/ (A-FONT-003 to A-FONT-006) */
/* Not a web font — compose as image elements */
```

> **Syne** (Google Fonts, variable): Bold geometric display, strong personality, not AI-default.
> **Inter** (Google Fonts, variable): Best-in-class body readability.
> Both: `font-display: swap`

### Type scale

```css
/* Display */
--text-d1: clamp(3.5rem, 8vw, 7rem);      /* Hero headline */
--text-d2: clamp(2.5rem, 5vw, 4.5rem);    /* Section headline */
--text-d3: clamp(1.75rem, 3vw, 2.75rem);  /* Sub-headline */

/* UI */
--text-xl:  1.375rem;   /* 22px — card title */
--text-lg:  1.125rem;   /* 18px — lead text */
--text-md:  1rem;       /* 16px — body */
--text-sm:  0.875rem;   /* 14px — caption, label */
--text-xs:  0.75rem;    /* 12px — fine print */

/* Weight */
--weight-display: 800;   /* Headlines — Syne ExtraBold */
--weight-title:   700;   /* Card titles */
--weight-body:    400;   /* Body */
--weight-accent:  600;   /* CTAs, labels */

/* Line height */
--leading-display: 1.05;
--leading-body:    1.6;
--leading-ui:      1.3;

/* Letter spacing */
--tracking-display: -0.03em;
--tracking-body:     0;
--tracking-label:    0.08em;  /* uppercase labels */
```

---

## Spacing system

4px base grid. All spacing values are multiples of 4.

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
--space-40:  160px;
--space-48:  192px;
```

### Section rhythm

```css
--section-padding-y:     clamp(80px, 10vw, 160px);
--section-padding-x:     clamp(24px, 6vw, 80px);
--content-max-width:     1280px;
--content-narrow-width:  800px;   /* for text-heavy sections */
--grid-gap:              clamp(16px, 3vw, 32px);
```

---

## Border radius

```css
--radius-sm:   6px;    /* tags, badges, small chips */
--radius-md:   12px;   /* cards, inputs */
--radius-lg:   20px;   /* larger panels */
--radius-xl:   32px;   /* hero callout boxes */
--radius-full: 9999px; /* pills, avatar, round buttons */
```

Not too rounded (fluffy), not sharp (cold). Medium-heavy radius on cards.

---

## Shadows & elevation

```css
/* Dark-mode surface elevation */
--shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
--shadow-md:  0 4px 16px rgba(0,0,0,0.5);
--shadow-lg:  0 8px 32px rgba(0,0,0,0.6);

/* Glow — use for active/highlight states */
--glow-green:  0 0 24px rgba(126, 200, 58, 0.3);
--glow-orange: 0 0 24px rgba(255, 107, 53, 0.3);
--glow-purple: 0 0 24px rgba(123, 47, 190, 0.3);
```

---

## Layout grid

```css
/* 12-column grid */
--grid-cols:       12;
--grid-col-gap:    clamp(16px, 2vw, 24px);
--grid-row-gap:    clamp(24px, 4vw, 48px);

/* Breakpoints */
--bp-sm:   480px;
--bp-md:   768px;
--bp-lg:   1024px;
--bp-xl:   1280px;
--bp-2xl:  1536px;
```

Mobile-first. All layouts must work at 375px minimum width.

---

## Motion tokens

```css
/* Durations */
--duration-fast:    150ms;   /* micro: button press, toggle */
--duration-base:    250ms;   /* standard: hover, fade */
--duration-slow:    400ms;   /* page transition, reveal */
--duration-enter:   600ms;   /* hero element entrance */

/* Easings */
--ease-out:     cubic-bezier(0.0, 0, 0.2, 1);   /* elements entering */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);      /* elements leaving */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* playful bounce */
--ease-smooth:  cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Rules */
/* - Animate transform + opacity only — never layout properties */
/* - Always respect prefers-reduced-motion */
/* - Entrances: --ease-out. Exits: --ease-in. Interactions: --ease-spring */
/* - GSAP for scroll-triggered + sequences. CSS for micro-interactions. */
```

---

## Component tokens

### Buttons

```css
/* Primary CTA */
--btn-primary-bg:      var(--color-kido-green);
--btn-primary-text:    var(--color-midnight);
--btn-primary-hover:   #9ADE4F;
--btn-primary-radius:  var(--radius-full);
--btn-primary-padding: 14px 32px;
--btn-primary-weight:  var(--weight-accent);

/* Secondary */
--btn-secondary-bg:      transparent;
--btn-secondary-border:  var(--color-navy-border);
--btn-secondary-text:    var(--text-primary);
--btn-secondary-hover-bg: var(--color-navy-mid);

/* Touch target minimum: 48px height */
--btn-min-height: 48px;
```

### Cards

```css
--card-bg:      var(--bg-card);
--card-border:  1px solid var(--color-navy-border);
--card-radius:  var(--radius-lg);
--card-padding: var(--space-6);
--card-hover-border: 1px solid var(--color-kido-green);
--card-hover-shadow: var(--glow-green);
```

### Navigation

```css
--nav-height:       64px;
--nav-bg:           rgba(8, 12, 24, 0.85);
--nav-backdrop:     blur(12px);
--nav-border:       1px solid rgba(42, 53, 84, 0.5);
```

---

## Icon system

- **Primary source:** `assets/raw/illustrations/` — custom Kidovation illustration sets
- **UI icons:** Lucide React — consistent stroke width, never mix families
- **Never use emojis as icons**
- **Block letters** (A-FONT-003 to A-FONT-006): PNG image elements only, not CSS text

---

## Image handling

```css
/* All images: WebP/AVIF with PNG fallback */
/* Always declare width + height to prevent CLS */
/* Lazy load: loading="lazy" on all non-hero images */
/* Hero: eager loading, high priority */
/* Event photos (A-IMG-003): real photography only — no filters that obscure reality */
/* Team photos (A-IMG-002): consistent treatment — dark bg, no drop shadows */
```

---

## Dark mode

Site is **dark-first**. `--bg-page: #080C18` is the default. No light mode planned for v1.

---

## Anti-patterns — never do

- Pastel colors or soft gradients
- Glassmorphism panels as a primary surface
- Rounded-card grid layouts with equal padding (boring, AI-default)
- Stock photography or AI-generated images
- Icon emojis
- Default AI font pairings (Roboto+Open Sans, Lato+Montserrat, etc.)
- Decorative animations that don't express cause and effect
- Shadow text on hero images
- Centered body text beyond 2 lines

---

## Accessibility baseline

- Contrast: 4.5:1 minimum for all text, 3:1 for large (>18px bold)
- Focus rings: visible, 2px, `--color-kido-teal` color
- Touch targets: 48px minimum height, 8px minimum gap
- `prefers-reduced-motion`: all CSS animations wrapped in media query
- Alt text: all alien characters need descriptive alt text
- Headings: strict hierarchy — never skip levels

---

## Brand application by context

| Context | Primary accent | Alien |
|---------|---------------|-------|
| Kidovation sections | `--color-kido-green` | Green alien (primary) |
| Future Labs sections | `--color-fl-orange` | Pink/blue alien |
| Innovation X / umbrella | `--gradient-ix` | All three aliens |
| Partner / credibility | Neutral navy | None |

---

## Status

`generated` — 2026-03-26
All pages inherit these tokens. Override in `design-system/pages/<slug>.md` if needed.
