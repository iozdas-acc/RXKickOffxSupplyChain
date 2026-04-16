# /swarm

Parallel design-variant exploration. Run N isolated `/run` pipelines on the same page, each variant pulling in a different direction, all scored against the same `memory/quality-benchmark.md`. Pick the winner at the end.

**Status: step 1 (dry-run, N=1) — plumbing verification only. N>1 and full variant spawn ship in steps 2–3.**

Arguments: `$ARGUMENTS` = page slug (e.g. `intro`, `the-project`).

---

## Full intended flow (shipped incrementally)

```
1. Gate check     → benchmark must be locked (authoring-quality-benchmark skill)
2. Brainstorm     → define N variant axes (brainstorming skill) — N defaults to 3
3. Worktrees      → using-git-worktrees skill creates N isolated copies
4. Parallel spawn → N Agents with run_in_background=true, each running /run on a worktree
5. Collect        → swarm/<timestamp>/variant-<A..N>/ with screenshots + scores
6. Compare        → brainstorming skill on results, user picks winner
7. Promote        → chosen variant's branch merged back; others archived under swarm/<ts>/rejected/
```

---

## Step 1 — dry-run (current scope)

Goal: prove the plumbing works end-to-end with a **trivial probe**, not a real build.

### Preconditions
- `$ARGUMENTS` is a valid page slug → `pages/$ARGUMENTS/` exists
- Current git working tree is clean (no uncommitted changes) — abort otherwise
- `git worktree` subcommand works

### What step 1 does

1. Print: `Swarm step 1 — dry-run probe for page: $ARGUMENTS`
2. Compute timestamp: `TS=$(date +%Y%m%d-%H%M%S)`
3. Create `swarm/$TS/` in the project root
4. Create ONE worktree:
   ```bash
   git worktree add -b swarm/$TS-variant-A ../$TS-variant-A HEAD
   ```
   (Uses `using-git-worktrees` skill's pattern — isolated copy in a sibling directory.)
5. Spawn ONE background Agent via the Agent tool with `run_in_background: true`:
   - `subagent_type`: `general-purpose`
   - `description`: `Swarm probe variant A`
   - `prompt`: self-contained probe — "In the worktree at `../$TS-variant-A`, run `node -v && ls site && echo SWARM_PROBE_OK`. Report exit status. Do not modify any files."
6. Wait for Agent completion (runtime auto-notifies)
7. Verify output contains `SWARM_PROBE_OK`
8. Write `swarm/$TS/probe-log.md` with: timestamp, agent output, pass/fail
9. Cleanup:
   ```bash
   git worktree remove ../$TS-variant-A
   git branch -D swarm/$TS-variant-A
   ```
10. Print summary:
    ```
    Swarm step 1 result: [PASS|FAIL]
      Worktree created + removed:  [yes|no]
      Background Agent completed:  [yes|no]
      Probe output verified:       [yes|no]
    Next: step 2 adds N=2 real /run pipelines with port isolation.
    ```

### What step 1 does NOT do
- Does NOT run `/run` (too expensive for plumbing verification)
- Does NOT lock the benchmark (that's `authoring-quality-benchmark` REFACTOR task)
- Does NOT brainstorm variant axes (that's step 3)
- Does NOT start a dev server (port conflict risk — solved in step 2)

---

## Known gotchas to solve before step 2

| Gotcha | Impact | Step to solve |
|--------|--------|---------------|
| Dev server port collision | All variants default to `localhost:3000`. 2nd Agent's `npm run dev` will fail. | Step 2 — pass `PORT=3001/3002/...` per worktree |
| Shared markdown state | `memory/MEMORY.md`, `memory/decisions/log.md`, `memory/issues.md`, `pages/<slug>/state.md` are project-files. Worktrees isolate git files but every Agent writes to the SAME underlying paths inside its own worktree — so no cross-contamination when each Agent stays inside its worktree root. BUT: logs/results need a shared root to compare. | Step 2 — each Agent writes final artifacts to `../swarm/<ts>/variant-<X>/` (relative path escapes the worktree deliberately) |
| Convergent variants | All variants score ~90 against the same rubric → no differentiation. | Step 3 — brainstorming skill enforces genuinely different axes; blend check in benchmark caps imitation |
| Long runtime | 3 parallel /run pipelines ≈ 3× API cost, 1× wall-clock if parallelism works. | Surface cost estimate before spawn in step 3 |

---

## When to use this command

- Multiple strong reference directions disagree — build all, compare
- User explicitly wants design alternatives before committing
- After a `/run` that feels locked-in or generic

## When NOT to use

- Single-reference project with clear direction (use `/run` directly)
- Page is nearly complete (use `/design-review` instead)
- Benchmark hasn't been locked yet — swarms without a shared rubric are noise, not signal
