import { motion } from 'framer-motion'
import { Heart, Lightbulb, Users, Sparkles, ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, PageWrapper, RevealText } from '../components/AnimatedSection'
import Button from '../components/Button'

const team = [
  { initials: 'MP', name: 'Matt P', role: 'Founder & CEO', bg: 'from-ix-purple to-ix-blue', expertise: 'Education Innovation', bio: 'Passionate about reimagining how young people learn, create and lead in a world shaped by emerging technology.' },
  { initials: 'SK', name: 'Sarah K', role: 'Head of Curriculum', bg: 'from-kido-lime to-kido-blue', expertise: 'Curriculum Design', bio: 'Designs playful, rigorous learning experiences that bridge the gap between classroom theory and real-world innovation.' },
  { initials: 'JR', name: 'James R', role: 'Technology Lead', bg: 'from-fl-red to-fl-yellow', expertise: 'Emerging Tech & AI', bio: 'Brings cutting-edge tech into the hands of young people, making AI and design thinking accessible and exciting.' },
]

const timeline = [
  { gen: '01', title: 'The Beginning', desc: 'Started with a simple question: what if education felt more like invention? We ran our first workshops in schools and community spaces.', color: 'bg-ix-purple' },
  { gen: '02', title: 'Kidovation was born', desc: 'Launched hands-on programs for kids — creativity, entrepreneurship and technology. A dedicated brand for young innovators aged 6-12.', color: 'bg-kido-lime' },
  { gen: '03', title: 'Future Labs + IX', desc: 'Expanded with Future Labs for teenagers. Innovation X became the ecosystem connecting everything under one vision.', color: 'bg-fl-red' },
]

const values = [
  { icon: Heart, title: 'Empathy first', desc: 'Every experience starts with understanding real people and real needs.', color: 'from-pink-500 to-rose-500' },
  { icon: Lightbulb, title: 'Problems = opportunities', desc: 'We teach young people to see challenges differently — as creative fuel.', color: 'from-amber-400 to-orange-500' },
  { icon: Users, title: 'Everyone belongs', desc: 'Innovation is for everyone. We build spaces where every voice matters.', color: 'from-ix-purple to-ix-blue' },
]

export default function About() {
  return (
    <PageWrapper>
      {/* Hero — left-aligned, conversational */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ix-purple/[0.04] via-white to-ix-blue/[0.04]" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-ix-purple text-sm font-semibold tracking-wide uppercase mb-5">
            About us
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-bold text-gray-900 mb-7 tracking-[-0.03em] max-w-3xl">
            We believe education should feel like <span className="text-accent text-ix-purple">invention.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-xl text-gray-500 max-w-[50ch] leading-relaxed">
            Innovation X started with a simple idea: what if young people didn't just learn about the future — but <span className="text-ix-purple font-medium">actually built it?</span>
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision — one big statement, not two symmetrical cards */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <AnimatedSection className="md:col-span-7">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ix-purple to-ix-blue p-10 md:p-14 text-white h-full noise-overlay">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <Sparkles className="mb-6 text-white/40" size={28} />
                  <p className="text-white/40 text-sm font-medium tracking-wide uppercase mb-4">Our vision</p>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                    Empower young people to become critical, creative, confident leaders who dare to harness emerging technologies to innovate for <span className="text-accent">a better world.</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="md:col-span-5">
              <div className="relative overflow-hidden rounded-3xl bg-gray-50/80 border border-gray-100/80 p-10 md:p-12 h-full">
                <Lightbulb className="mb-6 text-ix-purple/30" size={28} />
                <p className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-4">Our mission</p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Deliver playful, hands-on educational experiences that explore AI, human-centred design and creative problem-solving — helping young people develop skills and confidence for the future of work.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team — less corporate, more personal */}
      <section className="py-24 md:py-32 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-[-0.03em]">
              The people behind the mission
            </h2>
          </RevealText>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.initials}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-500 group"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.bg} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-lg font-bold font-heading">{member.initials}</span>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 font-heading tracking-tight">{member.name}</h3>
                      <p className="text-ix-purple text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <span className="text-gray-400 text-xs font-medium">{member.expertise}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline — horizontal on desktop, storytelling feel */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-[-0.03em]">
              How we got here
            </h2>
          </RevealText>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {timeline.map((item, i) => (
              <StaggerItem key={item.gen}>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold font-heading">{item.gen}</span>
                    </div>
                    {i < timeline.length - 1 && <div className="hidden md:block flex-1 h-px bg-gray-200" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[0.95rem]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values — simple, no pill badges */}
      <section className="py-24 md:py-32 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="max-w-xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-[-0.03em]">
              What we believe in
            </h2>
            <p className="text-gray-500 text-lg">Three principles that shape <span className="text-gray-700 font-medium">everything we build.</span></p>
          </RevealText>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-500 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading tracking-tight">{title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[0.95rem]">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 font-heading tracking-[-0.03em]">
              Interested? <span className="text-accent text-ix-purple">Let's talk.</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">We're always looking for schools, partners and supporters who want to <span className="text-gray-700 font-medium">reach more young people.</span></p>
            <Button to="/work-with-us" icon={ArrowRight}>
              Work With Us
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  )
}
