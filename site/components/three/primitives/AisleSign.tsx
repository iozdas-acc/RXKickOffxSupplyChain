'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  type PrimitiveProps,
} from './types'

// Overhead aisle sign — billboard plane + a thin coloured underline stripe.
// Phase 3.0 decision (c): no 3D text. Labels (H1/H2/H3) render as DOM overlay
// in the chapter component, not in the Canvas, since drei isn't installed
// and full 3D text via loaders is too heavy for the placeholder round.
//
// Local geometry: sign centred at group origin, ~2.2 wide × 0.7 tall,
// stripe runs along the bottom edge at 10% height.
const SIGN_WIDTH = 2.2
const SIGN_HEIGHT = 0.7
const SIGN_THICKNESS = 0.06
const STRIPE_HEIGHT = SIGN_HEIGHT * 0.12

// Neutral card surface colour keeps the sign reading "clean shop fitting"
// while the chapter accent drives the stripe.
const SIGN_BODY = '#F0EEE8'

export function AisleSign({
  position,
  rotation,
  scale,
  color = SIGN_BODY,
  accent,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Sign body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[SIGN_WIDTH, SIGN_HEIGHT, SIGN_THICKNESS]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      {/* Coloured underline stripe — chapter accent when provided */}
      {accent && (
        <mesh
          position={[0, -SIGN_HEIGHT / 2 + STRIPE_HEIGHT / 2, SIGN_THICKNESS / 2 + 0.002]}
        >
          <planeGeometry args={[SIGN_WIDTH * 0.98, STRIPE_HEIGHT]} />
          <meshStandardMaterial
            color={accent}
            roughness={0.4}
            metalness={0.1}
            emissive={accent}
            emissiveIntensity={0.15}
          />
        </mesh>
      )}
    </group>
  )
}

export const AISLE_SIGN_DIMENSIONS = {
  width: SIGN_WIDTH,
  height: SIGN_HEIGHT,
}
