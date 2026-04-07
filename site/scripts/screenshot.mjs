import puppeteer from 'puppeteer'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const PAGES = [
  { slug: 'home',        path: '/' },
  { slug: 'kidovation',  path: '/kidovation' },
  { slug: 'future-labs', path: '/future-labs' },
  { slug: 'work-with-us',path: '/work-with-us' },
  { slug: 'about',       path: '/about' },
]

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function screenshotPage(page, slug, pagePath, round) {
  const dir = path.join(__dirname, '..', '..', '..', 'pages', slug, 'screenshots')
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results = []

  for (const vp of VIEWPORTS) {
    const p = await browser.newPage()
    await p.setViewport({ width: vp.width, height: vp.height })

    const errors = []
    p.on('pageerror', err => errors.push(err.message))
    p.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    let status = 200
    try {
      const response = await p.goto(`${BASE_URL}${pagePath}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      })
      status = response?.status() ?? 0
    } catch (e) {
      errors.push(`Navigation failed: ${e.message}`)
    }

    // Wait a bit for animations to settle
    await new Promise(r => setTimeout(r, 800))

    const filename = `r${round}-${vp.name}.png`
    const filepath = path.join(dir, filename)
    await p.screenshot({ path: filepath, fullPage: true })

    // Collect visible text for content audit
    const bodyText = await p.evaluate(() => {
      const main = document.querySelector('main') || document.body
      return main.innerText.slice(0, 500)
    })

    // Check for error states
    const hasErrorText = await p.evaluate(() => {
      const text = document.body.innerText
      return text.includes('missing required') ||
             text.includes('Application error') ||
             text.includes('Error:') ||
             text.includes('Cannot read') ||
             text.includes('is not defined')
    })

    results.push({
      viewport: vp.name,
      status,
      errors,
      hasErrorText,
      filepath,
      preview: bodyText.replace(/\s+/g, ' ').trim(),
    })

    await p.close()
  }

  await browser.close()
  return results
}

async function run() {
  const slugArg = process.argv[2]
  const roundArg = parseInt(process.argv[3] || '1')

  const pagesToRun = slugArg
    ? PAGES.filter(p => p.slug === slugArg)
    : PAGES

  if (slugArg && pagesToRun.length === 0) {
    console.error(`Unknown slug: ${slugArg}. Available: ${PAGES.map(p => p.slug).join(', ')}`)
    process.exit(1)
  }

  console.log(`\n📸 Screenshot audit — round ${roundArg}`)
  console.log(`   Base URL: ${BASE_URL}`)
  console.log(`   Pages: ${pagesToRun.map(p => p.slug).join(', ')}\n`)

  for (const { slug, path: pagePath } of pagesToRun) {
    console.log(`── ${slug}`)
    try {
      const results = await screenshotPage(null, slug, pagePath, roundArg)
      for (const r of results) {
        const errFlag = r.errors.length > 0 || r.hasErrorText ? '⚠️ ' : '✓ '
        console.log(`   ${errFlag}${r.viewport} (${r.status}) → ${path.basename(r.filepath)}`)
        if (r.errors.length > 0) {
          r.errors.forEach(e => console.log(`      ERROR: ${e.slice(0, 120)}`))
        }
        if (r.hasErrorText) {
          console.log(`      ⛔ Error text detected in page body`)
        }
      }
    } catch (e) {
      console.log(`   ✗ Failed: ${e.message}`)
    }
    console.log()
  }

  console.log('Done. Screenshots saved to pages/<slug>/screenshots/')
}

run().catch(e => { console.error(e); process.exit(1) })
