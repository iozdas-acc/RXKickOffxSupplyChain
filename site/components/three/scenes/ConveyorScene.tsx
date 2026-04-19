'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import type { Group } from 'three'

import {
  Bottle,
  CONVEYOR_LENGTH,
  CONVEYOR_TOP_Y,
  ConveyorBelt,
  Packet,
  Tin,
} from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 2 — the-project: 5 delivery stages as items travelling a belt.
// Mobilise → Parallel Discovery → Validate & Converge → Refine Roadmap → Final Playback.
// Products loop along +x, wrapping back to the left edge to keep the belt active.

const CHAPTER_2_ACCENT = CHAPTER_COLORS[1]
const BELT_POSITION: [number, number, number] = [0, -0.5, -2]
const [, BELT_Y, BELT_Z] = BELT_POSITION

// Half-heights matching primitives/types.ts body dimensions.
const HALF_BY_KIND = { tin: 0.2, packet: 0.275, bottle: 0.375 } as const
type Kind = keyof typeof HALF_BY_KIND

// One belt-length cycle ~12s; half-length makes wrap math symmetric.
const SPEED = CONVEYOR_LENGTH / 12
const HALF_LEN = CONVEYOR_LENGTH / 2

type Stage = { kind: Kind; tinted: boolean }
const STAGES: Stage[] = [
  { kind: 'tin', tinted: true }, // Mobilise
  { kind: 'packet', tinted: false }, // Parallel Discovery
  { kind: 'bottle', tinted: true }, // Validate & Converge
  { kind: 'packet', tinted: false }, // Refine Roadmap
  { kind: 'tin', tinted: true }, // Final Playback
]

const SPACING = CONVEYOR_LENGTH / STAGES.length
const BASE_XS = STAGES.map((_, i) => -HALF_LEN + SPACING / 2 + i * SPACING)
const beltTopY = BELT_Y + CONVEYOR_TOP_Y

// Wrap x into [-HALF_LEN, +HALF_LEN] with a single-length modulus.
function wrapX(x: number) {
  const offset = x + HALF_LEN
  const wrapped = ((offset % CONVEYOR_LENGTH) + CONVEYOR_LENGTH) % CONVEYOR_LENGTH
  return wrapped - HALF_LEN
}

function Product({ kind, tinted }: Stage) {
  const tint = tinted
    ? kind === 'tin'
      ? { color: CHAPTER_2_ACCENT }
      : { accent: CHAPTER_2_ACCENT }
    : {}
  if (kind === 'tin') return <Tin {...tint} />
  if (kind === 'bottle') return <Bottle {...tint} />
  return <Packet {...tint} />
}

export function ConveyorScene({ entered }: { entered: boolean }) {
  const productRefs = useRef<Group[]>([])
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Entrance: scale each product group 0 → 1 with a staggered pop.
  useEffect(() => {
    const groups = productRefs.current.filter(Boolean)
    if (!groups.length) return

    if (reducedMotion) {
      groups.forEach((g) => g.scale.setScalar(1))
      return
    }

    groups.forEach((g) => g.scale.setScalar(entered ? 0 : 1))
    if (!entered) return

    const tl = gsap.timeline()
    tl.to(
      groups.map((g) => g.scale),
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: 'back.out(1.6)',
        stagger: 0.08,
      },
    )
    return () => {
      tl.kill()
    }
  }, [entered, reducedMotion])

  // Continuous belt translation: advance each group's x, wrap at right edge.
  useFrame((_, delta) => {
    if (reducedMotion) return
    const step = SPEED * delta
    const groups = productRefs.current
    for (let i = 0; i < groups.length; i += 1) {
      const g = groups[i]
      if (g) g.position.x = wrapX(g.position.x + step)
    }
  })

  return (
    <group>
      <ConveyorBelt position={BELT_POSITION} />
      {STAGES.map((stage, i) => (
        <group
          key={i}
          ref={(g) => {
            if (g) productRefs.current[i] = g
          }}
          position={[BASE_XS[i], beltTopY + HALF_BY_KIND[stage.kind], BELT_Z]}
        >
          <Product kind={stage.kind} tinted={stage.tinted} />
        </group>
      ))}
    </group>
  )
}
