import type { Config } from 'tailwindcss'

// All color classes resolve to CSS variables registered in app/globals.css.
// Zero hex literals in component files — Phase 1 of the redesign spec (D-DS-003).
// If a new colour is needed, add it to globals.css first, then reference it here.

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Surfaces ──────────────────────────────────────
        'bg-primary':     'var(--color-background-primary)',
        'bg-secondary':   'var(--color-background-secondary)',
        'bg-tertiary':    'var(--color-background-tertiary)',
        'surface':        'var(--color-surface-card)',
        'surface-raised': 'var(--color-surface-raised)',
        // ─── Text ──────────────────────────────────────────
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary':  'var(--color-text-tertiary)',
        'text-muted':     'var(--color-text-muted)',
        'text-inverse':   'var(--color-text-inverse)',
        // ─── Borders ───────────────────────────────────────
        'border-primary':   'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'border-tertiary':  'var(--color-border-tertiary)',
        // ─── Brand (A-MOCK-001 registered tokens) ──────────
        'sainsburys-orange':      'var(--sainsburys-orange)',
        'sainsburys-orange-dark': 'var(--sainsburys-orange-dark)',
        'sainsburys-orange-ink':  'var(--sainsburys-orange-ink)',
        'sainsburys-orange-soft': 'var(--sainsburys-orange-soft)',
        'accenture-purple':       'var(--accenture-purple)',
        'accenture-purple-dark':  'var(--accenture-purple-dark)',
        'accenture-purple-soft':  'var(--accenture-purple-soft)',
        // ─── Horizons (H1/H2/H3 — never repurpose) ─────────
        'horizon-1':      'var(--horizon-1)',
        'horizon-2':      'var(--horizon-2)',
        'horizon-3':      'var(--horizon-3)',
        'horizon-1-soft': 'var(--horizon-1-soft)',
        'horizon-2-soft': 'var(--horizon-2-soft)',
        'horizon-3-soft': 'var(--horizon-3-soft)',
        // ─── Per-chapter accents (D-DS-003) ────────────────
        // Chapters reference these, not the underlying colour,
        // so zone tuning stays centralised.
        'accent-ch1':      'var(--accent-ch1)',
        'accent-ch2':      'var(--accent-ch2)',
        'accent-ch3':      'var(--accent-ch3)',
        'accent-ch4':      'var(--accent-ch4)',
        'accent-ch5':      'var(--accent-ch5)',
        'accent-ch1-soft': 'var(--accent-ch1-soft)',
        'accent-ch2-soft': 'var(--accent-ch2-soft)',
        'accent-ch3-soft': 'var(--accent-ch3-soft)',
        'accent-ch4-soft': 'var(--accent-ch4-soft)',
        'accent-ch5-soft': 'var(--accent-ch5-soft)',
        // ─── Semantic aliases ──────────────────────────────
        'primary':        'var(--color-primary)',
        'primary-hover':  'var(--color-primary-hover)',
        'secondary':      'var(--color-secondary)',
        'accent':         'var(--color-accent)',
        'destructive':    'var(--color-destructive)',
        'ring':           'var(--color-ring)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)',       'DM Sans',        'system-ui', 'sans-serif'],
        mono:    ['var(--font-space-mono)',    'Space Mono',     'monospace'],
      },
      boxShadow: {
        'xs':     'var(--shadow-xs)',
        'sm':     'var(--shadow-sm)',
        'md':     'var(--shadow-md)',
        'lg':     'var(--shadow-lg)',
        'orange': 'var(--shadow-orange)',
        'purple': 'var(--shadow-purple)',
      },
      borderRadius: {
        'sm':   'var(--radius-sm)',
        'md':   'var(--radius-md)',
        'lg':   'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
      transitionTimingFunction: {
        'out':    'var(--ease-out)',
        'spring': 'var(--ease-spring)',
      },
    },
  },
  plugins: [],
}

export default config
