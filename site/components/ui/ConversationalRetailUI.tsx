'use client'

// Ported from the Pollen360 experience (pollen360-experience/src/components/ui/
// ConversationalRetailUI.tsx). Intact phone-sized demo of the "bid for my
// basket" flow — meal plan → AI analyses → supermarket negotiation → pick
// winner → checkout. The only functional change vs the Pollen original is
// that sonner toasts are replaced with an inline banner so we don't add a
// toast-library dependency for a single demo.

import { useState, useEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Camera,
  Send,
  ShoppingBag,
  Truck,
  Leaf,
  Star,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react'

// --- Inline SVG Logos (no external images needed) ---

const TescoLogo = () => (
  <svg viewBox="0 0 100 30" className="w-full h-full">
    <rect width="100" height="30" rx="2" fill="#00539F" />
    <text x="50" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">
      TESCO
    </text>
  </svg>
)

const SainsburysLogo = () => (
  <svg viewBox="0 0 100 30" className="w-full h-full">
    <rect width="100" height="30" rx="2" fill="#F06C00" />
    <text x="50" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
      Sainsbury&apos;s
    </text>
  </svg>
)

const WaitroseLogo = () => (
  <svg viewBox="0 0 100 30" className="w-full h-full">
    <rect width="100" height="30" rx="2" fill="#1a4d2e" />
    <text x="50" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
      Waitrose
    </text>
  </svg>
)

// Meal plan placeholder with handwriting-style text
const MealPlanPlaceholder = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 50%, #EDDCC8 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      fontFamily: "'Segoe Script', 'Comic Sans MS', cursive",
      color: '#3A3A5C',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 40 + i * 28,
          height: 1,
          background: 'rgba(100, 140, 200, 0.15)',
        }}
      />
    ))}
    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2A2A4C' }}>
      Weekly Meal Plan
    </div>
    <div style={{ fontSize: 11, lineHeight: 2.2, position: 'relative', zIndex: 1 }}>
      <div>Mon - Chicken Adobo</div>
      <div>Tue - Thai Red Curry</div>
      <div>Wed - Lamb Guvec</div>
      <div>Thu - Sunday Roast (early!)</div>
      <div>Fri - Cauliflower Cheese</div>
      <div>Sat - Leek & Mushroom Pie</div>
      <div>Sun - Kimchi Jjigae</div>
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        right: 16,
        fontSize: 9,
        color: '#999',
        fontFamily: 'sans-serif',
      }}
    >
      Tap to scan
    </div>
  </div>
)

// --- Types ---

type AppState = 'IDLE' | 'ANALYZING' | 'NEGOTIATING' | 'COMPARING' | 'CONFIRMED'

interface Ingredient {
  name: string
  category: string
  inCupboard: boolean
}

interface SupermarketOffer {
  name: string
  logo: 'tesco' | 'sainsburys' | 'waitrose'
  totalPrice: number
  originalPrice: number
  deliverySlot: string
  deliveryFee: number
  sustainabilityScore: number
  loyaltyPoints: number
  substitutions: number
  negotiatedPerk: string
}

type BannerState = { kind: 'error' | 'success'; message: string } | null

// --- Mock Data ---

const MOCK_INGREDIENTS: Ingredient[] = [
  { name: 'Chicken (for Adobo)', category: 'Meat', inCupboard: false },
  { name: 'Lamb Chops (for Guvec)', category: 'Meat', inCupboard: false },
  { name: 'Thai Red Curry Paste', category: 'Pantry', inCupboard: true },
  { name: 'Coconut Milk', category: 'Pantry', inCupboard: true },
  { name: 'Pork Roast', category: 'Meat', inCupboard: false },
  { name: 'Potatoes', category: 'Produce', inCupboard: true },
  { name: 'Cauliflower', category: 'Produce', inCupboard: false },
  { name: 'Leek & Mushrooms', category: 'Produce', inCupboard: false },
  { name: 'Napa Cabbage', category: 'Produce', inCupboard: false },
]

