'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const programmes = [
  {
    num: '01',
    title: 'Innovation Labs',
    body: 'Full-day immersive workshops where teams tackle a challenge from brief to prototype.',
  },
  {
    num: '02',
    title: 'Kidovation Week Challenge',
    body: 'A week-long programme running across an entire school — cross-class, cross-age collaboration.',
  },
  {
    num: '03',
    title: 'Entrepreneurship Bootcamps',
    body: 'Business model thinking, financial literacy, pitching — for kids who want to start something.',
  },
  {
    num: '04',
    title: 'STEM Workshops',
    body: 'Science, tech, engineering, and maths made real through hands-on challenges and making.',
  },
  {
    num: '05',
    title: 'School Partnerships',
    body: 'Ongoing relationship — not one-off events. We embed Kidovation into the school calendar.',
  },
]

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>('[data-prog]')
    gsap.from(cards, {
      y: 24, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="programs-heading"
      style={{ background: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            id="programs-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}
          >
            Five ways to get involved.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            marginTop: 'var(--space-4)',
            maxWidth: 520,
          }}>
            Whether you&apos;re a school, a parent, or a corporate partner — there&apos;s a programme built for you.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
          }}
          className="prog-grid"
        >
          {programmes.map((p) => (
            <div
              key={p.num}
              data-prog
              style={{
                position: 'relative',
                background: 'var(--card-bg)',
                border: 'var(--card-border)',
                borderRadius: 'var(--card-radius)',
                padding: 'var(--card-padding)',
                borderLeft: '3px solid var(--color-kido-green)',
                transition: 'box-shadow var(--duration-base) var(--ease-out)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-green)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d3)',
                color: 'rgba(126, 200, 58, 0.25)',
                lineHeight: 1,
                marginBottom: 'var(--space-4)',
                userSelect: 'none',
              }} aria-hidden="true">
                {p.num}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-title)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-3)',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-body)',
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .prog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 599px)  {
          .prog-grid {
            display: flex !important;
            overflow-x: auto;
            gap: var(--space-4) !important;
            padding-bottom: var(--space-4);
            scroll-snap-type: x mandatory;
          }
          .prog-grid > * { min-width: 280px; scroll-snap-align: start; flex-shrink: 0; }
        }
      `}</style>
    </section>
  )
}
