import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Trophy, Rocket, FlaskConical, School, Sparkles, BookOpen, ArrowRight, Star, Puzzle, Palette, Wand2 } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, PageWrapper, RevealText } from '../components/AnimatedSection'
import Button from '../components/Button'
import ImageLightbox from '../components/ImageLightbox'

const programs = [
  { icon: Lightbulb, title: 'Innovation Labs', desc: 'Creative problem-solving sessions where kids tackle real-world challenges using design thinking and hands-on prototyping.', color: 'from-amber-400 to-orange-500', emoji: '💡' },
  { icon: Trophy, title: 'Kidovation Week Challenge', desc: 'A week-long innovation challenge where teams compete to solve community problems with creative solutions.', color: 'from-kido-lime to-emerald-500', emoji: '🏆' },
  { icon: Rocket, title: 'Entrepreneurship Bootcamps', desc: 'Kids learn the basics of entrepreneurship — creating their own mini-businesses from idea to pitch.', color: 'from-kido-blue to-blue-600', emoji: '🚀' },
  { icon: FlaskConical, title: 'STEM Workshops', desc: 'Hands-on science, technology, engineering and maths activities with a creative twist kids love.', color: 'from-kido-pink to-rose-500', emoji: '🔬' },
  { icon: School, title: 'School Partnerships', desc: 'Activities designed with educators in mind. Ready to integrate into school curricula with minimal prep.', color: 'from-purple-500 to-indigo-600', emoji: '🏫' },
]

const features = [
  { icon: Puzzle, title: 'Playful', desc: 'Every experience is designed to feel like play, not work.', color: 'bg-kido-lime' },
  { icon: Palette, title: 'Creative', desc: 'We celebrate imagination and original thinking in everything.', color: 'bg-kido-pink' },
  { icon: Wand2, title: 'Hands-On', desc: 'Learning by building, testing, breaking and iterating.', color: 'bg-kido-blue' },
]

