'use client'

import { motion } from 'framer-motion'
import { OdometerCounter } from '@/components/OdometerCounter'

const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: 40, suffix: '+', label: 'Brands Delivered', accent: 'text-violet' },
  { value: 14, suffix: ' Days', label: 'Avg. Project Delivery', accent: 'text-cyan' },
  { value: 100, suffix: '%', label: 'Source Code Ownership', accent: 'text-gold' },
]

export function StatsBanner() {
  return (
    <section className="relative border-y border-border/25 overflow-hidden py-16 sm:py-20">
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(124,91,255,0.04) 0%, rgba(18,18,31,0.5) 50%, rgba(0,212,255,0.03) 100%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-px px-6 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            className="relative flex flex-col items-center py-8 text-center sm:py-0"
          >
            {/* Vertical divider (not first) */}
            {i > 0 && (
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 hidden w-px sm:block"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(46,46,74,0.8) 30%, rgba(46,46,74,0.8) 70%, transparent)' }}
              />
            )}

            <OdometerCounter
              value={stat.value}
              suffix={stat.suffix}
              className={`font-display text-4xl font-bold sm:text-5xl ${stat.accent}`}
            />
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
