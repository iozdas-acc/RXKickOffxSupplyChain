'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from([missionRef.current, visionRef.current], {
      y: 32, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fl-mission-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
    >
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)' }}
          className="mv-grid"
        >
          {/* Mission */}
          <div
            ref={missionRef}
            style={{
              borderLeft: '4px solid var(--color-fl-orange)',
              paddingLeft: 'var(--space-8)',
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-fl-orange)',
              marginBottom: 'var(--space-6)',
            }}>
              Mission
            </span>
            <h2
              id="fl-mission-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d3)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
              }}
            >
              Equip young people for the future of work — not with theory, but with real
              skills, real tools, real problems.
            </h2>
          </div>

          {/* Vision */}
          <div
            ref={visionRef}
            style={{
              borderLeft: '4px solid var(--color-fl-amber)',
              paddingLeft: 'var(--space-8)',
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-fl-amber)',
              marginBottom: 'var(--space-6)',
            }}>
              Vision
            </span>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d3)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}>
              A generation that doesn&apos;t just use technology — that creates it.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .mv-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; } }
      `}</style>
    </section>
  )
}
