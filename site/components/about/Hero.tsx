'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function AboutHero() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()
    tl.from(labelRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out' })
      .from(line1Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
      .from(line2Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.25)
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.45)

    return () => { tl.kill() }
  }, [])

  return (
    <section
      aria-labelledby="about-hero-heading"
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - var(--nav-height))',
        paddingTop: 'calc(var(--nav-height) + var(--space-24))',
        paddingBottom: 'var(--space-24)',
        background: 'var(--bg-page)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(42,53,84,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* IX gradient left border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 4,
          background: 'linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%)',
          zIndex: 1,
        }}
      />

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
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Est. 2015
        </span>

        <h1
          id="about-hero-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d1)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
          }}
        >
          <span ref={line1Ref} style={{ display: 'block' }}>Ten years of</span>
          <span
            ref={line2Ref}
            style={{ display: 'block', color: 'var(--color-ix-violet)' }}
          >
            real innovation.
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            maxWidth: 600,
            marginTop: 'var(--space-8)',
          }}
        >
          Innovation X was founded inside Accenture Song in 2015 on a single belief — that
          young people are the world&apos;s most underutilised innovators. A decade, 12 markets,
          and 3,111 young people later, we&apos;re still proving it.
        </p>
      </div>
    </section>
  )
}
