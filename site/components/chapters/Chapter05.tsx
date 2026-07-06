'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const TEMPLATE_PILLARS = [
  {
    tag: 'Framework',
    title: 'Horizons Pathway',
    desc: 'More than theory — it\'s how we deliver. Every project shapes tomorrow\'s reinvention and delivers today\'s value at the same time, with a clear bridge between the two.',
    icon: '⬡',
  },
  {
    tag: 'Tools',
    title: 'Discovery Engine',
    desc: 'The layer that speeds things up — bringing interview, survey and document data together into live insights, clear roadmaps and interactive, explorable experiences.',
    icon: '⬡',
  },
  {
    tag: 'Approach',
    title: 'Hybrid Model',
    desc: 'We work in parallel tracks — our people focus on the high-value thinking, while AI accelerates the lower-value, manual and time-consuming tasks. AI is an accelerant that speeds delivery, not an overhaul of how your teams work.',
    icon: '⬡',
  },
]

interface Props { isActive: boolean; onPrev: () => void }

export function Chapter05({ isActive, onPrev }: Props) {
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
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'clamp(48px, 6vw, 100px)',
        paddingTop: 80,
        opacity: 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Overline */}
      <div style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 10, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.3em',
        color: 'var(--accent-ch5)', marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch5)', display: 'inline-block', borderRadius: 2 }} />
        The Engagement Model
        <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch5)', display: 'inline-block', borderRadius: 2 }} />
      </div>

      {/* Headline — gradient finale moment on the ENGAGEMENT line */}
      <h2 style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: 'clamp(36px, 5vw, 72px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        marginBottom: 20,
        maxWidth: 800,
        color: 'var(--color-text-primary)',
      }}>
        EVERY<br />
        <span style={{
          backgroundImage: 'var(--accent-ch5-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ENGAGEMENT
        </span>
        <br />
        THIS WAY
      </h2>

      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: 15, color: 'var(--color-text-secondary)',
        lineHeight: 1.75, maxWidth: 620,
        marginBottom: 48,
      }}>
        A repeatable template for AI-led reinvention — proving value early,
        delivering real commercial impact, and helping Sainsbury&apos;s change at a pace it can absorb.
      </p>

      {/* Three pillars */}
      <div
        className="chapter-cols-3"
        style={{
          gap: 16,
          width: '100%',
          maxWidth: 900,
          marginBottom: 48,
        }}
      >
        {TEMPLATE_PILLARS.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid color-mix(in srgb, var(--accent-ch5) 13%, transparent)',
              borderRadius: 16,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch5) 31%, transparent)'
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-purple)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch5) 13%, transparent)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          >
            {/* Soft accent wash — was glow blob, now a subtle tint */}
            <div style={{
              position: 'absolute', top: -30, right: -30,
              width: 120, height: 120,
              background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-ch5) 9%, transparent), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9, color: 'var(--accent-ch5)',
              textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: 12,
            }}>
              {p.tag}
            </div>

            <div style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 20, fontWeight: 700,
              color: 'var(--color-text-primary)', marginBottom: 14,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}>
              {p.title}
            </div>

            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13, color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
            }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Closing brand pill — gradient rule echoes the finale moment */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          color: 'var(--sainsburys-orange-ink)', letterSpacing: '0.12em',
        }}>
          SAINSBURY&apos;S
        </span>
        <span style={{ width: 20, height: 1.5, background: 'var(--accent-ch5-gradient)', borderRadius: 2 }} />
        <span style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          color: 'var(--accent-ch5)', letterSpacing: '0.12em',
        }}>
          ACCENTURE
        </span>
      </div>
    </div>
  )
}
