---
description: Audit live websites across 230+ rules — SEO, performance, security, accessibility, content
argument-hint: <url>
source: squirrelscan/skills — audit-website
requires: squirrel CLI (squirrelscan.com/download)
---

# Website Audit Skill

Audit websites using the `squirrel` CLI (squirrelscan). 230+ rules across 21 categories.
Always audit the **live** site — only then do you get a true representation of performance and rendering.

---

## Prerequisites

```bash
squirrel --version   # must be in PATH
squirrel init -n my-project   # creates squirrel.toml in current dir
```

Install: https://squirrelscan.com/download

---

## Coverage Modes

| Mode | Pages | Behavior | Use Case |
|------|-------|----------|----------|
| `quick` | 25 | Seed + sitemaps only | CI checks, fast health check |
| `surface` | 100 | One sample per URL pattern | Default — general audits |
| `full` | 500 | Crawl everything | Deep analysis, pre-launch |

**Surface is smart** — detects patterns like `/blog/{slug}` and samples one per pattern.

---

## Workflow

### Step 1 — First scan (surface)
```bash
squirrel audit https://example.com --format llm
```

### Step 2 — Deep scan (full)
```bash
squirrel audit https://example.com -C full --format llm
```

### Re-export a cached audit
```bash
squirrel report <audit-id> --format llm
```

### Regression diff
```bash
squirrel report --regression-since example.com --format llm
```

**Always use `--format llm`** — compact XML/text hybrid, 40% smaller than verbose XML, optimized for AI consumption.

---

## Iteration Loop

1. Run audit → present score + issues to user
2. Propose fixes → confirm before changing anything
3. Parallelize approved fixes via subagents (group 3–5 files per agent, independent files only)
4. Re-audit → compare before/after score
5. Repeat until score target met or only human-judgment issues remain

**Parallelizable fixes:** alt text, headings, meta descriptions, HTTP→HTTPS links
**Flag for human review:** broken links, structural changes, ambiguous content decisions

---

## Score Targets

| Starting Score | Target | Work Level |
|---------------|--------|------------|
| < 50 (F) | 75+ (C) | Major fixes |
| 50–70 (D) | 85+ (B) | Moderate fixes |
| 70–85 (C) | 90+ (A) | Polish |
| > 85 (B+) | 95+ | Fine-tuning |

**Complete = 95+ with `--coverage full`**

---

## Issue Categories

| Category | Fix Approach | Parallelizable |
|----------|-------------|----------------|
| Meta tags/titles | Edit page components or metadata | No |
| Structured data | Add JSON-LD to page templates | No |
| Missing H1/headings | Edit page components + content files | Yes |
| Image alt text | Edit content files | Yes |
| Heading hierarchy | Edit content files | Yes |
| Short descriptions | Edit content frontmatter | Yes |
| HTTP→HTTPS links | Find and replace in content | Yes |
| Broken links | Manual review — flag for user | No |

---

## Rule Docs

Look up any rule:
```
https://docs.squirrelscan.com/rules/{rule_category}/{rule_id}
# e.g. https://docs.squirrelscan.com/rules/links/external-links
```

---

## Common Options

```bash
# Ignore cache, force fresh crawl
squirrel audit https://example.com --refresh --format llm

# Audit more pages
squirrel audit https://example.com --max-pages 200 --format llm

# Resume interrupted crawl
squirrel audit https://example.com --resume

# Filter report by severity
squirrel report <audit-id> --severity error --format llm

# Filter by category
squirrel report <audit-id> --category seo,security --format llm
```

---

## Rules Covered (21 Categories)

SEO · Technical · Performance · Content Quality · Security · Accessibility · Usability · Links · E-E-A-T · User Experience · Mobile · Crawlability · Schema / Structured Data · Legal · Social · URL Structure · Keywords · Content · Images · Local SEO · Video

---

## Troubleshooting

- `squirrel not found` — install from squirrelscan.com/download, ensure `~/.local/bin` is in PATH
- `Permission denied` — reinstall binary to fix execute permissions
- Slow on large sites — use `--verbose` to monitor progress
- Always include protocol: `https://example.com` not `example.com`
