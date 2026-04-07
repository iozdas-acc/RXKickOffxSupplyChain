'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function WhatIsIX() {
  const textRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(textRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        once: true,
      },
    })
    gsap.from(diagramRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: diagramRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, {})

  return (
    <section
      aria-labelledby="ix-heading"
      className="section"
    >
      <div className="container ix-grid">
        {/* Copy — left on desktop */}
        <div
          ref={textRef}
        >
          <h2
            id="ix-heading"
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
            One ecosystem.<br />Two programmes.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
            }}
          >
            Founded by Accenture Song in 2015, Innovation X has spent a decade
            delivering real innovation education to young people across the world.
            Kidovation brings hackathon energy and creative problem-solving to kids.
            Future Labs takes it further — a deeper programme for young people ready
            for the next challenge. Both are built on the same belief: young people
            are the most capable innovators in the room.
          </p>
        </div>

        {/* Ecosystem diagram */}
        <div
          ref={diagramRef}
          role="img"
          aria-label="Innovation X ecosystem: Kidovation and Future Labs"
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-10)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-navy-border)',
          }}
        >
          {/* IX mark at top */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-primary)',
                letterSpacing: 'var(--tracking-display)',
              }}
            >
              Innovation<span style={{ color: 'var(--color-kido-green)' }}>X</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginTop: 'var(--space-1)',
              }}
            >
              The parent ecosystem
            </div>
          </div>

          {/* Connector lines */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            <svg
              width="200"
              height="32"
              viewBox="0 0 200 32"
              fill="none"
              aria-hidden="true"
            >
              <line x1="100" y1="0" x2="100" y2="16" stroke="var(--color-navy-border)" strokeWidth="1" />
              <line x1="30" y1="16" x2="170" y2="16" stroke="var(--color-navy-border)" strokeWidth="1" />
              <line x1="30" y1="16" x2="30" y2="32" stroke="var(--color-navy-border)" strokeWidth="1" />
              <line x1="170" y1="16" x2="170" y2="32" stroke="var(--color-navy-border)" strokeWidth="1" />
            </svg>
          </div>

          {/* Two nodes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {/* Kidovation node */}
            <div
              style={{
                background: 'var(--bg-page)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-kido-green)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-kido-green)',
                  margin: '0 auto var(--space-3)',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-title)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Kidovation
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Kids · Hackathons
              </div>
            </div>

            {/* Future Labs node */}
            <div
              style={{
                background: 'var(--bg-page)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-fl-orange)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-fl-orange)',
                  margin: '0 auto var(--space-3)',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-title)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Future Labs
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Teens · Advanced
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
