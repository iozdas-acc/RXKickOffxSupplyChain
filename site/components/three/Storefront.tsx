'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Mesh } from 'three'

// Sainsbury's storefront — stylised architectural stand-in.
// Charcoal canopy + fascia, orange script sign, translucent glass curtain,
// steel columns. All local-space; the parent positions and rotates it.

const BRAND_ORANGE_HOT = '#FF8A1F' // pushed slightly brighter so bloom clips
const FASCIA_DARK = '#1f1f1f'
const CANOPY_DARK = '#141414'
const GLASS_COLOR = '#3f4c5a'
const MULLION = '#0e0e0e'
const COLUMN = '#2e2e2e'
const CONCRETE = '#8e8e8e'

const TOTAL_WIDTH = 8
const FASCIA_HEIGHT = 1.4
const FASCIA_Y = 2.55
const CANOPY_Y = 3.3
const CANOPY_DEPTH = 2.6
const GLASS_Y = 1.25
const GLASS_HEIGHT = 2.5

// Canvas-texture "Sainsbury's" sign. Uses PermanentMarker from /public/fonts
// for a hand-drawn script feel; falls back to a system cursive. Drawn with a
// soft halo underneath + extra-hot orange fill so the bloom pass registers
// it as lit signage instead of a flat coloured rectangle.
function SignPlane({ signRef }: { signRef: React.MutableRefObject<Mesh | null> }) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    let cancelled = false
    const draw = (fontFamily: string) => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = 4096
      canvas.height = 1024
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Measure and scale the font so the word always fits with 8% margin.
      const TARGET_WIDTH = canvas.width * 0.86
      let fontSize = 640
      ctx.font = `${fontSize}px ${fontFamily}`
      let measured = ctx.measureText("Sainsbury's").width
      if (measured > TARGET_WIDTH) {
        fontSize = Math.floor(fontSize * (TARGET_WIDTH / measured))
      }

      const setup = () => {
        ctx.font = `${fontSize}px ${fontFamily}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
      }

      // Layer 1 — soft orange halo for the bloom pass to latch onto.
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.transform(1, 0, -0.08, 1, 0, 0)
      setup()
      ctx.shadowColor = BRAND_ORANGE_HOT
      ctx.shadowBlur = 48
      ctx.fillStyle = BRAND_ORANGE_HOT
      ctx.fillText("Sainsbury's", 0, 16)
      ctx.restore()

      // Layer 2 — solid orange glyph body, no shadow. Readable core.
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.transform(1, 0, -0.08, 1, 0, 0)
      setup()
      ctx.fillStyle = BRAND_ORANGE_HOT
      ctx.fillText("Sainsbury's", 0, 16)
      ctx.restore()

      // Layer 3 — pale hot highlight across the top of the strokes.
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2 - 6)
      ctx.transform(1, 0, -0.08, 1, 0, 0)
      setup()
      ctx.fillStyle = '#FFE3B8'
      ctx.globalAlpha = 0.55
      ctx.fillText("Sainsbury's", 0, 16)
      ctx.restore()

      const tex = new THREE.CanvasTexture(canvas)
      tex.anisotropy = 16
      tex.needsUpdate = true
      setTexture(tex)
    }

    // Try to load PermanentMarker first; fall back silently.
    try {
      const font = new FontFace('PermanentMarker', 'url(/fonts/PermanentMarker-Regular.ttf)')
      font.load()
        .then(loaded => {
          if (cancelled) return
          ;(document as Document & { fonts: FontFaceSet }).fonts.add(loaded)
          draw("'PermanentMarker', cursive")
        })
        .catch(() => draw("'Brush Script MT', cursive"))
    } catch {
      draw("'Brush Script MT', cursive")
    }

    return () => { cancelled = true }
  }, [])

  if (!texture) return null
  return (
    <>
      {/* Back glow wash — subtle. Just enough to feel the sign is backlit.
          Must sit in front of the fascia front face (z=0.26) or it occludes. */}
      <mesh position={[0, FASCIA_Y, 0.30]}>
        <planeGeometry args={[6.6, 1.5]} />
        <meshBasicMaterial
          color={BRAND_ORANGE_HOT}
          transparent
          opacity={0.16}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={signRef} position={[0, FASCIA_Y, 0.35]} renderOrder={2}>
        <planeGeometry args={[7.0, 1.5]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>
    </>
  )
}

interface Props {
  position?: [number, number, number]
  rotation?: [number, number, number]
  signRef?: React.MutableRefObject<Mesh | null>
}

export function Storefront({ position, rotation, signRef }: Props) {
  const internalSignRef = useRef<Mesh | null>(null)
  const ref = signRef ?? internalSignRef

  return (
    <group position={position} rotation={rotation}>
      {/* Concrete pad / threshold */}
      <mesh position={[0, 0.03, 0.4]} receiveShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.6, 0.06, CANOPY_DEPTH + 0.8]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.92} metalness={0.05} />
      </mesh>

      {/* Dark interior wall visible through glass */}
      <mesh position={[0, GLASS_Y, -0.1]} receiveShadow>
        <boxGeometry args={[TOTAL_WIDTH, GLASS_HEIGHT, 0.05]} />
        <meshStandardMaterial color="#16191d" roughness={0.85} />
      </mesh>

      {/* Glass facade — three panes */}
      {[-2.5, 0, 2.5].map((x, i) => (
        <mesh key={i} position={[x, GLASS_Y, 0.06]} castShadow>
          <boxGeometry args={[2.2, GLASS_HEIGHT, 0.04]} />
          <meshStandardMaterial
            color={GLASS_COLOR}
            transparent
            opacity={0.55}
            roughness={0.2}
            metalness={0.45}
          />
        </mesh>
      ))}

      {/* Mullions — thin vertical separators between panes */}
      {[-3.65, -1.35, 1.35, 3.65].map((x, i) => (
        <mesh key={i} position={[x, GLASS_Y, 0.09]} castShadow>
          <boxGeometry args={[0.09, GLASS_HEIGHT + 0.1, 0.12]} />
          <meshStandardMaterial color={MULLION} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Horizontal door rail suggesting the entrance sliding doors */}
      <mesh position={[0, 0.12, 0.12]} castShadow>
        <boxGeometry args={[1.8, 0.08, 0.1]} />
        <meshStandardMaterial color={MULLION} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Fascia band — the dark horizontal strip the sign lives on */}
      <mesh position={[0, FASCIA_Y, 0.06]} castShadow>
        <boxGeometry args={[TOTAL_WIDTH, FASCIA_HEIGHT, 0.4]} />
        <meshStandardMaterial color={FASCIA_DARK} roughness={0.65} metalness={0.35} />
      </mesh>

      {/* The sign — ships with its own back-glow wash */}
      <SignPlane signRef={ref} />

      {/* Canopy slab — extends forward over the entrance */}
      <mesh position={[0, CANOPY_Y, CANOPY_DEPTH / 2 - 0.15]} castShadow receiveShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.6, 0.14, CANOPY_DEPTH]} />
        <meshStandardMaterial color={CANOPY_DARK} roughness={0.55} metalness={0.4} />
      </mesh>

      {/* Canopy front lip */}
      <mesh position={[0, CANOPY_Y - 0.22, CANOPY_DEPTH - 0.2]} castShadow>
        <boxGeometry args={[TOTAL_WIDTH + 0.6, 0.32, 0.08]} />
        <meshStandardMaterial color={CANOPY_DARK} roughness={0.55} metalness={0.4} />
      </mesh>

      {/* Support columns at the canopy's front corners — sized to the
          taller fascia so they meet the canopy underside cleanly */}
      {[
        [-TOTAL_WIDTH / 2 - 0.15, CANOPY_DEPTH - 0.35],
        [ TOTAL_WIDTH / 2 + 0.15, CANOPY_DEPTH - 0.35],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, CANOPY_Y / 2, z]} castShadow>
          <boxGeometry args={[0.18, CANOPY_Y, 0.18]} />
          <meshStandardMaterial color={COLUMN} roughness={0.45} metalness={0.55} />
        </mesh>
      ))}
    </group>
  )
}
