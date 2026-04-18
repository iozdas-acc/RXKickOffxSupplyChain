# Project Memory — Hot Summary

> Last updated: 2026-04-18

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
| D-DS-003 | Per-chapter accent zones + token operationalisation | accepted |
| D-3D-001 | Supermarket primitive library (abstracted silhouettes) | accepted |
| D-MOT-001 | Reuse float/settle physics + reduced-motion gate | accepted |
| D-QB-001 | Multi-reference synthesis quality benchmark | accepted |
| D-LAY-001 | `the-learning` Two-Speeds split-screen hero | accepted |

> **Note on existing page scores:** `the-learning` was scored 90/100 against the old benchmark (R7). Under D-QB-001 it needs re-evaluation — criteria have changed (brand fidelity to A-MOCK-001, A-REF-NNN usage, blend check). Rescore before marking it "done" under the new rubric.

---

## Open Issues

| I-001 | low | Impact numbers TBD — placeholders in Chapter01 STATS array |
| I-004 | low | `/the-learning` old IDE revert hook — not user-facing |
| I-005 | medium | Orange on #FAFAFA ≈3.4:1 — fails AA normal at 10–12px overlines |
| I-006 | low | Ch.2 teal (horizon-1) ≈4.1:1 — borderline AA normal |
| I-007 | low | Ch.5 gradient orange leading edge ≈3.4:1 — AA-large compliant only |
| I-008 | low | NavBar frosted-blur pragmatic override of no-glass anti-pattern |

---

## What's Next

1. **Redesign Phase 2** — fan out 7 subagents for palette migration (shell, nav/entrance, 5× chapter). Spec: `memory/specs/sainsburys-redesign-plan.md`. Phase 1 (tokens) complete 2026-04-18.
2. **Redesign Phase 3** — supermarket primitive library, then 5 scene agents (one per chapter).
3. Design + build `the-model` page · Design + build `the-template` page.
4. Update sitemap.md statuses after each page completes.
