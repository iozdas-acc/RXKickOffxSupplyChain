import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhatIsIX() {
  const sectionRef = useRef<HTMLElement>(null)
  const diagramRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-ix-text]', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      const lines   = diagramRef.current?.querySelectorAll('[data-line]')
      const circles = diagramRef.current?.querySelectorAll('[data-circle]')
      const labels  = diagramRef.current?.querySelectorAll('[data-label]')

      if (lines && circles && labels) {
        gsap.set(lines,  { strokeDasharray: '200', strokeDashoffset: '200' })
        gsap.set([circles, labels], { opacity: 0, scale: 0.8, transformOrigin: 'center' })
        const tl = gsap.timeline({ scrollTrigger: { trigger: diagramRef.current, start: 'top 70%' } })
        tl.to(lines,   { strokeDashoffset: 0, duration: 0.6, stagger: 0.15, ease: 'power2.inOut' })
          .to([circles, labels], { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.4)' }, '-=0.2')
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="what-is-ix"
      ref={sectionRef}
      className="px-6 md:px-16"
      style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-16 items-center">

        {/* Text */}
        <div>
          <p data-ix-text className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
            The ecosystem
          </p>
          <h2 data-ix-text className="font-display font-extrabold mb-6" style={{ fontSize: 'var(--text-d3)', color: 'var(--text-primary)' }}>
            One mission.<br />Three expressions.
          </h2>
          <p data-ix-text style={{ fontSize: 'var(--text-lg)', color: 'var(--color-muted)', lineHeight: 'var(--leading-body)', maxWidth: '400px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Kidovation</strong> is our flagship
            — hands-on hackathons for kids that have reached 3,111 young people across 12 markets.
            Innovation X is the ecosystem that houses it, alongside{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Future Labs</strong>, our advanced programme for older students.
          </p>
        </div>

        {/* Diagram */}
        <div className="flex justify-center">
          <svg
            ref={diagramRef}
            viewBox="0 0 400 320"
            className="w-full max-w-xs md:max-w-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Ecosystem diagram: Innovation X at top, branching to Kidovation and Future Labs"
          >
            <defs>
              <linearGradient id="ixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7B2FBE" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
            <circle data-circle cx="200" cy="60" r="44" fill="url(#ixGrad)" opacity="0.9" />
            <text data-label x="200" y="55" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne, sans-serif" fontWeight="800">Innovation</text>
            <text data-label x="200" y="72" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne, sans-serif" fontWeight="800">X</text>
            <line data-line x1="160" y1="100" x2="100" y2="220" stroke="#2A3554" strokeWidth="2" />
            <line data-line x1="240" y1="100" x2="300" y2="220" stroke="#2A3554" strokeWidth="2" />
            <circle data-circle cx="100" cy="248" r="44" fill="#7EC83A" opacity="0.9" />
            <text data-label x="100" y="243" textAnchor="middle" fill="#080C18" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800">Kido</text>
            <text data-label x="100" y="258" textAnchor="middle" fill="#080C18" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800">vation</text>
            <text data-label x="100" y="304" textAnchor="middle" fill="#8B96B0" fontSize="10" fontFamily="Inter, sans-serif">Hackathons for kids</text>
            <circle data-circle cx="300" cy="248" r="44" fill="#FF6B35" opacity="0.9" />
            <text data-label x="300" y="243" textAnchor="middle" fill="#080C18" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800">Future</text>
            <text data-label x="300" y="258" textAnchor="middle" fill="#080C18" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800">Labs</text>
            <text data-label x="300" y="304" textAnchor="middle" fill="#8B96B0" fontSize="10" fontFamily="Inter, sans-serif">Advanced learning</text>
          </svg>
        </div>
      </div>
    </section>
  )
}
