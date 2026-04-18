'use client'

import { Suspense, useCallback, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { SupermarketScene } from '@/components/three/SupermarketScene'
import { NavBar } from '@/components/presentation/NavBar'
import { HeroEntrance } from '@/components/presentation/HeroEntrance'
import { Chapter01 } from '@/components/chapters/Chapter01'
import { Chapter02 } from '@/components/chapters/Chapter02'
import { Chapter03 } from '@/components/chapters/Chapter03'
import { Chapter04 } from '@/components/chapters/Chapter04'
import { Chapter05 } from '@/components/chapters/Chapter05'
import { CHAPTERS } from '@/data/chapters'

const DEBOUNCE_MS = 650

export default function PresentationPage() {
  const [entered, setEntered] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastNavTime = useRef(0)

  const goTo = useCallback((index: number) => {
    const now = Date.now()
    if (now - lastNavTime.current < DEBOUNCE_MS) return
    if (index < 0 || index >= CHAPTERS.length) return
    if (index === chapter) return
    lastNavTime.current = now
    setIsTransitioning(true)
    setChapter(index)
    setTimeout(() => setIsTransitioning(false), DEBOUNCE_MS)
  }, [chapter])

  const next = useCallback(() => {
    if (!entered) { setEntered(true); return }
    goTo(chapter + 1)
  }, [entered, chapter, goTo])

  const prev = useCallback(() => goTo(chapter - 1), [chapter, goTo])

  // Keyboard navigation
  useEffect(() => {
    if (!entered) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      switch (e.key) {
        case 'ArrowRight': case ' ': case 'PageDown':
          e.preventDefault(); next(); break
        case 'ArrowLeft': case 'PageUp':
          e.preventDefault(); prev(); break
        case 'Home': goTo(0); break
        case 'End': goTo(CHAPTERS.length - 1); break
        default: {
          const n = parseInt(e.key)
          if (n >= 1 && n <= CHAPTERS.length) goTo(n - 1)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [entered, next, prev, goTo])

  // Click to advance (skip interactive elements)
  const handleBgClick = useCallback((e: React.MouseEvent) => {
    if (!entered) return
    const t = e.target as HTMLElement
    if (t.closest('button') || t.closest('[data-no-advance]')) return
    next()
  }, [entered, next])

  return (
    <div
      style={{
        width: '100vw', height: '100dvh',
        position: 'relative', overflow: 'hidden',
        background: 'var(--color-background-primary)',
      }}
      onClick={handleBgClick}
    >
      {/* ── PERSISTENT 3D CANVAS ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 1.5, 9], fov: 58, near: 0.1, far: 60 }}
            gl={{
              antialias: true,
              alpha: true, // transparent clear — page bg (#FAFAFA) shows where no geometry
              powerPreference: 'high-performance',
              toneMapping: 0,
            }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
          >
            <SupermarketScene chapter={chapter} entered={entered} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── NAV ── */}
      <div style={{ position: 'relative', zIndex: 110 }}>
        <NavBar
          chapter={chapter}
          entered={entered}
          goTo={goTo}
          next={next}
          prev={prev}
        />
      </div>

      {/* ── HERO ENTRANCE (before entering) ── */}
      {!entered && (
        <HeroEntrance onEnter={() => setEntered(true)} />
      )}

      {/* ── CHAPTER CONTENT (after entering) ── */}
      {entered && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
          <Chapter01
            isActive={chapter === 0 && !isTransitioning}
            onNext={() => goTo(1)}
          />
          <Chapter02
            isActive={chapter === 1 && !isTransitioning}
            onNext={() => goTo(2)}
            onPrev={() => goTo(0)}
          />
          <Chapter03
            isActive={chapter === 2 && !isTransitioning}
            onNext={() => goTo(3)}
            onPrev={() => goTo(1)}
          />
          <Chapter04
            isActive={chapter === 3 && !isTransitioning}
            onNext={() => goTo(4)}
            onPrev={() => goTo(2)}
          />
          <Chapter05
            isActive={chapter === 4 && !isTransitioning}
            onPrev={() => goTo(3)}
          />
        </div>
      )}


    </div>
  )
}
