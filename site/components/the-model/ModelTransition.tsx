'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ModelTransition() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#7C3AED]/15 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <p className="text-xs font-medium text-[#7C3AED] uppercase tracking-widest mb-6">
          And —
        </p>

        <h2
          className="font-display font-bold italic text-white max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.2 }}
        >
          This isn&apos;t just the Sainsbury&apos;s model.
        </h2>

        <p className="text-white/70 mt-5 max-w-xl mx-auto leading-relaxed">
          H1–H3 Sainsbury&apos;s procurement is the proof of concept. What comes next is the template for every
          agentic transformation engagement RX delivers.
        </p>

        <div className="mt-12">
          <Link
            href="/the-template"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#7C3AED] transition-colors duration-150 group"
          >
            See the template
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </div>
      </div>
    </section>
  )
}
