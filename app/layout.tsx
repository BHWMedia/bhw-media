// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CursorTrail } from '@/components/CursorTrail'
import { StickyLeadBar } from '@/components/StickyLeadBar'
import { CookieNotice } from '@/components/CookieNotice'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

const CANONICAL_ORIGIN = 'https://bhw-media.vercel.app'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: 'BHW Media — Premium Web Design & Digital Production',
    template: '%s | BHW Media',
  },
  description:
    'We engineer cinematic, high-converting websites for SaaS platforms, Web3 protocols, creative agencies, and premium e-commerce brands. 14-day delivery. 100% source code ownership.',
  keywords: [
    'web design agency',
    'Next.js development',
    'SaaS product design',
    'premium web development',
    'high-converting websites',
    'Framer Motion',
    'brand identity',
    'e-commerce development',
    'BHW Media',
  ],
  authors: [{ name: 'BHW Media', url: CANONICAL_ORIGIN }],
  creator: 'BHW Media',
  publisher: 'BHW Media',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'BHW Media — Premium Web Design & Digital Production',
    description:
      'We engineer cinematic, high-converting websites for SaaS platforms, Web3 protocols, creative agencies, and premium e-commerce brands. 14-day delivery. 100% source code ownership.',
    url: CANONICAL_ORIGIN,
    siteName: 'BHW Media',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image', // Managed relative to metadataBase
        width: 1200,
        height: 630,
        alt: 'BHW Media — We Build Websites That Convert.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BHW Media — Premium Web Design & Digital Production',
    description:
      'Cinematic, high-converting websites for SaaS, Web3, and premium brands. 14-day delivery. 100% source code ownership.',
    images: ['/opengraph-image'], // Managed relative to metadataBase
    creator: '@mediabhw',
    site: '@mediabhw',
  },
  alternates: {
    canonical: '/', // Managed relative to metadataBase
  },
}

// ── JSON-LD Corporate Schema ──────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${CANONICAL_ORIGIN}/#organization`,
  name: 'BHW Media',
  url: CANONICAL_ORIGIN,
  logo: `${CANONICAL_ORIGIN}/opengraph-image`,
  image: `${CANONICAL_ORIGIN}/opengraph-image`,
  description:
    'BHW Media is a premium web design and digital production studio engineering cinematic, high-converting websites for SaaS platforms, Web3 protocols, creative agencies, and e-commerce brands.',
  email: 'mediabhw@gmail.com',
  sameAs: [
    'https://instagram.com/media._bhw',
    'https://linkedin.com/company/bhwmedia',
    'https://twitter.com/mediabhw',
  ],
  areaServed: 'Worldwide',
  priceRange: '$$$',
  knowsAbout: [
    'Web Design',
    'Next.js Development',
    'SaaS Product Design',
    'Brand Identity',
    'E-Commerce Development',
    'Framer Motion',
    'React',
    'TypeScript',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'BHW Media Digital Production Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'v0 Architecture Sprint',
          description: 'High-converting single-page architecture in Next.js.',
        },
        price: '495',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Platform Build',
          description: 'Full multi-route Next.js platform with Figma design system.',
        },
        price: '2850',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Enterprise Matrix',
          description: 'Custom enterprise web infrastructure and SaaS product design.',
        },
      },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${CANONICAL_ORIGIN}/#website`,
  url: CANONICAL_ORIGIN,
  name: 'BHW Media',
  description: 'Premium Web Design & Digital Production',
  publisher: { '@id': `${CANONICAL_ORIGIN}/#organization` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} bg-black`}
    >
      <body className="font-sans antialiased bg-black text-white">
        {/* JSON-LD Structured Data - Rendered inside body safely */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Global interactive cursor */}
        <CursorTrail />

        {/* Ambient violet overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[#7C5BFF]/5 opacity-60 z-0"
        />

        {/* Primary application shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        {/* Conversion intercept component */}
        <StickyLeadBar />

        {/* GDPR cookie consent notice */}
        <CookieNotice />

        {/* Real-time Production Diagnostics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}