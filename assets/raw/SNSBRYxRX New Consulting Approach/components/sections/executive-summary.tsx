"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Zap, TrendingUp, Clock, Target } from 'lucide-react'

const highlights = [
  {
    icon: Clock,
    title: "Compressed Timeline",
    description: "From approximately 12 weeks to 8 weeks delivery through intelligent automation across every phase.",
  },
  {
    icon: Zap,
    title: "AI-Driven Insights",
    description: "Shifting from time-intensive manual analysis to real-time AI-powered synthesis and pattern recognition.",
  },
  {
    icon: TrendingUp,
    title: "Accelerated Execution",
    description: "Better-defined, AI-shaped initiatives that accelerate design and drive faster execution.",
  },
  {
    icon: Target,
    title: "Enhanced Value",
    description: "Doubled ROI on value cases identified through more rigorous, data-driven opportunity identification.",
  },
]

export function ExecutiveSummarySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="executive-summary" className="py-24 md:py-32 relative overflow-hidden">
      {/* Distinctive gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F06C00]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A100FF]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Executive Summary</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-3xl text-balance">
            A reinvented approach to Process Value Exploration
          </h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Process Value Explorer (PVE) is an integrated set of methods and tools to help businesses 
            identify opportunities to drive value through standardisation, optimisation, automation, 
            and simplification across People, Process, and Technology dimensions.
          </p>
        </motion.div>

        {/* Context block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-16"
        >
          <p className="text-white/80 leading-relaxed">
            During the Sainsbury&apos;s Procurement engagement, an opportunity emerged to accelerate and enhance 
            our approach and outputs through AI. We stood up a blended team, combining deep industry, functional 
            and Data &amp; AI expertise to co-create an AI-powered PVE transformation approach - embedding AI and 
            intelligent automation across every phase of discovery.
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#F06C00]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#F06C00]/20 flex items-center justify-center group-hover:bg-[#F06C00]/30 transition-colors">
                  <item.icon className="w-6 h-6 text-[#F06C00]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-white font-medium max-w-3xl mx-auto">
            The result? A faster, more rigorous engagement model with high-quality, AI-generated outputs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
