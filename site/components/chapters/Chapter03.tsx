'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const SHIFTS = [
  {
    from: 'Process-led discovery',
    to: 'Horizons framework thinking',
    insight: 'Clients feel understood, not assessed',
  },
  {
    from: 'Manual research synthesis',
    to: 'Real-time AI synthesis',
    insight: 'Bolder ambition becomes achievable',
  },
  {
    from: 'S&C team only',
    to: 'Data & AI integration from day one',
    insight: 'Relationship shifts to true partnership',
  },
  {
    from: 'Static PowerPoint outputs',
    to: 'AI-generated live experiences',
    insight: 'Ideas feel real before they are built',
  },
  {
    from: 'Extended iterative timelines',
    to: 'JAR+AI compressed execution',
    insight: 'Clients experience AI-native speed',
  },
  {
    from: 'Manual pattern identification',
    to: 'Predictive development',
    insight: 'Momentum stays high throughout',
  },
]

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter03({ isActive, onNext, onPrev }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    if (isActive) {
      gsap.fromTo(rootRef.current,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      gsap.to(rootRef.current, { opacity: 0, y: -28, filter: 'blur(6px)', duration: 0.5, ease: 'power3.in' })
    }
  }, [isActive])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', gap: 48,
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
        overflowY: 'auto',
      }}
      className="scrollbar-hide"
    >
      {/* Left: headline + tagline */}
      <div style={{ flex: '0 0 auto', width: 360, paddingTop: 12 }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'var(--accent-ch3)', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch3)', display: 'inline-block', borderRadius: 2 }} />
          What We Learned
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(36px, 4.5vw, 60px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: 24,
        }}>
          PACE<br />
          <span style={{
            background: `linear-gradient(135deg, var(--accent-ch3), color-mix(in srgb, var(--accent-ch3) 60%, transparent))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>MISMATCH</span><br />
          KILLS<br />
          DISCOVERY.
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14, color: 'var(--color-text-secondary)',
          lineHeight: 1.75, marginBottom: 32, maxWidth: 320,
        }}>
          Traditional consulting pace doesn&apos;t build client belief fast enough.
          The moment clients feel momentum, bolder ambition becomes possible.
        </p>

        {/* Tagline pill */}
        <div style={{
          display: 'inline-block',
          padding: '10px 18px',
          background: 'color-mix(in srgb, var(--accent-ch3) 6%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent-ch3) 15%, transparent)',
          borderRadius: 8,
          marginBottom: 32,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <p style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 13, fontWeight: 600,
            color: 'var(--accent-ch3)', lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}>
            Move faster. Experience more.<br />Build belief earlier.
          </p>
        </div>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 12, color: 'var(--color-text-tertiary)',
          lineHeight: 1.65, maxWidth: 300,
        }}>
          The shift isn&apos;t about replacing consultants — it&apos;s about removing friction from conviction.
        </p>
      </div>

      {/* Right: shift table */}
      <div style={{ flex: 1, paddingTop: 12, maxWidth: 540 }}>
        <p style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 9, color: 'var(--color-text-tertiary)',
          textTransform: 'uppercase', letterSpacing: '0.2em',
          marginBottom: 16,
        }}>
          Traditional → AI-Enabled
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {SHIFTS.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: 12,
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border-primary)',
                borderRadius: 10,
                padding: '12px 16px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch3) 25%, transparent)'
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              {/* From */}
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 12, color: 'var(--color-text-secondary)',
                lineHeight: 1.4,
              }}>
                {s.from}
              </div>

              {/* Arrow */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'color-mix(in srgb, var(--accent-ch3) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-ch3) 19%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: 'var(--accent-ch3)', fontSize: 12 }}>→</span>
              </div>

              {/* To */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 12, color: 'var(--color-text-primary)',
                  lineHeight: 1.4, marginBottom: 3,
                }}>
                  {s.to}
                </div>
                <div style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 9, color: 'var(--accent-ch3)',
                  letterSpacing: '0.08em',
                }}>
                  → {s.insight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
