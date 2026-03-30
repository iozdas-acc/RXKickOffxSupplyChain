'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Materials() {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !panelRef.current) return

    gsap.from(panelRef.current, {
      y: 32, opacity: 0, duration: 0.7, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: panelRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <section
      aria-labelledby="materials-heading"
      style={{ background: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        <div
          ref={panelRef}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'clamp(32px, 5vw, 64px)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'var(--space-16)',
            alignItems: 'center',
            border: '1px solid var(--color-navy-border)',
          }}
          className="materials-panel"
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
              For teachers and schools
            </span>

            <h2
              id="materials-heading"
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
              <span style={{ color: 'var(--color-kido-green)' }}>Nothing extra.</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 540,
              marginBottom: 'var(--space-8)',
            }}>
              Step-by-step lesson plans, age-appropriate challenges, minimal prep time.
              Tested in 115 classrooms across 12 markets. You can run it — we&apos;ve made sure.
            </p>

            <Link
              href="/work-with-us"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 'var(--btn-min-height)', padding: 'var(--btn-primary-padding)',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
                fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)', textDecoration: 'none',
                borderRadius: 'var(--btn-primary-radius)',
              }}
            >
              Get the materials
            </Link>
          </div>

          {/* Illustration */}
          <div style={{ width: 160, flexShrink: 0 }} aria-hidden="true" className="materials-illo">
            <Image
              src="/assets/illustrations/space/rocket.svg"
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
          .materials-panel { grid-template-columns: 1fr !important; }
          .materials-illo { display: none; }
        }
      `}</style>
    </section>
  )
}
