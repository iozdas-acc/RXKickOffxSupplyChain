'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Mission() {
  const quoteMarkRef = useRef<HTMLSpanElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(quoteMarkRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 75%',
        once: true,
      },
    })
    gsap.from(quoteRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, {})

  return (
    <section
      aria-labelledby="mission-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/events/event-2025-01.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,12,24,0.85) 0%, rgba(8,12,24,0.97) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="section"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 'var(--content-narrow-width)',
          margin: '0 auto',
          padding: 'var(--section-padding-y) var(--section-padding-x)',
        }}
      >
        {/* Quotation mark */}
        <span
          ref={quoteMarkRef}
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '96px',
            color: 'var(--color-kido-green)',
            lineHeight: 1,
            display: 'block',
            marginBottom: '-24px',
          }}
        >
          "
        </span>

        <div ref={quoteRef}>
          <h2
            id="mission-heading"
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
            Empower young people to grow into confident, creative thinkers who dare
            to imagine and innovate for a better world.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            Our vision — 10 years and counting.
          </p>
        </div>
      </div>
    </section>
  )
}
