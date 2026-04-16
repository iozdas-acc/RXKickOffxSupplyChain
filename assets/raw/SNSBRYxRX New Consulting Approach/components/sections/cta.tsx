"use client"

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'


export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Thank you
          </h2>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[#F06C00]">Sainsbury&apos;s</span>
              <span className="text-muted-foreground">×</span>
              <span className="text-sm font-semibold text-[#A100FF]">Accenture</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Powered Process Reinvention Engagement
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Accenture. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
