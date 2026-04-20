'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  open: boolean
  onClose: () => void
  label?: string
  title?: string
  subtitle?: string
  accentColor?: string
  children: React.ReactNode
}

// Full-screen modal overlay — backdrop blur, label/title/subtitle block,
// centred content slot, and a close affordance. Matches the pattern used in
// the Pollen360 experience for inline demo playback.
export function DemoOverlay({
  open,
  onClose,
  label,
  title,
  subtitle,
  accentColor = 'var(--sainsburys-orange)',
  children,
}: Props) {
  // ESC closes the overlay.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, onClose])

  // Lock body scroll while the overlay is up.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-no-advance
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(24px, 4vw, 56px)',
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(240,108,0,0.08) 0%, transparent 55%), rgba(8,8,14,0.88)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            cursor: 'pointer',
          }}
        >
          {/* Caption block above the demo */}
          {(label || title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center',
                marginBottom: 20,
                maxWidth: 520,
                pointerEvents: 'none',
              }}
            >
              {label && (
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: accentColor,
                    marginBottom: 8,
                  }}
                >
                  {label}
                </div>
              )}
              {title && (
                <h3
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(20px, 2.4vw, 26px)',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 13,
                    color: '#c4c4d4',
                    marginTop: 8,
                    marginBottom: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}

          {/* Demo content — clicks inside should not close the overlay */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '95vw',
              maxHeight: '78vh',
              cursor: 'default',
            }}
          >
            {children}
          </motion.div>

          {/* Close affordance */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              marginTop: 24,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#c4c4d4',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span>Click anywhere to close</span>
            <span
              style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-space-mono)',
                letterSpacing: '0.1em',
              }}
            >
              ESC
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
