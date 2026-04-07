'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

const AlienScene = dynamic(() => import('./AlienScene'), { ssr: false })

export default function Hero() {
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const word3Ref = useRef<HTMLSpanElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [webglOk, setWebglOk] = useState(false)

  useGSAP(() => {
    try {
      const c = document.createElement('canvas')
      setWebglOk(!!(c.getContext('webgl') || c.getContext('experimental-webgl')))
    } catch { setWebglOk(false) }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline()
    tl.from(word1Ref.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from(word2Ref.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.15)
      .from(word3Ref.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
      .from(subheadRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.45)
      .from(ctasRef.current?.children ?? [], {
        y: 10, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08,
      }, 0.6)
      .from(indicatorRef.current, { opacity: 0, duration: 0.3 }, 0.8)
  }, {})

  return (
    <section aria-labelledby="hero-heading" className="hero">
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(42,53,84,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left — copy */}
      <div className="hero-copy">
        <div style={{ maxWidth: 640 }}>
          <h1
            id="hero-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d1)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}
          >
            <span ref={word1Ref}>Inspiring the </span>
            <mark ref={word2Ref} style={{ background: 'none', color: 'var(--color-kido-green)' }}>next</mark>
            <span ref={word3Ref}> generation.</span>
          </h1>

          <p
            ref={subheadRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)',
              maxWidth: 480,
              marginTop: 'var(--space-6)',
            }}
          >
            Innovation X is the home of Kidovation and Future Labs — hands-on
            programmes turning young people into confident innovators.
          </p>

          <div
            ref={ctasRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-10)' }}
          >
            <Link href="/kidovation" className="btn-primary">Explore Kidovation</Link>
            <Link href="/future-labs" className="btn-secondary">Discover Future Labs</Link>
          </div>
        </div>
      </div>

      {/* Right — alien canvas */}
      <div className="hero-canvas">
        {webglOk ? (
          <div style={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
            <AlienScene />
          </div>
        ) : (
          /* No WebGL — show abstract IX graphic */
          <div aria-hidden="true" style={{ textAlign: 'center', opacity: 0.15 }}>
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
              <circle cx="140" cy="140" r="130" stroke="var(--color-kido-green)" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="140" cy="140" r="90" stroke="var(--color-kido-green)" strokeWidth="1" opacity="0.5" />
              <circle cx="140" cy="140" r="50" fill="var(--color-kido-green)" opacity="0.2" />
              <text x="140" y="155" textAnchor="middle" fill="var(--color-kido-green)"
                style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800 }}>IX</text>
            </svg>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 'var(--space-8)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          style={{ color: 'var(--text-secondary)', animation: 'bounce-down 1.5s ease-in-out infinite' }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: var(--btn-min-height); min-width: 120px;
          padding: var(--btn-primary-padding);
          background: var(--btn-primary-bg); color: var(--btn-primary-text);
          font-family: var(--font-body); font-weight: var(--weight-accent);
          font-size: var(--text-sm); text-decoration: none;
          border-radius: var(--btn-primary-radius);
          transition: background var(--duration-fast) var(--ease-out);
        }
        .btn-primary:hover { background: var(--btn-primary-hover); }
        .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: var(--btn-min-height); min-width: 120px;
          padding: var(--btn-primary-padding);
          background: transparent; color: var(--text-primary);
          font-family: var(--font-body); font-weight: var(--weight-accent);
          font-size: var(--text-sm); text-decoration: none;
          border: 1px solid var(--btn-secondary-border);
          border-radius: var(--btn-primary-radius);
          transition: background var(--duration-fast) var(--ease-out);
        }
        .btn-secondary:hover { background: var(--btn-secondary-hover-bg); }
        @media (max-width: 479px) {
          .btn-primary, .btn-secondary { width: 100%; }
        }
      `}</style>
    </section>
  )
}
