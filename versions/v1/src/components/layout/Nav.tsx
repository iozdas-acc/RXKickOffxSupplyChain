import { useEffect, useState } from 'react'

const links = [
  { label: 'What We Do', href: '#what-is-ix' },
  { label: 'Our Story',  href: '#mission' },
  { label: 'Get Involved', href: '#footer' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-300"
        style={{
          height: 'var(--nav-height)',
          backgroundColor: scrolled ? 'rgba(8,12,24,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42,53,84,0.5)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="/" className="font-display font-extrabold text-lg tracking-tight text-white">
          Innovation X
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold transition-colors duration-150"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#footer"
          className="hidden md:inline-flex items-center h-12 px-6 rounded-full text-sm font-semibold transition-colors duration-150"
          style={{ backgroundColor: 'var(--accent-kidovation)', color: 'var(--text-inverted)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent-kidovation)')}
        >
          Get involved
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(8,12,24,0.97)', backdropFilter: 'blur(16px)' }}
      >
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-display font-extrabold text-white tracking-tight"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#footer"
          onClick={() => setMenuOpen(false)}
          className="mt-4 inline-flex items-center h-14 px-8 rounded-full text-base font-semibold"
          style={{ backgroundColor: 'var(--accent-kidovation)', color: 'var(--text-inverted)' }}
        >
          Get involved
        </a>
      </div>
    </>
  )
}
