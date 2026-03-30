import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Kidovation from './pages/Kidovation'
import FutureLabs from './pages/FutureLabs'
import WorkWithUs from './pages/WorkWithUs'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kidovation" element={<Kidovation />} />
          <Route path="/future-labs" element={<FutureLabs />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
