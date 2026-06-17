import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CursorTrail } from '@/components/CursorTrail'
import { StickyLeadBar } from '@/components/StickyLeadBar'
import { CookieNotice } from '@/components/CookieNotice'
import { CinematicPreloader } from '@/components/CinematicPreloader'
import { GTM_ID } from '@/lib/constants'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

const CANONICAL_ORIGIN = 'https://bhw-media.vercel.app'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: 'BHW Media — Premium Web Design & Digital Production',
    template: '%s | BHW Media',
  },
  description: 'We engineer cinematic, high-converting websites for SaaS platforms, Web3 protocols, creative agencies, and premium e-commerce brands. 14-day delivery. 100% source code ownership.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'BHW Media — Premium Web Design & Digital Production',
    description: 'We engineer cinematic, high-converting websites for SaaS platforms and premium brands.',
    url: CANONICAL_ORIGIN,
    siteName: 'BHW Media',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BHW Media',
  url: CANONICAL_ORIGIN,
  priceRange: '$$$',
  areaServed: 'Worldwide',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        {/* Fix: Using standard script tag for JSON-LD prevents Next.js hydration errors in the <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-black text-white font-sans antialiased">
        {/* Phase 6: GTM securely injected without blocking rendering */}
        <GoogleTagManager gtmId={GTM_ID} />

        {/* Preloader: Fixed high Z-Index for absolute coverage */}
        <CinematicPreloader />

        {/* Global UI Components */}
        <CursorTrail />

        {/* Ambient background overlay */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#7C5BFF]/5 opacity-60" />

        {/* Main Application Shell */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        <StickyLeadBar />
        <CookieNotice />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}