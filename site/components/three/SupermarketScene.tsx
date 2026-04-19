'use client'

import { CameraController } from './CameraController'
import { StoreFloor, StudioLights } from './primitives'
import { HeroScene } from './scenes/HeroScene'
import { ConveyorScene } from './scenes/ConveyorScene'
import { PaceScene } from './scenes/PaceScene'
import { AislesScene } from './scenes/AislesScene'
import { BasketScene } from './scenes/BasketScene'

// Re-export chapter accent hex array for any consumer that needs it.
// CSS tokens and 3D hex can't share values — keep this mirror in sync with
// --accent-ch{1..5} in site/app/globals.css (see chapterColors.ts).
export { CHAPTER_COLORS } from './chapterColors'

interface Props {
  chapter: number
  entered: boolean
}

// Chapter index → scene component. Ordering matches CHAPTERS in data/chapters.ts.
// Phase 3.1–3.5 fleshes each scene out; today they are static tableaux.
const SCENE_BY_CHAPTER = [
  HeroScene,     // Ch.1 intro        — products settling on a shelf
  ConveyorScene, // Ch.2 the-project  — items travelling a belt
  PaceScene,     // Ch.3 the-learning — slow trolley vs fast scanner
  AislesScene,   // Ch.4 the-model    — three receding aisles
  BasketScene,   // Ch.5 the-template — lit basket of three items
] as const

export function SupermarketScene({ chapter, entered }: Props) {
  const Scene = SCENE_BY_CHAPTER[chapter] ?? HeroScene

  return (
    <>
      <CameraController chapter={chapter} entered={entered} />
      <StudioLights chapter={chapter} />
      <StoreFloor />
      <Scene entered={entered} />
    </>
  )
}
