'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

// RX hero companion — classic hand-held shopping basket with three products
// arriving in sequence. Plays ONCE on mount, then holds the final state
// forever (no fade, no loop). Transparent canvas, static camera,
// MeshToonMaterial only. Ref shape: wider-than-tall plastic tub base,
// thin dark wire cage above it, single curved handle arching over the top.

const ORANGE = '#F06C00'
const ORANGE_INK = '#C94B0A'
const CHARCOAL = '#2A2A2A'
const OFFWHITE = '#F4F1EA'

// Phase boundaries (absolute seconds since mount — no cycle wrap).
const P1_IN = 0.25
const P1_LAND = 1.15
const P2_IN = 1.55
const P2_LAND = 2.45
const P3_IN = 2.85
const P3_LAND = 3.55

type V3 = readonly [number, number, number]

// Product start/end positions. Ends are inside the basket, resting on top of
// the solid orange tub (tub top sits at world y ≈ -0.02 after the basket is
// offset so its centre-of-mass lines up with the camera target).
const P1_START: V3 = [2.8, 2.6, 0.55]
const P1_END:   V3 = [-0.55, 0.06,  0.22]
const P2_START: V3 = [-2.8, 2.6, 0.35]
const P2_END:   V3 = [ 0.48, 0.16, -0.26]
const P3_START: V3 = [0.10, 3.0, 0.25]
const P3_END:   V3 = [0.06, 0.07,  0.28]

function clamp01(u: number) {
  return Math.min(1, Math.max(0, u))
}

function easeOutCubic(u: number) {
  return 1 - Math.pow(1 - u, 3)
}

function arcPos(u: number, s: V3, e: V3, peak: number): V3 {
  const c = clamp01(u)
  const eased = easeOutCubic(c)
  const y = s[1] + (e[1] - s[1]) * eased + Math.sin(Math.PI * c) * peak
  return [
    s[0] + (e[0] - s[0]) * eased,
    y,
    s[2] + (e[2] - s[2]) * eased,
  ]
}

function bounce(dt: number, amp = 0.06) {
  return amp * Math.exp(-9 * dt) * Math.sin(22 * dt)
}

