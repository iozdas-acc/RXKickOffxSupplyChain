'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ComingSoon() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !boxRef.current) return

    gsap.from(boxRef.current, {
      y: 32, opacity: 0, duration: 0.7, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: boxRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <section
      aria-labelledby="fl-coming-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: 'var(--content-narrow-width)' }}>
        <div ref={boxRef}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-accent)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-fl-amber)',
            border: '1px solid rgba(255,184,48,0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '5px 14px',
            marginBottom: 'var(--space-6)',
          }}>
            In development
          </span>

          <h2
            id="fl-coming-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
            }}
          >
            More from Future Labs coming soon.
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            maxWidth: 560,
            margin: '0 auto var(--space-10)',
          }}>
            We&apos;re building out the Future Labs programme for 2025–2026. If you&apos;re a
            school, college, or corporate partner interested in getting involved early — we&apos;d
            love to hear from you.
          </p>

          <Link
            href="/work-with-us"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 'var(--btn-min-height)', padding: 'var(--btn-primary-padding)',
              background: 'var(--color-fl-orange)', color: 'var(--color-midnight)',
              fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
              fontSize: 'var(--text-sm)', textDecoration: 'none',
              borderRadius: 'var(--btn-primary-radius)',
            }}
          >
            Get in touch early
          </Link>
        </div>
      </div>
    </section>
  )
}
