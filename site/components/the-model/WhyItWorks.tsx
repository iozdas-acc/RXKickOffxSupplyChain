'use client'

import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

const cards = [
  {
    accent: '#3DB19A',
    label: 'No slowdown',
    heading: 'RX keeps moving at speed',
    body: 'Phase 1 is unadulterated RX delivery. The consulting agent doesn\'t dilute the pace — it runs alongside it. RX does what it does best, without waiting for the client to catch up.',
  },
  {
    accent: '#0F1D3C',
    label: 'No abandonment',
    heading: 'The client isn\'t left to absorb alone',
    body: 'Phase 2 keeps a consulting agent present through adoption. They translate RX outputs into internal action, helping the team digest, implement, and build capability to continue independently.',
  },
  {
    accent: '#3DB19A',
    label: 'No trade-off',
    heading: 'CCI stays high throughout',
    body: 'Traditionally, value creation and client change run sequentially. The hybrid model runs them in parallel — the client changes at their pace while RX continues creating value at ours.',
  },
]

export default function WhyItWorks() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C1C2E 0%, #222222 50%, #1C1C2E 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Dual ambient glow — orange left, purple right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(61, 177, 154,0.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(28, 28, 46,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header — mount-time animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-[#3DB19A]" />
            <span className="text-xs font-medium text-[#3DB19A] uppercase tracking-widest">Why It Works</span>
            <div className="w-10 h-px bg-[#3DB19A]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold italic text-white">
            Three structural reasons.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 1.9 + i * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 8px 40px ${card.accent}25`,
                transition: { duration: 0.2 },
              }}
              className="rounded-xl p-6 cursor-default overflow-hidden relative"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `2px solid ${card.accent}`,
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: card.accent }}
              >
                {card.label}
              </p>
              <h3 className="font-display text-lg font-bold text-white mb-3 leading-tight">
                {card.heading}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
