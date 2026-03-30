'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/about',        label: 'About' },
  { href: '/kidovation',   label: 'Kidovation' },
  { href: '/future-labs',  label: 'Future Labs' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'var(--nav-height)',
          background: 'var(--nav-bg)',
          backdropFilter: 'var(--nav-backdrop)',
          WebkitBackdropFilter: 'var(--nav-backdrop)',
          borderBottom: 'var(--nav-border)',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-xl)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: 'var(--tracking-display)',
              flexShrink: 0,
            }}
          >
            Innovation<span style={{ color: 'var(--color-kido-green)' }}>X</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="nav-desktop">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-8)',
                listStyle: 'none',
              }}
            >
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--weight-accent)',
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-label)',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: pathname === href
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                      transition: 'color var(--duration-base) var(--ease-out)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/work-with-us"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 'var(--btn-min-height)',
                    padding: 'var(--btn-primary-padding)',
                    background: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-text)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--weight-accent)',
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-label)',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 'var(--btn-primary-radius)',
                    transition: 'background var(--duration-base) var(--ease-out)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--btn-primary-hover)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--btn-primary-bg)'
                  }}
                >
                  Work With Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              width: 40,
              height: 40,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              flexShrink: 0,
            }}
          >
            <span style={{
              display: 'block', width: '100%', height: 2,
              background: 'var(--text-primary)',
              borderRadius: 2,
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
              transition: 'transform var(--duration-base)',
            }} />
            <span style={{
              display: 'block', width: '100%', height: 2,
              background: 'var(--text-primary)',
              borderRadius: 2,
              opacity: open ? 0 : 1,
              transition: 'opacity var(--duration-base)',
            }} />
            <span style={{
              display: 'block', width: '100%', height: 2,
              background: 'var(--text-primary)',
              borderRadius: 2,
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
              transition: 'transform var(--duration-base)',
            }} />
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          background: 'var(--color-midnight)',
          borderTop: '1px solid var(--color-navy-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-8) var(--space-6)',
          gap: 'var(--space-2)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform var(--duration-base) var(--ease-out)',
          overflowY: 'auto',
        }}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-title)',
              fontSize: 'var(--text-d3)',
              color: pathname === href ? 'var(--color-kido-green)' : 'var(--text-primary)',
              textDecoration: 'none',
              padding: 'var(--space-4) 0',
              borderBottom: '1px solid var(--color-navy-border)',
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/work-with-us"
          onClick={() => setOpen(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'var(--space-6)',
            minHeight: 'var(--btn-min-height)',
            padding: 'var(--btn-primary-padding)',
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-text)',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--weight-accent)',
            fontSize: 'var(--text-md)',
            textDecoration: 'none',
            borderRadius: 'var(--btn-primary-radius)',
          }}
        >
          Work With Us
        </Link>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
