import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import WhatIsIX from '@/components/home/WhatIsIX'
import Ecosystem from '@/components/home/Ecosystem'
import Mission from '@/components/home/Mission'
import Events from '@/components/home/Events'

export const metadata: Metadata = {
  title: 'Innovation X — Inspiring the Next Generation',
  description:
    'Innovation X is the home of Kidovation and Future Labs — hands-on programmes turning young people into confident innovators across 12 markets worldwide.',
  openGraph: {
    title: 'Innovation X — Inspiring the Next Generation',
    description:
      'Kidovation and Future Labs: hands-on innovation education for young people.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Skip link — first DOM element, WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />
        <Stats />
        <WhatIsIX />
        <Ecosystem />
        <Mission />
        <Events />
      </main>
    </>
  )
}
