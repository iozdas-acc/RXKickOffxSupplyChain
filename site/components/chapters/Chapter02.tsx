'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { DemoOverlay } from '@/components/ui/DemoOverlay'
import ConversationalRetailUI from '@/components/ui/ConversationalRetailUI'

interface ProjectOutput {
  label: string
  type: string
  url?: string
  href?: string
  thumbnail?: string
  password?: string
}

interface Project {
  id: string
  header: string
  title: string
  timeframe: string
  deliverables: string[]
  outcomes: string[]
  outputs: ProjectOutput[]
}

const PROJECTS: Project[] = [
  {
    id: 'nectar',
    header: 'Stronger origination moments',
    title: 'Nectar360 Pollen Vision',
    timeframe: '5 days. Blended RX & Song team.',
    deliverables: [
      'AI-Generated Web Experience',
      '3-Horizons Reinvention Story',
      'Hi-fidelity Agentic Prototype',
    ],
    outcomes: [
      'Demonstrated AI and retail media expertise.',
      'Made the future of Pollen tangible and investable.',
      'Turned the vision into a concrete SDLC build opportunity.',
    ],
    outputs: [
      {
        label: 'Pollen Vision Website',
        type: 'website',
        url: 'icy-rock-0cdfdc903.6.azurestaticapps.net',
        href: 'https://icy-rock-0cdfdc903.6.azurestaticapps.net',
        thumbnail: '/images/pollen-vision.png',
        password: 'P0LLEN!360#AISession2026',
      },
      { label: 'Agentic Commerce Bid For My Basket', type: 'mobile' },
      {
        label: 'Agentic Campaign Workflow',
        type: 'prototype',
        url: 'relume-grasp-07968301.figma.site',
        href: 'https://relume-grasp-07968301.figma.site',
        thumbnail: '/images/agentic-campaign-workflow.png',
        password: 'Pollen360',
      },
    ],
  },
  {
    id: 'procurement',
    header: 'Proof in discovery',
    title: 'Ancona Procurement Reinvention',
    timeframe: '12 weeks. In-flight engagement. Blended RX & Supply Chain team.',
    deliverables: [
      'AI-Generated Vision Website, Personas & LLM',
      'HTML Pain-Point & Opportunity Navigator',
      'Live Copilot Demos & Vibe-Coded Supplier Dashboard',
    ],
    outcomes: [
      'Proved the power of AI in live delivery.',
      'Turned decks & spreadsheets into interactive experiences.',
      'Demonstrated expertise to lead reinvention.',
    ],
    outputs: [
      {
        label: 'Sarah H3 Narrative Website',
        type: 'website',
        url: 'v0-ai-disruption-page.vercel.app/meet-sarah',
        href: 'https://v0-ai-disruption-page.vercel.app/meet-sarah',
        thumbnail: '/images/sarah-narrative.png',
      },
      { label: 'Pain Point & Opportunity Navigator', type: 'navigator', thumbnail: '/images/pain-point-navigator.png' },
      { label: 'Supplier Dashboard Prototype', type: 'dashboard', thumbnail: '/images/supplier-dashboard.png' },
    ],
  },
]

interface FlipCardProps {
  label: string
  url?: string
  href: string
  thumbnail?: string
  password: string
}

function FlipOutputCard({ label, url, href, thumbnail, password }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPassword = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked — silent
    }
  }

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFlipped(f => !f)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setFlipped(f => !f)
    }
  }

  return (
    <div
      data-no-advance
      role="button"
      tabIndex={0}
      aria-label={flipped ? `${label} — showing access details` : `${label} — click to reveal access`}
      onClick={toggleFlip}
      onKeyDown={onKeyDown}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        perspective: 1200,
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
          backgroundColor: 'var(--color-surface-card)',
          backgroundImage: thumbnail
            ? `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%), url(${thumbnail})`
            : 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 8%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 20%, var(--color-surface-card)))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 10,
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Top-right pill: reveal hint */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent-ch2)',
              padding: '4px 8px',
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--color-surface-card) 88%, transparent)',
              backdropFilter: 'blur(4px)',
              border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
            }}>
              Access →
            </div>
          </div>

          {/* Bottom label block */}
          <div style={{
            padding: '8px 10px',
            borderRadius: 8,
            background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
            backdropFilter: 'blur(6px)',
            border: '1px solid color-mix(in srgb, var(--accent-ch2) 18%, transparent)',
          }}>
            <div style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {label}
            </div>
            {url && (
              <div style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 10,
                color: 'var(--color-text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {url}
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid var(--accent-ch2)',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 14%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 28%, var(--color-surface-card)))',
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 8,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--accent-ch2)',
              marginBottom: 6,
            }}>
              Access password
            </div>
            <button
              type="button"
              onClick={copyPassword}
              aria-label={copied ? 'Password copied' : 'Copy password'}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '7px 10px',
                borderRadius: 6,
                background: 'color-mix(in srgb, var(--color-surface-card) 70%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-ch2) 35%, transparent)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                flex: 1,
                letterSpacing: '0.02em',
              }}>
                {password}
              </span>
              <span style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: copied ? 'var(--accent-ch2)' : 'var(--color-text-secondary)',
                flexShrink: 0,
              }}>
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-no-advance
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '9px 12px',
              borderRadius: 8,
              background: 'var(--accent-ch2)',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.02em',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.15s ease, filter 0.15s ease',
            }}
          >
            <span>Open site</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

