import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sainsburys-orange': '#F06C00',
        'sainsburys-orange-dark': '#E55000',
        'accenture-purple': '#A100FF',
        'horizon-1': '#0891B2',
        'horizon-2': '#059669',
        'horizon-3': '#7C3AED',
        'bg-deep': '#06061A',
        'bg-surface': '#0E0E1F',
        'bg-raised': '#141428',
        'text-primary': '#F0F0F8',
        'text-secondary': '#A0A0C0',
        'text-muted': '#505070',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)',       'DM Sans',        'system-ui', 'sans-serif'],
        mono:    ['var(--font-space-mono)',    'Space Mono',     'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
