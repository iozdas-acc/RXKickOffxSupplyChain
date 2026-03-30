# Innovation X — Web Rebuild (v2)

Website for the Innovation X ecosystem: **Kidovation** and **Future Labs** — hands-on innovation programmes turning young people into confident thinkers and innovators.

Built by Accenture Song, Gen 3 team. 10 years · 12 markets · 3,111+ young people.

---

## Stack

- **Next.js 15** — App Router, server + client components
- **React 19** — UI
- **TypeScript** — strict mode
- **GSAP** — scroll-triggered animations, count-up, entrance timelines
- **React Three Fiber v9 + Drei** — 3D hero scene (WebGL with fallback)
- **Tailwind CSS** — utility classes
- **CSS custom properties** — design tokens (`site/app/globals.css`)
- **next/font** — Syne (display), Inter (body), Permanent Marker (accent)

---

## Getting started

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## Project structure

```
WebContext/
├── site/                    # Next.js app
│   ├── app/
│   │   ├── globals.css      # Design tokens + layout classes
│   │   ├── layout.tsx       # Root layout: fonts, Nav, Footer
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── home/
│   │       ├── Hero.tsx         # GSAP entrance + R3F alien scene
│   │       ├── AlienScene.tsx   # Three.js / R3F canvas
│   │       ├── Stats.tsx        # Count-up animation
│   │       ├── WhatIsIX.tsx     # Ecosystem diagram
│   │       ├── Ecosystem.tsx    # Kidovation / Future Labs panels
│   │       ├── Mission.tsx      # Full-bleed quote section
│   │       └── Events.tsx       # Asymmetric photo grid
│   └── public/
│       ├── images/events/   # Real event photos
│       └── fonts/           # Permanent Marker (local)
│
├── pages/                   # Design + build specs per page
│   ├── home/
│   ├── kidovation/
│   ├── about/
│   ├── future-labs/
│   └── work-with-us/
│
├── design-system/
│   └── MASTER.md            # Token architecture
│
├── assets/
│   └── raw/                 # Brand assets, photos, logos
│
├── memory/                  # Project memory (decisions, issues, preferences)
└── scripts/
    └── screenshot.js        # Playwright audit screenshots
```

---

## Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Built ✓ |
| Kidovation | `/kidovation` | Shell only |
| Future Labs | `/future-labs` | Shell only |
| About | `/about` | Shell only |
| Work With Us | `/work-with-us` | Shell only |

---

## Design tokens

All tokens live in `site/app/globals.css` as CSS custom properties. Key ones:

```css
--color-kido-green:  #7EC83A   /* Kidovation accent */
--color-fl-orange:   #FF6B35   /* Future Labs accent */
--color-midnight:    #080C18   /* Page background */
--font-display:      Syne 800
--font-body:         Inter
--text-d1:           clamp(4rem, 9vw, 8rem)
```

Never use raw hex values in components — always reference a token.

---

## Screenshot audit

After any build change, run:

```bash
node scripts/screenshot.js http://localhost:3000 home
```

This captures viewport-height slices at mobile (390px) and desktop (1440px), saved to `pages/home/screenshots/`. Each section gets its own readable slice for proper visual QA.

---

## Notes

- `node_modules/` and `site/.next/` are gitignored — run `npm install` after cloning
- Large binary assets (`.indd`, `.ai`, `assets/archive/`) are also excluded from git
- The R3F alien scene requires WebGL — a static SVG fallback renders automatically when unavailable
- All GSAP animations respect `prefers-reduced-motion`
