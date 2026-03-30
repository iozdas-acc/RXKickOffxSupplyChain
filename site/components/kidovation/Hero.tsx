'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

export default function KidovationHero() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()
    tl.from(labelRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out' })
      .from(h1Ref.current, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.35)
      .from(ctasRef.current?.children ?? [], { y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 0.55)

    return () => { tl.kill() }
  }, [])

  const eventPhotos = [
    '20250411_161421.jpg',
    'IMG_20180630_120231.jpg',
  ]

  return (
    <section
      aria-labelledby="kido-hero-heading"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 'var(--nav-height)',
        paddingBottom: 'var(--space-24)',
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <Image
        src="/assets/event-photos/20250411_161421.jpg"
        alt="Kids collaborating at a Kidovation hackathon"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom right, rgba(8,12,24,0.92) 0%, rgba(8,12,24,0.55) 100%)',
        }}
      />

      {/* Alien — right side desktop */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: '4%', bottom: 0, zIndex: 2,
          width: 'min(380px, 35vw)',
          animation: 'alien-float 4s ease-in-out infinite',
        }}
      >
        <Image
          src="/assets/illustrations/aliens/original/Green alien.svg"
          alt=""
          width={380}
          height={480}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 3, maxWidth: '680px' }}
      >
        <span
          ref={labelRef}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-accent)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-kido-green)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Kidovation
        </span>

        <h1
          id="kido-hero-heading"
          ref={h1Ref}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d1)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
          }}
        >
          Hands-on innovation{' '}
          <mark style={{ background: 'none', color: 'var(--color-kido-green)' }}>
            for curious kids.
          </mark>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            maxWidth: 540,
            marginTop: 'var(--space-6)',
          }}
        >
          Kidovation is a hands-on hackathon programme for ages 8–16 — where kids tackle
          real challenges, build real things, and discover what they&apos;re capable of.
        </p>

        <div
          ref={ctasRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-10)' }}
        >
          <Link href="/work-with-us" style={primaryBtn}>Register your child</Link>
          <Link href="/work-with-us" style={secondaryBtn}>Run it at your school</Link>
        </div>
      </div>

      <style>{`
        @keyframes alien-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @media (max-width: 767px) {
          [data-alien-hide] { display: none; }
        }
      `}</style>
    </section>
  )
}

const primaryBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 'var(--btn-min-height)', minWidth: 120,
  padding: 'var(--btn-primary-padding)',
  background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
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
