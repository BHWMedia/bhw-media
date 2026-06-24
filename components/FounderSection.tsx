'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }

const STATS = [
  { value: '40+', label: 'Platforms shipped' },
  { value: '99', label: 'Avg Lighthouse' },
  { value: '14d', label: 'Delivery sprint' },
]

export function FounderSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE }}
        className="relative overflow-hidden rounded-3xl border border-border/40"
        style={{
          background: 'linear-gradient(135deg, rgba(124,91,255,0.08) 0%, rgba(18,18,31,0.65) 50%, rgba(0,212,255,0.05) 100%)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: '0 24px 72px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Inner top accent line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.5) 35%, rgba(0,212,255,0.4) 65%, transparent)',
          }}
        />

        <div className="grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Avatar column */}
          <div className="relative mx-auto lg:mx-0">
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={STEADICAM}
              className="glass-metric-card relative mx-auto aspect-square w-52 overflow-hidden rounded-2xl sm:w-60 lg:w-full"
            >
              {/* Gradient placeholder until real photo is added */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet/25 via-transparent to-cyan/20" />
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="font-display text-7xl font-bold text-gradient-nebula leading-none">B</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-ghost">Founder</span>
                </div>
              </div>
              {/* Inner ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/8"
              />
            </motion.div>

            {/* Floating founder badge */}
            <div className="absolute -bottom-3 -right-3 rounded-full border border-border/60 bg-card px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-cyan shadow-lg">
              BHW Media · Hyderabad
            </div>
          </div>

          {/* Content column */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // About the Founder
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Built by engineers who obsess over pixels and milliseconds.
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-text-secondary sm:text-base">
              BHW Media was founded in Hyderabad with a single conviction: a{' '}
              <strong className="font-medium text-text-primary">web design agency</strong> should
              ship production-grade{' '}
              <strong className="font-medium text-text-primary">Next.js development</strong> — not
              templates. Every engagement is architected in-house with strict TypeScript, Framer
              Motion physics, and Tailwind v4 design tokens so clients own code that performs under
              real traffic.
            </p>
            <p className="mt-3 text-sm leading-[1.8] text-text-muted">
              We have delivered 40+ custom platforms across SaaS, e-commerce, and brand identity —
              averaging 99+ Lighthouse scores and 14-day production sprints. No subcontractors. No
              page-builder exports. Full repository handoff on every project.
            </p>

            {/* Mini stat strip */}
            <div className="mt-7 flex flex-wrap gap-6 border-t border-border/30 pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-bold text-text-primary sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/audit" className="btn-nebula text-sm">
                Run Free Audit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
