'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="pt-24 pb-16 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Overline */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0 }}
        >
          <div className="w-10 h-px bg-[#F06C00]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#F06C00]">
            THE PROCUREMENT TRANSFORMATION
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold italic text-[#1A1A1A] leading-tight"
          style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
        >
          A 12-week procurement engagement. Traditional structure. AI embedded throughout.
        </motion.h1>

        {/* Body */}
        <motion.p
          className="text-lg text-[#666666] max-w-2xl mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
        >
          Since joining Sainsbury&apos;s enterprise reinvention deal, RX led a procurement transformation
          that wove AI into every phase of delivery — not as a layer on top, but as the engine underneath.
        </motion.p>
      </div>
    </section>
  )
}
