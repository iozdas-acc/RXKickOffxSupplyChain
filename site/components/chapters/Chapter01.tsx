'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const STATS = [
  { value: '1.5×',  label: 'Faster Delivery' },
  { value: '30%',   label: 'Less Effort' },
  { value: '2×',    label: 'ROI on Value Cases' },
  { value: '8 wks', label: 'Compressed Timeline' },
]

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
      <div style={{ maxWidth: 640 }}>

        {/* Overline */}
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: '#F06C00',
          marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: '#F06C00', display: 'inline-block', borderRadius: 2 }} />
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
          color: '#F0F0F8',
          marginBottom: 20,
        }}>
          RX HAS<br />
          <span style={{
            background: 'linear-gradient(135deg, #F06C00, #E55000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            DELIVERED.
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 15, color: '#6060A0',
          lineHeight: 1.7, marginBottom: 40,
          maxWidth: 480,
        }}>
          Measurable, compounding impact at Sainsbury&apos;s enterprise scale.
          Procurement transformation — H1–H3 2025.
        </p>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          marginBottom: 44,
        }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(14,14,31,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '20px 24px',
                margin: 3,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.04em',
                color: '#F06C00',
                lineHeight: 1,
                marginBottom: 6,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 12,
                color: '#606080',
                letterSpacing: '0.04em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Context note */}
        <p style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, color: '#404060',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          Sainsbury&apos;s Enterprise Reinvention · H1–H3 2025
        </p>

        {/* Advance CTA */}
        <button
          onClick={onNext}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#E0A060',
            background: 'rgba(240,108,0,0.08)',
            border: '1px solid rgba(240,108,0,0.2)',
            borderRadius: 8, padding: '12px 22px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(240,108,0,0.18)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(240,108,0,0.08)'
            e.currentTarget.style.color = '#E0A060'
          }}
        >
          Here&apos;s how we did it
          <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </div>
  )
}
