"use client"

import { motion } from 'motion/react'
import { ArrowDown, Sparkles } from 'lucide-react'

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('executive-summary')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Orange accent gradient - subtle top corner */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#F06C00]/8 via-transparent to-transparent" />
      
      {/* Purple accent - subtle bottom corner */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#A100FF]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Co-brand indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="text-sm font-medium tracking-wide text-[#F06C00]">Sainsbury&apos;s</span>
          <span className="w-8 h-px bg-border" />
          <span className="text-sm font-medium tracking-wide text-[#A100FF]">Accenture</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
        >
          AI-Powered Process
          <br />
          <span className="text-[#F06C00]">Reinvention</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed text-balance"
        >
          A reinvented approach to process discovery and transformation, 
          accelerated by AI to deliver faster insights and greater value.
        </motion.p>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#F06C00]">1.5×</div>
            <div className="text-sm text-muted-foreground mt-1">Faster Delivery</div>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">30%</div>
            <div className="text-sm text-muted-foreground mt-1">Less Effort</div>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">2×</div>
            <div className="text-sm text-muted-foreground mt-1">ROI on Value Cases</div>
          </div>
        </motion.div>

        {/* Visual system - abstract orchestration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-center justify-center mb-16"
        >
          <div className="flex items-center gap-4">
            {/* Left flow elements */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-1 bg-gradient-to-r from-transparent via-[#F06C00]/40 to-[#F06C00]/60 rounded-full"
              />
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-12 h-1 bg-gradient-to-r from-transparent via-[#F06C00]/30 to-[#F06C00]/50 rounded-full"
              />
            </div>

            {/* Central element */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F06C00] to-[#E55000] shadow-lg shadow-[#F06C00]/20 flex flex-col items-center justify-center gap-1">
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-white text-xs font-semibold">JAR+AI</span>
              </div>
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-12px] border border-dashed border-[#A100FF]/30 rounded-3xl"
              />
            </div>

            {/* Right flow elements - purple */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-12 h-1 bg-gradient-to-l from-transparent via-[#A100FF]/30 to-[#A100FF]/50 rounded-full"
              />
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-1 bg-gradient-to-l from-transparent via-[#A100FF]/40 to-[#A100FF]/60 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-[#F06C00] transition-colors cursor-pointer"
        >
          <span className="text-sm">Explore the approach</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
