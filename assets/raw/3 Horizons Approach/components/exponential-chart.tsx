"use client"

import { useEffect, useRef, useState } from "react"

const horizons = [
  {
    id: "h1",
    label: "Horizon I",
    title: "Quick Wins & Optimisation",
    description: "Copilot, local apps, workflow automation",
    color: "#f59e0b",
  },
  {
    id: "h2",
    label: "Horizon II",
    title: "Ecosystem & Infrastructure",
    description: "AI COE, integrated platforms, governance",
    color: "#0ea5e9",
  },
  {
    id: "h3",
    label: "Horizon III",
    title: "Bold Bets & Vision",
    description: "Autonomous operations, self-improving systems",
    color: "#10b981",
  },
]

export function ExponentialChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full">
      {/* Chart Container */}
      <div className="relative bg-[#0f172a] rounded-xl border border-[#334155]/50 p-6 md:p-8">
        {/* SVG Chart - wider aspect ratio */}
        <div className="relative w-full aspect-[2.5/1] md:aspect-[3/1] mb-8">
          <svg
            ref={svgRef}
            viewBox="0 0 120 40"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            <g className="opacity-20">
              {[10, 20, 30].map((y) => (
                <line key={y} x1="5" y1={y} x2="115" y2={y} stroke="#475569" strokeWidth="0.2" />
              ))}
              {[30, 60, 90].map((x) => (
                <line key={x} x1={x} y1="5" x2={x} y2="35" stroke="#475569" strokeWidth="0.2" />
              ))}
            </g>

            {/* Area under curve */}
            <path
              d="M 10 34 Q 35 32, 55 26 T 85 14 T 110 4 L 110 36 L 10 36 Z"
              fill="url(#areaGradient)"
              className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            />

            {/* Linear path (dotted) showing incremental approach */}
            <path
              d="M 10 34 L 110 18"
              fill="none"
              stroke="#475569"
              strokeWidth="0.4"
              strokeDasharray="2 1.5"
              className={`transition-opacity duration-1000 delay-300 ${isVisible ? "opacity-50" : "opacity-0"}`}
            />
            
            

            {/* Main exponential curve */}
            <path
              d="M 10 34 Q 35 32, 55 26 T 85 14 T 110 4"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
              filter="url(#glow)"
              className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            />

            {/* Horizon markers on curve */}
            {[
              { x: 25, y: 32, color: "#f59e0b" },
              { x: 45, y: 28, color: "#0ea5e9" },
              { x: 100, y: 6, color: "#10b981" },
            ].map((point, index) => (
              <g
                key={index}
                className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                {/* Outer glow */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill={point.color}
                  opacity="0.3"
                />
                {/* Main dot */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="1.8"
                  fill={point.color}
                  filter="url(#glow)"
                />
              </g>
            ))}

            {/* Gap annotation - positioned between dotted and gradient lines at the right side */}
            <g className={`transition-opacity duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {/* Vertical line showing the gap - positioned between exponential and linear lines */}
              <line
                x1="105"
                y1="8"
                x2="105"
                y2="17"
                stroke="#94a3b8"
                strokeWidth="0.4"
                strokeDasharray="1 0.5"
              />
              {/* Small horizontal ticks at top and bottom of gap line */}
              <line x1="104" y1="8" x2="106" y2="8" stroke="#94a3b8" strokeWidth="0.3" />
              <line x1="104" y1="17" x2="106" y2="17" stroke="#94a3b8" strokeWidth="0.3" />
              
              {/* Wrapped text positioned below the gap line, right-aligned to not exceed gradient line */}
              <text
                x="108"
                y="24"
                fill="#94a3b8"
                fontSize="1.8"
                textAnchor="end"
              >
                <tspan x="108" dy="0">Seismic shift in</tspan>
                <tspan x="108" dy="2.2">customer behaviour,</tspan>
                <tspan x="108" dy="2.2">business model,</tspan>
                <tspan x="108" dy="2.2">technology and architecture</tspan>
              </text>
            </g>


          </svg>
        </div>

        {/* Horizon Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {horizons.map((horizon, index) => (
            <div
              key={horizon.id}
              className={`relative bg-[#1e293b]/60 rounded-lg p-4 border border-[#334155]/50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Pill label */}
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ 
                  backgroundColor: `${horizon.color}20`,
                  color: horizon.color,
                }}
              >
                {horizon.label}
              </span>
              
              {/* Title */}
              <h4 className="text-white font-semibold text-sm mb-1">
                {horizon.title}
              </h4>
              
              {/* Description */}
              <p className="text-slate-400 text-xs leading-relaxed">
                {horizon.description}
              </p>

              {/* Top accent line */}
              <div 
                className="absolute top-0 left-4 right-4 h-px"
                style={{ backgroundColor: horizon.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
