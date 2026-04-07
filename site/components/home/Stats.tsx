'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { value: 10, suffix: '', unit: 'years', label: 'Of innovation education' },
  { value: 12, suffix: '', unit: 'markets', label: 'Across the globe' },
  { value: 3111, suffix: '+', unit: 'young people', label: 'Reached' },
  { value: 115, suffix: '', unit: 'classrooms', label: 'Activated' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      numberRefs.current.forEach((el, i) => {
        if (el) el.textContent = STATS[i].value.toLocaleString() + STATS[i].suffix
      })
      return
    }

    const counters = STATS.map((s) => ({ value: s.value }))

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        STATS.forEach((stat, i) => {
          gsap.to(counters[i], {
            value: stat.value,
            duration: 1.2,
            delay: i * 0.1,
            ease: 'power2.out',
            onUpdate: () => {
              const el = numberRefs.current[i]
              if (el) {
                el.textContent =
                  Math.round(counters[i].value).toLocaleString() + stat.suffix
              }
            },
          })
        })
      },
    })
  }, {})

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      style={{ background: 'var(--bg-surface)' }}
    >
      <h2 id="stats-heading" className="sr-only">Our impact</h2>

      <div
        className="container"
        style={{ paddingBlock: 'var(--space-12)' }}
      >
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--space-8) var(--space-6)',
                textAlign: 'center',
              }}
            >
              {/* Number row */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-display)',
                  fontSize: 'var(--text-d2)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                <span ref={el => { numberRefs.current[i] = el }}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
              </div>

              {/* Unit word (years / markets) — styled separately, smaller */}
              {stat.unit && (
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--weight-title)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--color-kido-green)',
                    lineHeight: 1,
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {stat.unit}
                </div>
              )}

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
