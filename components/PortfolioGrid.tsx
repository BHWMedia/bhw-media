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
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3">
        {PORTFOLIO_FILTERS.map((tab) => {
          const active = filter === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                active
                  ? 'bg-violet text-white'
                  : 'bg-elevated text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
