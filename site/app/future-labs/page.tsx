import type { Metadata } from 'next'
import FutureLabsHero from '@/components/future-labs/Hero'
import MissionVision from '@/components/future-labs/MissionVision'
import WhatYouDo from '@/components/future-labs/WhatYouDo'
import ComingSoon from '@/components/future-labs/ComingSoon'

export const metadata: Metadata = {
  title: 'Future Labs — Advanced Innovation for What\'s Next',
  description:
    'Future Labs is where 16+ innovators go deeper — into AI, product design, R&D, and the future of work. The next step after Kidovation.',
  openGraph: {
    title: 'Future Labs by Innovation X',
    description: 'Advanced innovation programme for 16+ young people.',
    type: 'website',
  },
}

export default function FutureLabsPage() {
  return (
    <>
      <a href="#fl-main" className="skip-link">Skip to main content</a>
      <main id="fl-main">
        <FutureLabsHero />
        <MissionVision />
        <WhatYouDo />
        <ComingSoon />
      </main>
    </>
  )
}
