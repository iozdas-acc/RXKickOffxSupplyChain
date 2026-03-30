'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2015', event: 'Founded by Fiona Russell, Accenture Song UK' },
  { year: '2016', event: 'First Kidovation hackathon' },
  { year: '2017', event: 'Expanded to second market' },
  { year: '2018', event: '500th young innovator milestone' },
  { year: '2019', event: 'Dubai Expo invitation' },
  { year: '2020', event: 'Virtual pivot — lockdown didn\'t stop us' },
  { year: '2021', event: 'Seaworld challenge series' },
  { year: '2022', event: '10 markets reached' },
  { year: '2023', event: 'Future Labs launches' },
  { year: '2024', event: '3,000+ young people milestone' },
  { year: '2025', event: '10-year anniversary, 12 markets' },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !nodesRef.current) return

    const nodes = nodesRef.current.querySelectorAll<HTMLElement>('[data-node]')
    gsap.from(nodes, {
      opacity: 0, y: 12, duration: 0.4, stagger: 0.06, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      style={{
        background: 'var(--bg-surface)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderTop: '1px solid var(--color-navy-border)',
      }}
    >
      <div className="container">
        <h2
          id="timeline-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d2)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-16)',
          }}
        >
          10 years. One direction.
        </h2>

        {/* Timeline track */}
        <div
          style={{ position: 'relative', overflowX: 'auto', paddingBottom: 'var(--space-4)' }}
        >
          {/* Horizontal line */}
          <div style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            height: 1,
            background: 'var(--color-navy-border)',
          }} aria-hidden="true" />

          <div
            ref={nodesRef}
            style={{
              display: 'flex',
              gap: 'clamp(32px, 4vw, 64px)',
              paddingTop: 4,
              minWidth: 'max-content',
            }}
          >
            {milestones.map((m, i) => (
              <div
                key={m.year}
                data-node
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  maxWidth: 100,
                }}
              >
                {/* Node dot */}
                <div style={{
                  width: 12, height: 12,
                  borderRadius: '50%',
                  background: i === milestones.length - 1
                    ? 'var(--color-kido-green)'
                    : 'var(--color-navy-border)',
                  border: i === milestones.length - 1
                    ? '0'
                    : '2px solid var(--color-kido-green)',
                  flexShrink: 0,
                  marginTop: 4,
                  boxShadow: i === milestones.length - 1 ? 'var(--glow-green)' : 'none',
                }} aria-hidden="true" />

                {/* Year */}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-display)',
                  fontSize: 'var(--text-sm)',
                  color: i === milestones.length - 1 ? 'var(--color-kido-green)' : 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}>
                  {m.year}
                </span>

                {/* Event */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  textAlign: 'center',
                }}>
                  {m.event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
