'use client'

import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'

// ─── Steadicam Physics — RED cinema body on a fluid-head tripod ──────────────
const STEADICAM_SPRING = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }
const EASE = [0.16, 1, 0.3, 1] as const

// ─── Blueprint Schema ──────────────────────────────────────────────────────
type BlueprintId = 'saas' | 'brand' | 'ecommerce'

interface CodeLine {
  indent: number
  content: string
  accent?: 'violet' | 'cyan' | 'gold' | 'crimson' | 'muted'
}

interface WireframeNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  z: number
  label: string
}

interface Blueprint {
  id: BlueprintId
  label: string
  fileName: string
  accentColor: string
  glowColor: string
  codeLines: CodeLine[]
  wireframe: WireframeNode[]
}

const BLUEPRINTS: Blueprint[] = [
  {
    id: 'saas',
    label: 'SaaS',
    fileName: 'dashboard.engine.tsx',
    accentColor: '#00D4FF',
    glowColor: 'rgba(0, 212, 255, 0.35)',
    codeLines: [
      { indent: 0, content: "import { Engine } from '@bhw/core'", accent: 'muted' },
      { indent: 0, content: '' },
      { indent: 0, content: 'export function ActivationFlow() {', accent: 'cyan' },
      { indent: 1, content: 'const [step, advance] = useStep(3)' },
      { indent: 1, content: 'const retention = useTelemetry()' },
      { indent: 1, content: '' },
      { indent: 1, content: 'return (', accent: 'cyan' },
      { indent: 2, content: '<Onboarding friction={0} />' },
      { indent: 2, content: '<Dashboard density="data-rich" />' },
      { indent: 1, content: ')' },
      { indent: 0, content: '}', accent: 'cyan' },
    ],
    wireframe: [
      { id: 'nav', x: 6, y: 6, w: 88, h: 10, z: 10, label: 'NAV' },
      { id: 'side', x: 6, y: 20, w: 22, h: 64, z: 30, label: 'SIDEBAR' },
      { id: 'kpi1', x: 32, y: 20, w: 19, h: 22, z: 50, label: 'KPI' },
      { id: 'kpi2', x: 53, y: 20, w: 19, h: 22, z: 50, label: 'KPI' },
      { id: 'kpi3', x: 74, y: 20, w: 20, h: 22, z: 50, label: 'KPI' },
      { id: 'chart', x: 32, y: 46, w: 62, h: 38, z: 60, label: 'ANALYTICS' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    fileName: 'identity.system.tsx',
    accentColor: '#F5A623',
    glowColor: 'rgba(245, 166, 35, 0.35)',
    codeLines: [
      { indent: 0, content: "import { Tokens } from '@bhw/identity'", accent: 'muted' },
      { indent: 0, content: '' },
      { indent: 0, content: 'export const BrandSystem = {', accent: 'gold' },
      { indent: 1, content: "mark: 'primary | alternate | mono'" },
      { indent: 1, content: 'palette: generateScale(seed)' },
      { indent: 1, content: 'type: pairing(display, body)' },
      { indent: 1, content: '' },
      { indent: 1, content: 'authority: MAX', accent: 'gold' },
      { indent: 0, content: '}', accent: 'gold' },
    ],
    wireframe: [
      { id: 'mark', x: 32, y: 10, w: 36, h: 36, z: 60, label: 'LOGOMARK' },
      { id: 'sw1', x: 10, y: 54, w: 14, h: 14, z: 40, label: '' },
      { id: 'sw2', x: 26, y: 54, w: 14, h: 14, z: 40, label: '' },
      { id: 'sw3', x: 42, y: 54, w: 14, h: 14, z: 40, label: '' },
      { id: 'sw4', x: 58, y: 54, w: 14, h: 14, z: 40, label: '' },
      { id: 'sw5', x: 74, y: 54, w: 14, h: 14, z: 40, label: '' },
      { id: 'type', x: 10, y: 74, w: 80, h: 18, z: 30, label: 'TYPOGRAPHY' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    fileName: 'checkout.flow.tsx',
    accentColor: '#7C5BFF',
    glowColor: 'rgba(124, 91, 255, 0.35)',
    codeLines: [
      { indent: 0, content: "import { Cart } from '@bhw/commerce'", accent: 'muted' },
      { indent: 0, content: '' },
      { indent: 0, content: 'export function Checkout() {', accent: 'violet' },
      { indent: 1, content: 'const friction = eliminate(steps)' },
      { indent: 1, content: 'const cart = useCart()' },
      { indent: 1, content: '' },
      { indent: 1, content: 'return (', accent: 'violet' },
      { indent: 2, content: '<ProductHero cinematic />' },
      { indent: 2, content: '<Cart.Drawer friction={friction} />' },
      { indent: 1, content: ')' },
      { indent: 0, content: '}', accent: 'violet' },
    ],
    wireframe: [
      { id: 'nav', x: 6, y: 6, w: 88, h: 10, z: 10, label: 'NAV' },
      { id: 'product', x: 6, y: 20, w: 50, h: 64, z: 40, label: 'PRODUCT' },
      { id: 'price', x: 60, y: 20, w: 34, h: 16, z: 50, label: 'PRICE' },
      { id: 'qty', x: 60, y: 40, w: 34, h: 12, z: 50, label: 'QTY' },
      { id: 'cta', x: 60, y: 56, w: 34, h: 14, z: 60, label: 'ADD TO CART' },
      { id: 'trust', x: 60, y: 74, w: 34, h: 10, z: 30, label: 'TRUST' },
    ],
  },
]

const CODE_LINE_INTERVAL_MS = 140
const WIREFRAME_NODE_INTERVAL_MS = 90

// ─── Terminal Chrome Header ────────────────────────────────────────────────
function TerminalHeader({ fileName, accentColor }: { fileName: string; accentColor: string }) {
  return (
    <div
      className="flex h-[42px] items-center gap-3 px-4 relative z-30 backdrop-blur-md bg-zinc-950/95"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center gap-[6px]">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57] border border-[#FF5F57]/50" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#FFBD2E]/50" />
        <span className="h-3 w-3 rounded-full bg-[#28C840] border border-[#28C840]/50" />
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-md px-3 py-1.5 bg-black/40 border border-white/5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A7A94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span className="truncate font-mono text-[11px] text-white/60 tracking-wider">
          {fileName}
        </span>
        <span
          className="ml-auto h-1.5 w-1.5 rounded-full flex-shrink-0 animate-pulse"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  )
}

// ─── Cascading Code Stream ─────────────────────────────────────────────────
const ACCENT_TEXT_MAP: Record<NonNullable<CodeLine['accent']>, string> = {
  violet: 'text-violet-400',
  cyan: 'text-cyan-400',
  gold: 'text-amber-400',
  crimson: 'text-red-400',
  muted: 'text-zinc-500',
}

function CodeStream({ blueprint }: { blueprint: Blueprint }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setVisibleCount(i)
      if (i >= blueprint.codeLines.length) clearInterval(interval)
    }, CODE_LINE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [blueprint])

  return (
    <div className="font-mono text-[12px] leading-relaxed">
      <AnimatePresence mode="wait">
        <div key={blueprint.id}>
          {blueprint.codeLines.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`${blueprint.id}-${i}`}
              initial={{ opacity: 0, x: -8, filter: 'blur(3px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex gap-3"
            >
              <span className="select-none text-zinc-600 flex-shrink-0 w-5 text-right">
                {i + 1}
              </span>
              <span
                className={line.accent ? ACCENT_TEXT_MAP[line.accent] : 'text-zinc-300'}
                style={{ paddingLeft: `${line.indent * 16}px` }}
              >
                {line.content || '\u00A0'}
                {i === visibleCount - 1 && (
                  <motion.span
                    className="inline-block w-[6px] h-[13px] ml-0.5 align-middle"
                    style={{ backgroundColor: blueprint.accentColor }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

// ─── 3D Wireframe Construct ────────────────────────────────────────────────
function WireframeConstruct({ blueprint }: { blueprint: Blueprint }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setVisibleCount(i)
      if (i >= blueprint.wireframe.length) clearInterval(interval)
    }, WIREFRAME_NODE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [blueprint])

  return (
    <div
      className="relative h-full w-full"
      style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
    >
      {blueprint.wireframe.slice(0, visibleCount).map((node) => (
        <motion.div
          key={`${blueprint.id}-${node.id}`}
          className="absolute rounded-md border flex items-center justify-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.w}%`,
            height: `${node.h}%`,
            borderColor: `${blueprint.accentColor}50`,
            backgroundColor: `${blueprint.accentColor}0C`,
            boxShadow: `0 0 24px -4px ${blueprint.glowColor}`,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.85, z: -40 }}
          animate={{
            opacity: 1,
            scale: 1,
            z: node.z,
            transform: `translateZ(${node.z}px)`,
          }}
          transition={STEADICAM_SPRING}
        >
          {node.label && (
            <span
              className="font-mono text-[8px] uppercase tracking-[0.2em] select-none"
              style={{ color: `${blueprint.accentColor}A0` }}
            >
              {node.label}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// ─── Blueprint Selector Pills ──────────────────────────────────────────────
function BlueprintSelector({
  active,
  onSelect,
}: {
  active: BlueprintId
  onSelect: (id: BlueprintId) => void
}) {
  return (
    <div role="tablist" className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
      <span className="px-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 select-none hidden sm:inline">
        Select Blueprint
      </span>
      {BLUEPRINTS.map((bp) => {
        const isActive = active === bp.id
        return (
          <motion.button
            key={bp.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onSelect(bp.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={STEADICAM_SPRING}
            className="relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300"
            style={{ color: isActive ? '#FFFFFF' : '#7A7A94' }}
          >
            {isActive && (
              <motion.span
                layoutId="blueprint-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: `${bp.accentColor}20`,
                  border: `1px solid ${bp.accentColor}80`,
                  boxShadow: `0 0 18px ${bp.glowColor}`,
                }}
                transition={STEADICAM_SPRING}
              />
            )}
            <span className="relative z-10">{bp.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Engine Core Sandbox Panel ─────────────────────────────────────────────
function EngineCorePanel({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl relative border border-white/10 bg-zinc-950"
      style={{
        boxShadow: `0 40px 100px -10px rgba(0,0,0,0.8), 0 0 80px ${blueprint.glowColor}`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10 z-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-40 mix-blend-overlay" />

      <TerminalHeader fileName={blueprint.fileName} accentColor={blueprint.accentColor} />

      <div className="grid grid-cols-1 sm:grid-cols-2 h-[380px]">
        {/* Left: cascading code stream */}
        <div className="relative overflow-hidden bg-black/60 p-5 border-r border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={blueprint.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CodeStream blueprint={blueprint} />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Right: 3D wireframe construct */}
        <div className="relative overflow-hidden bg-[#050508] p-5 hidden sm:block">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={blueprint.id}
              className="relative h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <WireframeConstruct blueprint={blueprint} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-5 py-3 relative z-30"
        style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center gap-2"
          style={{ color: blueprint.accentColor }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: blueprint.accentColor }} />
          {blueprint.label} Blueprint Compiling
        </span>
        <span className="font-mono text-[10px] text-white/40 tracking-widest bg-white/5 px-2 py-1 rounded">
          LIVE BUILD
        </span>
      </div>
    </div>
  )
}

// ─── Trust Signals ─────────────────────────────────────────────────────────
const TRUST_SIGNALS = [
  'Trusted by 40+ Global Brands',
  'Avg. Delivery Pipeline: 14 Days',
  '100% Source Code Ownership',
]

// ─── Master Hero Section ───────────────────────────────────────────────────
export function HeroSection() {
  const [activeId, setActiveId] = useState<BlueprintId>('saas')
  const containerRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({ width: 1000, height: 800 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Mapping mouse coordinates safely to standard parameters
  const rotateX = useTransform(springY, [0, bounds.height], [6, -6])
  const rotateY = useTransform(springX, [0, bounds.width], [-6, 6])
  
  const backgroundBg = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle 900px at ${x}px ${y}px, rgba(124, 91, 255, 0.15), rgba(0, 212, 255, 0.08) 30%, transparent 60%)`
  )

  const activeBlueprint = BLUEPRINTS.find((b) => b.id === activeId) ?? BLUEPRINTS[0]

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBounds({
          width: entry.contentRect.width || 1000,
          height: entry.contentRect.height || 800
        })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return
      const { left, top } = containerRef.current.getBoundingClientRect()
      mouseX.set(event.clientX - left)
      mouseY.set(event.clientY - top)
    },
    [mouseX, mouseY],
  )

  const handleSelect = useCallback((id: BlueprintId) => {
    setActiveId(id)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic lighting layer — fixed custom layout issue with transformation binding */}
      <motion.div
        className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{ background: backgroundBg }}
      />

      {/* Engineering grid mesh */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">

          {/* ── Left: Master Copy ── */}
          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                Premium Web Architecture
              </span>
            </motion.div>

            <h1
              className="mt-8 font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 76px)' }}
            >
              <span className="block">We Build Platforms</span>
              <span className="block mt-2 bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                That Dominate.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-300 font-light"
            >
              Select a blueprint below and watch the engine compile a live architecture in real time — the exact engineering process behind every production deployment.
            </motion.p>

            {/* Blueprint selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
              className="mt-8"
            >
              <BlueprintSelector active={activeId} onSelect={handleSelect} />
            </motion.div>

            {/* Conversion funnel — strict routing to /audit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/audit"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-purple-600 to-purple-800 px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(124,91,255,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(124,91,255,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10" aria-hidden="true">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span className="relative z-10">Run Performance Audit</span>
              </Link>

              <Link
                href="/audit?flow=portfolio"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                Explore Case Studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/10"
            >
              {TRUST_SIGNALS.map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-sm font-mono text-zinc-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C5BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Engine Core Sandbox ── */}
          <div
            className="relative w-full"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full"
            >
              {/* Ambient glow keyed to active blueprint accent */}
              <motion.div
                className="absolute inset-0 -inset-y-12 z-0 pointer-events-none rounded-full"
                style={{
                  transform: 'translateZ(-50px)',
                  background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${activeBlueprint.glowColor} 0%, rgba(6, 6, 13, 0.4) 55%, transparent 80%)`,
                  filter: 'blur(64px) saturate(180%)',
                }}
                animate={{ opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: EASE }}
                className="relative z-10 w-full"
                style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <EngineCorePanel blueprint={activeBlueprint} />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}