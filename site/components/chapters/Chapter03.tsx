'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const LEARNINGS = [
  {
    learning: {
      before: '',
      highlight: 'Anchoring on today',
      after: ' limits reinvention.',
    },
    howMightWe: {
      before: '...',
      highlight: 'anchor transformation in the future, not just today',
      after: '?',
    },
  },
  {
    learning: {
      before: '',
      highlight: "Concepts don't build belief",
      after: ', experience does.',
    },
    howMightWe: {
      before: '...',
      highlight: 'help our teams deliver hands-on, interactive experiences',
      after: '?',
    },
  },
  {
    learning: {
      before: '',
      highlight: "Long, fixed-length projects don't scale",
      after: '.',
    },
    howMightWe: {
      before: '...use AI to ',
      highlight: 'speed up discovery and work more efficiently at scale',
      after: '?',
    },
  },
  {
    learning: {
      before: '',
      highlight: "AI moves faster than teams can adopt it",
      after: '.',
    },
    howMightWe: {
      before: '...',
      highlight: 'balance AI speed with getting everyone on board',
      after: '?',
    },
  },
  {
    learning: {
      before: '',
      highlight: 'Teams are limited by what they already know',
      after: '.',
    },
    howMightWe: {
      before: '...',
      highlight: 'bring in Accenture and specialist expertise on every project',
      after: '?',
    },
  },
]

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter03({ isActive, onNext: _onNext, onPrev: _onPrev }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(isActive)

  useEffect(() => {
    if (!rootRef.current) return
    if (isActive) {
      setIsVisible(true)
      gsap.fromTo(rootRef.current,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      gsap.to(rootRef.current, { opacity: 0, y: -28, filter: 'blur(6px)', duration: 0.5, ease: 'power3.in' })
      const t = setTimeout(() => setIsVisible(false), 600)
      return () => clearTimeout(t)
    }
  }, [isActive])

  // Darker orange variant — used anywhere the accent would otherwise read as
  // a bright-orange wash. Keeps contrast on #FAFAFA without shouting.
  const INK = 'color-mix(in srgb, var(--accent-ch3) 82%, black)'

  return (
    <div
      ref={rootRef}
      className="chapter-row scrollbar-hide"
      style={{
        position: 'absolute', inset: 0,
        // Vertically centre the content block within the viewport — no dead
        // space at the bottom. 8vw side padding matches the copy-centric
        // register of this editorial slide (no 3D backdrop to frame it).
        paddingLeft: '8vw',
        paddingRight: '8vw',
        paddingTop: 120,
        paddingBottom: 48,
        alignItems: 'center',
        opacity: 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
        overflowY: 'auto',
      }}
    >
      {/* Soft background wash — kept dim so orange doesn't dominate. */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '5%',
        width: 480, height: 480,
        borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in srgb, var(--accent-ch3) 3%, transparent) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '18%', left: '30%',
        width: 380, height: 380,
        borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in srgb, var(--accent-ch3) 2%, transparent) 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(80px)',
      }} />

      {/* Left: headline + tagline */}
      <div style={{ flex: '0 0 auto', width: 380, paddingTop: 0 }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: INK, marginBottom: 44,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch3)', display: 'inline-block', borderRadius: 2 }} />
          Why We Work Differently
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(42px, 5.2vw, 64px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: 40,
        }}>
          AI-LED<br />
          REINVENTION<br />
          NEEDS A<br />
          <span style={{
            background: `linear-gradient(135deg, var(--accent-ch3), color-mix(in srgb, var(--accent-ch3) 60%, var(--color-text-primary)))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>NEW MODEL.</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 15, color: 'var(--color-text-secondary)',
          lineHeight: 1.75, marginBottom: 52, maxWidth: 360,
        }}>
          Traditional discovery holds back reinvention, pace, and organisational belief — a new template is needed to scale.
        </p>

        {/* Tagline pill — softer orange so it reads as an accent, not a block. */}
        <div style={{
          display: 'inline-block',
          padding: '14px 22px',
          background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-ch3) 5%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch3) 9%, var(--color-surface-card)))`,
          border: '1px solid color-mix(in srgb, var(--accent-ch3) 22%, transparent)',
          borderRadius: 12,
          boxShadow: '0 4px 20px color-mix(in srgb, var(--accent-ch3) 8%, transparent), var(--shadow-sm)',
        }}>
          <p style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 14, fontWeight: 600,
            color: INK, lineHeight: 1.6,
            letterSpacing: '-0.01em',
          }}>
            Move faster. Experience more.<br />Build belief earlier.
          </p>
        </div>
      </div>

      {/* Right: learnings table (icons removed; index number replaces the glyph). */}
      <div style={{ flex: 1, paddingTop: 0, maxWidth: 820, display: 'flex', flexDirection: 'column' }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '28px 1fr 32px 1.2fr',
          gap: 16,
          marginTop: 12,
          marginBottom: 28,
          paddingLeft: 14,
        }}>
          <div />
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-text-tertiary)',
          }}>
            Learning
          </p>
          <div />
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: INK,
          }}>
            How might we...
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          {LEARNINGS.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr 32px 1.2fr',
                alignItems: 'center',
                gap: 16,
                padding: '26px 22px 26px 16px',
                background: `linear-gradient(135deg, var(--color-surface-card), color-mix(in srgb, var(--accent-ch3) 2%, var(--color-surface-card)))`,
                border: '1px solid var(--color-border-primary)',
                borderLeft: `3px solid color-mix(in srgb, var(--accent-ch3) ${25 + i * 5}%, transparent)`,
                borderRadius: 12,
                transition: 'all 0.3s ease',
                cursor: 'default',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch3) 35%, transparent)'
                e.currentTarget.style.borderLeftColor = 'var(--accent-ch3)'
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                e.currentTarget.style.borderLeftColor = `color-mix(in srgb, var(--accent-ch3) ${25 + i * 5}%, transparent)`
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              {/* Ordinal — tiny mono digit, no glyph. */}
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 11, fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Learning */}
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 13, color: 'var(--color-text-secondary)',
                lineHeight: 1.55,
              }}>
                {item.learning.before}
                <span style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                  background: 'color-mix(in srgb, var(--accent-ch3) 8%, transparent)',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}>
                  {item.learning.highlight}
                </span>
                {item.learning.after}
              </div>

              {/* Arrow */}
              <div style={{
                width: 28, height: 28,
                borderRadius: '50%',
                background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-ch3) 12%, transparent), color-mix(in srgb, var(--accent-ch3) 20%, transparent))`,
                border: '1px solid color-mix(in srgb, var(--accent-ch3) 28%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* How might we */}
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 13, color: 'var(--color-text-primary)',
                lineHeight: 1.55,
              }}>
                {item.howMightWe.before}
                <span style={{
                  color: INK,
                  fontWeight: 600,
                }}>
                  {item.howMightWe.highlight}
                </span>
                {item.howMightWe.after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
