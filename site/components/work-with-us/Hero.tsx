'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function WorkHero() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()
    tl.from(labelRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out' })
      .from(h1Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.35)
      .from(tabsRef.current?.children ?? [], { y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.55)
  }, {})

  return (
    <section
      aria-labelledby="work-hero-heading"
      style={{
        position: 'relative',
        minHeight: '60dvh',
        paddingTop: 'calc(var(--nav-height) + var(--space-20))',
        paddingBottom: 'var(--space-20)',
        background: 'var(--bg-page)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dot-grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(42,53,84,0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* IX gradient left border */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 4,
        background: 'linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%)',
        zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span
          ref={labelRef}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-accent)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-ix-violet)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Work With Us
        </span>

        <h1
          id="work-hero-heading"
          ref={h1Ref}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d2)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
          }}
        >
          Let&apos;s build something{' '}
          <mark style={{ background: 'none', color: 'var(--color-ix-violet)' }}>together.</mark>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            maxWidth: 580,
            marginTop: 'var(--space-6)',
          }}
        >
          We work with schools, corporate partners, and families. Find your path below.
        </p>

        {/* Audience anchor tabs */}
        <div
          ref={tabsRef}
          style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-10)' }}
        >
          {[
            { label: 'Schools', href: '#schools', color: 'var(--color-kido-green)' },
            { label: 'Partners', href: '#partners', color: 'var(--color-ix-violet)' },
            { label: 'Parents', href: '#parents', color: 'var(--color-kido-teal)' },
          ].map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              style={{
                display: 'inline-flex', alignItems: 'center',
                height: 40, padding: '0 20px',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)',
                textDecoration: 'none',
                color: color,
                border: `1px solid ${color}`,
                borderRadius: 'var(--radius-full)',
                transition: 'background var(--duration-base) var(--ease-out)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}22`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = ''
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
