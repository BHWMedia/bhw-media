import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BHW Media — Premium Web Design & Digital Production',
  description:
    'We craft cinematic, high-converting websites for SaaS, Web3, creative agencies, and premium e-commerce brands. Based globally. Built to perform.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} bg-void`}
    >
      <body className="font-sans antialiased bg-void text-text-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-mesh-violet opacity-60 z-0"
        />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}