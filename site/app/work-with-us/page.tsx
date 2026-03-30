import type { Metadata } from 'next'
import WorkHero from '@/components/work-with-us/Hero'
import Schools from '@/components/work-with-us/Schools'
import Partners from '@/components/work-with-us/Partners'
import Parents from '@/components/work-with-us/Parents'
import ContactForm from '@/components/work-with-us/ContactForm'

export const metadata: Metadata = {
  title: 'Work With Us — Schools, Partners & Parents',
  description:
    'Partner with Innovation X as a school, corporate, or parent. Get involved with Kidovation and Future Labs across 12 markets.',
  openGraph: {
    title: 'Work With Innovation X',
    description: 'Schools, corporate partners, and parents — find your path.',
    type: 'website',
  },
}

export default function WorkWithUsPage() {
  return (
    <>
      <a href="#work-main" className="skip-link">Skip to main content</a>
      <main id="work-main">
        <WorkHero />
        <Schools />
        <Partners />
        <Parents />
        <ContactForm />
      </main>
    </>
  )
}
