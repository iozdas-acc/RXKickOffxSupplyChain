'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import type { Group, Mesh, PointLight } from 'three'
import { MeshStandardMaterial } from 'three'

import { Packet, Scanner, Tin, Trolley, TROLLEY_BASKET_TOP_Y, Bottle } from '../primitives'
import { CHAPTER_COLORS } from '../chapterColors'

// Chapter 3 — the visible pace gap.
// LEFT:  a lone trolley creeping forward (traditional discovery — one item,
//        one step at a time).
// RIGHT: a self-checkout arch with a rapid stream of items tearing through,
//        each leaving an emissive streak trail that the bloom pass catches.
// CENTRE: a thin orange strip on the floor, the boundary between the two
//        paces. Pulses every time a scan completes.

const ACCENT = CHAPTER_COLORS[2] // Sainsbury's orange for Ch.3
const COOL_NEUTRAL = '#9EA4AE'
const FLOOR_Y = -3
const STAGE_Z = -2

// --- Traditional lane (left) ---
const TROLLEY_START_X = -6
const TROLLEY_END_X = -1.2
const TROLLEY_SPEED = 0.18 // deliberately glacial

// --- AI lane (right) ---
const SCANNER_X = 3.6
const SCANNER_ENTER_X = 6
const LANE_Y = FLOOR_Y + 0.6
const STREAM_START_X = 0.8
const STREAM_END_X = 6.5
const STREAM_LENGTH = STREAM_END_X - STREAM_START_X
const STREAM_SPEED = 4.2
const STREAM_COUNT = 10

type Kind = 'tin' | 'packet' | 'bottle'
const STREAM_KINDS: Kind[] = [
  'tin', 'packet', 'bottle', 'tin', 'packet',
  'bottle', 'tin', 'packet', 'bottle', 'tin',
]

