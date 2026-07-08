'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

/* ───────────── data ───────────── */

const CURVE_HORIZONS = [
  {
    id: 'H-i',
    title: 'Quick Wins & Optimisation',
    sub: 'Copilot, local apps, workflow automation',
    color: 'var(--horizon-1)',
    // position on the 800×300 svg viewBox (after caption width clamp)
    x: 70,  y: 256,
    align: 'right' as const, // caption sits right of badge
  },
  {
    id: 'H-ii',
    // H-ii hugs H-i along the flat part of the curve — the big leap is II→III.
    title: 'Ecosystem & Infrastructure',
    sub: 'AI COE, integrated platforms, governance',
    color: 'var(--horizon-2)',
    x: 295, y: 238,
    align: 'right' as const,
  },
  {
    id: 'H-iii',
    // Nudged inward from x=730 so the caption has ≥20px right-edge clearance.
    title: 'Bold Bets & Vision',
    sub: 'Autonomous operations, self-improving systems',
    color: 'var(--horizon-3)',
    x: 685, y: 60,
    align: 'left' as const,  // caption sits left of badge
  },
]

const STEPS = [
  {
    n: 1,
    iconKey: 'eye',
    color: 'var(--horizon-3)',        // H-III vision
    label: 'STEP 1',
    title: 'Create Your Horizon III Vision',
    body:
      'Define what Argos\u2019 Forecasting Tower looks like in Horizon III — autonomous operations, agent-driven planning, transformed value creation.',
    arrow: 'right' as const,
  },
  {
    n: 2,
    iconKey: 'zap',
    color: 'var(--horizon-1)',        // H-I quick wins
    label: 'STEP 2',
    title: 'Deliver Horizon I Quick Wins',
    body:
      'Identify, test and prioritise hypotheses for quick wins you can deliver now — prove value, build momentum, and create funding for larger bets.',
    arrow: null,
  },
  {
    n: 3,
    iconKey: 'target',
    color: 'var(--horizon-2)',        // H-II gap
    label: 'STEP 3',
    title: 'Analyse the Horizon II Gap',
    body:
      'Work out the Horizon II investments needed to reach your Horizon III vision — the safe first steps and bigger bets that bridge the gap — and sequence them into a transformation roadmap.',
    arrow: 'left' as const,
  },
]

/* ───────────── icons ───────────── */

const Icons = {
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  target: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
}

