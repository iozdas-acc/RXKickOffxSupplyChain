'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const TEMPLATE_PILLARS = [
  {
    tag: 'Delivery Template',
    title: 'H1–H3 Story Arc',
    desc: 'The horizons framework is not just the slide deck. It\'s the delivery model — every engagement starts with H3 + H1 running in parallel.',
    color: '#A100FF',
    icon: '⬡',
  },
  {
    tag: 'Technology Platform',
    title: 'JAR+AI Engine',
    desc: 'JAR+AI Discovery Engine is the acceleration layer. Vercel for deployment, Claude Code for build. Always on from day one.',
    color: '#F06C00',
    icon: '⬡',
  },
  {
    tag: 'Commercial Shape',
    title: 'Hybrid Model',
    desc: 'RX in the first half for velocity and belief. Consulting agent in the second half for scale. The structure that makes the ROI story work.',
    color: '#0891B2',
    icon: '⬡',
  },
]

interface Props { isActive: boolean; onPrev: () => void }

export function Chapter05({ isActive, onPrev }: Props) {
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
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Overline */}
      <div style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 10, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.3em',
        color: '#A100FF', marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1.5, background: '#A100FF', display: 'inline-block', borderRadius: 2 }} />
        The Future
        <span style={{ width: 32, height: 1.5, background: '#A100FF', display: 'inline-block', borderRadius: 2 }} />
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: 'clamp(36px, 5vw, 72px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        marginBottom: 20,
        maxWidth: 800,
      }}>
        EVERY<br />
        <span style={{
          background: 'linear-gradient(135deg, #A100FF, #F06C00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ENGAGEMENT.
        </span>
        <br />
        THIS WAY.
      </h2>

      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: 15, color: '#6060A0',
        lineHeight: 1.75, maxWidth: 560,
        marginBottom: 48,
      }}>
        The Sainsbury&apos;s model is now the template for all future agentic transformation engagements.
        Three codified elements. One repeatable approach.
      </p>

      {/* Three pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        width: '100%',
        maxWidth: 900,
        marginBottom: 48,
      }}>
        {TEMPLATE_PILLARS.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(14,14,31,0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${p.color}20`,
              borderRadius: 16,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${p.color}50`
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}20`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${p.color}20`
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Glow blob */}
            <div style={{
              position: 'absolute', top: -30, right: -30,
              width: 120, height: 120,
              background: `radial-gradient(circle, ${p.color}18, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9, color: p.color,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: 12,
            }}>
              {p.tag}
            </div>

            <div style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 20, fontWeight: 700,
              color: '#E0E0F0', marginBottom: 14,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}>
              {p.title}
            </div>

            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13, color: '#505070',
              lineHeight: 1.7,
            }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14, color: '#404060',
          fontStyle: 'italic',
        }}>
          Sainsbury&apos;s enterprise reinvention — the proof that it works.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 700,
            color: '#F06C00', letterSpacing: '0.12em',
          }}>
            SAINSBURY&apos;S
          </span>
          <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 700,
            color: '#A100FF', letterSpacing: '0.12em',
          }}>
            ACCENTURE
          </span>
        </div>
      </div>
    </div>
  )
}
