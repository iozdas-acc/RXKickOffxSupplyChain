# Design System — MASTER
# RX KickOff: Sainsbury's × Accenture Agentic Transformation
# LIGHT EXECUTIVE EDITION (D-DS-002)

> Style direction: A-MOCK-001 co-brand tokens + supermarket 3D metaphor.
> Architecture: Single-page presentation — 5 chapters on root `/`.
> Palette: light / warm / premium. Typography: oversized editorial display.

## Source of truth

Brand tokens: **A-MOCK-001** (`assets/raw/SNSBRYxRX New Consulting Approach/app/globals.css`).
CSS variables registered in `site/app/globals.css`. Tailwind mappings in `site/tailwind.config.ts`.
Zero hardcoded hex elsewhere (P-COLOR-001, enforced by `memory/quality-benchmark.md`).

## Surface System

| Token | Hex | Role |
|-------|-----|------|
| `--color-background-primary`   | `#FAFAFA` | Page background (A-MOCK-001) |
| `--color-background-secondary` | `#F5F5F5` | Muted tint, nav, track elements |
| `--color-background-tertiary`  | `#F0EEE8` | Warm card surface (plan HTML) |
| `--color-surface-card`         | `#FFFFFF` | Raised card (A-MOCK-001) |
| `--color-surface-raised`       | `#FFFFFF` | Hover / elevated state |

## Text System

| Token | Hex | Role |
|-------|-----|------|
| `--color-text-primary`   | `#1A1A1A` | Body + display (A-MOCK-001) |
| `--color-text-secondary` | `#666666` | Descriptions (A-MOCK-001) |
| `--color-text-tertiary`  | `#8E8E8E` | Overlines, captions |
| `--color-text-muted`     | `#A3A3A3` | Inactive nav numerals |
| `--color-text-inverse`   | `#FFFFFF` | On primary / accent |

## Border System

| Token | Hex | Role |
|-------|-----|------|
| `--color-border-primary`   | `#E5E5E5` | Card borders (A-MOCK-001) |
| `--color-border-secondary` | `#EEEEEE` | Section dividers |
| `--color-border-tertiary`  | `#F0F0F0` | Subtle rules |
| `--color-border-focus`     | `#F06C00` | Ring on focus |

## Brand Colors (A-MOCK-001 — registered, never alter)

| Token | Hex | Role |
|-------|-----|------|
| `--sainsburys-orange`      | `#F06C00` | Primary — CTAs, stats, Ch.1 zone |
| `--sainsburys-orange-dark` | `#E55000` | Primary hover |
| `--sainsburys-orange-soft` | `#FFF3ED` | Orange wash, pill bg |
| `--accenture-purple`       | `#A100FF` | AI/tech, Ch.5, gradient endpoint |
| `--accenture-purple-dark`  | `#7A00CC` | Purple hover |
| `--accenture-purple-soft`  | `#F3F0FF` | Purple wash, Ch.5 zone tint |

## Horizon Colors (H1/H2/H3 — never repurposed)

| Token | Hex | Role |
|-------|-----|------|
| `--horizon-1` | `#0891B2` | Horizon 1 — cyan/teal |
| `--horizon-2` | `#059669` | Horizon 2 — emerald/green |
| `--horizon-3` | `#7C3AED` | Horizon 3 — purple |

Soft variants (`-soft`) for zone wash backgrounds.

## Per-Chapter Accent Zones (D-DS-003)

Page bg stays `#FAFAFA` across all chapters. Per-chapter zone colour applied to
cards, pills, 3D key light, and active nav numeral via `--accent-chN`. Chapter
components reference `--accent-chN` only — never the underlying colour — so
zone tuning stays centralised (P-TECH-001).

| Chapter | Token | Resolves to | Theme |
|---------|-------|-------------|-------|
| Ch.1 — Hero              | `--accent-ch1` | `--sainsburys-orange` | Products landing |
| Ch.2 — Timeline          | `--accent-ch2` | `--horizon-1`          | Conveyor belt    |
| Ch.3 — Pace Mismatch     | `--accent-ch3` | `--horizon-2`          | Trolley vs scan  |
| Ch.4 — Horizons          | `--accent-ch4` | `--horizon-3`          | Three aisles     |
| Ch.5 — Every Engagement  | `--accent-ch5` | `--accenture-purple`   | Gradient finale  |

