// components/GlowCard.tsx
'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import type { AccentColor } from '@/lib/constants'

// ── Design token maps ─────────────────────────────────────────────────────────

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

const ACCENT_HEX: Record<AccentColor, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

// ── Spring configuration ──────────────────────────────────────────────────────

const TILT_SPRING = { stiffness: 280, damping: 28, mass: 0.6 }
const GLOW_SPRING = { stiffness: 180, damping: 28 }

// ── Component ─────────────────────────────────────────────────────────────────

export function GlowCard({
  icon,
  title,
  body,
  tag,
  accentColor = 'violet',
}: {
  icon: ReactNode
  title: string
  body: string
  tag: string
  accentColor?: AccentColor
}) {
  const ref = useRef<HTMLDivElement>(null)
  const accentHex = ACCENT_HEX[accentColor]

  // Raw mouse position relative to card center (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring-smoothed values for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), TILT_SPRING)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), TILT_SPRING)

  // Radial glow position — tracks mouse in percentage
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), GLOW_SPRING)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), GLOW_SPRING)

  // FIX: Reactive combining of changing MotionValues using useMotionTemplate
  const glowBackground = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, ${accentHex}18, transparent 65%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-[border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      {/* ── Radial mouse-tracked glow overlay ──────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />

      {/* ── Ambient gradient layer (always-on, subtle) ─────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-cyan/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* ── Shimmer border highlight on top edge ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${accentHex}60, transparent)`,
        }}
      />

      {/* ── Card content — lifted above glow overlays via transform-3d ──────── */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-elevated transition-shadow duration-300 group-hover:shadow-[0_0_16px_${accentHex}40] ${ACCENT_TEXT[accentColor]}`}
        >
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">{body}</p>
        <p className="font-mono text-xs tracking-wider text-text-muted">{tag}</p>
      </div>
    </motion.div>
  )
}