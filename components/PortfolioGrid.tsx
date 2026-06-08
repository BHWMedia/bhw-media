'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PortfolioCard } from '@/components/PortfolioCard'
import { PORTFOLIO, PORTFOLIO_FILTERS } from '@/lib/constants'

const EASE = [0.16, 1, 0.3, 1] as const

export function PortfolioGrid() {
  const [filter, setFilter] = useState<string>('All')

  const filtered =
    filter === 'All'
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === filter)

  return (
    <div className="w-full">
      {/* Premium Filter Architecture */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:justify-start">
        {PORTFOLIO_FILTERS.map((tab) => {
          const active = filter === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full border border-violet-500/30 bg-violet-500/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          )
        })}
      </div>

      {/* Grid Layout Engine */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="h-full"
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}