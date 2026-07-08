'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const rows = [
  {
    from: 'Process-led, linear engagements',
    to: 'Horizons framework with parallel discovery workstreams',
  },
  {
    from: 'Time-intensive, manual analysis',
    to: 'Real-time, AI-powered diagnostics and insights',
  },
  {
    from: 'Traditional S&C delivery team',
    to: 'Data & AI capability integration and expertise',
  },
  {
    from: 'Static outputs (PowerPoint and Excel)',
    to: 'AI-generated, explorable executive narratives and outputs',
  },
  {
    from: 'Extended discovery timelines',
    to: 'Compressed timelines through JAR+AI Discovery Engine',
  },
  {
    from: 'Manual opportunity identification',
    to: 'Predictive opportunity development for faster execution',
  },
]

export default function ShiftTable() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-[#3DB19A]" />
            <span className="text-xs font-medium text-[#3DB19A] uppercase tracking-widest">What Changed</span>
            <div className="w-10 h-px bg-[#3DB19A]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1C2E]">
            From traditional PVE. To AI-powered transformation.
          </h2>
          <p className="text-[#666666] mt-3 max-w-xl mx-auto">
            Six structural shifts across every phase of delivery.
          </p>
        </motion.div>

        <div className="space-y-3">
          {rows.map((row, i) => (
            <motion.div
              key={row.from}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="cursor-default"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center">
                <div className="flex-1 bg-white border border-[#E5E5E5] rounded-xl md:rounded-r-none md:border-r-0 p-5">
                  <div className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F5F5F5] text-[#666666] inline-block mb-2">
                    Traditional
                  </div>
                  <p className="text-[#1C1C2E] text-sm">{row.from}</p>
                </div>

                <div className="hidden md:flex w-16 items-center justify-center bg-white border-y border-[#E5E5E5]">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  >
                    <ArrowRight className="w-5 h-5 text-[#3DB19A]" />
                  </motion.div>
                </div>

                <div className="flex md:hidden items-center justify-center py-2">
                  <ArrowRight className="w-5 h-5 text-[#3DB19A] rotate-90" />
                </div>

                <div className="flex-1 bg-[#3DB19A]/5 border border-[#3DB19A]/20 rounded-xl md:rounded-l-none md:border-l-0 p-5">
                  <div className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#3DB19A] text-white inline-block mb-2">
                    AI-Powered
                  </div>
                  <p className="text-[#1C1C2E] font-medium text-sm">{row.to}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
