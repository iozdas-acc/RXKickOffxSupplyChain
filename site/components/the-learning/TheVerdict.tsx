'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

export default function TheVerdict() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-10 h-px bg-[#F06C00]" />
          <span className="text-xs font-medium text-[#F06C00] uppercase tracking-widest">The Finding</span>
          <div className="w-10 h-px bg-[#F06C00]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-bold italic text-[#1A1A1A] text-center"
        >
          This isn&apos;t a client problem. It&apos;s a model problem.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.25 }}
          className="mt-6 text-[#666666] leading-relaxed text-center max-w-xl mx-auto"
        >
          The 12-week engagement proved RX&apos;s capability. It also revealed that the delivery model hadn&apos;t been designed for the pace of client adoption. RX didn&apos;t need to do less. It needed a model that gave the client room to do more — earlier, and at their speed.
        </motion.p>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.35 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', transition: { duration: 0.2 } }}
            className="bg-white border-2 border-[#E5E5E5] rounded-xl p-6 cursor-default"
          >
            <p className="text-xs text-[#666666] uppercase tracking-widest mb-3">What was proven</p>
            <p className="text-[#1A1A1A] font-medium leading-relaxed">
              RX can compress timelines, run AI-native discovery, and deliver outputs that reframe what&apos;s possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.45 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(240,108,0,0.12)', transition: { duration: 0.2 } }}
            className="bg-[#F06C00]/5 border-2 border-[#F06C00]/30 rounded-xl p-6 cursor-default"
          >
            <p className="text-xs text-[#F06C00] uppercase tracking-widest mb-3">What needed to change</p>
            <p className="text-[#1A1A1A] font-medium leading-relaxed">
              The engagement model needed to be redesigned for client absorption — not just for RX delivery speed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
