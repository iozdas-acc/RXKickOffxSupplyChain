'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, PointLight } from 'three'

import { Bottle, Packet, Shelf, SHELF_TOP_Y, Tin, Trolley, TROLLEY_BASKET_TOP_Y } from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 1 / landing — a Sainsbury's shelf being stocked in real time.
// On mount, every product tumbles in from above with staggered timing and a
// back-out landing bounce. Once stocked, a subtle ambient bob kicks in and a
// trolley loops across the foreground. An orange point-light above the shelf
// pulses as products land so the bloom pass registers each impact.

type Kind = 'tin' | 'packet' | 'bottle'
type Vec3 = [number, number, number]
interface Seed {
  kind: Kind
  rest: Vec3
  restRot: Vec3
  phase: number
  tintedBody: boolean
  tintedAccent: boolean
  dropHeight: number
  spinAxis: Vec3
  spinAmount: number
  lateral: number
  order: number // index in the stocking sequence (front rows land first)
}

const SHELF_POS: Vec3 = [0, -1, -1]
const SHELF_TOP = SHELF_POS[1] + SHELF_TOP_Y
const HALF_H: Record<Kind, number> = { tin: 0.2, packet: 0.275, bottle: 0.375 }
const COUNTS: Record<Kind, number> = { tin: 8, packet: 8, bottle: 8 }
const TOTAL = COUNTS.tin + COUNTS.packet + COUNTS.bottle

const FLOOR_Y = -3
const SAINSBURYS_ORANGE = CHAPTER_COLORS[0] // #F06C00

