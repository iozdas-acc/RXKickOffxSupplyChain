'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const photos = [
  { src: '/assets/event-photos/IMG_20180630_120231.jpg', alt: 'Students working together at a Kidovation hackathon, 2018' },
  { src: '/assets/event-photos/20250411_161421.jpg', alt: 'Kidovation event 2025 — kids collaborating on a challenge' },
  { src: '/assets/event-photos/IMG_20191021_103749.jpg', alt: 'Kidovation event 2019 — team presenting their prototype' },
  { src: '/assets/event-photos/IMG_20180630_122140.jpg', alt: 'Young innovators building at Kidovation, 2018' },
  { src: '/assets/event-photos/IMG_20191022_103053.jpg', alt: 'Kidovation hackathon — judging panel moment, 2019' },
  { src: '/assets/event-photos/IMG_20180630_121739.jpg', alt: 'Kids excited after completing their Kidovation challenge, 2018' },
]

export default function KidoEventsGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const cells = gridRef.current.querySelectorAll<HTMLElement>('[data-cell]')
    gsap.from(cells, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, {})

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kido-events-heading"
      style={{ padding: 'var(--section-padding-y) var(--section-padding-x)', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ocean motif — seahorse-2, top-left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/illustrations/seaworld/seahorse-2.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          left: '1%',
          width: 90,
          opacity: 0.17,
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <h2
            id="kido-events-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
            }}
          >
            A glimpse into our events.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            marginTop: 'var(--space-4)',
            maxWidth: 520,
          }}>
            Real kids. Real challenges. Real results. No staging.
          </p>
        </div>

        <div
          ref={gridRef}
          className="kido-events-grid"
          style={{ display: 'grid', gap: 'var(--grid-gap)' }}
        >
          {photos.map((p, i) => (
            <div
              key={p.src}
              data-cell
              className={i === 1 ? 'kido-events-grid-tall' : ''}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  transition: 'transform var(--duration-base) var(--ease-smooth)',
                }}
                sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33vw"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
              />
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-label)',
          color: 'var(--text-secondary)',
          marginTop: 'var(--space-6)',
        }}>
          Events spanning 2018–2025 across 12 markets
        </p>
      </div>

      <style>{`
        .kido-events-grid {
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 280px 380px;
        }
        .kido-events-grid-tall { grid-row: span 2; }
        @media (max-width: 1023px) {
          .kido-events-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(3, 260px);
          }
          .kido-events-grid-tall { grid-row: auto; }
        }
        @media (max-width: 479px) {
          .kido-events-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 220px);
          }
        }
      `}</style>
    </section>
  )
}
