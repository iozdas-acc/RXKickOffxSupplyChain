#!/usr/bin/env node
/**
 * screenshot-presentation.js — capture the 5-chapter presentation at /
 *
 * The presentation is a single-page SPA with 5 chapters navigated by keyboard
 * or click. Default screenshot.js scrolls, which is the wrong primitive here.
 * This script:
 *   1. Opens the URL, waits for load
 *   2. Captures hero entrance
 *   3. Clicks "Enter Experience" (or falls back to keypress)
 *   4. Captures chapter 0 … chapter 4 by pressing ArrowRight between each
 *
 * Usage: node scripts/screenshot-presentation.js [url] [round]
 * Output: /tmp/rx-presentation-audit/r<N>/<bp>-<step>.png
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BREAKPOINTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];

const url   = process.argv[2] || 'http://localhost:3000';
const round = process.argv[3] ? parseInt(process.argv[3]) : 1;
const outDir = path.join('/tmp', 'rx-presentation-audit', `r${round}`);
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  console.log(`\nPresentation audit — round ${round}`);
  console.log(`URL: ${url}\nOutput: ${outDir}\n`);

  const browser = await chromium.launch({
    args: [
      '--enable-unsafe-swiftshader',
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });
  const saved = [];

  for (const bp of BREAKPOINTS) {
    const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
    const errors = [];
    const warnings = [];
    page.on('console', msg => {
      const t = msg.type();
      if (t === 'error') errors.push(msg.text());
      else if (t === 'warning') warnings.push(msg.text());
    });
    page.on('pageerror', err => errors.push(`pageerror: ${err.message}`));

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1500); // let hero entrance animate in

    // 0: hero entrance
    let file = path.join(outDir, `${bp.name}-00-hero.png`);
    await page.screenshot({ path: file });
    saved.push(file);

    // dismiss hero — try the known CTA labels, fallback to any visible button
    let entered = false;
    for (const sel of [
      'button:has-text("EXPLORE OUR STORY")',
      'button:has-text("Explore")',
      'button:has-text("Enter")',
      'button', // last resort — grab the first button on the page
    ]) {
      try {
        const btn = await page.$(sel);
        if (btn) { await btn.click(); entered = true; break; }
      } catch {}
    }
    if (!entered) console.log(`  [${bp.name}] could not dismiss hero`);
    await page.waitForTimeout(1400); // HeroEntrance exit + chapter enter

    // 1..5: each chapter — use digit keys (page listens for 1-5)
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press(String(i + 1));
      // HERO_MOMENT_MS 2200 + 0.55s content fade-in + 0.9s chapter GSAP + buffer
      await page.waitForTimeout(3800);

      const label = `${bp.name}-${String(i + 1).padStart(2, '0')}-chapter${i + 1}.png`;
      file = path.join(outDir, label);
      await page.screenshot({ path: file });
      saved.push(file);
    }

    await page.close();
    // Filter out the known headless-only WebGL noise
    const realErrors = errors.filter(e => !/WebGL|GL_VENDOR|ANGLE/.test(e));
    if (realErrors.length) {
      console.log(`\n[${bp.name}] CONSOLE ERRORS (non-WebGL):`);
      realErrors.forEach(e => console.log('  ❌', e));
    }
    if (warnings.length) {
      console.log(`\n[${bp.name}] CONSOLE WARNINGS:`);
      warnings.slice(0, 20).forEach(w => console.log('  ⚠ ', w));
      if (warnings.length > 20) console.log(`     … +${warnings.length - 20} more`);
    }
  }

  await browser.close();
  console.log(`\nSaved ${saved.length} screenshots.`);
  saved.forEach(f => console.log('  ', f));
})().catch(e => { console.error(e); process.exit(1); });
