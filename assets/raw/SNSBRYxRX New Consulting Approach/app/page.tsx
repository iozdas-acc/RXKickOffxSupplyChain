import { StickyNav } from '@/components/sticky-nav'
import { HeroSection } from '@/components/sections/hero'
import { ExecutiveSummarySection } from '@/components/sections/executive-summary'
import { FromToSection } from '@/components/sections/from-to'
import { HorizonsSection } from '@/components/sections/horizons'

import { JarAiEngineSection } from '@/components/sections/jar-ai-engine'
import { TimelineSection } from '@/components/sections/timeline'
import { TeamOutputsSection } from '@/components/sections/team-outputs'
import { CTASection } from '@/components/sections/cta'

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyNav />
      <HeroSection />
      <ExecutiveSummarySection />
      <FromToSection />
      <HorizonsSection />
      <JarAiEngineSection />
      <TimelineSection />
      <TeamOutputsSection />
      <CTASection />
    </main>
  )
}