interface Props { isActive: boolean; onNext: () => void; onPrev: () => void }

export function Chapter02({ isActive, onNext, onPrev }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    if (!rootRef.current) return
    if (isActive) {
      gsap.fromTo(rootRef.current,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      gsap.to(rootRef.current, { opacity: 0, y: -28, filter: 'blur(6px)', duration: 0.5, ease: 'power3.in' })
    }
  }, [isActive])

  const project = PROJECTS[activeProject]

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(20px, 2.5vw, 40px)',
        paddingTop: 80,
        gap: 20,
        opacity: 0, pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Header - title with subtitle underneath */}
      <div style={{ paddingBottom: 24 }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.3em',
          color: 'color-mix(in srgb, var(--accent-ch2) 78%, black)', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent-ch2)', display: 'inline-block', borderRadius: 2 }} />
          In-Flight Projects
        </div>

        <h2 style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          marginBottom: 18,
        }}>
          <span 
            className="gradient-text-ch2"
            style={{
              backgroundImage: 'linear-gradient(135deg, #134e4a 0%, #14b8a6 50%, #0f766e 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >EMBEDDING AI</span>{' '}IN ORIGINATION AND DISCOVERY
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14, color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
        }}>
          Fresh thinking and AI embedded into traditional discovery projects and bid responses - sharpening our approach, delivering client value and strengthening our right to win.
        </p>
      </div>

      {/* Three-column horizontal layout (stacks under 900px) */}
      <div className="chapter-row" style={{ flex: 1, gap: 20, minHeight: 0, marginTop: 8 }}>
        
        {/* Left column: Project toggle buttons (vertical) */}
        <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'flex-start' }}>
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(idx)}
              style={{
                padding: '14px 16px',
                background: activeProject === idx 
                  ? 'color-mix(in srgb, var(--accent-ch2) 10%, transparent)' 
                  : 'var(--color-surface-card)',
                border: activeProject === idx 
                  ? '1px solid var(--accent-ch2)' 
                  : '1px solid color-mix(in srgb, var(--accent-ch2) 15%, transparent)',
                borderLeft: activeProject === idx 
                  ? '3px solid var(--accent-ch2)' 
                  : '3px solid color-mix(in srgb, var(--accent-ch2) 25%, transparent)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 13, fontWeight: 600,
                color: activeProject === idx ? 'var(--accent-ch2)' : 'var(--color-text-primary)',
                marginBottom: 4,
              }}>
                {p.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-tertiary)',
              }}>
                Project {idx + 1}/2
              </div>
            </button>
          ))}
        </div>

        {/* Middle column: Project content */}
        <div style={{ 
          flex: '0 0 320px',
          alignSelf: 'flex-start',
          height: 'calc(((380px * 9 / 16) * 2) + 12px)',
          background: 'var(--color-surface-card)',
          border: '1px solid color-mix(in srgb, var(--accent-ch2) 20%, transparent)',
          borderRadius: 12,
          padding: '20px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 9, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.18em',
            color: 'var(--accent-ch2)', marginBottom: 8,
          }}>
            {project.header}
          </div>

          <div style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 20, fontWeight: 700,
            color: 'var(--color-text-primary)', marginBottom: 8,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}>
            {project.title}
          </div>

          <div style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 12, color: 'var(--color-text-secondary)',
            marginBottom: 16,
            paddingBottom: 14,
            borderBottom: '1px solid color-mix(in srgb, var(--accent-ch2) 12%, transparent)',
          }}>
            {project.timeframe}
          </div>

          {/* Deliverables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {project.deliverables.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="8" cy="8" r="7" stroke="var(--accent-ch2)" strokeWidth="1.5" fill="color-mix(in srgb, var(--accent-ch2) 10%, transparent)" />
                  <path d="M5 8L7 10L11 6" stroke="var(--accent-ch2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'color-mix(in srgb, var(--accent-ch2) 12%, transparent)', marginBottom: 14 }} />

          {/* Outcomes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {project.outcomes.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="var(--accent-ch2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Outputs - conditional layout based on whether mobile exists */}
        {project.outputs.find(o => o.type === 'mobile') ? (
          /* Layout for projects WITH mobile output: 2 stacked on left, 1 tall portrait on right */
          <div style={{ flex: 1, display: 'flex', gap: 12, alignSelf: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {/* Left side: 2 stacked 16:9 boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, maxWidth: 380 }}>
              {project.outputs.filter(o => o.type !== 'mobile').map((output, i) => (
                output.password && output.href ? (
                  <FlipOutputCard
                    key={i}
                    label={output.label}
                    url={output.url}
                    href={output.href}
                    thumbnail={output.thumbnail}
                    password={output.password}
                  />
                ) : (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 4%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 10%, var(--color-surface-card)))',
                    border: '1px dashed color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background grid pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: 'linear-gradient(90deg, var(--accent-ch2) 1px, transparent 1px), linear-gradient(var(--accent-ch2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: 'color-mix(in srgb, var(--accent-ch2) 12%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    {output.type === 'website' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ) : output.type === 'navigator' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 3v18" />
                      </svg>
                    ) : output.type === 'dashboard' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ position: 'relative', minWidth: 0 }}>
                    <div style={{ 
                      fontFamily: 'var(--font-space-grotesk)', 
                      fontSize: 13, 
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {output.label}
                    </div>
                    {output.url && (
                      <div style={{ 
                        fontFamily: 'var(--font-dm-sans)', 
                        fontSize: 10, 
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.url}
                      </div>
                    )}
                  </div>

                  {/* External link indicator */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="2" style={{ position: 'relative', opacity: 0.5, flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                )
              ))}
            </div>

            {/* Right side: 1 tall portrait mobile box — launches the bid-for-basket demo */}
            <div
              data-no-advance
              role="button"
              tabIndex={0}
              aria-label="Launch Agentic Commerce demo"
              onClick={(e) => { e.stopPropagation(); setDemoOpen(true) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setDemoOpen(true)
                }
              }}
              style={{
                height: 'calc(((380px * 9 / 16) * 2) + 12px)',
                aspectRatio: '9 / 19.5',
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 6%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 14%, var(--color-surface-card)))',
                border: '1px solid color-mix(in srgb, var(--accent-ch2) 35%, transparent)',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px 12px',
                gap: 10,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'var(--accent-ch2)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-ch2) 35%, transparent)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              {/* Background grid pattern */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                backgroundImage: 'linear-gradient(90deg, var(--accent-ch2) 1px, transparent 1px), linear-gradient(var(--accent-ch2) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />

              {/* Top: "Interactive demo" pill */}
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--accent-ch2)',
                padding: '4px 10px',
                borderRadius: 999,
                background: 'color-mix(in srgb, var(--color-surface-card) 88%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                position: 'relative',
              }}>
                Interactive demo
              </div>

              {/* Mid: stylised iPhone mock preview — tiny scaled phone frame */}
              <div style={{
                position: 'relative',
                width: '62%',
                aspectRatio: '9 / 19.5',
                borderRadius: 18,
                background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
                padding: 4,
                boxShadow: '0 10px 26px rgba(15,23,42,0.22), 0 0 0 1px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 14,
                  background: 'linear-gradient(160deg, #ffffff 0%, #F3F6FB 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}>
                  {/* Dynamic island stub */}
                  <div style={{
                    position: 'absolute',
                    top: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 30,
                    height: 8,
                    borderRadius: 999,
                    background: '#000',
                  }} />
                  {/* Logos hinting at the demo content */}
                  <div style={{ display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <div style={{ width: 24, height: 10, background: '#00539F', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 5, color: '#fff', fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>TESCO</span>
                      </div>
                      <div style={{ width: 24, height: 10, background: 'var(--sainsburys-orange)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 4, color: '#fff', fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>Sainsbury&apos;s</span>
                      </div>
                    </div>
                    <div style={{ width: 24, height: 10, background: '#1a4d2e', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 4, color: '#fff', fontWeight: 700, fontFamily: 'Arial, sans-serif' }}>Waitrose</span>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: 7,
                    fontWeight: 700,
                    color: 'var(--accent-ch2)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    Bidding…
                  </div>
                </div>
              </div>

              {/* Bottom: label + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
                <div style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  textAlign: 'center',
                  padding: '0 10px',
                  lineHeight: 1.3,
                }}>
                  {project.outputs.find(o => o.type === 'mobile')?.label}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: 'var(--accent-ch2)',
                  color: '#fff',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  boxShadow: '0 4px 12px color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                }}>
                  Launch demo
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Layout for projects WITHOUT mobile output: 2 on top, 1 below left (2+1 grid) */
          /* Height matches the content box height */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, alignSelf: 'flex-start', height: 'calc(((380px * 9 / 16) * 2) + 12px)' }}>
            {/* Top row: 2 boxes side by side */}
            <div style={{ display: 'flex', gap: 12, flex: 1 }}>
              {project.outputs.slice(0, 2).map((output, i) => (
                output.thumbnail && output.href ? (
                  <a
                    key={i}
                    data-no-advance
                    href={output.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      height: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 10,
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                      backgroundColor: 'var(--color-surface-card)',
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.58) 100%), url(${output.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: 10,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    }}
                  >
                    {/* Top-right "Open site" pill */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'var(--accent-ch2)',
                        padding: '4px 8px',
                        borderRadius: 999,
                        background: 'color-mix(in srgb, var(--color-surface-card) 88%, transparent)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                      }}>
                        Open site →
                      </div>
                    </div>

                    {/* Bottom label */}
                    <div style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 18%, transparent)',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.label}
                      </div>
                      {output.url && (
                        <div style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: 10,
                          color: 'var(--color-text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {output.url}
                        </div>
                      )}
                    </div>
                  </a>
                ) : output.thumbnail ? (
                  <div
                    key={i}
                    style={{
                      height: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 10,
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                      backgroundColor: 'var(--color-surface-card)',
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.58) 100%), url(${output.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 10,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Bottom label */}
                    <div style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 18%, transparent)',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.label}
                      </div>
                    </div>
                  </div>
                ) : (
                <div
                  key={i}
                  style={{
                    height: '100%',
                    aspectRatio: '16 / 9',
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 4%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 10%, var(--color-surface-card)))',
                    border: '1px dashed color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background grid pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: 'linear-gradient(90deg, var(--accent-ch2) 1px, transparent 1px), linear-gradient(var(--accent-ch2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 28, height: 28,
                    borderRadius: 6,
                    background: 'color-mix(in srgb, var(--accent-ch2) 12%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    {output.type === 'website' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ) : output.type === 'navigator' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 3v18" />
                      </svg>
                    ) : output.type === 'dashboard' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ position: 'relative', minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {output.label}
                    </div>
                    {output.url && (
                      <div style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 9,
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.url}
                      </div>
                    )}
                  </div>

                  {/* External link indicator */}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="2" style={{ position: 'relative', opacity: 0.5, flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                )
              ))}
            </div>

            {/* Bottom row: 1 box on the left */}
            <div style={{ display: 'flex', gap: 12, flex: 1 }}>
              {project.outputs.slice(2, 3).map((output, i) => (
                output.thumbnail ? (
                  <div
                    key={i}
                    style={{
                      height: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 10,
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                      backgroundColor: 'var(--color-surface-card)',
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.58) 100%), url(${output.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 10,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Bottom label */}
                    <div style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: 'color-mix(in srgb, var(--color-surface-card) 92%, transparent)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid color-mix(in srgb, var(--accent-ch2) 18%, transparent)',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.label}
                      </div>
                    </div>
                  </div>
                ) : (
                <div
                  key={i}
                  style={{
                    height: '100%',
                    aspectRatio: '16 / 9',
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-ch2) 4%, var(--color-surface-card)), color-mix(in srgb, var(--accent-ch2) 10%, var(--color-surface-card)))',
                    border: '1px dashed color-mix(in srgb, var(--accent-ch2) 30%, transparent)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background grid pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: 'linear-gradient(90deg, var(--accent-ch2) 1px, transparent 1px), linear-gradient(var(--accent-ch2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 28, height: 28,
                    borderRadius: 6,
                    background: 'color-mix(in srgb, var(--accent-ch2) 12%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    {output.type === 'website' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ) : output.type === 'navigator' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 3v18" />
                      </svg>
                    ) : output.type === 'dashboard' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="1.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ position: 'relative', minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {output.label}
                    </div>
                    {output.url && (
                      <div style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 9,
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {output.url}
                      </div>
                    )}
                  </div>

                  {/* External link indicator */}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ch2)" strokeWidth="2" style={{ position: 'relative', opacity: 0.5, flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Agentic Commerce demo — renders only when the Nectar tile triggers it.
          DemoOverlay is portalled visually; onClick on the backdrop closes. */}
      <DemoOverlay
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        label="Interactive · Agentic Commerce"
        title="Bid For My Basket"
        subtitle="Upload a meal plan. Watch Tesco, Sainsbury's and Waitrose negotiate in real time."
        accentColor="var(--sainsburys-orange)"
      >
        <ConversationalRetailUI />
      </DemoOverlay>
    </div>
  )
}
