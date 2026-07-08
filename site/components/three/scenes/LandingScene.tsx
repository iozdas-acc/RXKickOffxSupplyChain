'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import type { Group, Mesh, PointLight } from 'three'
import type { MeshBasicMaterial } from 'three'

import { Bottle, Packet, Tin, Trolley, TROLLEY_BASKET_TOP_Y } from '../primitives'
import { Storefront } from '../Storefront'
import { CHAPTER_COLORS } from '../chapterColors'

// Landing-only scene: a stylised Sainsbury's storefront with a branded trolley
// parked in front. Frames the store in the right-of-centre of the viewport so
// the headline text on the left stays unobstructed. GSAP runs a cinematic
// entrance on mount — canopy drops in, sign pops, trolley rolls up.
//
// Once the user clicks "Explore our story" the scene switches to HeroScene
// (chapter 0 — shelf stocking), so this component never needs to respond to
// chapter changes.

const BRAND_ORANGE = CHAPTER_COLORS[0]
const BRAND_ORANGE_DARK = '#1F7A66'

// Storefront framed at a 3/4 angle with its entrance cantilevered toward
// camera. z is pulled forward from -1.2 → 0.2 so it sits fully inside the
// frame instead of half-cropped at the right edge; scale bump (applied by
// the outer group) makes the sign read from any breakpoint.
const STORE_POS: [number, number, number] = [3.0, -2.6, -0.6]
const STORE_ROT: [number, number, number] = [0, -0.32, 0]
const STORE_SCALE = 1.0

