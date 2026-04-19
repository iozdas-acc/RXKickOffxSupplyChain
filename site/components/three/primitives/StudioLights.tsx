'use client'

import { chapterColor } from '../chapterColors'

interface Props {
  chapter: number
}

// Warm tones used as constants so no raw hex scatters through the rig.
const KEY_LIGHT_WARM = '#fff4e0'
const FILL_LIGHT_WARM = '#ffd9b3'
const FOG_COLOR = '#FAFAFA' // matches page background (see globals.css)

// Shared 3-light setup for every supermarket subscene.
// - Ambient fills shadows without washing colour.
// - Key light (warm, from front-right) casts readable shadows.
// - Fill light (warm, from back-left) softens the opposite side.
// - Per-chapter accent point light colours the hero area.
// - Fog dissolves scene edges into the page background (#FAFAFA).
export function StudioLights({ chapter }: Props) {
  const accent = chapterColor(chapter)

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={0.8}
        color={KEY_LIGHT_WARM}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-8, 5, -4]}
        intensity={0.25}
        color={FILL_LIGHT_WARM}
      />
      <pointLight
        position={[0, 4, 0]}
        intensity={0.55}
        color={accent}
        distance={18}
        decay={2}
      />
      <fog attach="fog" args={[FOG_COLOR, 10, 26]} />
    </>
  )
}
