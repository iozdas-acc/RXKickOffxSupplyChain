'use client'

import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

const phase1Points = [
  'Compressed discovery timelines with AI-native sprints',
  'Real-time diagnostic engine — Pain Point Navigator, Sarah Website',
  'Executive narratives generated at pace — explorable outputs, not static decks',
]

const phase2Points = [
  'Dedicated consulting agent embedded in client team',
  'Translates RX outputs into internal action and team capability',
  'Client learns to run AI-native processes independently',
]

export default function PhaseVisualizer() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-[#F06C00]" />
            <span className="text-xs font-medium text-[#F06C00] uppercase tracking-widest">The Model</span>
            <div className="w-10 h-px bg-[#F06C00]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Two phases. One continuous engagement.
          </h2>
          <p className="text-[#666666] mt-3 max-w-xl mx-auto">
            Phase 1 runs at RX pace. Phase 2 runs at client pace. Value creation never stops.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.05 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-[#E5E5E5] rounded-xl p-8 cursor-default"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#F06C00] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#F06C00] uppercase tracking-widest">Phase 1</p>
                <p className="font-display font-bold text-[#1A1A1A] text-lg">RX-Led Acceleration</p>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-[#F06C00]/10 border border-[#F06C00]/20 text-[#F06C00] text-xs font-medium mb-5">
              AI-Native Delivery
            </div>

            <ul className="space-y-3">
              {phase1Points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F06C00] mt-2 flex-shrink-0" />
                  <p className="text-[#444444] text-sm leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px rgba(124,58,237,0.12)', transition: { duration: 0.2 } }}
            className="bg-[#7C3AED]/5 border-2 border-[#7C3AED]/25 rounded-xl p-8 cursor-default"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-widest">Phase 2</p>
                <p className="font-display font-bold text-[#1A1A1A] text-lg">Consulting Agent</p>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-medium mb-5">
              Client-Paced Adoption
            </div>

            <ul className="space-y-3">
              {phase2Points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0" />
                  <p className="text-[#444444] text-sm leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Gradient timeline bar */}
        <div className="mt-6">
          <div className="h-1.5 rounded-full overflow-hidden bg-[#E5E5E5]">
            <div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #F06C00 0%, #F06C00 50%, #7C3AED 50%, #7C3AED 100%)' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#F06C00] uppercase tracking-widest font-medium">RX-led</span>
            <span className="text-[10px] text-[#7C3AED] uppercase tracking-widest font-medium">Agent-supported</span>
          </div>
        </div>
      </div>
    </section>
  )
}