// Trolley parked just in front of the sliding doors — same 3/4 angle so it
// reads as "arrived at Sainsbury's", not floating in the void.
const TROLLEY_POS: [number, number, number] = [1.6, -2.6, 2.2]
const TROLLEY_ROT: [number, number, number] = [0, -0.5, 0]

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LandingScene({ entered: _entered }: { entered: boolean }) {
  const storeRef = useRef<Group | null>(null)
  const trolleyRef = useRef<Group | null>(null)
  const signRef = useRef<Mesh | null>(null)
  const spotRef = useRef<PointLight | null>(null)
  const idleReady = useRef(false)
  const reduced = useMemo(prefersReducedMotion, [])

  // BAM entrance:
  //   1. Storefront slams down from above (hard easing → thud)
  //   2. Spotlight flashes at impact → bloom pass lights up the fascia
  //   3. Sign scales in with neon-style flicker, then locks hot
  //   4. Trolley hurtles in from screen right, settles with a bounce
  useEffect(() => {
    if (reduced) {
      idleReady.current = true
      if (spotRef.current) spotRef.current.intensity = 0.4
      return
    }
    if (!storeRef.current || !trolleyRef.current) return

    const tl = gsap.timeline({
      onComplete: () => { idleReady.current = true },
    })

    // 1. Storefront slams in — start high, fall fast, land with a scale squash.
    tl.from(storeRef.current.position, {
      y: STORE_POS[1] + 4.0,
      duration: 0.7,
      ease: 'power4.in', // fast at the end → thud feel
    }, 0)
    tl.fromTo(storeRef.current.scale,
      { x: STORE_SCALE * 1.02, y: STORE_SCALE * 1.02, z: STORE_SCALE * 1.02 },
      {
        x: STORE_SCALE * 0.96, y: STORE_SCALE * 1.06, z: STORE_SCALE * 0.96,
        duration: 0.12,
        ease: 'power2.in',
      }, 0.6)
    tl.to(storeRef.current.scale, {
      x: STORE_SCALE, y: STORE_SCALE, z: STORE_SCALE,
      duration: 0.45,
      ease: 'back.out(2.2)',
    }, 0.72)

    // 2. Spotlight flash on impact — quick bloom pop.
    if (spotRef.current) {
      spotRef.current.intensity = 0
      tl.to(spotRef.current, { intensity: 4.5, duration: 0.08, ease: 'power2.out' }, 0.68)
      tl.to(spotRef.current, { intensity: 0.8, duration: 0.5,  ease: 'power2.inOut' }, 0.76)
    }

    // 3. Sign flickers on (neon-style) then locks.
    if (signRef.current) {
      const mat = signRef.current.material as MeshBasicMaterial
      mat.opacity = 0
      signRef.current.scale.setScalar(0.72)
      tl.to(mat, { opacity: 1, duration: 0.05 }, 0.78)
      tl.to(mat, { opacity: 0, duration: 0.04 }, 0.86)
      tl.to(mat, { opacity: 1, duration: 0.05 }, 0.94)
      tl.to(mat, { opacity: 0, duration: 0.04 }, 1.02)
      tl.to(mat, { opacity: 1, duration: 0.15 }, 1.08)
      tl.to(signRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.55,
        ease: 'back.out(2.6)',
      }, 0.85)
    }

    // 4. Trolley blasts in from the right with a lean, then bounces flat.
    tl.from(trolleyRef.current.position, {
      x: TROLLEY_POS[0] + 7.5,
      duration: 0.95,
      ease: 'power3.out',
    }, 0.9)
    tl.fromTo(trolleyRef.current.rotation,
      { y: TROLLEY_ROT[1] - 0.95, z: 0.08 },
      { y: TROLLEY_ROT[1],         z: 0,    duration: 0.95, ease: 'power3.out' },
      0.9)
    // Little landing bounce
    tl.fromTo(trolleyRef.current.position,
      { y: TROLLEY_POS[1] + 0.25 },
      { y: TROLLEY_POS[1],        duration: 0.35, ease: 'bounce.out' },
      1.75)

    return () => { tl.kill() }
  }, [reduced])

  // Idle: subtle trolley bob + sway, gentle sign "breath" so it feels lit.
  useFrame((state) => {
    if (reduced || !idleReady.current) return
    const t = state.clock.elapsedTime

    if (trolleyRef.current) {
      trolleyRef.current.position.y = TROLLEY_POS[1] + Math.sin(t * 0.8) * 0.035
      trolleyRef.current.rotation.y = TROLLEY_ROT[1] + Math.sin(t * 0.35) * 0.06
    }

    if (signRef.current) {
      const breath = 1 + Math.sin(t * 1.2) * 0.008
      signRef.current.scale.setScalar(breath)
    }
  })

  return (
    <group>
      {/* Dedicated spotlight on the fascia — fires with the entrance slam,
          then eases into the idle value. Kept tight (distance 6) so it only
          lights the sign and nearby canopy, not the whole scene. */}
      <pointLight
        ref={spotRef}
        position={[STORE_POS[0] + 0.4, STORE_POS[1] + 3.6, STORE_POS[2] + 1.2]}
        color={BRAND_ORANGE}
        intensity={0.8}
        distance={6}
        decay={2}
      />

      <group ref={storeRef} position={STORE_POS} rotation={STORE_ROT} scale={STORE_SCALE}>
        <Storefront signRef={signRef} />
      </group>

      <group ref={trolleyRef} position={TROLLEY_POS} rotation={TROLLEY_ROT}>
        <Trolley color={BRAND_ORANGE} accent={BRAND_ORANGE_DARK} />

        <group position={[-0.45, TROLLEY_BASKET_TOP_Y - 0.45, 0.05]}>
          <Tin accent={BRAND_ORANGE} />
        </group>
        <group position={[0.1, TROLLEY_BASKET_TOP_Y - 0.38, -0.12]} rotation={[0, 0.5, 0]}>
          <Packet color={BRAND_ORANGE} />
        </group>
        <group position={[0.55, TROLLEY_BASKET_TOP_Y - 0.32, 0.15]}>
          <Bottle accent={BRAND_ORANGE} />
        </group>
      </group>
    </group>
  )
}
