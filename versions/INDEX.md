# Site Versions

Version snapshots of the built site. Each folder is a full copy of `site/` at that point in time (node_modules excluded — run `npm install` to restore).

**Current version:** v1
**Active site:** `../site/`

---

## Log

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| v1 | 2026-03-26 | archived | First iteration. Home page built (Vite + React + TS). 7 sections: nav, hero, what-is-ix, ecosystem, mission, events-glimpse, footer. GSAP scroll animations, R3F procedural alien. Design system generated. 4 remaining pages briefed but not built. |
| v2 | — | in progress | Re-run from `/plan`. Fresh planning pass, then full redesign + build. |

---

## How to restore a version

```bash
# To preview v1:
cd versions/v1
npm install
npm run dev
```

## How to snapshot the current site

When wrapping up a version, run:
```bash
rsync -a --exclude='node_modules' --exclude='.git' site/ versions/vN/
```
Then update this INDEX.md.
