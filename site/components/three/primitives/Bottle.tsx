'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  NEUTRAL_BODY,
  type PrimitiveProps,
} from './types'

// Abstracted bottle — tall cylinder body + tapered shoulder + narrow neck + cap.
// Local dimensions: total height ~0.75. Keeps the silhouette recognisable
// without detail (no bottleneck curves, just three stacked cylinders).
const BODY_RADIUS = 0.22
const BODY_HEIGHT = 0.48
const SHOULDER_HEIGHT = 0.08
const NECK_RADIUS = 0.09
const NECK_HEIGHT = 0.14
const CAP_RADIUS = 0.11
const CAP_HEIGHT = 0.06

export function Bottle({
  position,
  rotation,
  scale,
  color = NEUTRAL_BODY,
  accent = NEUTRAL_ACCENT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  const shoulderY = BODY_HEIGHT / 2 + SHOULDER_HEIGHT / 2
  const neckY = shoulderY + SHOULDER_HEIGHT / 2 + NECK_HEIGHT / 2
  const capY = neckY + NECK_HEIGHT / 2 + CAP_HEIGHT / 2

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[BODY_RADIUS, BODY_RADIUS, BODY_HEIGHT, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Shoulder taper — body radius down to neck radius */}
      <mesh castShadow position={[0, shoulderY, 0]}>
        <cylinderGeometry
          args={[NECK_RADIUS, BODY_RADIUS, SHOULDER_HEIGHT, 24]}
        />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Neck */}
      <mesh castShadow position={[0, neckY, 0]}>
        <cylinderGeometry args={[NECK_RADIUS, NECK_RADIUS, NECK_HEIGHT, 20]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Cap — accent colour for contrast */}
      <mesh castShadow position={[0, capY, 0]}>
        <cylinderGeometry args={[CAP_RADIUS, CAP_RADIUS, CAP_HEIGHT, 20]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