const MOCK_OFFERS: SupermarketOffer[] = [
  {
    name: 'Tesco',
    logo: 'tesco',
    totalPrice: 24.5,
    originalPrice: 28.9,
    deliverySlot: 'Today, 18:00 - 19:00',
    deliveryFee: 0,
    sustainabilityScore: 82,
    loyaltyPoints: 120,
    substitutions: 0,
    negotiatedPerk: 'Clubcard price match + Free delivery',
  },
  {
    name: "Sainsbury's",
    logo: 'sainsburys',
    totalPrice: 22.8,
    originalPrice: 26.5,
    deliverySlot: 'Tomorrow, 09:00 - 10:00',
    deliveryFee: 1.5,
    sustainabilityScore: 78,
    loyaltyPoints: 450,
    substitutions: 1,
    negotiatedPerk: 'Nectar points boosted (x3)',
  },
  {
    name: 'Waitrose',
    logo: 'waitrose',
    totalPrice: 31.2,
    originalPrice: 34.0,
    deliverySlot: 'Today, 17:00 - 18:00',
    deliveryFee: 0,
    sustainabilityScore: 95,
    loyaltyPoints: 80,
    substitutions: 0,
    negotiatedPerk: 'Plastic-free packaging upgrade',
  },
]

const NEGOTIATION_STEPS = [
  {
    text: 'Creating your shopping list...',
    subtext: 'Extracting ingredients from your handwritten plan',
    icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
  },
  {
    text: 'Personalising your basket...',
    subtext: 'Adjusting quantities based on your household of 4',
    icon: <Star className="w-5 h-5 text-purple-500" />,
  },
  {
    text: 'Negotiating with supermarkets...',
    subtext: "Comparing Tesco, Sainsbury's & Waitrose in real-time",
    icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
  },
  {
    text: 'Finalizing exclusive deals...',
    subtext: 'Applying Clubcard & Nectar price match logic',
    icon: <Zap className="w-5 h-5 text-orange-500" />,
  },
]

// --- Sub-components ---

const LogoComponent = ({ logo, className }: { logo: string; className?: string }) => {
  const map: Record<string, ReactElement> = {
    tesco: <TescoLogo />,
    sainsburys: <SainsburysLogo />,
    waitrose: <WaitroseLogo />,
  }
  return <div className={className}>{map[logo]}</div>
}

