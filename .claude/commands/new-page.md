Scaffold a new page folder and register it in the project. Arguments: page slug (e.g. `faq`, `events`).

Page slug: $ARGUMENTS

## Steps

### Step 1 — Validate
- Check that `pages/$ARGUMENTS/` does NOT already exist. If it does, tell the user and stop.
- Check that the slug is URL-safe (lowercase, hyphens only). If not, suggest a corrected version.

### Step 2 — Create folder from template
Copy all files from `pages/_template/` into `pages/$ARGUMENTS/`:
- `brief.md`
- `design.md`
- `build.md`
- `assets.md`
- `state.md`
- `screenshots.md`

Also create the subfolder `pages/$ARGUMENTS/screenshots/` (empty — populated when `/screenshot` runs).

### Step 3 — Read sitemap context
Read `memory/sitemap.md` before asking questions. Extract anything already known about this page (purpose, audience, content priority). Only ask what's not already there.

### Step 4 — Ask for brief
Ask the user only what's missing after reading the sitemap:
1. "What is this page's purpose in one sentence?" (skip if clear from sitemap)
2. "Who is the primary audience for this page?" (skip if clear from sitemap)
3. "What is the ONE action you want a visitor to take on this page?" (skip if clear from sitemap)
4. "What are the main sections or content blocks on this page?"
5. "Where does this page sit in the navigation? (primary nav / secondary / footer / not linked)"
6. "What page typically leads a visitor here? What should they do after?"
7. "Any hard constraints? (legal, brand, technical)"

### Step 5 — Populate brief.md
Write the answers into `pages/$ARGUMENTS/brief.md`. Replace all template placeholders with real content.

### Step 6 — Update sitemap
Read `memory/sitemap.md`. Add the new page to:
- The page inventory table (slug, title, nav position, buyer stage, primary CTA, priority, status: `brief done`)
- The navigation section (wherever it fits)
- The user journey section (how does it connect to existing pages?)

If the new page changes any existing page's journey (e.g. it now sits between two existing pages), note that and flag those pages for review in `memory/next.md`.

### Step 7 — Register in MEMORY.md
Add a row to the pages table: slug, status `brief done`, priority (ask user: high/medium/low).

### Step 8 — Confirm
Tell the user:
- Page created at `pages/$ARGUMENTS/`
- Brief written
- Sitemap updated
- Next step: run `/design $ARGUMENTS`
