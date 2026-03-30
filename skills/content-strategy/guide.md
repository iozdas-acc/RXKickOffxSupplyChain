# Skill: Content Strategy

Plan searchable and shareable content that drives traffic, builds authority, and generates leads.
Runs BEFORE writing — identifies pillars, clusters, buyer stages, and priorities.

> **Security note:** Snyk WARN. Gen Agent Trust Hub + Socket pass.

---

## Relationship to other skills

| Skill | Responsibility |
|-------|---------------|
| `content-strategy/` | PLAN — what to create, for whom, at what buyer stage, in what order |
| `copywriting/` | WRITE — persuasive marketing copy for specific pages and sections |
| `content/` | BUILD — content architecture, heading hierarchy, SEO tags, HTML semantics |

Run content-strategy first. Then copywriting. Then content for implementation.

---

## Before planning — gather context

Check for existing product marketing context first:
- `.agents/product-marketing-context.md`
- `.claude/product-marketing-context.md` (older setups)

If it exists, read it and only ask for what's missing. Otherwise gather:

**1. Business context**
- What does the company do?
- Who is the ideal customer?
- Primary goal for content: traffic / leads / brand awareness / thought leadership?
- What problems does the product solve?

**2. Customer research**
- What questions do customers ask before buying?
- What objections come up in sales calls?
- What topics appear repeatedly in support tickets?
- What language do customers use to describe their problems?

**3. Current state**
- Existing content and what's working?
- Available resources: writers, budget, time?
- Producible formats: written, video, audio?

**4. Competitive landscape**
- Main competitors?
- Existing content gaps in the market?

---

## Searchable vs shareable

Every piece of content must be searchable, shareable, or both. Prioritize in that order.

**Searchable** — captures existing demand
- Target a specific keyword or question
- Match search intent exactly
- Structure headings to mirror search patterns
- Comprehensive coverage; don't leave questions unanswered
- Optimize for AI/LLM discovery: clear positioning, structured content, brand consistency

**Shareable** — creates demand
- Lead with a novel insight, original data, or counterintuitive take
- Challenge conventional wisdom with well-reasoned arguments
- Tell stories that make people feel something
- Content people share to look smart or help others

---

## Content types

### Searchable content types

**Use-case content** — `[persona] + [use-case]`
- "Project management for designers"
- "Task tracking for developers"

**Hub and spoke** — hub = comprehensive overview; spokes = related subtopics
```
/topic (hub)
├── /topic/subtopic-1
├── /topic/subtopic-2
└── /topic/subtopic-3
```
Create hub first, then spokes. Interlink strategically.
Note: Most content works fine under `/blog`. Only use hub/spoke URL structures for major topics with layered depth (e.g. Atlassian's `/agile`).

**Template libraries** — high-intent keywords + product adoption
- Target: "marketing plan template"
- Provide immediate standalone value, then show how product enhances it

### Shareable content types

**Thought leadership** — articulate concepts everyone feels but hasn't named; challenge conventional wisdom

**Data-driven content** — product data analysis (anonymized), public data analysis, original research

**Expert roundups** — 15–30 experts answering one specific question; built-in distribution

**Case studies** — Challenge → Solution → Results → Key learnings

**Meta content** — behind-the-scenes transparency ("How We Got Our First $5k MRR")

---

## Content pillars and topic clusters

Content pillars = the 3–5 core topics your brand will own. Each pillar spawns a cluster.

Most content can live under `/blog` with good internal linking. Dedicated pillar pages with custom URL structures are only needed when building comprehensive resources with multiple layers of depth.

### How to identify pillars

- **Product-led:** What problems does the product solve?
- **Audience-led:** What does the ICP need to learn?
- **Search-led:** What topics have volume in this space?
- **Competitor-led:** What are competitors ranking for?

### Pillar structure

```
Pillar Topic (Hub)
├── Subtopic Cluster 1
│   ├── Article A
│   ├── Article B
│   └── Article C
├── Subtopic Cluster 2
│   ├── Article D
│   ├── Article E
│   └── Article F
```

---

## Keyword research by buyer stage

| Stage | Modifiers | Example |
|-------|-----------|---------|
| **Awareness** | "what is," "how to," "guide to," "introduction to" | "What is Agile Project Management" |
| **Consideration** | "best," "top," "vs," "alternatives," "comparison" | "Asana vs Trello vs Monday" |
| **Decision** | "pricing," "reviews," "demo," "trial," "buy" | "[Product] Reviews" |
| **Implementation** | "templates," "examples," "tutorial," "how to use," "setup" | "Step-by-Step Setup Tutorial" |

---

## Content ideation sources

**1. Keyword data** (Ahrefs, SEMrush, GSC exports)
Analyze for: topic clusters, buyer stage, search intent, quick wins (low competition + decent volume + high relevance), content gaps vs competitors

Output format: `| Keyword | Volume | Difficulty | Buyer Stage | Content Type | Priority |`

**2. Call transcripts** (sales or customer calls)
Extract: questions asked → FAQ/blog, pain points in customer language, objections, competitor mentions

**3. Survey responses**
Mine for: open-ended responses, common themes (30%+ mention = high priority), resource requests

**4. Forum research**
- Reddit: `site:reddit.com [topic]` — top posts, upvoted answers, frustrations
- Quora: `site:quora.com [topic]` — most-followed questions
- Also: Indie Hackers, Hacker News, Product Hunt, industry Slack/Discord

**5. Competitor analysis**
- Find content: `site:competitor.com/blog`
- Analyze: top-performing posts, topics covered repeatedly, gaps, outdated content
- Identify: angles they're missing, topics you can cover better

**6. Sales and support input**
Extract from customer-facing teams: common objections, repeated questions, support ticket patterns, success stories

---

## Prioritizing content ideas

Score each idea on four factors:

| Factor | Weight | What to assess |
|--------|--------|---------------|
| Customer impact | 40% | Frequency in research, emotional charge, customer LTV |
| Content-market fit | 30% | Aligns with product problems, unique insights available, leads to product interest |
| Search potential | 20% | Monthly volume, competition level, long-tail opportunities, growth trend |
| Resource requirements | 10% | Expertise available, research needed, assets required |

**Scoring template:**
```
| Topic | Impact (40%) | CMF (30%) | Search (20%) | Resources (10%) | Total |
```

---

## Output format

When creating a content strategy, provide:

**1. Content pillars** — 3–5 pillars with rationale, subtopic clusters, connection to product

**2. Priority topics** — for each recommended piece:
- Topic/title
- Searchable, shareable, or both
- Content type
- Target keyword and buyer stage
- Why this topic (customer research backing)

**3. Topic cluster map** — structured representation of how content interconnects

---

## Source

`coreyhaines31/marketingskills` — skill `content-strategy`
Security: Gen Agent Trust Hub PASS / Socket PASS / Snyk WARN
