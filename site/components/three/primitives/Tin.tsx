'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  NEUTRAL_BODY,
  type PrimitiveProps,
} from './types'

// Abstracted tin can — short cylinder, ~3:4 aspect, rounded top/bottom disc.
// Phase 3.1 (HeroScene) stacks these on a Shelf; Ch.5 drops them into a Basket.
// Local dimensions: radius 0.3, height 0.4. Scene can `scale` to taste.
const RADIUS = 0.3
const HEIGHT = 0.4
const LID_THICKNESS = 0.03

export function Tin({
  position,
  rotation,
  scale,
  color = NEUTRAL_BODY,
  accent = NEUTRAL_ACCENT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[RADIUS, RADIUS, HEIGHT, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Top lid disc — slightly darker rim for silhouette readability */}
      <mesh castShadow position={[0, HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[RADIUS * 1.02, RADIUS * 1.02, LID_THICKNESS, 24]}
        />
        <meshStandardMaterial
          color={accent}
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>
      {/* Bottom lid disc */}
      <mesh castShadow position={[0, -HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[RADIUS * 1.02, RADIUS * 1.02, LID_THICKNESS, 24]}
        />
        <meshStandardMaterial
          color={accent}
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>
    </group>
  )
}
