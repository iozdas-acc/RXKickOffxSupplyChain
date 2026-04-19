'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  type PrimitiveProps,
} from './types'

// Horizontal shelf — one top plank + two thin supports.
// Products sit on the top surface. The top face y-coord (local) is +TOP_Y,
// so a scene placing products at y = shelf.position.y + TOP_Y rests them
// on the plank without gaps. PHASE 3.1 NOTE: TOP_Y = PLANK_THICKNESS / 2.
const WIDTH = 6
const PLANK_THICKNESS = 0.08
const DEPTH = 1.2
const SUPPORT_WIDTH = 0.12
const SUPPORT_HEIGHT = 0.6
const TOP_Y = PLANK_THICKNESS / 2 // relative to shelf group origin

// Warm neutral wood-tone default — not a chapter accent.
const SHELF_BODY = '#E8DFCC'

export function Shelf({
  position,
  rotation,
  scale,
  color = SHELF_BODY,
  accent = NEUTRAL_ACCENT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Plank — top surface at y = TOP_Y */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH, PLANK_THICKNESS, DEPTH]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Left support */}
      <mesh
        castShadow
        receiveShadow
        position={[-WIDTH / 2 + SUPPORT_WIDTH, -SUPPORT_HEIGHT / 2, 0]}
      >
        <boxGeometry args={[SUPPORT_WIDTH, SUPPORT_HEIGHT, DEPTH * 0.85]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      {/* Right support */}
      <mesh
        castShadow
        receiveShadow
        position={[WIDTH / 2 - SUPPORT_WIDTH, -SUPPORT_HEIGHT / 2, 0]}
      >
        <boxGeometry args={[SUPPORT_WIDTH, SUPPORT_HEIGHT, DEPTH * 0.85]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

// Export so scenes can align products to the shelf's top face.
export const SHELF_TOP_Y = TOP_Y
