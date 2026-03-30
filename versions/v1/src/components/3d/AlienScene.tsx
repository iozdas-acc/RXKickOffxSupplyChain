import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

// Procedural 3D alien — built from geometry primitives matching the SVG design.
// No .glb file required. Colors sourced from design-system/MASTER.md tokens.

const C = {
  bodyGreen:    '#7EC83A',
  bodyMid:      '#5A9A20',
  bodyDark:     '#4A8010',
  eyeWhite:     '#FFFFFF',
  eyePink:      '#E6287D',
  eyePupil:     '#1A1818',
  mouthRed:     '#E42629',
  tooth:        '#F8F9FF',
  glowGreen:    '#7EC83A',
}

// Check for reduced motion preference once
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function AlienMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const irisRef  = useRef<THREE.Mesh>(null)
  const pupilRef = useRef<THREE.Mesh>(null)


  // GSAP entrance — scale in from 0
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.scale.setScalar(0)
    gsap.to(groupRef.current.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.9,
      ease: 'back.out(1.4)',
      delay: 0.3,
    })
  }, [])

  useFrame(({ clock, pointer }) => {
    if (prefersReducedMotion) return
    const t = clock.getElapsedTime()

    // Breathing — whole body scale pulse
    if (groupRef.current) {
      const breathe = 1 + Math.sin(t * 0.9) * 0.012
      groupRef.current.scale.setScalar(breathe)
    }

    // Eye tracks pointer (subtle, clamped to ±0.06 units)
    if (irisRef.current && pupilRef.current) {
      const tx = THREE.MathUtils.clamp(pointer.x * 0.1, -0.06, 0.06)
      const ty = THREE.MathUtils.clamp(pointer.y * 0.08, -0.05, 0.05)
      irisRef.current.position.x  = THREE.MathUtils.lerp(irisRef.current.position.x,  tx,  0.05)
      irisRef.current.position.y  = THREE.MathUtils.lerp(irisRef.current.position.y,  ty,  0.05)
      pupilRef.current.position.x = THREE.MathUtils.lerp(pupilRef.current.position.x, tx,  0.05)
      pupilRef.current.position.y = THREE.MathUtils.lerp(pupilRef.current.position.y, ty,  0.05)
    }
  })

  const bodyMat  = <meshStandardMaterial color={C.bodyGreen}  roughness={0.35} metalness={0} />
  const darkMat  = <meshStandardMaterial color={C.bodyDark}   roughness={0.5}  metalness={0} />

  return (
    <group ref={groupRef}>

      {/* ── BODY ─────────────────────────────────── */}
      {/* Main torso — slightly squished sphere */}
      <mesh scale={[1, 0.92, 0.88]}>
        <sphereGeometry args={[1.05, 48, 48]} />
        {bodyMat}
      </mesh>

      {/* Upper body bump — raises eye socket area */}
      <mesh position={[0, 0.45, 0.55]} scale={[0.72, 0.72, 0.6]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        {bodyMat}
      </mesh>

      {/* ── ARMS ─────────────────────────────────── */}
      {/* Left upper arm */}
      <mesh position={[-1.0, 0.0, 0.2]} scale={[0.55, 0.75, 0.55]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        {bodyMat}
      </mesh>
      {/* Left lower arm / hand stub */}
      <mesh position={[-1.28, -0.32, 0.12]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        {bodyMat}
      </mesh>

      {/* Right upper arm */}
      <mesh position={[1.0, 0.0, 0.2]} scale={[0.55, 0.75, 0.55]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        {bodyMat}
      </mesh>
      {/* Right lower arm / hand stub */}
      <mesh position={[1.28, -0.32, 0.12]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        {bodyMat}
      </mesh>

      {/* ── FEET ─────────────────────────────────── */}
      <mesh position={[-0.38, -1.05, 0.25]} scale={[1.1, 0.6, 1.2]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        {darkMat}
      </mesh>
      <mesh position={[0.38, -1.05, 0.25]} scale={[1.1, 0.6, 1.2]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        {darkMat}
      </mesh>

      {/* ── EYE ASSEMBLY ─────────────────────────── */}
      {/* Eye socket protrusion — slight bump */}
      <mesh position={[0, 0.52, 0.95]} scale={[1, 1, 0.65]}>
        <sphereGeometry args={[0.44, 32, 32]} />
        {bodyMat}
      </mesh>

      {/* Sclera (white) */}
      <mesh position={[0, 0.54, 1.2]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color={C.eyeWhite} roughness={0.05} />
      </mesh>

      {/* Iris (pink) — tracks pointer via ref */}
      <mesh ref={irisRef} position={[0, 0.54, 1.46]}>
        <sphereGeometry args={[0.23, 28, 28]} />
        <meshStandardMaterial color={C.eyePink} roughness={0.15} />
      </mesh>

      {/* Pupil (dark) — tracks pointer via ref */}
      <mesh ref={pupilRef} position={[0, 0.54, 1.58]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={C.eyePupil} roughness={0.1} />
      </mesh>

      {/* Eye specular highlight */}
      <mesh position={[0.09, 0.66, 1.67]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={C.eyeWhite}
          emissive={C.eyeWhite}
          emissiveIntensity={0.6}
          roughness={0}
        />
      </mesh>

      {/* ── MOUTH ────────────────────────────────── */}
      <mesh position={[0, -0.14, 0.98]} scale={[1, 0.55, 0.65]} rotation={[0.15, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 12]} />
        <meshStandardMaterial color={C.mouthRed} roughness={0.4} />
      </mesh>

      {/* Tooth */}
      <mesh position={[0, -0.1, 1.16]}>
        <boxGeometry args={[0.09, 0.1, 0.04]} />
        <meshStandardMaterial color={C.tooth} roughness={0.05} />
      </mesh>

    </group>
  )
}

export default function AlienScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.5], fov: 42 }}
      style={{ width: '100%', height: '100%', minHeight: '500px' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 6]} intensity={1.4} />
      <pointLight position={[-3, 2, 5]} color={C.glowGreen} intensity={1.2} />
      <pointLight position={[3, -1, 3]} color="#2ECFA8" intensity={0.4} />

      {/* Float handles the idle up/down + subtle rotation */}
      <Float
        speed={1.4}
        rotationIntensity={0.18}
        floatIntensity={0.7}
        floatingRange={[-0.12, 0.12]}
      >
        <AlienMesh />
      </Float>
    </Canvas>
  )
}
