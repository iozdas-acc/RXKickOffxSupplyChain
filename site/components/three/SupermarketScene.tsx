'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

interface Props {
  chapter: number
  entered: boolean
}

// Camera positions per chapter
const CAMERA_TARGETS = [
  { pos: [0, 1.5, 9],  lookAt: [0, 0, -2]  }, // hero entrance
  { pos: [0, 0.8, 8],  lookAt: [0, 0.2, 0] }, // 01 assemble
  { pos: [-2, 1.2, 7], lookAt: [0, 0.5, 0] }, // 02 shelves
  { pos: [0, 2.5, 10], lookAt: [0, 0, 0]   }, // 03 transform
  { pos: [0, 3.5, 11], lookAt: [0, 0, 0]   }, // 04 zones
  { pos: [0, 2, 9],    lookAt: [0, 0.5, 0] }, // 05 network
]

const CHAPTER_COLORS = [
  '#F06C00', // intro — orange
  '#0891B2', // project — cyan
  '#059669', // learning — emerald
  '#7C3AED', // model — purple
  '#A100FF', // template — deep purple
]

// ─── Instanced products (boxes) ────────────────────────────────────────────
function ProductGrid({ chapter, entered }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const count = 120

  const initialPositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20 - 5,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      scale: 0.2 + Math.random() * 0.5,
    }))
  }, [])

  // Grid formation positions for chapter 0 (assembled)
  const gridPositions = useMemo(() => {
    const cols = 12, rows = 10
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      return {
        x: (col - cols / 2) * 0.9 + 0.45,
        y: (row - rows / 2) * 0.7 + 0.35,
        z: -2 + (i / count) * 0.5,
        rx: 0,
        ry: 0,
        scale: 0.35,
      }
    })
  }, [count])

  // Shelf positions for chapter 1
  const shelfPositions = useMemo(() => {
    const shelves = 5
    return Array.from({ length: count }, (_, i) => {
      const shelf = i % shelves
      const pos = Math.floor(i / shelves)
      return {
        x: (pos - Math.floor(count / shelves) / 2) * 0.7,
        y: -1.5 + shelf * 0.8,
        z: -2,
        rx: 0,
        ry: 0,
        scale: 0.32,
      }
    })
  }, [count])

  // Chaos → order for chapter 2
  const chaosPositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const side = i < count / 2 ? -1 : 1
      const angle = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 4
      return {
        x: side * (2 + Math.abs(radius * Math.cos(angle))),
        y: -2 + Math.random() * 4,
        z: -3 + Math.random() * 3,
        rx: side === -1 ? (Math.random() - 0.5) * 1.5 : 0,
        ry: side === -1 ? (Math.random() - 0.5) * 1.5 : 0,
        scale: 0.3 + Math.random() * 0.2,
      }
    })
  }, [count])

  // Three zone positions for chapter 3 (H1/H2/H3)
  const zonePositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const zone = i % 3
      const idx = Math.floor(i / 3)
      const cols = 8
      return {
        x: (zone - 1) * 5 + ((idx % cols) - cols / 2) * 0.6,
        y: -1.5 + Math.floor(idx / cols) * 0.7,
        z: -2 + zone * 0.5,
        rx: 0,
        ry: 0,
        scale: 0.28,
      }
    })
  }, [count])

  // Network constellation for chapter 4
  const networkPositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const theta = (i / count) * Math.PI * 2 * 3 + i * 0.2
      const r = 1.5 + (i / count) * 5
      const y = Math.sin(i * 0.3) * 3
      return {
        x: Math.cos(theta) * r * 0.6,
        y,
        z: Math.sin(theta) * r * 0.6 - 3,
        rx: 0,
        ry: theta,
        scale: 0.2 + Math.random() * 0.25,
      }
    })
  }, [count])

  const getTargetPositions = () => {
    if (!entered) return initialPositions
    switch (chapter) {
      case 0: return gridPositions
      case 1: return shelfPositions
      case 2: return chaosPositions
      case 3: return zonePositions
      case 4: return networkPositions
      default: return gridPositions
    }
  }

  const animState = useRef(initialPositions.map(p => ({ ...p })))
  const prevChapter = useRef(-1)

  useEffect(() => {
    const targets = getTargetPositions()
    const current = animState.current
    const tl = gsap.timeline()

    targets.forEach((t, i) => {
      tl.to(current[i], {
        x: t.x, y: t.y, z: t.z,
        rx: t.rx, ry: t.ry, scale: t.scale,
        duration: 1.6 + Math.random() * 0.8,
        ease: 'expo.inOut',
        delay: i * 0.004,
      }, 0)
    })

    prevChapter.current = chapter
    return () => { tl.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, entered])

  const colorByChapter = useMemo(() => {
    const c = new THREE.Color(chapter < 0 ? '#ffffff' : CHAPTER_COLORS[chapter] || '#F06C00')
    return c
  }, [chapter])

  const time = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    time.current += delta

    const state = animState.current
    for (let i = 0; i < count; i++) {
      const s = state[i]
      const floatY = !entered ? Math.sin(time.current * 0.4 + i * 0.15) * 0.15 : 0
      const floatR = !entered ? Math.sin(time.current * 0.3 + i * 0.2) * 0.05 : 0

      dummy.position.set(s.x, s.y + floatY, s.z)
      dummy.rotation.set(s.rx + floatR, s.ry + time.current * 0.02, 0)
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Pulse color intensity
    const intensity = 0.5 + Math.sin(time.current * 0.8) * 0.1
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = intensity * 0.2
  })

  // Different box sizes simulate different product types
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1.4, 0.6), [])
  // Light-world bridge material: white base with chapter-colour emissive wash.
  // Phase 3 replaces these cubes with abstracted product primitives.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        emissive: colorByChapter,
        emissiveIntensity: 0.35,
        roughness: 0.45,
        metalness: 0.15,
      }),
    [colorByChapter]
  )

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} castShadow>
    </instancedMesh>
  )
}

