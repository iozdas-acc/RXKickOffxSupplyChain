// Three.js materials can't consume CSS vars directly — these hex values must
// stay in sync with `--accent-ch{1..5}` in site/app/globals.css.
// Single source of truth for any 3D scene that needs a per-chapter accent.

export const CHAPTER_COLORS = [
  '#3DB19A', // Ch.1 learning — Fern Green accent
  '#0F1D3C', // Ch.2 model    — Navy Blue
  '#0F1D3C', // Ch.3 template — Navy Blue
  '#4A4A6A', // Ch.4 (retired) — Slate Blue fallback
] as const

export function chapterColor(chapter: number): string {
  return CHAPTER_COLORS[chapter] ?? CHAPTER_COLORS[0]
}
