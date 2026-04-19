'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  NEUTRAL_ACCENT,
  type PrimitiveProps,
} from './types'

// Shopping trolley — low-poly cage basket on four wheels with a push handle.
// Walls are thin boxes (stand-in for wire cage — real wire would require
// InstancedMesh rods and is Phase 3.3's call if needed). Silhouette carries
// the metaphor on its own.
//
// Local dimensions: ~1.6 wide × 0.9 tall (basket top) × 1.0 deep,
// wheels under the basket, handle extends up-back.
const BASKET_WIDTH = 1.6
const BASKET_HEIGHT = 0.65
const BASKET_DEPTH = 1.0
const BASKET_Y_OFFSET = 0.55 // basket sits above the wheel axle
const WALL = 0.04
const WHEEL_RADIUS = 0.18
const WHEEL_THICKNESS = 0.09
const HANDLE_HEIGHT = 0.9
const HANDLE_TUBE = 0.04

// Trolley body default — cool steel grey, not a chapter accent.
const TROLLEY_BODY = '#BFC4CC'
const WHEEL_COLOR = '#2A2A2A'

export function Trolley({
  position,
  rotation,
  scale,
  color = TROLLEY_BODY,
  accent = NEUTRAL_ACCENT,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  // Shared cage material.
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: Math.max(metalness, 0.35),
      }),
    [color, roughness, metalness]
  )
  const wheelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WHEEL_COLOR,
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  )

  const wheelPositions: [number, number, number][] = [
    [-BASKET_WIDTH / 2 + 0.2, WHEEL_RADIUS, BASKET_DEPTH / 2 - 0.2],
    [BASKET_WIDTH / 2 - 0.2, WHEEL_RADIUS, BASKET_DEPTH / 2 - 0.2],
    [-BASKET_WIDTH / 2 + 0.2, WHEEL_RADIUS, -BASKET_DEPTH / 2 + 0.2],
    [BASKET_WIDTH / 2 - 0.2, WHEEL_RADIUS, -BASKET_DEPTH / 2 + 0.2],
  ]

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Basket base */}
      <mesh
        castShadow
        receiveShadow
        position={[0, BASKET_Y_OFFSET, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[BASKET_WIDTH, WALL, BASKET_DEPTH]} />
      </mesh>
      {/* Basket walls (4) */}
      <mesh
        castShadow
        receiveShadow
        position={[0, BASKET_Y_OFFSET + BASKET_HEIGHT / 2, BASKET_DEPTH / 2 - WALL / 2]}
        material={bodyMat}
      >
        <boxGeometry args={[BASKET_WIDTH, BASKET_HEIGHT, WALL]} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[0, BASKET_Y_OFFSET + BASKET_HEIGHT / 2, -BASKET_DEPTH / 2 + WALL / 2]}
        material={bodyMat}
      >
        <boxGeometry args={[BASKET_WIDTH, BASKET_HEIGHT, WALL]} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[-BASKET_WIDTH / 2 + WALL / 2, BASKET_Y_OFFSET + BASKET_HEIGHT / 2, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[WALL, BASKET_HEIGHT, BASKET_DEPTH]} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[BASKET_WIDTH / 2 - WALL / 2, BASKET_Y_OFFSET + BASKET_HEIGHT / 2, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[WALL, BASKET_HEIGHT, BASKET_DEPTH]} />
      </mesh>
      {/* Wheels */}
      {wheelPositions.map((p, i) => (
        <mesh
          key={i}
          castShadow
          position={p}
          rotation={[0, 0, Math.PI / 2]}
          material={wheelMat}
        >
          <cylinderGeometry
            args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_THICKNESS, 16]}
          />
        </mesh>
      ))}
      {/* Push handle — vertical posts + crossbar at the back */}
      <mesh
        castShadow
        position={[
          -BASKET_WIDTH / 2 + WALL / 2,
          BASKET_Y_OFFSET + BASKET_HEIGHT + HANDLE_HEIGHT / 2,
          -BASKET_DEPTH / 2 + WALL,
        ]}
      >
        <cylinderGeometry args={[HANDLE_TUBE, HANDLE_TUBE, HANDLE_HEIGHT, 12]} />
        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh
        castShadow
        position={[
          BASKET_WIDTH / 2 - WALL / 2,
          BASKET_Y_OFFSET + BASKET_HEIGHT + HANDLE_HEIGHT / 2,
          -BASKET_DEPTH / 2 + WALL,
        ]}
      >
        <cylinderGeometry args={[HANDLE_TUBE, HANDLE_TUBE, HANDLE_HEIGHT, 12]} />
        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh
        castShadow
        position={[
          0,
          BASKET_Y_OFFSET + BASKET_HEIGHT + HANDLE_HEIGHT,
          -BASKET_DEPTH / 2 + WALL,
        ]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[HANDLE_TUBE, HANDLE_TUBE, BASKET_WIDTH - WALL, 12]} />
        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  )
}

// Top of the trolley basket — useful for scene agents placing products inside.
export const TROLLEY_BASKET_TOP_Y = BASKET_Y_OFFSET + BASKET_HEIGHT
