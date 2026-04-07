'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !nodesRef.current) return

    const nodes = nodesRef.current.querySelectorAll<HTMLElement>('[data-node]')
    gsap.from(nodes, {
      opacity: 0, y: 12, duration: 0.4, stagger: 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, {})

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
          style={{ position: 'relative', paddingBottom: 'var(--space-4)' }}
          className="timeline-track"
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
            className="timeline-nodes"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(11, 1fr)',
              paddingTop: 4,
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
                  gap: 'var(--space-3)',
                  padding: '0 4px',
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
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  color: i === milestones.length - 1 ? 'var(--color-kido-green)' : 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}>
                  {m.year}
                </span>

                {/* Event */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(9px, 0.8vw, 11px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.35,
                  textAlign: 'center',
                }}>
                  {m.event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .timeline-track { overflow-x: auto; }
          .timeline-nodes {
            display: flex !important;
            gap: 32px !important;
            min-width: max-content;
          }
          .timeline-nodes > * { min-width: 80px; }
        }
      `}</style>
    </section>
  )
}