const galleryImages = [
  { label: 'Innovation Lab', src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', alt: 'Children collaborating in an innovation lab' },
  { label: 'Team Challenge', src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', alt: 'Kids working together on a team challenge' },
  { label: 'Prototyping', src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80', alt: 'Children building and prototyping' },
  { label: 'Pitch Day', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', alt: 'Young presenters on pitch day' },
  { label: 'STEM Workshop', src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80', alt: 'Hands-on STEM workshop activities' },
  { label: 'Award Ceremony', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Celebration at the award ceremony' },
]

export default function Kidovation() {
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' })

  return (
    <PageWrapper>
      {/* Hero — bright, bouncy, playful */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-kido-lime via-kido-blue to-kido-pink animate-gradient noise-overlay">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { size: 80, top: '12%', left: '6%', delay: 0, shape: 'rounded-full', bg: 'bg-white/15' },
            { size: 60, top: '22%', right: '10%', delay: 1, shape: 'rounded-2xl rotate-45', bg: 'bg-white/10' },
            { size: 100, bottom: '18%', left: '12%', delay: 2, shape: 'rounded-full', bg: 'bg-white/10' },
            { size: 48, bottom: '28%', right: '18%', delay: 0.5, shape: 'rounded-xl', bg: 'bg-yellow-300/15' },
            { size: 36, top: '55%', left: '38%', delay: 1.5, shape: 'rounded-full', bg: 'bg-pink-300/20' },
            { size: 64, top: '8%', right: '30%', delay: 3, shape: 'rounded-3xl rotate-12', bg: 'bg-white/8' },
          ].map((s, i) => (
            <motion.div
              key={i}
              animate={{ y: [-15, 15, -15], rotate: [0, s.delay * 5, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute ${s.bg} ${s.shape}`}
              style={{ width: s.size, height: s.size, top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute"
              style={{ top: `${10 + i * 10}%`, left: `${5 + i * 12}%` }}
            >
              <Star size={10 + i * 2} className="text-white/30" fill="white" fillOpacity={0.2} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-bold shadow-lg">
              <Sparkles size={14} /> For Kids Aged 6 – 12
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[5.5rem] font-bold text-white mb-7 leading-[1.05] tracking-[-0.03em]"
          >
            Where Kids{' '}
            <span className="relative inline-block">
              Create
              <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <motion.path d="M2 8C40 2 80 2 100 6C120 10 160 4 198 8" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.8 }} />
              </motion.svg>
            </span>,{' '}
            <br className="hidden md:block" />
            Innovate & Shine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <span className="text-white/90 font-medium">Playful, hands-on</span> educational experiences exploring AI, creativity, entrepreneurship and more — designed for <span className="text-white/90 font-medium">young innovators.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="#programs" variant="white" size="lg" icon={ArrowRight} className="rounded-full text-lg font-bold">
              View Our Programs
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowRight size={18} className="text-white rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT IS KIDOVATION — left-aligned, asymmetric ===== */}
      <section className="py-28 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-kido-lime/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-kido-pink/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Left — big intro text */}
            <AnimatedSection className="md:col-span-7">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-[-0.03em]">
                Learning that feels like <span className="text-accent text-kido-lime">play.</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-[50ch]">
                Kidovation is the kids brand under Innovation X — a vibrant space where young minds come alive through <span className="text-gray-700 font-medium">discovery and creation.</span> We deliver workshops, programs and bootcamps exploring creativity, technology and entrepreneurship for children aged 6 to 12.
              </p>
            </AnimatedSection>

            {/* Right — three feature pills stacked */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {features.map(({ icon: Icon, title, desc, color }, i) => (
                <AnimatedSection key={title} delay={0.1 * (i + 1)}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex items-center gap-4 bg-gray-50/80 rounded-2xl p-5 border border-gray-100/80 group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shadow-lg`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 font-heading tracking-tight">{title}</h3>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* YouTube Video */}
          <AnimatedSection delay={0.3} className="mt-16">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-card" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/COPVBYkJlWo"
                title="What Kidovation brings"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z" fill="#F0FDF4" />
        </svg>
      </div>

      {/* ===== PROGRAMS — bento grid ===== */}
      <section id="programs" className="py-28 md:py-40 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="mb-16 text-right md:text-right">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-[-0.03em]">
              What young innovators <span className="text-accent text-kido-blue">actually do.</span>
            </h2>
            <p className="text-lg text-gray-500">From creative labs to <span className="text-gray-700 font-medium">entrepreneurship bootcamps</span> — something for every young innovator.</p>
          </RevealText>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {programs.map(({ icon: Icon, title, desc, color, emoji }, i) => (
              <StaggerItem key={title} className={i < 2 ? 'md:col-span-6' : 'md:col-span-4'}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group bg-white rounded-2xl p-8 border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-300 h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-all duration-300`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <span className="text-2xl">{emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading tracking-tight">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0Z" fill="#F0FDF4" />
        </svg>
      </div>

      {/* ===== READY-TO-USE MATERIALS ===== */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kido-lime via-kido-blue to-kido-pink p-14 md:p-20 animate-gradient noise-overlay">
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-12, 12, -12], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute bg-white/10 rounded-full"
                    style={{ width: 30 + i * 15, height: 30 + i * 15, top: `${15 + i * 12}%`, left: `${8 + i * 16}%` }}
                  />
                ))}
              </div>
              <div className="relative z-10 max-w-2xl">
                <BookOpen className="mb-7 text-white/70" size={48} />
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-[-0.03em]">
                  Materials that <span className="text-accent">just work.</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Step-by-step illustrated guidance anyone can follow. Age-appropriate reading content with extension activities and hands-on DIYs. Designed for minimal prep time.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== EVENT GALLERY — asymmetric ===== */}
      <section className="py-28 md:py-36 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-[-0.03em]">
              A glimpse into our <span className="text-accent text-kido-pink">events.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-3">Real snapshots from our <span className="text-gray-700 font-medium">workshops, bootcamps</span> and innovation days.</p>
          </RevealText>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-12 gap-4">
            {galleryImages.map(({ label, src, alt }, i) => (
              <StaggerItem key={i} className={i === 0 || i === 3 ? 'md:col-span-5' : i === 1 ? 'md:col-span-7' : i === 2 ? 'md:col-span-4' : i === 4 ? 'md:col-span-4' : 'md:col-span-3'}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={() => setLightbox({ open: true, src, alt })}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-card"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-semibold">{label}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 font-heading tracking-[-0.03em]">
              Bring Kidovation to <span className="text-accent text-kido-lime">your school.</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">Get in touch to learn about <span className="text-gray-700 font-medium">programs, partnerships</span> and workshop options.</p>
            <Button to="/work-with-us" variant="kido" icon={ArrowRight} className="rounded-full">
              Work With Us
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <ImageLightbox
        src={lightbox.src}
        alt={lightbox.alt}
        open={lightbox.open}
        onClose={() => setLightbox({ open: false, src: '', alt: '' })}
      />
    </PageWrapper>
  )
}
