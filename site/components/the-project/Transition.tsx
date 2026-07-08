'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

export default function Transition() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1C1C2E] via-[#2A2A2A] to-[#1C1C2E]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#3DB19A]/15 rounded-full blur-[60px] pointer-events-none" />

      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="text-xs font-medium text-[#3DB19A] uppercase tracking-widest mb-6"
        >
          But —
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.15 }}
          className="font-display font-bold italic text-white max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.2 }}
        >
          The outcomes were strong. The model had a problem.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.3 }}
          className="text-white/70 mt-5 max-w-xl mx-auto leading-relaxed"
        >
          12 weeks at full RX pace was too costly. The client needed time to adopt, digest, and buy in.
          That&apos;s not a client problem. It&apos;s a model problem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.45 }}
          className="mt-12"
        >
          <Link
            href="/the-learning"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#3DB19A] transition-colors duration-150 group"
          >
            What we learned
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
