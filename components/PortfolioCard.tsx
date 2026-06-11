'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  category: string
  color: string
  liveUrl?: string
  image?: string
  mockupType?: string
  tags?: string[]
}

interface PortfolioCardProps {
  item: PortfolioItem
}

const COLOR_THEMES: Record<string, { border: string; bg: string; text: string; glow: string; rawHex: string }> = {
  violet: { border: 'border-purple-900/40', bg: 'bg-purple-950/10', text: 'text-[#7C5BFF]', glow: 'rgba(124,91,255,0.15)', rawHex: '#7C5BFF' },
  cyan: { border: 'border-cyan-900/40', bg: 'bg-cyan-950/10', text: 'text-[#00D4FF]', glow: 'rgba(0,212,255,0.15)', rawHex: '#00D4FF' },
  gold: { border: 'border-amber-900/40', bg: 'bg-amber-950/10', text: 'text-[#F5A623]', glow: 'rgba(245,166,35,0.15)', rawHex: '#F5A623' },
  crimson: { border: 'border-rose-900/40', bg: 'bg-rose-950/10', text: 'text-[#FF4D6D]', glow: 'rgba(255,77,109,0.15)', rawHex: '#FF4D6D' },
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const theme = COLOR_THEMES[item.color] ?? COLOR_THEMES.violet

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex h-full flex-col rounded-2xl border border-neutral-900 bg-[#111118] p-5 transition-all duration-300 hover:border-neutral-800`}
      style={{
        boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${theme.glow}` : 'none'
      }}
    >
      {/* Aspect Ratio Browser Header Wrapper */}
      <div 
        className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-900`} 
        style={{ backgroundColor: '#0A0A0F' }}
      >
        {item.liveUrl ? (
          <>
            <iframe
              src={item.liveUrl}
              title={item.title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full border-0"
              style={{
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                width: '200%',
                height: '200%',
                pointerEvents: 'none',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
          </>
        ) : item.image ? (
          <>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
            <motion.img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              Preview Offline
            </span>
          </>
        )}

        {/* Category Floating Pill Badge */}
        <div className="absolute left-3 top-3 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300 backdrop-blur-md">
            <span className={`h-1 w-1 rounded-full`} style={{ backgroundColor: theme.rawHex }} />
            {item.category}
          </span>
        </div>
      </div>

      {/* Copy Information Rows */}
      <div className="flex flex-col flex-1 mt-5">
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-2">
          {item.description}
        </p>

        {/* Absolute Functional Footer Grid Actions */}
        <div className="mt-auto pt-6 flex flex-col gap-2">
          <Link
            href={`/portfolio/${item.slug}`}
            className={`group/btn relative flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900`}
          >
            View Case Study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </Link>
          
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-800 bg-transparent px-4 py-2 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-300"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              Open Live Platform
            </a>
          )}
        </div>
      </div>
    </div>
  )
}