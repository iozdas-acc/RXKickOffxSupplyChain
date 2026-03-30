import { useState } from 'react'
import { motion } from 'framer-motion'
import { School, Handshake, Heart, Send, ArrowRight, CheckCircle, Mail, MapPin, Phone, Loader2 } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, PageWrapper, RevealText } from '../components/AnimatedSection'
import ImageLightbox from '../components/ImageLightbox'

const audiences = [
  {
    icon: School,
    title: 'For Schools',
    desc: 'We run our events in classrooms. Our programs are designed with educators in mind, providing ready-to-use materials with step-by-step guidance. Bring innovation education to your students with minimal prep time.',
    color: 'from-ix-purple to-ix-blue',
    tag: 'Educators',
    features: ['Curriculum-aligned workshops', 'Ready-to-use materials', 'Teacher training included'],
  },
  {
    icon: Handshake,
    title: 'For Partners',
    desc: 'Join us in building the future of education. We work with organisations, sponsors and community partners who share our vision of empowering young people through innovation.',
    color: 'from-kido-lime to-kido-blue',
    tag: 'Organisations',
    features: ['Co-branded programs', 'CSR alignment', 'Impact reporting'],
  },
  {
    icon: Heart,
    title: 'For Parents',
    desc: 'Give your children access to creative, hands-on learning experiences that build confidence, creativity and future-ready skills. Explore our programs and upcoming events.',
    color: 'from-fl-red to-fl-yellow',
    tag: 'Families',
    features: ['Holiday workshops', 'After-school clubs', 'Birthday innovation parties'],
  },
]

const galleryImages = [
  { label: 'Workshop Day', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', alt: 'Collaborative workshop session' },
  { label: 'Team Building', src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80', alt: 'Team building activities with kids' },
  { label: 'Innovation Lab', src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', alt: 'Children in an innovation lab' },
  { label: 'Award Ceremony', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Celebration at the award ceremony' },
]

// Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

export default function WorkWithUs() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState({})
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' })

  const validate = (form) => {
    const errs = {}
    const data = new FormData(form)
    if ((data.get('name') || '').trim().length < 2) errs.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email') || '')) errs.email = 'Please enter a valid email'
    if (!data.get('role')) errs.role = 'Please select your role'
    if ((data.get('message') || '').trim().length < 10) errs.message = 'Please enter at least 10 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const errs = validate(e.target)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    const formData = new FormData(e.target)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.get('name'),
          email: formData.get('email'),
          role: formData.get('role'),
          message: formData.get('message'),
          subject: `New enquiry from ${formData.get('name')} — Innovation X`,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        e.target.reset()
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        setSubmitError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses = (field) =>
    `w-full px-4 py-3.5 rounded-xl border ${errors[field] ? 'border-red-400 bg-red-50/50' : 'border-gray-200/80 bg-gray-50/50'} focus:border-ix-purple focus:ring-2 focus:ring-ix-purple/10 focus:bg-white outline-none transition-all duration-200 text-gray-900`

  return (
    <PageWrapper>
      {/* Hero — left-aligned, conversational */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ix-purple/[0.04] via-white to-ix-blue/[0.04]" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-[15%] w-64 h-64 bg-ix-purple/[0.04] rounded-full blur-3xl" />
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-10 left-[10%] w-60 h-60 bg-ix-blue/[0.04] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-ix-purple text-sm font-semibold tracking-wide uppercase mb-5">
            Get involved
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-bold text-gray-900 mb-7 tracking-[-0.03em] max-w-3xl">
            Let's build something <span className="text-accent text-ix-purple">meaningful.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-xl text-gray-500 max-w-[50ch] leading-relaxed">
            Whether you're a <span className="text-gray-700 font-medium">school, partner organisation</span> or parent — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Audience Cards — asymmetric layout */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {audiences.map(({ icon: Icon, title, desc, color, tag, features }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} className={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-12'}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`group relative bg-white rounded-3xl p-8 md:p-10 border border-gray-100/80 shadow-card hover:shadow-card-hover transition-all duration-500 h-full overflow-hidden ${i === 2 ? 'md:flex md:items-center md:gap-12' : ''}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-t-3xl`} />
                  <div className={i === 2 ? 'md:flex-1' : ''}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shadow-lg`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.08em]">{tag}</span>
                        <h3 className="text-xl font-bold text-gray-900 font-heading tracking-tight">{title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>
                  </div>
                  <ul className={`space-y-2.5 ${i === 2 ? 'md:shrink-0' : ''}`}>
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-ix-purple shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form — conversational header */}
      <section className="py-24 md:py-32 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-[-0.03em]">
              Tell us about <span className="text-accent text-ix-purple">your idea.</span>
            </h2>
            <p className="text-lg text-gray-500">Drop us a message — we'll get back to you <span className="text-gray-700 font-medium">as soon as possible.</span></p>
          </RevealText>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="space-y-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ix-purple/[0.06] flex items-center justify-center shrink-0">
                      <Mail className="text-ix-purple" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 font-heading tracking-tight">Email</h4>
                      <a href="mailto:hello@innovationx.com" className="text-gray-500 hover:text-ix-purple transition-colors duration-200">hello@innovationx.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ix-purple/[0.06] flex items-center justify-center shrink-0">
                      <MapPin className="text-ix-purple" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 font-heading tracking-tight">Location</h4>
                      <p className="text-gray-500">United Kingdom</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ix-purple/[0.06] flex items-center justify-center shrink-0">
                      <Phone className="text-ix-purple" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 font-heading tracking-tight">Social</h4>
                      <p className="text-gray-500">LinkedIn / Instagram</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100/80 shadow-card">
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <CheckCircle className="mx-auto mb-6 text-green-500" size={56} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading tracking-tight">Message Sent!</h3>
                      <p className="text-gray-500">We'll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                          <input type="text" id="name" name="name" placeholder="Full name" className={inputClasses('name')} />
                          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                          <input type="email" id="email" name="email" placeholder="your@email.com" className={inputClasses('email')} />
                          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="mb-5">
                        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
                        <select id="role" name="role" className={`${inputClasses('role')} bg-white`}>
                          <option value="">Select your role</option>
                          <option value="school">School / Educator</option>
                          <option value="partner">Partner / Organisation</option>
                          <option value="parent">Parent / Guardian</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1.5">{errors.role}</p>}
                      </div>
                      <div className="mb-7">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                        <textarea id="message" name="message" rows={4} placeholder="Tell us how you'd like to work together..." className={`${inputClasses('message')} resize-none`} />
                        {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                      </div>
                      {submitError && (
                        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                          {submitError}
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-ix-purple to-ix-blue text-white font-semibold rounded-xl shadow-card hover:shadow-card-elevated hover:shadow-ix-purple/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {submitting ? (
                          <>Sending... <Loader2 size={18} className="animate-spin" /></>
                        ) : (
                          <>Send Message <Send size={18} /></>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Event Photos — asymmetric grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText className="mb-14 text-right md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-[-0.03em]">
              Our events in <span className="text-accent text-ix-purple">action.</span>
            </h2>
            <p className="text-gray-500 text-lg mt-3">Real photos from <span className="text-gray-700 font-medium">Kidovation workshops</span> and Innovation X events.</p>
          </RevealText>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-12 gap-4">
            {galleryImages.map(({ label, src, alt }, i) => (
              <StaggerItem key={i} className={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : i === 2 ? 'md:col-span-4' : 'md:col-span-8'}>
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-semibold">{label}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
