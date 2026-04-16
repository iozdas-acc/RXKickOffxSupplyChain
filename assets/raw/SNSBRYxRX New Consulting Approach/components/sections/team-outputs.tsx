"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Users, Shield, ClipboardList, Sparkles, Code } from 'lucide-react'

export function TeamOutputsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Indicative Team Shape</span>
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Proposed Team Shape
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An AI-enabled delivery model grounded in SME oversight to ensure efficiency, relevance, and high-quality outputs
          </p>
        </motion.div>

        {/* Our Team - Circular Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-8 mb-12"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Our Team</h3>
          <p className="text-muted-foreground mb-10">
            A lean team, augmented with JAR+AI, blending deep industry and functional leadership with RX&apos;s AI delivery expertise.
          </p>

          {/* Team Structure - Grid Layout */}
          <div className="max-w-4xl mx-auto">
            {/* Leadership Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Delivery Lead */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-[#F06C00]/5 border border-[#F06C00]/20 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F06C00]/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#F06C00]" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Delivery Lead</p>
                </div>
                <p className="text-xs text-[#F06C00] leading-relaxed">Provides oversight and manages escalations</p>
              </motion.div>

              {/* RX Engagement Lead */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-[#A100FF]/5 border border-[#A100FF]/20 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#A100FF]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A100FF]" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">AI Strategy Lead</p>
                </div>
                <p className="text-xs text-[#A100FF] leading-relaxed">Provides oversight of AI-enabled delivery to ensure quality</p>
              </motion.div>
            </div>

            {/* Center: JAR+AI with Squads */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative bg-gradient-to-r from-[#F06C00]/5 via-white to-[#A100FF]/5 border border-border rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* OPT Squad */}
                <div className="text-center">
                  <div className="px-4 py-2 rounded-full border-2 border-[#F06C00] bg-white mb-2">
                    <p className="text-sm font-bold text-[#F06C00]">OPT Squad</p>
                    <p className="text-[10px] text-[#F06C00]/70">(Week 1-8)</p>
                  </div>
                </div>

                {/* Central JAR+AI */}
                <div className="flex flex-col items-center">
                  <p className="text-xs text-muted-foreground mb-2">Augmented by:</p>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F06C00] text-white shadow-lg shadow-[#F06C00]/20">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-lg font-bold">JAR+AI</span>
                  </div>
                </div>

                {/* RX Squad */}
                <div className="text-center">
                  <div className="px-4 py-2 rounded-full border-2 border-[#A100FF] bg-white mb-2">
                    <p className="text-sm font-bold text-[#A100FF]">RX Squad</p>
                    <p className="text-[10px] text-[#A100FF]/70">(Week 1-4)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Row: Supporting Roles */}
            <div className="grid grid-cols-3 gap-4">
              {/* Project Manager */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white border border-border rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-4 h-4 text-[#F06C00]" />
                  <p className="text-sm font-semibold text-foreground">Project Manager</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Manages day-to-day project activities and sits across all functional areas</p>
              </motion.div>

              {/* Process Leads */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="bg-white border border-border rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#F06C00]" />
                  <p className="text-sm font-semibold text-foreground">Process Leads</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Applies expertise & judgement to validate and refine AI-generated outputs</p>
              </motion.div>

              {/* AI Engineer Analyst */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="bg-white border border-border rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-[#A100FF]" />
                  <p className="text-sm font-semibold text-foreground">Data & AI Engineer</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Builds, configures, deploys & governs AI-generated outputs</p>
              </motion.div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
