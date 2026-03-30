import type { Metadata } from 'next'
import AboutHero from '@/components/about/Hero'
import Story from '@/components/about/Story'
import Timeline from '@/components/about/Timeline'
import Team from '@/components/about/Team'
import BrandEvolution from '@/components/about/BrandEvolution'

export const metadata: Metadata = {
  title: 'About Us — Ten Years of Real Innovation',
  description:
    'Innovation X was founded in 2015 by Fiona Russell inside Accenture Song. Three generations, 12 markets, 3,111 young people. The story of how we got here.',
  openGraph: {
    title: 'About Innovation X',
    description: 'Ten years, three generations, one mission.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <a href="#about-main" className="skip-link">Skip to main content</a>
      <main id="about-main">
        <AboutHero />
        <Story />
        <Timeline />
        <Team />
        <BrandEvolution />
      </main>
    </>
  )
}
