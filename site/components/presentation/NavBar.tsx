'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CHAPTERS } from '@/data/chapters'

interface Props {
  chapter: number
  entered: boolean
  goTo: (i: number) => void
  next: () => void
  prev: () => void
}

export function NavBar({ chapter, entered, goTo, next, prev }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)
  const current = CHAPTERS[chapter]
  const accentColor = current?.accentColor ?? 'var(--accent-ch1)'

  return (
    <>
      {/* ── TOP NAV ── */}
      <nav
        aria-label="Chapter navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 3vw, 40px)',
          background: `color-mix(in srgb, var(--color-surface-card) 85%, transparent)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: entered
            ? `1px solid color-mix(in srgb, ${accentColor} 9%, transparent)`
            : `1px solid var(--color-border-tertiary)`,
          transition: 'border-color 0.5s ease',
        }}
      >
        {/* ── LEFT: Brand logos only ── */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none',
        }}>
          <img
            src="/images/sainsburys-logo.png"
            alt="Sainsbury's"
            style={{ height: 10, width: 'auto', display: 'block' }}
          />
          <span style={{ width: 14, height: 1, background: 'var(--color-border-primary)' }} />
          <img
            src="/images/accenture-logo.png"
            alt="Accenture"
            style={{ height: 14, width: 'auto', display: 'block', position: 'relative', top: -3 }}
          />
        </Link>

        {/* ── RIGHT: Chapter dots + Prev/Next ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: entered ? 1 : 0,
          pointerEvents: entered ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
        }}>
          {/* Chapter dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {CHAPTERS.map((ch, i) => {
              const isActive = chapter === i
              const isPast = i < chapter
              const isHov = hovered === i

              return (
                <div key={i} style={{ position: 'relative' }}>
                  <button
                    onClick={() => goTo(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`Go to chapter ${i + 1}: ${ch.title}`}
                    aria-current={isActive ? 'step' : undefined}
                    style={{
                      width: isActive ? 36 : 30,
                      height: 30,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isActive
                        ? `1.5px solid ${ch.accentColor}`
                        : '1.5px solid transparent',
                      background: isActive
                        ? `color-mix(in srgb, ${ch.accentColor} 13%, transparent)`
                        : isHov
                        ? `color-mix(in srgb, var(--color-text-primary) 4%, transparent)`
                        : 'transparent',
                      fontFamily: 'var(--font-space-mono)',
                      fontSize: 11,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? ch.accentColor
                        : isPast
                        ? `color-mix(in srgb, ${ch.accentColor} 50%, transparent)`
                        : isHov
                        ? 'var(--color-text-secondary)'
                        : 'var(--color-text-muted)',
                      boxShadow: isActive
                        ? `0 0 12px color-mix(in srgb, ${ch.accentColor} 19%, transparent)`
                        : 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      cursor: 'pointer',
                    }}
                  >
                    {i + 1}
                  </button>

                  {isHov && !isActive && (
                    <div style={{
                      position: 'absolute',
                      top: 38,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                      padding: '5px 10px',
                      borderRadius: 8,
                      background: 'var(--color-surface-card)',
                      border: `1px solid color-mix(in srgb, ${ch.accentColor} 15%, transparent)`,
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: 10,
                      fontWeight: 600,
                      color: ch.accentColor,
                      boxShadow: 'var(--shadow-md)',
                      pointerEvents: 'none',
                      zIndex: 200,
                      letterSpacing: '0.04em',
                    }}>
                      {ch.title}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Separator */}
          <div style={{ width: 1, height: 20, background: 'var(--color-border-primary)' }} />

          {/* Prev/Next buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={prev}
              disabled={chapter <= 0}
              aria-label="Previous chapter"
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `color-mix(in srgb, var(--color-text-primary) 3%, transparent)`,
                border: `1px solid var(--color-border-primary)`,
                color: chapter > 0 ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                fontSize: 15,
                cursor: chapter > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                if (chapter > 0) {
                  e.currentTarget.style.background = `color-mix(in srgb, ${accentColor} 8%, transparent)`
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${accentColor} 19%, transparent)`
                  e.currentTarget.style.color = accentColor
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `color-mix(in srgb, var(--color-text-primary) 3%, transparent)`
                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                e.currentTarget.style.color = chapter > 0 ? 'var(--color-text-secondary)' : 'var(--color-text-muted)'
              }}
            >
              ←
            </button>

            <button
              onClick={next}
              disabled={chapter >= CHAPTERS.length - 1}
              aria-label="Next chapter"
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `color-mix(in srgb, ${accentColor} 9%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentColor} 19%, transparent)`,
                color: accentColor,
                fontSize: 15,
                cursor: chapter < CHAPTERS.length - 1 ? 'pointer' : 'not-allowed',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `color-mix(in srgb, ${accentColor} 19%, transparent)`
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${accentColor} 31%, transparent)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `color-mix(in srgb, ${accentColor} 9%, transparent)`
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${accentColor} 19%, transparent)`
              }}
            >
              →
            </button>
          </div>
        </div>
      </nav>

      {/* ── BOTTOM PROGRESS BAR ── */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        height: 3,
        display: 'flex',
        background: `color-mix(in srgb, var(--color-background-secondary) 80%, transparent)`,
        opacity: entered ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {CHAPTERS.map((ch, i) => {
          const isActive = chapter === i
          const isPast = i < chapter
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: '100%',
                background: isActive
                  ? ch.accentColor
                  : isPast
                  ? `color-mix(in srgb, ${ch.accentColor} 31%, transparent)`
                  : 'transparent',
                boxShadow: isActive
                  ? `0 0 10px color-mix(in srgb, ${ch.accentColor} 38%, transparent)`
                  : 'none',
                transition: 'all 0.5s ease',
              }}
            />
          )
        })}
      </div>
    </>
  )
}
