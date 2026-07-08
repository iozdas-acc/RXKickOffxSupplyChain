'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Props {
  onEnter: () => void
}

// Left-half hero content. Lives inside the strict 50/50 grid cell defined in
// page.tsx — no fixed positioning, no fullscreen overlay. The basket canvas
// sits in the sibling right-half cell; the two never overlap.
export function HeroEntrance({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaHovered, setCtaHovered] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.35 })

    if (tagRef.current) {
      tl.fromTo(tagRef.current,
        { opacity: 0, y: -14, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        0
      )
    }

    ;[line1Ref, line2Ref].forEach((ref, i) => {
      if (!ref.current) return
      tl.fromTo(ref.current,
        { opacity: 0, x: -80, filter: 'blur(20px)', scale: 0.97 },
        { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration: 1.15, ease: 'power3.out' },
        0.45 + i * 0.16
      )
    })

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        1.15
      )
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.88, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(1.4)' },
        1.55
      )
    }

    return () => { tl.kill() }
  }, [])

  const handleEnter = () => {
    const tl = gsap.timeline()
    if (ctaRef.current) {
      tl.to(ctaRef.current, { scale: 0.93, duration: 0.1, ease: 'power2.in' }, 0)
      tl.to(ctaRef.current, { scale: 1.02, duration: 0.15, ease: 'power2.out' }, 0.1)
    }
    tl.to(containerRef.current, {
      opacity: 0,
      y: -40,
      scale: 0.97,
      filter: 'blur(8px)',
      duration: 0.8,
      ease: 'power3.in',
      onComplete: onEnter,
    }, 0.15)
  }

  const titleShadow = 'var(--shadow-xs), var(--shadow-md)'

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // Symmetric top/bottom padding so the block truly centres in the
        // viewport. Top value covers the fixed nav; bottom matches so there's
        // no trailing dead space below the CTA.
        paddingTop: 'clamp(96px, 11vh, 140px)',
        paddingBottom: 'clamp(96px, 11vh, 140px)',
        paddingLeft: 'clamp(32px, 4.5vw, 88px)',
        paddingRight: 'clamp(32px, 4.5vw, 88px)',
        gap: 'clamp(20px, 2.2vh, 32px)',
        pointerEvents: 'auto',
      }}
    >
      {/* Tag */}
      <div ref={tagRef} style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 'clamp(9px, 0.72vw, 11px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        color: 'var(--sainsburys-orange-ink)',
        opacity: 0,
      }}>
        ANCONA APPROACH · ARGOS SUPPLY CHAIN FORECASTING
      </div>

      {/* Headline — exactly 2 lines, orange-only accent */}
      <div
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          // Sized so the longest line ("TO DELIVER REINVENTION") fits on one
          // line inside the 50vw left column with side padding, without clipping.
          fontSize: 'clamp(26px, 3.7vw, 56px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          width: '100%',
        }}
      >
        <div
          ref={line1Ref}
          style={{
            whiteSpace: 'nowrap',
            color: 'var(--color-text-primary)',
            textShadow: titleShadow,
            opacity: 0,
          }}
        >
          A NEW WAY
        </div>
        <div
          ref={line2Ref}
          style={{
            whiteSpace: 'nowrap',
            opacity: 0,
          }}
        >
          <span style={{ color: 'var(--color-text-primary)', textShadow: titleShadow }}>TO DELIVER </span>
          <span
            style={{
              backgroundImage: 'var(--accent-ch5-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            REINVENTION
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} style={{
        maxWidth: 'min(480px, 90%)',
        opacity: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(14px, 1.1vw, 17px)',
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          textAlign: 'left',
        }}>
          How we&apos;re embedding AI-native ways of working across Sainsbury&apos;s. Bringing together functional expertise, account context and RX methodologies and tooling to deliver reinvention differently at scale.
        </p>
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        style={{
          opacity: 0,
          marginTop: 'clamp(8px, 1.4vh, 16px)',
        }}
      >
        <button
          onClick={handleEnter}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 32px',
            borderRadius: 10,
            border: ctaHovered
              ? `1px solid var(--sainsburys-orange)`
              : `1px solid var(--color-border-primary)`,
            background: ctaHovered
              ? `var(--sainsburys-orange)`
              : `var(--color-surface-card)`,
            transform: ctaHovered ? 'translateY(-3px)' : 'translateY(0)',
            boxShadow: ctaHovered
              ? 'var(--shadow-orange)'
              : 'var(--shadow-sm)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: ctaHovered ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
            transition: 'color 0.3s ease',
          }}>
            Explore
          </span>
          <span style={{
            fontSize: 16,
            color: ctaHovered ? 'var(--color-text-inverse)' : 'var(--sainsburys-orange)',
            transform: ctaHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'inline-block',
          }}>
            →
          </span>
        </button>
      </div>
    </div>
  )
}
