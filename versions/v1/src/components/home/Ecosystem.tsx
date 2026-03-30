import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CardProps {
  name: string; descriptor: string; mission: string
  stat: string; statLabel: string; cta: string; href: string
  accent: string; glow: string
}

function Card({ name, descriptor, mission, stat, statLabel, cta, href, accent, glow }: CardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border transition-all duration-300 cursor-pointer"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-navy-border)', padding: 'var(--space-10)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = glow }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-navy-border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="w-12 h-0.5 rounded mb-6" style={{ backgroundColor: accent }} />
      <h3 className="font-display font-bold mb-2" style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)' }}>
        {name}
      </h3>
      <p className="text-sm font-semibold uppercase mb-6" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
        {descriptor}
      </p>
      <p className="mb-8" style={{ fontSize: 'var(--text-md)', color: 'var(--color-muted)', lineHeight: 'var(--leading-body)' }}>
        {mission}
      </p>
      <div className="mb-8">
        <span className="block font-display font-extrabold" style={{ fontSize: 'var(--text-d3)', color: accent }}>
          {stat}
        </span>
        <span className="block text-sm mt-1" style={{ color: 'var(--color-muted)' }}>{statLabel}</span>
      </div>
      <span className="text-sm font-semibold" style={{ color: accent }}>
        {cta} →
      </span>
    </a>
  )
}

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-card]', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-card>
          <Card
            name="Kidovation" descriptor="Hackathons for kids"
            mission="Hands-on hackathons that teach agile thinking, design, and AI through alien technologies and play. For young people aged 7–16."
            stat="3,111+" statLabel="kids across 12 markets"
            cta="Explore Kidovation" href="/kidovation"
            accent="var(--accent-kidovation)" glow="var(--glow-green)"
          />
        </div>
        <div data-card>
          <Card
            name="Future Labs" descriptor="Advanced learning"
            mission="A more advanced programme for older students exploring AI, innovation, and the future of work through practical, ambitious challenges."
            stat="10" statLabel="years of innovation education"
            cta="Discover Future Labs" href="/future-labs"
            accent="var(--accent-futurelabs)" glow="var(--glow-orange)"
          />
        </div>
      </div>
    </section>
  )
}
