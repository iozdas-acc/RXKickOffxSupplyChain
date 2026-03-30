import type { Metadata } from 'next'
import KidovationHero from '@/components/kidovation/Hero'
import WhatKidsDo from '@/components/kidovation/WhatKidsDo'
import Programs from '@/components/kidovation/Programs'
import KidoEventsGallery from '@/components/kidovation/EventsGallery'
import KidoImpactNumbers from '@/components/kidovation/ImpactNumbers'
import Materials from '@/components/kidovation/Materials'

export const metadata: Metadata = {
  title: 'Kidovation — Hands-on Innovation for Curious Kids',
  description:
    'Kidovation is a hands-on hackathon programme for ages 8–16, running across 12 markets. Real challenges, real teamwork, real impact.',
  openGraph: {
    title: 'Kidovation — Hands-on Innovation for Curious Kids',
    description: 'Hackathon programmes for young innovators aged 8–16.',
    type: 'website',
  },
}

export default function KidovationPage() {
  return (
    <>
      <a href="#kido-main" className="skip-link">Skip to main content</a>
      <main id="kido-main">
        <KidovationHero />
        <WhatKidsDo />
        <Programs />
        <KidoEventsGallery />
        <KidoImpactNumbers />
        <Materials />
      </main>
    </>
  )
}
