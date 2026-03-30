'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'No prep time required',
  'Runs in a single school day',
  'Works for ages 8–16',
]

export default function Schools() {
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
      id="schools"
      ref={sectionRef}
      aria-labelledby="schools-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderLeft: '4px solid var(--color-kido-green)',
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
          className="schools-grid"
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
              color: 'var(--color-kido-green)',
              marginBottom: 'var(--space-4)',
            }}>
              For schools
            </span>

            <h2
              id="schools-heading"
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
              Everything you need.{' '}
              <span style={{ color: 'var(--color-kido-green)' }}>Already prepared.</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 560,
              marginBottom: 'var(--space-8)',
            }}>
              Ready-to-use lesson plans, age-appropriate challenges, step-by-step guidance, and
              full support from the Kidovation team. Tested in 115 classrooms across 12 markets.
            </p>

            <ul
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-10)' }}
              aria-label="What's included"
            >
              {features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" stroke="var(--color-kido-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

            <Link
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 'var(--btn-min-height)', padding: 'var(--btn-primary-padding)',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
                fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)', textDecoration: 'none',
                borderRadius: 'var(--btn-primary-radius)',
              }}
            >
              Partner with us
            </Link>
          </div>

          {/* Illustration */}
          <div style={{ width: 200, flexShrink: 0 }} className="schools-illo" aria-hidden="true">
            <Image
              src="/assets/illustrations/aliens/original/Green alien.svg"
              alt=""
              width={200}
              height={260}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .schools-grid { grid-template-columns: 1fr !important; }
          .schools-illo { display: none; }
        }
      `}</style>
    </section>
  )
}
