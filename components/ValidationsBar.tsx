'use client'

import { motion } from 'framer-motion'
import { Star, Award, TrendingUp } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const VALIDATIONS = [
  {
    icon: Star,
    headline: '5.0 / 5.0 Rating',
    sub: 'Verified on Clutch',
    accent: '#F5A623',
    extra: (
      <div className="flex items-center gap-0.5 mt-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={12} fill="#F5A623" className="text-gold" />
        ))}
      </div>
    ),
  },
  {
    icon: Award,
    headline: 'Awwwards.',
    sub: 'UI/UX Excellence · Honorable Mention',
    accent: '#00D4FF',
    extra: null,
  },
  {
    icon: TrendingUp,
    headline: '$40M+ Client Revenue',
    sub: 'Generated via our platforms',
    accent: '#7C5BFF',
    extra: null,
  },
]

export function ValidationsBar() {
  return (
    <section className="relative border-b border-border/20 py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {VALIDATIONS.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.sub}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/30 bg-card/40 p-6 text-center transition-all duration-400 hover:border-border/60 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {/* Icon */}
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8"
                  style={{ backgroundColor: `${v.accent}18` }}
                >
                  <Icon size={18} style={{ color: v.accent }} />
                </div>

                <p
                  className="font-display text-lg font-bold leading-tight tracking-tight"
                  style={{ color: v.accent }}
                >
                  {v.headline}
                </p>
                {v.extra}
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {v.sub}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
