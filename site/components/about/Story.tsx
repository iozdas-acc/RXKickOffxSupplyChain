'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    num: '01',
    title: 'Learning by doing',
    body: 'Every session is hands-on. No worksheets. No slideshows. If you can\'t touch it, make it, or break it — it\'s not Kidovation.',
  },
  {
    num: '02',
    title: 'Believe in every kid',
    body: 'Age, background, and school don\'t determine potential. We just provide the spark. The rest comes from the kids.',
  },
  {
    num: '03',
    title: 'Build what lasts',
    body: 'Programmes designed to outlive any single event, any single year. The system is the product.',
  },
]

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(textRef.current, {
      y: 32, opacity: 0, duration: 0.8, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    if (valuesRef.current) {
      const items = valuesRef.current.querySelectorAll<HTMLElement>('[data-value]')
      gsap.from(items, {
        y: 24, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-heading"
      style={{ background: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-16)' }}
          className="story-grid"
        >
          {/* Narrative */}
          <div ref={textRef} className="story-text">
            <h2
              id="story-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d2)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-8)',
              }}
            >
              Where it started.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-primary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 680,
              marginBottom: 'var(--space-6)',
            }}>
              Founded in 2015 by Fiona Russell inside Accenture Song, Innovation X started with a
              single belief: that young people are the world&apos;s most underutilised innovators.
              Over 10 years, 12 markets, and 3,111 young people later — we know that belief was right.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 680,
            }}>
              What started as a single hackathon in the UK has grown into a multi-programme
              ecosystem spanning Kidovation (ages 8–16) and Future Labs (16+), operating across
              12 markets and backed by Accenture Song&apos;s full resources.
            </p>
          </div>

          {/* Values */}
          <div ref={valuesRef} className="values-section">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d2)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-10)',
              }}
            >
              What we believe.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {values.map((v) => (
                <div
                  key={v.num}
                  data-value
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: 'var(--space-6)',
                    alignItems: 'start',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--weight-display)',
                    fontSize: 'var(--text-d3)',
                    color: 'rgba(126, 200, 58, 0.2)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }} aria-hidden="true">
                    {v.num}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--weight-display)',
                      fontSize: 'var(--text-d3)',
                      color: 'var(--text-primary)',
                      lineHeight: 'var(--leading-display)',
                      marginBottom: 'var(--space-3)',
                    }}>
                      {v.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-md)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-body)',
                    }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
