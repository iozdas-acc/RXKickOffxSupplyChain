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

  const titleShadow = '0 2px 40px rgba(6,6,26,0.95), 0 0 80px rgba(6,6,26,0.7)'

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        pointerEvents: 'none',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(64px, 8vw, 120px) clamp(48px, 6vw, 100px)',
        paddingTop: 80,
      }}
    >
      {/* Tag */}
      <div ref={tagRef} style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: 'clamp(8px, 0.7vw, 10px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        color: '#F06C00',
        marginBottom: 'clamp(24px, 4vh, 48px)',
        opacity: 0,
      }}>
        Sainsbury&apos;s × Accenture · Procurement Transformation
      </div>

      {/* Headline lines */}
      {['RX HAS', 'DELIVERED', 'IMPACT.'].map((text, i) => (
        <div
          key={i}
          ref={[line1Ref, line2Ref, line3Ref][i]}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(52px, 9vw, 130px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: i === 1 ? 'transparent' : '#F0F0F8',
            background: i === 1
              ? 'linear-gradient(135deg, #F06C00 0%, #E55000 50%, #FF8C00 100%)'
              : 'none',
            WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
            WebkitTextFillColor: i === 1 ? 'transparent' : 'unset',
            backgroundClip: i === 1 ? 'text' : 'unset',
            textShadow: i !== 1 ? titleShadow : 'none',
            opacity: 0,
          }}
        >
          {text}
        </div>
      ))}

      {/* Subtitle — bottom right */}
      <div ref={subtitleRef} style={{
        position: 'absolute',
        bottom: 'clamp(90px, 15vh, 150px)',
        right: 'clamp(48px, 6vw, 100px)',
        maxWidth: 320,
        opacity: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(13px, 1.1vw, 16px)',
          fontWeight: 400,
          color: '#6060A0',
          lineHeight: 1.7,
          textAlign: 'right',
        }}>
          Measurable, compounding impact at Sainsbury&apos;s enterprise scale — and how we&apos;re making it the template.
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
              ? '1px solid rgba(240, 108, 0, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            background: ctaHovered
              ? 'rgba(240, 108, 0, 0.12)'
              : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transform: ctaHovered ? 'translateY(-3px)' : 'translateY(0)',
            boxShadow: ctaHovered
              ? '0 8px 32px rgba(240, 108, 0, 0.25)'
              : '0 4px 16px rgba(0,0,0,0.3)',
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
            color: ctaHovered ? '#ffffff' : '#E0A060',
            transition: 'color 0.3s ease',
          }}>
            Enter Experience
          </span>
          <span style={{
            fontSize: 16,
            color: ctaHovered ? '#ffffff' : '#E0A060',
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
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10, fontWeight: 700,
            color: '#F06C00', letterSpacing: '0.15em',
          }}>RX</span>
          <span style={{
            width: 1, height: 10,
            background: 'rgba(255,255,255,0.08)',
          }} />
          <span style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 10, fontWeight: 400,
            color: '#404060', letterSpacing: '0.05em',
          }}>
            Built with AI at every step
          </span>
        </div>
      </div>
    </div>
  )
}
