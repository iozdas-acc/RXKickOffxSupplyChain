'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

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

const timelineData: PhaseData[] = [
  {
    phase: '1',
    weeks: 'Mobilise',
    title: 'Preparation & Setup',
    horizonActivities: [{
      horizon: 'All Horizons',
      horizonColor: '#F06C00',
      activities: [
        'Collect existing process maps',
        'Map & mobilise stakeholders',
        'Schedule workshops & interviews',
        'Set up JAR+AI instance',
        'Prepare data request',
      ],
    }],
  },
  {
    phase: '2',
    weeks: 'Weeks 1–3',
    title: 'Parallel Discovery',
    horizonActivities: [
      {
        horizon: 'H3: Define Ambition',
        horizonColor: '#7C3AED',
        gradient: 'from-purple-500 to-pink-500',
        activities: [
          'Conduct leadership interviews',
          'Real-time interview analysis',
          'Conduct external scan',
          'Generate & refine H3 narrative, persona journey and demos',
        ],
      },
      {
        horizon: 'H1: Understand Reality',
        horizonColor: '#0891B2',
        gradient: 'from-cyan-500 to-blue-500',
        activities: [
          'Validate L1-4 process taxonomy',
          'Generate survey & refine with leadership',
          'Release survey to employees',
        ],
      },
    ],
    workshops: ['Art of the Possible Workshop (Week 3)'],
  },
  {
    phase: '3',
    weeks: 'Weeks 4–5',
    title: 'Validate & Converge',
    horizonActivities: [
      {
        horizon: 'H3: Define Ambition',
        horizonColor: '#7C3AED',
        gradient: 'from-purple-500 to-pink-500',
        activities: ['Validate & refine H3 ambition'],
      },
      {
        horizon: 'H1: Understand Reality',
        horizonColor: '#0891B2',
        gradient: 'from-cyan-500 to-blue-500',
        activities: [
          'Collect survey responses',
          'Analyse & synthesise survey responses',
          'Identify key themes and pain points',
        ],
      },
      {
        horizon: 'H2: Gap Analysis',
        horizonColor: '#059669',
        gradient: 'from-emerald-500 to-teal-500',
        activities: ['Begin lens analysis of L4 processes', 'Identify key opportunity areas'],
      },
    ],
    outputs: [
      { text: 'H3 Narrative, Persona Journey & Demos', horizon: 'H3', color: '#7C3AED' },
      { text: 'H1 Insights, Pain Point Explorer & Persona Journey', horizon: 'H1', color: '#0891B2' },
    ],
    milestone: 'V1 of all outputs',
  },
  {
    phase: '4',
    weeks: 'Weeks 6–7',
    title: 'Refine Roadmap',
    horizonActivities: [{
      horizon: 'H2: Gap Analysis & Roadmap',
      horizonColor: '#059669',
      gradient: 'from-emerald-500 to-teal-500',
      activities: [
        'Refine key opportunity areas',
        'Define value summary and high-level roadmap',
        'Ongoing refinement via JAR+AI Consulting Agent',
      ],
    }],
    workshops: ['Gap-Analysis Workshop (Week 6)', 'Opportunity & Value Workshop (Week 7)'],
  },
  {
    phase: '5',
    weeks: 'Week 8',
    title: 'Final Playback & Handover',
    horizonActivities: [{
      horizon: 'All Horizons',
      horizonColor: '#F06C00',
      activities: [
        'Final playback presentation',
        'Handover documentation',
        'Always-on alignment, co-creation & feedback',
      ],
    }],
    workshops: ['Final Playback & Handover Workshop'],
    outputs: [{ text: 'H2 Transformation Opportunities, Roadmap & Value Story', horizon: 'H2', color: '#059669' }],
    milestone: 'Outputs finalised',
  },
]

function TimelineCard({
  data,
  index,
  isExpanded,
  onToggle,
}: {
  data: PhaseData
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: index * 0.08 }}
      className="relative"
    >
      <div className="absolute left-0 top-6 w-4 h-4 rounded-full border-4 border-white z-10 bg-[#F06C00]" />

      <div className="ml-8 bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-shadow">
        <button
          onClick={onToggle}
          className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#F06C00] whitespace-nowrap">
              {data.weeks}
            </div>
            <div>
              <h4 className="font-semibold text-[#1A1A1A]">{data.title}</h4>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {data.horizonActivities.map((ha, i) => (
                  ha.horizon === 'All Horizons' ? (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded font-semibold text-slate-600 bg-slate-100 border border-slate-200">
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
          <div className="flex items-center gap-3 flex-shrink-0 ml-3">
            {data.milestone && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
                <Check className="w-3 h-3" />
                {data.milestone}
              </span>
            )}
            {isExpanded
              ? <ChevronUp className="w-5 h-5 text-[#666666]" />
              : <ChevronDown className="w-5 h-5 text-[#666666]" />}
          </div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 border-t border-[#E5E5E5] pt-4">
            {data.milestone && (
              <div className="sm:hidden mb-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
                  <Check className="w-3 h-3" />
                  {data.milestone}
                </span>
              </div>
            )}

            <div className={`gap-6 mb-4 ${data.horizonActivities.length > 1 ? 'grid md:grid-cols-2 lg:grid-cols-3' : ''}`}>
              {data.horizonActivities.map((ha, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  {ha.horizon === 'All Horizons' ? (
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-slate-600 text-[10px] font-bold bg-slate-100 border border-slate-200">
                        All
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Cross-Horizon Activities
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: `${ha.horizonColor}30` }}>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold ${ha.gradient ? `bg-gradient-to-br ${ha.gradient}` : ''}`}
                        style={!ha.gradient ? { backgroundColor: ha.horizonColor } : {}}
                      >
                        {ha.horizon.split(':')[0]}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: ha.horizonColor }}>
                        {ha.horizon.split(':')[1]?.trim() || ha.horizon}
                      </p>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {ha.activities.map((activity, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {data.workshops && data.workshops.length > 0 && (
              <div className="mb-4 p-3 bg-[#F06C00]/5 border border-[#F06C00]/20 rounded-lg">
                <p className="text-xs font-medium text-[#F06C00] uppercase tracking-wider mb-2">Workshops</p>
                <div className="flex flex-wrap gap-2">
                  {data.workshops.map((w, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded text-xs font-medium text-[#1A1A1A] border border-[#F06C00]/20">
                      <div className="w-2 h-2 rotate-45 bg-[#F06C00]" />
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.outputs && data.outputs.length > 0 && (
              <div>
                <p className="text-xs font-medium text-[#666666] uppercase tracking-wider mb-3">Key Outputs</p>
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

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#F06C00]" />
            <span className="text-xs font-medium text-[#F06C00] uppercase tracking-widest">Project Plan &amp; Outputs</span>
            <div className="w-10 h-px bg-[#F06C00]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            8-Week Plan on a Page
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            An 8-week PVE sprint across the horizons, augmented by JAR+AI for real-time accelerated discovery.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-2 top-6 bottom-6 w-0.5 bg-[#F06C00]" />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.6 }}
          className="mt-10 bg-[#F5F5F5] rounded-xl p-5 border border-[#E5E5E5]"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-purple-500 to-pink-500">H3</div>
              <span className="text-[#666666]">Target-State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-cyan-500 to-blue-500">H1</div>
              <span className="text-[#666666]">Current-State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold bg-gradient-to-br from-emerald-500 to-teal-500">H2</div>
              <span className="text-[#666666]">Gap Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-[#666666]">AI Accelerated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
