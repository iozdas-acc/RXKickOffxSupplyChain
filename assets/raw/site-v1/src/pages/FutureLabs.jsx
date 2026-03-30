import { motion } from 'framer-motion'
import { Cpu, Palette, Rocket, Code, Users, Globe, ArrowRight, Zap, Terminal, Layers, Braces, Orbit } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, PageWrapper, RevealText } from '../components/AnimatedSection'
import ParticleField from '../components/ParticleField'
import Button from '../components/Button'

const programs = [
  { icon: Cpu, title: 'AI & Machine Learning Lab', desc: 'Explore the fundamentals of artificial intelligence and build your own ML models through guided projects.', tag: 'AI' },
  { icon: Palette, title: 'Human-Centred Design Studio', desc: 'Learn design thinking methodology and create solutions that put real people and their needs first.', tag: 'Design' },
  { icon: Rocket, title: 'Tech Incubator', desc: 'Develop your ideas from concept to prototype in our supported incubation programme.', tag: 'Startup' },
  { icon: Code, title: 'Creative Coding', desc: 'Master programming through creative projects — from web apps to interactive art and generative design.', tag: 'Code' },
  { icon: Users, title: 'Leadership Academy', desc: 'Build the confidence and skills to lead innovation projects, teams and community initiatives.', tag: 'Leadership' },
  { icon: Globe, title: 'Global Challenges Lab', desc: 'Tackle real-world global issues using technology, data and creative problem-solving approaches.', tag: 'Impact' },
]

const vibes = [
  { icon: Terminal, title: 'Studio Vibe', desc: 'A creative workspace that feels nothing like school. Experiment, hack, build.' },
  { icon: Layers, title: 'No Boundaries', desc: 'Break out of traditional learning. Think bigger, question everything, push limits.' },
  { icon: Braces, title: 'Real Skills', desc: 'AI, coding, design thinking — practical skills for the future of work.' },
  { icon: Orbit, title: 'Your Network', desc: 'Connect with like-minded innovators, mentors and industry leaders.' },
]

export default function FutureLabs() {
  return (
    <PageWrapper>
      {/* Hero — Dark, neon, edgy */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fl-dark noise-overlay">
        <ParticleField color="rgba(248, 113, 113, 0.4)" count={40} />

        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [-40, 40, -40], y: [-30, 30, -30] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fl-red/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ x: [30, -30, 30], y: [20, -40, 20] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fl-blue/8 rounded-full blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fl-neon/[0.04] rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 line-grid" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white/80 text-sm font-medium">
              <Zap size={14} className="text-fl-neon" /> For Ages 13 – 18+
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-white mb-7 leading-[1.05] tracking-[-0.03em]"
          >
            Shape Tomorrow.{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text bg-gradient-to-r from-fl-red via-fl-neon to-fl-blue">
              Start Today.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            <span className="text-white/50 font-medium">Practical, hands-on</span> educational experiences exploring AI, human-centred design and creative problem-solving — for young people ready to <span className="text-fl-neon/50 font-medium">lead.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="#programs" variant="fl" icon={ArrowRight}>
              Explore Programs
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/10 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-fl-neon/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT IS FUTURE LABS — asymmetric intro + vibes ===== */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-20">
            {/* Left — big statement */}
            <AnimatedSection className="md:col-span-7">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-[-0.03em]">
                Not school. <span className="text-accent text-fl-red">A studio.</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-[52ch]">
                Future Labs is the young people's brand under Innovation X. Designed for teenagers and young adults aged 13–18+, it focuses on <span className="text-gray-700 font-medium">advanced innovation, R&D, tech incubation</span> and experimental learning. The vibe is funky, cool, studio-like — <span className="text-fl-red font-medium">breaking out of the traditional school environment.</span>
              </p>
            </AnimatedSection>

            {/* Right — inline stats */}
            <AnimatedSection delay={0.15} className="md:col-span-5 flex items-end">
              <p className="text-gray-400 text-lg font-medium font-heading tracking-tight">
                AI & ML · Design Thinking · Creative Coding · Tech Incubation · Leadership
              </p>
            </AnimatedSection>
          </div>

          {/* Vibe cards — 2+2 asymmetric */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
            {vibes.map(({ icon: Icon, title, desc }, i) => (
              <StaggerItem key={title} className={i === 0 || i === 3 ? 'lg:col-span-5' : 'lg:col-span-7'}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group bg-gray-50/80 rounded-2xl p-7 border border-gray-100/80 hover:bg-fl-dark hover:border-fl-dark transition-all duration-500 shadow-card h-full"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-fl-dark group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                      <Icon className="text-fl-red group-hover:text-fl-neon transition-colors duration-500" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white font-heading transition-colors duration-500 tracking-tight">{title}</h3>
                  </div>
                  <p className="text-gray-500 group-hover:text-white/40 text-sm transition-colors duration-500 pl-15">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-fl-red/15 to-transparent" />

      {/* ===== PROGRAMS — dark bento grid ===== */}
      <section id="programs" className="py-28 md:py-40 bg-fl-dark relative overflow-hidden noise-overlay">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-fl-red/[0.06] rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-fl-neon/[0.04] rounded-full blur-[180px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealText className="mb-16 md:text-right">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-[-0.03em]">
              What you'll <span className="text-accent text-fl-red">actually build.</span>
            </h2>
            <p className="text-lg text-white/30">Advanced programs for young people ready to <span className="text-white/50 font-medium">push boundaries</span> and <span className="text-white/50 font-medium">break moulds.</span></p>
          </RevealText>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {programs.map(({ icon: Icon, title, desc, tag }, i) => (
              <StaggerItem key={title} className={i < 2 ? 'md:col-span-6' : 'md:col-span-4'}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group relative rounded-2xl p-7 md:p-8 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-500 h-full overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-fl-red/[0.04] via-transparent to-fl-neon/[0.04]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center group-hover:border-fl-red/20 group-hover:bg-fl-red/[0.08] transition-all duration-300">
                        <Icon className="text-fl-red group-hover:text-fl-neon transition-colors duration-300" size={22} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/[0.06] text-white/40 text-xs font-bold uppercase tracking-[0.08em] border border-white/[0.04]">{tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2.5 font-heading tracking-tight group-hover:text-fl-neon/90 transition-colors duration-300">{title}</h3>
                    <p className="text-white/35 leading-relaxed text-[0.9rem] group-hover:text-white/45 transition-colors duration-300">{desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== MISSION — Dark section, left-aligned pull-quote ===== */}
      <section className="py-28 md:py-40 bg-fl-dark relative overflow-hidden noise-overlay">
        <ParticleField color="rgba(0, 240, 255, 0.3)" count={25} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-fl-red/[0.06] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fl-blue/[0.06] rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-white/20 text-sm font-medium tracking-wide uppercase mb-8">Our mission</p>
              <p className="text-2xl md:text-4xl text-white/75 leading-[1.4] font-heading font-medium tracking-tight">
                To deliver practical, hands-on educational experiences that explore AI, human-centred design and creative problem-solving — helping young people develop the skills and confidence to thrive in a continuously evolving <span className="text-accent text-fl-neon/60">future of work.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 font-heading tracking-[-0.03em]">
              Ready to build the <span className="text-accent text-fl-red">future?</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">Join Future Labs and start your <span className="text-gray-700 font-medium">innovation journey</span> today.</p>
            <Button to="/work-with-us" variant="fl-dark" icon={ArrowRight}>
              Get Started
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  )
}
