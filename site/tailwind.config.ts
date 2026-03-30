import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Map CSS variables → Tailwind so both approaches work
      colors: {
        midnight:    'var(--color-midnight)',
        navy:        'var(--color-navy)',
        'navy-mid':  'var(--color-navy-mid)',
        'navy-border': 'var(--color-navy-border)',
        'kido-green': 'var(--color-kido-green)',
        'kido-teal':  'var(--color-kido-teal)',
        'fl-orange':  'var(--color-fl-orange)',
        'fl-amber':   'var(--color-fl-amber)',
        'ix-purple':  'var(--color-ix-purple)',
        'ix-violet':  'var(--color-ix-violet)',
        yellow:       'var(--color-yellow)',
        white:        'var(--color-white)',
        muted:        'var(--color-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        accent:  ['var(--font-accent)'],
      },
      maxWidth: {
        content: 'var(--content-max-width)',
        narrow:  'var(--content-narrow-width)',
      },
      height: {
        nav: 'var(--nav-height)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
    },
  },
  plugins: [],
}

export default config
