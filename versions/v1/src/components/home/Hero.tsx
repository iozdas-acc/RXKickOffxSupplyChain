import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'

const AlienScene = lazy(() => import('../3d/AlienScene'))

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }, textRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative min-h-svh grid grid-cols-1 md:grid-cols-[5fr_7fr] items-center overflow-hidden px-6 md:px-16"
      style={{ paddingTop: 'var(--nav-height)', backgroundColor: 'var(--bg-page)' }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(126,200,58,0.07) 0%, transparent 70%)' }}
      />

      {/* Text */}
      <div ref={textRef} className="relative z-10 py-16 md:py-0">
        <p
          data-animate
          className="text-sm font-semibold uppercase tracking-widest mb-5"
          style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}
        >
          Innovation X
        </p>

        <h1
          data-animate
          className="font-display font-extrabold mb-6"
          style={{
            fontSize: 'var(--text-d1)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
          }}
        >
          Inspiring the<br />next generation.
        </h1>

        <p
          data-animate
          className="mb-10 max-w-md"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-muted)', lineHeight: 'var(--leading-body)' }}
        >
          The home of Kidovation and Future Labs — hands-on programmes empowering
          young people to think, create, and build.
        </p>

        <div data-animate className="flex flex-col sm:flex-row gap-4">
          <a
            href="/kidovation"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full text-base font-semibold transition-colors duration-150"
            style={{ backgroundColor: 'var(--accent-kidovation)', color: 'var(--text-inverted)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent-kidovation)')}
          >
            Explore Kidovation
          </a>
          <a
            href="/future-labs"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full text-base font-semibold border transition-all duration-150"
            style={{ borderColor: 'var(--color-navy-border)', color: 'var(--text-primary)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-futurelabs)'
              e.currentTarget.style.backgroundColor = 'rgba(255,107,53,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-navy-border)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Discover Future Labs
          </a>
        </div>
      </div>

      {/* Alien — full height on desktop, fixed height below text on mobile */}
      <div className="relative h-64 md:h-full md:min-h-svh flex items-center justify-center">
        <Suspense fallback={<AlienFallback />}>
          <AlienScene />
        </Suspense>
      </div>
    </section>
  )
}

function AlienFallback() {
  return (
    <div className="w-56 md:w-80 flex items-center justify-center" style={{ animation: 'alienFloat 4s ease-in-out infinite' }}>
      <style>{`
        @keyframes alienFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @media(prefers-reduced-motion:reduce){@keyframes alienFloat{0%,100%{transform:none}}}
      `}</style>
      <img src="/alien-primary.svg" alt="The Kidovation alien mascot" width="320" height="400" className="w-full h-auto" />
    </div>
  )
}
