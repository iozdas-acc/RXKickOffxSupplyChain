'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const STATS = [
  { value: '1.5×', label: 'Faster Delivery' },
  { value: '30%', label: 'Less Effort' },
  { value: '2×', label: 'ROI on Value Cases' },
  { value: '8 wks', label: 'Compressed Timeline' },
]

export default function IntroHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),' +
            'linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Orange glow — top right */}
      <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-gradient-to-bl from-[#F06C00]/8 via-transparent to-transparent pointer-events-none" />

      {/* Purple glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-[#A100FF]/5 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl w-full mx-auto px-6 pt-20 pb-24 text-center">

        {/* Co-brand overline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-6 md:w-10 h-px bg-[#F06C00] flex-shrink-0" />
          <span className="text-[10px] md:text-xs font-medium text-[#F06C00] uppercase tracking-wider md:tracking-widest whitespace-nowrap">
            Sainsbury&apos;s Reinvention
          </span>
          <div className="w-6 md:w-10 h-px bg-[#F06C00] flex-shrink-0" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
          className="font-display font-bold italic leading-[1.1] text-[#1A1A1A] max-w-3xl mx-auto mb-14"
          style={{ fontSize: 'clamp(48px, 6.5vw, 84px)' }}
        >
          RX has delivered measurable, compounding impact at Sainsbury&apos;s.
        </motion.h1>

        {/* Stats — 2×2 grid on mobile, single row on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-y-8 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
              className="flex items-center justify-center md:justify-start"
            >
              <div className="text-center px-6 md:px-10">
                <div
                  className="font-bold tabular-nums text-[#F06C00]"
                  style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#666666] mt-1.5">{stat.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="w-px h-14 bg-[#E5E5E5] hidden md:block flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated JAR+AI central element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.45 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {/* Left flow lines */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={inView && !prefersReducedMotion ? { x: [0, 8, 0] } : { x: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-px bg-gradient-to-r from-transparent via-[#F06C00]/40 to-[#F06C00]/60 rounded-full"
            />
            <motion.div
              animate={inView && !prefersReducedMotion ? { x: [0, 6, 0] } : { x: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="w-10 h-px bg-gradient-to-r from-transparent via-[#F06C00]/30 to-[#F06C00]/50 rounded-full"
            />
          </div>

          {/* Central JAR+AI node */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F06C00] to-[#E55000] shadow-[0_8px_24px_rgba(240,108,0,0.3)] flex flex-col items-center justify-center gap-0.5">
              <motion.div
                animate={inView && !prefersReducedMotion ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : { scale: 1, opacity: 0.8 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </motion.div>
              <span className="text-white text-[10px] font-semibold tracking-wide">JAR+AI</span>
            </div>
            <motion.div
              animate={inView && !prefersReducedMotion ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-10px] border border-dashed border-[#A100FF]/30 rounded-3xl"
            />
          </div>

          {/* Right flow lines */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={inView && !prefersReducedMotion ? { x: [0, -6, 0] } : { x: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="w-10 h-px bg-gradient-to-l from-transparent via-[#A100FF]/30 to-[#A100FF]/50 rounded-full"
            />
            <motion.div
              animate={inView && !prefersReducedMotion ? { x: [0, -8, 0] } : { x: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-px bg-gradient-to-l from-transparent via-[#A100FF]/40 to-[#A100FF]/60 rounded-full"
            />
          </div>
        </motion.div>

        {/* Context line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.55 }}
          className="text-sm text-[#666666] tracking-wide mb-14"
        >
          Sainsbury&apos;s enterprise reinvention deal — procurement transformation. H1–H3 2025.
        </motion.p>

        {/* Advance prompt */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.7 }}
        >
          <Link
            href="/the-project"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#F06C00] transition-colors duration-150 group"
          >
            Here&apos;s how we did it
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </motion.div>
      </div>

      {/* Co-brand footer mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.9 }}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4"
      >
        <span className="text-xs font-medium tracking-wide text-[#F06C00]">Sainsbury&apos;s</span>
        <span className="w-6 h-px bg-[#E5E5E5]" />
        <span className="text-xs font-medium tracking-wide text-[#A100FF]">Accenture</span>
      </motion.div>
    </section>
  )
}
