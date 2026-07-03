import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  // Multiple lockfiles exist (root + site). Pin the Turbopack workspace root to
  // this directory so Next can resolve the local `next` package from site/app.
  turbopack: {
    root: __dirname,
  },
  // Static export: every route already prerenders to HTML (see build output —
  // all pages marked "Static"). Exporting bypasses Azure SWA's hybrid-runtime
  // size limit and ships pure HTML/CSS/JS.
  output: 'export',
  // Static export can't use next/image's default loader — disable optimisation
  // so <Image> falls back to plain <img>. (We aren't using next/image today,
  // but leaving this on keeps future use safe.)
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  transpilePackages: ['three'],
}

export default nextConfig