const AIAgentOrb = ({ pulse = false }: { pulse?: boolean }) => (
  <div className="relative flex items-center justify-center">
    <motion.div
      animate={pulse ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute w-16 h-16 rounded-full bg-blue-500/20 blur-xl"
    />
    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-blue-500/40">
      <Sparkles className="text-white w-6 h-6" />
    </div>
  </div>
)

const SupermarketCard = ({
  offer,
  onSelect,
  isSelected,
}: {
  offer: SupermarketOffer
  onSelect: () => void
  isSelected: boolean
}) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: isSelected ? '0 12px 32px rgba(37,99,235,0.18)' : '0 8px 24px rgba(0,0,0,0.1)' }}
    onClick={onSelect}
    style={{
      padding: '20px',
      borderRadius: '20px',
      border: isSelected ? '2px solid #2563eb' : '2px solid #f0f0f0',
      background: isSelected ? 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)' : '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      boxShadow: isSelected ? '0 8px 24px rgba(37,99,235,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
            padding: '6px',
            background: offer.logo === 'waitrose' ? '#1a4d2e' : '#f9fafb',
            flexShrink: 0,
          }}
        >
          <LogoComponent logo={offer.logo} className="w-full h-full" />
        </div>
        <div>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#111827', display: 'block' }}>{offer.name}</span>
          {offer.substitutions > 0 && (
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600, background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px' }}>
              {offer.substitutions} substitution
            </span>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, color: isSelected ? '#1d4ed8' : '#111827', lineHeight: 1 }}>
          £{offer.totalPrice.toFixed(2)}
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through', marginTop: '2px' }}>
          was £{offer.originalPrice.toFixed(2)}
        </div>
      </div>
    </div>

    <div style={{ height: '1px', background: '#f3f4f6', margin: '0 0 14px' }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Truck style={{ width: 14, height: 14, color: '#3b82f6', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#6b7280', flex: 1 }}>{offer.deliverySlot}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: offer.deliveryFee === 0 ? '#16a34a' : '#374151' }}>
          {offer.deliveryFee === 0 ? 'FREE' : `£${offer.deliveryFee}`}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Leaf style={{ width: 14, height: 14, color: '#22c55e', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#6b7280', flex: 1 }}>Sustainability</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 60, height: 4, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${offer.sustainabilityScore}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', background: '#22c55e', borderRadius: 999 }}
            />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151', minWidth: '30px' }}>{offer.sustainabilityScore}%</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Star style={{ width: 14, height: 14, color: '#f59e0b', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#6b7280', flex: 1 }}>Loyalty Points</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>+{offer.loyaltyPoints} pts</span>
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 12px',
        background: isSelected ? 'rgba(37,99,235,0.08)' : '#F8F9FA',
        borderRadius: '10px',
        border: isSelected ? '1px solid rgba(37,99,235,0.15)' : '1px dashed #e5e7eb',
      }}
    >
      <Zap style={{ width: 12, height: 12, color: isSelected ? '#2563eb' : '#6b7280', flexShrink: 0 }} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? '#1d4ed8' : '#6b7280' }}>
        AI Negotiated: {offer.negotiatedPerk}
      </span>
    </div>
  </motion.div>
)

// --- Main Component ---

interface ConversationalRetailUIProps {
  scale?: number
}

