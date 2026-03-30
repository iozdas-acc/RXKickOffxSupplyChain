# /screenshot [page-slug] [url]

Capture the current state of a page, run a spatial audit with before/after visual context, manage all fixes through the state system, and loop until the geometry is clean.

---

## Step 1 — Get inputs

- `page-slug`: the page folder name (e.g. `home`, `about`). Required.
- `url`: the local dev server URL. Defaults to `http://localhost:3000`. Append path if needed (e.g. `http://localhost:3000/about`).

If the user hasn't run the screenshot script yet, tell them:

```
node scripts/screenshot.js <url> <page-slug>
```

The script auto-detects the round number and saves to `pages/<slug>/screenshots/`.
When it finishes it will print: "In Claude Code, run: /screenshot <slug>"

---

## Step 2 — Load full context before looking at anything

Read all of these before analysing a single pixel:

| File | Why |
|------|-----|
| `pages/<slug>/brief.md` | Intent — what this page is supposed to do and feel like |
| `pages/<slug>/design.md` | Spec — what each section should look like |
| `pages/<slug>/screenshots.md` | Visual history — what the page looked like in previous rounds |
| `pages/<slug>/state.md` | Current issues, blockers, audit history |
| `memory/preferences.md` | Global rules that always apply |
| `memory/issues.md` | Existing issue IDs so new ones don't collide |

Then load the images:

**Previous round** (if any): read `pages/<slug>/screenshots/r<N-1>-desktop.png`, `r<N-1>-tablet.png`, `r<N-1>-mobile.png`
**Current round**: read `pages/<slug>/screenshots/r<N>-desktop.png`, `r<N>-tablet.png`, `r<N>-mobile.png`

Where N = the highest round number in `pages/<slug>/screenshots/`.

Having both lets you see what changed, not just what exists now.

---

## Step 3 — Spatial analysis

For each breakpoint (desktop → tablet → mobile), analyse:

**Layout geometry**
- Column structure and how it collapses across breakpoints
- Section heights and proportions — match the design spec?
- Whitespace — generous, tight, or inconsistent between sections?
- Alignment — edges, baselines, grid lines lining up?
- Any overflow, clipping, or elements breaking bounds

**Typography**
- Heading scale — feels right at this viewport?
- Line lengths — too wide (>75ch) or too narrow (<45ch)?
- Visual priority — can you read the hierarchy at a glance?
- Mobile text size — anything under 16px effective?

**Spacing**
- Padding/margin consistency between sections
- Mobile tap targets — minimum 44×44px
- Content width on desktop — not too narrow or too wide?

**Visual weight and emotional arc**
- Where does the eye land first?
- Does the page feel like what `brief.md` and `design.md` intended?
- Anything fighting for attention that shouldn't be?

**Before/after delta** (if previous round exists)
- What visibly changed from the last round?
- Did the last round's fixes actually land correctly?
- Did anything that was fine before break?

**Against design.md**
- Read every section in `design.md`. For each: does the render match the spec?
- Divergences are the highest priority issues — flag them first

---

## Step 4 — Classify every issue

For each problem, classify before logging:

| Class | Definition | What updates |
|-------|-----------|-------------|
| `code-bug` | Code doesn't implement the spec correctly | Code only — spec was right |
| `spec-drift` | Rendered output diverges from design intent and intent has evolved | Code + update `design.md` |
| `spec-gap` | Something real discovered that the spec never addressed | Code + add rule to `design.md` + new D-NNN decision if meaningful |
| `preference-violation` | Breaks a rule in `memory/preferences.md` | Code only |
| `regression` | Was fine in a previous round, now broken | Code — flag as high priority |

---

## Step 5 — Output the audit report

