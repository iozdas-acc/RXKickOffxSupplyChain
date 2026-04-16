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
    slug: 'intro',
    label: '01 · IMPACT AT A GLANCE',
    title: 'Impact at a Glance',
    titleLines: ['RX HAS', 'DELIVERED.'],
    subtitle: 'Measurable, compounding impact at Sainsbury\'s enterprise scale.',
    emotion: 'conviction',
    accentColor: '#F06C00',
    sceneMode: 'assemble',
    keyMessages: [
      'Proved delivery at enterprise scale inside a £400m procurement deal',
      'AI embedded at every stage — not bolted on at the end',
      '8-week compressed timeline with four live outputs',
    ],
  },
  {
    id: 1,
    slug: 'the-project',
    label: '02 · THE PROJECT',
    title: 'The Procurement Transformation',
    titleLines: ['12 WEEKS.', 'ONE SHOT.', 'AI-EMBEDDED.'],
    subtitle: 'We turned discovery into a sales advantage.',
    emotion: 'urgency',
    accentColor: '#0891B2',
    sceneMode: 'shelves',
    keyMessages: [
      '£400m deal — 3 weeks in — no option to restart or slow down',
      'Three simultaneous deliverables: Art of the Possible, Discovery Findings, Future POV',
      'JAR+AI Discovery Engine cut 12-week timeline to 8 weeks',
    ],
  },
  {
    id: 2,
    slug: 'the-learning',
    label: '03 · WHAT WE LEARNED',
    title: 'What We Learned',
    titleLines: ['PACE MISMATCH', 'KILLS', 'DISCOVERY.'],
    subtitle: 'Move faster. Experience more. Build belief earlier.',
    emotion: 'clarity',
    accentColor: '#059669',
    sceneMode: 'transform',
    keyMessages: [
      'Traditional consulting pace doesn\'t build client belief fast enough',
      'AI-enabled speed unlocks bolder ambition — clients say yes to things they\'d normally hedge',
      'The shift isn\'t about replacing consultants — it\'s about removing friction from conviction',
    ],
  },
  {
    id: 3,
    slug: 'the-model',
    label: '04 · THE HYBRID MODEL',
    title: 'The Hybrid Approach',
    titleLines: ['H3 VISION +', 'H1 EXECUTION', '= THE MODEL.'],
    subtitle: 'RX acceleration in the first half. Consulting agent tail in the second.',
    emotion: 'resolve',
    accentColor: '#7C3AED',
    sceneMode: 'zones',
    keyMessages: [
      'H3 (vision) and H1 (delivery) run simultaneously — not sequentially',
      'H2 (foundation) emerges from the intersection — not designed upfront',
      'RX squad in W1-4, consulting agent continuation in W5-8',
    ],
  },
  {
    id: 4,
    slug: 'the-template',
    label: '05 · THE FUTURE',
    title: 'The Future of Agentic Transformation',
    titleLines: ['EVERY', 'ENGAGEMENT.', 'THIS WAY.'],
    subtitle: 'The Sainsbury\'s model is now the template for all future agentic transformation.',
    emotion: 'momentum',
    accentColor: '#A100FF',
    sceneMode: 'network',
    keyMessages: [
      'The H1-H3 story arc is the delivery template — not just the slide deck',
      'JAR+AI is the engine, the hybrid model is the commercial shape',
      'This is how RX enters every agentic transformation engagement from here',
    ],
  },
]
