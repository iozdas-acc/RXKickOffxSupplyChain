// Three.js materials can't consume CSS vars directly — these hex values must
// stay in sync with `--accent-ch{1..5}` in site/app/globals.css.
// Single source of truth for any 3D scene that needs a per-chapter accent.

export const CHAPTER_COLORS = [
  '#F06C00', // Ch.1 intro    — Sainsbury's orange
  '#0891B2', // Ch.2 project  — horizon-1 cyan
  '#059669', // Ch.3 learning — horizon-2 emerald
  '#7C3AED', // Ch.4 model    — horizon-3 purple
  '#A100FF', // Ch.5 template — Accenture deep purple
] as const

export function chapterColor(chapter: number): string {
  return CHAPTER_COLORS[chapter] ?? CHAPTER_COLORS[0]
}
