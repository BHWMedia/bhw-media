'use client'

import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  MotionValue,
} from 'framer-motion'
import { useRef, useCallback, useEffect, useState } from 'react'
import { AmbientParticleSystem } from '@/components/AmbientParticleSystem'

const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }
const EASE = [0.16, 1, 0.3, 1] as const

const HEADLINE_WORDS = [
  { text: 'Web', from: { x: -80, y: 40, opacity: 0 }, accent: false },
  { text: 'Design', from: { x: 60, y: -30, opacity: 0 }, accent: true },
  { text: 'Agency', from: { x: -40, y: 60, opacity: 0 }, accent: false },
  { text: 'That', from: { x: 90, y: 20, opacity: 0 }, accent: false },
  { text: 'Dominates.', from: { x: 0, y: 80, opacity: 0 }, accent: true },
]

const FLOATING_METRICS = [
  { label: 'Lighthouse', value: '98', suffix: '', z: 20, delay: 0.9 },
  { label: 'Delivery', value: '14', suffix: ' Days', z: 50, delay: 1.1 },
  { label: 'Clients', value: '40', suffix: '+', z: 80, delay: 1.3 },
]

const TRUST_SIGNALS = [
  'Trusted by 40+ Global Brands',
  'Avg. Delivery Pipeline: 14 Days',
  '100% Source Code Ownership',
]

