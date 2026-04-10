# /run

Full pipeline orchestration with ralph loops per page. One command drives everything from context check through to every page marked complete.

**Human touchpoints: two only.**
1. Design gate — approve or revise `design.md` before build starts (per page)
2. Medium/low issue review — after blocking issues are auto-fixed and page is clean

Everything else runs autonomously.

---

## Phase 0 — State audit

Read all of these before doing anything:
- `memory/MEMORY.md` — current project state, page statuses
- `memory/sitemap.md` — page inventory, routes, priority order
- `memory/next.md` — queued actions
- `memory/issues.md` — any open blockers
- `pages/<slug>/state.md` for every page listed in MEMORY.md

From this, build a run plan — what will be skipped and why:

```
Run plan — [project name] — [date]

Phase 1 (Plan):    SKIP — sitemap.md is current  /  RUN — sitemap missing or stale
Phase 2 (Init):    always runs
Dev server:        will start at cd site && npm run dev

Pages (in priority order):
  [slug]  →  [action: design+build+loop / design-gate+loop / loop-only / SKIP-complete]
  [slug]  →  ...
```

Rules for determining page action:
- `complete` in state.md → **SKIP** (unless user passed a `--force` argument)
- `design.md` empty/template AND state is `not-started` or `in-progress` → **design + build + ralph loop**
- `design.md` populated AND page is built AND state is `review` → **design gate only, then ralph loop** (rebuild only if design revised)
- `design.md` populated AND not yet built → **build + ralph loop** (design already approved in a prior session)

Print the run plan and say: "Proceeding — ctrl+c to abort." Then continue without waiting.

---

## Phase 1 — Plan

**Skip if:** `memory/sitemap.md` exists and has real page content (not just template).

**Run if:** sitemap is missing, empty, or shows placeholder content.

If running: follow the full `/plan` command logic. Do not continue to Phase 2 until sitemap is written and page folders are scaffolded.

---

## Phase 2 — Init (always runs)

Check all gates in order. If any gate fails, stop and tell the user exactly what is missing and how to fix it. Do not proceed past a failed gate.

| Gate | Check |
|------|-------|
| G-1 | `.impeccable.md` exists and has real content |
| G-2 | `.agents/product-marketing-context.md` exists and has real content |
| G-3 | `memory/sitemap.md` exists and has real content |
| G-4 | `design-system/MASTER.md` exists |
| G-5 | All pages in sitemap have a `pages/<slug>/` folder |
| G-6 | No open `blocking` issues in `memory/issues.md` |

Print gate results. If all pass, continue.

---

## Phase 3 — Start dev server

Use the Bash tool to start the dev server in the background:

```bash
cd site && npm run dev > /tmp/webcontext-dev.log 2>&1 &
echo $! > /tmp/webcontext-dev.pid
```

Then poll until the server is ready. Use the Bash tool to check:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Retry every 2 seconds, up to 30 attempts. If it doesn't respond after 30 attempts, stop — print the last 20 lines of `/tmp/webcontext-dev.log` so the user can see what failed. Do not proceed.

When the server responds: print "Dev server ready." and continue.

---

## Phase 4 — Page pipeline

Work through pages in priority order from `memory/sitemap.md` (lowest number = first).

For each page, read the Route column from sitemap.md to get the URL path (e.g. `/kidovation`). The full screenshot URL is `http://localhost:3000[route]` (home is `http://localhost:3000` with no trailing path).

### 4a — Design gate (HUMAN TOUCHPOINT)

**Skip entirely if:** page state is `complete`.

**If design.md is empty or template:**
1. Print: "Design.md not written for [slug]. Running design workflow now."
2. Follow the full `/design [slug]` command logic.
3. When design.md is written, go to the human gate below.

**If design.md is already populated:**
1. Read `pages/<slug>/design.md`.
2. Print a brief summary (3–5 bullet points covering section count, key visual decisions, motion intent, any open questions).
3. **STOP and wait for human input:**

```
---
Design for [slug] — approve or revise?

Summary:
- [key decision 1]
- [key decision 2]
- [key decision 3]

Reply: "approved" to proceed  /  give feedback to revise
---
```

4. If "approved": mark design gate passed, continue to 4b.
5. If feedback given: apply revisions to `design.md`, show updated summary, ask again. Loop until approved.

Do not proceed to 4b until explicit approval.

---

### 4b — Ralph loop (autonomous)

This is the core iteration engine for the page. It runs until the page is clean.

