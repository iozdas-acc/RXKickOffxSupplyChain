"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { Sparkles, Users, FileText, TrendingUp, Globe, MessageSquare, Code, Layers, ArrowRight } from 'lucide-react'

export function JarAiEngineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flowingParticles, setFlowingParticles] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowingParticles(prev => [...prev, Date.now()])
      setTimeout(() => {
        setFlowingParticles(prev => prev.slice(1))
      }, 3000)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const h3Inputs = [
    { icon: Users, label: 'Leadership Interviews', detail: 'AI-powered synthesis of interview transcripts', aiFeature: true },
    { icon: Globe, label: 'External Scan', detail: 'AI-enabled trend & benchmarking analysis', aiFeature: true },
  ]

  const h1Inputs = [
    { icon: MessageSquare, label: 'Employee Survey', detail: 'Dynamic, AI-enabled multi-modal survey (text, LLM, voice)', aiFeature: true },
    { icon: FileText, label: 'Document Analysis', detail: 'Automated ingestion of SOPs, process documents, org charts and KPI data', aiFeature: true },
  ]

  const h2Inputs = [
    { icon: Users, label: 'Feedback and priority alignment', detail: 'LLM consulting agent for always-on feedback and refinement of outputs', aiFeature: true },
  ]

  const h3Outputs = [
    { icon: FileText, label: 'Target-State Ambition Narrative', detail: 'AI-refined articulation of target-state vision and hypotheses on interactive narrative site', aiFeature: true, accelerators: ['Vercel'] },
    { icon: TrendingUp, label: 'Target-State Persona Journey and Demos', detail: 'AI-designed day in the life journeys and interactive demos of H3 concepts', aiFeature: true, accelerators: ['Vercel'] },
  ]

  const h1Outputs = [
    {
      icon: Layers,
      label: 'Problem Identification',
      details: [
        { text: 'Agent-led process mining, pain point and value leakage pattern recognition', aiFeature: true },
        { text: 'Dynamic HTML pain point navigation', claudeCodeFeature: true }
      ]
    },
    { icon: MessageSquare, label: 'Horizon 1 Opportunities', detail: 'AI-enabled tactical optimisations for H1', aiFeature: true },
  ]

  const h2Outputs = [
    { icon: TrendingUp, label: 'Gap Analysis & Opportunity Identification', detail: 'AI-led scanning and predictive gap analysis to identify opportunities', aiFeature: true },
    { icon: ArrowRight, label: 'Transformation Roadmap', detail: 'AI-generated opportunity roadmap (impact+effort)', aiFeature: true },
    { icon: Code, label: 'Interactive Prototypes', detail: 'Interactive demos for H2 transformation opportunities', accelerators: ['Vercel'] },
  ]

  const orbitingIcons = [
    { icon: Users, color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, color: 'from-cyan-500 to-blue-500' },
    { icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { icon: Globe, color: 'from-pink-500 to-rose-500' },
  ]

  const weeks = [
    {
      week: 'W1',
      description: 'Conduct leadership interviews to inform H3 ambition. Gather documents and refine employee survey for H1 analysis.'
    },
    {
      week: 'W2-4',
      description: 'Run Art of the Possible Workshop to refine H3 Ambition Narrative. Conduct employee survey for H1 analysis.'
    },
    {
      week: 'W5-7',
      description: 'Run Gap Analysis and Opportunity & Value Workshops to refine and prioritise H2 roadmap.'
    },
    {
      week: 'W8',
      description: 'Playback, refine and handover final deliverables.'
    },
  ]

  return (
    <section id="jar-ai" className="py-16 md:py-24 bg-gradient-to-br from-[#0a0e27] via-[#0f1538] to-[#0a0e27] text-white overflow-hidden relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header - kept from original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
            <span className="text-sm font-medium text-[#F06C00] uppercase tracking-wider">Engagement Approach</span>
            <div className="w-12 h-1 bg-[#F06C00] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            JAR+AI Discovery Engine: Our Accelerated Approach
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A rapid discovery approach to generate and refine insights across all horizons in real-time
          </p>
        </motion.div>

        {/* Figma design content starts here */}
        <div className="flex flex-col gap-5">
          {/* Section Headers */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <motion.h4
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-semibold text-orange-400 uppercase tracking-wider"
              >
                Input Gathering
              </motion.h4>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <ArrowRight className="w-4 h-4 text-orange-400/50 flex-shrink-0" />
            </motion.div>
            <div className="flex-1">
              <motion.h4
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xs font-semibold text-orange-400 uppercase tracking-wider text-center"
              >
                Data Ingestion & Analysis
              </motion.h4>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <ArrowRight className="w-4 h-4 text-orange-400/50 flex-shrink-0" />
            </motion.div>
            <div className="flex-1">
              <motion.h4
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xs font-semibold text-orange-400 uppercase tracking-wider text-right"
              >
                Output Generation
              </motion.h4>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* LEFT: H3 & H1 & H2 Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4 space-y-3"
            >
              {/* H3 */}
              <div className="bg-slate-800/40 border border-purple-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    H3
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Define target-state ambition</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h3Inputs.map((input, i) => (
                    <motion.div
                      key={input.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <input.icon className="w-4 h-4 text-purple-400" />
                        <span className="font-medium">{input.label}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        {input.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                        <p className="text-xs text-slate-400 leading-snug">{input.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* H1 */}
              <div className="bg-slate-800/40 border border-cyan-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    H1
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Understand current-state reality</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h1Inputs.map((input, i) => (
                    <motion.div
                      key={input.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <input.icon className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium">{input.label}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        {input.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                        <p className="text-xs text-slate-400 leading-snug">{input.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* H2 */}
              <div className="bg-slate-800/40 border border-emerald-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    H2
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Conduct gap analysis & build foundations</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h2Inputs.map((input, i) => (
                    <motion.div
                      key={input.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <input.icon className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">{input.label}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        {input.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                        <p className="text-xs text-slate-400 leading-snug">{input.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CENTER: JAR+AI Engine */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 flex items-center justify-center relative min-h-[400px]"
            >
              {/* Flowing particles from left */}
              <AnimatePresence>
                {flowingParticles.map((id) => (
                  <motion.div
                    key={id}
                    className="absolute w-2 h-2 rounded-full bg-orange-400"
                    initial={{
                      x: -200,
                      y: Math.random() * 200 - 100,
                      opacity: 1,
                      scale: 1
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.5
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                ))}
              </AnimatePresence>

              {/* Flowing particles to right */}
              <AnimatePresence>
                {flowingParticles.map((id) => (
                  <motion.div
                    key={`right-${id}`}
                    className="absolute w-2 h-2 rounded-full bg-purple-400"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0.8,
                      scale: 0.5
                    }}
                    animate={{
                      x: 200,
                      y: Math.random() * 200 - 100,
                      opacity: 0,
                      scale: 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                  />
                ))}
              </AnimatePresence>

              {/* Central Engine Box */}
              <div className="relative z-10">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(251, 146, 60, 0.3)',
                      '0 0 50px rgba(251, 146, 60, 0.5)',
                      '0 0 30px rgba(251, 146, 60, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-52 h-52 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-1"
                >
                  <div className="size-full rounded-2xl bg-[#0a0e27] flex flex-col items-center justify-center p-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-10 h-10 text-white mb-2" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-1 text-center">JAR+AI</h3>
                    <p className="text-sm text-orange-300 mb-2 text-center">Discovery Engine</p>
                    <p className="text-xs text-slate-400 text-center leading-tight max-w-[180px]">
                      Real-time data ingestion, analysis and output generation
                    </p>
                  </div>
                </motion.div>

                {/* Orbiting icons from inputs/outputs */}
                {orbitingIcons.map((iconData, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.5,
                    }}
                  >
                    <motion.div
                      style={{
                        x: Math.cos((i * Math.PI * 2) / orbitingIcons.length) * 130 - 16,
                        y: Math.sin((i * Math.PI * 2) / orbitingIcons.length) * 130 - 16,
                      }}
                      animate={{
                        rotate: -360,
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.5,
                      }}
                      className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-600 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${iconData.color} flex items-center justify-center`}>
                        <iconData.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Outputs (H3, H1, H2) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-4 space-y-3"
            >
              {/* H3 Output */}
              <div className="bg-slate-800/40 border border-purple-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    H3
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Define target-state ambition</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h3Outputs.map((output, i) => (
                    <motion.div
                      key={output.label}
                      initial={{ opacity: 0, x: 15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <output.icon className="w-4 h-4 text-purple-400" />
                        <span className="font-medium">{output.label}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        {output.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                        {output.accelerators && output.accelerators.includes('Vercel') && (
                          <svg className="w-3 h-3 mt-0.5 flex-shrink-0" viewBox="0 0 76 65" fill="none">
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE"/>
                          </svg>
                        )}
                        <p className="text-xs text-slate-400 leading-snug">{output.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* H1 Output */}
              <div className="bg-slate-800/40 border border-cyan-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    H1
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Understand current-state reality</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h1Outputs.map((output, i) => (
                    <motion.div
                      key={output.label}
                      initial={{ opacity: 0, x: 15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <output.icon className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium">{output.label}</span>
                      </div>
                      {'details' in output && output.details ? (
                        <div className="space-y-1 ml-6">
                          {output.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              {detail.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                              {detail.vercelFeature && (
                                <svg className="w-3 h-3 mt-0.5 flex-shrink-0" viewBox="0 0 76 65" fill="none">
                                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE"/>
                                </svg>
                              )}
                              {detail.claudeCodeFeature && (
                                <svg className="w-3 h-3 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round"/>
                                </svg>
                              )}
                              <p className="text-xs text-slate-400 leading-snug">{detail.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 ml-6">
                          {'aiFeature' in output && output.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                          {'detail' in output && <p className="text-xs text-slate-400 leading-snug">{output.detail}</p>}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* H2 Output */}
              <div className="bg-slate-800/40 border border-emerald-500/40 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                    H2
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Conduct gap analysis & build foundations</h5>
                  </div>
                </div>
                <div className="space-y-2">
                  {h2Outputs.map((output, i) => (
                    <motion.div
                      key={output.label}
                      initial={{ opacity: 0, x: 15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.0 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                        <output.icon className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">{output.label}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        {output.aiFeature && <Sparkles className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />}
                        {output.accelerators && output.accelerators.includes('Vercel') && (
                          <svg className="w-3 h-3 mt-0.5 flex-shrink-0" viewBox="0 0 76 65" fill="none">
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE"/>
                          </svg>
                        )}
                        <p className="text-xs text-slate-400 leading-snug">{output.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-Width Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 pb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-semibold text-white">Progressive Client Engagement</h4>
              <span className="text-sm text-orange-400 font-semibold ml-auto">8-Week Sprint</span>
            </div>
            <div>
              <div className="flex items-stretch gap-2">
                {weeks.map((weekData, i) => (
                  <React.Fragment key={weekData.week}>
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                      className="flex-1"
                    >
                      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-lg p-3 h-full flex flex-col">
                        <p className="text-sm font-bold text-orange-400 mb-1">{weekData.week}</p>
                        <p className="text-xs text-slate-300 leading-tight flex-1">{weekData.description}</p>
                      </div>
                    </motion.div>
                    {i < weeks.length - 1 && (
                      <div className="flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-4 h-4 text-orange-500/50" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Milestone indicator below W2-4 */}
              <div className="flex items-stretch gap-2 mt-2 h-6">
                {/* W1 space */}
                <div className="flex-1"></div>
                {/* Arrow space */}
                <div className="flex items-center justify-center flex-shrink-0 w-4"></div>
                {/* W2-4 space */}
                <div className="flex-1"></div>
                {/* Milestone starts at arrow between W2-4 and W5-7 */}
                <div className="flex items-center justify-center flex-shrink-0 w-4 relative">
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    className="absolute top-2"
                  >
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-md px-3 py-1 whitespace-nowrap">
                      <p className="text-xs text-emerald-300 font-semibold text-center">V1 of all outputs created</p>
                    </div>
                  </motion.div>
                </div>
                {/* W5-7 space */}
                <div className="flex-1"></div>
                {/* Arrow space */}
                <div className="flex items-center justify-center flex-shrink-0 w-4"></div>
                {/* W8 space */}
                <div className="flex-1"></div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-xl"
          >
            <div className="flex items-center gap-3">
              <p className="text-xs text-slate-500">Accelerators:</p>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/50 border border-orange-500/30">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  <span className="text-xs text-slate-300">JAR+AI</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 76 65" fill="none">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#22D3EE"/>
                  </svg>
                  <span className="text-xs text-slate-300">Vercel</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="#E07A5F" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xs text-slate-300">Claude Code</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
