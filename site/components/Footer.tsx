import Link from 'next/link'

const footerLinks = [
  { href: '/about',        label: 'About' },
  { href: '/kidovation',   label: 'Kidovation' },
  { href: '/future-labs',  label: 'Future Labs' },
  { href: '/work-with-us', label: 'Work With Us' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--color-navy-border)',
        padding: 'var(--space-12) 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-8)',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: 'var(--tracking-display)',
          }}
        >
          Innovation<span style={{ color: 'var(--color-kido-green)' }}>X</span>
        </Link>

        {/* Footer nav */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--space-6)',
              listStyle: 'none',
            }}
          >
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color var(--duration-base) var(--ease-out)',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Credits */}
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-ui)',
          }}
        >
          © {new Date().getFullYear()} Innovation X. An{' '}
          <a
            href="https://www.accenture.com/gb-en/services/song/index"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}
          >
            Accenture Song
          </a>{' '}
          initiative.
        </p>
      </div>
    </footer>
  )
}
