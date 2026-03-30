# Skill: Content

Copy structure, SEO, content hierarchy, and accessibility.
Content is architecture — structure before words.

---

## Content hierarchy

Every page has one job. Every section supports that job.
Structure follows: **Orient → Inform → Convince → Act**

| Stage | Purpose | Typical sections |
|-------|---------|-----------------|
| **Orient** | Tell the visitor where they are and what this is | Hero, above-fold headline |
| **Inform** | Explain what you do, for whom, how | Feature sections, about, process |
| **Convince** | Provide evidence | Social proof, case studies, testimonials, credentials |
| **Act** | Give a clear next step | CTA, contact, pricing, booking |

Not every page needs all four stages. Every page needs at least a clear orient and act.

---

## Heading hierarchy

```
h1 — One per page. The core proposition or page title.
h2 — Major sections. Should make sense read in sequence.
h3 — Sub-sections within an h2 section.
h4+ — Rarely needed. Use sparingly.
```

**Rule:** Never skip heading levels for visual sizing. Use CSS classes for sizing.

```html
<!-- Good -->
<h2 class="text-xl">Section Title</h2>

<!-- Bad — using h4 because it's visually smaller -->
<h4>Section Title</h4>
```

---

## Copy patterns

### Hero headline formula
- Lead with the outcome, not the process
- One idea, one sentence
- Avoid: "We help [companies] do [thing]"
- Prefer: "[Outcome] for [audience]"

### CTA copy
- Specific beats generic: "Book a 20-minute call" > "Contact us"
- First-person beats second-person: "Start my project" > "Start your project"
- One primary CTA per page section — avoid choice paralysis

### Body copy
- Aim for Flesch reading ease > 60 (accessible to most readers)
- Short paragraphs: 2–4 sentences max
- Lead with the conclusion, then explain
- Avoid passive voice

---

## SEO

### Title tag
```html
<title>[Primary keyword] — [Brand name]</title>
```
- 50–60 characters
- Primary keyword first
- Brand at end

### Meta description
```html
<meta name="description" content="[150–160 char summary that reads naturally and includes primary keyword]">
```

### Open Graph (required for all pages)
```html
<meta property="og:title" content="[Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Absolute URL to 1200×630 image]">
<meta property="og:url" content="[Canonical URL]">
<meta property="og:type" content="website">
```

### Structured data (JSON-LD)
Add `Organization` schema to the homepage at minimum:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Company name]",
  "url": "[URL]",
  "logo": "[Logo URL]"
}
</script>
```

---

## Accessibility

### Required on every page
- `lang` attribute on `<html>`
- `<main>` landmark wrapping primary content
- Skip-to-main link as first focusable element
- All images have meaningful `alt` or `alt=""` for decorative
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- All interactive elements keyboard-accessible
- Focus styles visible (never `outline: none` without a replacement)

### Alt text guide
| Image type | Alt text |
|-----------|---------|
| Informative | Describe what the image shows |
| Functional (linked) | Describe the destination/action |
| Decorative | `alt=""` |
| Complex (chart, diagram) | Short alt + long description nearby |

---

## Content types and their containers

| Content type | HTML element |
|-------------|-------------|
| Standalone quote | `<blockquote>` |
| Term + definition | `<dl>`, `<dt>`, `<dd>` |
| Steps in sequence | `<ol>` |
| Unordered list | `<ul>` |
| Data comparison | `<table>` with `<caption>` |
| Navigation | `<nav>` with `aria-label` |
