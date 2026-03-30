import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow importing Three.js and related packages
  transpilePackages: ['three'],
}

export default nextConfig
