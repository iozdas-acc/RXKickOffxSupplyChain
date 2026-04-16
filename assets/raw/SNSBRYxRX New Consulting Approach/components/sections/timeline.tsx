"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Sparkles, Eye, FileText, Map, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HorizonActivity {
  horizon: string
  horizonColor: string
  gradient?: string
  activities: string[]
}

interface PhaseData {
  phase: string
  weeks: string
  title: string
  horizonActivities: HorizonActivity[]
  workshops?: string[]
  outputs?: { text: string; horizon: string; color: string }[]
  milestone?: string
}

const keyOutputs = [
  {
    icon: Eye,
    title: "Horizon 3 Vision \"North Star\"",
    description: "An outside-in vision narrative setting out the long-term ambition, future-state hypotheses, and interactive prototypes to bring the vision to life.",
    gradient: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/40",
  },
  {
    icon: FileText,
    title: "Horizon 1 World on a Page",
    description: "An overview of current-state process, with key pain points across people, process, and technology, and initial H1 opportunities.",
    gradient: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/40",
  },
  {
    icon: Compass,
    title: "Horizon 2 Gap Analysis \"Transformation Package\"",
    description: "Prioritised H2 transformation opportunities with target-state H2 architecture to build towards the H3 vision.",
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/40",
  },
  {
    icon: Map,
    title: "Opportunity Roadmap & Value Story",
    description: "A sequenced H1-H3 roadmap and supporting high-level value story, aligning initiatives, investment, and value over time.",
    gradient: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500/40",
  },
]

const timelineData: PhaseData[] = [
  {
    phase: "1",
    weeks: "Mobilise",
    title: "Preparation & Setup",
    horizonActivities: [
      {
        horizon: "All Horizons",
        horizonColor: "#F06C00",
        activities: [
          "Collect existing process maps",
          "Map & mobilise stakeholders",
          "Schedule workshops & interviews",
          "Set up JAR+AI instance",
          "Prepare data request",
        ],
      },
    ],
  },
  {
    phase: "2",
    weeks: "Weeks 1-3",
    title: "Parallel Discovery",
    horizonActivities: [
      {
        horizon: "H3: Define Ambition",
        horizonColor: "#7C3AED",
        gradient: "from-purple-500 to-pink-500",
        activities: [
          "Conduct leadership interviews",
          "Real-time interview analysis",
          "Conduct external scan",
          "Generate & refine H3 narrative, persona journey and demos",
        ],
      },
      {
        horizon: "H1: Understand Reality",
        horizonColor: "#0891B2",
        gradient: "from-cyan-500 to-blue-500",
        activities: [
          "Validate L1-4 process taxonomy",
          "Generate survey & refine with leadership",
          "Release survey to employees",
        ],
      },
    ],
    workshops: ["Art of the Possible Workshop (Week 3)"],
  },
  {
    phase: "3",
    weeks: "Weeks 4-5",
    title: "Validate & Converge",
    horizonActivities: [
      {
        horizon: "H3: Define Ambition",
        horizonColor: "#7C3AED",
        gradient: "from-purple-500 to-pink-500",
        activities: [
          "Validate & refine H3 ambition",
        ],
      },
      {
        horizon: "H1: Understand Reality",
        horizonColor: "#0891B2",
        gradient: "from-cyan-500 to-blue-500",
        activities: [
          "Collect survey responses",
          "Analyse & synthesise survey responses",
          "Identify key themes and pain points",
        ],
      },
      {
        horizon: "H2: Gap Analysis",
        horizonColor: "#059669",
        gradient: "from-emerald-500 to-teal-500",
        activities: [
          "Begin lens analysis of L4 processes",
          "Identify key opportunity areas",
        ],
      },
    ],
    outputs: [
      { text: "H3 Narrative, Persona Journey & Demos", horizon: "H3", color: "#7C3AED" },
      { text: "H1 Insights, Pain Point Explorer & Persona Journey", horizon: "H1", color: "#0891B2" },
    ],
    milestone: "V1 of all outputs",
  },
  {
    phase: "4",
    weeks: "Weeks 6-7",
    title: "Refine Roadmap",
    horizonActivities: [
      {
        horizon: "H2: Gap Analysis & Roadmap",
        horizonColor: "#059669",
        gradient: "from-emerald-500 to-teal-500",
        activities: [
          "Refine key opportunity areas",
          "Define value summary and high-level roadmap",
          "Ongoing refinement via JAR+AI Consulting Agent",
        ],
      },
    ],
    workshops: ["Gap-Analysis Workshop (Week 6)", "Opportunity & Value Workshop (Week 7)"],
  },
  {
    phase: "5",
    weeks: "Week 8",
    title: "Final Playback & Handover",
    horizonActivities: [
      {
        horizon: "All Horizons",
        horizonColor: "#F06C00",
        activities: [
          "Final playback presentation",
          "Handover documentation",
          "Always-on alignment, co-creation & feedback",
        ],
      },
    ],
    workshops: ["Final Playback & Handover Workshop"],
    outputs: [
      { text: "H2 Transformation Opportunities, Roadmap & Value Story", horizon: "H2", color: "#059669" },
    ],
    milestone: "Outputs finalised",
  },
]

