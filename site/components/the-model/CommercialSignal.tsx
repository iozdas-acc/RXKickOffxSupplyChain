'use client'

import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

const stats = [
  {
    value: '2×',
    label: 'Delivery speed',
    sub: 'AI-native Phase 1 compresses discovery timelines',
  },
  {
    value: 'CCI',
    label: 'Maintained',
    sub: 'Consulting agent tail prevents the post-engagement drop',
  },
  {
    value: 'Zero',
    label: 'Trade-offs',
    sub: 'Speed and adoption both maintained within the same engagement',
  },
]

export default function CommercialSignal() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Stats row — mount-time animation */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 2.5 + i * 0.08 }}
              className="text-center"
            >
              <p
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: '#1A1A1A',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </p>
              <p className="text-[#F06C00] text-xs font-medium uppercase tracking-widest mt-2">{stat.label}</p>
              <p className="text-[#666666] text-sm mt-2 max-w-[200px] mx-auto">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E5E5] mb-16" />

        {/* The Principle */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 2.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-10 h-px bg-[#F06C00]" />
            <span className="text-xs font-medium text-[#F06C00] uppercase tracking-widest">The Principle</span>
            <div className="w-10 h-px bg-[#F06C00]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 2.9 }}
            className="font-display text-3xl md:text-4xl font-bold italic text-[#1A1A1A]"
          >
            This isn&apos;t a slower model. It&apos;s a smarter one.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 3.0 }}
            className="mt-6 text-[#666666] leading-relaxed max-w-2xl mx-auto"
          >
            The hybrid model doesn&apos;t trade speed for adoption. It sequences them intelligently.
            Phase 1 creates value at RX pace. Phase 2 captures it — ensuring the client can
            actually act on what was built. Both phases run within the same engagement. No gap. No ramp-down.
          </motion.p>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 3.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', transition: { duration: 0.2 } }}
              className="bg-white border-2 border-[#E5E5E5] rounded-xl p-6 cursor-default text-left"
            >
              <p className="text-xs text-[#666666] uppercase tracking-widest mb-3">Traditional engagement</p>
              <p className="text-[#1A1A1A] font-medium leading-relaxed text-sm">
                Deliver. Ramp down. Hope the client absorbs. CCI drops when RX leaves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 3.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(124,58,237,0.12)', transition: { duration: 0.2 } }}
              className="bg-[#7C3AED]/5 border-2 border-[#7C3AED]/25 rounded-xl p-6 cursor-default text-left"
            >
              <p className="text-xs text-[#7C3AED] uppercase tracking-widest mb-3">Hybrid model</p>
              <p className="text-[#1A1A1A] font-medium leading-relaxed text-sm">
                RX accelerates. Agent supports. Client adopts at pace. CCI stays high throughout.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
