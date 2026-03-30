import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const permanentMarker = localFont({
  src: '../public/fonts/PermanentMarker-Regular.ttf',
  variable: '--font-permanent-marker',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Innovation X — Inspiring the Next Generation',
    template: '%s | Innovation X',
  },
  description:
    'Innovation X is the home of Kidovation and Future Labs — hands-on hackathon programmes empowering young people to think, create, and innovate.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Innovation X',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${permanentMarker.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
