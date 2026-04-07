'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const partnerLogos = [
  { src: '/assets/partner-logos/alder-hey-white.png', alt: 'Alder Hey Children\'s Hospital' },
  { src: '/assets/partner-logos/sky-logo-white.png', alt: 'Sky' },
  { src: '/assets/partner-logos/british-triathlon-logo.png', alt: 'British Triathlon' },
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !contentRef.current) return

    gsap.from(contentRef.current, {
      y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, {})

  return (
    <section
      id="partners"
      ref={sectionRef}
      aria-labelledby="partners-heading"
      style={{
        background: 'var(--bg-card)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderTop: '3px solid transparent',
        backgroundImage: 'linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <div className="container" ref={contentRef}>
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-accent)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--color-ix-violet)',
          marginBottom: 'var(--space-4)',
        }}>
          For partners &amp; corporates
        </span>

        <h2
          id="partners-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d3)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
            maxWidth: 640,
            marginBottom: 'var(--space-6)',
          }}
        >
          Put your brand at the heart of future innovation.
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-body)',
          maxWidth: 600,
          marginBottom: 'var(--space-10)',
        }}>
          Host a Kidovation or Future Labs event. Sponsor a programme. Bring innovation education
          to your clients and workforce. Backed by Accenture Song&apos;s 10-year track record —
          this is credible, tested, and proven.
        </p>

        {/* Partner logos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-10)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
          }}
          aria-label="Our partners"
        >
          {partnerLogos.map((l) => (
            <div key={l.src} style={{ opacity: 0.65 }}>
              <Image
                src={l.src}
                alt={l.alt}
                width={120}
                height={48}
                style={{ objectFit: 'contain', height: 40, width: 'auto' }}
              />
            </div>
          ))}
        </div>

        <a
          href="#contact"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 'var(--btn-min-height)', padding: 'var(--btn-primary-padding)',
            background: 'linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%)',
            color: 'white',
            fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
            fontSize: 'var(--text-sm)', textDecoration: 'none',
            borderRadius: 'var(--btn-primary-radius)',
          }}
        >
          Let&apos;s talk
        </a>
      </div>
    </section>
  )
}
