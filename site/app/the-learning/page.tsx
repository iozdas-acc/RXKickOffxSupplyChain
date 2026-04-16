import ScrollUnlock from '@/components/the-learning/ScrollUnlock'
import LearningHero from '@/components/the-learning/Hero'
import ShiftTable from '@/components/the-learning/ShiftTable'
import ResultsPulse from '@/components/the-learning/ResultsPulse'
import TheVerdict from '@/components/the-learning/TheVerdict'
import Transition from '@/components/the-learning/Transition'

export default function TheLearningPage() {
  return (
    <main>
      <ScrollUnlock />
      <LearningHero />
      <ShiftTable />
      <ResultsPulse />
      <TheVerdict />
      <Transition />
    </main>
  )
}
