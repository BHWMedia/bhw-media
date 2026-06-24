'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { SERVICES, type AccentColor } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
}

const EASE = [0.16, 1, 0.3, 1] as const

const MATERIAL: Record<AccentColor, { bg: string; border: string; glow: string }> = {
  violet: {
    bg: 'linear-gradient(135deg, rgba(124,91,255,0.13) 0%, rgba(18,18,31,0.82) 50%, rgba(0,212,255,0.07) 100%)',
    border: 'rgba(124,91,255,0.28)',
    glow: 'rgba(124,91,255,0.12)',
  },
  cyan: {
    bg: 'linear-gradient(145deg, rgba(200,200,220,0.07) 0%, rgba(18,18,31,0.88) 40%, rgba(0,212,255,0.10) 100%)',
    border: 'rgba(0,212,255,0.22)',
    glow: 'rgba(0,212,255,0.08)',
  },
  gold: {
    bg: 'linear-gradient(160deg, rgba(245,166,35,0.10) 0%, rgba(18,18,31,0.80) 45%, rgba(255,77,109,0.05) 100%)',
    border: 'rgba(245,166,35,0.24)',
    glow: 'rgba(245,166,35,0.08)',
  },
  crimson: {
    bg: 'linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(18,18,31,0.92) 60%, rgba(255,77,109,0.07) 100%)',
    border: 'rgba(255,77,109,0.22)',
    glow: 'rgba(255,77,109,0.08)',
  },
}

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

const MATERIAL_LABEL: Record<AccentColor, string> = {
  violet: 'Frosted Glass',
  cyan: 'Brushed Metal',
  gold: 'Translucent Resin',
  crimson: 'Matte Obsidian',
}

function ServiceIcon3D({ icon: Icon, accent }: { icon: LucideIcon; accent: AccentColor }) {
  return (
    <div className="relative h-14 w-14 flex-shrink-0" style={{ perspective: '400px' }}>
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-xl border border-white/8 bg-elevated/70 backdrop-blur-sm"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <Icon
          className={`h-6 w-6 ${ACCENT_TEXT[accent]}`}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICONS[service.icon] ?? Globe
  const material = MATERIAL[service.accent]

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-8 sm:p-9"
      style={{
        width: 'clamp(300px, 38vw, 680px)',
        height: 'clamp(320px, 42vh, 480px)',
        background: material.bg,
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        border: `1px solid ${hovered ? material.border : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 32px 80px rgba(0,0,0,0.55), 0 0 60px ${material.glow}, inset 0 1px 0 rgba(255,255,255,0.10)`
          : '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Ambient glow blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse, ${material.glow.replace('0.08', '0.35')} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Card number ghost */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-4 select-none font-display font-bold leading-none transition-opacity duration-500"
        style={{
          fontSize: 'clamp(80px, 12vw, 160px)',
          color: hovered ? `${material.border.replace('0.28', '0.08')}` : 'rgba(255,255,255,0.025)',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${ACCENT_TEXT[service.accent]}`}>
            // {String(index + 1).padStart(2, '0')} · {MATERIAL_LABEL[service.accent]}
          </span>
          <h3 className="font-display mt-3 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            {service.title}
          </h3>
        </div>
        <ServiceIcon3D icon={Icon} accent={service.accent} />
      </div>

      {/* Body */}
      <p className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-text-secondary sm:text-base">
        {service.body}
      </p>

      {/* Footer row */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-border/50 bg-surface-glass px-3.5 py-1 font-mono text-[10px] text-text-muted">
          {service.tag}
        </span>
        <Link
          href="/audit"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${ACCENT_TEXT[service.accent]} hover:gap-3`}
        >
          Scope this service
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.article>
  )
}

export function HorizontalServicesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rawX = useTransform(scrollYProgress, [0.05, 0.85], ['4%', '-75%'])
  const x = useSpring(rawX, { stiffness: 70, damping: 28, mass: 0.8 })
  const progressScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left_30%,rgba(0,212,255,0.05)_0%,transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right_70%,rgba(124,91,255,0.05)_0%,transparent_55%)]"
        />

        {/* Section header */}
        <div className="mx-auto mb-8 w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // Disciplines
            </span>
            <div className="mt-3 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Scroll to traverse our stack.
              </h2>
              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-text-ghost sm:block">
                {SERVICES.length} services →
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-5 px-6 will-change-transform md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-8 w-full max-w-6xl px-6">
          <div className="h-px w-full overflow-hidden rounded-full bg-border/30">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-violet via-cyan to-gold"
              style={{
                scaleX: progressScale,
                transformOrigin: 'left center',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
