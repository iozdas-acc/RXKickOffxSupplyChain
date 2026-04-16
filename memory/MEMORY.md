# Project Memory — Hot Summary

> Last updated: 2026-04-16

---

## Project

**Name:** RX KickOff — Sainsbury's Agentic Transformation
**Client:** Sainsbury's / Accenture Interactive (RX)
**Stage:** In progress — 3 of 5 sub-pages complete
**URL:** localhost:3000 (Next.js 15 App Router, Vercel target)
**Goal:** 5-chapter immersive web story. Each chapter is a standalone scrollable page.

---

## Architecture (pivoted to sub-pages)

Five standalone scrollable pages at `/intro`, `/the-project`, `/the-learning`, `/the-model`, `/the-template`.
- Original architecture was single-page presentation at `/` — superseded
- `/` still has the immersive R3F canvas experience (Chapter01–05 components)
- Sub-pages are the real deliverable: dark+light alternating sections, GSAP hero, Framer Motion scroll
- Each sub-page has a `layout.tsx` with `overflow: auto !important` to override the presentation CSS

---

## Pages

| Slug | Title | Status | Quality |
|------|-------|--------|---------|
| `intro` | Impact at a Glance | complete | — |
| `the-project` | The Procurement Transformation | complete | — |
| `the-learning` | What We Learned | complete | 90/100 (R7) |
| `the-model` | The Hybrid Approach | not started | — |
| `the-template` | The Future of Agentic Transformation | not started | — |

---

## Visual System (sub-pages)

- Hero: dark `#1A1A1A`, GSAP entrance (back.out spring), mouse parallax (desktop)
- Sections alternate: dark `#1A1A1A`/`#222222` and light `#F5F5F5`/`#FAFAFA`
- Accent: `#F06C00` (orange) — overlines, dividers, highlighted pills
- Display: Space Grotesk 700 italic; Body: DM Sans; Labels: Space Mono uppercase
- Motion: Framer Motion `useInView` scroll entry; GSAP hero only
- Cards: white border `#E5E5E5` or orange tint `#F06C00/05` bg with `#F06C00/20` border

---

## Key Decisions

| D-ARCH-001 | Next.js 15, sub-page architecture | accepted |
| D-DS-001 | Sub-page visual system: dark/light alternating, orange accent | **superseded by D-DS-002** |
| D-DS-002 | RX + Sainsbury's light executive (A-MOCK-001 tokens + multi-ref synthesis) | accepted |
| D-QB-001 | Multi-reference synthesis quality benchmark | accepted |
| D-LAY-001 | `the-learning` Two-Speeds split-screen hero | accepted |

> **Note on existing page scores:** `the-learning` was scored 90/100 against the old benchmark (R7). Under D-QB-001 it needs re-evaluation — criteria have changed (brand fidelity to A-MOCK-001, A-REF-NNN usage, blend check). Rescore before marking it "done" under the new rubric.

---

## Open Issues

| I-001 | low | Impact numbers TBD — placeholders in Chapter01 STATS array |
| I-004 | low | `/the-learning` old IDE revert hook — not user-facing |

---

## What's Next

1. Design + build `the-model` page
2. Design + build `the-template` page
3. Update sitemap.md statuses after each page completes
