'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Eye, FileText, Compass, Map } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const outputs = [
  {
    icon: Eye,
    title: 'Horizon 3 Vision "North Star"',
    description: 'An outside-in vision narrative setting out the long-term ambition, future-state hypotheses, and interactive prototypes.',
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/40',
  },
  {
    icon: FileText,
    title: 'Horizon 1 World on a Page',
    description: 'Current-state process overview with key pain points across people, process, and technology, and initial H1 opportunities.',
    gradient: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-500/40',
  },
  {
    icon: Compass,
    title: 'H2 Gap Analysis "Transformation Package"',
    description: 'Prioritised H2 transformation opportunities with target-state architecture to build towards the H3 vision.',
    gradient: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/40',
  },
  {
    icon: Map,
    title: 'Opportunity Roadmap & Value Story',
    description: 'A sequenced H1–H3 roadmap and supporting value story, aligning initiatives, investment, and value over time.',
    gradient: 'from-orange-500 to-amber-500',
    border: 'border-orange-500/40',
  },
]

const liveExamples = [
  {
    href: 'https://v0-ai-disruption-page.vercel.app/',
    icon: Eye,
    iconGradient: 'from-purple-500 to-pink-500',
    title: 'Procurement H3 Vision Narrative',
    description: 'An interactive narrative site showcasing the future-state vision for Sainsbury\'s Procurement.',
    linkLabel: 'View live example →',
    linkColor: 'text-purple-600 group-hover:text-purple-700',
    border: 'border-purple-500/40 hover:border-purple-500',
    badge: (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-50 border border-cyan-200">
        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 76 65" fill="none">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE" />
        </svg>
        <span className="text-[10px] font-medium text-cyan-700">Vercel</span>
      </div>
    ),
  },
  {
    href: 'https://blobs.vusercontent.net/blob/Pain-point%20navigator%20%28updated%29-LlhAi99LddGletzsyrik73kX1KIFhD.html',
    icon: FileText,
    iconGradient: 'from-cyan-500 to-blue-500',
    title: 'Procurement Pain Point Navigator',
    description: 'An interactive tool for exploring and navigating current-state pain points across the procurement process.',
    linkLabel: 'View live example →',
    linkColor: 'text-cyan-600 group-hover:text-cyan-700',
    border: 'border-cyan-500/40 hover:border-cyan-500',
    badge: (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-50 border border-orange-200">
        <span className="text-[10px] font-medium text-orange-700">Claude Code</span>
      </div>
    ),
  },
]

export default function KeyOutputs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-[#3DB19A]" />
            <span className="text-xs font-medium text-[#3DB19A] uppercase tracking-widest">Deliverables</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1C1C2E]">Key Outputs</h2>
          <p className="text-[#666666] mt-2">
            Hosted on AI-generated interactive microsites, shared with the Sainsbury&apos;s team.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {outputs.map((output, i) => (
            <motion.div
              key={output.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
              className={`bg-white rounded-xl p-5 border-2 ${output.border} h-full`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br ${output.gradient}`}>
                <output.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-[#1C1C2E] mb-2 text-sm">{output.title}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">{output.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {liveExamples.map((ex, i) => (
            <motion.a
              key={ex.title}
              href={ex.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.4 + i * 0.08 }}
              className={`group bg-white rounded-xl p-5 border-2 ${ex.border} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${ex.iconGradient}`}>
                  <ex.icon className="w-5 h-5 text-white" />
                </div>
                {ex.badge}
              </div>
              <h4 className="font-semibold text-[#1C1C2E] mb-1">{ex.title}</h4>
              <p className="text-xs text-[#666666] leading-relaxed mb-3">{ex.description}</p>
              <span className={`text-xs font-medium ${ex.linkColor} transition-colors`}>
                {ex.linkLabel}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
