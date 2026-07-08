'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import type { Group } from 'three'

import {
  AisleSign,
  Bottle,
  Packet,
  Shelf,
  SHELF_TOP_Y,
  Tin,
} from '../primitives'

// Chapter 4 — three aisles receding into depth with overhead H1 / H2 / H3 signs.
// Camera sits at [0, 2.5, 10] (see CameraController); depth runs toward -z.
// Each aisle: two shelves at different z, a small row of products, and a
// horizon-tinted sign hovering above. Labels ("H1/H2/H3") land as DOM overlay
// per AisleSign's Phase 3.0 note — here we colour-code the stripe only.
//
// Horizon colours are semantic content (H1/H2/H3 labels), not decoration —
// the one place in this scene allowed to introduce hex.
const H1_COLOR = '#0891B2'
const H2_COLOR = '#059669'
const H3_COLOR = '#0F1D3C'

const AISLE_X = [-5, 0, 5] as const
const AISLE_COLORS = [H1_COLOR, H2_COLOR, H3_COLOR] as const
const SHELF_Y = -1
const SHELF_ZS = [-2, -6] as const
const SIGN_POS: [number, number, number] = [0, 2.5, -4]
// Rotate sign -PI/8 around Y so it angles toward camera on the outer aisles.
// Centre aisle gets 0; outer aisles mirror toward the middle.
const SIGN_ROT_Y = Math.PI / 8

// Product kinds & half-heights (match primitives/types.ts body dimensions).
const TIN_HALF = 0.2
const PACKET_HALF = 0.275
const BOTTLE_HALF = 0.375
const shelfTopY = SHELF_Y + SHELF_TOP_Y

type Kind = 'tin' | 'packet' | 'bottle'
type ProductSlot = { kind: Kind; half: number; x: number; z: number }

// 5 products per aisle: 2 on the front shelf, 3 on the back shelf.
// Mix of kinds so each aisle reads as "variety of merchandise".
function productsForAisle(seed: number): ProductSlot[] {
  const kinds: Kind[] = ['tin', 'packet', 'bottle']
  const halves: Record<Kind, number> = {
    tin: TIN_HALF,
    packet: PACKET_HALF,
    bottle: BOTTLE_HALF,
  }
  const pick = (i: number): Kind => kinds[(seed + i) % kinds.length]
  return [
    { kind: pick(0), half: halves[pick(0)], x: -0.9, z: SHELF_ZS[0] },
    { kind: pick(1), half: halves[pick(1)], x: 0.9, z: SHELF_ZS[0] },
    { kind: pick(2), half: halves[pick(2)], x: -1.4, z: SHELF_ZS[1] },
    { kind: pick(0), half: halves[pick(0)], x: 0, z: SHELF_ZS[1] },
    { kind: pick(1), half: halves[pick(1)], x: 1.4, z: SHELF_ZS[1] },
  ]
}

export function AislesScene({ entered }: { entered: boolean }) {
  const aisleRefs = useRef<Array<Group | null>>([null, null, null])
  const signRefs = useRef<Array<Group | null>>([null, null, null])
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Entrance: aisles pop in with 400ms stagger; signs scale 0 → 1 with back ease.
  useEffect(() => {
    const aisles = aisleRefs.current.filter(Boolean) as Group[]
    const signs = signRefs.current.filter(Boolean) as Group[]
    if (!aisles.length) return

    if (reducedMotion) {
      aisles.forEach((g) => g.scale.setScalar(1))
      signs.forEach((g) => g.scale.setScalar(1))
      return
    }

    const initial = entered ? 0 : 1
    aisles.forEach((g) => g.scale.setScalar(initial))
    signs.forEach((g) => g.scale.setScalar(initial))

    if (!entered) return

    const tl = gsap.timeline()
    tl.to(
      aisles.map((g) => g.scale),
      { x: 1, y: 1, z: 1, duration: 0.6, ease: 'power2.out', stagger: 0.4 },
    )
    tl.to(
      signs.map((g) => g.scale),
      { x: 1, y: 1, z: 1, duration: 0.55, ease: 'back.out(1.4)', stagger: 0.4 },
      0.2,
    )
    return () => {
      tl.kill()
    }
  }, [entered, reducedMotion])

  // Ambient y-bob on signs, ±0.05, each aisle phase-offset so they breathe apart.
  useFrame((state) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < signRefs.current.length; i += 1) {
      const sign = signRefs.current[i]
      if (!sign) continue
      sign.position.y = SIGN_POS[1] + Math.sin(t * 1.1 + i * 2.1) * 0.05
    }
  })

  return (
    <group>
      {AISLE_X.map((x, i) => {
        const products = productsForAisle(i)
        const horizon = AISLE_COLORS[i]
        // Outer aisles angle toward centre; middle aisle faces camera flat.
        const signRotY = i === 0 ? SIGN_ROT_Y : i === 2 ? -SIGN_ROT_Y : 0
        return (
          <group
            key={i}
            ref={(g) => {
              aisleRefs.current[i] = g
            }}
            position={[x, 0, 0]}
          >
            {SHELF_ZS.map((z) => (
              <Shelf key={z} position={[0, SHELF_Y, z]} />
            ))}
            {products.map((p, pi) => {
              const y = shelfTopY + p.half
              const pos: [number, number, number] = [p.x, y, p.z]
              if (p.kind === 'tin')
                return <Tin key={pi} position={pos} color={horizon} />
              if (p.kind === 'bottle')
                return <Bottle key={pi} position={pos} accent={horizon} />
              return <Packet key={pi} position={pos} accent={horizon} />
            })}
            <group
              ref={(g) => {
                signRefs.current[i] = g
              }}
              position={SIGN_POS}
              rotation={[0, signRotY, 0]}
            >
              <AisleSign accent={horizon} />
            </group>
          </group>
        )
      })}
    </group>
  )
}
