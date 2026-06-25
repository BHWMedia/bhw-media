'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const
const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }

const STATS = [
  { value: '40+', label: 'Platforms shipped' },
  { value: '99', label: 'Avg Lighthouse' },
  { value: '14d', label: 'Delivery sprint' },
  { value: '$40M+', label: 'Client revenue' },
]

const TEAM_IMAGE = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'

export function FounderSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left - r.width / 2) / r.width)
    mouseY.set((e.clientY - r.top - r.height / 2) / r.height)
  }
  const handleLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
      <div aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE }}
        className="relative overflow-hidden rounded-3xl border border-border/40"
        style={{
          background: 'linear-gradient(135deg, rgba(124,91,255,0.08) 0%, rgba(18,18,31,0.72) 50%, rgba(0,212,255,0.05) 100%)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: '0 24px 72px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Top accent line */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.5) 35%, rgba(0,212,255,0.4) 65%, transparent)' }} />

        <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-[380px_1fr]">

          {/* 3D tilt image panel */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative h-72 overflow-hidden lg:h-full lg:min-h-[480px]"
          >
            <Image
              src={TEAM_IMAGE}
              alt="BHW Media team at work"
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 0%, rgba(18,18,31,0.6) 100%)' }} />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 z-10 rounded-full border border-border/60 bg-card/90 px-3 py-1.5 backdrop-blur-md font-mono text-[9px] uppercase tracking-widest text-cyan">
              BHW Media · Global
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">// About the Founder</span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Built by engineers who obsess over pixels and milliseconds.
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-text-secondary sm:text-base">
              BHW Media was founded with a single conviction: a{' '}
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

            {/* Stat strip */}
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border/30 pt-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-bold text-gradient-nebula sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/audit" className="btn-nebula text-sm">Run Free Audit</Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary">
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
