# Site Map

> Last updated: 2026-03-27
> Stack: Next.js (App Router) — D-ARCH-001
> Update by running `/plan`.

---

## Navigation

**Primary nav:** About | Kidovation | Future Labs | Work With Us
**Logo (top left):** Innovation X mark → links to `/`
**Footer nav:** About | Kidovation | Future Labs | Work With Us | Accenture Song (external)

---

## Page inventory

| Slug | Title | Route | Nav position | Buyer stage | Primary CTA | Priority | Status |
|------|-------|-------|-------------|-------------|-------------|----------|--------|
| `home` | Home | `/` | Logo only | Awareness | Explore Kidovation / Discover Future Labs | 🔴 1 | needs-rebuild (v2) |
| `kidovation` | Kidovation | `/kidovation` | Primary nav | Consideration | Sign up / Get in touch | 🔴 2 | brief done |
| `about` | About Us | `/about` | Primary nav | Consideration → Trust | Meet the team | 🟡 3 | brief done |
| `future-labs` | Future Labs | `/future-labs` | Primary nav | Consideration | Get in touch | 🟡 4 | brief done |
| `work-with-us` | Work With Us | `/work-with-us` | Primary nav (CTA highlighted) | Decision | Apply / Partner / Volunteer | 🟢 5 | brief done |

---

## User journey

```
Word of mouth / referral
        ↓
      Home  ←  orientation, sub-brand routing
     ↙    ↘
Kidovation  Future Labs  ←  programme details, social proof
     ↘    ↙
    About Us  ←  trust-building detour (team, story, credibility)
        ↓
  Work With Us  ←  conversion: sign up / partner / volunteer
```

Most visitors arrive warm (heard "Kidovation" from someone). They need to:
1. Confirm this is what they heard about
2. Understand what happens at an event
3. See that it's real and credible
4. Know how to get involved

---

## Content strategy

### Pillars

1. **Real impact** — 10 years, 3,111+ kids, 12 markets, 115 classrooms. Never claimed without proof.
2. **What actually happens** — Hackathon format, Lego, alien tech, AI challenges. Show don't tell.
3. **The people** — Generational team. People who grew up with the programme now lead it.
4. **Get involved** — Multiple paths in: participant, school partner, NGO, corporate host, volunteer.
5. **Two brands, one ecosystem** — Kidovation (kids) + Future Labs (teens) under Innovation X umbrella.

### Per-page content priority

| Page | Must say | Connects from | Connects to |
|------|----------|---------------|-------------|
| Home | What Innovation X is; introduce both sub-brands; 10 years of proof | Anywhere | Kidovation, Future Labs, Work With Us |
| Kidovation | What kids do at a hackathon; age range; impact numbers; how to sign up | Home, search | Work With Us |
| About | 10-year story; generational team structure; why this matters | Home, Kidovation | Work With Us |
| Future Labs | What the 16+ programme is; how it differs from Kidovation; how to join | Home | Work With Us |
| Work With Us | Three paths in: participant/parent, school/NGO partner, volunteer. Clear next step for each | Every page CTA | — (conversion end) |

---

## Scaffold (Next.js App Router)

```
site/
  app/
    layout.tsx          ← root layout: Nav + children + Footer
    page.tsx            ← Home (/)
    about/
      page.tsx          ← About Us (/about)
    kidovation/
      page.tsx          ← Kidovation (/kidovation)
    future-labs/
      page.tsx          ← Future Labs (/future-labs)
    work-with-us/
      page.tsx          ← Work With Us (/work-with-us)
  components/
    Nav.tsx             ← shared, built once in scaffold phase
    Footer.tsx          ← shared, built once in scaffold phase
  styles/
    globals.css         ← design tokens wired here
  lib/                  ← shared utilities
  public/
    assets/             ← logos, fonts, images referenced by pages
```

---

## Revision history

| Date | What changed | Pages affected |
|------|-------------|---------------|
| 2026-03-27 | First real sitemap written. v2 planning pass. Stack confirmed: Next.js (D-ARCH-001). All 5 pages defined. | all |
