#!/usr/bin/env node

/**
 * WebContext Onboarding
 * Inventories your inputs first, then asks only gap questions.
 * Writes: .impeccable.md, .agents/product-marketing-context.md, assets/manifest.md entries
 * Usage: node onboard.js
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_RAW = path.join(ROOT, 'assets', 'raw');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question, hint) {
  const hintLine = hint ? `  (${hint})\n` : '';
  return new Promise((resolve) => {
    rl.question(`\n${question}\n${hintLine}→ `, (a) => resolve(a.trim()));
  });
}

function askYN(question) {
  return new Promise((resolve) => {
    rl.question(`\n${question} (y/n)\n→ `, (a) => resolve(a.trim().toLowerCase().startsWith('y')));
  });
}

function section(num, total, title) {
  console.log(`\n${'─'.repeat(52)}\n  ${num} / ${total}  ${title}\n${'─'.repeat(52)}`);
}

function listRawAssets() {
  try {
    return fs.readdirSync(ASSETS_RAW).filter(f => !f.startsWith('.'));
  } catch {
    return [];
  }
}

async function run() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║         WebContext Project Onboarding          ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('\nWe\'ll start with what you already have, then fill gaps.');
  console.log('Drop files into  assets/raw/  before or during this session.\n');

  const data = {};
  const assets = [];   // for manifest
  const inputs = {};   // what they have

  // ── PHASE 1: INPUT INVENTORY ──────────────────────────
  section(1, 4, 'WHAT DO YOU HAVE?');
  console.log('\nTell me what inputs exist. We\'ll use them to skip questions we can already answer.\n');

  inputs.figma    = await askYN('Figma exports? (PNG or PDF — export frames manually from Figma first)');
  inputs.mural    = await askYN('Mural screenshots? (screenshot your boards → save as PNG — live Mural integration is a future feature)');
  inputs.images   = await askYN('Reference images or photography?');
  inputs.wordDocs = await askYN('Word docs, decks, or written content? (.docx, .pdf, or paste into a .md file)');
  inputs.brand    = await askYN('Brand guidelines? (PDF or exported PNG — logo, colors, fonts)');

  const hasVisualInputs  = inputs.figma || inputs.mural || inputs.images || inputs.brand;
  const hasCopyInputs    = inputs.wordDocs;

  // ── PHASE 2: ASSET DROP ───────────────────────────────
  if (hasVisualInputs || hasCopyInputs) {
    section(2, 4, 'DROP YOUR FILES');

    console.log('\nDrop your files into:');
    console.log(`  ${ASSETS_RAW}\n`);
    console.log('Suggested naming:');
    if (inputs.figma)    console.log('  figma-export-01.png, figma-export-02.png ...  (File > Export in Figma)');
    if (inputs.mural)    console.log('  mural-01.png, mural-02.png ...  (screenshot your Mural board, save as PNG)');
    if (inputs.images)   console.log('  ref-image-01.jpg, ref-image-02.jpg ...');
    if (inputs.wordDocs) console.log('  content-brief.docx  OR  content-brief.md');
    if (inputs.brand)    console.log('  brand-guidelines.pdf  OR  logo.svg + brand-colors.md');

    await ask('Press Enter when your files are in assets/raw/ (or Enter to skip)');

    // Categorize whatever is in raw now
    const rawFiles = listRawAssets();
    if (rawFiles.length > 0) {
      console.log(`\nFound ${rawFiles.length} file(s). Let's label each one so Claude knows what it's looking at.\n`);

      const ASSET_KINDS = [
        'figma-export    — exported Figma frame or screen',
        'mural-board     — screenshot of a Mural board',
        'wireframe       — lo-fi layout sketch or wireframe',
        'visual-design   — hi-fi visual design or mockup',
        'brand-guideline — colors, fonts, logo usage rules',
        'logo            — logo file',
        'photography     — real photo or product image',
        'reference       — inspiration or mood reference',
        'copy-doc        — written content, brief, or script',
        'deck            — presentation or pitch deck',
        'other           — anything else',
      ];

      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const base = path.basename(file, path.extname(file)).toLowerCase();
        const ext  = path.extname(file).toLowerCase();

        // ── Infer kind from filename + extension ──
        let inferredKind = 'reference';
        if (/figma/.test(base))                                          inferredKind = 'figma-export';
        else if (/mural/.test(base))                                     inferredKind = 'mural-board';
        else if (/wire|wireframe|lo-?fi/.test(base))                     inferredKind = 'wireframe';
        else if (/mockup|design|hi-?fi|screen|frame|ui/.test(base))     inferredKind = 'visual-design';
        else if (/brand|guideline|style.?guide/.test(base))             inferredKind = 'brand-guideline';
        else if (/logo|mark|icon/.test(base) && ['.svg','.png'].includes(ext)) inferredKind = 'logo';
        else if (/photo|image|img|hero|bg|background/.test(base))       inferredKind = 'photography';
        else if (/brief|content|copy|script|text/.test(base))           inferredKind = 'copy-doc';
        else if (/deck|slide|pres|pitch/.test(base))                    inferredKind = 'deck';
        else if (['.docx','.doc','.md','.txt'].includes(ext))           inferredKind = 'copy-doc';
        else if (['.pdf'].includes(ext))                                 inferredKind = 'deck';
        else if (['.svg'].includes(ext))                                 inferredKind = 'logo';

        // ── Infer description from filename ──
        const inferredDesc = base
          .replace(/[-_]/g, ' ')
          .replace(/\d+$/, '')
          .trim()
          .replace(/\b\w/g, c => c.toUpperCase());

        // ── Infer page from filename ──
        const pageKeywords = ['home','about','contact','pricing','landing','hero','nav','footer','blog','team','services','work','case'];
        const inferredPage = pageKeywords.find(p => base.includes(p)) || 'global';

        console.log(`\n  [${i + 1}/${rawFiles.length}]  ${file}`);
        console.log(`  Inferred → kind: ${inferredKind}  |  shows: "${inferredDesc}"  |  page: ${inferredPage}`);

        const confirmKind = await ask(`  Kind correct? (Enter to keep "${inferredKind}", or type a correction)`, ASSET_KINDS.map((k,idx) => `${idx+1}. ${k.split(/\s+—/)[0].trim()}`).join('  '));
        const kind = confirmKind || inferredKind;

        const confirmDesc = await ask(`  Description correct? (Enter to keep, or type a correction)`, `currently: "${inferredDesc}"`);
        const description = confirmDesc || inferredDesc;

        const confirmPage = await ask(`  Page correct? (Enter to keep "${inferredPage}", or type a correction)`);
        const page = confirmPage || inferredPage;

        // Map kind to manifest type
        const typeMap = {
          'figma-export': 'mockup', 'mural-board': 'mockup', 'wireframe': 'mockup',
          'visual-design': 'mockup', 'brand-guideline': 'doc', 'logo': 'logo',
          'photography': 'image', 'reference': 'image', 'copy-doc': 'doc',
          'deck': 'doc', 'other': 'reference',
        };
        const type = typeMap[kind] || 'reference';

        assets.push({
          file,
          kind,
          type,
          description,
          page: page || 'global',
          source: 'assets/raw/',
          status: 'uploaded',
        });
      }
    } else {
      console.log('\n  (No files found in assets/raw/ — continuing without them)');
    }
  } else {
    section(2, 4, 'DROP YOUR FILES');
    console.log('\n  No inputs yet — you can drop files into assets/raw/ any time later.');
  }

  // ── PHASE 3: GAP QUESTIONS ────────────────────────────
  // Only ask what the inputs can't answer
  section(3, 4, 'GAP QUESTIONS');
  console.log('\nAsking only what your files can\'t tell us.\n');

  // Always ask — project basics
  data.projectName     = await ask('Project name?');
  data.projectOneliner = await ask('One sentence: what does this site do?');

  // Audience — files rarely answer this
  console.log('\n  — Audience —');
  data.audience        = await ask('Who is the primary audience?', 'role, context, device');
  data.audienceJob     = await ask('What are they trying to get done?');
  data.audienceFear    = await ask('What hesitation do they arrive with?');

  // Brand / feel — skip deep questions if they have Figma or brand guidelines
  if (!hasVisualInputs) {
    console.log('\n  — Brand & feel (no visual inputs found) —');
    data.tone        = await ask('How should the site feel?', 'e.g. cold precision, warm editorial, brutalist bold, luxury minimal');
    data.memorable   = await ask('The ONE thing a visitor should remember after leaving?');
  } else {
    console.log('\n  — Brand & feel (will be derived from your files) —');
    data.tone        = await ask('Any strong preference Claude should know before reading your files?', 'leave blank to let files speak');
    data.memorable   = await ask('The ONE thing a visitor should remember after leaving?');
  }

  data.constraints   = await ask('Hard constraints?', 'legal, brand mandates, accessibility, perf targets — or leave blank');

  // Copy / product — skip if they have word docs
  if (!hasCopyInputs) {
    console.log('\n  — Product & offer (no copy inputs found) —');
    data.product         = await ask('What are you selling or offering?');
    data.differentiator  = await ask('What makes it different from alternatives?');
    data.outcome         = await ask('Key transformation or outcome for the customer?');
    data.proof           = await ask('Proof points — numbers, testimonials, credentials?');
  } else {
    console.log('\n  — Product & offer (copy will be read from your files) —');
    data.product         = await ask('One-line summary of the offer?', 'detail will come from your docs');
    data.differentiator  = await ask('The single biggest differentiator?');
    data.proof           = await ask('Top proof point?', 'best stat, testimonial, or credential');
  }

  // Traffic & CTA — always ask
  console.log('\n  — Traffic & conversion —');
  data.trafficSource    = await ask('Where is traffic coming from?', 'ads, organic, email, referral, direct');
  data.visitorContext   = await ask('What do visitors already know before arriving?');
  data.primaryCTA       = await ask('The ONE primary action you want visitors to take?');
  data.voiceTone        = await ask('Voice formality?', 'casual / professional-but-friendly / formal-enterprise');
  data.brandPersonality = await ask('Brand personality?', 'e.g. playful, serious, bold, understated, technical, accessible');

  rl.close();

  // ── PHASE 4: WRITE FILES ──────────────────────────────
  section(4, 4, 'WRITING FILES');

  // .impeccable.md
  const impeccable = `# Design Context — .impeccable.md

> Read by \`skills/frontend-design/\` before any design work.
> Last updated: ${new Date().toISOString().split('T')[0]}
> Inputs available: ${[
    inputs.figma    && 'Figma exports',
    inputs.mural    && 'Mural screenshots',
    inputs.images   && 'Reference images',
    inputs.wordDocs && 'Written content',
    inputs.brand    && 'Brand guidelines',
  ].filter(Boolean).join(', ') || 'none yet'}

---

## Target audience

${data.audience || '[not filled]'}

**What they're trying to do:**
${data.audienceJob || '[not filled]'}

**What hesitation they arrive with:**
${data.audienceFear || '[not filled]'}

---

## Use cases

${data.audienceJob || '[not filled]'}

---

## Brand personality & tone

${data.tone || '[to be derived from visual inputs in assets/raw/]'}

---

## What makes this unforgettable?

${data.memorable || '[not filled]'}

---

## Hard constraints

${data.constraints || 'None specified.'}

---

## Visual inputs to read

${assets.filter(a => ['mockup','image','logo'].includes(a.type)).map(a => `- \`assets/raw/${a.file}\` — **${a.kind}** — ${a.description} (page: ${a.page})`).join('\n') || '_None dropped yet — add to assets/raw/ and re-run or fill manually._'}
`;

  // .agents/product-marketing-context.md
  const marketing = `# Product Marketing Context

> Read by \`skills/copywriting/\` before writing any marketing copy.
> Last updated: ${new Date().toISOString().split('T')[0]}
> Copy inputs available: ${inputs.wordDocs ? 'Yes — check assets/raw/ for docs' : 'No — answers below are the source'}

---

## Product / offer

${data.product || '[not filled]'}

**What makes it different from alternatives?**
${data.differentiator || '[not filled]'}

**Key transformation or outcome for the customer:**
${data.outcome || '[to be derived from content docs in assets/raw/]'}

**Proof points:**
${data.proof || '[not filled]'}

---

## Audience

${data.audience || '[not filled]'}

**Problem they're solving:**
${data.audienceJob || '[not filled]'}

**Objections or hesitations:**
${data.audienceFear || '[not filled]'}

---

## Traffic context

**Source:** ${data.trafficSource || '[not filled]'}

**What visitors already know:** ${data.visitorContext || '[not filled]'}

---

## Voice & tone

**Formality:** ${data.voiceTone || '[not filled]'}

**Brand personality:** ${data.brandPersonality || '[not filled]'}

---

## Primary CTA

${data.primaryCTA || '[not filled]'}
`;

  fs.writeFileSync(path.join(ROOT, '.impeccable.md'), impeccable);
  fs.writeFileSync(path.join(ROOT, '.agents', 'product-marketing-context.md'), marketing);

  // Append new assets to manifest
  if (assets.length > 0) {
    const manifestPath = path.join(ROOT, 'assets', 'manifest.md');
    let manifest = fs.readFileSync(manifestPath, 'utf8');
    const today = new Date().toISOString().split('T')[0];

    const newEntries = assets.map((a, i) => {
      const prefix = a.type === 'mockup' ? 'MOCK' : a.type === 'image' ? 'IMG' : a.type === 'logo' ? 'LOGO' : a.type === 'doc' ? 'DOC' : a.type === 'font' ? 'FONT' : 'REF';
      const id = `A-${prefix}-${String(i + 1).padStart(3, '0')}`;
      return `\n### ${id} — ${a.file}\n- File: ${a.file}\n- Kind: ${a.kind}\n- Type: ${a.type}\n- Source: ${a.source}\n- Status: ${a.status}\n- Assigned to: ${a.page}\n- Usage: ${a.description}\n- Added: ${today}\n- Notes: added via onboard.js\n`;
    }).join('');

    // Insert after the relevant section header
    manifest = manifest.replace('_No assets registered yet._\n\n---\n\n## By Page', newEntries + '\n---\n\n## By Page');
    fs.writeFileSync(manifestPath, manifest);
  }

  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║                   Done!                        ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('\n  ✓  .impeccable.md');
  console.log('  ✓  .agents/product-marketing-context.md');
  if (assets.length > 0) console.log(`  ✓  assets/manifest.md  (${assets.length} asset(s) registered)`);
  console.log('\nNext: open Claude Code and start building.\n');
}

run().catch((err) => {
  console.error('\nError:', err.message);
  rl.close();
  process.exit(1);
});
