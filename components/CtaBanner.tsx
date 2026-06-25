'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const BG_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&auto=format&fit=crop'

export function CtaBanner() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          border: '1px solid rgba(124,91,255,0.2)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 80px rgba(124,91,255,0.10)',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src={BG_IMAGE} alt="" fill sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover opacity-15" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(124,91,255,0.18) 0%, rgba(6,6,13,0.88) 45%, rgba(0,212,255,0.12) 100%)' }} />

        {/* Top accent line */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.6) 30%, rgba(0,212,255,0.5) 70%, transparent)' }} />

        {/* Ambient glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full opacity-25"
          style={{ background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'glowPulse 3s ease-in-out infinite' }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'glowPulse 3.5s ease-in-out infinite reverse' }} />

        {/* Content */}
        <div className="relative z-10 px-10 py-14 text-center sm:px-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">// Next Step</span>
          <h2 className="font-display mt-4 text-balance text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
            Ready to build something remarkable?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-text-secondary sm:text-base">
            {"Let's talk about your project. We'll come back with a clear plan and honest price within 24 hours."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-nebula w-full sm:w-auto">Start a Project →</Link>
            <Link href="/audit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-7 py-3.5 text-sm font-semibold text-violet transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/60 hover:bg-violet/15 sm:w-auto">
              Book a Free Audit
            </Link>
            <Link href="/portfolio"
              className="inline-flex w-full items-center justify-center rounded-full border border-border/40 bg-surface-glass px-7 py-3.5 text-sm font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-border/70 hover:text-text-primary sm:w-auto">
              View Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