#### Loop entry conditions
- If design was revised in 4a: run a full rebuild before taking screenshots.
- If design was approved unchanged AND page is already built (state = `review`): skip rebuild, go straight to screenshot.
- If page was never built: run full build first.

#### Build step (run if needed)
Follow the full `/build [slug]` command logic. When build is complete, continue to screenshot step.

#### Screenshot step
Use the Bash tool to run the screenshot script:

```bash
node scripts/screenshot.js http://localhost:3000[route] [slug]
```

Where `[route]` is the URL path from sitemap.md (empty string for home, `/kidovation` for kidovation, etc.).

Wait for the script to finish. It will print the files it saved. If it errors, print the error and stop the loop for this page — do not continue.

#### Evaluate step
After screenshots are taken, load ALL new PNG files using the Read tool. The script saves multiple viewport slices per breakpoint — load every file matching `pages/[slug]/screenshots/r<N>-*.png` where N is the latest round.

Then run the full spatial audit as defined in `/screenshot`:
- Read `pages/<slug>/brief.md`, `pages/<slug>/design.md`, `pages/<slug>/screenshots.md`, `memory/preferences.md`
- Load previous round PNGs too (if any) for before/after delta
- Evaluate layout geometry, typography, spacing, visual weight, before/after delta, match against design.md
- Classify every issue: `code-bug`, `spec-drift`, `spec-gap`, `preference-violation`, `regression`
- Assign severity: `blocking`, `medium`, `low`

Save findings:
- Update `pages/<slug>/screenshots.md` (current state block at top + new round entry)
- Append audit report to `pages/<slug>/state.md`
- Log new issues to `memory/issues.md`
- Add blocking issues to `pages/<slug>/state.md` blockers table

#### Fix step (autonomous for blocking issues)
**If blocking issues exist:**
1. Fix each blocking issue in code. Minimal, targeted fix — no surrounding refactors.
2. Update `memory/issues.md` status to `resolved` for each fixed issue.
3. Remove resolved blockers from `pages/<slug>/state.md`.
4. Log any new decisions introduced by fixes (D-NNN).
5. Loop back to **Screenshot step**. Do not ask the user. Keep going.

**Maximum loop depth: 5 iterations.** If blocking issues still exist after 5 rounds of screenshots, stop the loop for this page. Print: "Stuck after 5 rounds on [slug] — [list remaining blocking issues]. Manual review needed." Log issues, move to next page.

**If no blocking issues:**
Continue to clean-up step.

#### Clean-up step
Medium and low issues: collect them all into a single list. Do not fix them yet.

Mark the page:
- `pages/<slug>/state.md` → build status: `complete`
- `memory/MEMORY.md` → page status: `complete`
- `memory/next.md` → clear resolved items for this page

Print the medium/low issue list (if any) and say:
```
[slug] is clean. Medium/low issues found:
  [I-NNN] medium — [description]
  [I-NNN] low    — [description]

Fix now, or move to next page?
```

**STOP and wait for human input on medium/low issues.** (HUMAN TOUCHPOINT 2)

If "move on" or no medium/low issues: proceed to next page.
If fixes requested: apply them, take one more screenshot round, re-evaluate, then mark complete and move on.

---

## Phase 5 — Teardown and final status

After all pages have been processed (or skipped):

**Kill the dev server:**
```bash
kill $(cat /tmp/webcontext-dev.pid) 2>/dev/null
rm /tmp/webcontext-dev.pid /tmp/webcontext-dev.log
```

**Compact memory:**
- Update `memory/MEMORY.md` — update page statuses to reflect what /run did
- Update `memory/next.md` — clear completed items, add any remaining open items

**Print final run report:**
```
/run complete — [date]

Pages:
  [slug]  complete  (clean at round N)
  [slug]  complete  (clean at round N)
  [slug]  stuck     (N blocking issues remain — see memory/issues.md)
  [slug]  skipped   (already complete)

Open issues: [count medium] medium, [count low] low (see memory/issues.md)
Next: [whatever is queued in memory/next.md]
```

Then print the full output of `/status`.

---

## Reusability notes

This command derives everything from project state files — it does not hardcode page slugs, routes, or counts. On a new project it runs the full pipeline from Phase 1. On a project mid-way through, it picks up exactly where things left off. The only project-specific assumption is:

- Dev server lives at `site/` and runs on port 3000
- Screenshots script is at `scripts/screenshot.js`
- Both are true for any project scaffolded by this framework

To use on a new project: run `/run` from a fresh state. It will guide through plan → init → design (with human gates) → build → screenshot loops for every page in sequence.
