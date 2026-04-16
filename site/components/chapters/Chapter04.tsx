'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const HORIZONS = [
  {
    id: 'H3',
    color: '#7C3AED',
    label: 'Horizon 3 — Vision',
    title: 'Target State Ambition',
    duration: 'W1–W4 (parallel)',
    desc: 'Art of the Possible workshop. Future of procurement POV. H3 narrative deployed as live experience.',
    items: ['AI-native procurement platform', 'Autonomous sourcing agents', 'Predictive demand shaping'],
    step: 'STEP 1A',
  },
  {
    id: 'H1',
    color: '#0891B2',
    label: 'Horizon 1 — Current State',
    title: 'World on a Page',
    duration: 'W1–W4 (parallel)',
    desc: 'Pain Point Navigator. Discovery findings. H1 baseline documented and socialised.',
    items: ['Current state assessment', 'Pain point prioritisation', 'Quick win identification'],
    step: 'STEP 1B',
  },
  {
    id: 'H2',
    color: '#059669',
    label: 'Horizon 2 — Gap Analysis',
    title: 'Transformation Package',
    duration: 'W5–W8',
    desc: 'Gap analysis between H3 vision and H1 reality. Opportunity roadmap. Converged deliverable.',
    items: ['H1→H3 gap mapping', 'Investment roadmap', 'Phased delivery plan'],
    step: 'STEP 2',
  },
]

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter04({ isActive, onNext, onPrev }: Props) {
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
        display: 'flex', flexDirection: 'column',
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
        overflowY: 'auto',
      }}
      className="scrollbar-hide"
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: '#7C3AED', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: '#7C3AED', display: 'inline-block', borderRadius: 2 }} />
          The Hybrid Model
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48, flexWrap: 'wrap' }}>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#F0F0F8',
          }}>
            H3 VISION +<br />
            <span style={{
              background: 'linear-gradient(135deg, #0891B2, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>H1 EXECUTION</span><br />
            = THE MODEL.
          </h2>

          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 14, color: '#6060A0',
            lineHeight: 1.7, maxWidth: 360,
          }}>
            H3 and H1 run in parallel in the first half.
            H2 emerges from the intersection — not designed upfront.
            RX acceleration in W1–W4, consulting agent continuation in W5–W8.
          </p>
        </div>
      </div>

      {/* Horizon cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {HORIZONS.map((h, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(14,14,31,0.7)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${h.color}25`,
              borderRadius: 14,
              padding: '20px 22px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.25s, transform 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${h.color}50`
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${h.color}25`
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: -20, right: -20,
              width: 100, height: 100,
              background: `radial-gradient(circle, ${h.color}15, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              {/* H badge */}
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${h.color}, ${h.color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-space-mono)',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}>
                {h.id}
              </div>

              {/* Step tag */}
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                color: h.color, padding: '4px 8px',
                background: `${h.color}15`,
                borderRadius: 4,
              }}>
                {h.step}
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 8, color: h.color,
              textTransform: 'uppercase', letterSpacing: '0.15em',
              marginBottom: 6,
            }}>
              {h.label}
            </div>

            <div style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 16, fontWeight: 700,
              color: '#E0E0F0', marginBottom: 8,
              letterSpacing: '-0.01em',
            }}>
              {h.title}
            </div>

            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9, color: '#404060',
              letterSpacing: '0.1em', marginBottom: 10,
            }}>
              {h.duration}
            </div>

            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 12, color: '#505070',
              lineHeight: 1.6, marginBottom: 14,
            }}>
              {h.desc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {h.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: h.color, flexShrink: 0,
                    opacity: 0.7,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 11, color: '#6060A0',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team line */}
      <div style={{
        marginTop: 20,
        display: 'flex', alignItems: 'center', gap: 16,
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 9, color: '#404060',
          textTransform: 'uppercase', letterSpacing: '0.15em',
        }}>
          Team shape:
        </span>
        {[
          { label: 'Delivery Lead', color: '#F06C00' },
          { label: 'AI Strategy Lead', color: '#A100FF' },
          { label: 'OPT Squad W1–W8', color: '#0891B2' },
          { label: 'RX Squad W1–W4', color: '#7C3AED' },
        ].map((t, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 10px', borderRadius: 6,
            background: `${t.color}10`,
            border: `1px solid ${t.color}20`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.color }} />
            <span style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11, color: '#8080A0',
            }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
