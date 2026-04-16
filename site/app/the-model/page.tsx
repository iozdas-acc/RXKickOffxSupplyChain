import ScrollUnlock from '@/components/the-model/ScrollUnlock'
import ModelHero from '@/components/the-model/ModelHero'
import PhaseVisualizer from '@/components/the-model/PhaseVisualizer'
import WhyItWorks from '@/components/the-model/WhyItWorks'
import CommercialSignal from '@/components/the-model/CommercialSignal'
import ModelTransition from '@/components/the-model/ModelTransition'

export default function TheModelPage() {
  return (
    <main>
      <ScrollUnlock />
      <ModelHero />
      <PhaseVisualizer />
      <WhyItWorks />
      <CommercialSignal />
      <ModelTransition />
    </main>
  )
}
