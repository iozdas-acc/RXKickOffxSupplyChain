export interface Chapter {
  id: number
  slug: string
  label: string
  title: string
  titleLines: string[]
  subtitle: string
  emotion: string
  accentColor: string
  sceneMode: 'assemble' | 'shelves' | 'transform' | 'zones' | 'network'
  keyMessages: string[]
}

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    slug: 'the-learning',
    label: '01 · WHY WE WORK DIFFERENTLY',
    title: 'Why We Work Differently',
    titleLines: ['REINVENTION', 'NEEDS A', 'NEW MODEL.'],
    subtitle: 'Move faster. Experience more. Build belief earlier.',
    emotion: 'clarity',
    accentColor: 'var(--accent-ch3)',
    sceneMode: 'transform',
    keyMessages: [
      'A traditional pace of work doesn\'t build belief quickly enough',
      'AI-enabled speed lets teams be bolder about what\'s possible',
      'This isn\'t about replacing people — it\'s about removing friction',
    ],
  },
  {
    id: 1,
    slug: 'the-model',
    label: '02 · THE HORIZONS MODEL',
    title: 'The Horizons Model',
    titleLines: ['VISION +', 'DELIVERY', '= THE MODEL.'],
    subtitle: 'Shape the future and deliver value at the same time.',
    emotion: 'resolve',
    accentColor: 'var(--accent-ch4)',
    sceneMode: 'zones',
    keyMessages: [
      'The long-term vision and near-term delivery run at the same time',
      'The bridge between them emerges as you go — not designed upfront',
      'Prove value early, then keep building on it',
    ],
  },
  {
    id: 2,
    slug: 'the-template',
    label: '03 · A REPEATABLE TEMPLATE',
    title: 'A Repeatable Template',
    titleLines: ['EVERY', 'PROJECT.', 'THIS WAY.'],
    subtitle: 'A repeatable template for AI-led reinvention across the business.',
    emotion: 'momentum',
    accentColor: 'var(--accent-ch5)',
    sceneMode: 'network',
    keyMessages: [
      'The vision-to-delivery arc is the way we work — not just a slide',
      'AI is the accelerant, and the hybrid model is the shape',
      'This is how we approach every AI-led reinvention from here',
    ],
  },
  {
    id: 3,
    slug: 'the-project',
    label: '04 · EMBEDDING AI IN DISCOVERY',
    title: 'Embedding AI in Discovery',
    titleLines: ['AI, EMBEDDED', 'IN LIVE', 'DISCOVERY.'],
    subtitle: 'Bringing AI into live discovery to prove value as we go.',
    emotion: 'urgency',
    accentColor: 'var(--accent-ch2)',
    sceneMode: 'shelves',
    keyMessages: [
      'AI embedded into live discovery — not bolted on at the end',
      'Decks and spreadsheets turned into interactive, explorable experiences',
      'Value proven in flight on a procurement reinvention',
    ],
  },
]
