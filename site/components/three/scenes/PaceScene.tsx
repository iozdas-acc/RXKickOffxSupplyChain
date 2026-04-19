'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import type { Group, Mesh } from 'three'
import { MeshStandardMaterial } from 'three'

import { Packet, Scanner, Tin, Trolley, TROLLEY_BASKET_TOP_Y } from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 3 — slow trolley (left) vs fast self-checkout scanner (right).
// Pace mismatch: traditional vs AI-enabled. Green accent zone.
// NOTE: Scanner primitive has no `active`/`beam` prop, so the scan beam is
// left at its constant primitive opacity. Pulsing would require mutating the
// primitive — out of scope for this scene file.

const ACCENT = CHAPTER_COLORS[2]
const FLOOR_Y = -3
const STAGE_Z = -2

const TROLLEY_START_X = -6
const TROLLEY_END_X = -1
const TROLLEY_SPEED = 0.3

const SCANNER_REST_X = 3.5
const SCANNER_ENTER_X = 6
const SCAN_SPAWN_X = 1
const SCAN_END_X = 6
const SCAN_SPEED = 3.5
const SCAN_Y = FLOOR_Y + 0.9 // mid-arch clearance
const SCAN_COUNT = 5

type Kind = 'tin' | 'packet'
const SCAN_KINDS: Kind[] = ['tin', 'packet', 'tin', 'packet', 'tin']

export function PaceScene({ entered }: { entered: boolean }) {
  const trolleyRef = useRef<Group>(null)
  const scannerRef = useRef<Group>(null)
  const scanRefs = useRef<Group[]>([])
  const flowStartedRef = useRef(false)

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Entrance: trolley fade + scale, scanner slide in. Flow starts 1.2s later.
  useEffect(() => {
    const trolley = trolleyRef.current
    const scanner = scannerRef.current
    if (!trolley || !scanner) return

    if (reducedMotion) {
      trolley.position.set(-3.5, FLOOR_Y, STAGE_Z)
      trolley.scale.setScalar(1)
      setGroupOpacity(trolley, 1)
      scanner.position.set(SCANNER_REST_X, FLOOR_Y, STAGE_Z)
      scanRefs.current.forEach((g, i) => {
        if (!g) return
        g.position.set(SCANNER_REST_X - 0.6 + (i - 2) * 0.2, SCAN_Y, STAGE_Z)
      })
      return
    }

    if (!entered) {
      trolley.scale.setScalar(0.8)
      setGroupOpacity(trolley, 0)
      scanner.position.set(SCANNER_ENTER_X, FLOOR_Y, STAGE_Z)
      flowStartedRef.current = false
      scanRefs.current.forEach((g) => g?.position.setX(SCAN_SPAWN_X - 100))
      return
    }

    const tl = gsap.timeline()
    const opacityProxy = { v: 0 }
    tl.to(trolley.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'power2.out' }, 0)
    tl.to(opacityProxy, {
      v: 1,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => setGroupOpacity(trolley, opacityProxy.v),
    }, 0)
    tl.to(scanner.position, {
      x: SCANNER_REST_X,
      duration: 0.7,
      ease: 'power2.out',
    }, 0)
    tl.call(() => { flowStartedRef.current = true }, [], 1.2)

    return () => { tl.kill() }
  }, [entered, reducedMotion])

  // Per-frame: trolley forward + wobble; scanner products fly through.
  useFrame((_, delta) => {
    if (reducedMotion) return
    const trolley = trolleyRef.current
    if (trolley && entered) {
      trolley.position.x += TROLLEY_SPEED * delta
      if (trolley.position.x > TROLLEY_END_X) trolley.position.x = TROLLEY_START_X
      const t = performance.now() * 0.001
      trolley.position.y = FLOOR_Y + Math.sin(t * 1.4) * 0.02
      trolley.rotation.z = Math.sin(t * 1.1) * 0.03
    }
    if (flowStartedRef.current) {
      const step = SCAN_SPEED * delta
      scanRefs.current.forEach((g) => {
        if (!g) return
        g.position.x += step
        if (g.position.x > SCAN_END_X) g.position.x = SCAN_SPAWN_X
      })
    }
  })

  return (
    <group>
      {/* LEFT — slow trolley with 3 loaded products */}
      <group ref={trolleyRef} position={[-3.5, FLOOR_Y, STAGE_Z]}>
        <Trolley />
        <Tin position={[-0.4, TROLLEY_BASKET_TOP_Y - 0.2, 0.1]} color={ACCENT} />
        <Packet position={[0.3, TROLLEY_BASKET_TOP_Y - 0.2, -0.15]} accent={ACCENT} />
        <Tin position={[0.1, TROLLEY_BASKET_TOP_Y + 0.05, 0.2]} color={ACCENT} />
      </group>

      {/* RIGHT — scanner arch, beam static per primitive contract */}
      <group ref={scannerRef} position={[SCANNER_REST_X, FLOOR_Y, STAGE_Z]}>
        <Scanner accent={ACCENT} />
      </group>

      {/* RIGHT — hurried stream of products. Staggered phases via x spread. */}
      {SCAN_KINDS.map((kind, i) => {
        const startX = SCAN_SPAWN_X + (i * (SCAN_END_X - SCAN_SPAWN_X)) / SCAN_COUNT
        const assign = (g: Group | null) => { if (g) scanRefs.current[i] = g }
        return (
          <group key={i} ref={assign} position={[startX, SCAN_Y, STAGE_Z]} scale={0.9}>
            {kind === 'tin' ? (
              <Tin color={ACCENT} />
            ) : (
              <Packet accent={ACCENT} />
            )}
          </group>
        )
      })}
    </group>
  )
}

// Traverse a group and set transparent opacity on every MeshStandardMaterial.
function setGroupOpacity(root: Group, opacity: number) {
  root.traverse((obj) => {
    const m = (obj as Mesh).material
    if (m instanceof MeshStandardMaterial) {
      m.transparent = opacity < 1
      m.opacity = opacity
    }
  })
}
