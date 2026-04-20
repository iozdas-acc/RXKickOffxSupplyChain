'use client'

import { chapterColor } from '../chapterColors'

interface Props {
  chapter: number
  entered: boolean
}

// Warm tones used as constants so no raw hex scatters through the rig.
const KEY_LIGHT_WARM = '#fff4e0'
const FILL_LIGHT_WARM = '#ffd9b3'
const FOG_COLOR = '#FAFAFA' // matches page background (see globals.css)

// Shared light rig. Fog is only attached *after* the user enters — on the
// landing the storefront sits right at the fog start plane and would
// dissolve into the page background. We want BAM, not ghost.
export function StudioLights({ chapter, entered }: Props) {
  const accent = chapterColor(chapter)

  return (
    <>
      <ambientLight intensity={entered ? 0.9 : 0.55} />
      <directionalLight
        position={[10, 15, 8]}
        intensity={entered ? 0.8 : 1.1}
        color={KEY_LIGHT_WARM}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-8, 5, -4]}
        intensity={entered ? 0.25 : 0.4}
        color={FILL_LIGHT_WARM}
      />
      <pointLight
        position={[0, 4, 0]}
        intensity={entered ? 0.55 : 0.9}
        color={accent}
        distance={18}
        decay={2}
      />
      {entered && <fog attach="fog" args={[FOG_COLOR, 10, 26]} />}
    </>
  )
}