export function PaceScene({ entered }: { entered: boolean }) {
  const trolleyRef = useRef<Group>(null)
  const scannerRef = useRef<Group>(null)
  const streamRefs = useRef<(Group | null)[]>([])
  const streakRefs = useRef<(Mesh | null)[]>([])
  const scanLightRef = useRef<PointLight | null>(null)
  const floorStripRef = useRef<Mesh | null>(null)
  const flowStartedRef = useRef(false)
  const wheelRotRef = useRef(0)

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Entrance — trolley fades in with scale, scanner slides in from offstage,
  // fast flow kicks off a beat later so the contrast reads.
  useEffect(() => {
    const trolley = trolleyRef.current
    const scanner = scannerRef.current
    if (!trolley || !scanner) return

    if (reducedMotion) {
      trolley.position.set(-3.5, FLOOR_Y, STAGE_Z)
      trolley.scale.setScalar(1)
      setGroupOpacity(trolley, 1)
      scanner.position.set(SCANNER_X, FLOOR_Y, STAGE_Z)
      streamRefs.current.forEach((g, i) => {
        if (!g) return
        g.position.set(STREAM_START_X + (i / STREAM_COUNT) * STREAM_LENGTH, LANE_Y, STAGE_Z)
      })
      return
    }

    if (!entered) {
      trolley.scale.setScalar(0.8)
      setGroupOpacity(trolley, 0)
      scanner.position.set(SCANNER_ENTER_X, FLOOR_Y, STAGE_Z)
      flowStartedRef.current = false
      streamRefs.current.forEach((g) => g?.position.setX(-100))
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
    tl.fromTo(scanner.position,
      { x: SCANNER_ENTER_X },
      { x: SCANNER_X, duration: 0.8, ease: 'power3.out' },
      0.15,
    )
    tl.call(() => { flowStartedRef.current = true }, [], 1.0)

    return () => { tl.kill() }
  }, [entered, reducedMotion])

  // Per-frame — trolley creep + wheel roll, rapid stream with streak trails,
  // scanner light pulse on scan, subtle strip breathe.
  useFrame((state, delta) => {
    const now = state.clock.elapsedTime

    // ── Trolley ──
    const trolley = trolleyRef.current
    if (trolley && entered && !reducedMotion) {
      trolley.position.x += TROLLEY_SPEED * delta
      if (trolley.position.x > TROLLEY_END_X) trolley.position.x = TROLLEY_START_X
      trolley.position.y = FLOOR_Y + Math.sin(now * 1.4) * 0.018
      trolley.rotation.z = Math.sin(now * 1.1) * 0.025
      wheelRotRef.current -= TROLLEY_SPEED * delta * 6
    }

    // ── Fast stream + streaks + scanner pulse ──
    let scanPulse = 0
    if (flowStartedRef.current && !reducedMotion) {
      const step = STREAM_SPEED * delta
      for (let i = 0; i < STREAM_COUNT; i++) {
        const g = streamRefs.current[i]
        if (!g) continue
        g.position.x += step
        if (g.position.x > STREAM_END_X) g.position.x = STREAM_START_X
        // Tumble slightly as they travel to add motion.
        g.rotation.y = now * 3 + i
        g.rotation.z = Math.sin(now * 4 + i * 0.6) * 0.15

        // Contribute to scan pulse when inside the arch window.
        const d = Math.abs(g.position.x - SCANNER_X)
        if (d < 0.9) {
          const strength = 1 - d / 0.9
          if (strength > scanPulse) scanPulse = strength
        }

        // Update the streak trail behind this product.
        const streak = streakRefs.current[i]
        if (streak) {
          // Streak sits a hair behind (−x) the product, length scales with
          // position in the chute so it feels like speed-up.
          streak.position.x = g.position.x - 0.5
          streak.position.y = g.position.y
          streak.position.z = g.position.z
        }
      }
    }

    if (scanLightRef.current) {
      // Base breathe + instant pulse on each scan.
      const breathe = 0.25 + (Math.sin(now * 3.5) * 0.5 + 0.5) * 0.35
      scanLightRef.current.intensity = breathe + scanPulse * 3.2
    }

    // Floor strip — subtle emissive breathing, spikes with scan pulse.
    if (floorStripRef.current) {
      const mat = floorStripRef.current.material as MeshStandardMaterial
      mat.emissiveIntensity = 0.35 + scanPulse * 0.9
    }
  })

  return (
    <group>
      {/* ── CENTRE floor divider strip ── */}
      <mesh
        ref={floorStripRef}
        position={[0, FLOOR_Y + 0.01, STAGE_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.06, 7]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.15}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ── LEFT lane — traditional trolley ── */}
      <group ref={trolleyRef} position={[-3.5, FLOOR_Y, STAGE_Z]}>
        <Trolley color={COOL_NEUTRAL} accent={COOL_NEUTRAL} />
        <group position={[-0.4, TROLLEY_BASKET_TOP_Y - 0.2, 0.1]}>
          <Tin color={COOL_NEUTRAL} />
        </group>
        <group position={[0.3, TROLLEY_BASKET_TOP_Y - 0.2, -0.15]} rotation={[0, 0.4, 0]}>
          <Packet />
        </group>
      </group>

      {/* ── RIGHT lane — scanner arch ── */}
      <group ref={scannerRef} position={[SCANNER_X, FLOOR_Y, STAGE_Z]}>
        <Scanner accent={ACCENT} />
      </group>

      {/* Pulsing point light above the scanner arch — bloom catches this. */}
      <pointLight
        ref={scanLightRef}
        position={[SCANNER_X, FLOOR_Y + 1.5, STAGE_Z + 0.1]}
        color={ACCENT}
        intensity={0.25}
        distance={6}
        decay={2}
      />

      {/* ── RIGHT lane — rapid product stream + streak trails ── */}
      {STREAM_KINDS.map((kind, i) => {
        const startX = STREAM_START_X + (i / STREAM_COUNT) * STREAM_LENGTH
        const assignProduct = (g: Group | null) => { streamRefs.current[i] = g }
        const assignStreak = (m: Mesh | null) => { streakRefs.current[i] = m }
        return (
          <group key={i}>
            {/* Streak trail — semi-transparent emissive box trailing the product.
                Positioned behind (−x) in useFrame. */}
            <mesh
              ref={assignStreak}
              position={[startX - 0.5, LANE_Y, STAGE_Z]}
              renderOrder={1}
            >
              <boxGeometry args={[0.9, 0.12, 0.12]} />
              <meshStandardMaterial
                color={ACCENT}
                emissive={ACCENT}
                emissiveIntensity={1.6}
                transparent
                opacity={0.45}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>

            <group ref={assignProduct} position={[startX, LANE_Y, STAGE_Z]} scale={0.88}>
              {kind === 'tin' ? (
                <Tin accent={ACCENT} />
              ) : kind === 'packet' ? (
                <Packet accent={ACCENT} />
              ) : (
                <Bottle accent={ACCENT} />
              )}
            </group>
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
