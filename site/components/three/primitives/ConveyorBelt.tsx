'use client'

import { useMemo } from 'react'
import {
  DEFAULT_METALNESS,
  DEFAULT_ROUGHNESS,
  type PrimitiveProps,
} from './types'

// Conveyor belt — flat belt plank + a row of thin roller cylinders underneath.
// Products ride on the top face at y = BELT_TOP_Y (group-local).
// Local dimensions: length (x) = 8, width (z) = 1.4, thickness 0.08.
const LENGTH = 8
const WIDTH = 1.4
const BELT_THICKNESS = 0.08
const ROLLER_RADIUS = 0.12
const ROLLER_COUNT = 10
const FRAME_THICKNESS = 0.08
const FRAME_HEIGHT = 0.25

// Light-world belt — warm off-white body with a warmer frame and light rollers.
const BELT_BODY = '#D4D0C8'
const ROLLER_COLOR = '#E8E4DC'
const FRAME_COLOR = '#8B8680'

const BELT_TOP_Y = BELT_THICKNESS / 2

export function ConveyorBelt({
  position,
  rotation,
  scale,
  color = BELT_BODY,
  accent = ROLLER_COLOR,
  roughness = DEFAULT_ROUGHNESS,
  metalness = DEFAULT_METALNESS,
}: PrimitiveProps) {
  // Evenly space the rollers beneath the belt along the length axis.
  const rollerPositions = useMemo(() => {
    const spacing = LENGTH / (ROLLER_COUNT - 1)
    return Array.from({ length: ROLLER_COUNT }, (_, i) => {
      return -LENGTH / 2 + i * spacing
    })
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Belt surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[LENGTH, BELT_THICKNESS, WIDTH]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={metalness}
        />
      </mesh>
      {/* Rollers underneath the belt */}
      {rollerPositions.map((x, i) => (
        <mesh
          key={i}
          castShadow
          position={[x, -BELT_THICKNESS / 2 - ROLLER_RADIUS, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry
            args={[ROLLER_RADIUS, ROLLER_RADIUS, WIDTH * 1.02, 16]}
          />
          <meshStandardMaterial
            color={accent}
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>
      ))}
      {/* Side frames */}
      <mesh
        castShadow
        receiveShadow
        position={[0, -FRAME_HEIGHT / 2, WIDTH / 2 + FRAME_THICKNESS / 2]}
      >
        <boxGeometry args={[LENGTH + FRAME_THICKNESS, FRAME_HEIGHT, FRAME_THICKNESS]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          roughness={roughness}
          metalness={0.5}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[0, -FRAME_HEIGHT / 2, -WIDTH / 2 - FRAME_THICKNESS / 2]}
      >
        <boxGeometry args={[LENGTH + FRAME_THICKNESS, FRAME_HEIGHT, FRAME_THICKNESS]} />
        <meshStandardMaterial
          color={FRAME_COLOR}
          roughness={roughness}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

// Exported so scenes can sit products on the belt without visual float.
export const CONVEYOR_TOP_Y = BELT_TOP_Y
export const CONVEYOR_LENGTH = LENGTH
