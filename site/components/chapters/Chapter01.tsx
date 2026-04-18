'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'



interface Props { isActive: boolean; onNext: () => void }

export function Chapter01({ isActive, onNext }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    if (isActive) {
      gsap.fromTo(rootRef.current,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      gsap.to(rootRef.current, {
        opacity: 0, y: -28, filter: 'blur(6px)',
        duration: 0.5, ease: 'power3.in',
      })
    }
  }, [isActive])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center',
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div style={{ maxWidth: '100%', width: '100%' }}>

        {/* Overline — ink variant of ch1 accent to pass AA at 10px */}
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'color-mix(in srgb, var(--accent-ch1) 82%, black)',
          marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch1)', display: 'inline-block', borderRadius: 2 }} />
          Impact at a Glance
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(44px, 6vw, 80px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: 20,
        }}>
          THE<br />
          <span style={{
            background: `linear-gradient(135deg, var(--accent-ch1), color-mix(in srgb, var(--accent-ch1) 85%, black))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            STORY SO FAR.
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 15, color: 'var(--color-text-secondary)',
          lineHeight: 1.7, marginBottom: 32,
          maxWidth: 480,
        }}>
          Client value delivered in days and weeks – and a new template for agentic reinvention.
        </p>

        {/* Feature boxes */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
          marginBottom: 40,
        }}>
          {[
            {
              overline: 'Stronger origination moments',
              title: 'Nectar360 Pollen Vision',
              copyStart: 'An AI‑built site and agentic demos turned the Pollen vision into a live experience and originated a concrete SDLC build opportunity',
              impact: '– in 5 days.',
            },
            {
              overline: 'Value proven in delivery',
              title: 'Procurement Process Reinvention',
              copyStart: 'Horizons thinking and explorable AI-generated outputs proved value in flight, accelerated delivery and demonstrated our expertise to lead reinvention',
              impact: '- in weeks.',
            },
            {
              overline: 'Reinvention we can scale',
              title: 'Horizons Pathway to Reinvention',
              copyStart: 'A dual‑direction horizons approach and agentic toolkit that codify how we work, accelerate value, and',
              impact: 'make AI‑led reinvention scalable across the account.',
            },
          ].map((box, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: 'var(--color-surface-card)',
                border: `1px solid color-mix(in srgb, var(--accent-ch1) 15%, transparent)`,
                borderRadius: 12,
                padding: '24px 28px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-ch1)',
                marginBottom: 8,
              }}>
                {box.overline}
              </div>
              <div style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
                lineHeight: 1.2,
              }}>
                {box.title}
              </div>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {box.copyStart} <span style={{ color: 'var(--accent-ch1)', fontWeight: 600 }}>{box.impact}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Advance CTA */}
        <button
          onClick={onNext}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: 'var(--accent-ch1)',
            background: `color-mix(in srgb, var(--accent-ch1) 8%, transparent)`,
            border: `1px solid color-mix(in srgb, var(--accent-ch1) 25%, transparent)`,
            borderRadius: 8, padding: '12px 22px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `color-mix(in srgb, var(--accent-ch1) 18%, transparent)`
            e.currentTarget.style.color = 'var(--color-text-inverse)'
            e.currentTarget.style.boxShadow = 'var(--shadow-orange)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `color-mix(in srgb, var(--accent-ch1) 8%, transparent)`
            e.currentTarget.style.color = 'var(--accent-ch1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Here&apos;s how we did it
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </div>
  )
}
