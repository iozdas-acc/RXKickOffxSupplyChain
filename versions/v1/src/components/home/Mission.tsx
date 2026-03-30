import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 10,   suffix: '',  label: 'years running' },
  { number: 12,   suffix: '',  label: 'markets reached' },
  { number: 3111, suffix: '+', label: 'kids impacted' },
]

export default function Mission() {
  const sectionRef  = useRef<HTMLElement>(null)
  const numberRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-quote-line]', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i]
        if (!el) return
        const counter = { val: 0 }
        gsap.to(counter, {
          val: stat.number, duration: 1.5, ease: 'power1.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          onUpdate: () => { el.textContent = Math.round(counter.val).toLocaleString() + stat.suffix },
        })
      })

      gsap.fromTo('[data-stat]', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-stats-row]', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none font-display font-black"
        style={{ fontSize: '40vw', background: 'var(--gradient-ix)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.04 }}
      >
        "
      </div>

      <div className="relative z-10 mx-auto text-center" style={{ maxWidth: 'var(--content-narrow-width)' }}>
        <p className="text-sm font-semibold uppercase mb-8" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
          Why we exist
        </p>

        <blockquote className="mb-16">
          {['Empower young people to grow into', 'confident, creative thinkers who dare', 'to imagine and innovate for a better world.'].map((line, i) => (
            <span
              key={i}
              data-quote-line
              className="block font-display font-extrabold"
              style={{ fontSize: 'var(--text-d2)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', color: 'var(--text-primary)' }}
            >
              {line}
            </span>
          ))}
        </blockquote>

        {/* Stats — row on desktop, column on mobile */}
        <div data-stats-row className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <div key={i} data-stat className="text-center">
              <span
                ref={el => { numberRefs.current[i] = el }}
                className="block font-display font-extrabold leading-none mb-2"
                style={{ fontSize: 'var(--text-d3)', color: 'var(--accent-kidovation)' }}
              >
                0
              </span>
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