Ch.5 finale also has `--accent-ch5-gradient: linear-gradient(135deg, #F06C00 0%, #A100FF 100%)`.

## Typography

- Display: Space Grotesk 700, uppercase, `letter-spacing: -0.02em`, `line-height: 1.05`. Dark on light.
- Body: DM Sans 400, 15–16px, `line-height: 1.7`, `color: var(--color-text-secondary)`.
- Mono/overline: Space Mono 700, 10–11px, uppercase, `letter-spacing: 0.3em`, `color: var(--color-text-tertiary)`.
- Stats: Space Grotesk 800, `tabular-nums`, `letter-spacing: -0.04em`, `color: var(--sainsburys-orange)`.

**⚠ Open question:** A-MOCK-001 mandates **Geist**. Plan HTML says "keep the oversized display type — it's the soul of the site" (read as scale/weight, not typeface). Phase 1 holds current fonts. Resolve before Phase 2 completes.

## Cards & UI

Raised card (default):

```css
background: var(--color-surface-card);           /* #FFFFFF */
border: 1px solid var(--color-border-primary);
border-radius: var(--radius-md);
box-shadow: var(--shadow-sm);
```

Hover: `box-shadow: var(--shadow-md)`, `translateY(-2px)`, `300ms var(--ease-out)`.

Warm tinted (per-chapter zone wash):

```css
background: var(--color-background-tertiary);    /* #F0EEE8 */
border: 0.5px solid var(--color-border-tertiary);
border-radius: var(--radius-md);
```

Utility classes exposed: `.surface-card`, `.surface-tinted`. Legacy `.glass` /
`.glass-dark` remain as light-world aliases so untouched components still
render correctly during Phase 2 migration.

## Layout

Full-viewport, no-scroll. `overflow: hidden` on `html/body`.
Padding: `clamp(48px, 6vw, 100px)` + `paddingTop: 80px` (nav clearance).
Z-index: Canvas 0 · Content 50 · Nav 110.

## Motion

Durations: `--duration-micro` 150ms · `--duration-standard` 300ms · `--duration-emphasis` 500ms · `--duration-page` 800ms.
Easing: `--ease-out` `cubic-bezier(0.0, 0, 0.2, 1)` · `--ease-spring` `cubic-bezier(0.22, 1, 0.36, 1)`.
Physics: float/settle logic from prior build reused (D-MOT-001). All animations honour `prefers-reduced-motion`.

## Shadows (light world)

| Token | Value |
|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(26,26,26,0.04)` |
| `--shadow-sm` | `0 2px 6px rgba(26,26,26,0.06)` |
| `--shadow-md` | `0 6px 20px rgba(26,26,26,0.08)` |
| `--shadow-lg` | `0 12px 40px rgba(26,26,26,0.10)` |
| `--shadow-orange` | `0 12px 32px rgba(240,108,0,0.18)` |
| `--shadow-purple` | `0 12px 32px rgba(161,0,255,0.15)` |

## Anti-Patterns

- No dark sections (`#06061A`, `--bg-deep` literal) — light only
- No frosted-glass blur panels — soft-shadow cards instead
- No hardcoded hex outside `site/app/globals.css` (P-COLOR-001)
- No orange on body text (contrast fail) — primary only on CTAs/stats/display
- No hamburger nav, no page scroll
- No animating `width/height/top/left` — use `transform`/`opacity`

## Decisions referenced

- D-DS-002 — light executive direction
- D-DS-003 — per-chapter accent zones + token operationalisation
- D-3D-001 — supermarket primitive library
- D-MOT-001 — reuse float physics, add reduced-motion gate
- P-COLOR-001 — tokens only, no inline hex
- P-TECH-001 — chapters go through `--accent-chN` indirection
