# Home — Build

> Version: 2 — Next.js rebuild
> Last updated: 2026-03-27
> Stack: Next.js 15, App Router, React 19, R3F 8, GSAP 3.12, Tailwind v3

---

## Component inventory

| Section | Component | Approach | Decision refs | Notes |
|---------|-----------|----------|---------------|-------|
| Home page | `app/page.tsx` | Server component, composes sections | D-ARCH-001 | Metadata, skip link, landmark `<main>` |
| Hero | `components/home/Hero.tsx` | `'use client'` — GSAP mount animation | D-LAY-001, D-DS-002 | Split 55/45 desktop |
| Hero 3D | `components/home/AlienScene.tsx` | `'use client'` — R3F Canvas | D-DS-002 | Procedural geometry, `alpha: true`, WebGL fallback |
| Stats bar | `components/home/Stats.tsx` | `'use client'` — GSAP count-up | D-MOT-001, D-LAY-002 | 4-col desktop, 2×2 mobile |
| What is IX | `components/home/WhatIsIX.tsx` | `'use client'` — GSAP scroll reveal | D-LAY-003 (diagram) | Inline SVG ecosystem diagram |
| Ecosystem | `components/home/Ecosystem.tsx` | `'use client'` — GSAP slide-in | D-LAY-003 | Full-width 50/50 panels |
| Mission | `components/home/Mission.tsx` | `'use client'` — GSAP scroll reveal | D-LAY-004 | Next.js `<Image>` bg, Permanent Marker quote mark |
| Events | `components/home/Events.tsx` | `'use client'` — GSAP stagger | D-LAY-005 | Next.js `<Image>`, 6 photos, asymmetric grid |

---

## Interactions and motion spec

| Element | Mechanism | Trigger | Duration | Ease | Reduced-motion |
|---------|-----------|---------|----------|------|----------------|
| Hero H1 words | GSAP timeline | Mount | 0.6s/word, stagger 0.15s | power2.out | Show final state |
| Hero subhead + CTAs | GSAP timeline | Mount | 0.4–0.5s | power2.out | Show final state |
| Alien float | R3F useFrame sine | Continuous | 3s cycle | sine | Hold position |
| Stats count-up | GSAP ScrollTrigger | top 80% | 1.2s, stagger 100ms | power2.out | Show target value |
| What is IX text + diagram | GSAP ScrollTrigger | top 80% | 0.8s, stagger 0.15s | power2.out | Static |
| Ecosystem panels | GSAP ScrollTrigger | top 80% | 0.7s, ±x stagger 0.12s | power2.out | Static |
| Mission pull quote | GSAP ScrollTrigger | top 75% | 0.4s | power2.out | Static |
| Events photo cells | GSAP ScrollTrigger batch | top 80% | 0.5s, stagger 80ms | power2.out | All visible |
| Hover: panels | CSS transition | Hover | 250ms | --ease-spring | Color only |
| Hover: photo cells | CSS transition | Hover | 250ms | --ease-smooth | Remove scale |
| Hover: CTAs | CSS transition | Hover | 150ms | --ease-out | Color only |
| Scroll indicator | CSS @keyframes | Immediate | 1.5s loop | ease-in-out | Hidden |

All GSAP animations check `prefers-reduced-motion: reduce` before running (D-MOT-002).

---

## Performance budget

| Metric | Target | Notes |
|--------|--------|-------|
| Lighthouse overall | ≥ 90 | |
| LCP | < 3.5s | R3F in hero — extended budget |
| CLS | < 0.1 | Canvas gets explicit width/height; images use Next.js Image with sizes |
| FID / INP | < 200ms | GSAP animations don't block main thread |
| JS bundle (initial) | < 200KB gzip | R3F lazy-loaded via dynamic import |
| Event photos | ≤ 80KB each | Next.js Image auto-optimises; srcSet + lazy load |
| Alien Canvas | 30–40 particles, 5 meshes max | No post-processing |

### Performance rules applied (from react-best-practices-vercel skill)
- R3F Canvas: `dynamic(() => import('./AlienScene'), { ssr: false })` — no SSR for WebGL
- Event photos: `<Image>` with `loading="lazy"`, `priority={false}`, explicit `width`/`height`
- GSAP: imported per-component, not globally — tree-shakeable
- CSS transitions used for hover states — never JS-driven hover

---

## Decision cross-references

| Decision ID | Title | How it affects this build |
|-------------|-------|--------------------------|
| D-ARCH-001 | Next.js 15 App Router | `'use client'` on R3F + GSAP components; Server components for static shells |
| D-DS-002 | R3F alien procedural (no .glb) | AlienScene: procedural geometry only, no loaders |
| D-MOT-001 | GSAP stats count-up | Stats.tsx uses ScrollTrigger + numeric interpolation |
| D-MOT-002 | prefers-reduced-motion gating | All GSAP animations wrapped in `matchMedia` check |
| D-LAY-001 | 55/45 hero split | Hero layout CSS grid |
| D-LAY-002 | 4-col stats bar | Stats grid, dividers |
| D-LAY-003 | Ecosystem full-width panels | 50vw each, no container |
| D-LAY-004 | Mission center-aligned (only section) | Text center, narrow max-width |
| D-LAY-005 | Events 1fr 2fr 1fr asymmetric | CSS grid-template-columns |
