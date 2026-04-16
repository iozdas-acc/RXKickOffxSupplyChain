"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Eye, Compass, Rocket } from 'lucide-react'

const horizons = [
  {
    id: "H1",
    title: "Understand today's reality",
    subtitle: "Horizon 1",
    color: "#0891B2", // Cyan
    gradient: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/40",
    bgColor: "bg-cyan-500/10",
    icon: Eye,
    description: "Conduct a thorough current-state assessment to understand existing processes, uncover insights & pain points, and identify H1 optimisation opportunities.",
    examples: [
      "Embed MS Copilot & lightweight AI agents in daily workflows",
      "Deploy localised apps that solve specific pain points",
    ],
    step: "STEP 1",
  },
  {
    id: "H3",
    title: "Define the target-state ambition",
    subtitle: "Horizon 3",
    color: "#7C3AED", // Purple
    gradient: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/40",
    bgColor: "bg-purple-500/10",
    icon: Rocket,
    description: "Define a clear, compelling vision for Horizon 3, making bold bets on what the future of your business will look like.",
    examples: [
      "End-to-end autonomous, self-optimising operations at scale",
      "New AI-enabled business models and revenue streams",
    ],
    step: "STEP 1",
  },
  {
    id: "H2",
    title: "Analyse the gap & build foundations",
    subtitle: "Horizon 2",
    color: "#059669", // Emerald
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/40",
    bgColor: "bg-emerald-500/10",
    icon: Compass,
    description: "Perform a gap analysis to identify the Horizon 2 investments required for the Horizon 3 vision - no-regrets moves and large bets that bridge the exponential gap.",
    examples: [
      "Establish AI CoE for governance and scaling foundations",
      "Build core architecture and data foundations for human and agent interactions at scale",
    ],
    step: "STEP 2",
  },
]

export function HorizonsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="horizons" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Strategic Framework</span>
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            The Horizons Framework for Process Reinvention
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining right-to-left vision with left-to-right execution to define the path across three horizons.
          </p>
        </motion.div>

        {/* New layout: Step 1 (H1 + H3) side by side, arrows converging to Step 2 (H2) */}
        <div className="relative">
          {/* Step 1: H1 and H3 in parallel */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 mb-8">
            {horizons.slice(0, 2).map((horizon, index) => (
              <motion.div
                key={horizon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                {/* Step pill at top */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex justify-center mb-4"
                >
                  <div 
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-to-r ${horizon.gradient}`}
                  >
                    {horizon.step}
                  </div>
                </motion.div>

                {/* Card */}
                <div 
                  className={`bg-white rounded-2xl border-2 p-6 h-full transition-all duration-300 hover:shadow-xl ${horizon.borderColor}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${horizon.bgColor}`}
                    >
                      <horizon.icon className="w-7 h-7" style={{ color: horizon.color }} />
                    </div>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${horizon.gradient}`}
                    >
                      {horizon.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: horizon.color }}>
                      {horizon.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-foreground mb-3">{horizon.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{horizon.description}</p>
                  </div>

                  {/* Examples */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Examples</p>
                    <ul className="space-y-2">
                      {horizon.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span 
                            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: horizon.color }}
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Converging arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative h-20 md:h-24 flex items-center justify-center"
          >
            {/* Left arrow from H1 */}
            <svg 
              className="absolute left-1/4 md:left-[20%] top-0 w-24 md:w-32 h-full"
              viewBox="0 0 100 80" 
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 10 10 Q 50 10 70 40 Q 90 70 90 70"
                stroke="#0891B2"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.polygon
                points="83,70 93,78 93,66"
                fill="#0891B2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.4 }}
              />
            </svg>

            {/* Right arrow from H3 */}
            <svg 
              className="absolute right-1/4 md:right-[20%] top-0 w-24 md:w-32 h-full"
              viewBox="0 0 100 80" 
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 90 10 Q 50 10 30 40 Q 10 70 10 70"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.polygon
                points="17,70 7,78 7,66"
                fill="#7C3AED"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.4 }}
              />
            </svg>
          </motion.div>

          {/* Step 2: H2 centered below */}
          {(() => {
            const h2 = horizons[2]
            const H2Icon = h2.icon
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                {/* Step pill at top */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex justify-center mb-4"
                >
                  <div 
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-to-r ${h2.gradient}`}
                  >
                    {h2.step}
                  </div>
                </motion.div>

                {/* Card */}
                <div 
                  className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${h2.borderColor}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${h2.bgColor}`}
                    >
                      <H2Icon className="w-7 h-7" style={{ color: h2.color }} />
                    </div>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${h2.gradient}`}
                    >
                      {h2.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: h2.color }}>
                      {h2.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-foreground mb-3">{h2.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{h2.description}</p>
                  </div>

                  {/* Examples */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Examples</p>
                    <ul className="space-y-2">
                      {h2.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span 
                            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: h2.color }}
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })()}
        </div>

        {/* Direction indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-[#0891B2]">H1</span>
            <span className="text-foreground">+</span>
            <span className="font-medium text-[#7C3AED]">H3</span>
            <span>in parallel</span>
            <div className="flex items-center gap-1">
              <span className="w-6 h-0.5 bg-muted-foreground/40 rounded-full" />
              <span className="text-muted-foreground">→</span>
            </div>
            <span>converge into</span>
            <span className="font-medium text-[#059669]">H2</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
