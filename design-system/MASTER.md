# Design System — MASTER
# RX KickOff: Sainsbury's Agentic Transformation
# DARK IMMERSIVE EDITION

> Style direction: Pollen360 / noomo aesthetic. Dark canvas, glass-morphism, keyboard navigation.
> Architecture: Single-page presentation — all 5 chapters on root `/`.
> Supermarket elements as 3D motif. Space Grotesk + DM Sans + Space Mono.

## Brand Colors

| Token | Hex | Role |
|-------|-----|------|
| `--sainsburys-orange` | `#F06C00` | Primary — stats, overlines, CTAs |
| `--accenture-purple` | `#A100FF` | AI/tech moments, Chapter 5 |
| `--bg-deep` | `#06061A` | Page background |
| `--bg-glass` | `rgba(14,14,31,0.65)` | Glass cards |
| `--text-primary` | `#F0F0F8` | Main text |
| `--text-secondary` | `#A0A0C0` | Descriptions |
| `--text-muted` | `#505070` | Labels, captions |

## Horizon Colors (H1/H2/H3 only)

| Token | Hex | Chapter |
|-------|-----|---------|
| `--horizon-1` | `#0891B2` | Chapter 2 accent |
| `--horizon-2` | `#059669` | Chapter 3 accent |
| `--horizon-3` | `#7C3AED` | Chapter 4 accent |

## Chapter Accents

01 orange `#F06C00` · 02 cyan `#0891B2` · 03 emerald `#059669` · 04 purple `#7C3AED` · 05 deep purple `#A100FF`

## Typography

Display: Space Grotesk 700, uppercase, `letter-spacing: -0.02em`, `line-height: 0.95`
Body: DM Sans 400, 13–16px, `line-height: 1.7`, `color: var(--text-secondary)`
Mono/labels: Space Mono 700, 9–11px, uppercase, `letter-spacing: 0.3em`
Stats: Space Grotesk 800, `font-variant-numeric: tabular-nums`, color orange

## Glass Morphism (all cards)

```css
background: rgba(14, 14, 31, 0.65);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 12px;
```
Hover: `border-color` → `[accentColor]50`, `translateY(-4px)`, transition 0.25s

## Layout

Full-viewport, no-scroll. `overflow: hidden` on html/body.
Padding: `clamp(48px, 6vw, 100px)` + `paddingTop: 80px` (nav clearance).
Nav z-index: 110. Content z-index: 50. Canvas z-index: 0.

## Anti-Patterns

- No light sections — dark everywhere
- No solid cards — glass only
- No orange on body text (contrast)
- No hamburger nav
- No scroll
- No animating width/height/top/left
