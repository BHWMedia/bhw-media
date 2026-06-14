'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface TechPill {
  label: string
  tag: string
  accent: 'violet' | 'cyan' | 'gold' | 'neutral'
}

const STACK: TechPill[] = [
  { label: 'Next.js 16', tag: 'App Router · RSC · Edge', accent: 'neutral' },
  { label: 'React 19', tag: 'Concurrent · Server Actions', accent: 'cyan' },
  { label: 'TypeScript', tag: 'Strict Mode · 5.7', accent: 'cyan' },
  { label: 'Tailwind CSS v4', tag: 'Native @theme · JIT', accent: 'violet' },
  { label: 'Framer Motion', tag: 'Physics · Layout · Scroll', accent: 'violet' },
  { label: 'Vercel Edge', tag: 'Global CDN · <50ms TTFB', accent: 'neutral' },
  { label: 'Supabase', tag: 'Postgres · Realtime · Auth', accent: 'gold' },
  { label: 'React Server Components', tag: 'Zero-bundle · Streaming', accent: 'cyan' },
  { label: 'Zod', tag: 'Runtime Schema Validation', accent: 'neutral' },
  { label: 'Resend', tag: 'Transactional Email API', accent: 'neutral' },
  { label: 'Upstash Redis', tag: 'Edge Rate Limiting', accent: 'gold' },
  { label: 'Web Security', tag: 'CSP · CSRF · HTTPS', accent: 'violet' },
]

const ACCENT_GLOW: Record<TechPill['accent'], string> = {
  violet: '0 0 0 1px rgba(124,91,255,0.5), 0 4px 20px rgba(124,91,255,0.18)',
  cyan: '0 0 0 1px rgba(0,212,255,0.45), 0 4px 20px rgba(0,212,255,0.15)',
  gold: '0 0 0 1px rgba(245,166,35,0.45), 0 4px 20px rgba(245,166,35,0.14)',
  neutral: '0 0 0 1px rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.3)',
}

const ACCENT_DOT: Record<TechPill['accent'], string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  neutral: '#3A3A4E',
}

function TechPillItem({ label, tag, accent, index }: TechPill & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
      whileHover={{ y: -3, boxShadow: ACCENT_GLOW[accent] }}
      className="group relative flex cursor-default flex-col gap-1.5 rounded-xl border border-border/40 bg-card px-5 py-4 transition-colors duration-300 hover:border-transparent"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-300 group-hover:shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: ACCENT_DOT[accent] }}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-text-primary">{label}</span>
      </div>
      <span className="pl-3.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {tag}
      </span>
    </motion.div>
  )
}

export function TechMatrix() {
  return (
    <section className="border-y border-border/30 bg-elevated/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            // Engineering Infrastructure
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Why we don't build on WordPress.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Standard builders inject thousands of lines of bloat. We own every byte.
            This is the exact stack deployed across every BHW Media production environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {STACK.map((pill, i) => (
            <TechPillItem key={pill.label} {...pill} index={i} />
          ))}
        </div>

        {/* Bottom context telemetry parameters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/30 pt-8"
        >
          {[
            { label: 'Avg. Build Size', value: '<180kb gzipped' },
            { label: 'Cold Start', value: '<80ms Edge' },
            { label: 'Lighthouse CI', value: 'Enforced on merge' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {stat.label}
              </span>
              <span className="font-mono text-xs font-semibold text-violet">{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}