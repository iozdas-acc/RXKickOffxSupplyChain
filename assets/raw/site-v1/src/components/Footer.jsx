import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Button from './Button'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ix-purple/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ix-blue/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10 relative z-10">
        {/* CTA Banner — immersive, asymmetric */}
        <div className="relative overflow-hidden rounded-[2rem] mb-20 noise-overlay">
          {/* Dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-ix-purple-dark to-[#0c1445]" />

          {/* Animated glow orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-ix-purple/25 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ x: [15, -15, 15], y: [10, -20, 10] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-ix-blue/20 rounded-full blur-[80px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-kido-pink/10 rounded-full blur-[60px]"
            />
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          </div>

          {/* Content — asymmetric layout */}
          <div className="relative z-10 p-10 md:p-14 lg:p-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              {/* Left — text */}
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-kido-lime/15 text-kido-lime text-xs font-bold uppercase tracking-wider border border-kido-lime/20">Kids</span>
                  <span className="px-3 py-1 rounded-full bg-fl-red/15 text-fl-red text-xs font-bold uppercase tracking-wider border border-fl-red/20">Teens</span>
                  <span className="px-3 py-1 rounded-full bg-ix-purple-light/15 text-ix-purple-light text-xs font-bold uppercase tracking-wider border border-ix-purple-light/20">Schools</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading tracking-[-0.03em] leading-[1.1]">
                  Ready to inspire the next generation?
                </h3>
                <p className="text-white/35 leading-relaxed text-lg max-w-[45ch]">
                  Join <span className="text-white/55 font-medium">schools, partners and parents</span> already part of the Innovation X ecosystem.
                </p>
              </div>

              {/* Right — CTA */}
              <div className="shrink-0">
                <Button to="/work-with-us" variant="white" icon={ArrowRight}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ix-purple to-ix-blue flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-sm font-heading">IX</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">Innovation X</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[28ch]">
              Powering the future of education, creativity and innovation for young people.
            </p>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.1em] text-gray-500 mb-5">
              Ecosystem
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/kidovation" className="text-gray-400 hover:text-kido-lime transition-colors duration-200 text-sm flex items-center gap-1.5 group">
                Kidovation <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
              <Link to="/future-labs" className="text-gray-400 hover:text-fl-red transition-colors duration-200 text-sm flex items-center gap-1.5 group">
                Future Labs <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.1em] text-gray-500 mb-5">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</Link>
              <Link to="/work-with-us" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Work With Us</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.1em] text-gray-500 mb-5">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@innovationx.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Email Us</a>
              <a href="https://linkedin.com/company/innovationx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">LinkedIn</a>
              <a href="https://instagram.com/innovationx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">&copy; 2026 Innovation X. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-600 hover:text-gray-400 text-sm transition-colors duration-200">Privacy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-400 text-sm transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
