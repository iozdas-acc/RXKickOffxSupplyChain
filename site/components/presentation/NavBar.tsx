'use client'

import { useState } from 'react'
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
  const accentColor = current?.accentColor ?? '#F06C00'

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
          background: 'rgba(6, 6, 26, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${entered ? accentColor + '18' : 'rgba(255,255,255,0.04)'}`,
          transition: 'border-color 0.5s ease',
        }}
      >
        {/* ── LEFT: Co-brand + chapter info ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Brand marks */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-space-grotesk)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#F06C00' }}>
              SAINSBURY&apos;S
            </span>
            <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#A100FF' }}>
              ACCENTURE
            </span>
          </div>

          {entered && (
            <>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: accentColor,
                  lineHeight: 1,
                  transition: 'color 0.4s ease',
                }}>
                  {String(chapter + 1).padStart(2, '0')}
                </span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#D0D0E8',
                    letterSpacing: '0.04em',
                  }}>
                    {current?.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#404060',
                  }}>
                    RX Kickoff
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── CENTER: Chapter dots ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: entered ? 1 : 0,
            pointerEvents: entered ? 'auto' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
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
                      ? `${ch.accentColor}20`
                      : isHov
                      ? 'rgba(255,255,255,0.06)'
                      : 'transparent',
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 11,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive
                      ? ch.accentColor
                      : isPast
                      ? `${ch.accentColor}80`
                      : isHov
                      ? '#A0A0C0'
                      : '#404060',
                    boxShadow: isActive ? `0 0 12px ${ch.accentColor}30` : 'none',
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
                    background: 'rgba(6, 6, 26, 0.95)',
                    border: `1px solid ${ch.accentColor}25`,
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: ch.accentColor,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
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

        {/* ── RIGHT: Prev/Next ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {entered && (
            <>
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
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: chapter > 0 ? '#8888AA' : '#252540',
                  fontSize: 15,
                  cursor: chapter > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  if (chapter > 0) {
                    e.currentTarget.style.background = `${accentColor}15`
                    e.currentTarget.style.borderColor = `${accentColor}30`
                    e.currentTarget.style.color = accentColor
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = chapter > 0 ? '#8888AA' : '#252540'
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
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}30`,
                  color: accentColor,
                  fontSize: 15,
                  cursor: chapter < CHAPTERS.length - 1 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${accentColor}30`
                  e.currentTarget.style.borderColor = `${accentColor}50`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${accentColor}18`
                  e.currentTarget.style.borderColor = `${accentColor}30`
                }}
              >
                →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── BOTTOM PROGRESS BAR ── */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        height: 3,
        display: 'flex',
        background: 'rgba(6,6,26,0.8)',
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
                  ? `${ch.accentColor}50`
                  : 'transparent',
                boxShadow: isActive ? `0 0 10px ${ch.accentColor}60` : 'none',
                transition: 'all 0.5s ease',
              }}
            />
          )
        })}
      </div>
    </>
  )
}
