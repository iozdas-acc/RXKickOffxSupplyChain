"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const transformations = [
  {
    from: "Process-led, linear engagements",
    to: "Horizons framework with parallel discovery workstreams",
  },
  {
    from: "Time-intensive, manual analysis",
    to: "Real-time, AI-powered diagnostics and insights",
  },
  {
    from: "Traditional S&C delivery team",
    to: "Data & AI capability integration and expertise",
  },
  {
    from: "Static outputs (PowerPoint and Excel)",
    to: "AI-generated, explorable executive narratives and outputs",
  },
  {
    from: "Extended discovery timelines",
    to: "Compressed timelines through JAR+AI Discovery Engine",
  },
  {
    from: "Manual opportunity identification and definition",
    to: "Predictive opportunity development for faster execution",
  },
]

export function FromToSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="from-to" className="py-24 md:py-32 bg-muted/30">
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
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Transforming our Approach</span>
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            From Traditional PVE to AI-Powered Process Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A step change in how we deliver value through process reinvention
          </p>
        </motion.div>

        {/* Transformation grid */}
        <div className="grid gap-4 md:gap-6">
          {transformations.map((item, index) => (
            <motion.div
              key={item.from}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0">
                {/* From state */}
                <div className="flex-1 bg-white border border-border rounded-xl p-5 md:rounded-r-none md:border-r-0">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      From
                    </span>
                    <p className="text-foreground">{item.from}</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center w-16 bg-white border-y border-border">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                  >
                    <ArrowRight className="w-5 h-5 text-[#F06C00]" />
                  </motion.div>
                </div>
                <div className="flex md:hidden items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-[#F06C00] rotate-90" />
                </div>

                {/* To state */}
                <div className="flex-1 bg-[#F06C00]/5 border border-[#F06C00]/20 rounded-xl p-5 md:rounded-l-none md:border-l-0">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F06C00] flex items-center justify-center text-xs font-medium text-white">
                      To
                    </span>
                    <p className="text-foreground font-medium">{item.to}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
