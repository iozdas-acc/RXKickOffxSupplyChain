'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Props {
  onEnter: () => void
}

export function HeroEntrance({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  // On wide viewports the storefront sits on the right, so we cap the text
  // to the left half. On narrow viewports the text stacks above the store
  // and needs the full line width or it wraps into noodle soup.
  const [isWide, setIsWide] = useState(false)
  useEffect(() => {
    const fn = () => setIsWide(window.innerWidth >= 900)
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    if (tagRef.current) {
      tl.fromTo(tagRef.current,
        { opacity: 0, y: -16, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        0
      )
    }

    ;[line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      if (!ref.current) return
      tl.fromTo(ref.current,
        { opacity: 0, x: -100, filter: 'blur(24px)', scale: 0.96 },
        { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration: 1.3, ease: 'power3.out' },
        0.5 + i * 0.18
      )
    })

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
        1.4
      )
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
        1.9
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
      y: -50,
      scale: 0.96,
      filter: 'blur(10px)',
      duration: 0.85,
      ease: 'power3.in',
      onComplete: onEnter,
    }, 0.15)
  }

  // Soft light-world lift behind the display type — dark-on-light, no glow.
  // Mirrors --shadow-xs + --shadow-md from globals.css via the exposed tokens.
  const titleShadow = 'var(--shadow-xs), var(--shadow-md)'

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        pointerEvents: 'none',
        display: 'flex', flexDirection: 'column',
        // Desktop: vertically centred beside the storefront.
        // Mobile: pinned to the top so the store sits clearly below.
        justifyContent: isWide ? 'center' : 'flex-start',
        padding: 'clamp(64px, 8vw, 120px) clamp(48px, 6vw, 100px)',
        paddingTop: isWide ? 80 : 96,
      }}
    >
      {/* Tag */}
      <div ref={tagRef} style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 'clamp(8px, 0.7vw, 10px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        color: 'var(--sainsburys-orange-ink)',
        marginBottom: 'clamp(24px, 4vh, 48px)',
        opacity: 0,
      }}>
        RX STORY · SAINSBURY&apos;S ENTERPRISE REINVENTION
      </div>

      {/* Headline — capped on desktop so the storefront on the right half
          stays visually clean. Mobile stacks text above store, so no cap. */}
      <div
        ref={line1Ref}
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(40px, 5.6vw, 84px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          maxWidth: isWide ? 'min(560px, 42vw)' : '100%',
          opacity: 0,
        }}
      >
        <span style={{ color: 'var(--color-text-primary)', textShadow: titleShadow }}>A NEW MODEL FOR </span>
        <span style={{
            background: 'var(--accent-ch5-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>REINVENTION</span>
      </div>

      {/* Subtitle — below headline, left aligned */}
      <div ref={subtitleRef} style={{
        maxWidth: isWide ? 'min(460px, 40vw)' : '100%',
        marginTop: 'clamp(24px, 3vh, 40px)',
        opacity: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          textAlign: 'left',
        }}>
          Delivering client value, driving origination and defining a new reinvention model at Sainsbury&apos;s - and how we&apos;re making it the template.
        </p>
      </div>

      {/* CTA — bottom left */}
      <div
        ref={ctaRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(90px, 15vh, 150px)',
          left: 'clamp(48px, 6vw, 100px)',
          opacity: 0,
          pointerEvents: 'auto',
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
            Explore our story
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

      {/* RX badge — bottom center */}
      <div style={{
        position: 'absolute',
        bottom: 24, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 18px', borderRadius: 100,
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-primary)',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 700,
            color: 'var(--sainsburys-orange-ink)', letterSpacing: '0.15em',
          }}>RX</span>
          <span style={{
            width: 1, height: 10,
            background: 'var(--color-border-primary)',
          }} />
          <span style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 10, fontWeight: 400,
            color: 'var(--color-text-secondary)', letterSpacing: '0.05em',
          }}>
            Built with AI at every step
          </span>
        </div>
      </div>
    </div>
  )
}
