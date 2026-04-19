'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  NEUTRAL_BODY,
  type PrimitiveProps,
} from './types'

// Abstracted rectangular packet (think cereal box / snack bag).
// Slightly rounded via bevel-style edges using a scaled BoxGeometry plus
// thin inset "stripe" plane that reads as label band at low poly.
// Local dimensions: width 0.42, height 0.55, depth 0.18 (~3:4 aspect).
const WIDTH = 0.42
const HEIGHT = 0.55
const DEPTH = 0.18

export function Packet({
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
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Accent band — low-poly stand-in for a label, 1/3 up from the base */}
      <mesh position={[0, -HEIGHT * 0.1, DEPTH / 2 + 0.001]}>
        <planeGeometry args={[WIDTH * 0.96, HEIGHT * 0.22]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}
