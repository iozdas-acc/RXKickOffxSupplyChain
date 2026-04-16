"use client"

import { ExponentialChart } from "@/components/exponential-chart"
import { HorizonCards } from "@/components/horizon-cards"
import { HowWeShowUp } from "@/components/how-we-show-up"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function RXTransformationPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-3">
            <Image
              src="/rx-logo.png"
              alt="RX Logo"
              width={48}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <span className="text-sm tracking-widest text-[#14b8a6] uppercase">
            The RX Transformation Approach
          </span>
        </header>

        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section className="px-8 md:px-12 lg:px-16 xl:px-24 pt-12 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            <span className="text-white">Transformation </span>
            <span className="bg-gradient-to-r from-[#14b8a6] to-[#a3e635] bg-clip-text text-transparent">
              Reinvented
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            An AI-first approach to enterprise reinvention. We use horizons to stage value, combine industry and functional expertise with human+agent execution, and deliver enduring AI-first capabilities.
          </p>
        </section>

        {/* ============================================
            SECTION 1: THE HORIZONS PATHWAY
            - Exponential chart
            - Dual direction execution cards
        ============================================ */}
        <section className="relative bg-[#1e293b]/40 border-y border-[#334155]/50">
          {/* Section Header */}
          <div className="pt-16 pb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#14b8a6]" />
              <span className="text-[#14b8a6] uppercase tracking-[0.2em] text-xs font-medium">
                The Horizons Pathway
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#14b8a6]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              A Horizons-Led Value Path
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The path to Horizon III is exponential - we take a dual-direction horizons approach to realise value now and build towards the future.
            </p>
          </div>

          {/* Exponential Chart */}
          <div className="px-8 md:px-12 lg:px-16 max-w-5xl mx-auto">
            <ExponentialChart />
          </div>

          {/* Dual Direction Cards */}
          <div className="px-8 md:px-12 lg:px-16 pt-16 pb-20 max-w-6xl mx-auto">
            <HorizonCards />
          </div>
        </section>

        {/* ============================================
            SECTION 2: HOW WE SHOW UP DIFFERENTLY
            - Team + Thinking + Tooling pillars
        ============================================ */}
        <section className="px-8 md:px-12 lg:px-16 py-20">
          <div className="max-w-6xl mx-auto">
            <HowWeShowUp />
          </div>
        </section>

        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent" />

        {/* ============================================
            SECTION 3: CTA / IMPACTFUL CLOSE
        ============================================ */}
        <section className="px-8 md:px-12 lg:px-16 py-20 bg-gradient-to-b from-transparent to-[#1e293b]/30">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug mb-8 text-balance">
              <span className="text-white">Start from both ends.</span>
              <br />
              <span className="text-white">Meet in the middle.</span>
              <br />
              <span className="bg-gradient-to-r from-[#14b8a6] to-[#a3e635] bg-clip-text text-transparent">
                Execute simultaneously.
              </span>
            </p>

            <a
              href="https://v0-accenture-sainsbury-s-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#14b8a6] hover:bg-[#0d9488] rounded-full text-[#0f172a] font-semibold transition-all duration-300 group"
            >
              <Image
                src="/rx-logo.png"
                alt="RX"
                width={24}
                height={16}
                className="h-4 w-auto brightness-0"
              />
              Explore our full methodology at Sainsbury&apos;s
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-6 text-center text-slate-500 text-sm">
          <p>RX Transformation &mdash; Accenture</p>
        </footer>
      </div>
    </main>
  )
}
