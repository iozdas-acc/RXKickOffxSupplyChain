'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, FlaskConical, Layers, Users } from 'lucide-react'

const activities = [
  {
    title: 'AI & machine learning',
    body: 'Build and test real AI models — not as a black box, but as a tool you control. Understand what\'s behind the interface.',
    Icon: Bot,
  },
  {
    title: 'R&D challenges',
    body: 'Take a real research question and prototype a working solution. The brief is ambiguous. That\'s the point.',
    Icon: FlaskConical,
  },
  {
    title: 'Product design sprint',
    body: 'Go from problem to wireframe to pitch in 24 hours. Fast. Forced decisions. Real feedback from real people.',
    Icon: Layers,
  },
  {
    title: 'Human-centred innovation',
    body: 'Design for real communities — not hypothetical users. Ethnographic research, co-design, field testing.',
    Icon: Users,
  },
]

export default function WhatYouDo() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>('[data-card]')
    gsap.from(cards, {
      y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, {})

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fl-what-heading"
      style={{ background: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            id="fl-what-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}
          >
            What you&apos;ll actually do.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            marginTop: 'var(--space-4)',
            maxWidth: 520,
          }}>
            Not lectures. Not presentations. The kind of work that makes you think you&apos;re
            not studying — and then you realise you&apos;ve learned something.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--grid-gap)' }}
          className="fl-what-grid"
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
                borderTop: '3px solid var(--color-fl-orange)',
                transition: 'box-shadow var(--duration-base) var(--ease-out), border-color var(--duration-base)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 24px rgba(255,107,53,0.2)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              <div style={{
                marginBottom: 'var(--space-4)',
                lineHeight: 1,
              }} aria-hidden="true">
                <a.Icon size={28} color="var(--color-fl-orange)" strokeWidth={1.5} />
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
        @media (max-width: 767px) { .fl-what-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
