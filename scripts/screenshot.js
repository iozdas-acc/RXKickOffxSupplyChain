#!/usr/bin/env node
/**
 * screenshot.js — capture a page at multiple breakpoints, save to pages/<slug>/screenshots/
 *
 * Captures viewport-height slices at each scroll position so Claude can actually
 * see section-level detail instead of a compressed full-page thumbnail.
 *
 * Usage:
 *   node scripts/screenshot.js [url] [page-slug] [round]
 *
 * Examples:
 *   node scripts/screenshot.js http://localhost:3000 home
 *   node scripts/screenshot.js http://localhost:3000/about about 2
 *
 * Saves to: pages/<slug>/screenshots/r<N>-<breakpoint>-s<N>.png
 * Round auto-increments if not provided.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BREAKPOINTS = [
  { name: 'mobile',  width: 390,  height: 844  },
  { name: 'desktop', width: 1440, height: 900  },
];

// How far to scroll between slices, as a fraction of viewport height.
// 0.85 gives ~15% overlap so nothing is cropped at the fold.
const SCROLL_STEP = 0.85;

function detectNextRound(outDir) {
  if (!fs.existsSync(outDir)) return 1;
  const files = fs.readdirSync(outDir);
  const rounds = files
    .map(f => { const m = f.match(/^r(\d+)-/); return m ? parseInt(m[1]) : 0; })
    .filter(n => n > 0);
  return rounds.length ? Math.max(...rounds) + 1 : 1;
}

async function run() {
  const url    = process.argv[2] || 'http://localhost:3000';
  const slug   = process.argv[3] || 'page';
  const outDir = path.join(__dirname, '..', 'pages', slug, 'screenshots');

  fs.mkdirSync(outDir, { recursive: true });

  const round = process.argv[4] ? parseInt(process.argv[4]) : detectNextRound(outDir);

  console.log(`\nScreenshot — ${slug} — round ${round}`);
  console.log(`URL: ${url}\nOutput: ${outDir}\n`);

  // Headless Chromium can't create a WebGL context by default — use the
  // SwiftShader software rasterizer so R3F / Three.js scenes actually render.
  const browser = await chromium.launch({
    args: [
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--enable-webgl',
      '--use-gl=angle',
      '--use-angle=swiftshader',
    ],
  });
  const saved = [];

  for (const bp of BREAKPOINTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: bp.width, height: bp.height });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    } catch {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    }

    // Let fonts + layout settle, plus the full GSAP hero entrance (~3.1s).
    await page.waitForTimeout(5000);

    // Measure total page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewH      = bp.height;
    const step       = Math.round(viewH * SCROLL_STEP);
    const positions  = [];

    for (let y = 0; y < pageHeight; y += step) {
      positions.push(Math.min(y, Math.max(0, pageHeight - viewH)));
    }
    // Deduplicate (can happen at the very end)
    const unique = [...new Set(positions)];

    for (let s = 0; s < unique.length; s++) {
      const scrollY = unique[s];
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(1200); // let scroll animations settle

      const filename = `r${round}-${bp.name}-s${s + 1}.png`;
      const filepath = path.join(outDir, filename);

      await page.screenshot({ path: filepath, fullPage: false });
      saved.push({ round, breakpoint: bp.name, slice: s + 1, width: bp.width, scrollY, file: filepath });
      console.log(`✓ r${round}-${bp.name}-s${s + 1}  ${bp.width}px  scroll=${scrollY}px → ${filepath}`);
    }

    await page.close();
  }

  await browser.close();

  console.log(`\nRound ${round} complete — ${saved.length} slices total.`);
  console.log(`In Claude Code, run:\n  /screenshot ${slug}\n`);
  console.log('Files saved:');
  saved.forEach(s => console.log(`  ${s.file}`));
}

run().catch(err => {
  console.error('Screenshot failed:', err.message);
  process.exit(1);
});
