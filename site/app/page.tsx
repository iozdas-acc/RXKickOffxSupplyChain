'use client'

import { Suspense, useCallback, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, SMAA, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'
import { SupermarketScene } from '@/components/three/SupermarketScene'
import { BasketAnimation } from '@/components/three/scenes/BasketAnimation'
import { NavBar } from '@/components/presentation/NavBar'
import { HeroEntrance } from '@/components/presentation/HeroEntrance'
import { Chapter03 } from '@/components/chapters/Chapter03'
import { Chapter04 } from '@/components/chapters/Chapter04'
import { Chapter05 } from '@/components/chapters/Chapter05'
import { CHAPTERS } from '@/data/chapters'

const DEBOUNCE_MS = 650
const HERO_MOMENT_MS = 2200 // how long the 3D scene stays front-and-centre before content fades in

export default function PresentationPage() {
  const [entered, setEntered] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // heroMoment = true → 3D canvas is dominant, content is hidden (the "between-chapter" beat)
  // heroMoment = false → content is readable, 3D drops to a faint ambient texture
  const [heroMoment, setHeroMoment] = useState(true)
  // R3F's <Canvas> renders a different DOM structure on the server than on the
  // client, which triggers a hydration mismatch (React #418) in production.
  // Gate all 3D canvases behind a client-only mount flag so they never take
  // part in SSR/hydration — server + first client render both emit nothing.
  const [mounted, setMounted] = useState(false)
  const lastNavTime = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Trigger a hero moment whenever chapter or entered flips.
  useEffect(() => {
    setHeroMoment(true)
    const t = setTimeout(() => setHeroMoment(false), HERO_MOMENT_MS)
    return () => clearTimeout(t)
  }, [chapter, entered])

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
      {/* ── LANDING HERO ──
          Strict 50/50 CSS grid. Left cell = text (HeroEntrance). Right cell =
          basket canvas. The two cells are sibling grid children — they can
          never overlap. After entering, the full-screen chapter canvas + FX
          stack takes over below. */}
      {!entered ? (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          // Single row that fills the full viewport height — without this,
          // grid-auto-rows defaults to `auto` and each cell shrinks to its
          // content, leaving huge dead space below and breaking the flex
          // centering inside HeroEntrance.
          gridTemplateRows: '100%',
          height: '100%',
          alignItems: 'stretch',
        }}>
          {/* Left 50% — text */}
          <div style={{ position: 'relative', minWidth: 0, height: '100%', overflow: 'hidden' }}>
            <HeroEntrance onEnter={() => setEntered(true)} />
          </div>

          {/* Right 50% — basket canvas */}
          <div style={{ position: 'relative', minWidth: 0, height: '100%', pointerEvents: 'none' }}>
            {mounted && (
              <Suspense fallback={null}>
                <Canvas
                  camera={{ position: [0, 3, 5], fov: 50, near: 0.1, far: 60 }}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                  }}
                  dpr={[1, 2]}
                  style={{ background: 'transparent' }}
                >
                  <BasketAnimation />
                </Canvas>
              </Suspense>
            )}
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          // "What We Learned" (now the first chapter, index 0) is a pure
          // editorial slide — no 3D backdrop, no ghost storefront, no
          // chromatic-aberration horizon fringe. Keep the canvas mounted
          // (scenes still preload for later chapters) but hide it.
          opacity: chapter === 0 ? 0 : (heroMoment ? 1 : 0.18),
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }}>
          {mounted && (
          <Suspense fallback={null}>
            <Canvas
              shadows="soft"
              camera={{ position: [0, 1.5, 9], fov: 58, near: 0.1, far: 60 }}
              gl={{
                antialias: false, // SMAA handles AA in the effect chain
                alpha: true, // transparent clear — page bg (#FAFAFA) shows where no geometry
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.08,
              }}
              dpr={[1, 2]}
              style={{ background: 'transparent' }}
            >
              <SupermarketScene chapter={chapter} entered={entered} />
              <EffectComposer multisampling={0}>
                <SMAA />
                <Bloom
                  intensity={0.85}
                  luminanceThreshold={0.62}
                  luminanceSmoothing={0.22}
                  kernelSize={KernelSize.LARGE}
                  mipmapBlur
                />
                <ChromaticAberration
                  offset={[0.0003, 0.0004]}
                  radialModulation={true}
                  modulationOffset={0.55}
                  blendFunction={BlendFunction.NORMAL}
                />
                <Vignette
                  offset={0.3}
                  darkness={0.48}
                  blendFunction={BlendFunction.NORMAL}
                />
                <Noise
                  premultiply
                  opacity={0.06}
                  blendFunction={BlendFunction.SOFT_LIGHT}
                />
              </EffectComposer>
            </Canvas>
          </Suspense>
          )}
        </div>
      )}

      {/* ── NAV ── */}
      <div style={{ position: 'relative', zIndex: 110 }}>
        <NavBar
          chapter={chapter}
          entered={entered}
          goTo={goTo}
          goToLanding={() => setEntered(false)}
          next={next}
          prev={prev}
        />
      </div>

      {/* ── CHAPTER CONTENT (after entering) ──
          Container fades in once the hero moment ends — chapter's internal
          GSAP entrance runs underneath so the text is already settled by the
          time it's visible. */}
      {entered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          opacity: heroMoment ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          pointerEvents: heroMoment ? 'none' : 'auto',
        }}>
          {/* Order: What We Learned → Horizons Model → Hybrid Approach.
              The case-study / "What This Looks Like In Practice" screen has
              been removed for the generic retail version. */}
          <Chapter03
            isActive={chapter === 0 && !isTransitioning}
            onNext={() => goTo(1)}
            onPrev={() => goTo(0)}
          />
          <Chapter04
            isActive={chapter === 1 && !isTransitioning}
            onNext={() => goTo(2)}
            onPrev={() => goTo(0)}
          />
          <Chapter05
            isActive={chapter === 2 && !isTransitioning}
            onPrev={() => goTo(1)}
          />
        </div>
      )}


    </div>
  )
}
