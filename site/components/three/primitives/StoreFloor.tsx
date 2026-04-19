'use client'

// Shared store floor — warm tinted plane matching --color-background-tertiary.
// Extracted from the pre-refactor SupermarketScene so the dispatcher can
// mount it once regardless of chapter.
const FLOOR_COLOR = '#F0EEE8' // mirrors --color-background-tertiary

export function StoreFloor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40, 20, 20]} />
      <meshStandardMaterial
        color={FLOOR_COLOR}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}
