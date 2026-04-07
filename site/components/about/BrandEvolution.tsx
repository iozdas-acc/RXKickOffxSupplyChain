'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const logos = [
  {
    year: '2015',
    src: '/assets/logos/kidovaition-2025/rgb-digital/KidovAItion_Plain_White.svg',
    alt: 'Original Kidovation wordmark, 2015',
    label: 'Original mark',
  },
  {
    year: '2019',
    src: '/assets/logos/kidovaition-2025/rgb-digital/KidovAItion_Full_White.svg',
    alt: 'Kidovation logo with alien, 2019',
    label: 'Alien introduced',
  },
  {
    year: '2023',
    src: '/assets/logos/kidovaition-2025/rgb-digital/KidovAItion_Song_White.svg',
    alt: 'Kidovation with Accenture Song mark, 2023',
    label: 'Song partnership',
  },
  {
    year: '2025',
    src: '/assets/logos/kidovaition-2025/rgb-digital/KidovAItion_AI.svg',
    alt: 'KidovAItion logo 2025 — current',
    label: '10-year edition',
  },
]

export default function BrandEvolution() {
  const sectionRef = useRef<HTMLElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !logosRef.current) return

    const items = logosRef.current.querySelectorAll<HTMLElement>('[data-logo]')
    gsap.from(items, {
      opacity: 0, x: -20, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, {})

  return (
    <section
      ref={sectionRef}
      aria-labelledby="brand-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderTop: '1px solid var(--color-navy-border)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 'var(--space-16)' }}>
          <h2
            id="brand-heading"
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
            A brand that grew with us.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
          }}>
            From hand-drawn sketches in 2015 to a full design system in 2025 — the alien has
            always been at the centre. What changed was everything around it.
          </p>
        </div>

        <div
          ref={logosRef}
          style={{
            display: 'flex',
            gap: 'var(--space-12)',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {logos.map((l, i) => (
            <div
              key={l.year}
              data-logo
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-4)',
                opacity: 0.6 + (i / logos.length) * 0.4,
              }}
            >
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-navy-border)',
                padding: 'var(--space-6)',
                width: 160,
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={120}
                  height={60}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-display)',
                  fontSize: 'var(--text-sm)',
                  color: i === logos.length - 1 ? 'var(--color-kido-green)' : 'var(--text-primary)',
                }}>
                  {l.year}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  {l.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
