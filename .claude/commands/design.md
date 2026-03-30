Run the full design workflow for a page. Arguments: page slug (e.g. `home`, `kidovation`).

Page to design: $ARGUMENTS

## Pre-flight gates — check all before doing any design work

### Gate 1: Page slug valid
- Check that `pages/$ARGUMENTS/` exists.
- If not: tell the user. List available pages. Stop.

### Gate 2: Brief exists
- Read `pages/$ARGUMENTS/brief.md`.
- If it contains only template content (no real purpose/sections written): tell the user the brief must be filled before design can start. Stop.

### Gate 3: design-system/MASTER.md exists
- Check if `design-system/MASTER.md` exists.
- If not: STOP. Tell the user: "The design token system hasn't been generated yet. Run `/init` first — it will generate `design-system/MASTER.md` via `ui-ux-pro-max`."

### Gate 4: .impeccable.md populated
- Read `.impeccable.md`.
- If missing or empty: STOP. Tell the user to fill it or run `node onboard.js`.

### Gate 5: .agents/product-marketing-context.md populated
- Read `.agents/product-marketing-context.md`.
- If missing or empty: STOP. Tell the user it must be filled before copy can be written.

### Gate 6: No blocking issues for this page
- Check `memory/issues.md` for any open blocking issues assigned to this page.
- If any exist: list them. Tell the user they must be resolved first. Stop.

---

## ⚠️ MANDATORY — Read orchestrator before anything else

**Before any design work, Read file: `skills/orchestrate-design.md`**

This file contains:
- The complete skill registry (every skill available for design)
- The mandatory invocation sequence with exact mechanisms (Read vs Invoke Skill)
- The law: no design output may come from general knowledge when a skill exists for it

Follow the orchestrator's steps exactly. Do not proceed past this point until the orchestrator file has been read.

---

## Design workflow (only runs if all gates pass)

Read these before doing anything else:
- `pages/$ARGUMENTS/brief.md` — what this page needs to do
- `design-system/MASTER.md` — token system (colors, type, spacing)
- `memory/preferences.md` — global taste rules (apply silently)
- `.impeccable.md` — brand personality and visual direction
- `.agents/product-marketing-context.md` — product, audience, objections, CTA, voice
- `assets/manifest.md` — what assets are available for this page
- `assets/raw/structure-of-website.pdf` (A-MOCK-002) — full site structure and content outline. Primary source for content strategy: what each page must cover, how pages relate, what the nav structure implies about priority. Read this before running the content pipeline.

Then run in order:

### Step 1 — Content strategy
Determine whether copy is client-provided or must be generated.

**Check:** Does `pages/$ARGUMENTS/brief.md` include a "copy provided" note, or does `pages/$ARGUMENTS/assets.md` reference a copy asset (e.g. A-DOC-NNN)?

**If copy is NOT provided — run the full content pipeline:**

1a. **`content-strategy/` skill** — determine:
   - What this page needs to say (content pillars, primary message)
   - Buyer stage this page targets (awareness / consideration / decision)
   - Content priority order: what must land above the fold, what can be secondary
   - What the reader should believe after reading this page

1b. **`content/` skill** — define structure:
   - Heading hierarchy (H1 → H2 → H3) with intent for each
   - SEO: title tag, meta description, OG tags, JSON-LD type
   - Accessibility requirements: landmark roles, heading semantics, image alt strategy
   - HTML element choices per section

1c. **`copywriting/` skill** — write the actual copy:
   - H1 and hero subhead
   - Section headlines and supporting body
   - CTAs (primary and secondary)
   - Any microcopy (labels, captions, tooltips)
   - Read `.agents/product-marketing-context.md` — every word must reflect the real product

Write all copy output into a `## Copy` section at the bottom of `pages/$ARGUMENTS/brief.md`. This is the canonical copy source for this page.

**If copy IS provided (client-supplied):** Skip 1a–1c. Note in `pages/$ARGUMENTS/design.md`: "Copy: client-provided — see [asset ID]". Proceed to Step 2.

---

### Step 2 — Aesthetic direction
Use the `frontend-design/` skill. Brief it on:
- The page purpose (from brief.md)
- The brand personality (from .impeccable.md)
- The copy shape: how much text, what kind of hierarchy, what emotional register (from Step 1 output or client copy)
- Any page-specific tone notes (from brief.md copy tone section)

---

### Step 3 — Layout decisions
Use `ui-ux-pro-max --domain layout` for this page's specific layout challenges.
Document any decisions made as D-LAY-NNN entries.

---

### Step 4 — Write design.md
Populate `pages/$ARGUMENTS/design.md` with:
- Layout approach per section (grid, full-bleed, split, etc.)
- Typography choices (typeface, scale) — must reference design-system/MASTER.md tokens
- Color usage per section — reference token names, not hex values
- Spacing rules
- Responsive behaviour (mobile → tablet → desktop)
- Motion intent (what moves, when, why — link to D-MOT-NNN if a motion decision is made)
- Preference overrides table (any global preference this page overrides, and why)

Do NOT rewrite copy here — reference `brief.md ## Copy` section by section name.

---

### Step 5 — Update state
- Update `pages/$ARGUMENTS/state.md`: set design as in progress or complete as appropriate.
- Log the session in the session log section of state.md.

### Step 6 — Update memory
- If any new decisions were made, log them in `memory/decisions/log.md` and `memory/decisions/TAXONOMY.md`.
- If any new preferences emerged, log them in `memory/preferences.md`.
- Update `memory/next.md`: mark design step as done, add build step to Now queue.
