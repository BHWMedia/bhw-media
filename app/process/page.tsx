'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Zap, Shield, Users, TrendingUp } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const PHASES = [
  {
    num: '01',
    title: 'Discovery & Architecture Audit',
    duration: 'Days 1–2',
    accent: '#7C5BFF',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    description: 'We dismantle your current digital position. Competitor analysis, technical debt mapping, conversion gap identification, and a full performance baseline before a single pixel is moved.',
    deliverables: [
      'Full competitor UX benchmark report',
      'Technical debt & performance baseline',
      'Conversion funnel gap analysis',
      'Project scope & technical specification',
    ],
    icon: Shield,
  },
  {
    num: '02',
    title: 'High-Fidelity System Design',
    duration: 'Days 3–6',
    accent: '#00D4FF',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop',
    description: 'Every interaction, transition, and component visualized before code. Full Figma design system with motion prototypes. You approve every detail — zero surprises on handoff.',
    deliverables: [
      'Complete Figma design system',
      'Interactive motion prototypes',
      'Responsive breakpoint architecture',
      'Design token documentation',
    ],
    icon: Zap,
  },
  {
    num: '03',
    title: 'Production Engineering',
    duration: 'Days 7–12',
    accent: '#F5A623',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop',
    description: 'TypeScript strict mode. Next.js 16 App Router. Framer Motion physics. Hardware-accelerated animations at 60fps. Every component performance-tested against Lighthouse CI before merge.',
    deliverables: [
      'Full Next.js production codebase',
      'Lighthouse CI enforced on every merge',
      'Accessibility audit (WCAG 2.1 AA)',
      'Cross-browser QA verification',
    ],
    icon: TrendingUp,
  },
  {
    num: '04',
    title: 'Launch & IP Handover',
    duration: 'Days 13–14',
    accent: '#FF4D6D',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    description: 'Zero-downtime DNS migration. Full Vercel Edge deployment with global CDN. You receive 100% of the repository, all credentials, and full IP ownership. No vendor lock-in. Ever.',
    deliverables: [
      'Live Vercel Edge deployment',
      'Complete GitHub repository transfer',
      'DNS & infrastructure documentation',
      '30-day post-launch support window',
    ],
    icon: Users,
  },
]

const GUARANTEES = [
  { icon: Clock, title: '14-Day Sprint', desc: 'From signed brief to live production in 14 business days or we extend at no cost.' },
  { icon: Shield, title: '100% IP Ownership', desc: 'Every line of code belongs to you from day one. No licensing, no lock-in.' },
  { icon: CheckCircle, title: '99+ Lighthouse Guaranteed', desc: 'We enforce performance scores via CI/CD. Sub-standard builds do not ship.' },
  { icon: TrendingUp, title: 'Revenue-Focused Builds', desc: 'Every design decision is mapped to a conversion or retention metric.' },
]

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="relative h-72 overflow-hidden rounded-2xl sm:h-80 lg:h-full lg:min-h-[480px]">
      <motion.div style={{ y }} className="absolute inset-[-10%] h-[120%]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/40 to-transparent" />
    </div>
  )
}

function PhaseCard({ phase, index }: { phase: typeof PHASES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const reversed = index % 2 === 1
  const Icon = phase.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Content */}
      <div className={reversed ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: `${phase.accent}18`, border: `1px solid ${phase.accent}30` }}
          >
            <Icon size={20} style={{ color: phase.accent }} />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: phase.accent }}>
              Phase {phase.num}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-text-ghost">{phase.duration}</p>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {phase.title}
        </h2>
        <p className="mt-4 text-sm leading-[1.85] text-text-secondary sm:text-base">
          {phase.description}
        </p>

        <ul className="mt-7 space-y-3">
          {phase.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-sm text-text-secondary">
              <div
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: `${phase.accent}20` }}
              >
                <CheckCircle size={10} style={{ color: phase.accent }} />
              </div>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className={reversed ? 'lg:order-1' : ''}>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          style={{
            boxShadow: hovered
              ? `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${phase.accent}25`
              : '0 16px 48px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.5s ease',
          }}
          className="overflow-hidden rounded-2xl"
        >
          <ParallaxImage src={phase.image} alt={phase.title} />
          {/* Phase number watermark */}
          <div
            className="absolute right-5 bottom-4 pointer-events-none select-none font-display font-black leading-none"
            style={{ fontSize: 'clamp(80px, 12vw, 160px)', color: `${phase.accent}12`, lineHeight: 1 }}
            aria-hidden="true"
          >
            {phase.num}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-void text-text-primary pt-[68px]">

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse, #7C5BFF 0%, transparent 70%)', filter: 'blur(90px)' }} />
        <div aria-hidden="true" className="pointer-events-none absolute top-0 right-1/4 h-[380px] w-[380px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse, #00D4FF 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">// How We Build</span>
            <h1 className="font-display mt-4 font-bold tracking-tight text-text-primary" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', lineHeight: 1.05 }}>
              14 days. Zero compromises.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-text-secondary">
              Every BHW Media engagement follows one repeatable, battle-tested system. Four phases. Fourteen days. Guaranteed 99+ Lighthouse on delivery.
            </p>
          </motion.div>

          {/* Timeline strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="mt-12 flex flex-wrap gap-3">
            {PHASES.map((p, i) => (
              <div key={p.num} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                  style={{ background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}30` }}>
                  {p.num}
                </span>
                <span className="font-mono text-[10px] text-text-muted">{p.title.split(' ')[0]}</span>
                {i < PHASES.length - 1 && <span className="text-text-ghost mx-1">→</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Phase blocks ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 space-y-28 sm:space-y-36">
        {PHASES.map((phase, i) => (
          <PhaseCard key={phase.num} phase={phase} index={i} />
        ))}
      </section>

      {/* ─── Guarantees grid ───────────────────────────────────────── */}
      <section className="border-y border-border/20 bg-elevated/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, ease: EASE }} className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">// Our Guarantees</span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Every engagement. Non-negotiable.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g, i) => {
              const Icon = g.icon
              return (
                <motion.div key={g.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                  className="group rounded-2xl border border-border/30 bg-card/40 p-6 transition-all duration-300 hover:border-violet/30 hover:-translate-y-1">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 border border-violet/20">
                    <Icon size={18} className="text-violet" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{g.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{g.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,91,255,0.08) 0%, transparent 65%)' }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: EASE }}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">// Ready to start</span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Start your 14-day sprint.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
              Free site audit first. We diagnose exactly what's costing you conversions, then scope the build that fixes it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/audit" className="btn-nebula w-full sm:w-auto">
                Run Free Audit <ArrowRight size={14} />
              </Link>
              <Link href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-card/40 px-7 py-3.5 text-sm font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-text-primary sm:w-auto">
                Talk to a human →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