export function BasketAnimation() {
  const basketRef = useRef<Group>(null)
  const p1Ref = useRef<Group>(null)
  const p2Ref = useRef<Group>(null)
  const p3Ref = useRef<Group>(null)
  // Captured on first frame so T is relative to mount, not the shared
  // r3f clock that may already be ticking when we arrive.
  const startT = useRef<number | null>(null)
  // Once all three products have landed we stop writing to refs entirely —
  // the scene is frozen at its final state. No opacity mutation, no per-
  // frame position churn, nothing left to flicker.
  const finished = useRef(false)

  useFrame((state) => {
    if (finished.current) return
    if (startT.current === null) startT.current = state.clock.elapsedTime
    const T = state.clock.elapsedTime - startT.current

    // Basket stays put — anchored so the basket centre sits on the camera's
    // look-at line (origin). TOTAL_H / 2 ≈ 0.435 → base at y ≈ -0.44.
    if (basketRef.current) {
      basketRef.current.position.y = -0.44
    }

    // Product 1 — orange tin, arcs in from top-right
    if (p1Ref.current) {
      if (T < P1_IN) {
        p1Ref.current.visible = false
      } else if (T < P1_LAND) {
        p1Ref.current.visible = true
        const u = (T - P1_IN) / (P1_LAND - P1_IN)
        const [x, y, z] = arcPos(u, P1_START, P1_END, 0.85)
        p1Ref.current.position.set(x, y, z)
        p1Ref.current.rotation.z = (1 - u) * 0.6
      } else {
        p1Ref.current.visible = true
        const dt = T - P1_LAND
        p1Ref.current.position.set(P1_END[0], P1_END[1] + bounce(dt, 0.06), P1_END[2])
        p1Ref.current.rotation.z = 0
      }
    }

    // Product 2 — tall offwhite packet, arcs in from top-left
    if (p2Ref.current) {
      if (T < P2_IN) {
        p2Ref.current.visible = false
      } else if (T < P2_LAND) {
        p2Ref.current.visible = true
        const u = (T - P2_IN) / (P2_LAND - P2_IN)
        const [x, y, z] = arcPos(u, P2_START, P2_END, 0.85)
        p2Ref.current.position.set(x, y, z)
        p2Ref.current.rotation.z = -(1 - u) * 0.5
      } else {
        p2Ref.current.visible = true
        const dt = T - P2_LAND
        p2Ref.current.position.set(P2_END[0], P2_END[1] + bounce(dt, 0.05), P2_END[2])
        p2Ref.current.rotation.z = 0
      }
    }

    // Product 3 — dark box, drops straight down, accelerating
    if (p3Ref.current) {
      if (T < P3_IN) {
        p3Ref.current.visible = false
      } else if (T < P3_LAND) {
        p3Ref.current.visible = true
        const u = (T - P3_IN) / (P3_LAND - P3_IN)
        const fall = u * u
        p3Ref.current.position.set(
          P3_START[0],
          P3_START[1] + (P3_END[1] - P3_START[1]) * fall,
          P3_START[2]
        )
      } else {
        p3Ref.current.visible = true
        const dt = T - P3_LAND
        p3Ref.current.position.set(P3_END[0], P3_END[1] + bounce(dt, 0.045), P3_END[2])
      }
    }

    // After the last product has fully settled (bounce decayed below a
    // visible threshold), snap everything to rest and stop updating. This
    // guarantees there is no residual motion that could read as a flicker.
    if (T > P3_LAND + 1.2) {
      p1Ref.current?.position.set(P1_END[0], P1_END[1], P1_END[2])
      p2Ref.current?.position.set(P2_END[0], P2_END[1], P2_END[2])
      p3Ref.current?.position.set(P3_END[0], P3_END[1], P3_END[2])
      finished.current = true
    }
  })

  return (
    // Scale + position wrap — scale halves the basket so it reads as a
    // confident-but-not-dominant hero object. Position offset shifts the
    // composition left (closing the dead space between text and canvas)
    // and up (so the tub's visual centre of mass sits on the same
    // horizontal axis as the headline, not below it).
    <group scale={0.72} position={[-0.45, 0.22, 0]}>
      {/* Lights — one warm directional key + soft ambient for the toon shader */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 3]} intensity={2} />

      {/* Basket — anchored in useFrame so its centre sits on camera axis */}
      <group ref={basketRef}>
        <Basket />
      </group>

      {/* Product 1 — short wide tin (orange), scaled up for the hero basket */}
      <group ref={p1Ref} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.15, 30]} />
          <meshToonMaterial color={ORANGE} />
        </mesh>
        <mesh position={[0, 0.078, 0]}>
          <cylinderGeometry args={[0.224, 0.224, 0.016, 30]} />
          <meshToonMaterial color={CHARCOAL} />
        </mesh>
        <mesh position={[0, -0.078, 0]}>
          <cylinderGeometry args={[0.224, 0.224, 0.016, 30]} />
          <meshToonMaterial color={ORANGE_INK} />
        </mesh>
      </group>

      {/* Product 2 — tall offwhite packet with an orange cap band */}
      <group ref={p2Ref} visible={false}>
        <mesh>
          <boxGeometry args={[0.19, 0.36, 0.19]} />
          <meshToonMaterial color={OFFWHITE} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.196, 0.08, 0.196]} />
          <meshToonMaterial color={ORANGE} />
        </mesh>
      </group>

      {/* Product 3 — low charcoal box with an orange seal strip */}
      <group ref={p3Ref} visible={false}>
        <mesh>
          <boxGeometry args={[0.32, 0.18, 0.32]} />
          <meshToonMaterial color={CHARCOAL} />
        </mesh>
        <mesh position={[0, 0.093, 0]}>
          <boxGeometry args={[0.26, 0.012, 0.26]} />
          <meshToonMaterial color={ORANGE} />
        </mesh>
      </group>
    </group>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Basket — hero-scaled, wider than tall. Solid orange plastic tub on the
