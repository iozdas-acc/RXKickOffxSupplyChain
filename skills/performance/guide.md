# Skill: Performance

Lighthouse budgets, load optimization, WebGL performance, and code splitting.
Performance is a feature — define budgets before building, not after.

---

## Default performance budgets

| Metric | Target | Hard limit |
|--------|--------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | < 4s |
| FID / INP | < 100ms | < 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| TTI (Time to Interactive) | < 3.5s | < 5s |
| Total page weight (desktop) | < 1MB | < 2MB |
| Total page weight (mobile) | < 500KB | < 1MB |
| JS bundle (initial) | < 150KB gzipped | < 300KB |

Override these in `pages/<name>/context.md` if a page has special requirements.

---

## Images

### Format priority
1. AVIF (best compression, good browser support)
2. WebP (excellent support, great compression)
3. JPEG/PNG (fallback only)

### Always
- Use `width` and `height` attributes to prevent CLS
- Use `loading="lazy"` for below-the-fold images
- Use `fetchpriority="high"` for LCP image
- Serve responsive sizes with `srcset` and `sizes`

```html
<img
  src="hero.webp"
  srcset="hero-480.webp 480w, hero-960.webp 960w, hero-1440.webp 1440w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1440"
  height="810"
  fetchpriority="high"
  alt="Description"
>
```

### Max dimensions by use case
| Use case | Max width | Format |
|----------|-----------|--------|
| Hero background | 1920px | WebP |
| Section background | 1440px | WebP |
| Card image | 800px | WebP |
| Thumbnail | 400px | WebP |
| Logo (raster) | 400px | WebP or SVG |

---

## Fonts

### Strategy
- Prefer system fonts for body copy when possible
- Self-host web fonts — never rely on Google Fonts in production
- Subset fonts to required characters
- Use `font-display: swap`

```css
@font-face {
  font-family: 'Brand';
  src: url('/fonts/brand-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### Preload critical fonts
```html
<link rel="preload" href="/fonts/brand-regular.woff2" as="font" type="font/woff2" crossorigin>
```

---

## JavaScript

### Code splitting (Vite / webpack)
```js
// Dynamic import for non-critical code
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Third-party scripts
- Load analytics and chat scripts with `async` or `defer`
- Never load third-party scripts synchronously in `<head>`
- Facade heavy embeds (YouTube, maps) with a click-to-load placeholder

### Bundle analysis
```bash
# Vite
npx vite-bundle-visualizer

# webpack
npx webpack-bundle-analyzer stats.json
```

---

## WebGL / 3D performance

- Cap pixel ratio: `renderer.setPixelRatio(Math.min(dpr, 2))`
- Dispose unused geometries and materials
- Use `BufferGeometry` — never `Geometry`
- Texture size: max 2048×2048 for mobile, 4096×4096 for desktop
- Compress textures with KTX2/Basis
- Target 60fps on desktop, 30fps acceptable on mobile
- Skip 3D on low-end mobile: detect via `navigator.hardwareConcurrency < 4`

```js
// Detect low-end device
const isLowEnd = navigator.hardwareConcurrency < 4 ||
                  navigator.deviceMemory < 4

if (isLowEnd) {
  // render 2D fallback instead
}
```

---

## Critical rendering path

1. Inline critical CSS in `<head>` (above-the-fold styles only)
2. Defer non-critical CSS
3. Preconnect to required external origins
4. Preload LCP image and critical fonts

```html
<head>
  <!-- Preconnect -->
  <link rel="preconnect" href="https://cdn.example.com">

  <!-- Preload critical assets -->
  <link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/images/hero.webp" as="image">

  <!-- Inline critical CSS -->
  <style>/* above-the-fold styles */</style>

  <!-- Defer non-critical CSS -->
  <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
</head>
```

---

## Performance checklist (per page)

- [ ] LCP image has `fetchpriority="high"` and no `loading="lazy"`
- [ ] All images have `width` and `height` (no CLS)
- [ ] Fonts use `font-display: swap` and are preloaded
- [ ] No render-blocking scripts in `<head>`
- [ ] Bundle size within budget
- [ ] Lighthouse score > 90 on mobile
