import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CursorTrail } from '@/components/CursorTrail'
import { StickyLeadBar } from '@/components/StickyLeadBar'

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
        url: `${CANONICAL_ORIGIN}/opengraph-image`,
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
    images: [`${CANONICAL_ORIGIN}/opengraph-image`],
    creator: '@mediabhw',
    site: '@mediabhw',
  },

  alternates: {
    canonical: CANONICAL_ORIGIN,
  },
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
        {/* Global interactive cursor — client-only, touch-guarded internally */}
        <CursorTrail />

        {/* Ambient violet overlay — decorative, pointer-events disabled */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[#7C5BFF]/5 opacity-60 z-0"
        />

        {/* Primary application shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        {/* Conversion intercept component */}
        <StickyLeadBar />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}