// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPortfolioItem, PORTFOLIO } from '@/lib/constants'
import PortfolioClientPage from './client-page'

interface Props {
  params: Promise<{ slug: string }>
}

// Statically generate routes at build time
export async function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }))
}

// Dynamically generate SEO metadata per case study
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getPortfolioItem(slug)
  
  if (!item) return {}
  
  return {
    title: `${item.title} | BHW Media Architecture`,
    description: item.description || item.challenge,
    openGraph: {
      title: `${item.title} | High-Performance Deployment`,
      description: item.description || item.challenge,
      type: 'article',
      images: [item.image],
    },
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  // Await the asynchronous params object per Next.js 15+ specifications
  const { slug } = await params
  const portfolioItem = getPortfolioItem(slug)

  if (!portfolioItem) {
    notFound()
  }

  // Pass validated data into the client-side cinematic engine
  return <PortfolioClientPage item={portfolioItem} />
}