```
## Spatial Audit — [page-slug] — round [N] — [date]

### Context loaded
- Previous round: r[N-1] (or "none — first audit")
- Design spec: design.md [populated / template]
- Open issues coming in: [count]

### What changed since round [N-1]
[delta observations — or "first round, no prior" if round 1]

### Desktop (1440px)
[observations — specific, spatial, measurable]

### Tablet (768px)
[observations]

### Mobile (390px)
[observations]

### Issues
| ID     | Class     | Breakpoint | Description                        | Severity | Fix needed |
|--------|-----------|------------|------------------------------------|----------|------------|
| I-NNN  | code-bug  | mobile     | Hero text overflows at 390px       | blocking | fix CSS    |
| I-NNN  | spec-gap  | all        | No section spacing — spec silent   | medium   | fix + update design.md |

### Regressions
[anything that was fine in a previous round but is now broken — or "none"]

### What looks right
- [list]
```

---

## Step 6 — Save everything before touching code

**1. Update `pages/<slug>/screenshots.md`**

First, rewrite the Current State block at the very top of the file (lines 3–5) to reflect this round:

```markdown
**Latest round:** [N]
**Status:** [issues-found: X blocking, Y medium, Z low / clean]
**Load:** r[N]-desktop.png · r[N]-tablet.png · r[N]-mobile.png
```

This is the pointer Claude reads at session start — it must always reflect the latest round.

Then prepend a new round entry below the `---` divider (newest first):

```markdown
## Round [N] — [date] — [status: issues-found / clean]

| Breakpoint | File |
|-----------|------|
| Desktop   | [r[N]-desktop.png](screenshots/r[N]-desktop.png) |
| Tablet    | [r[N]-tablet.png](screenshots/r[N]-tablet.png) |
| Mobile    | [r[N]-mobile.png](screenshots/r[N]-mobile.png) |

**Issues found:** [count] ([X] blocking, [Y] medium, [Z] low)
**What this round revealed:** [one-sentence summary]
**What changed from round [N-1]:** [delta summary — or "first round"]
```

**2. Append audit report** to `pages/<slug>/state.md` under `## Screenshot Audits`.

**3. Log new issues** to `memory/issues.md`:
```
| I-NNN | [date] | [page]/[section] | [description] | [severity] | open |
```

**4. Add blocking issues** to `pages/<slug>/state.md` blockers table.

**5. Update `memory/next.md`** with blocking and medium issues needing fixes.

---

## Step 7 — Fix loop

Present the issue list and ask:

> "Found [N] issues ([X] blocking, [Y] medium, [Z] low). Fix all, just blocking, or pick specific ones?"

When the user confirms, for **each issue**:

### 7a — Fix the code
Minimal, targeted fix. Don't refactor the section.

### 7b — Update specs based on class

| Class | Action |
|-------|--------|
| `code-bug` | No spec update — spec was correct |
| `spec-drift` | Update `pages/<slug>/design.md` to reflect evolved intent |
| `spec-gap` | Add the missing rule to the relevant section in `design.md`. If it's a meaningful layout choice, assign D-NNN and log in `decisions/log.md` + `TAXONOMY.md` |
| `preference-violation` | No spec update |
| `regression` | No spec update — find what broke it |

### 7c — Update issue status
- In `memory/issues.md`: mark resolved issues `resolved` with date
- In `pages/<slug>/state.md`: remove resolved blockers

### 7d — Log new decisions
If a fix introduced a layout choice that wasn't in the spec:
- Assign next D-NNN ID
- Log in `memory/decisions/log.md` and `memory/decisions/TAXONOMY.md`
- Add to `pages/<slug>/design.md` under the relevant section

---

## Step 8 — Prompt for next round

After all fixes:

```
---
Fixes applied. Let's verify.

Run: node scripts/screenshot.js <url> <page-slug>
(it will auto-detect round [N+1])

Then type: /screenshot <page-slug>
---
```

Loop continues until:
- No blocking issues
- All medium issues resolved or explicitly accepted with a logged reason
- User says they're done

---

## Step 9 — Mark clean

When the page passes:

**`pages/<slug>/screenshots.md`** — add final round entry with status `clean`:
```markdown
## Round [N] — [date] — CLEAN ✓
All issues resolved. Page marked complete.
```

**`pages/<slug>/state.md`**:
- Build status → `complete`
- Screenshot audit quality gate → ticked
- Log: `Spatial audit passed — round [N] — [date]`

**`memory/MEMORY.md`** — set page status to `complete`

**`memory/next.md`** — clear resolved items
