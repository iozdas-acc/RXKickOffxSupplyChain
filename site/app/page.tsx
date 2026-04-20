'use client'

import { Suspense, useCallback, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, SMAA, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'
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
const HERO_MOMENT_MS = 2200 // how long the 3D scene stays front-and-centre before content fades in

export default function PresentationPage() {
  const [entered, setEntered] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // heroMoment = true → 3D canvas is dominant, content is hidden (the "between-chapter" beat)
  // heroMoment = false → content is readable, 3D drops to a faint ambient texture
  const [heroMoment, setHeroMoment] = useState(true)
  const lastNavTime = useRef(0)

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
      {/* ── PERSISTENT 3D CANVAS ──
          On the landing (!entered) the storefront IS the hero — never dim.
          Once entered, opacity swings with `heroMoment`: full-bleed dominant
          during the between-chapter beat, drops to a faint ambient texture
          while content is being read. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        opacity: !entered ? 1 : (heroMoment ? 1 : 0.18),
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: 'none',
      }}>
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
                offset={[0.0008, 0.0012]}
                radialModulation={true}
                modulationOffset={0.35}
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
      </div>

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

      {/* ── HERO ENTRANCE (before entering) ── */}
      {!entered && (
        <HeroEntrance onEnter={() => setEntered(true)} />
      )}

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
