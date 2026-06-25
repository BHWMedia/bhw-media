'use client'

import { motion } from 'framer-motion'
import { OdometerCounter } from '@/components/OdometerCounter'

const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: 40, suffix: '+', label: 'Platforms Delivered', accent: '#7C5BFF', sub: 'Across 12 industries' },
  { value: 14, suffix: ' Days', label: 'Sprint Delivery', accent: '#00D4FF', sub: 'Brief to live production' },
  { value: 99, suffix: '+', label: 'Avg Lighthouse', accent: '#F5A623', sub: 'Performance guaranteed' },
  { value: 100, suffix: '%', label: 'Code Ownership', accent: '#FF4D6D', sub: 'Full IP on every build' },
]

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border/20 py-16 sm:py-20">
      {/* Subtle gradient bg */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(124,91,255,0.05) 0%, rgba(18,18,31,0.6) 50%, rgba(0,212,255,0.03) 100%)' }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Vertical divider */}
              {i > 0 && (
                <div aria-hidden="true" className="absolute -left-4 inset-y-2 hidden w-px lg:block"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(46,46,74,0.7) 30%, rgba(46,46,74,0.7) 70%, transparent)' }} />
              )}

              {/* Number */}
              <div className="font-display text-4xl font-bold sm:text-5xl" style={{ color: stat.accent }}>
                <OdometerCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <p className="mt-2 font-semibold text-sm text-text-primary">{stat.label}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-text-ghost">{stat.sub}</p>

              {/* Hover glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at center, ${stat.accent}08 0%, transparent 70%)` }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