// bottom, thin dark wire cage on the top (with gaps, not solid panels), and
// a single curved handle arching over the long axis.
// ──────────────────────────────────────────────────────────────────────────

const W = 2.4            // width  (x) — long axis
const D = 1.5            // depth  (z)
const SOLID_H = 0.42     // solid plastic tub height
const WIRE_H = 0.45      // wire cage section above the tub
const TOTAL_H = SOLID_H + WIRE_H // 0.87 — significantly wider than tall

const POST = 0.05        // wire corner post thickness
const BAR = 0.034        // wire bar thickness
const HANDLE_TUBE = 0.04 // handle tube radius
const HANDLE_SPAN = W * 0.42  // pivot distance from basket centre (x)
const HANDLE_RISE = 0.62      // peak height above the rim

function Basket() {
  const halfW = W / 2
  const halfD = D / 2
  const rimY = TOTAL_H
  const wireMidY = SOLID_H + WIRE_H / 2

  // Handle — single flattened arch swept along a Catmull-Rom curve. Five
  // control points give it an elliptical rise (not a pure semicircle) so it
  // reads like a real shopping-basket handle, not a croquet hoop.
  const handleCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-HANDLE_SPAN, rimY - 0.01, 0),
        new THREE.Vector3(-HANDLE_SPAN * 0.55, rimY + HANDLE_RISE * 0.88, 0),
        new THREE.Vector3(0, rimY + HANDLE_RISE, 0),
        new THREE.Vector3(HANDLE_SPAN * 0.55, rimY + HANDLE_RISE * 0.88, 0),
        new THREE.Vector3(HANDLE_SPAN, rimY - 0.01, 0),
      ],
      false,
      'catmullrom',
      0.5
    )
  }, [])

  // Wire-cage corner post XZ positions (all four corners).
  const corners: Array<readonly [number, number]> = [
    [-halfW + POST / 2, -halfD + POST / 2],
    [ halfW - POST / 2, -halfD + POST / 2],
    [-halfW + POST / 2,  halfD - POST / 2],
    [ halfW - POST / 2,  halfD - POST / 2],
  ]

  // Vertical ribs along the long front/back walls — three per wall so the
  // cage reads as a grid of gaps, not a solid panel.
  const ribXs = [-W * 0.28, 0, W * 0.28]

  return (
    <group>
      {/* ══ Solid orange tub ══ */}

      {/* Underside — darker orange so the lit top face reads as the "top" */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[W, 0.07, D]} />
        <meshToonMaterial color={ORANGE_INK} />
      </mesh>

      {/* Four tub walls */}
      <mesh position={[0, SOLID_H / 2 + 0.005, halfD - 0.045]}>
        <boxGeometry args={[W, SOLID_H, 0.09]} />
        <meshToonMaterial color={ORANGE} />
      </mesh>
      <mesh position={[0, SOLID_H / 2 + 0.005, -halfD + 0.045]}>
        <boxGeometry args={[W, SOLID_H, 0.09]} />
        <meshToonMaterial color={ORANGE} />
      </mesh>
      <mesh position={[-halfW + 0.045, SOLID_H / 2 + 0.005, 0]}>
        <boxGeometry args={[0.09, SOLID_H, D]} />
        <meshToonMaterial color={ORANGE} />
      </mesh>
      <mesh position={[halfW - 0.045, SOLID_H / 2 + 0.005, 0]}>
        <boxGeometry args={[0.09, SOLID_H, D]} />
        <meshToonMaterial color={ORANGE} />
      </mesh>

      {/* Rim lip around the top of the tub — deeper orange, gives a clean
          break between the plastic and the wire cage */}
      <mesh position={[0, SOLID_H + 0.025, halfD - 0.03]}>
        <boxGeometry args={[W, 0.05, 0.06]} />
        <meshToonMaterial color={ORANGE_INK} />
      </mesh>
      <mesh position={[0, SOLID_H + 0.025, -halfD + 0.03]}>
        <boxGeometry args={[W, 0.05, 0.06]} />
        <meshToonMaterial color={ORANGE_INK} />
      </mesh>
      <mesh position={[-halfW + 0.03, SOLID_H + 0.025, 0]}>
        <boxGeometry args={[0.06, 0.05, D]} />
        <meshToonMaterial color={ORANGE_INK} />
      </mesh>
      <mesh position={[halfW - 0.03, SOLID_H + 0.025, 0]}>
        <boxGeometry args={[0.06, 0.05, D]} />
        <meshToonMaterial color={ORANGE_INK} />
      </mesh>

      {/* ══ Wire cage (thin dark bars, plenty of gap) ══ */}

      {/* 4 corner posts */}
      {corners.map(([x, z], i) => (
        <mesh key={`post-${i}`} position={[x, wireMidY, z]}>
          <boxGeometry args={[POST, WIRE_H, POST]} />
          <meshToonMaterial color={CHARCOAL} />
        </mesh>
      ))}

      {/* Top rim (4 bars) */}
      <mesh position={[0, rimY - BAR / 2, -halfD + BAR / 2]}>
        <boxGeometry args={[W, BAR, BAR]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[0, rimY - BAR / 2,  halfD - BAR / 2]}>
        <boxGeometry args={[W, BAR, BAR]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[-halfW + BAR / 2, rimY - BAR / 2, 0]}>
        <boxGeometry args={[BAR, BAR, D]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[ halfW - BAR / 2, rimY - BAR / 2, 0]}>
        <boxGeometry args={[BAR, BAR, D]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>

      {/* Mid horizontal ring — thin bars halfway up the cage */}
      <mesh position={[0, wireMidY, -halfD + BAR * 0.4]}>
        <boxGeometry args={[W - POST * 1.3, BAR * 0.75, BAR * 0.75]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[0, wireMidY,  halfD - BAR * 0.4]}>
        <boxGeometry args={[W - POST * 1.3, BAR * 0.75, BAR * 0.75]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[-halfW + BAR * 0.4, wireMidY, 0]}>
        <boxGeometry args={[BAR * 0.75, BAR * 0.75, D - POST * 1.3]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[ halfW - BAR * 0.4, wireMidY, 0]}>
        <boxGeometry args={[BAR * 0.75, BAR * 0.75, D - POST * 1.3]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>

      {/* Vertical ribs on the two long walls — spaced to create visible gaps */}
      {ribXs.map((x, i) => (
        <group key={`rib-${i}`}>
          <mesh position={[x, wireMidY, -halfD + BAR * 0.4]}>
            <boxGeometry args={[BAR * 0.75, WIRE_H * 0.95, BAR * 0.75]} />
            <meshToonMaterial color={CHARCOAL} />
          </mesh>
          <mesh position={[x, wireMidY,  halfD - BAR * 0.4]}>
            <boxGeometry args={[BAR * 0.75, WIRE_H * 0.95, BAR * 0.75]} />
            <meshToonMaterial color={CHARCOAL} />
          </mesh>
        </group>
      ))}

      {/* ══ Single curved handle ══ */}
      <mesh>
        <tubeGeometry args={[handleCurve, 64, HANDLE_TUBE, 12, false]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>

      {/* Handle pivot caps — short cylinders where the arch meets the rim */}
      <mesh position={[-HANDLE_SPAN, rimY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[HANDLE_TUBE * 1.35, HANDLE_TUBE * 1.35, BAR * 1.8, 14]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
      <mesh position={[HANDLE_SPAN, rimY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[HANDLE_TUBE * 1.35, HANDLE_TUBE * 1.35, BAR * 1.8, 14]} />
        <meshToonMaterial color={CHARCOAL} />
      </mesh>
    </group>
  )
}
