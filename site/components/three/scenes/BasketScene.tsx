'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import type { Group } from 'three'

import { Basket, Bottle, Packet, Tin } from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 5 — finale composition. A single hero basket holds three products
// representing the trio the presentation lands on: H1-H3 Story Arc, JAR+AI
// Engine, and the Hybrid Model. Lighting skews toward an orange→purple
// gradient drama; one overhead pointLight adds spotlit rim.
//
// Only literal hex permitted: GRADIENT_MID (orange→purple midpoint) for the
// Packet body. Orange + purple come from CHAPTER_COLORS.
const GRADIENT_MID = '#D23B82'

const ORANGE = CHAPTER_COLORS[0]
const PURPLE = CHAPTER_COLORS[4]

// Basket placement + scale. Basket base sits at world y = BASKET_Y;
// its inner floor top is basket scale * WALL/2 ≈ 0.033 above that, so
// products rest at roughly world y = -0.47 + productHalfHeight.
const BASKET_Y = -0.5
const BASKET_POS: [number, number, number] = [0, BASKET_Y, -1]
const BASKET_SCALE = 1.3
const PRODUCT_BASE_Y = BASKET_Y + 0.03

// Primitive half-heights — mirror of types.ts / primitive source.
const TIN_HALF = 0.2
const PACKET_HALF = 0.275
const BOTTLE_HALF = 0.375

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function BasketScene({ entered }: { entered: boolean }) {
  const reduced = useMemo(prefersReducedMotion, [])
  const basketRef = useRef<Group | null>(null)
  const productRefs = useRef<(Group | null)[]>([])
  const settled = useRef(false)

  // Rest y per product (seated on basket floor). Used both for entrance
  // targets and the ambient wobble baseline.
  const restY = useMemo(
    () => [
      PRODUCT_BASE_Y + TIN_HALF,
      PRODUCT_BASE_Y + BOTTLE_HALF,
      PRODUCT_BASE_Y + PACKET_HALF,
    ],
    []
  )

  // Initial pose. Reduced-motion snaps straight to rest.
  useEffect(() => {
    const b = basketRef.current
    if (b) {
      if (reduced) {
        b.position.set(BASKET_POS[0], BASKET_POS[1], BASKET_POS[2])
      } else {
        b.position.set(BASKET_POS[0], BASKET_POS[1] + 3.5, BASKET_POS[2])
      }
    }
    productRefs.current.forEach((g, i) => {
      if (!g) return
      g.position.y = restY[i]
      g.scale.setScalar(reduced ? 1 : 0)
    })
    if (reduced) settled.current = true
  }, [reduced, restY])

  // Entrance — basket drops in (bounce), then products pop one by one.
  useEffect(() => {
    if (!entered || reduced) return
    const tl = gsap.timeline({ onComplete: () => { settled.current = true } })
    const b = basketRef.current
    if (b) {
      tl.to(b.position, {
        y: BASKET_POS[1],
        duration: 1.2,
        ease: 'bounce.out',
      }, 0)
    }
    productRefs.current.forEach((g, i) => {
      if (!g) return
      tl.to(g.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.55,
        ease: 'back.out(1.8)',
      }, 1.6 + i * 0.12) // 400ms after basket lands + 120ms stagger
    })
    return () => { tl.kill() }
  }, [entered, reduced])

  // Ambient motion — basket micro-wobble (±0.04, ~5s period) and a slow
  // rise+settle bob on the products so the tableau breathes.
  useFrame((state) => {
    if (reduced || !settled.current) return
    const t = state.clock.elapsedTime
    const b = basketRef.current
    if (b) {
      b.position.y = BASKET_POS[1] + Math.sin(t * ((Math.PI * 2) / 5)) * 0.04
    }
    for (let i = 0; i < productRefs.current.length; i++) {
      const g = productRefs.current[i]
      if (!g) continue
      g.position.y = restY[i] + Math.sin(t * 0.45 + i * 0.9) * 0.015
    }
  })

  const setProductRef = (i: number) => (el: Group | null) => {
    productRefs.current[i] = el
  }

  return (
    <group>
      {/* Rim-drama spotlight above the basket */}
      <pointLight
        position={[0, 3, 0]}
        intensity={1.2}
        color="white"
        distance={10}
        decay={2}
      />

      {/* Hero basket — purple body, orange handle echoes the gradient finale */}
      <group ref={basketRef} scale={BASKET_SCALE}>
        <Basket color={PURPLE} accent={ORANGE} />
      </group>

      {/* Left — Tin: H1-H3 Story Arc (orange body, purple accent echo) */}
      <group ref={setProductRef(0)} position={[-0.6, restY[0], -1]}>
        <Tin color={ORANGE} accent={PURPLE} />
      </group>

      {/* Centre — Bottle: JAR+AI Engine (purple body, orange accent echo) */}
      <group ref={setProductRef(1)} position={[0, restY[1], -1]}>
        <Bottle color={PURPLE} accent={ORANGE} />
      </group>

      {/* Right — Packet: Hybrid Model (gradient-mid body, orange accent echo) */}
      <group ref={setProductRef(2)} position={[0.6, restY[2], -1]}>
        <Packet color={GRADIENT_MID} accent={ORANGE} />
      </group>
    </group>
  )
}
