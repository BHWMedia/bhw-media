'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { PricingSection } from '@/components/PricingSection'
import { SERVICES, type AccentColor } from '@/lib/constants'

const EASE = [0.16, 1, 0.3, 1] as const

const ICONS: Record<string, LucideIcon> = {
  Globe, LayoutDashboard, Sparkles, ShoppingBag, Zap, RefreshCw,
}

// Rich image visuals per service — using Unsplash for high-quality relevant imagery
const SERVICE_IMAGES: Record<string, string> = {
  'Web Architecture & Build':
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  'SaaS Product Design':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
  'Brand Identity Systems':
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop',
  'E-Commerce Infrastructures':
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
  'Immersive Motion Design':
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
  'Enterprise Growth Retainer':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
}

// Outcome bullets per service
const SERVICE_OUTCOMES: Record<string, string[]> = {
  'Web Architecture & Build': [
    'Guaranteed 95+ Google Lighthouse Scores',
    'Mobile-first, WCAG 2.1 AA compliant',
    'Deployed to Vercel Edge with CI/CD pipeline',
    'Complete repository & IP handover',
  ],
  'SaaS Product Design': [
    'Comprehensive Figma design system',
    'Frictionless <3 step activation flows',
    'Data-dense dashboard architecture',
    'Investor-ready interactive prototypes',
  ],
  'Brand Identity Systems': [
    'Primary & alternate SVG logo marks',
    'Full Hex/RGB/CMYK color architecture',
    'Typography pairing & scale hierarchy',
    'Comprehensive Brand Master PDF guide',
  ],
  'E-Commerce Infrastructures': [
    'Headless Next.js or Shopify Plus builds',
    'Checkout friction elimination (+18% CVR)',
    'Cinematic product page storytelling',
    'Global payment & ERP integrations',
  ],
  'Immersive Motion Design': [
    'Framer Motion scroll physics systems',
    'Hardware-accelerated kinetic typography',
    'Seamless layout projection transitions',
    'Custom SVG micro-interaction libraries',
  ],
  'Enterprise Growth Retainer': [
    'Dedicated weekly engineering sprints',
    'Real-time core web vitals monitoring',
    'Priority Slack channel (< 4hr SLA)',
    'Monthly architectural strategy calls',
  ],
}

const ACCENT_HEX: Record<AccentColor, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

// Stats shown above the fold
const HERO_STATS = [
  { value: '40+', label: 'Platforms shipped' },
  { value: '99', label: 'Avg Lighthouse' },
  { value: '14d', label: 'Sprint delivery' },
  { value: '100%', label: 'IP ownership' },
]

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const Icon = ICONS[service.icon] ?? Globe
  const reversed = index % 2 === 1
  const accent = ACCENT_HEX[service.accent]
  const outcomes = SERVICE_OUTCOMES[service.title] ?? []
  const image = SERVICE_IMAGES[service.title]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      {/* — Content column — */}
      <div className={reversed ? 'lg:order-2' : ''}>
        {/* Icon chip */}
        <div
          className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}30`,
            boxShadow: `0 0 24px ${accent}20`,
          }}
        >
          <Icon className={`h-5 w-5 ${ACCENT_TEXT[service.accent]}`} aria-hidden="true" />
        </div>

        {/* Label */}
        <p
          className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          // {String(index + 1).padStart(2, '0')} · {service.tag}
        </p>

        <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
          {service.title}
        </h2>

        <p className="mt-5 text-sm leading-[1.8] text-text-secondary sm:text-base">
          {service.body}
        </p>

        {/* Outcome bullets */}
        <ul className="mt-7 space-y-3">
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-sm text-text-secondary">
              <div
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: `${accent}20` }}
              >
                <Check
                  size={10}
                  style={{ color: accent }}
                  aria-hidden="true"
                />
              </div>
              {outcome}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, ${accent}BB 100%)`,
              boxShadow: `0 0 24px ${accent}40`,
            }}
          >
            Scope this service
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* — Visual column — */}
      <div className={reversed ? 'lg:order-1' : ''}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="group relative overflow-hidden rounded-2xl"
          style={{
            border: `1px solid ${accent}20`,
            boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px ${accent}10`,
          }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-studio">
            <Image
              src={image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(6,6,13,0.85) 0%, rgba(6,6,13,0.2) 50%, transparent 100%)`,
              }}
            />
            {/* Cinematic tagline overlay */}
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1"
                style={{ color: accent }}
              >
                {service.cinematicTagline}
              </p>
              <div
                className="h-px w-12"
                style={{ background: accent }}
              />
            </div>
          </div>

          {/* Bottom info strip */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{
              background: 'rgba(6,6,13,0.92)',
              borderTop: `1px solid ${accent}18`,
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {service.tag}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              <span className="font-mono text-[10px] text-text-ghost">Production Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-void text-text-primary pt-[68px]">

      {/* ─── Hero Section ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/20">
        {/* Ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #7C5BFF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-1/4 h-[400px] w-[400px] rounded-full opacity-[0.06]"
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

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              // Recognized Disciplines
            </span>
            <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl max-w-3xl leading-[1.05]">
              Digital craft engineered at every layer.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-text-secondary sm:text-lg">
              Each environment is production-scoped from structural primitives — optimized for
              retention, search rankings, and measurable product value. No page-builder shortcuts.
            </p>
          </motion.div>

          {/* Hero stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
          >
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute -left-3 inset-y-0 w-px hidden sm:block"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(46,46,74,0.8) 30%, rgba(46,46,74,0.8) 70%, transparent)' }}
                  />
                )}
                <p className="font-display text-3xl font-bold text-gradient-nebula sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Service Blocks ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 space-y-28 sm:space-y-36">
        {SERVICES.map((service, i) => (
          <ServiceBlock key={service.title} service={service} index={i} />
        ))}
      </section>

      {/* ─── Process Strip ─────────────────────────────────────────── */}
      <section className="border-y border-border/20 bg-elevated/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-12 max-w-xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // How we engage
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Every project, one process.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: '01', title: 'Discovery & Audit', desc: 'We analyze your market, competitors, and technical gaps. Full scope defined before a dollar is spent.' },
              { num: '02', title: 'Design & Prototype', desc: 'Pixel-perfect Figma systems. You approve how it looks, feels, and moves before we write a single line of code.' },
              { num: '03', title: 'Engineer & Deploy', desc: 'TypeScript strict mode. Next.js 16 App Router. Vercel Edge. Built fast, secure, and tested to production standards.' },
              { num: '04', title: 'Handoff & Scale', desc: 'You receive 100% of the GitHub repository, DNS keys, and all IP. No lock-in. We stay available for growth retainer.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="group relative rounded-2xl border border-border/30 bg-card/40 p-6 transition-all duration-300 hover:border-violet/30 hover:bg-card/60"
              >
                <div className="mb-4 font-mono text-2xl font-bold text-text-ghost group-hover:text-violet/30 transition-colors duration-300">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ───────────────────────────────────────────────── */}
      <PricingSection />

      {/* ─── Bottom CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border/20 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,91,255,0.08) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              // Get started
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Ready to ship something exceptional?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
              Start with a free site audit. We audit your current platform, identify the biggest
              performance and conversion gaps, and return a clear improvement roadmap — within 24 hours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/audit" className="btn-nebula w-full sm:w-auto">
                Run Free Audit →
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-card/40 px-7 py-3.5 text-sm font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:text-text-primary sm:w-auto"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
