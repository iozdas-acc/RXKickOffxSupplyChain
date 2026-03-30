'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Ecosystem() {
  const kidoRef = useRef<HTMLDivElement>(null)
  const flRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from(kidoRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: kidoRef.current,
          start: 'top 80%',
          once: true,
        },
      })
      gsap.from(flRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: flRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      aria-labelledby="ecosystem-heading"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* sr-only heading for screen readers */}
      <h2 id="ecosystem-heading" className="sr-only">Our Ecosystem</h2>

      <div className="ecosystem-grid">
        {/* Kidovation panel */}
        <div
          ref={kidoRef}
          style={{
            position: 'relative',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'var(--space-10)',
            background: 'var(--color-midnight)',
            overflow: 'hidden',
            transition: 'box-shadow var(--duration-base) var(--ease-spring)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 0 0 1px var(--color-kido-green), var(--glow-green)'
            const icon = e.currentTarget.querySelector<HTMLElement>('[data-alien]')
            if (icon) icon.style.transform = 'translateY(-8px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            const icon = e.currentTarget.querySelector<HTMLElement>('[data-alien]')
            if (icon) icon.style.transform = 'translateY(0)'
          }}
        >
          {/* Green gradient wash */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '60%',
              height: '60%',
              background: 'radial-gradient(ellipse at bottom left, rgba(126,200,58,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Abstract icon — top right */}
          <div
            data-alien=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 'var(--space-6)',
              right: 'var(--space-6)',
              transition: 'transform var(--duration-base) var(--ease-spring)',
              opacity: 0.7,
            }}
          >
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              <circle cx="48" cy="48" r="44" stroke="var(--color-kido-green)" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
              <circle cx="48" cy="48" r="28" fill="var(--color-kido-green)" opacity="0.1" />
              <path d="M54 18L34 52H48L40 78L62 42H48L54 18Z" fill="var(--color-kido-green)" opacity="0.85" />
            </svg>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Accent bar */}
            <div
              aria-hidden="true"
              style={{
                width: '40px',
                height: '3px',
                background: 'var(--color-kido-green)',
                marginBottom: 'var(--space-4)',
              }}
            />
            {/* Brand label */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-kido-green)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Kidovation
            </div>
            <h3
              id="ecosystem-heading-kido"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d3)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Built for curious kids.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-body)',
                maxWidth: '360px',
                marginBottom: 'var(--space-6)',
              }}
            >
              Hands-on hackathons, Lego, alien tech, and AI challenges. No classroom.
              No lectures. Just young people solving real problems together.
            </p>
            <Link
              href="/kidovation"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-kido-green)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                transition: 'gap var(--duration-fast) var(--ease-out)',
              }}
              aria-label="Explore Kidovation programme"
            >
              Explore Kidovation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Future Labs panel */}
        <div
          ref={flRef}
          style={{
            position: 'relative',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'var(--space-10)',
            background: 'var(--color-midnight)',
            overflow: 'hidden',
            borderLeft: '1px solid var(--color-navy-border)',
            transition: 'box-shadow var(--duration-base) var(--ease-spring)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'inset 0 0 0 1px var(--color-fl-orange), var(--glow-orange)'
            const icon = e.currentTarget.querySelector<HTMLElement>('[data-rocket]')
            if (icon) icon.style.transform = 'translateY(-6px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            const icon = e.currentTarget.querySelector<HTMLElement>('[data-rocket]')
            if (icon) icon.style.transform = 'translateY(0)'
          }}
        >
          {/* Orange gradient wash */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '60%',
              height: '60%',
              background: 'radial-gradient(ellipse at bottom right, rgba(255,107,53,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Abstract icon — top right */}
          <div
            data-rocket=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 'var(--space-6)',
              right: 'var(--space-6)',
              transition: 'transform var(--duration-base) var(--ease-spring)',
              opacity: 0.7,
            }}
          >
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              <circle cx="48" cy="48" r="44" stroke="var(--color-fl-orange)" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
              <circle cx="48" cy="48" r="28" fill="var(--color-fl-orange)" opacity="0.1" />
              <path d="M48 18L72 72H24L48 18Z" fill="none" stroke="var(--color-fl-orange)" strokeWidth="2.5" strokeLinejoin="round" opacity="0.85" />
              <circle cx="48" cy="28" r="4" fill="var(--color-fl-orange)" opacity="0.85" />
              <line x1="48" y1="54" x2="48" y2="68" stroke="var(--color-fl-orange)" strokeWidth="2" opacity="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Accent bar */}
            <div
              aria-hidden="true"
              style={{
                width: '40px',
                height: '3px',
                background: 'var(--color-fl-orange)',
                marginBottom: 'var(--space-4)',
              }}
            />
            {/* Brand label */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-fl-orange)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Future Labs
            </div>
            <h3
              id="ecosystem-heading-fl"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                fontSize: 'var(--text-d3)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              For the next step.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-body)',
                maxWidth: '360px',
                marginBottom: 'var(--space-6)',
              }}
            >
              A more advanced programme for young people 16+. Real briefs. Real mentors.
              The same creative spirit, taken further.
            </p>
            <Link
              href="/future-labs"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-fl-orange)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                transition: 'gap var(--duration-fast) var(--ease-out)',
              }}
              aria-label="Discover Future Labs programme"
            >
              Discover Future Labs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
