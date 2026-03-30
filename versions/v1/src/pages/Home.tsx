import Nav from '../components/layout/Nav'
import Hero from '../components/home/Hero'
import WhatIsIX from '../components/home/WhatIsIX'
import Ecosystem from '../components/home/Ecosystem'
import Mission from '../components/home/Mission'
import EventsGlimpse from '../components/home/EventsGlimpse'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIsIX />
        <Ecosystem />
        <Mission />
        <EventsGlimpse />
      </main>
      <Footer />
    </>
  )
}
