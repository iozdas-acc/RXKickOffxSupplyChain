import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
