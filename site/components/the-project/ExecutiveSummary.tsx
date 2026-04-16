'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Clock, Zap, TrendingUp, Target } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const cards = [
  {
    icon: Clock,
    title: 'Compressed Timeline',
    body: 'From ~12 weeks to 8 weeks delivery through intelligent automation across every phase.',
  },
  {
    icon: Zap,
    title: 'AI-Driven Insights',
    body: 'Shifting from time-intensive manual analysis to real-time AI-powered synthesis and pattern recognition.',
  },
  {
    icon: TrendingUp,
    title: 'Accelerated Execution',
    body: 'Better-defined, AI-shaped initiatives that accelerate design and drive faster execution.',
  },
  {
    icon: Target,
    title: 'Enhanced Value',
    body: 'Doubled ROI on value cases identified through more rigorous, data-driven opportunity identification.',
  },
]

export default function ExecutiveSummary() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]">
      {/* Dot texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Orange glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F06C00]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      {/* Purple glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A100FF]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Overline */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0 }}
        >
          <div className="w-10 h-px bg-[#F06C00]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#F06C00]">
            EXECUTIVE SUMMARY
          </span>
        </motion.div>

        {/* H2 */}
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-white max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
        >
          A reinvented approach to Process Value Exploration
        </motion.h2>

        {/* Context block */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
        >
          <p className="text-white/80 leading-relaxed">
            During the Sainsbury&apos;s Procurement engagement, an opportunity emerged to accelerate and enhance
            our approach and outputs through AI. We stood up a blended team, combining deep industry, functional
            and Data &amp; AI expertise to co-create an AI-powered PVE transformation approach — embedding AI
            and intelligent automation across every phase of discovery.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#F06C00]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.3 + i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#F06C00]/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#F06C00]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{card.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Result statement */}
        <motion.p
          className="text-xl text-white font-medium max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.7 }}
        >
          The result? A faster, more rigorous engagement model with high-quality, AI-generated outputs.
        </motion.p>
      </div>
    </section>
  )
}
