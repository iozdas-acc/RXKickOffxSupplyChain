'use client'

import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  type PrimitiveProps,
} from './types'

// Self-checkout scanner — inverted-U arch with a thin scan beam plane
// stretched horizontally through the opening. Phase 3.3 (PaceScene) can
// animate the beam with GSAP; Phase 3.0 just places it statically.
//
// Local dimensions: arch ~1.8 wide × 1.6 tall × 0.2 deep, posts 0.15 thick.
// Arch top crossbar holds the scan beam ~70% of the way up.
const ARCH_WIDTH = 1.8
const ARCH_HEIGHT = 1.6
const POST_THICKNESS = 0.15
const POST_DEPTH = 0.2
const CROSSBAR_HEIGHT = 0.18
const BEAM_HEIGHT = ARCH_HEIGHT * 0.55

// Scanner body default — cool neutral grey, chapter accent goes on the beam.
const SCANNER_BODY = '#D4D8DE'
const BEAM_DEFAULT = '#059669' // Ch.3 emerald fallback if no accent passed.

export function Scanner({
  position,
  rotation,
  scale,
  color = SCANNER_BODY,
  accent = BEAM_DEFAULT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left post */}
      <mesh
        castShadow
        receiveShadow
        position={[-ARCH_WIDTH / 2 + POST_THICKNESS / 2, ARCH_HEIGHT / 2, 0]}
      >
        <boxGeometry args={[POST_THICKNESS, ARCH_HEIGHT, POST_DEPTH]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={Math.max(metalness, 0.3)}
        />
      </mesh>
      {/* Right post */}
      <mesh
        castShadow
        receiveShadow
        position={[ARCH_WIDTH / 2 - POST_THICKNESS / 2, ARCH_HEIGHT / 2, 0]}
      >
        <boxGeometry args={[POST_THICKNESS, ARCH_HEIGHT, POST_DEPTH]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={Math.max(metalness, 0.3)}
        />
      </mesh>
      {/* Top crossbar */}
      <mesh
        castShadow
        receiveShadow
        position={[0, ARCH_HEIGHT - CROSSBAR_HEIGHT / 2, 0]}
      >
        <boxGeometry args={[ARCH_WIDTH, CROSSBAR_HEIGHT, POST_DEPTH]} />
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={Math.max(metalness, 0.3)}
        />
      </mesh>
      {/* Scan beam — thin emissive plane between the posts */}
      <mesh position={[0, BEAM_HEIGHT, 0]}>
        <planeGeometry args={[ARCH_WIDTH - POST_THICKNESS * 2, 0.04]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.9}
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.0}
        />
      </mesh>
    </group>
  )
}
