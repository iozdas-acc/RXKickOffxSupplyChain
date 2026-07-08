'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'

type MediaType = 'image' | 'video'

interface HorizonItem {
  id: string
  /* Small label rendered above the box, e.g. "HORIZON 1" */
  horizon: string
  /* Title rendered in the overlay at the bottom of the box */
  title: string
  /* Preview shown inside the box (poster for videos, the image itself for images) */
  thumbnail: string
  /* What opens in the lightbox */
  media: MediaType
  /* Full-size asset: the image for `image`, the video file for `video`.
     ↓↓↓ SWAP THESE PATHS WITH THE REAL ASSETS ↓↓↓ */
  src: string
  /* Device frame shape: 'landscape' = 16:9 (desktop), 'portrait' = 9:16 (phone) */
  frame: 'landscape' | 'portrait'
}

/* ──────────────────────────────────────────────────────────────
   PLACEHOLDER ASSET SLOTS — swap `thumbnail` / `src` with real files.
   • Images live in /public/images
   • Videos live in /public/videos  (drop .mp4 files there and update src)
   ────────────────────────────────────────────────────────────── */
const HORIZONS: HorizonItem[] = [
  {
    id: 'navigator',
    horizon: 'HORIZON 1',
    title: 'Supplier Dashboard',
    thumbnail: '/images/horizon-1-supplier-dashboard.png',
    media: 'image',
    src: '/images/horizon-1-supplier-dashboard.png',
    frame: 'landscape',
  },
  {
    id: 'openai',
    horizon: 'HORIZON 2',
    title: 'Customer OpenAI Purchase Experience',
    thumbnail: '/images/horizon-2-openai-thumb.png',
    media: 'video',
    src: '/videos/horizon-2-openai.mov',
    frame: 'portrait',
  },
  {
    id: 'basket',
    horizon: 'HORIZON 3',
    title: 'Bid for My Basket',
    thumbnail: '/images/horizon-3-basket-thumb.png',
    media: 'video',
    src: '/videos/horizon-3-basket.mov',
    frame: 'portrait',
  },
]

/* ── Single box: label above, media preview, title overlay at bottom ── */
function HorizonBox({ item, onOpen }: { item: HorizonItem; onOpen: (item: HorizonItem) => void }) {
  const isVideo = item.media === 'video'
  const isLandscape = item.frame === 'landscape'

  return (
    <div
      style={{
        /* Deterministic column sizing: carry the frame's height + aspect
           ratio on the column itself (heights are definite from the row), so
           each column's WIDTH is computed reliably and hugs its frame. This
           lets the first frame sit flush with the container's left padding —
           aligning it with the page title — while the row's `gap` becomes the
           exact, consistent spacing between all frames. Portraits fill the row
           height; the landscape frame is half-height and top-aligned. */
        flex: '0 0 auto',
        /* Landscape frame: a bit taller (and, combined with the narrower 16:9
           ratio below, a bit less wide) than the raw screenshot strip. */
        height: item.frame === 'landscape' ? '54%' : '100%',
        /* Landscape uses a 16:9 shape — narrower/taller than the raw dashboard
           screenshot (1046×396). The image is drawn `contain`ed at the top with
           a navy gradient filling the space behind the callout (see below), so
           it reads as filling the frame. Portrait ratio matches the phone
           screenshots (≈802×1716) so the full screen shows without cropping. */
        aspectRatio: item.frame === 'landscape' ? '16 / 9' : '802 / 1716',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {/* Small label floated above the box — kept out of the flow so it does
          not affect the frame's aspect ratio. */}
      <div
        style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          marginBottom: 10,
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'color-mix(in srgb, var(--accent-ch2) 82%, black)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ width: 18, height: 1.5, background: 'var(--accent-ch2)', display: 'inline-block', borderRadius: 2 }} />
        {item.horizon}
      </div>

      {/* Clickable media box */}
      <div
        data-no-advance
        role="button"
        tabIndex={0}
        aria-label={`${item.title} — ${isVideo ? 'play video' : 'view image'}`}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(item)
          }
        }}
        style={{
          /* The column wrapper owns the height + aspect ratio; the box simply
             fills it, so its proportions are exact. */
          width: '100%',
          height: '100%',
          borderRadius: 10,
          border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
          backgroundColor: isLandscape ? '#0F1D3C' : 'var(--color-surface-card)',
          /* Landscape: dashboard image `contain`ed at top, a branded navy
             gradient filling the frame, and a stronger fade at the bottom so
             the "Supplier Dashboard" callout sits cleanly on the gradient.
             Portrait: the phone screenshot simply `cover`s the frame. */
          backgroundImage: isLandscape
            ? `linear-gradient(180deg, rgba(15,29,60,0) 50%, rgba(15,29,60,0.55) 76%, rgba(15,29,60,0.94) 100%), url(${item.thumbnail}), radial-gradient(130% 115% at 50% 0%, #23263f 0%, #0F1D3C 66%)`
            : `linear-gradient(180deg, rgba(15,29,60,0) 40%, rgba(15,29,60,0.62) 100%), url(${item.thumbnail})`,
          backgroundSize: isLandscape ? 'cover, contain, cover' : 'cover',
          backgroundPosition: isLandscape ? 'center, top center, center' : 'top center',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 12,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          outline: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        }}
      >
        {/* Center play button for video previews */}
        {isVideo && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                background: 'color-mix(in srgb, var(--accent-ch2) 90%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(15,29,60,0.35)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-text-inverse)">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Top-right action pill */}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <div
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-ch2)',
              padding: '4px 8px',
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--color-surface-card) 88%, transparent)',
              backdropFilter: 'blur(4px)',
              border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
            }}
          >
            {isVideo ? 'Play →' : 'View →'}
          </div>
        </div>

        {/* Title overlay at the bottom */}
        <div
          style={{
            position: 'relative',
            padding: '10px 12px',
            borderRadius: 8,
            background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
            backdropFilter: 'blur(6px)',
            border: '1px solid color-mix(in srgb, var(--accent-ch2) 18%, transparent)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.25,
            }}
          >
            {item.title}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Fullscreen lightbox for both image and video, closes on outside click ── */