export default function ConversationalRetailUI({ scale = 1 }: ConversationalRetailUIProps) {
  const [appState, setAppState] = useState<AppState>('IDLE')
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [banner, setBanner] = useState<BannerState>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [negotiationStep, setNegotiationStep] = useState(0)

  useEffect(() => {
    if (appState === 'NEGOTIATING') {
      setNegotiationStep(0)
      setCurrentLogIndex(0)

      const stepInterval = setInterval(() => {
        setNegotiationStep((prev) => {
          if (prev >= NEGOTIATION_STEPS.length - 1) {
            clearInterval(stepInterval)
            setTimeout(() => setAppState('COMPARING'), 2000)
            return prev
          }
          return prev + 1
        })
      }, 3500)

      const logInterval = setInterval(() => {
        setCurrentLogIndex((prev) => {
          if (prev >= 8) {
            clearInterval(logInterval)
            return prev
          }
          return prev + 1
        })
      }, 800)

      return () => {
        clearInterval(stepInterval)
        clearInterval(logInterval)
      }
    }
  }, [appState])

  useEffect(() => {
    if (appState === 'COMPARING' || appState === 'CONFIRMED') {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentLogIndex, appState])

  // Auto-dismiss the inline banner after a short delay.
  useEffect(() => {
    if (!banner) return
    const t = setTimeout(() => setBanner(null), 2800)
    return () => clearTimeout(t)
  }, [banner])

  const handleUpload = () => {
    setAppState('ANALYZING')
    setTimeout(() => {
      setAppState('NEGOTIATING')
    }, 5000)
  }

  const handleConfirm = () => {
    if (!selectedOffer) {
      setBanner({ kind: 'error', message: 'Please select a basket first' })
      return
    }
    setAppState('CONFIRMED')
    setBanner({ kind: 'success', message: 'Order placed — AI agent handled checkout' })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#1a1a2e',
      }}
    >
      {/* iPhone-style container */}
      <div
        style={{
          width: 393,
          height: 852,
          background: '#ffffff',
          borderRadius: '3.5rem',
          boxShadow: '0 25px 60px rgba(79, 70, 229, 0.15), 0 0 0 12px #111827',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          flexShrink: 0,
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* Inline banner — replaces the Pollen sonner toast */}
        <AnimatePresence>
          {banner && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              style={{
                position: 'absolute',
                top: 70,
                left: 16,
                right: 16,
                zIndex: 60,
                padding: '10px 14px',
                borderRadius: 12,
                background: banner.kind === 'error' ? '#FEF2F2' : '#ECFDF5',
                border: `1px solid ${banner.kind === 'error' ? '#FCA5A5' : '#86EFAC'}`,
                color: banner.kind === 'error' ? '#991B1B' : '#065F46',
                fontSize: 12,
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              }}
            >
              {banner.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Bar */}
        <div
          style={{
            height: 56,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            fontSize: 12,
            fontWeight: 600,
            color: '#000',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
              <div style={{ width: 2, height: 4, background: '#000', borderRadius: 1 }} />
              <div style={{ width: 2, height: 6, background: '#000', borderRadius: 1 }} />
              <div style={{ width: 2, height: 8, background: '#000', borderRadius: 1 }} />
              <div style={{ width: 2, height: 10, background: '#d1d5db', borderRadius: 1 }} />
            </div>
            <div
              style={{
                width: 20,
                height: 10,
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                padding: 1,
              }}
            >
              <div style={{ width: '100%', height: '100%', background: '#000', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <header
          style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AIAgentOrb />
            <div>
              <h1 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
                Personal Grocery Agent
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  color: '#22c55e',
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                    animation: 'pulse 2s infinite',
                  }}
                />
                Active &bull; Negotiating Mode
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setAppState('IDLE')
              setSelectedOffer(null)
              setCurrentLogIndex(0)
              setNegotiationStep(0)
            }}
            style={{
              padding: 8,
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
          >
            <RefreshCw style={{ width: 20, height: 20 }} />
          </button>
        </header>

        {/* Main Content */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
          className="scrollbar-hide"
        >
          <AnimatePresence mode="wait">
            {appState === 'IDLE' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                <div
                  style={{
                    background: '#EFF6FF',
                    padding: 16,
                    borderRadius: 16,
                    borderTopLeftRadius: 0,
                    border: '1px solid #DBEAFE',
                  }}
                >
                  <p style={{ fontSize: 14, color: '#1e3a5f', lineHeight: 1.6, margin: 0 }}>
                    Good evening! Ready for the week? Upload a photo of your meal plan and I&apos;ll handle the rest.
                  </p>
                </div>

                <div
                  onClick={handleUpload}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: 24,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px dashed #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#60a5fa')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb')}
                >
                  <MealPlanPlaceholder />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      transition: 'background 0.3s',
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563eb',
                      }}
                    >
                      <Camera style={{ width: 32, height: 32 }} />
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#fff',
                        textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      Scan handwritten plan
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div
                    style={{
                      padding: 12,
                      background: '#f9fafb',
                      borderRadius: 12,
                      border: '1px solid #f3f4f6',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        color: '#9ca3af',
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      Last Sunday
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 500, margin: 0 }}>&pound;42.10 saved via AI negotiation</p>
                  </div>
                  <div
                    style={{
                      padding: 12,
                      background: '#f9fafb',
                      borderRadius: 12,
                      border: '1px solid #f3f4f6',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        color: '#9ca3af',
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      Current Stock
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 500, margin: 0 }}>84% cupboard match accuracy</p>
                  </div>
                </div>
              </motion.div>
            )}

            {appState === 'ANALYZING' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                  >
                    <RefreshCw style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Scanning handwritten meal plan...</p>
                </div>

                <div
                  style={{
                    background: '#f9fafb',
                    borderRadius: 16,
                    padding: 16,
                    border: '1px solid #f3f4f6',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#9ca3af',
                      textTransform: 'uppercase',
                      letterSpacing: 2,
                      marginBottom: 16,
                    }}
                  >
                    Ingredients Found
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {MOCK_INGREDIENTS.map((item, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={item.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 8,
                          background: '#fff',
                          borderRadius: 8,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {item.inCupboard ? (
                            <CheckCircle2 style={{ width: 16, height: 16, color: '#22c55e' }} />
                          ) : (
                            <div
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                border: '1px solid #d1d5db',
                              }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: 14,
                              color: item.inCupboard ? '#9ca3af' : '#374151',
                              textDecoration: item.inCupboard ? 'line-through' : 'none',
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                        {item.inCupboard && (
                          <span
                            style={{
                              fontSize: 10,
                              background: '#DCFCE7',
                              color: '#15803d',
                              padding: '2px 6px',
                              borderRadius: 4,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                            }}
                          >
                            In Stock
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div ref={chatEndRef} />
              </motion.div>
            )}

            {appState === 'NEGOTIATING' && (
              <motion.div
                key="negotiating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 0',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          background: '#fff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          border: '1px solid #f3f4f6',
                          padding: 8,
                        }}
                      >
                        <TescoLogo />
                      </div>
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 12,
                          height: 12,
                          background: '#3b82f6',
                          borderRadius: '50%',
                          border: '2px solid #fff',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#bfdbfe',
                          animation: 'bounce 1s infinite',
                        }}
                      />
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: '#2563eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          boxShadow: '0 8px 25px rgba(37,99,235,0.3)',
                        }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: '#60a5fa',
                          }}
                        />
                        <Sparkles style={{ width: 32, height: 32, color: '#fff', position: 'relative', zIndex: 1 }} />
                      </div>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#bfdbfe',
                          animation: 'bounce 1s infinite 0.1s',
                        }}
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          background: '#fff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          border: '1px solid #f3f4f6',
                          padding: 8,
                        }}
                      >
                        <SainsburysLogo />
                      </div>
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 12,
                          height: 12,
                          background: '#3b82f6',
                          borderRadius: '50%',
                          border: '2px solid #fff',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)',
                    borderRadius: 16,
                    padding: 16,
                    border: '1px solid #DBEAFE',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <User style={{ width: 16, height: 16, color: '#fff' }} />
                    </div>
                    <h3
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#1e3a8a',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        margin: 0,
                      }}
                    >
                      Your Preferences
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Prefer organic produce', 'Food must be gluten-free', 'Avoid plastic packaging'].map((pref) => (
                      <div key={pref} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#3b82f6',
                          }}
                        />
                        <span style={{ color: '#1e3a8a', fontWeight: 500 }}>{pref}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: '1px solid rgba(59,130,246,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 10,
                      color: '#1d4ed8',
                    }}
                  >
                    <CheckCircle2 style={{ width: 12, height: 12 }} />
                    <span style={{ fontWeight: 700 }}>Applied to all searches</span>
                  </div>
                </motion.div>

                <div
                  style={{
                    background: '#fff',
                    borderRadius: 24,
                    padding: 24,
                    border: '1px solid #f3f4f6',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={negotiationStep}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                        >
                          {NEGOTIATION_STEPS[negotiationStep].icon}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div style={{ flex: 1 }}>
                      <motion.h3
                        key={`title-${negotiationStep}`}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}
                      >
                        {NEGOTIATION_STEPS[negotiationStep].text}
                      </motion.h3>
                      <motion.p
                        key={`sub-${negotiationStep}`}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: 12, color: '#6b7280', margin: 0, marginTop: 4 }}
                      >
                        {NEGOTIATION_STEPS[negotiationStep].subtext}
                      </motion.p>
                    </div>
                  </div>

                  <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div
                      style={{
                        height: 6,
                        background: '#f3f4f6',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        style={{ height: '100%', background: '#2563eb', borderRadius: 999 }}
                        initial={{ width: '0%' }}
                        animate={{
                          width: `${((negotiationStep + 1) / NEGOTIATION_STEPS.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                      }}
                    >
                      <span>
                        Step {negotiationStep + 1} of {NEGOTIATION_STEPS.length}
                      </span>
                      <span>
                        {Math.round(((negotiationStep + 1) / NEGOTIATION_STEPS.length) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div ref={chatEndRef} />
              </motion.div>
            )}

            {appState === 'COMPARING' && (
              <motion.div
                key="comparing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 100 }}
              >
                <div
                  style={{
                    background: '#2563eb',
                    padding: 16,
                    borderRadius: 16,
                    color: '#fff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <ShieldCheck style={{ width: 16, height: 16 }} />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                      }}
                    >
                      Negotiation Complete
                    </span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                    I&apos;ve secured 3 exclusive offers. Tesco is best for delivery, but Sainsbury&apos;s offers the most loyalty value.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {MOCK_OFFERS.map((offer) => (
                    <SupermarketCard
                      key={offer.name}
                      offer={offer}
                      isSelected={selectedOffer === offer.name}
                      onSelect={() => setSelectedOffer(offer.name)}
                    />
                  ))}
                </div>
                <div ref={chatEndRef} />
              </motion.div>
            )}

            {appState === 'CONFIRMED' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: 24,
                  padding: '48px 0',
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    background: '#DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 style={{ width: 48, height: 48, color: '#16a34a' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Checkout Successful</h2>
                  <p style={{ color: '#6b7280', padding: '0 40px', marginTop: 8 }}>
                    Your shopping list is confirmed with {selectedOffer}. Delivery is scheduled for the requested slot.
                  </p>
                </div>
                <div
                  style={{
                    background: '#f9fafb',
                    padding: 16,
                    borderRadius: 16,
                    width: '100%',
                    textAlign: 'left',
                    border: '1px solid #f3f4f6',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Scheduled Time</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {MOCK_OFFERS.find((o) => o.name === selectedOffer)?.deliverySlot}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Savings Applied</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#16a34a' }}>
                      - &pound;
                      {(
                        MOCK_OFFERS.find((o) => o.name === selectedOffer)!.originalPrice -
                        MOCK_OFFERS.find((o) => o.name === selectedOffer)!.totalPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAppState('IDLE')
                    setSelectedOffer(null)
                  }}
                  style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Start new plan <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer
          style={{
            padding: 24,
            borderTop: '1px solid #f3f4f6',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {appState === 'COMPARING' ? (
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1,
                  background: '#2563eb',
                  color: '#fff',
                  padding: '16px 0',
                  borderRadius: 16,
                  fontWeight: 700,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
                  transition: 'background 0.2s',
                }}
              >
                Confirm &amp; Pay <ShoppingBag style={{ width: 20, height: 20 }} />
              </button>
            ) : (
              <>
                <div
                  style={{
                    flex: 1,
                    background: '#f3f4f6',
                    borderRadius: 16,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask your AI agent..."
                    disabled={appState !== 'IDLE'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: 14,
                      width: '100%',
                      color: '#111827',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
                <button
                  onClick={appState === 'IDLE' ? handleUpload : undefined}
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    border: 'none',
                    cursor: appState === 'IDLE' ? 'pointer' : 'default',
                    background: appState === 'IDLE' ? '#2563eb' : '#f3f4f6',
                    color: appState === 'IDLE' ? '#fff' : '#9ca3af',
                    boxShadow: appState === 'IDLE' ? '0 8px 20px rgba(37,99,235,0.3)' : 'none',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {appState === 'IDLE' ? (
                    <Send style={{ width: 20, height: 20 }} />
                  ) : (
                    <Clock style={{ width: 20, height: 20 }} />
                  )}
                </button>
              </>
            )}
          </div>
        </footer>

        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 128,
            height: 32,
            background: '#000',
            borderRadius: 999,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 16,
            gap: 4,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(59,130,246,0.5)',
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