function WarpingCharacter({
  char,
  mouseX,
  mouseY,
  isReducedMotion,
}: {
  char: string
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isReducedMotion: boolean | null
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, STEADICAM)
  const springY = useSpring(y, STEADICAM)

  useEffect(() => {
    if (isReducedMotion) {
      x.set(0)
      y.set(0)
      return
    }

    const container = ref.current?.closest('section')
    if (!container || !ref.current) return

    const update = () => {
      if (isReducedMotion) return
      const rect = ref.current!.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const charCenterX = rect.left + rect.width / 2 - containerRect.left
      const charCenterY = rect.top + rect.height / 2 - containerRect.top

      const dx = mouseX.get() - charCenterX
      const dy = mouseY.get() - charCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const maxDistance = 160
      if (distance < maxDistance) {
        const power = (1 - distance / maxDistance) * 18
        x.set((dx / distance) * -power)
        y.set((dy / distance) * -power)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const unsubX = mouseX.on('change', update)
    const unsubY = mouseY.on('change', update)

    return () => {
      unsubX()
      unsubY()
    }
  }, [isReducedMotion, mouseX, mouseY])

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block transition-shadow duration-200"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

function FluidMeshBackground({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useSpring>
  mouseY: ReturnType<typeof useSpring>
}) {
  const mesh1 = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle 700px at ${x}px ${y}px, rgba(124,91,255,0.18), transparent 65%)`,
  )
  const mesh2 = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle 520px at ${Number(x) + 140}px ${Number(y) - 90}px, rgba(0,212,255,0.11), transparent 60%)`,
  )
  const mesh3 = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle 440px at ${Number(x) - 110}px ${Number(y) + 70}px, rgba(245,166,35,0.06), transparent 55%)`,
  )

  return (
    <>
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: mesh1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: mesh2 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: mesh3 }}
        aria-hidden="true"
      />
    </>
  )
}

function KineticWord({
  text,
  from,
  accent,
  index,
  mouseX,
  mouseY,
  isReducedMotion,
}: {
  text: string
  from: { x: number; y: number; opacity: number }
  accent: boolean
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isReducedMotion: boolean | null
}) {
  const chars = text.split('')

  return (
    <motion.span
      className={`inline-block mr-[0.18em] last:mr-0 cursor-default select-none ${
        accent ? 'text-gradient-cosmic' : 'text-text-primary'
      }`}
      initial={from}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.85, ease: EASE }}
      whileHover={{
        y: -3,
        filter: accent
          ? 'drop-shadow(0 0 20px rgba(124,91,255,0.6)) drop-shadow(0 0 40px rgba(0,212,255,0.3))'
          : 'drop-shadow(0 0 16px rgba(255,255,255,0.25))',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      {chars.map((char, i) => (
        <WarpingCharacter
          key={i}
          char={char}
          mouseX={mouseX}
          mouseY={mouseY}
          isReducedMotion={isReducedMotion}
        />
      ))}
    </motion.span>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(500)
  const mouseY = useMotionValue(400)
  const springX = useSpring(mouseX, { stiffness: 28, damping: 38, mass: 1.2 })
  const springY = useSpring(mouseY, { stiffness: 28, damping: 38, mass: 1.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const scrollParallax = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect
        mouseX.set(width / 2)
        mouseY.set(height / 2)
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [mouseX, mouseY])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || isReducedMotion) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY, isReducedMotion],
  )

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-void"
      onMouseMove={handleMouseMove}
    >
      {/* Noise texture overlay */}
      <div aria-hidden="true" className="absolute inset-0 noise-texture opacity-30" />

      {/* Dynamic fluid mesh following cursor */}
      {!isReducedMotion && <FluidMeshBackground mouseX={springX} mouseY={springY} />}

      {/* Ambient particles */}
      <AmbientParticleSystem count={isReducedMotion ? 0 : 22} />

      {/* Subtle grid overlay with radial mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at center, black 20%, transparent 75%)',
        }}
      />

      {/* Static ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,91,255,1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: isReducedMotion ? 'none' : 'driftX 14s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 bottom-1/3 h-[380px] w-[380px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,212,255,1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: isReducedMotion ? 'none' : 'driftY 11s ease-in-out infinite reverse',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:py-0"
        style={{ perspective: '1400px' }}
      >
        <motion.div
          style={{ y: scrollParallax, opacity: scrollOpacity }}
          className="relative lg:max-w-4xl"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan/25 bg-cyan/8 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Premium Web Architecture · 2026
            </span>
          </motion.div>

          {/* Main headline — kinetic word entrance */}
          <h1
            className="font-display font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <KineticWord
                key={word.text}
                {...word}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                isReducedMotion={isReducedMotion}
              />
            ))}
          </h1>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.75, ease: EASE }}
            className="mt-7 max-w-xl text-base font-light leading-[1.75] text-text-secondary lg:text-lg"
          >
            BHW Media is a premium{' '}
            <strong className="font-medium text-text-primary">web design agency</strong> specializing
            in cinematic{' '}
            <strong className="font-medium text-text-primary">Next.js development</strong> for SaaS,
            e-commerce, and brand platforms — engineered for 99+ Lighthouse scores and conversion-first UX.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/audit" className="btn-nebula w-full sm:w-auto">
              Run Free Performance Audit
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-glass px-7 py-3.5 text-sm font-semibold text-text-secondary backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan sm:w-auto"
            >
              Explore Case Studies
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-border/40 pt-7"
          >
            {TRUST_SIGNALS.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 font-mono text-[11px] text-text-muted"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-violet flex-shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating metric cards — right side, desktop only */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex" aria-hidden="true">
          {FLOATING_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: m.delay, duration: 0.8, ease: EASE }}
              className="glass-metric-card w-36 rounded-2xl p-4"
              style={{
                transform: `translateZ(${m.z}px)`,
                animation: isReducedMotion ? 'none' : `float ${5 + i * 1.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan">{m.label}</p>
              <p className="font-display mt-1 text-3xl font-bold text-text-primary">
                {m.value}
                {m.suffix && <span className="text-base text-violet ml-0.5">{m.suffix}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={isReducedMotion ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: scrollOpacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-ghost">Scroll</span>
          <div className="h-9 w-5 rounded-full border border-border/50 p-1">
            <motion.div
              className="mx-auto h-1.5 w-0.5 rounded-full bg-cyan"
              animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
