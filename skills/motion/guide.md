# Skill: Motion

GSAP, Framer Motion, and CSS animation patterns.
Motion is additive — it should enhance meaning, not decorate for its own sake.

---

## Tool selection

| Tool | Use for |
|------|---------|
| **CSS animations** | Simple, performant micro-interactions. Hover states, loading spinners, focus rings. |
| **GSAP** | Sequence-driven timelines, scroll-triggered effects, complex choreography across multiple elements. |
| **Framer Motion** | React component transitions, layout animations, gesture interactions (drag, hover, tap). |

**Rule: never use JS animation for something CSS handles well.**

---

## CSS animations

### When to use
- Hover state transitions (opacity, color, transform)
- Loading indicators
- Simple entrance animations (single element, no sequencing)

### Performance-safe properties
Only animate these properties to avoid layout/paint:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly — can be expensive)

```css
/* Good — compositor-only */
.card:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease;
}

/* Bad — triggers layout */
.card:hover {
  margin-top: -4px;
  transition: margin 0.2s ease;
}
```

### Respect user preference
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## GSAP

### When to use
- Orchestrated sequences (A happens, then B, then C)
- Scroll-triggered reveals and parallax
- Number counters, text reveals, path animations
- Any animation that needs precise timing control

### Setup
```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Scroll-triggered entrance pattern
```js
gsap.from('.section-content', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'top 40%',
    scrub: false, // true = tied to scroll position
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.1, // for multiple elements
})
```

### Timeline pattern (sequenced)
```js
const tl = gsap.timeline({ paused: true })
tl.from('.hero-heading', { y: 30, opacity: 0, duration: 0.6 })
  .from('.hero-sub', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-cta', { opacity: 0, duration: 0.4 }, '-=0.2')
tl.play()
```

### Cleanup (React)
```js
useEffect(() => {
  const ctx = gsap.context(() => {
    // all GSAP code here
  }, containerRef)
  return () => ctx.revert()
}, [])
```

---

## Framer Motion

### When to use
- React page/route transitions
- Component mount/unmount animations
- Drag interactions
- Layout animations (elements reflow with animation)

### Basic entrance
```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  content
</motion.div>
```

### Stagger children
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

---

## Easing reference

| Ease | Feel | Use for |
|------|------|---------|
| `power2.out` | Decelerating | Most entrances |
| `power2.in` | Accelerating | Exits |
| `power2.inOut` | Smooth start/end | Transitions |
| `elastic.out(1, 0.5)` | Springy | Playful interactions |
| `linear` | Mechanical | Loading bars, counters |

---

## Motion principles

1. **Entrances decelerate** — things arrive, they don't slam in
2. **Exits accelerate** — things leave quickly
3. **Stagger adds life** — offset sibling animations by 80–120ms
4. **Less is more** — if removing an animation doesn't break the meaning, remove it
5. **Duration guide** — micro: 100–200ms, transitions: 300–500ms, cinematic: 600ms+
