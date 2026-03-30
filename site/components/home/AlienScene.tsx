// @ts-nocheck — R3F JSX elements not resolved by tsc in Next.js 15 + React 19; runtime works correctly
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AlienMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const t = useRef(0)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_, delta) => {
    if (!groupRef.current || prefersReduced) return
    t.current += delta
    // Gentle sine float — 3s cycle, ±0.15 units
    groupRef.current.position.y = Math.sin((t.current * Math.PI * 2) / 3) * 0.15
    groupRef.current.rotation.y = Math.sin(t.current * 0.4) * 0.08
  })

  const green = '#7EC83A'
  const darkGreen = '#5A9428'
  const eyeWhite = '#F8F9FF'
  const eyePupil = '#080C18'

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body — main sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={green} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Head bump */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color={green} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.22, 1.05, 0.42]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={eyeWhite} roughness={0.1} />
      </mesh>
      <mesh position={[-0.22, 1.05, 0.56]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={eyePupil} roughness={0.2} />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.22, 1.05, 0.42]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={eyeWhite} roughness={0.1} />
      </mesh>
      <mesh position={[0.22, 1.05, 0.56]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={eyePupil} roughness={0.2} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-1.1, 0.1, 0]} rotation={[0, 0, 0.7]}>
        <capsuleGeometry args={[0.14, 0.7, 8, 12]} />
        <meshStandardMaterial color={darkGreen} roughness={0.5} />
      </mesh>

      {/* Right arm */}
      <mesh position={[1.1, 0.1, 0]} rotation={[0, 0, -0.7]}>
        <capsuleGeometry args={[0.14, 0.7, 8, 12]} />
        <meshStandardMaterial color={darkGreen} roughness={0.5} />
      </mesh>

      {/* Left foot */}
      <mesh position={[-0.4, -1.1, 0]} rotation={[0.2, 0, 0.1]}>
        <capsuleGeometry args={[0.18, 0.45, 8, 12]} />
        <meshStandardMaterial color={darkGreen} roughness={0.5} />
      </mesh>

      {/* Right foot */}
      <mesh position={[0.4, -1.1, 0]} rotation={[0.2, 0, -0.1]}>
        <capsuleGeometry args={[0.18, 0.45, 8, 12]} />
        <meshStandardMaterial color={darkGreen} roughness={0.5} />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 35
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const t = useRef(0)

  // Generate stable random positions once
  const particles = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 3 - 1,
      speed: 0.3 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
    }))
  )

  const dummy = useRef(new THREE.Object3D())

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_, delta) => {
    if (!meshRef.current) return
    if (!prefersReduced) t.current += delta

    particles.current.forEach((p, i) => {
      dummy.current.position.set(
        p.x + Math.sin(t.current * p.speed + p.offset) * 0.15,
        p.y + Math.cos(t.current * p.speed * 0.7 + p.offset) * 0.12,
        p.z
      )
      dummy.current.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.current.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="#7EC83A" transparent opacity={0.2} />
    </instancedMesh>
  )
}

export default function AlienScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <AlienMesh />
      <ParticleField />
    </Canvas>
  )
}
