'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export function CtaBanner() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(124,91,255,0.15) 0%, rgba(18,18,31,0.72) 45%, rgba(0,212,255,0.10) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(124,91,255,0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 80px rgba(124,91,255,0.12), inset 0 1px 0 rgba(255,255,255,0.10)',
        }}
      >
        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.6) 30%, rgba(0,212,255,0.5) 70%, transparent)',
          }}
        />

        {/* Background ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'glowPulse 3s ease-in-out infinite' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'glowPulse 3.5s ease-in-out infinite reverse' }}
        />

        {/* Hatch texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 10px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">// Next Step</span>
          <h2 className="font-display mt-4 text-balance text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
            Ready to build something remarkable?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-text-secondary sm:text-base">
            {"Let's talk about your project. We'll come back with a clear plan and honest price within 24 hours."}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-nebula w-full sm:w-auto">
              Start a Project →
            </Link>
            <Link
              href="/audit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-7 py-3.5 text-sm font-semibold text-violet transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/60 hover:bg-violet/15 sm:w-auto"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Book a Free Audit
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex w-full items-center justify-center rounded-full border border-border/40 bg-surface-glass px-7 py-3.5 text-sm font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-border/70 hover:text-text-primary sm:w-auto"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
