import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { PasswordGate } from '@/components/presentation/PasswordGate'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "RX KickOff — Sainsbury's Agentic Transformation",
  description:
    "How RX delivered measurable impact at Sainsbury's — and what it means for the future of agentic transformation.",
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'RX KickOff',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body>
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  )
}
