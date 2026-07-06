// Three.js materials can't consume CSS vars directly — these hex values must
// stay in sync with `--accent-ch{1..5}` in site/app/globals.css.
// Single source of truth for any 3D scene that needs a per-chapter accent.

export const CHAPTER_COLORS = [
  '#F06C00', // Ch.1 learning — Sainsbury's orange
  '#7C3AED', // Ch.2 model    — horizon-3 purple
  '#A100FF', // Ch.3 template — Accenture deep purple
  '#0891B2', // Ch.4 project  — horizon-1 cyan
] as const

export function chapterColor(chapter: number): string {
  return CHAPTER_COLORS[chapter] ?? CHAPTER_COLORS[0]
}
