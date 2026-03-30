Run site architecture and content strategy planning. Re-runnable at any time — use it to plan the initial site or update it as things change.

Arguments (optional): a short description of what's changing, e.g. "add a contact page" or "restructure nav"

---

## Detect: first run or update?

Check if `memory/sitemap.md` exists and has real content (not just template placeholders).

- If NOT → **First run** workflow below
- If YES → **Update** workflow below

---

## First run workflow

### Step 1 — Read all context
Read:
- `.impeccable.md`
- `.agents/product-marketing-context.md`
- `memory/MEMORY.md`
- `assets/manifest.md`

### Step 2 — Check for existing structure assets
Scan `assets/manifest.md` for any asset described as: sitemap, wireframe, structure, navigation, site map, or page hierarchy.

If found: read those assets first. Use them as the primary input for the page list and hierarchy — don't ask the user to re-describe what's already in the assets.

### Step 3 — Define site structure
If the page list and hierarchy aren't fully clear from existing assets, ask:
1. "What pages does this site need?"
2. "What's in the main navigation — and is there anything secondary (footer links, sub-pages)?"
3. "What's the primary action the site needs to drive visitors toward?"
4. "What's the user journey — where do most visitors land, and where should they go from there?"

Keep questions minimal — only ask what assets haven't already answered.

### Step 4 — Run content-strategy/ skill
Brief it on:
- The full page list and hierarchy
- Business context from `.agents/product-marketing-context.md`
- Brand from `.impeccable.md`

Extract for each page:
- Which content pillar does this page serve?
- What buyer stage is this page targeting?
- What must this page say, in the context of the whole site?
- What's the primary CTA?

### Step 5 — Write memory/sitemap.md

Write the complete site plan:

```
# Site Map

> Last updated: [date]
> Update by running `/plan`.

---

## Navigation

Primary nav: [list]
Secondary / footer: [list]

---

## Page inventory

| Slug | Title | Nav position | Buyer stage | Primary CTA | Priority | Status |
|------|-------|-------------|-------------|-------------|----------|--------|

---

## User journey

[Describe the intended path: landing page → key decision pages → conversion]

---

## Content strategy

**Pillars:** [3–5 pillars from content-strategy/ output]

**Per-page content priority:**
[For each page: what must it say? How does it connect to the pages before and after it in the journey?]

---

## Revision history

| Date | What changed | Pages affected |
|------|-------------|---------------|
```

### Step 6 — Scaffold page folders
For each page in the sitemap that doesn't already have a folder in `pages/`: create it.
Copy template from `pages/_template/`. Write `brief.md` from sitemap context — purpose, audience, primary CTA, content priority.
Do NOT touch folders that already exist.

### Step 7 — Update memory/MEMORY.md
Sync the pages table: slug, status, priority. Match the sitemap.

---

## Update workflow (re-run)

### Step 1 — Read current state
Read:
- `memory/sitemap.md` — current structure
- `memory/MEMORY.md` — page statuses
- All `pages/*/state.md` — what's already designed or built

### Step 2 — Understand what's changing
If `$ARGUMENTS` was provided, use that as the change description.
If not, ask: "What's changing? (e.g. new page, restructure, content update, new direction)"

### Step 3 — Run content-strategy/ with updated context
Brief it on the current sitemap + what's changing. Focus on the delta — what shifts in priority, messaging, or structure?

### Step 4 — Propose a diff
Before changing anything, show the user what would change:

```
PROPOSED CHANGES

New pages:      [list]
Removed pages:  [list]
Hierarchy:      [any nav changes]
Content shifts: [pages whose priority or messaging changes]

Pages needing re-design:  [list with reason]
Pages needing re-build:   [list with reason]
```

Ask: "Apply these changes?" Do not proceed without confirmation.

### Step 5 — Apply on confirmation
- Update `memory/sitemap.md` — new structure, updated content strategy, log the change in revision history
- Create folders for new pages only (copy template, write brief)
- For removed pages: mark status `archived` in sitemap — do NOT delete folders or files
- For pages already designed or built that are affected by the change:
  - Log in `memory/issues.md`: `I-NNN | [date] | [slug] | Needs revision: [reason] | severity: normal | status: open`
  - Update `pages/[slug]/state.md` status to `needs-revision`
  - Add to `memory/next.md`

### Step 6 — Update memory/MEMORY.md
Sync pages table. Add revision note.
