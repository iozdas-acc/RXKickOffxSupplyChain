# Asset Manifest

Master index of all project assets.
Every image, mockup, logo, video, font, PDF, and reference file is tracked here.

**ID format:** `A-[TYPE]-[NNN]`

| Prefix | Type |
|--------|------|
| `LOGO` | Logos & brand marks |
| `IMG` | Images & photography |
| `MOCK` | Mockups & design references |
| `VID` | Video & media |
| `FONT` | Fonts |
| `DOC` | Documents & PDFs |
| `ICON` | Icons & SVGs |

**Pipeline:** `uploaded` → `processed` → `approved` → `in-use`

---

## Format

```
### A-[TYPE]-[NNN] — [asset-slug]
- File: [filename with extension]
- Type: logo | image | mockup | video | font | doc | icon
- Source: assets/raw/ | assets/processed/ | assets/approved/ | external
- Status: uploaded | processed | approved | in-use | rejected
- Assigned to: [page slug(s) or "global"]
- Usage: [where/how it's used — e.g., "hero background", "nav logo"]
- Added: YYYY-MM-DD
- Notes: [dimensions, format notes, client approval reference, etc.]
```

---

## Logos & Brand `LOGO`

### A-LOGO-002 — kidovation-alien
- File: kidovation-alien.png
- Kind: logo
- Type: logo
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation logo lockup — wordmark + green alien mascot on black background; "Inspiring the next generation" tagline
- Added: 2026-03-25
- Notes: Black background version. Same alien character as in A-LOGO-001 but isolated as standalone hero asset. Primary mascot for Kidovation brand.

### A-LOGO-003 — kidovaition-2025-primary
- File: logos/kidovaition-2025/rgb-digital/ (8 SVG + 8 PNG)
- Type: logo
- Source: assets/raw/logos/kidovaition-2025/rgb-digital/
- Status: uploaded
- Assigned to: global
- Usage: Primary brand logos — digital/web use. Variants: AI, Full_Black, Full_White, I, Plain_Black, Plain_White, Song_Black, Song_White
- Added: 2026-03-26
- Notes: RGB color space. SVG preferred for web. 8 distinct lockup variants covering all background/context combos.

### A-LOGO-004 — kidovaition-2025-print
- File: logos/kidovaition-2025/cmyk-print/ (8 PDF + 8 TIFF + AI source)
- Type: logo
- Source: assets/raw/logos/kidovaition-2025/cmyk-print/ + source/
- Status: uploaded
- Assigned to: global
- Usage: Print production — CMYK color space. Not for web use.
- Added: 2026-03-26
- Notes: TIFF files at high res. AI source files also in source/ subfolder.

### A-LOGO-005 — kidovation-legacy
- File: logos/legacy/ (2021/, 2020/, archive/, new-design-2021/)
- Type: logo
- Source: assets/raw/logos/legacy/
- Status: uploaded
- Assigned to: global
- Usage: Reference only — historical logo versions. Do NOT use directly in new design.
- Added: 2026-03-26
- Notes: 2021 = last approved pre-rebrand. 2020 = .ai source files. archive = pre-2020 variants. new-design-2021 = 29 SVG exploration assets from rebrand process.

### A-LOGO-006 — acn-interactive
- File: logos/acn-interactive/ (full-color/, one-color/, black-or-white-purple/)
- Type: logo
- Source: assets/raw/logos/acn-interactive/
- Status: uploaded
- Assigned to: global
- Usage: ACN Interactive service mark — for co-branding if needed
- Added: 2026-03-26
- Notes: AI + SVG + PNG variants in all 3 subfolders. CMYK, PMS, and RGB versions available.

### A-LOGO-001 — logos-new
- File: logos-new.png
- Kind: logo
- Type: logo
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: New logo set for all three brands — two versions each
- Added: 2026-03-25
- Notes: |
    Innovation X: gradient X with orbit ring (detailed) + flat gradient X (simple)
    Future Labs: rocket flask with flames (detailed) + V/flask shape (simple)
    Kidovation: teal alien in planet ring (detailed) + robot/alien goggle face (simple)
    Color palette visible: purple, orange, blue, teal gradients
    ⚠️ Detailed illustrated versions preferred — alien character to be explored as 3D asset

---

## Images & Photography `IMG`

