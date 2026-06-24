import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
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

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const CANONICAL_ORIGIN = 'https://bhw-media.vercel.app'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
}

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'BHW Media — Premium Web Design & Digital Production',
    template: '%s | BHW Media',
  },
  description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'BHW Media — Web Design & Next.js Development Agency',
    description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
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
  logo: `${CANONICAL_ORIGIN}/icon.svg`,
  image: `${CANONICAL_ORIGIN}/opengraph-image.png`,
  description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
  address: {
    '@type': 'PostalAddress',
    addressCountry: "IN",
    addressLocality: "Hyderabad",
  },
  telephone: '+91-0000000000',
  email: 'mediabhw@gmail.com',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.385,
    longitude: 78.4867,
  },
  priceRange: '$$$',
  founder: { "@type": "Person", name: "BHW Media Founder", jobTitle: "Founder & Lead Designer" },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Design and Development',
  provider: {
    '@type': 'ProfessionalService',
    name: 'BHW Media',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Architecture & Build',
          description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SaaS Product Design',
          description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-Commerce Infrastructures',
          description: "Premium Next.js web design agency. High-converting websites for SaaS, e-commerce & brands. 14-day delivery sprint, 100% source code ownership. Free site audit.",
        },
      },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who owns the source code and repository once production concludes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. 100%. BHW Media completely hands over unencumbered ownership of the complete GitHub repository, configuration keys, and deployment pipelines under your corporate IP.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do you engineer custom platforms instead of using WordPress or Elementor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard templates and drag-and-drop builders load massive amounts of bloated code. We build with native code to guarantee fast performance, secure architectures, and search engine optimisation.',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} scroll-smooth`}>
      <head>
        {/* Fix: Using standard script tag for JSON-LD prevents Next.js hydration errors in the <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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