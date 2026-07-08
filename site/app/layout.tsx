import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import PasswordGate from '@/components/presentation/PasswordGate'

// RX brand — DM Sans everywhere (800 headlines / 700 labels / 400 body).
// The legacy `--font-space-grotesk` and `--font-space-mono` CSS variables are
// still referenced inline across components, so we alias them all to DM Sans.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RX × Accenture — A New Model For Reinvention',
  description:
    "Embedding AI-native ways of working to accelerate discovery — and how we're making it the template for reinvention at scale.",
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'RX × Accenture',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={dmSans.variable}
      style={
        {
          '--font-space-grotesk': 'var(--font-dm-sans)',
          '--font-space-mono': 'var(--font-dm-sans)',
        } as React.CSSProperties
      }
    >
      <body>
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  )
}