### A-IMG-005 — world-map-illustrations
- File: illustrations/world-map/ (6 files: SVG + PNG)
- Type: image
- Source: assets/raw/illustrations/world-map/
- Status: uploaded
- Assigned to: global
- Usage: World map, globe, country tag — for geographic/global reach storytelling
- Added: 2026-03-26
- Notes: Map.svg, Globe planet.svg, Country tag.svg + PNG exports. Also has .sketch source.

### A-IMG-006 — things-illustrations
- File: illustrations/things/ (5 files: SVG + PNG)
- Type: image
- Source: assets/raw/illustrations/things/
- Status: uploaded
- Assigned to: global
- Usage: Miscellaneous object illustrations — bike, cats, fish tank
- Added: 2026-03-26
- Notes: bike.svg only (no PNG). cat1 + fish tank in SVG + @4x PNG.

### A-IMG-007 — dubai-expo-mascots
- File: illustrations/characters/dubai-expo/ (11 files: PNG + screenshots)
- Type: image
- Source: assets/raw/illustrations/characters/dubai-expo/
- Status: uploaded
- Assigned to: global
- Usage: Dubai Expo 2021 mascot illustrations — reference for event-specific character design
- Added: 2026-03-26
- Notes: 5 numbered PNGs + 6 screenshots. Reference/archive use.

### A-IMG-008 — schools-illustrations
- File: illustrations/schools/ (1 .ai file)
- Type: image
- Source: assets/raw/illustrations/schools/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation Challenge school illustrations — .ai source only, needs export
- Added: 2026-03-26
- Notes: Kidovation Challenge_illustrations_CY.ai — export SVG/PNG before use.

### A-IMG-001 — brand-images-inspiration
- File: brand-images-inspiration.pdf
- Kind: brand-guideline
- Type: doc
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Brand imagery and visual inspiration reference
- Added: 2026-03-25
- Notes: Original at OneDrive → Kidovation/Brand-Images-Inspiration.pdf

### A-IMG-002 — team-photos
- File: team/ (7 photos)
- Kind: photography
- Type: image
- Source: assets/raw/team/
- Status: uploaded
- Assigned to: global (team page / about)
- Usage: Real headshots — generational team structure
- Added: 2026-03-25
- Notes: |
    Gen 1 (Founder): Fiona Russell
    Gen 2 (Leads): Anastasia Palchikova, Christine Yu, Hannah Stephens
    Gen 3 (Current): Izzie Ozdas, Jack Riley, Azeez Adebayo
    Original at Downloads/OneDrive_1_25-03-2026/

### A-IMG-003 — event-photos
- File: event-photos/ (23 photos, .jpg)
- Kind: photography
- Type: image
- Source: assets/raw/event-photos/
- Status: uploaded
- Assigned to: global
- Usage: Real event photography — kids at Kidovation events (2018, 2019, 2025)
- Added: 2026-03-25
- Notes: Original at OneDrive → Kidovation/Kidovation event photos/

### A-IMG-004 — kidovation-alien-characters
- File: kidovation-alien-characters.png
- Kind: character-design
- Type: image
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Full alien character set — three variants: green (one eye, waving), blue (round/fuzzy, one eye), pink (eye on stalk). Core mascot system.
- Added: 2026-03-25
- Notes: |
    Green alien: same as logo mascot — dominant brand character
    Blue alien: round, fluffy texture — friendly/approachable variant
    Pink alien: tall stalk eye — curious/quirky variant
    All three share the same one-eye treatment. Use as character system across pages.
    ⚠️ Candidate for 3D treatment (see A-LOGO-001 note + A-LOGO-002)

---

## Mockups & References `MOCK`

### A-MOCK-000 — vision-statement-inspo
- File: vision-statement-inspo.png
- Kind: deck
- Type: mockup
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Strategy deck screenshot — FY26 focus, timeline, vision & mission copy, brand color clues
- Added: 2026-03-25
- Notes: Contains vision, mission, journey timeline 2015–2025, FY26/27 goals. Original on Desktop.

### A-MOCK-001 — ux-ideas
- File: ux-ideas.pdf
- Kind: wireframe
- Type: mockup
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: UX ideas and layout concepts — reference for structure and interaction patterns
- Added: 2026-03-25
- Notes: ⚠️ Reference only — do not treat as final spec. Original at OneDrive → Kidovation/UX-ideas.pdf

