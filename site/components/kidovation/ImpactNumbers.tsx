'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stats = [
  { value: 10,    suffix: '',   label: 'Years running' },
  { value: 12,    suffix: '',   label: 'Markets worldwide' },
  { value: 3111,  suffix: '+',  label: 'Young innovators' },
  { value: 115,   suffix: '',   label: 'Classrooms reached' },
]

export default function KidoImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null)
  const valRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    stats.forEach((s, i) => {
      const el = valRefs.current[i]
      if (!el) return

      if (prefersReduced) {
        el.textContent = s.value.toLocaleString() + s.suffix
        return
      }

      const counter = { val: 0 }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: s.value,
            duration: 1.2,
            ease: 'power2.out',
            delay: i * 0.1,
            onUpdate: () => {
              if (el) el.textContent = Math.round(counter.val).toLocaleString() + s.suffix
            },
          })
        },
      })
    })
  }, {})

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kido-impact-heading"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--color-navy-border)',
        borderBottom: '1px solid var(--color-navy-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ocean motif — starfish-1, top-right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/illustrations/seaworld/starfish-1.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          right: '2%',
          width: 100,
          opacity: 0.20,
          transform: 'rotate(-20deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ocean motif — seahorse-2, bottom-left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/illustrations/seaworld/seahorse-2.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '1%',
          width: 80,
          opacity: 0.22,
          transform: 'rotate(8deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ paddingBlock: 'var(--space-12)', position: 'relative', zIndex: 1 }}>
        <h2
          id="kido-impact-heading"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-accent)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-kido-green)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)',
          }}
        >
          Kidovation by the numbers
        </h2>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d2)',
                lineHeight: 1,
                color: 'var(--text-primary)',
                letterSpacing: 'var(--tracking-display)',
              }}>
                <span ref={el => { valRefs.current[i] = el }}>
                  {s.value.toLocaleString()}{s.suffix}
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-accent)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginTop: 'var(--space-2)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
