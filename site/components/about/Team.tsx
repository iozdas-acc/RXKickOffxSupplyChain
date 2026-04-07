'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const gen1 = {
  name: 'Fiona Russell',
  photo: '/assets/team/gen1-founder-fiona-russell.jpeg',
  role: 'Founder',
  expertise: 'Innovation education & programme design',
  bio: 'Fiona founded Innovation X inside Accenture Song in 2015 on the belief that young people are the world\'s most underutilised innovators. She built the system, the culture, and the vision that everyone else runs.',
  quote: '"Young people don\'t need to be taught creativity. They need permission to use it."',
}

const gen2 = [
  {
    name: 'Anastasia Palchikova',
    photo: '/assets/team/gen2-anastasia-palchikova.jpeg',
    expertise: 'Operations & partnerships',
    bio: 'Anastasia keeps the machine running across 12 markets — logistics, relationships, and the thousand small decisions that make big programmes work.',
    quote: '"Every great programme is built on a thousand small decisions by people who care."',
  },
  {
    name: 'Christine Yu',
    photo: '/assets/team/gen2-christine-yu.png',
    expertise: 'Curriculum & facilitation',
    bio: 'Christine designs what actually happens in the room — the challenges, the structure, the energy. If a session is unforgettable, it\'s usually because of her.',
    quote: '"The best sessions are the ones where you forget you\'re in school."',
  },
  {
    name: 'Hannah Stephens',
    photo: '/assets/team/gen2-hannah-stephens.jpg',
    expertise: 'Marketing & community',
    bio: 'Hannah tells the story — across channels, audiences, and years. She built the community that keeps Kidovation alumni coming back as volunteers.',
    quote: '"Stories are how change spreads."',
  },
]

const gen3 = [
  {
    name: 'Izzie Ozdas',
    photo: '/assets/team/gen3-izzie-ozdas.jpg',
    expertise: 'Design & digital',
    bio: 'Izzie built this website and works alongside Hannah and Fiona on strategy and communications.',
    quote: '"If the experience isn\'t beautiful, the message gets lost."',
  },
  {
    name: 'Jack Riley',
    photo: '/assets/team/gen3-jack-riley.jpg',
    expertise: 'Technology & delivery',
    bio: 'Jack runs the tech stack and day-to-day delivery — making sure every event actually happens.',
    quote: '"Hackathons prove that constraints produce creativity."',
  },
  {
    name: 'Azeez Adebayo',
    photo: '/assets/team/gen3-azeez-adebayo.png',
    expertise: 'Partnerships & growth',
    bio: 'Azeez builds the relationships that bring new markets, new sponsors, and new opportunities.',
    quote: '"The best innovation comes from the most unexpected places."',
  },
]

function MemberCard({ name, photo, expertise, quote }: {
  name: string; photo: string; expertise: string; bio: string; quote: string
}) {
  return (
    <div
      data-member
      style={{
        background: 'var(--card-bg)',
        border: 'var(--card-border)',
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 220 }}>
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          loading="lazy"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="(max-width: 767px) 100vw, 33vw"
        />
      </div>
      <div style={{ padding: 'var(--card-padding)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-title)',
          fontSize: 'var(--text-xl)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
        }}>
          {name}
        </h3>
        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-accent)',
          letterSpacing: 'var(--tracking-label)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--color-navy-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '3px 10px',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-4)',
        }}>
          {expertise}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          lineHeight: 'var(--leading-body)',
        }}>
          {quote}
        </p>
      </div>
    </div>
  )
}

export default function Team() {
  const gen1Ref = useRef<HTMLDivElement>(null)
  const gen2Ref = useRef<HTMLDivElement>(null)
  const gen3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    ;[gen1Ref, gen2Ref, gen3Ref].forEach(ref => {
      if (!ref.current) return
      const cards = ref.current.querySelectorAll<HTMLElement>('[data-member]')
      gsap.from(cards, {
        y: 24, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    })
  }, {})

  const divider = (label: string) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
      margin: 'var(--space-16) 0 var(--space-12)',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-navy-border)' }} />
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-accent)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--color-navy-border)' }} />
    </div>
  )

  return (
    <section
      aria-labelledby="team-heading"
      style={{ background: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="container">
        <h2
          id="team-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-display)',
            fontSize: 'var(--text-d2)',
            lineHeight: 'var(--leading-display)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Three generations. One mission.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-body)',
          maxWidth: 560,
          marginBottom: 'var(--space-16)',
        }}>
          Innovation X is built on continuity — not turnover. Each generation learns from the
          last and builds the next chapter.
        </p>

        {/* Gen 1 — Founder spotlight */}
        <div
          ref={gen1Ref}
          data-member
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-navy-border)',
            borderTop: '3px solid transparent',
            backgroundImage: 'linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, #7B2FBE 0%, #FF6B35 100%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            overflow: 'hidden',
            padding: 'clamp(24px, 4vw, 48px)',
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
          className="gen1-card"
        >
          <div style={{
            position: 'relative',
            width: 280, height: 340,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            flexShrink: 0,
          }} className="gen1-photo">
            <Image
              src={gen1.photo}
              alt={`Portrait of ${gen1.name}, Founder of Innovation X`}
              fill
              loading="lazy"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 767px) 100vw, 280px"
            />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-ix-violet)',
              display: 'block',
              marginBottom: 'var(--space-4)',
            }}>
              Generation 1 — Founder
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d3)',
              color: 'var(--text-primary)',
              lineHeight: 'var(--leading-display)',
              marginBottom: 'var(--space-2)',
            }}>
              {gen1.name}
            </h3>
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-accent)',
              letterSpacing: 'var(--tracking-label)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--color-navy-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '3px 10px',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-6)',
            }}>
              {gen1.expertise}
            </div>
            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              lineHeight: 1.5,
            }}>
              {gen1.quote}
            </p>
          </div>
        </div>

        {divider('Generation 2 — Leadership')}

        <div
          ref={gen2Ref}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gap)' }}
          className="team-grid"
        >
          {gen2.map(m => <MemberCard key={m.name} {...m} />)}
        </div>

        {divider('Generation 3 — Now')}

        <div
          ref={gen3Ref}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gap)' }}
          className="team-grid"
        >
          {gen3.map(m => (
            <div key={m.name} style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', top: 12, left: 12, zIndex: 1,
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-accent)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-kido-green)',
                background: 'rgba(8,12,24,0.8)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
              }}>
                Gen 3
              </span>
              <MemberCard {...m} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gen1-card { grid-template-columns: 280px 1fr !important; }
        @media (max-width: 767px) {
          .gen1-card { grid-template-columns: 1fr !important; }
          .gen1-photo { width: 100% !important; height: 280px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