### A-MOCK-002 — structure-of-website
- File: structure-of-website.pdf
- Kind: wireframe
- Type: mockup
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Proposed site structure and page hierarchy
- Added: 2026-03-25
- Notes: ⚠️ Reference only — do not treat as final spec. Original at OneDrive → Kidovation/Structure of Website.pdf

### A-MOCK-003 — site-v1
- File: site-v1/ (folder)
- Kind: existing-site
- Type: mockup
- Source: assets/raw/site-v1/
- Status: uploaded
- Assigned to: global
- Usage: Previous website version (Vite + React) — for reference only
- Added: 2026-03-25
- Notes: ⚠️ REFERENCE ONLY — do not copy patterns or code from this. Use for content inventory only. node_modules excluded. Original at OneDrive → Kidovation/site/

---

## Video & Media `VID`

### A-VID-002 — kidovation-animation-archive
- File: animation/gifs/-Archive/ (4 GIF + 1 MP4 + PSDs)
- Type: video
- Source: assets/raw/animation/gifs/-Archive/
- Status: uploaded
- Assigned to: global
- Usage: Animated Kidovation logo GIFs (waving alien) + sticker animation MP4
- Added: 2026-03-26
- Notes: |
    Logo - waving alien: Kidovation-LOGO-GIF.gif (default) + Kidovation-LOGO-GIF_white.gif
    Sticker: Kidovation.gif + kidovation.mp4
    PSDs are source files. GIFs/MP4 are web-ready.
    ⭐ Logo GIF candidate for loading screen or intro animation.

### A-VID-001 — kidovation-logo-animation
- File: animations/kidovation.mp4
- Kind: animation
- Type: video
- Source: assets/raw/animations/
- Status: uploaded
- Assigned to: global
- Usage: Animated Kidovation logo — could inform loading screen or hero transition
- Added: 2026-03-26
- Notes: Pre-2019. Also available as GIFs (Kidovation-LOGO-GIF.gif, Kidovation-LOGO-GIF_white.gif, Kidovation.gif). White + default versions.

---

## Fonts `FONT`

### A-FONT-003 — block-letters-blue
- File: fonts/block-letters/blue/ (27 PNGs — A–Z + hash)
- Type: font
- Source: assets/raw/fonts/block-letters/blue/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation block letter font — blue colorway, individual character PNGs at 4x
- Added: 2026-03-26
- Notes: PNG only (no SVG). Letters named `white textAsset [34-60]@4x.png`. Compose words by combining individual character images.

### A-FONT-004 — block-letters-green
- File: fonts/block-letters/green/ (27 PNGs — A–Z + hash)
- Type: font
- Source: assets/raw/fonts/block-letters/green/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation block letter font — green colorway
- Added: 2026-03-26
- Notes: Named `[Letter]_Green.png`. Standard naming convention.

### A-FONT-005 — block-letters-navy
- File: fonts/block-letters/navy/ (27 PNGs — A–Z + hash)
- Type: font
- Source: assets/raw/fonts/block-letters/navy/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation block letter font — navy colorway
- Added: 2026-03-26
- Notes: Named `[Letter]_Navy.png`.

### A-FONT-006 — block-letters-pink
- File: fonts/block-letters/pink/ (27 PNGs — A–Z + hash)
- Type: font
- Source: assets/raw/fonts/block-letters/pink/
- Status: uploaded
- Assigned to: global
- Usage: Kidovation block letter font — pink colorway
- Added: 2026-03-26
- Notes: Named `[Letter]_Pink.png`. Available: blue, green, navy, pink colorways.

### A-FONT-007 — handwritten-alphabet
- File: fonts/handwritten/Handwritten Alphabet.ai
- Type: font
- Source: assets/raw/fonts/handwritten/
- Status: uploaded
- Assigned to: global
- Usage: Custom handwritten alphabet — .ai source, export needed before web use
- Added: 2026-03-26
- Notes: Export as SVG sprite or individual glyphs for web use.

### A-FONT-001 — permanent-marker
- File: fonts/PermanentMarker-Regular.ttf
- Kind: font
- Type: font
- Source: assets/raw/fonts/
- Status: uploaded
- Assigned to: global
- Usage: Handwritten marker-style display font — used in old Kidovation social content. Strong personality, very on-brand. Candidate for accent/headline use.
- Added: 2026-03-26
- Notes: Google Fonts license (OFL). From 2020 marketing materials.

