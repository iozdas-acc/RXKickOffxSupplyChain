const navLinks = [
  { label: 'What We Do', href: '#what-is-ix' },
  { label: 'About Us', href: '/about' },
  { label: 'Get Involved', href: '/work-with-us' },
]

const brandLinks = [
  { label: 'Kidovation', href: '/kidovation' },
  { label: 'Future Labs', href: '/future-labs' },
]

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--color-navy-border)',
        padding: 'var(--space-16) var(--section-padding-x)',
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-12 items-start"
        style={{ maxWidth: 'var(--content-max-width)' }}
      >
        {/* Brand */}
        <div>
          <p
            className="font-display font-extrabold mb-4"
            style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Innovation X
          </p>
          <p className="text-sm max-w-[280px]" style={{ color: 'var(--color-muted)', lineHeight: 'var(--leading-body)' }}>
            Empowering young people to grow into confident, creative thinkers since 2015.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-xs font-semibold uppercase mb-4" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
            Navigate
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub-brands */}
        <div>
          <p className="text-xs font-semibold uppercase mb-4" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
            Programmes
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {brandLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div
        className="mx-auto mt-12 pt-6"
        style={{ maxWidth: 'var(--content-max-width)', borderTop: '1px solid var(--color-navy-border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Accenture Song © 2025 · Innovation X
        </p>
      </div>
    </footer>
  )
}
