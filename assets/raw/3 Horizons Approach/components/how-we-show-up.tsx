"use client"

import { Users, Brain, Wrench } from "lucide-react"

const pillars = [
  {
    icon: Users,
    title: "The Team",
    subtitle: "Deep expertise meets execution",
    description:
      "Industry veterans and functional specialists who understand your business. We bring the right people at the right time — from strategy through delivery.",
    highlights: [
      "Industry & functional expertise",
      "Strategy-to-execution continuity",
      "Embedded change leadership",
    ],
  },
  {
    icon: Brain,
    title: "The Thinking",
    subtitle: "AI-native from day one",
    description:
      "We don't retrofit AI onto old processes. We reimagine what's possible when AI is the starting point — designing for autonomous operations from the outset.",
    highlights: [
      "Horizon-based value staging",
      "Process reimagination",
      "Autonomous-first design",
    ],
  },
  {
    icon: Wrench,
    title: "The Tooling",
    subtitle: "Human + Agent execution",
    description:
      "Purpose-built accelerators and agent frameworks that amplify your teams. Our tooling enables rapid deployment while building lasting internal capability.",
    highlights: [
      "Agent-powered accelerators",
      "Rapid deployment frameworks",
      "Capability building at scale",
    ],
  },
]

export function HowWeShowUp() {
  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#14b8a6]" />
          <span className="text-[#14b8a6] uppercase tracking-[0.2em] text-xs font-medium">
            How We Show Up Differently
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#14b8a6]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          The RX Difference
        </h2>
      </div>

      {/* Three Pillars */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="group">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14b8a6]/20 to-[#a3e635]/10 border border-[#14b8a6]/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <pillar.icon className="w-7 h-7 text-[#14b8a6]" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-1">{pillar.title}</h3>
            <p className="text-[#14b8a6] text-sm font-medium mb-4">
              {pillar.subtitle}
            </p>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed mb-6">
              {pillar.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2">
              {pillar.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
