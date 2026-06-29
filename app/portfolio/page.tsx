'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { PORTFOLIO, type PortfolioItem } from '@/lib/constants'

const EASE = [0.16, 1, 0.3, 1] as const

const ACCENT_HEX: Record<string, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

// ─── Featured case study (full-width hero card) ───────────────────────────────

function FeaturedCard({ item }: { item: PortfolioItem }) {
  const [hovered, setHovered] = useState(false)
  const accent = ACCENT_HEX[item.color] ?? '#7C5BFF'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative col-span-full overflow-hidden rounded-3xl"
      style={{
        boxShadow: hovered
          ? `0 40px 80px rgba(0,0,0,0.6), 0 0 80px ${accent}25`
          : '0 16px 48px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* Background image */}
      <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.8s ease' }}
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,6,13,0.92) 0%, rgba(6,6,13,0.6) 50%, rgba(6,6,13,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(6,6,13,0.8) 0%, transparent 60%)` }} />

        {/* Mouse tracking glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `radial-gradient(circle 400px at 25% 50%, ${accent}12 0%, transparent 70%)` }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-md"
                style={{ borderColor: `${accent}40`, backgroundColor: `${accent}18`, color: accent }}
              >
                {item.category}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-ghost">
                Featured Case Study
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {item.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
              {item.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/portfolio/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: accent, boxShadow: `0 0 28px ${accent}50` }}
              >
                View Full Case Study
                <ArrowUpRight size={14} />
              </Link>

              {/* Metrics strip */}
              <div className="flex flex-wrap gap-4">
                {item.outcomeMetrics.slice(0, 2).map((m) => (
                  <span key={m} className="font-mono text-[10px] text-text-muted">
                    <span style={{ color: accent }}>↑</span> {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const featured = PORTFOLIO[0]

  return (
    <main className="min-h-screen bg-void text-text-primary pt-[68px]">

      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/20">
        {/* Ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/3 h-[480px] w-[480px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #7C5BFF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-1/4 h-[360px] w-[360px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #00D4FF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              // Selected Work
            </span>
            <h1
              className="font-display mt-4 font-bold tracking-tight text-text-primary"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.08 }}
            >
              Platforms that command attention.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-text-secondary">
              Every engagement is custom-scoped and production-engineered from scratch.
              No templates. No shortcuts. Real results, documented.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { v: '4', l: 'Live case studies' },
              { v: '40+', l: 'Total platforms' },
              { v: '99', l: 'Avg Lighthouse' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-bold text-gradient-nebula sm:text-3xl">{s.v}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* ─── Featured full-width card ─────────────────────────── */}
        <div
          className="mb-14 grid grid-cols-1"
          style={{ perspective: '1000px' }}
        >
          <FeaturedCard item={featured} />
        </div>

        {/* ─── Case Study Vault ──────────────────────────────────── */}
        <PortfolioGrid />

        {/* ─── Deep-dive strip ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mt-20 overflow-hidden rounded-3xl border border-border/30"
          style={{
            background: 'linear-gradient(135deg, rgba(124,91,255,0.10) 0%, rgba(18,18,31,0.7) 50%, rgba(0,212,255,0.07) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 24px 72px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="h-px w-full"
            style={{ background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.5) 35%, rgba(0,212,255,0.4) 65%, transparent)' }}
          />
          <div className="grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                // Every engagement
              </span>
              <h2 className="font-display mt-3 text-xl font-bold tracking-tight text-text-primary sm:text-2xl lg:text-3xl">
                These are just the highlights.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary">
                Forty+ platforms shipped across SaaS, e-commerce, real estate, and brand identity.
                Every one production-engineered with 99+ Lighthouse scores and full code handover.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/audit" className="btn-nebula text-sm">
                Run Free Audit →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-6 py-3 text-sm font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-text-primary"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
