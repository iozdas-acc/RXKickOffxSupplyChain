'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import gsap from 'gsap'

export default function FutureLabsHero() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()
    tl.from(labelRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out' })
      .from(line1Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
      .from(line2Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.25)
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.45)
      .from(ctasRef.current?.children ?? [], { y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.6)
  }, {})

  return (
    <section
      aria-labelledby="fl-hero-heading"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        paddingTop: 'var(--nav-height)',
        background: 'var(--bg-page)',
        overflow: 'hidden',
      }}
      className="fl-hero"
    >
      {/* Circuit grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(42,53,84,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,53,84,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Orange radial glow — right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 75% 50%, rgba(255,107,53,0.08), transparent)',
        }}
      />

      {/* Left — copy */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center',
          padding: 'var(--section-padding-x)',
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <span
            ref={labelRef}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-fl-orange)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Future Labs
          </span>

          <h1
            id="fl-hero-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d1)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}
          >
            <span ref={line1Ref} style={{ display: 'block' }}>Advanced</span>
            <span ref={line2Ref} style={{ display: 'block' }}>
              innovation{' '}
              <mark style={{ background: 'none', color: 'var(--color-fl-orange)' }}>
                for what&apos;s next.
              </mark>
            </span>
          </h1>

          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 520,
              marginTop: 'var(--space-6)',
            }}
          >
            Future Labs is where Kidovation graduates and 16+ innovators go deeper — into
            AI, product design, R&amp;D, and the future of work.
          </p>

          <div
            ref={ctasRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-10)' }}
          >
            <Link href="/work-with-us" style={orangePrimaryBtn}>Apply to Future Labs</Link>
            <Link href="/work-with-us" style={secondaryBtn}>For schools &amp; colleges</Link>
          </div>
        </div>
      </div>

      {/* Right — rocket illustration */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        className="fl-hero-illo"
      >
        <div style={{ width: 'min(340px, 80%)', animation: 'fl-float 5s ease-in-out infinite' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/illustrations/space/rocket.svg"
            alt=""
            aria-hidden="true"
            width={340}
            height={400}
            style={{
              width: '100%', height: 'auto',
              filter: 'drop-shadow(0 0 32px rgba(255,107,53,0.25))',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fl-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @media (max-width: 1023px) {
          .fl-hero { grid-template-columns: 1fr !important; }
          .fl-hero-illo { min-height: 280px; padding-top: var(--nav-height); }
        }
        @media (max-width: 767px) {
          .fl-hero-illo { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const orangePrimaryBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 'var(--btn-min-height)', minWidth: 120,
  padding: 'var(--btn-primary-padding)',
  background: 'var(--color-fl-orange)', color: 'var(--color-midnight)',
  fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
  fontSize: 'var(--text-sm)', textDecoration: 'none',
  borderRadius: 'var(--btn-primary-radius)',
}

const secondaryBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 'var(--btn-min-height)', minWidth: 120,
  padding: 'var(--btn-primary-padding)',
  background: 'transparent', color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
  fontSize: 'var(--text-sm)', textDecoration: 'none',
  border: '1px solid var(--btn-secondary-border)',
  borderRadius: 'var(--btn-primary-radius)',
}
