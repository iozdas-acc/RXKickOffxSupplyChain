// Shared primitive prop convention for the supermarket 3D library.
// Every primitive accepts this shape and forwards transform to its root <group>.

export type Vec3 = [number, number, number]

export interface PrimitiveProps {
  position?: Vec3
  rotation?: Vec3
  scale?: Vec3 | number
  /** Primary body colour — defaults to white or chapter accent. */
  color?: string
  /** Contrast detail (e.g. bottle cap, tin lid). Defaults vary per primitive. */
  accent?: string
  /** MeshStandardMaterial roughness override. Default ~0.55 (matte-ish). */
  roughness?: number
  /** MeshStandardMaterial metalness override. Default ~0.1 (non-metallic). */
  metalness?: number
}

export const DEFAULT_ROUGHNESS = 0.55
export const DEFAULT_METALNESS = 0.1

// Neutral off-whites used as primitive defaults when no colour is provided.
// Chapter scenes pass real accents in from CHAPTER_COLORS.
export const NEUTRAL_BODY = '#FFFFFF'
export const NEUTRAL_ACCENT = '#E5E5E5'