// ─── Particle system ────────────────────────────────────────────────────────
function Particles({ chapter }: { chapter: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 400

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const chapterColor = new THREE.Color(CHAPTER_COLORS[chapter] || '#F06C00')

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 5
      // Light world: keep full chapter colour, gentle random desaturation only
      const t = 0.75 + Math.random() * 0.25
      col[i * 3]     = chapterColor.r * t
      col[i * 3 + 1] = chapterColor.g * t
      col[i * 3 + 2] = chapterColor.b * t
    }
    return { positions: pos, colors: col }
  }, [chapter])

  const time = useRef(0)

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    time.current += delta
    pointsRef.current.rotation.y = time.current * 0.02
    pointsRef.current.rotation.x = Math.sin(time.current * 0.01) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Store Floor ─────────────────────────────────────────────────────────────
function StoreFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[40, 40, 20, 20]} />
      <meshStandardMaterial
        color="#F0EEE8"
        roughness={0.85}
        metalness={0.05}
        wireframe={false}
      />
    </mesh>
  )
}

// ─── Zone indicators for chapter 3 (H1/H2/H3) ────────────────────────────
function ZoneMarkers({ chapter }: { chapter: number }) {
  if (chapter !== 3) return null
  const zones = [
    { x: -5, color: '#0891B2', label: 'H1' },
    { x: 0,  color: '#059669', label: 'H2' },
    { x: 5,  color: '#7C3AED', label: 'H3' },
  ]
  return (
    <>
      {zones.map(z => (
        <mesh key={z.label} position={[z.x, -2.9, -2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 8]} />
          <meshStandardMaterial
            color={z.color}
            emissive={z.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  )
}

// ─── Network lines for chapter 4 ─────────────────────────────────────────
function NetworkLines({ chapter }: { chapter: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const time = useRef(0)

  const { positions } = useMemo(() => {
    if (chapter !== 4) return { positions: new Float32Array(0) }
    const nodeCount = 30
    const nodes: [number, number, number][] = Array.from({ length: nodeCount }, (_, i) => {
      const theta = (i / nodeCount) * Math.PI * 2 * 2
      const r = 2 + (i / nodeCount) * 4
      return [
        Math.cos(theta) * r * 0.5,
        Math.sin(i * 0.8) * 2.5,
        Math.sin(theta) * r * 0.5 - 3,
      ]
    })

    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = Math.hypot(
          nodes[i][0] - nodes[j][0],
          nodes[i][1] - nodes[j][1],
          nodes[i][2] - nodes[j][2]
        )
        if (d < 3.5) {
          linePositions.push(...nodes[i], ...nodes[j])
        }
      }
    }
    return { positions: new Float32Array(linePositions) }
  }, [chapter])

  useFrame((_, delta) => {
    if (!linesRef.current || chapter !== 4) return
    time.current += delta
    ;(linesRef.current.material as THREE.LineBasicMaterial).opacity =
      0.3 + Math.sin(time.current * 1.2) * 0.1
  })

  if (chapter !== 4 || positions.length === 0) return null

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#A100FF" transparent opacity={0.55} />
    </lineSegments>
  )
}

// ─── Camera controller ────────────────────────────────────────────────────
function CameraController({ chapter, entered }: Props) {
  const { camera } = useThree()
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const idx = !entered ? 0 : chapter + 1
    const t = CAMERA_TARGETS[idx] || CAMERA_TARGETS[1]
    gsap.to(camera.position, {
      x: t.pos[0], y: t.pos[1], z: t.pos[2],
      duration: 1.8, ease: 'expo.inOut', overwrite: 'auto',
    })
  }, [chapter, entered, camera])

  useFrame(() => {
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.03
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.03

    const idx = !entered ? 0 : chapter + 1
    const t = CAMERA_TARGETS[idx] || CAMERA_TARGETS[1]
    camera.position.x = camera.position.x * 0.95 + (t.pos[0] + mouseCurrent.current.x * 0.4) * 0.05
    camera.position.y = camera.position.y * 0.95 + (t.pos[1] - mouseCurrent.current.y * 0.2) * 0.05
    camera.lookAt(t.lookAt[0], t.lookAt[1], t.lookAt[2])
  })

  return null
}

// ─── Main scene export ────────────────────────────────────────────────────
export function SupermarketScene({ chapter, entered }: Props) {
  const chapterColor = CHAPTER_COLORS[chapter] || '#F06C00'

  return (
    <>
      <CameraController chapter={chapter} entered={entered} />

      {/* Light-world bridge lighting (pre-Phase 3 — full relight with primitives TBD) */}
      <ambientLight intensity={0.95} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={0.8}
        color="#fff4e0"
        castShadow
      />
      <directionalLight position={[-8, 5, -4]} intensity={0.25} color="#ffd9b3" />
      <pointLight
        position={[0, 4, 0]}
        intensity={0.6}
        color={chapterColor}
        distance={20}
        decay={2}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.9}
        intensity={0.4}
        color={chapterColor}
        distance={25}
        decay={2}
      />

      {/* Scene elements */}
      <ProductGrid chapter={chapter} entered={entered} />
      <Particles chapter={chapter} />
      <StoreFloor />
      <ZoneMarkers chapter={chapter} />
      <NetworkLines chapter={chapter} />

      {/* Fog dissolves scene edges into page bg (#FAFAFA) */}
      <fog attach="fog" args={["#FAFAFA", 10, 26]} />
    </>
  )
}
