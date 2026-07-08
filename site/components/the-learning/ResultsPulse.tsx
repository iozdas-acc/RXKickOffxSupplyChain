'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

const pills = [
  'Clients felt understood faster',
  'Bolder ambition felt achievable',
  'Relationship shifted to partnership',
  'Ideas felt real — not theoretical',
  'Clients experienced AI speed directly',
  'Momentum stayed high throughout',
]

const costItems = [
  'Sustained senior bandwidth required across 12 consecutive weeks',
  'RX moves at consulting speed — clients absorb at adoption speed',
  "The capability was proven. The delivery model hadn\u2019t been designed for it.",
]

export default function ResultsPulse() {
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const topInView = useInView(topRef, { once: true, amount: 0.1 })
  const bottomInView = useInView(bottomRef, { once: true, amount: 0.1 })

  return (
    <section
      className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1C1C2E] via-[#222222] to-[#1C1C2E]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Results sub-section */}
        <div ref={topRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px bg-[#3DB19A]" />
              <span className="text-xs font-medium text-[#3DB19A] uppercase tracking-widest">
                What Clients Experienced
              </span>
              <div className="w-10 h-px bg-[#3DB19A]" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold italic text-white mt-3">
              Move faster. Experience more. Build belief earlier.
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            {pills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0 }}
                animate={topInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm transition-all duration-150 hover:border-white/25 hover:bg-white/10 hover:text-white cursor-default"
              >
                {pill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-10 w-full h-px bg-white/10" />

        {/* Cost sub-section */}
        <div ref={bottomRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={bottomInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-xs text-[#3DB19A] uppercase tracking-widest mb-3"
          >
            But —
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
            className="font-display text-2xl md:text-3xl font-bold italic text-white"
          >
            12 weeks at full RX pace. Too intensive for the client to absorb.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
            className="text-white/70 mt-4 max-w-2xl leading-relaxed"
          >
            The engagement demanded sustained senior attention, rapid decision-making, and continuous change absorption — for 12 consecutive weeks. That pace was right for RX. It was too much for the client to digest, buy into, and act on.
          </motion.p>

          <ul className="mt-8 space-y-3">
            {costItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={bottomInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DB19A] mt-2 flex-shrink-0" />
                <p className="text-white/80 text-sm leading-relaxed">{item}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
