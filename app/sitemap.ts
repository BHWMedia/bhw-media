// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { PORTFOLIO } from '@/lib/constants'

const CANONICAL_ORIGIN = 'https://bhw-media.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_ORIGIN,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${CANONICAL_ORIGIN}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${CANONICAL_ORIGIN}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${CANONICAL_ORIGIN}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/audit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${CANONICAL_ORIGIN}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ── Dynamic portfolio case study routes ────────────────────────────────────
  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO.map((item) => ({
    url: `${CANONICAL_ORIGIN}/portfolio/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...portfolioRoutes]
}