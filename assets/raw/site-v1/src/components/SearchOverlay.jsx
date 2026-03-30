import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowUpRight, Sparkles, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const searchIndex = [
  { title: 'Home', path: '/', description: 'Innovation X landing page', category: 'Page' },
  { title: 'About Us', path: '/about', description: 'Our story, vision, mission and team', category: 'Page' },
  { title: 'Kidovation', path: '/kidovation', description: 'Programs for kids aged 6–12', category: 'Brand' },
  { title: 'Kidovation Programs', path: '/kidovation#programs', description: 'Innovation Labs, STEM Workshops, Bootcamps', category: 'Programs' },
  { title: 'Future Labs', path: '/future-labs', description: 'Programs for teens aged 13–18+', category: 'Brand' },
  { title: 'Work With Us', path: '/work-with-us', description: 'Contact us, partnerships, schools, parents', category: 'Page' },
  { title: 'Contact Form', path: '/work-with-us', description: 'Get in touch — send us a message', category: 'Page' },
  { title: 'For Schools', path: '/work-with-us', description: 'Curriculum-aligned workshops for educators', category: 'Audience' },
  { title: 'For Partners', path: '/work-with-us', description: 'Co-branded programs, CSR, impact reporting', category: 'Audience' },
  { title: 'For Parents', path: '/work-with-us', description: 'Holiday workshops, after-school clubs', category: 'Audience' },
  { title: 'Innovation Labs', path: '/kidovation#programs', description: 'Creative problem-solving with design thinking', category: 'Programs' },
  { title: 'Entrepreneurship Bootcamps', path: '/kidovation#programs', description: 'Kids create mini-businesses from idea to pitch', category: 'Programs' },
  { title: 'STEM Workshops', path: '/kidovation#programs', description: 'Hands-on science and technology activities', category: 'Programs' },
  { title: 'Kidovation Week Challenge', path: '/kidovation#programs', description: 'Week-long innovation competition for teams', category: 'Programs' },
  { title: 'AI Education', path: '/kidovation', description: 'Learning about artificial intelligence for young people', category: 'Topic' },
  { title: 'Design Thinking', path: '/kidovation', description: 'Human-centred design and creative problem-solving', category: 'Topic' },
  { title: 'Privacy Policy', path: '/privacy', description: 'How we handle your data', category: 'Legal' },
  { title: 'Terms of Service', path: '/terms', description: 'Terms and conditions of use', category: 'Legal' },
  { title: 'Our Vision', path: '/about', description: 'Empowering young people to become creative leaders', category: 'Page' },
  { title: 'Gallery', path: '/kidovation', description: 'Photos from workshops, bootcamps and events', category: 'Page' },
]

const categoryColors = {
  Page: 'bg-gray-100 text-gray-500',
  Brand: 'bg-ix-purple/8 text-ix-purple',
  Programs: 'bg-kido-lime/15 text-kido-lime',
  Audience: 'bg-ix-blue/8 text-ix-blue',
  Topic: 'bg-kido-pink/15 text-kido-pink',
  Legal: 'bg-gray-100 text-gray-500',
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const navigate = useNavigate()

  const results = query.trim().length > 0
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : []

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navigateTo = useCallback((path) => {
    onClose()
    const [pathname, hash] = path.split('#')
    navigate(pathname)
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [navigate, onClose])

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) return
      }
      if (!open) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => {
          const next = Math.min(i + 1, results.length - 1)
          resultsRef.current?.children[next]?.scrollIntoView({ block: 'nearest' })
          return next
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => {
          const next = Math.max(i - 1, 0)
          resultsRef.current?.children[next]?.scrollIntoView({ block: 'nearest' })
          return next
        })
      } else if (e.key === 'Enter' && results[activeIndex]) {
        navigateTo(results[activeIndex].path)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose, results, activeIndex, navigateTo])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.userAgent)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] sm:pt-[18vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[580px] mx-4 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_80px_-12px_rgba(124,58,237,0.15),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3.5 px-6 py-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ix-purple to-ix-blue flex items-center justify-center shrink-0 shadow-lg shadow-ix-purple/20">
                <Search size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, programs, topics..."
                className="flex-1 text-[17px] text-gray-900 placeholder:text-gray-400 outline-none bg-transparent font-medium"
              />
              <button
                onClick={onClose}
                className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Results */}
            {query.trim().length > 0 ? (
              <div ref={resultsRef} className="max-h-[340px] overflow-y-auto py-2 px-2">
                {results.length > 0 ? (
                  results.map((item, i) => (
                    <motion.button
                      key={`${item.path}-${i}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      onClick={() => navigateTo(item.path)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-150 group ${
                        i === activeIndex
                          ? 'bg-gradient-to-r from-ix-purple/[0.06] to-ix-blue/[0.04]'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <span className={`text-[15px] font-semibold tracking-tight font-heading truncate ${
                            i === activeIndex ? 'text-ix-purple' : 'text-gray-900'
                          }`}>
                            {item.title}
                          </span>
                          <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            categoryColors[item.category] || 'bg-gray-100 text-gray-500'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[13px] text-gray-400 truncate leading-relaxed">{item.description}</div>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className={`shrink-0 transition-all duration-200 ${
                          i === activeIndex
                            ? 'text-ix-purple opacity-100 translate-x-0'
                            : 'text-gray-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      />
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center">
                    <Search size={32} className="mx-auto mb-3 text-gray-200" />
                    <p className="text-gray-400 text-sm font-medium">No results for "{query}"</p>
                    <p className="text-gray-300 text-xs mt-1">Try a different keyword</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-6 py-10 text-center">
                <Sparkles size={28} className="mx-auto mb-3 text-ix-purple/20" />
                <p className="text-gray-400 text-sm font-medium">Search across all pages and programs</p>
              </div>
            )}

            {/* Footer */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px]">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px]">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px]">esc</kbd>
                  close
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-300">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-[10px]">
                  {isMac ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-[10px]">K</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
