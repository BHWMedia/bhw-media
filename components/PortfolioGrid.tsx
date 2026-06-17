'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { PortfolioCard } from '@/components/PortfolioCard'
import { 
  PORTFOLIO, 
  PORTFOLIO_FILTERS, 
  type PortfolioFilter, 
  trackEvent 
} from '@/lib/constants'

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const
const STEADICAM_PHYSICS = { mass: 3, stiffness: 45, damping: 25 } as const

const FILTER_ACCENTS: Record<string, string> = {
  All: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  'Real Estate': 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Hospitality: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  Fitness: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  Automotive: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  SaaS: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  'E-Commerce': 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  Brand: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
}

export function PortfolioGrid() {
  const router = useRouter()
  const [filter, setFilter] = useState<PortfolioFilter>('All')
  const [isWarping, setIsWarping] = useState(false)

  const filtered = filter === 'All'
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === filter)

  const handleAuditWarp = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (isWarping) return
    
    setIsWarping(true)
    
    trackEvent({ 
      event: 'audit_warp_initiated',
      active_filter: filter 
    })
    
    setTimeout(() => {
      router.push('/audit')
    }, 550)
  }, [filter, isWarping, router])

  return (
    <div className="w-full pb-32">
      
      {/* ── Filter UI ──────────────────────────────────────────────────────── */}
      <motion.div 
        animate={{ opacity: isWarping ? 0 : 1, y: isWarping ? -20 : 0 }}
        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
        className="mb-16 flex flex-wrap items-center justify-center gap-2 md:justify-start"
      >
        {PORTFOLIO_FILTERS.map((tab) => {
          const active = filter === tab
          const style = FILTER_ACCENTS[tab] || FILTER_ACCENTS.All

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`relative rounded-full px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeFilterPill"
                  className={`absolute inset-0 rounded-full border ${style.split(' ')[0]} ${style.split(' ')[1]}`}
                  transition={STEADICAM_PHYSICS}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {active && <span className="h-1 w-1 rounded-full animate-ping bg-current" />}
                {tab}
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* ── Vault Tunnel Field (Fixed Height Collapse) ─────────────────────── */}
      <motion.div
        animate={{
          scale: isWarping ? 1.3 : 1,
          opacity: isWarping ? 0 : 1,
          y: isWarping ? 100 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 16,
                filter: 'blur(16px)',
                transition: { duration: 0.45, ease: EASE_PREMIUM },
              }}
              transition={STEADICAM_PHYSICS}
              className="h-full w-full"
              style={{
                // Desktop stagger visual effect
                marginTop: typeof window !== 'undefined' && window.innerWidth >= 1024 
                  ? index % 3 === 1 ? '2.5rem' : index % 3 === 2 ? '1rem' : '0px'
                  : '0px'
              }}
            >
              <PortfolioCard item={item as any} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
{/* ── Warp Trigger Button (Premium Styling) ───────────────────────────── */}
      <motion.div 
        animate={{ opacity: isWarping ? 0 : 1, y: isWarping ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-20 mb-12 flex w-full justify-center relative z-50 clear-both"
      >
        <button
          onClick={handleAuditWarp}
          disabled={isWarping}
          className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-neutral-950/80 backdrop-blur-md px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition-all duration-500 hover:border-cyan-500/40 hover:bg-neutral-900 hover:text-white hover:shadow-[0_0_40px_rgba(0,212,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Radar ping indicator */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500/60 duration-1000 group-hover:bg-cyan-400/80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500 group-hover:bg-cyan-400" />
          </span>
          
          <span className="relative z-10">Initialize System Diagnostic</span>
          
          {/* Animated Arrow */}
          <svg 
            className="h-4 w-4 -translate-x-2 text-cyan-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}