### A-FONT-002 — zdyk-sagittarius
- File: fonts/Zdyk Sagittarius.otf
- Kind: font
- Type: font
- Source: assets/raw/fonts/
- Status: uploaded
- Assigned to: global
- Usage: Display/decorative font used in old Kidovation materials. Review for current use.
- Added: 2026-03-26
- Notes: From 2020 marketing materials. Verify license before use in production.

---

## Documents & PDFs `DOC`

### A-DOC-001 — brand-voice-and-vibes
- File: brand-voice-and-vibes.pdf
- Kind: brand-guideline
- Type: doc
- Source: assets/raw/
- Status: uploaded
- Assigned to: global
- Usage: Brand voice, tone, and visual identity reference — read before any copy or design work
- Added: 2026-03-25
- Notes: Original at OneDrive → Kidovation/Brand-Voice and Vibes.pdf — do not move original

---

## Icons & SVGs `ICON`

### A-ICON-004 — aliens-original
- File: illustrations/aliens/original/ (12 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/aliens/original/
- Status: uploaded
- Assigned to: global
- Usage: Core alien characters — Blue, Green, Pink. Standing, sitting, painting, coding poses.
- Added: 2026-03-26
- Notes: 3 characters × 2 poses each in SVG + PNG. Also includes .ai source files. Primary character reference set.

### A-ICON-005 — aliens-festive
- File: illustrations/aliens/festive/ (16 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/aliens/festive/
- Status: uploaded
- Assigned to: global
- Usage: Christmas/festive campaign alien variants — baubles, elf, santa, christmas tree, gingerbread, sock, fairy lights
- Added: 2026-03-26
- Notes: Blue, Green, Pink aliens in festive costumes. Seasonal use only.

### A-ICON-006 — aliens-sports
- File: illustrations/aliens/sports/ (10 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/aliens/sports/
- Status: uploaded
- Assigned to: global
- Usage: Sports/activity themed aliens — family scene, pool, rubber ring, cycling, ideation process
- Added: 2026-03-26
- Notes: Includes alien family group scene. Also has .ai source.

### A-ICON-007 — aliens-healthcare
- File: illustrations/aliens/healthcare/ (6 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/aliens/healthcare/
- Status: uploaded
- Assigned to: global
- Usage: Healthcare-costumed aliens — nurse, doctor variants for medical partnerships (e.g. AlderHey)
- Added: 2026-03-26
- Notes: Blue nurse, Green doctor, Pink doctor. Also has .ai source.

### A-ICON-008 — aliens-elderly
- File: illustrations/aliens/elderly/ (8 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/aliens/elderly/
- Status: uploaded
- Assigned to: global
- Usage: Elderly character variants — Blue, Green, Pink with elderly traits for intergenerational content
- Added: 2026-03-26
- Notes: For Nationwide/intergenerational campaign use.

### A-ICON-009 — aliens-at-home
- File: illustrations/aliens/at-home/ (3 files: PNG + AI)
- Type: icon
- Source: assets/raw/illustrations/aliens/at-home/
- Status: uploaded
- Assigned to: global
- Usage: Lockdown-era at-home alien scenes — 3 characters at home
- Added: 2026-03-26
- Notes: Lockdown campaign 2020. .ai source + PNGs.

### A-ICON-010 — hashtag-svgs
- File: illustrations/hashtags/ (10 SVGs)
- Type: icon
- Source: assets/raw/illustrations/hashtags/
- Status: uploaded
- Assigned to: global
- Usage: Brand hashtag icons — Bulb, Cloud, Designer, Doer, Dreamers, Future Leader, Innovator, Painting, Superhero, Torch
- Added: 2026-03-26
- Notes: Clean SVG icons. Useful as UI accent elements or badge graphics.

### A-ICON-011 — space-illustrations
- File: illustrations/space/ (12 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/space/
- Status: uploaded
- Assigned to: global
- Usage: Space-themed illustration set — UFO1, UFO2, radar, rocket, star, telescope
- Added: 2026-03-26
- Notes: 6 subjects × SVG + @4x PNG each. Space/science brand expression.

### A-ICON-012 — seaworld-2021
- File: illustrations/seaworld/2021/ (14 files: SVG + PNG)
- Type: icon
- Source: assets/raw/illustrations/seaworld/2021/
- Status: uploaded
- Assigned to: global
- Usage: Sea-themed illustrations — Octopus, Seahorse x2, Shark, Starfish x2, Yellow submarine
- Added: 2026-03-26
- Notes: 7 subjects × SVG + @4x PNG. Built for SeaWorld partnership. Also has .ai source.

### A-ICON-013 — social-icons-handdrawn
- File: icons/social/ (3 files: .ai, PNG, PSD)
- Type: icon
- Source: assets/raw/icons/social/
- Status: uploaded
- Assigned to: global
- Usage: Handdrawn social media icons — brand-consistent illustration style
- Added: 2026-03-26
- Notes: .ai source + PNG export. No SVG export yet — export from .ai before use.

### A-ICON-001 — alien-character-set
- File: characters/ (54 files — PNGs + SVGs) + characters/objects/ (7 SVGs)
- Kind: character-design
- Type: icon
- Source: assets/raw/characters/
- Status: uploaded
- Assigned to: global
- Usage: Full alien character library. Primary reference for 3D model (D-DS-002) and web illustrations.
- Added: 2026-03-26
- Notes: |
    CHARACTERS (5 colors):
    - Green alien: main mascot — standing, magnifying glass, icecream, swim poses (SVG)
    - Blue alien: round/fuzzy — standing, nurse, elderly, thinking poses
    - Pink alien: tall eye stalk — standing, stethoscope, ride poses
    - Purple/navy alien: dark body, two eyes, headphones, gold glasses (SVG) — ⭐ Future Labs candidate
    - Baby blue alien: small round variant
    GROUP SCENES: alien family 2.svg (all together), Alien friends.png, alien-family-scene.png
    ACTION POSES (SVG): magnifying glass, icecream, swim, ride, inventor
    COSTUME VARIANTS: nurse, elderly, syringe, stethoscope, designer, dreamer, doer, innovator, superhero, future leader, cycling, paddling
    TRANSPORT: Kidovation - UFO.png
    OBJECTS (characters/objects/): rocket.svg, bike.svg, prototype ship 1/2/3.svg, Burt the Octopus.svg, Alien amazon.svg

### A-ICON-002 — partner-logos
- File: partner-logos/ (7 files)
- Kind: logo
- Type: icon
- Source: assets/raw/partner-logos/
- Status: uploaded
- Assigned to: about, kidovation
- Usage: Partner logos for credibility/proof-of-partnership section
- Added: 2026-03-26
- Notes: AlderHey NHS (black/blue/white variants), Sky (logo/black/white), British Triathlon. Pre-2019 but logos likely still current. Verify before using.

### A-ICON-003 — logos-original
- File: logos-original/ (7 files)
- Kind: logo
- Type: icon
- Source: assets/raw/logos-original/
- Status: uploaded
- Assigned to: global
- Usage: Historical Kidovation logo versions — reference only, do NOT use directly in new design
- Added: 2026-03-26
- Notes: |
    Pre-2019 versions of the Kidovation logo. Superseded visually by A-LOGO-001 and A-LOGO-002.
    ⭐ KEY FILES: kidovation-logo-lockup-light.png + kidovation-logo-lockup-dark.png
    These are the ORIGINAL logo lockups — "Accenture Interactive / KIDOVATION / Inspiring the next generation"
    with the green alien body whose eye-on-stalk sits INSIDE the O of KIDOVATION.
    This is the definitive alien character reference — shows exact body proportions, eye stalk geometry,
    mouth, arms, and color (chartreuse green body, pink/black eye, red mouth, white tooth).
    Essential reference for 3D model build (D-DS-002).

---

## By Page

Quick lookup: which approved/in-use assets belong to each page.

| Page | Asset IDs |
|------|-----------|
| — | No pages registered yet |

---

## Counts

| Type | Total | Approved | In Use |
|------|-------|----------|--------|
| LOGO | 6     | 0        | 0      |
| IMG  | 8     | 0        | 0      |
| MOCK | 4     | 0        | 0      |
| VID  | 2     | 0        | 0      |
| FONT | 7     | 0        | 0      |
| DOC  | 1     | 0        | 0      |
| ICON | 13    | 0        | 0      |
| All  | 41    | 0        | 0      |
