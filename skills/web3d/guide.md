# Skill: Web 3D

Three.js, React Three Fiber, and WebGL patterns for spatial and volumetric visuals.
Use this skill intentionally — only when 2D CSS cannot achieve the required visual fidelity.

---

## When to use this skill

- Product visualization (showing a 3D object from multiple angles)
- Interactive hero scenes with spatial depth
- Particle systems, fluid simulations, environment lighting
- When the client has explicitly asked for WebGL
- When the visual is fundamentally spatial and CSS transforms are insufficient

## When NOT to use this skill

- Layout problems (use CSS Grid/Flex)
- Simple parallax effects (use CSS `transform: translateZ` or GSAP)
- Any content that must be screen-reader accessible without a fallback
- Any above-the-fold content on mobile (performance cost is too high)

---

## Stack choices

### React Three Fiber (R3F) — preferred for React projects
```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
      {/* scene content */}
    </Canvas>
  )
}
```

### Vanilla Three.js — for non-React projects or maximum control
```js
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
```

---

## Scene setup defaults

### Camera
- FOV: 45–60° for product shots, wider (75–90°) for immersive scenes
- Near/far: 0.1 / 100 for most scenes (adjust for scale)
- Position: start at z=5, adjust to subject

### Lighting
- `Environment` (HDR) for physically-based reflections — best for products
- `DirectionalLight` + `AmbientLight` for hand-tuned dramatic lighting
- Never light a scene with only `AmbientLight`

### Renderer settings
```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // cap at 2x
renderer.setSize(width, height)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
```

---

## Model formats

| Format | Use case |
|--------|----------|
| `.glb` | Default — binary GLTF, everything in one file |
| `.gltf` + `.bin` | When textures need to be loaded separately |
| `.draco` compressed | Large models (>2MB) — requires DRACOLoader |

### Loading pattern (R3F)
```jsx
import { useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

// Preload outside component
useGLTF.preload('/models/product.glb')
```

---

## Performance rules

- Cap pixel ratio at 2: `renderer.setPixelRatio(Math.min(dpr, 2))`
- Dispose geometries and materials on unmount
- Use `<Suspense>` with a fallback for model loading
- Avoid per-frame allocations in `useFrame` / render loop
- For mobile: detect and reduce geometry complexity or skip 3D entirely
- Use `@react-three/drei`'s `<PerformanceMonitor>` for adaptive quality

### LOD pattern
```jsx
import { Detailed } from '@react-three/drei'

<Detailed distances={[0, 10, 20]}>
  <HighDetailMesh />
  <MedDetailMesh />
  <LowDetailMesh />
</Detailed>
```

---

## 2D fallback rule

Every 3D section must have a defined 2D fallback for:
- Mobile devices below a performance threshold
- Users with `prefers-reduced-motion`
- Browsers without WebGL support

Document the fallback in `pages/<name>/context.md`.
