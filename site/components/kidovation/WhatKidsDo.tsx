'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activities = [
  {
    icon: '⚡',
    title: 'Hackathon challenges',
    body: 'Teams race to solve real-world problems in hours — not weeks. Time pressure is the point.',
  },
  {
    icon: '💡',
    title: 'Design thinking',
    body: 'Empathy, ideation, prototyping — the full loop. No wrong answers in the diverge phase.',
  },
  {
    icon: '🤖',
    title: 'AI & technology',
    body: 'Hands-on with age-appropriate AI tools. Demystifying technology by using it.',
  },
  {
    icon: '🧱',
    title: 'Lego & physical making',
    body: 'Build the idea, not just pitch it. Physical prototyping anchors abstract thinking.',
  },
  {
    icon: '🚀',
    title: 'Entrepreneurship',
    body: 'Business model thinking, pitching to a real panel. Real feedback, not participation trophies.',
  },
  {
    icon: '🤝',
    title: 'Teamwork & leadership',
    body: 'Cross-school, cross-age collaboration. The skills employers actually want.',
  },
]

export default function WhatKidsDo() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll<HTMLElement>('[data-card]')
    gsap.from(cards, {
      y: 24, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-kids-do-heading"
      style={{ background: 'var(--bg-surface)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 14px',
              background: 'rgba(126, 200, 58, 0.12)',
              border: '1px solid rgba(126, 200, 58, 0.3)',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase' as const,
              color: 'var(--color-kido-green)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Ages 8–16
          </div>

          <h2
            id="what-kids-do-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
              maxWidth: 640,
            }}
          >
            What kids actually do.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            marginTop: 'var(--space-4)',
            maxWidth: 560,
          }}>
            Not classroom theory. Not worksheets. Hands-on, high-energy, real-problem-solving.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
          }}
          className="activity-grid"
        >
          {activities.map((a) => (
            <div
              key={a.title}
              data-card
              style={{
                background: 'var(--card-bg)',
                border: 'var(--card-border)',
                borderRadius: 'var(--card-radius)',
                padding: 'var(--card-padding)',
                transition: 'border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--color-kido-green)'
                el.style.boxShadow = 'var(--glow-green)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = ''
                el.style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 'var(--space-4)', lineHeight: 1 }} aria-hidden="true">
                {a.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-title)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-3)',
              }}>
                {a.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-body)',
              }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .activity-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 599px)  { .activity-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
