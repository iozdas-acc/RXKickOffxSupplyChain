'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PHOTOS = [
  {
    src: '/images/events/event-2025-01.jpg',
    alt: 'Students collaborating at an Innovation X hackathon, 2025',
    year: '2025',
  },
  {
    src: '/images/events/event-2025-02.jpg',
    alt: 'Young innovators presenting their solutions at Kidovation, 2025',
    year: '2025',
  },
  {
    src: '/images/events/event-2025-03.jpg',
    alt: 'Kids working together on a creative challenge, Innovation X 2025',
    year: '2025',
  },
  {
    src: '/images/events/event-2019-01.jpg',
    alt: 'Participants at a Kidovation hackathon event, 2019',
    year: '2019',
  },
  {
    src: '/images/events/event-2019-02.jpg',
    alt: 'Young people engaged in hands-on innovation activities, 2019',
    year: '2019',
  },
  {
    src: '/images/events/event-2018-01.jpg',
    alt: 'The early days — Innovation X event participants, 2018',
    year: '2018',
  },
]

export default function Events() {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    if (!gridRef.current) return

    const cells = gridRef.current.querySelectorAll<HTMLElement>('[data-photo-cell]')

    ScrollTrigger.batch(cells, {
      onEnter: batch => gsap.from(batch, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
      }),
      start: 'top 80%',
      once: true,
    })
  }, {})

  return (
    <section
      aria-labelledby="events-heading"
      className="section"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* Header */}
      <div
        className="container"
        style={{ marginBottom: 'var(--space-10)' }}
      >
        <h2
          id="events-heading"
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
          Real events. Real kids. Real impact.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
            maxWidth: '640px',
          }}
        >
          From school halls to corporate offices to children&apos;s hospitals —
          this is what innovation looks like.
        </p>
      </div>

      {/* Photo grid */}
      <div className="container">
        <div
          ref={gridRef}
          className="events-grid"
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              data-photo-cell=""
              className={i === 1 ? 'events-grid-tall' : ''}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform var(--duration-base) var(--ease-smooth)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Caption */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-label)',
            color: 'var(--text-secondary)',
            marginTop: 'var(--space-6)',
          }}
        >
          2018 – 2025 · 12 markets · 3,111+ young people
        </p>
      </div>

    </section>
  )
}
