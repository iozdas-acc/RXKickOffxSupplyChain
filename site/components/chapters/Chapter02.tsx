'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const DELIVERABLES = [
  {
    tag: 'Art of the Possible',
    title: 'Workshop',
    desc: 'AI-facilitated Art of the Possible with senior leadership. Horizons framework live in the room.',
  },
  {
    tag: 'Discovery Findings',
    title: 'Opportunities',
    desc: 'H1/H2/H3 opportunity landscape. Pain Point Navigator built with JAR+AI inside the engagement.',
  },
  {
    tag: 'Future of Retail',
    title: 'POV',
    desc: 'Strategic point of view on AI-native procurement. Delivered as a live Vercel experience.',
  },
]

const PHASES = ['Mobilise', 'Parallel Discovery', 'Validate & Converge', 'Refine Roadmap', 'Final Playback']

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter02({ isActive, onNext, onPrev }: Props) {
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
        display: 'flex',
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        gap: 48,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
        overflowY: 'auto',
      }}
      className="scrollbar-hide"
    >
      {/* Left column */}
      <div style={{ flex: '0 0 auto', maxWidth: 420, paddingTop: 12 }}>

        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'color-mix(in srgb, var(--accent-ch2) 78%, black)', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch2)', display: 'inline-block', borderRadius: 2 }} />
          The Project
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(36px, 5vw, 62px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: 20,
        }}>
          12 WEEKS.<br />
          <span style={{
            background: `linear-gradient(135deg, var(--accent-ch2), color-mix(in srgb, var(--accent-ch2) 75%, var(--color-surface-card)))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ONE SHOT.</span><br />
          AI-EMBEDDED.
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14, color: 'var(--color-text-secondary)',
          lineHeight: 1.75, marginBottom: 28, maxWidth: 380,
        }}>
          £400m deal. 3 weeks in. No option to restart or slow down.
          The only lever was to differentiate the outputs — so we embedded AI at every stage.
        </p>

        {/* Context pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 8,
          background: 'color-mix(in srgb, var(--accent-ch2) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent-ch2) 20%, transparent)',
          marginBottom: 32,
        }}>
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, color: 'color-mix(in srgb, var(--accent-ch2) 78%, black)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            12 weeks → 8 weeks via JAR+AI
          </span>
        </div>

        {/* Timeline */}
        <div>
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 9, color: 'var(--color-text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.2em',
            marginBottom: 14,
          }}>
            8-Week Engagement
          </p>
          <div style={{ display: 'flex', gap: 4 }}>
            {PHASES.map((ph, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  background: `color-mix(in srgb, var(--accent-ch2) ${4 + i * 3}%, transparent)`,
                  border: '1px solid color-mix(in srgb, var(--accent-ch2) 15%, transparent)',
                  borderRadius: 6,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 7.5, color: 'var(--accent-ch2)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}>
                  {ph.replace(' ', '\n')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column — deliverables */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12, maxWidth: 440 }}>
        <p style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 9, color: 'var(--color-text-tertiary)',
          textTransform: 'uppercase', letterSpacing: '0.2em',
          marginBottom: 6,
        }}>
          Three Simultaneous Deliverables
        </p>

        {DELIVERABLES.map((d, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid color-mix(in srgb, var(--accent-ch2) 15%, transparent)',
              borderRadius: 12,
              padding: '18px 20px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch2) 31%, transparent)'
              e.currentTarget.style.transform = 'translateX(4px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch2) 15%, transparent)'
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          >
            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'var(--accent-ch2)', marginBottom: 6,
            }}>
              {d.tag}
            </div>
            <div style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 16, fontWeight: 700,
              color: 'var(--color-text-primary)', marginBottom: 8,
              letterSpacing: '-0.01em',
            }}>
              {d.title}
            </div>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13, color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
            }}>
              {d.desc}
            </p>
          </div>
        ))}

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 13, color: 'var(--color-text-secondary)',
          fontStyle: 'italic', lineHeight: 1.6,
          padding: '12px 16px',
          borderLeft: '2px solid color-mix(in srgb, var(--accent-ch2) 38%, transparent)',
        }}>
          &ldquo;We turned discovery into a sales advantage.&rdquo;
        </p>
      </div>
    </div>
  )
}
