'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import type { Group } from 'three'

import { Bottle, Packet, Shelf, SHELF_TOP_Y, Tin } from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 1 — products drift down and settle onto a shelf, then drift gently.
// Primitive half-heights (Tin/Packet/Bottle): 0.2 / 0.275 / 0.375.

type Kind = 'tin' | 'packet' | 'bottle'
type Vec3 = [number, number, number]
interface Seed {
  kind: Kind
  float: Vec3; floatRot: Vec3; rest: Vec3; restRot: Vec3
  phase: number; tintedBody: boolean; tintedAccent: boolean
}

const SHELF_POS: Vec3 = [0, -1, -1]
const SHELF_TOP = SHELF_POS[1] + SHELF_TOP_Y
const HALF_H: Record<Kind, number> = { tin: 0.2, packet: 0.275, bottle: 0.375 }
const COUNTS: Record<Kind, number> = { tin: 8, packet: 8, bottle: 8 }
const TOTAL = COUNTS.tin + COUNTS.packet + COUNTS.bottle

// Deterministic PRNG — positions stay stable across renders.
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
  return kinds.map((kind, i) => {
    const row = i % 3, col = Math.floor(i / 3)
    return {
      kind,
      float: [(r() - 0.5) * 8, 4 + r() * 5, -3 + r() * 4] as Vec3,
      floatRot: [(r() - 0.5) * 1.2, (r() - 0.5) * 1.2, (r() - 0.5) * 0.8] as Vec3,
      rest: [
        -xSpan / 2 + (col / Math.max(perRow - 1, 1)) * xSpan,
        SHELF_TOP + HALF_H[kind],
        zRows[row] + (r() - 0.5) * 0.08,
      ] as Vec3,
      restRot: [0, (r() - 0.5) * 0.35, 0] as Vec3,
      phase: r() * Math.PI * 2,
      tintedBody: i % 3 === 0,
      tintedAccent: i % 2 === 0,
    }
  })
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function HeroScene({ entered }: { entered: boolean }) {
  const seeds = useMemo(buildSeeds, [])
  const refs = useRef<(Group | null)[]>([])
  const settled = useRef(false)
  const reduced = useMemo(prefersReducedMotion, [])
  const accent = CHAPTER_COLORS[0]

  // Initial pose — reduced-motion jumps straight to rest.
  useEffect(() => {
    refs.current.forEach((g, i) => {
      if (!g) return
      const s = seeds[i]
      const p = reduced ? s.rest : s.float
      const r = reduced ? s.restRot : s.floatRot
      g.position.set(p[0], p[1], p[2])
      g.rotation.set(r[0], r[1], r[2])
    })
    if (reduced) settled.current = true
  }, [seeds, reduced])

  // Entrance timeline — drift down to shelf, staggered.
  useEffect(() => {
    if (!entered || reduced) return
    const tl = gsap.timeline({ onComplete: () => { settled.current = true } })
    seeds.forEach((s, i) => {
      const g = refs.current[i]
      if (!g) return
      const duration = 1.4 + Math.random() * 0.8
      const delay = i * (0.05 + Math.random() * 0.07)
      tl.to(g.position, {
        x: s.rest[0], y: s.rest[1], z: s.rest[2],
        duration, ease: 'power3.out', delay,
      }, 0)
      tl.to(g.rotation, {
        x: s.restRot[0], y: s.restRot[1], z: s.restRot[2],
        duration, ease: 'power3.out', delay,
      }, 0)
    })
    return () => { tl.kill() }
  }, [entered, seeds, reduced])

  // Ambient motion once settled.
  useFrame((state) => {
    if (reduced || !settled.current) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < seeds.length; i++) {
      const g = refs.current[i]
      if (!g) continue
      const s = seeds[i]
      g.position.y = s.rest[1] + Math.sin(t * 0.9 + s.phase) * 0.03
      g.rotation.y = s.restRot[1] + Math.sin(t * 0.5 + s.phase) * 0.04
    }
  })

  return (
    <group>
      <Shelf position={SHELF_POS} />
      {seeds.map((s, i) => {
        const body = s.tintedBody ? accent : undefined
        const acc = s.tintedAccent ? accent : undefined
        const setRef = (el: Group | null) => { refs.current[i] = el }
        if (s.kind === 'tin') return <group key={i} ref={setRef}><Tin color={body} accent={acc} /></group>
        if (s.kind === 'packet') return <group key={i} ref={setRef}><Packet color={body} accent={acc} /></group>
        return <group key={i} ref={setRef}><Bottle color={body} accent={acc} /></group>
      })}
    </group>
  )
}
