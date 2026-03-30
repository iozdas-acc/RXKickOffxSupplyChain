# Skill: Frontend Design

Distinctive, production-grade frontend interfaces that reject generic AI aesthetics.
Design thinking first — establish bold aesthetic direction before writing a line of code.

---

## When to use this skill

- When the project needs a memorable, distinctive visual identity
- Before any page or component build to establish aesthetic direction
- When the client wants something that doesn't look AI-generated or template-driven
- When `design-system/` tokens are set and you need creative direction on top of them

---

## Design thinking process

Before coding, commit to a BOLD aesthetic direction:

1. **Purpose** — What problem does this interface solve? Who uses it?
2. **Tone** — Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
3. **Constraints** — Technical requirements (framework, performance, accessibility)
4. **Differentiation** — What makes this UNFORGETTABLE? What's the one thing someone will remember?

CRITICAL: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

---

## Aesthetic pillars

### Typography
- Choose fonts that are beautiful, unique, and interesting
- Avoid generic fonts: Arial, Inter, Roboto, Space Grotesk, system-ui defaults
- Pair a distinctive display font with a refined body font
- Unexpected, characterful font choices that elevate the aesthetic

### Color & Theme
- Commit to a cohesive aesthetic, use CSS variables for consistency
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- Vary between light and dark themes — never converge on common palettes
- Avoid clichéd schemes (particularly purple gradients on white)

### Motion
- Use animations for effects and micro-interactions
- Prioritize CSS-only solutions for HTML
- Use Motion library for React when available
- Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions
- Scroll-triggered effects and hover states that surprise

### Spatial Composition
- Unexpected layouts: asymmetry, overlap, diagonal flow, grid-breaking elements
- Generous negative space OR controlled density — commit to one
- Never default to predictable centred-stacked layouts

### Backgrounds & Visual Details
- Create atmosphere and depth rather than defaulting to solid colors
- Contextual effects and textures that match the overall aesthetic
- Creative forms: gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, grain overlays

---

## What to avoid

- Overused fonts: Inter, Roboto, Arial, system fonts, Space Grotesk
- Clichéd color schemes: purple gradients on white, pastel SaaS palettes
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
- Generic "AI-slop" aesthetics — no two designs should look the same

---

## Implementation rules

- Generate working, functional code (HTML/CSS/JS, React, Vue)
- Match implementation complexity to aesthetic vision:
  - Maximalist designs → elaborate code with extensive animations and effects
  - Minimalist designs → restraint, precision, careful attention to spacing and subtle details
- Production-grade and functional — not just a mockup
- Every visual choice should be intentional and defensible

---

## Relationship to other skills

| Skill | Responsibility |
|-------|---------------|
| `frontend-design/` | Creative direction, aesthetic decision-making, distinctive execution |
| `design-system/` | Token architecture, spacing scale, component API structure |
| `web2d/` | Layout patterns, CSS architecture, accessible HTML |
| `motion/` | Animation orchestration, scroll triggers, GSAP/Framer patterns |
| `web3d/` | WebGL scenes, Three.js, volumetric visuals |

Use `frontend-design` to define the "what and why it looks this way", then build with the other skills.

---

## Source

Anthropic official skill — `frontend-design`
Repository: anthropics/skills
