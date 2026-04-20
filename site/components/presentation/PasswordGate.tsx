'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PASSWORD = 'RXkickoff!21'
const STORAGE_KEY = 'rx-kickoff-unlocked-v1'

interface Props {
  children: React.ReactNode
}

export function PasswordGate({ children }: Props) {
  // `null` = haven't checked localStorage yet (prevents SSR / first-paint flash
  // of the gate for visitors who've already unlocked).
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [focused, setFocused] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === 'true')
    } catch {
      setUnlocked(false)
    }
  }, [])

  // Auto-focus the input once the gate renders.
  useEffect(() => {
    if (unlocked === false) {
      const t = setTimeout(() => inputRef.current?.focus(), 250)
      return () => clearTimeout(t)
    }
  }, [unlocked])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch { /* ignore */ }
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: -28,
          scale: 0.96,
          filter: 'blur(10px)',
          duration: 0.7,
          ease: 'power3.in',
          onComplete: () => setUnlocked(true),
        })
      } else {
        setUnlocked(true)
      }
      return
    }
    setError(true)
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -10 },
        { x: 0, duration: 0.55, ease: 'elastic.out(1.1, 0.35)' },
      )
    }
    setTimeout(() => setError(false), 1500)
    setValue('')
  }

  if (unlocked === null) return null
  if (unlocked) return <>{children}</>

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--color-background-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 5vw, 60px)',
      }}
    >
      {/* Ambient orange orb — matches the brand heat without dominating */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--sainsburys-orange) 6%, transparent) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 460,
          padding: 'clamp(32px, 5vw, 52px)',
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-primary)',
          borderRadius: 18,
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'left',
        }}
      >
        {/* Tag */}
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--sainsburys-orange-ink)',
            marginBottom: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              width: 28,
              height: 1.5,
              background: 'var(--sainsburys-orange)',
              display: 'inline-block',
              borderRadius: 2,
            }}
          />
          RX STORY · Access required
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: 14,
          }}
        >
          Protected by{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, var(--sainsburys-orange), var(--sainsburys-orange-dark))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            design.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            marginBottom: 28,
          }}
        >
          Enter the access key to open the Sainsbury&apos;s presentation.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: error
                ? 'var(--color-destructive)'
                : 'var(--color-text-tertiary)',
              marginBottom: 8,
              transition: 'color 0.2s ease',
            }}
          >
            Access key
          </label>

          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontFamily: 'var(--font-space-mono)',
              fontSize: 14,
              letterSpacing: '0.05em',
              color: 'var(--color-text-primary)',
              background: 'var(--color-background-primary)',
              border: `1px solid ${
                error
                  ? 'var(--color-destructive)'
                  : focused
                    ? 'var(--sainsburys-orange)'
                    : 'var(--color-border-primary)'
              }`,
              borderRadius: 10,
              outline: 'none',
              boxShadow: focused
                ? '0 0 0 3px color-mix(in srgb, var(--sainsburys-orange) 18%, transparent)'
                : 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          />

          <div
            style={{
              minHeight: 18,
              marginTop: 8,
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: error ? 'var(--color-destructive)' : 'transparent',
              transition: 'color 0.2s ease',
            }}
          >
            {error ? 'Incorrect key — try again' : '\u00A0'}
          </div>

          <button
            type="submit"
            style={{
              marginTop: 6,
              width: '100%',
              padding: '14px 22px',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-text-inverse)',
              background: 'var(--sainsburys-orange)',
              border: '1px solid var(--sainsburys-orange)',
              borderRadius: 10,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-orange)'
              e.currentTarget.style.background = 'var(--sainsburys-orange-dark)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              e.currentTarget.style.background = 'var(--sainsburys-orange)'
            }}
          >
            Unlock
          </button>
        </form>

        {/* Footer badge */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid var(--color-border-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--sainsburys-orange-ink)',
            }}
          >
            RX
          </span>
          <span
            style={{
              width: 1,
              height: 10,
              background: 'var(--color-border-primary)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 10,
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.05em',
            }}
          >
            Sainsbury&apos;s × Accenture Agentic Transformation
          </span>
        </div>
      </div>
    </div>
  )
}