const TimelineCard = ({ data, index, isExpanded, onToggle }: { 
  data: PhaseData
  index: number
  isExpanded: boolean
  onToggle: () => void
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const hasMultipleHorizons = data.horizonActivities.length > 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline dot - consistent orange */}
      <div className="absolute left-0 top-6 w-4 h-4 rounded-full border-4 border-white z-10 bg-[#F06C00]" />
      
      {/* Card */}
      <div className="ml-8 bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
        <button
          onClick={onToggle}
          className="w-full p-5 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-4">
            {/* Week pill - consistent orange */}
            <div className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#F06C00]">
              {data.weeks}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{data.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                {data.horizonActivities.map((ha, i) => (
                  ha.horizon === "All Horizons" ? (
                    <span 
                      key={i}
                      className="text-[10px] px-1.5 py-0.5 rounded font-semibold text-slate-600 bg-slate-100 border border-slate-200"
                    >
                      All Horizons
                    </span>
                  ) : (
                    <span 
                      key={i}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold text-white ${ha.gradient ? `bg-gradient-to-r ${ha.gradient}` : ''}`}
                      style={!ha.gradient ? { backgroundColor: ha.horizonColor } : {}}
                    >
                      {ha.horizon.split(':')[0]}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {data.milestone && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
                <Check className="w-3 h-3" />
                {data.milestone}
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>
        
        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 border-t border-border pt-4">
            {data.milestone && (
              <div className="sm:hidden mb-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
                  <Check className="w-3 h-3" />
                  {data.milestone}
                </span>
              </div>
            )}
            
            {/* Horizon activities - shown in columns if multiple */}
            <div className={cn(
              "gap-6 mb-4",
              hasMultipleHorizons ? "grid md:grid-cols-2 lg:grid-cols-3" : ""
            )}>
              {data.horizonActivities.map((ha, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  {ha.horizon === "All Horizons" ? (
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-slate-600 text-[10px] font-bold bg-slate-100 border border-slate-200">
                        All
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Cross-Horizon Activities
                      </p>
                    </div>
                  ) : (
                    <div 
                      className="flex items-center gap-2 mb-3 pb-2 border-b"
                      style={{ borderColor: `${ha.horizonColor}30` }}
                    >
                      <div 
                        className={`w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold ${ha.gradient ? `bg-gradient-to-br ${ha.gradient}` : ''}`}
                        style={!ha.gradient ? { backgroundColor: ha.horizonColor } : {}}
                      >
                        {ha.horizon.split(':')[0]}
                      </div>
                      <p 
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: ha.horizonColor }}
                      >
                        {ha.horizon.split(':')[1]?.trim() || ha.horizon}
                      </p>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {ha.activities.map((activity, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                        <Sparkles className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Workshops */}
            {data.workshops && data.workshops.length > 0 && (
              <div className="mb-4 p-3 bg-[#F06C00]/5 border border-[#F06C00]/20 rounded-lg">
                <p className="text-xs font-medium text-[#F06C00] uppercase tracking-wider mb-2">Workshops</p>
                <div className="flex flex-wrap gap-2">
                  {data.workshops.map((workshop, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded text-xs font-medium text-foreground border border-[#F06C00]/20"
                    >
                      <div className="w-2 h-2 rotate-45 bg-[#F06C00]" />
                      {workshop}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Outputs */}
            {data.outputs && data.outputs.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Key Outputs</p>
                <div className="space-y-2">
                  {data.outputs.map((output, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2 text-sm font-medium p-2 rounded-lg"
                      style={{ backgroundColor: `${output.color}10`, color: output.color }}
                    >
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{output.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="timeline" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Project Plan & Outputs</span>
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            8-Week Plan on a Page
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An 8-week PVE sprint across the horizons, augmented by JAR+AI for real-time accelerated discovery
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - consistent orange */}
          <div className="absolute left-2 top-6 bottom-6 w-0.5 bg-[#F06C00]" />
          
          {/* Timeline items */}
          <div className="space-y-4">
            {timelineData.map((data, index) => (
              <TimelineCard
                key={data.phase}
                data={data}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Summary footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-muted/50 rounded-xl p-6 border border-border"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-purple-500 to-pink-500">H3</div>
              <span className="text-muted-foreground">Target-State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-cyan-500 to-blue-500">H1</div>
              <span className="text-muted-foreground">Current-State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-emerald-500 to-teal-500">H2</div>
              <span className="text-muted-foreground">Gap Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-600" />
              <span className="text-muted-foreground">AI Accelerated</span>
            </div>
          </div>
        </motion.div>

        {/* Key Outputs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Key Outputs</h3>
          <p className="text-muted-foreground mb-6">
            Hosted and shared on an AI-generated, interactive microsite.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyOutputs.map((output, index) => (
              <motion.div
                key={output.title}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className={`bg-white rounded-xl p-5 border-2 h-full ${output.borderColor}`}
              >
                <div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br ${output.gradient}`}
                >
                  <output.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 text-sm">{output.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{output.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Example Outputs Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Example Outputs from Sainsbury&apos;s</h3>
          <p className="text-muted-foreground mb-6">
            Live examples of AI-generated outputs created during the Procurement engagement.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Horizon 3 Vision Narrative */}
            <motion.a
              href="https://v0-ai-disruption-page.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="group bg-white rounded-xl p-5 border-2 border-purple-500/40 hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-50 border border-cyan-200">
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 76 65" fill="none">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE"/>
                  </svg>
                  <span className="text-[10px] font-medium text-cyan-700">Vercel</span>
                </div>
              </div>
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                Procurement Horizon 3 Vision Narrative
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                An interactive narrative site showcasing the future-state vision for Sainsbury&apos;s Procurement.
              </p>
              <span className="text-xs font-medium text-purple-600 group-hover:underline">
                View live example →
              </span>
            </motion.a>

            {/* Pain Point Navigator */}
            <motion.a
              href="https://blobs.vusercontent.net/blob/Pain-point%20navigator%20%28updated%29-LlhAi99LddGletzsyrik73kX1KIFhD.html"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="group bg-white rounded-xl p-5 border-2 border-cyan-500/40 hover:border-cyan-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-50 border border-orange-200">
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] font-medium text-orange-700">Claude Code</span>
                </div>
              </div>
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-cyan-600 transition-colors">
                Procurement Pain Point Navigator
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                An interactive tool for exploring and navigating current-state pain points across the procurement process.
              </p>
              <span className="text-xs font-medium text-cyan-600 group-hover:underline">
                View live example →
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