function Lightbox({ item, onClose }: { item: HorizonItem; onClose: () => void }) {
  return (
    <div
      data-no-advance
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15, 29, 60, 0.94)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 64px)',
        animation: 'lightbox-fade 0.2s ease',
      }}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 'clamp(16px, 3vh, 28px)',
          right: 'clamp(16px, 3vw, 28px)',
          width: 42,
          height: 42,
          borderRadius: 999,
          border: '1px solid color-mix(in srgb, var(--accent-ch2) 50%, transparent)',
          background: 'color-mix(in srgb, var(--color-surface-card) 14%, transparent)',
          color: 'var(--color-text-inverse)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {item.media === 'image' ? (
        <img
          src={item.src || '/placeholder.svg'}
          alt={item.title}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '92vw',
            maxHeight: '86vh',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        />
      ) : (
        <video
          src={item.src}
          poster={item.thumbnail}
          controls
          autoPlay
          playsInline
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '92vw',
            maxHeight: '86vh',
            borderRadius: 12,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            background: '#000',
          }}
        />
      )}
    </div>
  )
}

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter02({ isActive }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(isActive)
  const [active, setActive] = useState<HorizonItem | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    if (isActive) {
      setIsVisible(true)
      gsap.fromTo(rootRef.current,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      gsap.to(rootRef.current, { opacity: 0, y: -28, filter: 'blur(6px)', duration: 0.5, ease: 'power3.in' })
      const t = setTimeout(() => setIsVisible(false), 600)
      return () => clearTimeout(t)
    }
  }, [isActive])

  // Close the lightbox when the slide is deactivated.
  useEffect(() => {
    if (!isActive) setActive(null)
  }, [isActive])

  const closeLightbox = useCallback(() => setActive(null), [])

  // Escape key closes the lightbox.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, closeLightbox])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(82px, 10vh, 100px) clamp(20px, 3.5vw, 64px) clamp(20px, 3vh, 36px)',
        gap: 'clamp(16px, 2.4vh, 28px)',
        overflow: 'hidden',
        opacity: 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Header */}
      <div style={{ flex: '0 0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'color-mix(in srgb, var(--accent-ch2) 78%, black)', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch2)', display: 'inline-block', borderRadius: 2 }} />
          Case Study
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(36px, 4.8vw, 60px)',
          fontWeight: 800,
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          marginBottom: 10,
        }}>
          <span
            className="gradient-text-ch2"
            style={{
              backgroundImage: 'linear-gradient(135deg, #134e4a 0%, #3DB19A 50%, #0f766e 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >WHAT THIS LOOKS LIKE</span>{' '}IN PRACTICE
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 13, color: 'var(--color-text-secondary)',
          lineHeight: 1.55,
          maxWidth: 900,
        }}>
          How we&apos;ve already put this into practice across the three horizons.
        </p>
      </div>

      {/* Three equal boxes spanning the full width */}
      <div
        className="chapter-row"
        style={{
          flex: '1 1 0',
          display: 'flex',
          gap: 'clamp(14px, 1.6vw, 22px)',
          minHeight: 0,
          /* Cap the row height so all frames scale down uniformly. Widths are
             aspect-ratio driven, so shrinking the height shrinks every frame
             proportionally while ratios, relative sizing, and the gap stay
             unchanged. */
          maxHeight: '66%',
          /* Top-align frames so the short landscape and tall portraits share
             the same top edge. */
          alignItems: 'flex-start',
          /* Left-align so the Pain Point (Horizon 1) box lines up with the
             page title — both share the container's left padding edge. */
          justifyContent: 'flex-start',
          /* Drop the whole row down a little for better vertical rhythm and
             breathing room under the header. Inter-frame gap is unchanged. */
          marginTop: 'clamp(24px, 5vh, 56px)',
        }}
      >
        {HORIZONS.map((item) => (
          <HorizonBox key={item.id} item={item} onOpen={setActive} />
        ))}
      </div>

      {active && <Lightbox item={active} onClose={closeLightbox} />}
    </div>
  )
}
