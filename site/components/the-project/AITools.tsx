'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Brain, Map } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const HorizonsIcon = () => (
  <div className="flex flex-col gap-1">
    <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
      H1
    </div>
    <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-[9px] font-bold flex items-center justify-center">
      H2
    </div>
    <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
      H3
    </div>
  </div>
)

const tools = [
  {
    icon: <HorizonsIcon />,
    iconBg: null,
    title: 'Horizons Thinking',
    purpose:
      'Structured the discovery across three time horizons simultaneously — preventing the usual H1-first tunnel vision.',
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    title: 'Sarah',
    purpose:
      'Real-time interview analysis and synthesis — turned qualitative stakeholder conversations into structured insight patterns instantly.',
  },
  {
    icon: <Map className="w-6 h-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    title: 'Pain Point Navigator',
    purpose:
      'Interactive current-state pain point map built during the engagement, usable long after RX left the building.',
  },
]

export default function AITools() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Centred overline */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0 }}
        >
          <div className="w-10 h-px bg-[#3DB19A]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#3DB19A]">
            AI EMBEDDED
          </span>
          <div className="w-10 h-px bg-[#3DB19A]" />
        </motion.div>

        {/* H2 */}
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-[#1C1C2E] mt-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
        >
          Three tools. Woven into delivery.
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              className="bg-white rounded-xl border border-[#E5E5E5] p-6 hover:shadow-md hover:border-[#3DB19A]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
            >
              <div className="mb-4">
                {tool.iconBg ? (
                  <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center`}>
                    {tool.icon}
                  </div>
                ) : (
                  <div className="flex items-center justify-start">
                    {tool.icon}
                  </div>
                )}
              </div>
              <h3 className="text-[#1C1C2E] font-semibold text-lg mb-2">{tool.title}</h3>
              <p className="text-[#666666] text-sm leading-relaxed">{tool.purpose}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
