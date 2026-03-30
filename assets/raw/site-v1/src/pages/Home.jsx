import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, FlaskConical, Lightbulb, Rocket, Users, ChevronRight, Zap, Brain, Palette, Target, Star, Trophy, School, Cpu, Mic, Code } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, PageWrapper, RevealText } from '../components/AnimatedSection'
import TextScramble from '../components/TextScramble'
import ParticleField from '../components/ParticleField'
import Button from '../components/Button'

const scrollWords = ['Innovators', 'Creators', 'Leaders', 'Thinkers', 'Builders']

const pillars = [
  { icon: Brain, title: 'AI & Technology', desc: 'Hands-on exploration of AI, machine learning and emerging tech — demystified for young minds.', color: 'from-violet-500 to-purple-600' },
  { icon: Palette, title: 'Human-Centred Design', desc: 'Learning to solve real problems by putting people first through design thinking and empathy.', color: 'from-rose-500 to-pink-600' },
  { icon: Lightbulb, title: 'Creative Problem-Solving', desc: 'Building the confidence to tackle challenges with imagination, iteration and ingenuity.', color: 'from-amber-500 to-orange-600' },
  { icon: Target, title: 'Future of Work Skills', desc: 'Developing creativity, judgment, resilience and adaptability for a continuously evolving world.', color: 'from-emerald-500 to-teal-600' },
]

