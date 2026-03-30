import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, HelpCircle, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchOverlay from './SearchOverlay'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/kidovation', label: 'Kidovation' },
  { to: '/future-labs', label: 'Future Labs' },
  { to: '/work-with-us', label: 'Work With Us' },
]

const darkHeroPages = ['/', '/future-labs']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isDarkHero = darkHeroPages.includes(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
    document.body.style.overflow = mobileOpen ? '' : 'hidden'
  }

  const iconActions = [
    { Icon: Search, label: 'Search', action: () => setSearchOpen(true) },
    { Icon: HelpCircle, label: 'Help', action: () => navigate('/work-with-us') },
    { Icon: User, label: 'Profile', action: () => navigate('/about') },
  ]

  const isTransparent = isDarkHero && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.04)] border-b border-black/[0.04]'
            : isTransparent
              ? 'bg-transparent'
              : 'bg-white/60 backdrop-blur-xl'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-ix-purple to-ix-blue flex items-center justify-center shadow-lg shadow-ix-purple/25"
            >
              <span className="text-white font-bold text-sm font-heading">IX</span>
            </motion.div>
            <span className={`font-heading font-bold text-lg tracking-tight transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-gray-900'
            }`}>
              Innovation <span className={isTransparent ? 'text-white/80' : 'text-ix-purple'}>X</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? isTransparent
                      ? 'text-white bg-white/15'
                      : 'text-ix-purple bg-ix-purple/8'
                    : isTransparent
                      ? 'text-white/70 hover:text-white hover:bg-white/8'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
                {location.pathname === to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                      isTransparent ? 'bg-white' : 'bg-ix-purple'
                    }`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-0.5">
            {iconActions.map(({ Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isTransparent
                    ? 'text-white/50 hover:text-white hover:bg-white/8'
                    : 'text-gray-400 hover:text-ix-purple hover:bg-ix-purple/8'
                }`}
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.75} />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-18 bg-white/98 backdrop-blur-2xl z-40"
            >
              <div className="flex flex-col items-center justify-center h-full gap-2 -mt-18">
                {navLinks.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={to}
                      className={`text-2xl font-heading font-bold px-8 py-3 rounded-xl transition-all ${
                        location.pathname === to
                          ? 'text-ix-purple bg-ix-purple/8'
                          : 'text-gray-700 hover:text-ix-purple'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile search button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => { setMobileOpen(false); document.body.style.overflow = ''; setSearchOpen(true) }}
                    className="text-lg font-heading font-bold px-8 py-3 rounded-xl text-gray-500 hover:text-ix-purple flex items-center gap-2"
                  >
                    <Search size={18} /> Search
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