/* ───────────── component ───────────── */

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter04({ isActive }: Props) {
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

  return (
    <div
      ref={rootRef}
      className="chapter-row scrollbar-hide"
      style={{
        position: 'absolute', inset: 0,
        gap: 48,
        padding: 'clamp(40px, 5vw, 90px)',
        paddingTop: 110,
        alignItems: 'center',
        opacity: 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
        overflowY: 'auto',
      }}
    >
      {/* Ambient page glows */}
      <div style={{
        position: 'absolute', top: '10%', right: '6%',
        width: 460, height: 460, borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in srgb, var(--accent-ch4) 6%, transparent) 0%, transparent 70%)`,
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '14%', left: '26%',
        width: 380, height: 380, borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in srgb, var(--horizon-1) 5%, transparent) 0%, transparent 70%)`,
        pointerEvents: 'none', filter: 'blur(80px)',
      }} />

      {/* ─── LEFT: heads ─────────────────────────────────────── */}
      <div style={{ flex: '0 0 auto', width: 340, paddingTop: 0, position: 'relative' }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'var(--accent-ch4)', marginBottom: 26,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch4)', display: 'inline-block', borderRadius: 2 }} />
          The Horizon Pathway
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(34px, 4vw, 52px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: 22,
        }}>
          Dual<br />
          Direction<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--horizon-1), var(--horizon-2), var(--horizon-3))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Execution.</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14, color: 'var(--color-text-secondary)',
          lineHeight: 1.7, maxWidth: 320,
        }}>
          You can&rsquo;t reach Horizon 3 by moving incrementally through Horizon 1 and 2 &mdash; the gap is exponential.
        </p>
      </div>

      {/* ─── RIGHT: horizon pathway panel ───────────────────── */}
      <div style={{
        flex: 1, maxWidth: 1240,
        position: 'relative',
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 20,
        padding: '18px 24px 16px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex', flexDirection: 'column', gap: 12,
        overflow: 'hidden',
      }}>

        {/* ── Zone 1 · Exponential curve with 3 horizon markers ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '800 / 250',
          background: `linear-gradient(180deg, color-mix(in srgb, var(--horizon-3) 3%, var(--color-background-tertiary)), var(--color-surface-card))`,
          borderRadius: 14,
          border: '1px solid var(--color-border-tertiary)',
          overflow: 'hidden',
        }}>
          {/* Grid background */}
          <svg
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <defs>
              <pattern id="ch4-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border-tertiary)" strokeWidth="0.8" />
              </pattern>
              <linearGradient id="ch4-curve" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%"  stopColor="var(--horizon-1)" />
                <stop offset="55%" stopColor="var(--horizon-2)" />
                <stop offset="100%" stopColor="var(--horizon-3)" />
              </linearGradient>
              <linearGradient id="ch4-curve-fill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%"  stopColor="var(--horizon-1)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--horizon-3)" stopOpacity="0.12" />
              </linearGradient>
              <filter id="ch4-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="800" height="300" fill="url(#ch4-grid)" opacity="0.6" />

            {/* Horizontal baseline */}
            <line x1="0" y1="265" x2="800" y2="265" stroke="var(--color-border-primary)" strokeWidth="1" />

            {/* Exponential curve — area fill. Stays almost flat along the H-i → H-ii
                span, then ramps steeply into H-iii so the visual gap matches the copy. */}
            <path
              d="M 40 262 C 160 260, 260 256, 340 244 C 460 228, 540 200, 590 150 C 640 95, 690 55, 760 28 L 760 265 L 40 265 Z"
              fill="url(#ch4-curve-fill)"
            />
            {/* Exponential curve — stroke */}
            <path
              d="M 40 262 C 160 260, 260 256, 340 244 C 460 228, 540 200, 590 150 C 640 95, 690 55, 760 28"
              fill="none"
              stroke="url(#ch4-curve)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#ch4-glow)"
            />
          </svg>

          {/* Horizon markers (HTML over SVG) */}
          {CURVE_HORIZONS.map((h) => {
            const leftPct = (h.x / 800) * 100
            const topPct  = (h.y / 300) * 100
            return (
              <div
                key={h.id}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top:  `${topPct}%`,
                  transform:
                    h.align === 'right'
                      ? 'translate(-24px, -50%)'
                      : 'translate(calc(-100% + 24px), -50%)',
                  display: 'flex',
                  flexDirection: h.align === 'right' ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {/* badge */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `linear-gradient(135deg, ${h.color}, color-mix(in srgb, ${h.color} 70%, transparent))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 12, fontWeight: 700,
                  color: 'var(--color-text-inverse)',
                  letterSpacing: '0.04em',
                  boxShadow: `0 4px 14px color-mix(in srgb, ${h.color} 35%, transparent)`,
                  flexShrink: 0,
                }}>
                  {h.id}
                </div>

                {/* caption */}
                <div style={{
                  textAlign: h.align === 'right' ? 'left' : 'right',
                  width: 210,
                  padding: '6px 10px',
                  background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: 8,
                  boxShadow: 'var(--shadow-xs)',
                  backdropFilter: 'blur(2px)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 12, fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {h.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 10,
                    color: 'var(--color-text-tertiary)',
                    marginTop: 2,
                    lineHeight: 1.3,
                  }}>
                    {h.sub}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Zone 2 · Heading row ── */}
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <h3 style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 22, fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.015em',
          }}>
            Start Both Ways Simultaneously
          </h3>
          <div style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 12, color: 'var(--color-text-secondary)',
            marginTop: 4,
          }}>
            The only path to Horizon III is working from both ends
          </div>
        </div>

        {/* ── Zone 3 · Directional arrows row ── */}
        <div
          className="chapter-cols-3 chapter-hide-mobile"
          style={{
            gap: 12,
            marginTop: 2,
          }}
        >
          <ArrowCell direction="right" />
          <div />{/* gap over Step 2 */}
          <ArrowCell direction="left" />
        </div>

        {/* ── Zone 4 · Step cards ── */}
        <div className="chapter-cols-3" style={{ gap: 10 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{
              background: `color-mix(in srgb, ${s.color} 4%, var(--color-surface-card))`,
              border: `1px solid color-mix(in srgb, ${s.color} 18%, transparent)`,
              borderLeft: `3px solid ${s.color}`,
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex', flexDirection: 'column', gap: 7,
              minHeight: 140,
              transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
              boxShadow: 'var(--shadow-xs)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${s.color} 32%, transparent)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)'
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${s.color} 18%, transparent)`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${s.color} 22%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color,
                }}>
                  {Icons[s.iconKey as keyof typeof Icons]}
                </div>
                <div style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 9, fontWeight: 700,
                  color: s.color,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>

              <div style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 14, fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}>
                {s.title}
              </div>

              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 11, color: 'var(--color-text-secondary)',
                lineHeight: 1.55,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Zone 5 · Footer strip ── */}
        <div style={{
          marginTop: 4,
          padding: '14px 18px',
          background: `linear-gradient(135deg, color-mix(in srgb, var(--horizon-1) 5%, var(--color-background-tertiary)), color-mix(in srgb, var(--horizon-3) 5%, var(--color-background-tertiary)))`,
          border: `1px solid color-mix(in srgb, var(--accent-ch4) 15%, transparent)`,
          borderRadius: 10,
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 12, color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            The path to transformation isn&rsquo;t linear &mdash; it&rsquo;s{' '}
            <span style={{ color: 'var(--horizon-3)', fontWeight: 700, fontStyle: 'normal' }}>
              visioning backwards from Horizon III
            </span>{' '}
            while{' '}
            <span style={{ color: 'var(--horizon-1)', fontWeight: 700, fontStyle: 'normal' }}>
              executing forwards from Horizon I
            </span>
            , with{' '}
            <span style={{ color: 'var(--horizon-2)', fontWeight: 700, fontStyle: 'normal' }}>
              Horizon II as the bridge
            </span>
            .
          </p>
          <p style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 13, fontWeight: 700,
            marginTop: 8,
            letterSpacing: '-0.005em',
            background:
              'linear-gradient(90deg, var(--horizon-1) 0%, var(--horizon-2) 50%, var(--horizon-3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Start from both ends. Meet in the middle. Execute simultaneously.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ───────────── arrow cell ─────────────
   Thin directional arrow sitting above step 1 / step 3.
   Visible on light surface: muted gray stroke + accent tip.        */

function ArrowCell({ direction }: { direction: 'left' | 'right' }) {
  const isRight = direction === 'right'
  // Solid stroke at consistent opacity — the gradient version faded the body
  // near-transparent so only the head was visible, which read as "broken".
  const stroke = 'var(--color-text-secondary)'
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 22,
      position: 'relative',
    }}>
      <svg width="100%" height="22" viewBox="0 0 200 22" preserveAspectRatio="none"
           style={{ maxWidth: 220, opacity: 0.7 }}>
        {isRight ? (
          <>
            <line x1="6" y1="11" x2="182" y2="11"
                  stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
            <polyline points="176,5 190,11 176,17"
                      fill="none" stroke={stroke} strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <line x1="194" y1="11" x2="18" y2="11"
                  stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
            <polyline points="24,5 10,11 24,17"
                      fill="none" stroke={stroke} strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </div>
  )
}
