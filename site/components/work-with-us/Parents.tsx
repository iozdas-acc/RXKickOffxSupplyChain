'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'Ages 8–16',
  'No prior experience needed',
  'Full-day hackathon format',
]

export default function Parents() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !contentRef.current) return

    gsap.from(contentRef.current, {
      y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      id="parents"
      ref={sectionRef}
      aria-labelledby="parents-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderLeft: '4px solid var(--color-kido-teal)',
      }}
    >
      <div className="container">
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'var(--space-16)',
            alignItems: 'center',
          }}
          className="parents-grid"
        >
          {/* Copy */}
          <div>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-kido-teal)',
              marginBottom: 'var(--space-4)',
            }}>
              For parents
            </span>

            <h2
              id="parents-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d3)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Get your child into a{' '}
              <span style={{ color: 'var(--color-kido-teal)' }}>Kidovation event.</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 520,
              marginBottom: 'var(--space-8)',
            }}>
              Kidovation events run in schools and community spaces across 12 markets.
              Find one near you — or ask your school to host one.
            </p>

            <ul
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-10)' }}
              aria-label="What to expect"
            >
              {features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" stroke="var(--color-kido-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-md)',
                    color: 'var(--text-primary)',
                  }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 'var(--btn-min-height)', padding: 'var(--btn-primary-padding)',
                background: 'var(--color-kido-teal)', color: 'var(--color-midnight)',
                fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)', textDecoration: 'none',
                borderRadius: 'var(--btn-primary-radius)',
              }}
            >
              Find an event
            </a>
          </div>

          {/* Alien illustration */}
          <div style={{ width: 160, flexShrink: 0 }} className="parents-illo" aria-hidden="true">
            <Image
              src="/assets/illustrations/aliens/original/Blue alien.svg"
              alt=""
              width={160}
              height={200}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .parents-grid { grid-template-columns: 1fr !important; }
          .parents-illo { display: none; }
        }
      `}</style>
    </section>
  )
}