// Stocking animation tuning — calibrated so the whole wave finishes inside the
// hero-moment window before content fades in.
const STOCK_STAGGER = 0.04    // seconds between each product starting to fall
const STOCK_DURATION = 0.9    // seconds per product fall
const STOCK_TOTAL = STOCK_STAGGER * (TOTAL - 1) + STOCK_DURATION

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = seed
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildSeeds(): Seed[] {
  const r = mulberry32(17)
  const kinds: Kind[] = [
    ...Array(COUNTS.tin).fill('tin') as Kind[],
    ...Array(COUNTS.packet).fill('packet') as Kind[],
    ...Array(COUNTS.bottle).fill('bottle') as Kind[],
  ]
  const perRow = Math.ceil(TOTAL / 3)
  const xSpan = 5.2
  const zRows = [-1.25, -1.0, -0.75]

  // Pass 1 — build rest positions.
  const seeds: Seed[] = kinds.map((kind, i) => {
    const row = i % 3, col = Math.floor(i / 3)
    const axis: Vec3 = [r() - 0.5, r() - 0.5, r() - 0.5]
    const len = Math.hypot(axis[0], axis[1], axis[2]) || 1
    return {
      kind,
      rest: [
        -xSpan / 2 + (col / Math.max(perRow - 1, 1)) * xSpan,
        SHELF_TOP + HALF_H[kind],
        zRows[row] + (r() - 0.5) * 0.08,
      ] as Vec3,
      restRot: [0, (r() - 0.5) * 0.35, 0] as Vec3,
      phase: r() * Math.PI * 2,
      tintedBody: i % 2 === 0,
      tintedAccent: i % 2 === 1,
      dropHeight: 5.5 + r() * 1.5,
      spinAxis: [axis[0] / len, axis[1] / len, axis[2] / len],
      spinAmount: (0.9 + r() * 0.8) * Math.PI * 2,
      lateral: (r() - 0.5) * 0.6,
      order: 0,
    }
  })

  // Pass 2 — stocking order: back row first, then middle, then front. Within a
  // row, progress from centre outwards so the wave radiates. This reads as a
  // shopkeeper stocking the shelf rather than a random shower.
  const withSort = seeds
    .map((s, i) => ({ s, i }))
    .sort((a, b) => {
      const rowA = Math.abs(a.s.rest[2] - zRows[0])
      const rowB = Math.abs(b.s.rest[2] - zRows[0])
      if (rowA !== rowB) return rowA - rowB // back → front
      return Math.abs(a.s.rest[0]) - Math.abs(b.s.rest[0]) // centre → edges
    })
  withSort.forEach(({ s }, order) => { s.order = order })

  return seeds
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function easeOutBack(x: number, s = 1.55) {
  if (x <= 0) return 0
  if (x >= 1) return 1
  return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2)
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// Trolley loops smoothly across the foreground. Start/end sit past the
// frustum so the wrap is invisible.
const TROLLEY_Z = 1.6
const TROLLEY_X_MAX = 9
const TROLLEY_X_MIN = -9
const TROLLEY_RANGE = TROLLEY_X_MAX - TROLLEY_X_MIN
const TROLLEY_SPEED = 0.8

export function HeroScene({ entered: _entered }: { entered: boolean }) {
  const seeds = useMemo(buildSeeds, [])
  const refs = useRef<(Group | null)[]>([])
  const trolleyRef = useRef<Group | null>(null)
  const stockLightRef = useRef<PointLight | null>(null)
  const shelfGroupRef = useRef<Group | null>(null)
  const reduced = useMemo(prefersReducedMotion, [])
  const accent = SAINSBURYS_ORANGE
  // Captured on first frame so progress is relative to mount time, not the
  // absolute clock (scene gets a fresh `key` on `entered` flip → fresh mount).
  const startT = useRef<number | null>(null)

  useFrame((state) => {
    const now = state.clock.elapsedTime
    if (startT.current === null) startT.current = now
    const elapsed = now - startT.current

    // --- Shelf breathe-in: fade up scale over the first 0.35s so the rail
    //     and supports appear with the first product instead of being
    //     pre-painted on screen. ---
    if (shelfGroupRef.current) {
      const s = reduced ? 1 : 0.92 + smoothstep(0, 0.45, elapsed) * 0.08
      shelfGroupRef.current.scale.setScalar(s)
    }

    // --- Product stocking + bob ---
    let peakFlash = 0
    for (let i = 0; i < seeds.length; i++) {
      const g = refs.current[i]
      if (!g) continue
      const s = seeds[i]

      const itemStart = s.order * STOCK_STAGGER
      const rawP = reduced
        ? 1
        : Math.max(0, Math.min(1, (elapsed - itemStart) / STOCK_DURATION))
      const p = easeOutBack(rawP)
      const inv = 1 - p

      const dropOffset = inv * s.dropHeight
      const lateralOffset = inv * s.lateral

      const spinT = (1 - rawP) * s.spinAmount
      g.rotation.x = s.spinAxis[0] * spinT
      g.rotation.y = s.restRot[1] + s.spinAxis[1] * spinT
      g.rotation.z = s.spinAxis[2] * spinT

      const bobAmp = smoothstep(0.9, 1, rawP) * 0.03
      const bob = reduced ? 0 : Math.sin(now * 0.9 + s.phase) * bobAmp
      const driftRot = reduced ? 0 : Math.sin(now * 0.5 + s.phase) * 0.04 * p

      g.position.x = s.rest[0] + lateralOffset
      g.position.y = s.rest[1] + dropOffset + bob
      g.position.z = s.rest[2]
      g.rotation.y += driftRot

      const scalePop = 0.9 + smoothstep(0.78, 1, rawP) * 0.1
      g.scale.setScalar(scalePop)

      // Contribution to the bloom pulse — peaks ~90% through each drop.
      const flash =
        smoothstep(0.82, 0.95, rawP) * (1 - smoothstep(0.95, 1.0, rawP))
      if (flash > peakFlash) peakFlash = flash
    }

    // --- Stock-moment light pulse (bloom-visible) ---
    if (stockLightRef.current) {
      const globalFalloff = 1 - smoothstep(STOCK_TOTAL, STOCK_TOTAL + 0.7, elapsed)
      stockLightRef.current.intensity = peakFlash * 3.0 * globalFalloff
    }

    // --- Trolley loop ---
    if (trolleyRef.current) {
      const phase = (now * TROLLEY_SPEED) % TROLLEY_RANGE
      trolleyRef.current.position.x = TROLLEY_X_MAX - phase
      trolleyRef.current.position.y =
        FLOOR_Y + (reduced ? 0 : Math.sin(now * 7) * 0.015)
    }
  })

  return (
    <group>
      <group ref={shelfGroupRef}>
        <Shelf position={SHELF_POS} accent={accent} />

        {/* Shelf-edge price strip — thin orange rail on the front lip. Emits
            a tiny amount so the bloom pass renders it as Sainsbury's signage
            instead of just a colour swatch. */}
        <mesh
          position={[SHELF_POS[0], SHELF_POS[1] + SHELF_TOP_Y - 0.04, SHELF_POS[2] + 0.6]}
          castShadow
        >
          <boxGeometry args={[5.6, 0.06, 0.03]} />
          <meshStandardMaterial
            color={accent}
            roughness={0.35}
            metalness={0.2}
            emissive={accent}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Stock-pulse light — tucked just above shelf height, invisible until
          the wave of drops triggers it via useFrame. */}
      <pointLight
        ref={stockLightRef}
        position={[SHELF_POS[0], SHELF_POS[1] + SHELF_TOP_Y + 0.9, SHELF_POS[2] + 0.5]}
        color={accent}
        intensity={0}
        distance={8}
        decay={2}
      />

      {seeds.map((s, i) => {
        const body = s.tintedBody ? accent : undefined
        const acc = s.tintedAccent ? accent : undefined
        const setRef = (el: Group | null) => { refs.current[i] = el }
        if (s.kind === 'tin') return (
          <group key={i} ref={setRef}>
            <Tin color={body} accent={acc} />
          </group>
        )
        if (s.kind === 'packet') return (
          <group key={i} ref={setRef}>
            <Packet color={body} accent={acc} />
          </group>
        )
        return (
          <group key={i} ref={setRef}>
            <Bottle color={body} accent={acc} />
          </group>
        )
      })}

      {/* Shopping trolley — rolls right → left in a continuous loop. */}
      <group ref={trolleyRef} position={[TROLLEY_X_MAX, FLOOR_Y, TROLLEY_Z]}>
        <Trolley accent={accent} />
        <group position={[-0.4, TROLLEY_BASKET_TOP_Y - 0.45, 0]}>
          <Tin color={accent} />
        </group>
        <group position={[0.15, TROLLEY_BASKET_TOP_Y - 0.40, -0.1]} rotation={[0, 0.4, 0]}>
          <Packet accent={accent} />
        </group>
        <group position={[0.55, TROLLEY_BASKET_TOP_Y - 0.35, 0.15]}>
          <Bottle color={accent} />
        </group>
      </group>
    </group>
  )
}
