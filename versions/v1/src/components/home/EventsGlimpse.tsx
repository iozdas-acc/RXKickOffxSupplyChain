import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Photo data — sourced from A-IMG-003 (assets/raw/event-photos/)
// Images must be copied to public/photos/ at build time
// Layout: asymmetric grid — intentionally not uniform
const photos = [
  { src: '/photos/event-1.jpg', year: '2025', alt: 'Kids collaborating at a Kidovation hackathon' },
  { src: '/photos/event-2.jpg', year: '2025', alt: 'Young participant presenting their idea' },
  { src: '/photos/event-3.jpg', year: '2019', alt: 'Team working on a design challenge' },
  { src: '/photos/event-4.jpg', year: '2019', alt: 'Facilitator guiding a group activity' },
  { src: '/photos/event-5.jpg', year: '2018', alt: 'Kids celebrating at the end of their hackathon' },
  { src: '/photos/event-6.jpg', year: '2018', alt: 'Participants building a prototype together' },
]

export default function EventsGlimpse() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-photo]',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-page)', padding: 'var(--section-padding-y) var(--section-padding-x)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--content-max-width)' }}>
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase mb-3" style={{ color: 'var(--color-muted)', letterSpacing: 'var(--tracking-label)' }}>
            Real events. Real kids.
          </p>
          <h2 className="font-display font-extrabold" style={{ fontSize: 'var(--text-d3)', color: 'var(--text-primary)' }}>
            10 years of making it happen.
          </h2>
        </div>

        {/* Photo grid — single col mobile, asymmetric 3-col desktop */}
        {/* Mobile: show 4 photos in 2-col grid. Desktop: asymmetric 3fr 2fr 2fr with first spanning 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr] gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PhotoCard({ photo, index }: { photo: typeof photos[0]; index: number }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)

  return (
    <div
      data-photo
      className="relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-card)',
        aspectRatio: index === 0 ? '3/4' : '4/3',
        gridColumn: index === 0 ? '1' : undefined,
        gridRow: index === 0 ? '1 / 3' : undefined,
      }}
      onMouseEnter={() => {
        if (overlayRef.current) overlayRef.current.style.opacity = '1'
        if (yearRef.current) yearRef.current.style.opacity = '1'
      }}
      onMouseLeave={() => {
        if (overlayRef.current) overlayRef.current.style.opacity = '0'
        if (yearRef.current) yearRef.current.style.opacity = '0'
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        width="800"
        height="600"
        className="w-full h-full object-cover block"
        style={{ transition: 'transform var(--duration-slow) var(--ease-out)' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />

      {/* Hover overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-end p-4"
        style={{ background: 'rgba(8,12,24,0.5)', opacity: 0, transition: 'opacity var(--duration-base) var(--ease-out)' }}
      >
        <span
          ref={yearRef}
          className="text-sm font-semibold"
          style={{ color: 'var(--text-primary)', letterSpacing: 'var(--tracking-label)', opacity: 0, transition: 'opacity var(--duration-base) var(--ease-out)' }}
        >
          {photo.year}
        </span>
      </div>
    </div>
  )
}
