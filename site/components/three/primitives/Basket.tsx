'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  NEUTRAL_BODY,
  type PrimitiveProps,
} from './types'

// Hand basket — wire cage silhouette + arched handle.
// Low-poly: 4 side panels built as thin boxes, a base plane, and a torus
// segment for the handle. Scene-ready receptacle for Ch.5.
// Local dimensions: ~1.4 wide × 0.55 tall × 0.9 deep. Opening at the top.
const WIDTH = 1.4
const HEIGHT = 0.55
const DEPTH = 0.9
const WALL = 0.05
const HANDLE_RADIUS = 0.42
const HANDLE_TUBE = 0.035

export function Basket({
  position,
  rotation,
  scale,
  color = NEUTRAL_BODY,
  accent = NEUTRAL_ACCENT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  // Single reusable material shared across the four cage walls + base.
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
      }),
    [color, roughness, metalness]
  )

  // Handle sits above the basket; a half-torus arc is visually enough.
  // We model it as a thin torus scaled to look like an arch.
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base */}
      <mesh castShadow receiveShadow material={bodyMat}>
        <boxGeometry args={[WIDTH, WALL, DEPTH]} />
      </mesh>
      {/* Front wall */}
      <mesh
        castShadow
        receiveShadow
        position={[0, HEIGHT / 2, DEPTH / 2 - WALL / 2]}
        material={bodyMat}
      >
        <boxGeometry args={[WIDTH, HEIGHT, WALL]} />
      </mesh>
      {/* Back wall */}
      <mesh
        castShadow
        receiveShadow
        position={[0, HEIGHT / 2, -DEPTH / 2 + WALL / 2]}
        material={bodyMat}
      >
        <boxGeometry args={[WIDTH, HEIGHT, WALL]} />
      </mesh>
      {/* Left wall */}
      <mesh
        castShadow
        receiveShadow
        position={[-WIDTH / 2 + WALL / 2, HEIGHT / 2, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[WALL, HEIGHT, DEPTH]} />
      </mesh>
      {/* Right wall */}
      <mesh
        castShadow
        receiveShadow
        position={[WIDTH / 2 - WALL / 2, HEIGHT / 2, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[WALL, HEIGHT, DEPTH]} />
      </mesh>
      {/* Handle — half torus, rotated so the arch opens downward into basket */}
      <mesh
        castShadow
        position={[0, HEIGHT + HANDLE_RADIUS * 0.25, 0]}
        rotation={[0, 0, 0]}
      >
        <torusGeometry args={[HANDLE_RADIUS, HANDLE_TUBE, 8, 24, Math.PI]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    </group>
  )
}
