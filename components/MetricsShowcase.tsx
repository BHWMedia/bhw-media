'use client'

import { motion } from 'framer-motion'

interface MetricItem {
  eyebrow: string
  metric: string
  metricAccent: string
  title: string
  subtext: string
}

const EASE = [0.16, 1, 0.3, 1] as const

const METRICS: MetricItem[] = [
  {
    eyebrow: '// Core Web Vitals',
    metric: '99',
    metricAccent: '/100',
    title: 'Avg. Lighthouse Score',
    subtext: 'Zero layout shift. Optimised data payload trees across every deployment.',
  },
  {
    eyebrow: '// Revenue Acceleration',
    metric: '+24%',
    metricAccent: '',
    title: 'Conversion Lift',
    subtext: 'Calculated across luxury real estate and e-commerce client deployments.',
  },
  {
    eyebrow: '// Execution Velocity',
    metric: '14',
    metricAccent: ' Days',
    title: 'Staging Pipeline',
    subtext: 'From raw Figma concept wireframes to locked, deployed production code.',
  },
]

function MetricCardItem({ eyebrow, metric, metricAccent, title, subtext, index }: MetricItem & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      className="group relative flex flex-col rounded-2xl border border-border/40 bg-card p-8 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-violet/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(124,91,255,0.1)]"
    >
      {/* Ambient radial glow — GPU-composited activation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,91,255,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Top shimmer accent horizontal rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(124,91,255,0.6), rgba(0,212,255,0.4), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
            {eyebrow}
          </p>

          <div className="mb-4 flex items-baseline gap-1 leading-none">
            <span
              className="font-bold tracking-tighter text-text-primary"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 4.5rem)' }}
            >
              {metric}
            </span>
            {metricAccent && (
              <span className="text-2xl font-semibold text-violet">{metricAccent}</span>
            )}
          </div>

          <h3 className="mb-3 text-base font-semibold tracking-tight text-text-primary">
            {title}
          </h3>

          <div className="mb-4 h-px w-12 bg-border/60" aria-hidden="true" />
        </div>

        <p className="text-sm leading-relaxed text-text-muted">{subtext}</p>
      </div>
    </motion.div>
  )
}

export function MetricsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE }}
        className="mb-14 max-w-2xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // Proven Speed Metrics
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Numbers that close enterprise deals.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Every figure is pulled from live client deployments — not agency pitch decks.
          Performance is our baseline, not a selling point.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {METRICS.map((metric, i) => (
          <MetricCardItem key={metric.title} {...metric} index={i} />
        ))}
      </div>
    </section>
  )
}