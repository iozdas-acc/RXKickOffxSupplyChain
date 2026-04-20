'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

// Landing-only studio product showcase. Three objects floating in a loose
// triangle — static camera, transparent canvas, no shadows. Used in the
// right-half of the hero split; chapter scenes take over after entering.

const TIN_BASE_Y = 0.6
const BOTTLE_BASE_Y = 0.05
const PACKET_BASE_Y = -0.85
const FLOAT_AMP = 0.08

export function StudioShowcase() {
  const tinRef = useRef<Group>(null)
  const bottleRef = useRef<Group>(null)
  const packetRef = useRef<Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (tinRef.current) {
      tinRef.current.rotation.y += 0.003
      tinRef.current.position.y = TIN_BASE_Y + Math.sin(t * 1.0) * FLOAT_AMP
    }
    if (bottleRef.current) {
      bottleRef.current.rotation.y += 0.005
      bottleRef.current.position.y = BOTTLE_BASE_Y + Math.sin(t * 0.85 + 2.1) * FLOAT_AMP
    }
    if (packetRef.current) {
      packetRef.current.rotation.y += 0.004
      packetRef.current.position.y = PACKET_BASE_Y + Math.sin(t * 1.2 + 4.2) * FLOAT_AMP
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Warm key — top-right */}
      <directionalLight color="#FFE4C4" intensity={2.5} position={[4, 4, 3]} />
      {/* Cool fill — bottom-left */}
      <directionalLight color="#C4D4FF" intensity={0.8} position={[-3, -3, 2]} />

      {/* Tin — cylindrical, short and wide, warm orange with a label indent */}
      <group ref={tinRef} position={[-1.25, TIN_BASE_Y, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.7, 32]} />
          <meshStandardMaterial color="#E8590C" roughness={0.55} metalness={0.1} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.538, 0.538, 0.42, 32]} />
          <meshStandardMaterial color="#E8590C" roughness={0.38} metalness={0.2} />
        </mesh>
      </group>

      {/* Bottle — narrow neck on a wider base, deep charcoal with slight gloss */}
      <group ref={bottleRef} position={[1.3, BOTTLE_BASE_Y, -0.55]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.36, 0.38, 0.95, 24]} />
          <meshStandardMaterial color="#1A1A2E" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.15, 0.36, 0.24, 24]} />
          <meshStandardMaterial color="#1A1A2E" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.2, 24]} />
          <meshStandardMaterial color="#1A1A2E" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.12, 24]} />
          <meshStandardMaterial color="#1A1A2E" metalness={0.4} roughness={0.35} />
        </mesh>
      </group>

      {/* Packet — flat rectangular box, clean white with orange edge trim */}
      <group ref={packetRef} position={[-0.1, PACKET_BASE_Y, 0.55]}>
        <mesh>
          <boxGeometry args={[0.95, 1.3, 0.22]} />
          <meshStandardMaterial color="#F5F5F0" roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.52, 0.113]}>
          <boxGeometry args={[0.95, 0.12, 0.003]} />
          <meshStandardMaterial color="#E8590C" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.52, -0.113]}>
          <boxGeometry args={[0.95, 0.12, 0.003]} />
          <meshStandardMaterial color="#E8590C" roughness={0.5} />
        </mesh>
      </group>
    </>
  )
}