export default function Home() {
  return (
    <PageWrapper>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0533] via-ix-purple-dark to-[#0c1445] noise-overlay">
        <ParticleField color="rgba(167, 139, 250, 0.6)" count={60} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-30, 30, -30], x: [-20, 20, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[15%] w-[500px] h-[500px] bg-ix-purple/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ y: [20, -40, 20], x: [10, -10, 10] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-ix-blue/15 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-kido-pink/10 rounded-full blur-[80px]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white/90 text-sm font-medium">
              <Sparkles size={14} className="text-ix-purple-light" /> The Future of Education
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-white leading-[1.05] mb-7 tracking-[-0.03em]"
          >
            Inspiring the Next{' '}
            <br className="hidden sm:block" />
            Generation of{' '}
            <br className="hidden sm:block" />
            <span className="relative inline-block min-w-[280px] sm:min-w-[320px] md:min-w-[420px]">
              <TextScramble
                words={scrollWords}
                interval={2500}
                className="gradient-text bg-gradient-to-r from-ix-purple-light via-kido-pink to-fl-yellow"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-ix-purple-light via-kido-pink to-fl-yellow rounded-full origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/35 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The ecosystem empowering young people through <span className="text-white/60 font-medium">hands-on education in AI, creativity and innovation</span> — from kids to future leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button to="/kidovation" variant="white" icon={ArrowRight}>
              <span className="w-2 h-2 rounded-full bg-kido-lime" />
              Explore Kidovation
            </Button>
            <Button to="/future-labs" variant="secondary" icon={ArrowRight}>
              <span className="w-2 h-2 rounded-full bg-fl-red" />
              Discover Future Labs
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/15 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== SCROLLING MARQUEE ===== */}
      <section className="py-5 bg-gradient-to-r from-ix-purple-dark via-[#1a0533] to-ix-purple-dark overflow-hidden border-b border-white/[0.06]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-8">
              {['AI Education', 'Design Thinking', 'Creative Coding', 'Entrepreneurship', 'Innovation Labs', 'Future Skills', 'Human-Centred Design', 'STEM Workshops'].map((text, i) => (
                <span key={`${j}-${i}`} className="flex items-center gap-3 text-sm font-medium text-white/60 tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-ix-purple-light/50" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== OUR ECOSYSTEM — immersive brand showcase ===== */}
      <section className="py-28 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Left-aligned intro */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <RevealText>
              <p className="text-ix-purple text-sm font-semibold tracking-wide uppercase mb-4">Our Ecosystem</p>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-[-0.03em]">
                One vision,<br />two brands,<br />
                <span className="text-accent text-ix-purple">endless possibilities.</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-[55ch]">
                Innovation X unites education, creativity and innovation under one roof. We run <span className="text-gray-700 font-medium">two brands</span> — each designed for a different stage of a young person's journey.
              </p>
            </RevealText>
          </div>

          {/* Brand cards — tall, rich, immersive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* KIDOVATION CARD */}
            <AnimatedSection>
              <Link to="/kidovation" className="block group h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative overflow-hidden rounded-[2rem] h-full"
                >
                  {/* Gradient background with animated shapes */}
                  <div className="absolute inset-0 bg-gradient-to-br from-kido-lime via-kido-blue to-kido-pink opacity-[0.08]" />
                  <div className="absolute inset-0 border border-kido-lime/15 rounded-[2rem] pointer-events-none" />

                  {/* Floating shapes */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-6 -right-6 w-32 h-32 bg-kido-lime/10 rounded-full blur-2xl"
                    />
                    <motion.div
                      animate={{ y: [6, -6, 6] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-8 -left-8 w-40 h-40 bg-kido-pink/10 rounded-full blur-2xl"
                    />
                  </div>

                  <div className="relative p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kido-lime to-kido-blue flex items-center justify-center shadow-lg shadow-kido-lime/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Sparkles className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-2xl text-gray-900 tracking-tight">Kidovation</h3>
                          <p className="text-sm text-gray-400 font-medium">Ages 6 – 12</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-kido-lime/10 text-kido-lime text-xs font-bold uppercase tracking-wider border border-kido-lime/15">Kids</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed mb-8 text-[0.95rem]">
                      Playful, hands-on workshops where kids explore creativity, technology and entrepreneurship — because the best learning feels like play.
                    </p>

                    {/* Program highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { icon: Lightbulb, label: 'Innovation Labs', color: 'text-amber-500' },
                        { icon: Trophy, label: 'Week Challenges', color: 'text-kido-lime' },
                        { icon: Rocket, label: 'Bootcamps', color: 'text-kido-blue' },
                        { icon: School, label: 'School Programs', color: 'text-kido-pink' },
                      ].map(({ icon: PIcon, label, color }) => (
                        <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-gray-100/80">
                          <PIcon size={16} className={color} />
                          <span className="text-xs font-medium text-gray-600">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100/80">
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-kido-lime fill-kido-lime" />
                        ))}
                        <span className="text-xs text-gray-400 ml-1.5">Loved by kids</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-kido-lime text-sm font-bold group-hover:gap-2.5 transition-all duration-300">
                        Explore <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>

            {/* FUTURE LABS CARD */}
            <AnimatedSection delay={0.12}>
              <Link to="/future-labs" className="block group h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative overflow-hidden rounded-[2rem] h-full"
                >
                  {/* Dark gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fl-dark via-[#1A1530] to-fl-dark" />
                  <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem] pointer-events-none" />

                  {/* Glow effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ y: [-10, 10, -10], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-10 -right-10 w-48 h-48 bg-fl-red/20 rounded-full blur-[60px]"
                    />
                    <motion.div
                      animate={{ y: [8, -8, 8], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-10 -left-10 w-40 h-40 bg-fl-neon/10 rounded-full blur-[50px]"
                    />
                    {/* Subtle grid lines */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  </div>

                  <div className="relative p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fl-red to-fl-yellow flex items-center justify-center shadow-lg shadow-fl-red/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <FlaskConical className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-2xl text-white tracking-tight">Future Labs</h3>
                          <p className="text-sm text-white/40 font-medium">Ages 13 – 18+</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-fl-red/10 text-fl-red text-xs font-bold uppercase tracking-wider border border-fl-red/20">Teens</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/50 leading-relaxed mb-8 text-[0.95rem]">
                      Advanced innovation programs for teenagers — AI, design thinking, tech incubation. The vibe is studio, not school.
                    </p>

                    {/* Program highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { icon: Cpu, label: 'AI & Machine Learning', color: 'text-fl-neon' },
                        { icon: Code, label: 'Creative Tech', color: 'text-fl-yellow' },
                        { icon: Mic, label: 'Pitch & Present', color: 'text-fl-red' },
                        { icon: Rocket, label: 'Incubator', color: 'text-fl-blue' },
                      ].map(({ icon: PIcon, label, color }) => (
                        <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                          <PIcon size={16} className={color} />
                          <span className="text-xs font-medium text-white/60">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-fl-neon opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-fl-neon" />
                        </span>
                        <span className="text-xs text-white/30 font-medium">Now enrolling</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-fl-red text-sm font-bold group-hover:gap-2.5 transition-all duration-300">
                        Discover <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          </div>

          {/* Connecting thread — what unites both brands */}
          <AnimatedSection delay={0.2}>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Creativity & Innovation', desc: 'Both brands build creative confidence through hands-on making.', color: 'from-ix-purple to-ix-blue' },
                { label: 'AI & Design Thinking', desc: 'Human-centred design meets emerging technology at every age.', color: 'from-kido-lime to-kido-blue' },
                { label: 'Real-World Skills', desc: 'Entrepreneurship, teamwork and critical thinking — not just theory.', color: 'from-fl-red to-fl-yellow' },
              ].map(({ label, desc, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100/80"
                >
                  <div className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${color} shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-gray-900 tracking-tight mb-1">{label}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHAT WE TEACH — bento-ish layout ===== */}
      <section className="py-28 md:py-40 bg-gray-50/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          {/* Right-aligned this time for rhythm */}
          <RevealText className="text-right md:text-right mb-16 md:mb-20 ml-auto max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 tracking-[-0.03em]">
              What we actually <span className="text-accent text-ix-purple">teach</span>
            </h2>
            <p className="text-lg text-gray-500">The skills that matter most when <span className="text-gray-700 font-medium">AI can do the rest.</span></p>
          </RevealText>

          {/* Bento-style grid — varying sizes */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {pillars.map(({ icon: Icon, title, desc, color }, i) => (
              <StaggerItem key={title} className={i < 2 ? 'md:col-span-7' : i === 2 ? 'md:col-span-5' : 'md:col-span-5'}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`group relative bg-white rounded-2xl p-8 md:p-9 border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden h-full ${i === 1 ? 'md:col-start-6' : ''}`}
                >
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="flex items-start gap-5">
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-all duration-300`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading tracking-tight">{title}</h3>
                      <p className="text-gray-500 leading-relaxed text-[0.95rem]">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== VISION — full-bleed, just big text ===== */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0533] via-ix-purple-dark to-[#0c1445] p-12 md:p-20 noise-overlay">
              <ParticleField color="rgba(167, 139, 250, 0.4)" count={30} />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-ix-purple/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-ix-blue/15 rounded-full blur-[80px]" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <p className="text-white/30 text-sm font-medium tracking-wide uppercase mb-8">Our vision</p>
                <p className="text-2xl md:text-[2.75rem] text-white/90 leading-[1.3] font-heading font-medium tracking-tight">
                  Empower young people to become critical, creative, confident leaders who dare to harness the power of emerging technologies to innovate for <span className="text-accent text-ix-purple-light">a better world.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== STATS — inline, conversational ===== */}
      <section className="py-20 md:py-28 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-3 md:gap-x-10 text-center">
              <span className="text-5xl md:text-7xl font-bold gradient-text bg-gradient-to-r from-ix-purple to-ix-blue font-heading tracking-tight">500+</span>
              <span className="text-gray-400 text-lg">students</span>
              <span className="text-gray-300 hidden md:inline">|</span>
              <span className="text-5xl md:text-7xl font-bold gradient-text bg-gradient-to-r from-ix-purple to-ix-blue font-heading tracking-tight">50+</span>
              <span className="text-gray-400 text-lg">schools</span>
              <span className="text-gray-300 hidden md:inline">|</span>
              <span className="text-5xl md:text-7xl font-bold gradient-text bg-gradient-to-r from-ix-purple to-ix-blue font-heading tracking-tight">100%</span>
              <span className="text-gray-400 text-lg">hands-on</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA — less formal ===== */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 font-heading tracking-[-0.03em]">
              Let's build something <span className="text-accent text-ix-purple">together.</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg max-w-[45ch] mx-auto">
              Whether you're a school, partner, or parent — we'd love to talk about <span className="text-gray-700 font-medium">what's possible.</span>
            </p>
            <Button to="/work-with-us" icon={ArrowRight}>
              Work With Us
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  )
}
