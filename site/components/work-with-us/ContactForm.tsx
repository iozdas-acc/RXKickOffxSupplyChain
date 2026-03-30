'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Role = 'school' | 'partner' | 'parent' | 'other' | ''

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [role, setRole] = useState<Role>('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    gsap.from(sectionRef.current, {
      y: 32, opacity: 0, duration: 0.7, ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  function validate(data: FormData) {
    const errs: Record<string, string> = {}
    if (!data.get('name')) errs.name = 'Name is required'
    if (!data.get('email')) errs.email = 'Email is required'
    return errs
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: 'var(--space-4)',
    background: 'var(--bg-card)',
    border: '1px solid var(--color-navy-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-md)',
    outline: 'none',
    transition: 'border-color var(--duration-base)',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-accent)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-fl-orange)',
    marginTop: 'var(--space-1)',
  }

  const roles: { value: Role; label: string }[] = [
    { value: 'school', label: 'A school' },
    { value: 'partner', label: 'A corporate partner' },
    { value: 'parent', label: 'A parent' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      style={{
        background: 'var(--bg-page)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
    >
      <div className="container" style={{ maxWidth: 'var(--content-narrow-width)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              fontSize: 'var(--text-d2)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Get in touch.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)',
          }}>
            Tell us who you are and we&apos;ll send you the right information.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              background: 'rgba(46, 207, 168, 0.1)',
              border: '1px solid var(--color-kido-teal)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-12)',
              textAlign: 'center',
            }}
            role="status"
          >
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-title)',
              fontSize: 'var(--text-xl)',
              color: 'var(--color-kido-teal)',
              marginBottom: 'var(--space-4)',
            }}>
              Message sent!
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
            }}>
              We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
          >
            {/* Name */}
            <div>
              <label htmlFor="name" style={labelStyle}>Name <span aria-hidden="true" style={{ color: 'var(--color-fl-orange)' }}>*</span></label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
                style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--interactive-focus)' }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-navy-border)' }}
              />
              {errors.name && <p id="name-error" role="alert" style={errorStyle}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={labelStyle}>Email <span aria-hidden="true" style={{ color: 'var(--color-fl-orange)' }}>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
                style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--interactive-focus)' }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-navy-border)' }}
              />
              {errors.email && <p id="email-error" role="alert" style={errorStyle}>{errors.email}</p>}
            </div>

            {/* Organisation */}
            <div>
              <label htmlFor="org" style={labelStyle}>Organisation / school <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>(optional)</span></label>
              <input
                id="org"
                name="org"
                type="text"
                autoComplete="organization"
                style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--interactive-focus)' }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-navy-border)' }}
              />
            </div>

            {/* Role radio */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={labelStyle}>I am</legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                {roles.map(({ value, label }) => (
                  <label
                    key={value}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: '8px 16px',
                      border: `1px solid ${role === value ? 'var(--color-kido-green)' : 'var(--color-navy-border)'}`,
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: role === value ? 'var(--color-kido-green)' : 'var(--text-secondary)',
                      transition: 'all var(--duration-base)',
                      background: role === value ? 'rgba(126,200,58,0.08)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Message */}
            <div>
              <label htmlFor="message" style={labelStyle}>Message <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>(optional)</span></label>
              <textarea
                id="message"
                name="message"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--interactive-focus)' }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-navy-border)' }}
              />
            </div>

            <button
              type="submit"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 'var(--btn-min-height)',
                padding: 'var(--btn-primary-padding)',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
                fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-accent)',
                fontSize: 'var(--text-sm)', border: 'none',
                borderRadius: 'var(--btn-primary-radius)',
                cursor: 'pointer',
                width: '100%',
                transition: 'background var(--duration-fast)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--btn-primary-hover)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--btn-primary-bg)' }}
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
