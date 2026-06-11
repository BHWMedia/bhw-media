import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PORTFOLIO } from '@/lib/constants'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = PORTFOLIO.find((p) => p.slug === slug)
  if (!item) return {}
  return {
    title: `${item.title} — BHW Media`,
    description: item.description,
    openGraph: {
      title: `${item.title} — BHW Media Case Study`,
      description: item.description,
      type: 'article',
    },
  }
}

const ACCENT_HEX: Record<string, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

export default async function PortfolioCaseStudy({ params }: Props) {
  const { slug } = await params
  const item = PORTFOLIO.find((p) => p.slug === slug)
  if (!item) notFound()

  const accent = ACCENT_HEX[item.color] ?? '#7C5BFF'

  // Bulletproof safety fallbacks for backward compatibility
  const tags = item.tags ?? ['Digital Production', 'Next.js', 'Tailwind']
  const challenge = item.challenge ?? 'The client required an ultra-high performance digital optimization layer to transition away from legacy infrastructure, eliminate customer churn metrics, and capture higher enterprise traffic value.'
  const methodology = item.methodology ?? 'We engineered a headless custom application architecture featuring sub-30ms edge content delivery routing, dynamic theme tokens, and clean conversion pipelines.'
  const outcomeMetrics = item.outcomeMetrics ?? ['+42% Conversion Rate Optimization', 'Sub-50ms Core Web Vitals Performance', '100% Core Layout Lighthouse Score']

  return (
    <main
      style={{ backgroundColor: '#05050A', paddingTop: '7rem', paddingBottom: '6rem' }}
      className="min-h-screen text-neutral-200"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Back navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <span
              className="font-mono text-xs uppercase tracking-[0.15em]"
              style={{ color: accent }}
            >
              // {item.category}
            </span>
            <h1
              className="font-bold tracking-tight text-white mt-3 mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              {item.title}
            </h1>
            <p className="text-base leading-relaxed text-neutral-400 mb-8">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    backgroundColor: `${accent}12`,
                    borderColor: `${accent}30`,
                    color: accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                Launch Live Platform
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Luxury Browser Device Mockup Frame */}
          {item.liveUrl && (
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 32px 72px rgba(0,0,0,0.6), 0 0 60px ${accent}12`,
              }}
            >
              {/* Chrome Top Bar UI */}
              <div
                className="flex h-9 items-center gap-3 px-4"
                style={{ backgroundColor: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div
                  className="flex flex-1 items-center gap-2 rounded-md px-3 py-1"
                  style={{ backgroundColor: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="font-mono text-[10px] text-neutral-400 truncate">{item.liveUrl.replace('https://', '')}</span>
                  <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="ml-auto" aria-label="Open tab">
                    <ArrowUpRight size={9} style={{ color: '#7A7A94' }} />
                  </a>
                </div>
              </div>
              <div style={{ height: '380px', backgroundColor: '#0A0A0F', position: 'relative' }}>
                <iframe
                  src={item.liveUrl}
                  title={item.title}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  className="h-full w-full border-0"
                  style={{ pointerEvents: 'none' }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{ background: 'linear-gradient(to top, #0A0A0F 0%, transparent 100%)' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Technical Deep Dive Matrices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="rounded-2xl p-7 border border-neutral-900 bg-neutral-950/40">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
              // The Challenge
            </span>
            <p className="text-sm leading-relaxed text-neutral-400/90">
              {challenge}
            </p>
          </div>

          <div className="rounded-2xl p-7 border border-neutral-900 bg-neutral-950/40">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
              // Our Methodology
            </span>
            <p className="text-sm leading-relaxed text-neutral-400/90">
              {methodology}
            </p>
          </div>

          <div className="rounded-2xl p-7 border bg-neutral-950/20" style={{ borderColor: `${accent}30` }}>
            <span className="font-mono text-xs uppercase tracking-widest mb-4 block" style={{ color: accent }}>
              // Outcome Metrics
            </span>
            <ul className="space-y-3">
              {outcomeMetrics.map((metric) => (
                <li key={metric} className="flex items-start gap-3 text-sm text-white font-semibold">
                  <span className="mt-0.5 text-xs" style={{ color: accent }}>▲</span>
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Conversion Row */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${accent}12 0%, rgba(0,212,255,0.04) 100%)`,
            border: `1px solid ${accent}25`,
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
            Want results like these?
          </h2>
          <p className="text-neutral-400 text-sm mb-7 max-w-md mx-auto leading-relaxed">
            Every project starts with a free 15-minute discovery call. No obligation, no pitch decks — just an engineered evaluation of your digital footprint.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full px-7 py-3 font-semibold text-sm text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(124,91,255,0.4)]"
              style={{ backgroundColor: accent }}
            >
              Start a Project →
            </Link>
            
            <a
              href="https://calendly.com/mediabhw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 px-7 py-3 font-semibold text-sm text-neutral-300 transition-all duration-200 hover:border-neutral-700 hover:text-white"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              Book a Call
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}