'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function ModelHero() {
  const sectionRef   = useRef<HTMLElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)
  const overlineRef  = useRef<HTMLParagraphElement>(null)
  const chapterRef   = useRef<HTMLParagraphElement>(null)
  const bottomRef    = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)

  const mouseTarget  = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set([leftRef.current, rightRef.current, bottomRef.current, scrollRef.current], { opacity: 1, x: 0, y: 0 })
      gsap.set([overlineRef.current, chapterRef.current], { opacity: 1, y: 0 })
      gsap.set(lineRef.current,  { scaleX: 1, scaleY: 1 })
      gsap.set(glowRef.current,  { opacity: 0.5 })
      return
    }

    if (isMobile) {
      gsap.set(leftRef.current,  { opacity: 0, y: -24 })
      gsap.set(rightRef.current, { opacity: 0, y:  24 })
      gsap.set(lineRef.current,  { scaleX: 0, transformOrigin: 'left center' })
    } else {
      gsap.set(leftRef.current,  { opacity: 0, x: -40 })
      gsap.set(rightRef.current, { opacity: 0, x:  40 })
      gsap.set(lineRef.current,  { scaleY: 0, transformOrigin: 'top center' })
    }

    gsap.set(glowRef.current, { opacity: 0 })
    gsap.set([overlineRef.current, chapterRef.current], { opacity: 0, y: -12 })
    gsap.set(bottomRef.current,  { opacity: 0, y: 20 })
    gsap.set(scrollRef.current,  { opacity: 0 })

    const tl = gsap.timeline()

    if (isMobile) {
      tl.to(leftRef.current,  { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 0)
      tl.to(rightRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 0.2)
      tl.to(lineRef.current,  { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 0.7)
    } else {
      tl.to(leftRef.current,  { opacity: 1, x: -8, duration: 1.4, ease: 'back.out(1.2)' }, 0)
      tl.to(rightRef.current, { opacity: 1, x:  8, duration: 1.4, ease: 'back.out(1.2)' }, 0)
      tl.to(lineRef.current,  { scaleY: 1, duration: 0.6, ease: 'power3.out' }, 0.8)
    }

    tl.to(glowRef.current,  { opacity: 0.5, duration: 0.4 }, 1.0)
    tl.to([overlineRef.current, chapterRef.current], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.2)
    tl.to(bottomRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.6)
    tl.to(scrollRef.current, { opacity: 1, duration: 0.4 }, 2.1)

    if (isMobile) {
      return () => { tl.kill() }
    }

    const DAMPING = 0.04
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseTarget.current.x = (e.clientX - cx) / rect.width
      mouseTarget.current.y = (e.clientY - cy) / rect.height
    }

    const tick = () => {
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * DAMPING
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * DAMPING
      const mx = mouseCurrent.current.x
      const my = mouseCurrent.current.y
      if (leftRef.current)  gsap.set(leftRef.current,  { x: -8 + mx * -14, y: my * -8 })
      if (rightRef.current) gsap.set(rightRef.current, { x:  8 + mx *  14, y: my * -8 })
      if (glowRef.current)  gsap.set(glowRef.current,  { opacity: 0.5 + Math.abs(mx) * 0.3 })
      rafId = requestAnimationFrame(tick)
    }

    const startDelay = setTimeout(() => {
      window.addEventListener('mousemove', onMouseMove)
      rafId = requestAnimationFrame(tick)
    }, 2600)

    return () => {
      tl.kill()
      clearTimeout(startDelay)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-dvh relative overflow-hidden flex flex-col"
      style={{ backgroundColor: '#1C1C2E' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow from split line — orange left, purple right */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at 40% 50%, rgba(61, 177, 154,0.06) 0%, transparent 50%), radial-gradient(ellipse at 60% 50%, rgba(28, 28, 46,0.06) 0%, transparent 50%)',
          borderRadius: '50%',
        }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-8 relative z-10">
        <p
          ref={overlineRef}
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: '#3DB19A' }}
        >
          The Hybrid Approach
        </p>
        <p
          ref={chapterRef}
          className="text-xs tabular-nums"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          04 / 05
        </p>
      </div>

      {/* Split panels */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 relative z-10 py-16 md:py-0">

        {/* Left — Phase 1 */}
        <div
          ref={leftRef}
          className="w-full md:flex-1 text-left md:text-right md:pr-16 pb-10 md:pb-0 relative"
        >
          {/* Ghost numeral */}
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none select-none font-display font-bold italic"
            style={{ fontSize: '280px', color: 'rgba(61, 177, 154,0.04)', lineHeight: 1, right: '16px' }}
            aria-hidden
          >01</span>
          <p
            className="text-xs font-medium uppercase tracking-widest mb-3 relative"
            style={{ color: '#3DB19A' }}
          >
            Phase 1
          </p>
          <p
            className="font-display font-bold italic text-white leading-tight relative"
            style={{ fontSize: 'clamp(28px, 5.5vw, 78px)' }}
          >
            RX at pace.
          </p>
          <p
            className="mt-3 text-sm md:text-base max-w-xs md:ml-auto relative"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            AI-native acceleration. Compressed discovery. Full RX capability.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 justify-end hidden md:flex">
            {['Compressed timelines', 'AI diagnostics', 'Executive narratives'].map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-[#3DB19A]/10 text-[#3DB19A] border border-[#3DB19A]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient split line — horizontal on mobile, vertical on desktop */}
        <div className="relative flex-shrink-0 w-full h-0.5 md:w-px md:h-auto md:self-stretch my-0">
          <div
            ref={lineRef}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #3DB19A 0%, #0F1D3C 100%)',
            }}
          />
          <div
            ref={glowRef}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #3DB19A 0%, #0F1D3C 100%)',
              filter: 'blur(10px)',
              opacity: 0,
            }}
          />
        </div>

        {/* Right — Phase 2 */}
        <div
          ref={rightRef}
          className="w-full md:flex-1 text-left md:pl-16 pt-10 md:pt-0 relative"
        >
          {/* Ghost numeral */}
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none select-none font-display font-bold italic"
            style={{ fontSize: '280px', color: 'rgba(28, 28, 46,0.04)', lineHeight: 1, left: '16px' }}
            aria-hidden
          >02</span>
          <p
            className="text-xs font-medium uppercase tracking-widest mb-3 relative"
            style={{ color: '#0F1D3C' }}
          >
            Phase 2
          </p>
          <p
            className="font-display font-bold italic text-white leading-tight relative"
            style={{ fontSize: 'clamp(28px, 5.5vw, 78px)' }}
          >
            Client at theirs.
          </p>
          <p
            className="mt-3 text-sm md:text-base max-w-xs relative"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Consulting agent. Adoption support. Change at client pace.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 hidden md:flex">
            {['Embedded agent', 'Capability build', 'Client-paced'].map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-[#0F1D3C]/10 text-[#0F1D3C] border border-[#0F1D3C]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom synthesis */}
      <div ref={bottomRef} className="px-6 md:px-12 pb-12 text-center relative z-10">
        <h2
          className="font-display font-bold italic"
          style={{
            fontSize: 'clamp(20px, 2.8vw, 36px)',
            background: 'linear-gradient(90deg, #3DB19A 0%, rgba(255,255,255,0.95) 50%, #0F1D3C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Value creation and client change. Running in parallel.
        </h2>
        <div
          ref={scrollRef}
          className="mt-6 flex items-center justify-center gap-2 text-xs"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <span>↓ scroll</span>
        </div>
      </div>
    </section>
  )
}
