Print a full project dashboard. Read the files, then format the output clearly. Do not skip any section.

## Read these files first
- `memory/MEMORY.md`
- `memory/next.md`
- `memory/issues.md`
- `memory/decisions/TAXONOMY.md`
- `assets/manifest.md` (counts section)
- All `pages/*/state.md` files

## Output format

### 1. Pages

For each page in `pages/` (skip `_template`), check its `state.md` and `brief.md`:

| Page | Brief | Design | Build | State | Blockers |
|------|-------|--------|-------|-------|----------|

- Brief: ✅ written / ❌ empty
- Design: ✅ populated / ⬜ template / ❌ missing
- Build: ✅ populated / ⬜ template / ❌ missing
- State: show current value from state.md (`not started` / `in progress` / `review` / `complete`)
- Blockers: count of open blocking issues for this page, or — if none

### 2. Context gates

| Gate | File | Status |
|------|------|--------|
| Brand design context | `.impeccable.md` | ✅ populated / ❌ missing |
| Marketing copy context | `.agents/product-marketing-context.md` | ✅ populated / ❌ missing |
| Design token system | `design-system/MASTER.md` | ✅ exists / ❌ not generated |

### 3. Assets

| Type | Total | Approved | In Use | Unread |
|------|-------|----------|--------|--------|

List any assets with status `uploaded` and no "read ✓" note — these have not been processed yet.

### 4. Open decisions

List all entries from `memory/decisions/TAXONOMY.md` with status `pending`.

### 5. Open issues

List all entries from `memory/issues.md` with `Status: open`. Show severity.

### 6. Next actions

Print the full contents of `memory/next.md` (Now + Soon + Blocked sections).

### 7. Recommended next step

Based on the above, state the single most important thing to do next and why.
