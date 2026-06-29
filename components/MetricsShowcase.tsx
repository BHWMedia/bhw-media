'use client'

import { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { OdometerCounter } from '@/components/OdometerCounter'

interface MetricItem {
  eyebrow: string
  value: number | string
  suffix?: string
  title: string
  subtext: string
  accent: 'violet' | 'cyan' | 'gold'
}

const EASE = [0.16, 1, 0.3, 1] as const

const METRICS: MetricItem[] = [
  {
    eyebrow: '// Core Web Vitals',
    value: 99,
    suffix: '/100',
    title: 'Avg. Lighthouse Score',
    subtext: 'Zero layout shift. Optimised payload trees across every deployment.',
    accent: 'violet',
  },
  {
    eyebrow: '// Revenue Acceleration',
    value: 24,
    suffix: '%',
    title: 'Conversion Lift',
    subtext: 'Measured across luxury real estate and e-commerce client deployments.',
    accent: 'cyan',
  },
  {
    eyebrow: '// Execution Velocity',
    value: 14,
    suffix: ' Days',
    title: 'Staging Pipeline',
    subtext: 'From Figma wireframes to locked, deployed production code.',
    accent: 'gold',
  },
]

const ACCENT_GLOW: Record<MetricItem['accent'], string> = {
  violet: 'rgba(124,91,255,0.18)',
  cyan: 'rgba(0,212,255,0.15)',
  gold: 'rgba(245,166,35,0.15)',
}

const ACCENT_TEXT: Record<MetricItem['accent'], string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
}

const ACCENT_BORDER: Record<MetricItem['accent'], string> = {
  violet: 'rgba(124,91,255,0.35)',
  cyan: 'rgba(0,212,255,0.28)',
  gold: 'rgba(245,166,35,0.28)',
}

function CausticsOverlay({ rippleX, rippleY }: { rippleX: number; rippleY: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: `
          radial-gradient(circle 200px at ${rippleX}% ${rippleY}%, rgba(255,255,255,0.04) 0%, transparent 70%),
          radial-gradient(circle 100px at ${100 - rippleX}% ${100 - rippleY}%, rgba(124,91,255,0.06) 0%, transparent 60%)
        `,
      }}
    />
  )
}

function GlassMetricCard({
  eyebrow,
  value,
  suffix = '',
  title,
  subtext,
  accent,
  index,
}: MetricItem & { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ripple, setRipple] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setRipple({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.12 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-7 sm:p-8"
      style={{
        background: 'linear-gradient(148deg, rgba(124,91,255,0.10) 0%, rgba(18,18,31,0.70) 45%, rgba(0,212,255,0.06) 100%)',
        backdropFilter: 'blur(40px) saturate(220%) brightness(105%)',
        WebkitBackdropFilter: 'blur(40px) saturate(220%) brightness(105%)',
        border: `1px solid ${hovered ? ACCENT_BORDER[accent] : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? `0 28px 72px rgba(0,0,0,0.55), 0 0 60px ${ACCENT_GLOW[accent]}, inset 0 1px 0 rgba(255,255,255,0.12)`
          : '0 12px 40px rgba(0,0,0,0.35), 0 0 20px rgba(124,91,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Caustic light ripple on hover */}
      <CausticsOverlay rippleX={ripple.x} rippleY={ripple.y} />

      {/* Hatch pattern texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 8px)',
        }}
      />

      {/* Corner glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse, ${ACCENT_GLOW[accent].replace('0.18', '0.5')} 0%, transparent 70%)`,
          filter: 'blur(24px)',
          opacity: hovered ? 0.8 : 0.3,
        }}
      />

      <div className="relative z-10">
        <p className={`mb-5 font-mono text-[10px] uppercase tracking-[0.2em] ${ACCENT_TEXT[accent]}`}>
          {eyebrow}
        </p>

        {/* Metric value with odometer */}
        <div
          className="mb-3 font-display font-bold tracking-tighter text-text-primary flex items-baseline"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}
        >
          <OdometerCounter value={value} suffix={suffix} />
        </div>

        <h3 className="mb-3 text-sm font-semibold text-text-primary sm:text-base">{title}</h3>
        <div className="mb-4 h-px w-10 bg-border/50" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-text-muted sm:text-sm">{subtext}</p>
      </div>
    </motion.div>
  )
}

export function MetricsShowcase() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full opacity-8"
        style={{ background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative mb-12 max-w-2xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // Proven Speed Metrics
        </span>
        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
          Numbers that close enterprise deals.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
          Every figure is pulled from live client deployments — not agency pitch decks.
          Performance is our baseline, not a selling point.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
        {METRICS.map((metric, i) => (
          <GlassMetricCard key={metric.title} {...metric} index={i} />
        ))}
      </div>
    </section>
  )
}
