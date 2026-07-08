'use client'

import { useEffect, useState, type FormEvent } from 'react'

const SITE_PASSWORD = 'SainsAccenture2026!'
const STORAGE_KEY = 'rx-kickoff-unlocked'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  // Start in a neutral "checking" state so the server-rendered HTML and the
  // first client render match (avoids a hydration mismatch on the static export).
  const [status, setStatus] = useState<'checking' | 'locked' | 'unlocked'>('checking')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      const unlocked = sessionStorage.getItem(STORAGE_KEY) === 'true'
      setStatus(unlocked ? 'unlocked' : 'locked')
    } catch {
      setStatus('locked')
    }
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === SITE_PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        /* sessionStorage unavailable — still unlock for this session */
      }
      setStatus('unlocked')
      setError(false)
    } else {
      setError(true)
    }
  }

  if (status === 'unlocked') {
    return <>{children}</>
  }

  // While checking, render nothing visible but keep markup stable.
  return (
    <main
      aria-hidden={status === 'checking'}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'var(--color-background-primary)',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        opacity: status === 'checking' ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-primary)',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          This site is protected
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            marginTop: 10,
            marginBottom: 24,
          }}
        >
          Enter the password to view the presentation.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label htmlFor="site-password" className="sr-only">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(false)
            }}
            placeholder="Password"
            aria-invalid={error}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 15,
              fontFamily: 'var(--font-dm-sans), sans-serif',
              color: 'var(--color-text-primary)',
              background: 'var(--color-background-primary)',
              border: `1px solid ${error ? 'var(--color-destructive)' : 'var(--color-border-primary)'}`,
              borderRadius: 10,
              outline: 'none',
            }}
          />

          {error && (
            <p
              role="alert"
              style={{
                fontSize: 13,
                color: 'var(--color-destructive)',
                margin: 0,
              }}
            >
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              color: 'var(--color-primary-on)',
              background: 'var(--sainsburys-orange)',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              marginTop: 4,
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
