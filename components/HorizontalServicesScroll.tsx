'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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
  Globe, LayoutDashboard, Sparkles, ShoppingBag, Zap, RefreshCw,
}

const EASE = [0.16, 1, 0.3, 1] as const

const MATERIAL: Record<AccentColor, { bg: string; border: string; glow: string }> = {
  violet: {
    bg: 'linear-gradient(135deg, rgba(124,91,255,0.14) 0%, rgba(18,18,31,0.85) 55%, rgba(0,212,255,0.07) 100%)',
    border: 'rgba(124,91,255,0.32)',
    glow: 'rgba(124,91,255,0.22)',
  },
  cyan: {
    bg: 'linear-gradient(145deg, rgba(200,200,220,0.07) 0%, rgba(18,18,31,0.88) 40%, rgba(0,212,255,0.11) 100%)',
    border: 'rgba(0,212,255,0.26)',
    glow: 'rgba(0,212,255,0.18)',
  },
  gold: {
    bg: 'linear-gradient(160deg, rgba(245,166,35,0.11) 0%, rgba(18,18,31,0.82) 48%, rgba(255,77,109,0.05) 100%)',
    border: 'rgba(245,166,35,0.28)',
    glow: 'rgba(245,166,35,0.18)',
  },
  crimson: {
    bg: 'linear-gradient(135deg, rgba(30,30,40,0.96) 0%, rgba(18,18,31,0.92) 60%, rgba(255,77,109,0.08) 100%)',
    border: 'rgba(255,77,109,0.26)',
    glow: 'rgba(255,77,109,0.16)',
  },
}

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet', cyan: 'text-cyan', gold: 'text-gold', crimson: 'text-crimson',
}

const MATERIAL_LABEL: Record<AccentColor, string> = {
  violet: 'Frosted Glass', cyan: 'Brushed Metal', gold: 'Translucent Resin', crimson: 'Matte Obsidian',
}

function ServiceIcon3D({ icon: Icon, accent }: { icon: LucideIcon; accent: AccentColor }) {
  return (
    <div className="relative h-12 w-12 flex-shrink-0" style={{ perspective: '400px' }}>
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-xl border border-white/8 bg-elevated/70"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <Icon className={`h-5 w-5 ${ACCENT_TEXT[accent]}`} aria-hidden="true" />
      </motion.div>
    </div>
  )
}

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // 3D tilt on mouse move
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const Icon = ICONS[service.icon] ?? Globe
  const m = MATERIAL[service.accent]

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        background: m.bg,
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        border: `1px solid ${hovered ? m.border : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 50px ${m.glow}, inset 0 1px 0 rgba(255,255,255,0.10)`
          : '0 10px 36px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 h-full"
    >
      {/* Ambient glow blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${m.glow} 0%, transparent 70%)`,
          filter: 'blur(32px)',
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Ghost index number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-2 select-none font-display font-bold leading-none"
        style={{
          fontSize: 'clamp(60px, 8vw, 110px)',
          color: 'rgba(255,255,255,0.022)',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <span className={`font-mono text-[9px] uppercase tracking-[0.22em] ${ACCENT_TEXT[service.accent]}`}>
            // {String(index + 1).padStart(2, '0')} · {MATERIAL_LABEL[service.accent]}
          </span>
          <h3 className="font-display mt-2.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
            {service.title}
          </h3>
        </div>
        <ServiceIcon3D icon={Icon} accent={service.accent} />
      </div>

      {/* Body */}
      <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {service.body}
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2.5">
        <span className="rounded-full border border-border/40 bg-surface-glass px-3 py-1 font-mono text-[9px] text-text-muted">
          {service.tag}
        </span>
        <Link
          href="/audit"
          className={`inline-flex items-center gap-1 text-xs font-semibold transition-all duration-300 ${ACCENT_TEXT[service.accent]} hover:gap-2`}
        >
          Scope this <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.article>
  )
}

export function HorizontalServicesScroll() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-12"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // Disciplines
        </span>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Six specialisms. One standard.
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-ghost">
            {SERVICES.length} services
          </span>
        </div>
      </motion.div>

      {/* 3 + 3 grid — no sticky scroll, no blank void */}
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: '1200px' }}
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
