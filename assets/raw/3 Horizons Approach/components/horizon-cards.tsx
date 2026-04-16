"use client"

import { Zap, Layers, Rocket, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const steps = [
  {
    id: 1,
    direction: "forward",
    icon: Zap,
    title: "Execute Horizon I",
    subtitle: "Quick Wins Now",
    description:
      "Deploy AI-powered tools immediately. Prove value fast. Build momentum and funding for larger bets.",
    color: "#f59e0b",
    items: ["Copilot deployment", "Process automation", "Data quality wins"],
  },
  {
    id: 2,
    direction: "bridge",
    icon: Layers,
    title: "Build Horizon II",
    subtitle: "The Bridge",
    description:
      "Invest in the infrastructure and capabilities that connect today's wins to tomorrow's vision.",
    color: "#0ea5e9",
    items: ["AI COE establishment", "Platform integration", "Governance frameworks"],
  },
  {
    id: 3,
    direction: "backward",
    icon: Rocket,
    title: "Vision Horizon III",
    subtitle: "Bold Transformation",
    description:
      "Define your autonomous future state. Work backwards to identify the no-regrets moves and large bets required.",
    color: "#10b981",
    items: ["Autonomous operations", "Self-improving systems", "New value creation"],
  },
]

export function HorizonCards() {
  return (
    <div>
      {/* Sub-header */}
      <div className="text-center mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-white">
          Dual Direction Execution
        </h3>
      </div>

      {/* Arrows positioned above the cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-4">
        {/* Left arrow - above Horizon I card */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider whitespace-nowrap">Start here</span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-500 to-slate-600" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-slate-500" />
        </div>
        
        {/* Empty middle - above Horizon II card */}
        <div className="hidden md:block" />
        
        {/* Right arrow - above Horizon III card */}
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-slate-500" />
          <div className="h-[2px] flex-1 bg-gradient-to-l from-slate-500 to-slate-600" />
          <span className="text-xs text-slate-400 uppercase tracking-wider whitespace-nowrap">Start here</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative bg-[#1e293b]/80 backdrop-blur-sm rounded-xl p-6 border border-[#334155] hover:border-[#475569] transition-all duration-300"
          >
            {/* Direction indicator */}
            <div className="flex items-center gap-2 mb-4">
              {step.direction === "forward" && (
                <ArrowUpRight className="w-4 h-4 text-[#f59e0b]" />
              )}
              {step.direction === "bridge" && (
                <div className="flex">
                  <ArrowUpRight className="w-4 h-4 text-[#0ea5e9]" />
                  <ArrowDownLeft className="w-4 h-4 text-[#0ea5e9] -ml-2" />
                </div>
              )}
              {step.direction === "backward" && (
                <ArrowDownLeft className="w-4 h-4 text-[#10b981]" />
              )}
              <span
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: step.color }}
              >
                {step.direction === "forward"
                  ? "Execute Forward"
                  : step.direction === "bridge"
                  ? "Build & Connect"
                  : "Vision Backward"}
              </span>
            </div>

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${step.color}20` }}
            >
              <step.icon className="w-6 h-6" style={{ color: step.color }} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
            <p
              className="text-sm font-medium mb-3"
              style={{ color: step.color }}
            >
              {step.subtitle}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Items list */}
            <ul className="space-y-2">
              {step.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Subtle glow on hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 30px ${step.color}10`,
              }}
            />
          </div>
        ))}
      </div>

    </div>
  )
}
