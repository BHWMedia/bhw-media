'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  description: string
  category: string
  color: string
  liveUrl?: string
  image?: string
  mockupType?: string
  tags?: string[]
  aspectRatio: string
  letterboxEnabled: boolean
  cinematicTagline: string
  iridescentVariant: string
}

interface PortfolioCardProps {
  item: PortfolioItem
  /**
   * Fires the shared warp sequence owned by PortfolioGrid. This is a
   * distinct trigger from "View Case Study" — clicking it does NOT route to
   * /portfolio/[slug]. It hands the slug up so the grid can push
   * /audit?ref={slug} once its hyperspace exit animation completes.
   * Optional so PortfolioCard still renders standalone (e.g. in storybook-
   * style usage) without requiring a grid parent.
   */
  onAuditWarp?: (slug: string) => void
}

const COLOR_THEMES: Record<string, { border: string; bg: string; text: string; glow: string; rawHex: string }> = {
  violet: { border: 'border-purple-900/40', bg: 'bg-purple-950/10', text: 'text-[#7C5BFF]', glow: 'rgba(124,91,255,0.15)', rawHex: '#7C5BFF' },
  cyan: { border: 'border-cyan-900/40', bg: 'bg-cyan-950/10', text: 'text-[#00D4FF]', glow: 'rgba(0,212,255,0.15)', rawHex: '#00D4FF' },
  gold: { border: 'border-amber-900/40', bg: 'bg-amber-950/10', text: 'text-[#F5A623]', glow: 'rgba(245,166,35,0.15)', rawHex: '#F5A623' },
  crimson: { border: 'border-rose-900/40', bg: 'bg-rose-950/10', text: 'text-[#FF4D6D]', glow: 'rgba(255,77,109,0.15)', rawHex: '#FF4D6D' },
}

// Non-negotiable Steadicam Mechanical Camera Calibration Curve — used only for
// discrete state transitions (hover, hardware bezel scale). The continuous
// scroll-to-depth mapping below intentionally uses raw useTransform instead,
// since a spring would lag behind the scrollbar and break the 1:1 tunnel feel.
const STEADICAM_PHYSICS = { mass: 3, stiffness: 45, damping: 25 } as const

// ── Inline Audit Trigger Glyph — crosshair/target, distinct from the
// case-study arrow icon so the two affordances never read as the same action.
function AuditTriggerIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.2" />
      <line x1="12" y1="1.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22.5" y2="12" />
    </svg>
  )
}

export function PortfolioCard({ item, onAuditWarp }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const theme = COLOR_THEMES[item.color] ?? COLOR_THEMES.violet

  // ── Z-Axis Tunnel: per-card scroll tracking ──────────────────────────────
  // Each card owns its own scroll progress, measured against its own
  // entrance/exit through the viewport — not a shared parent value. This is
  // what makes cards feel like they're individually drifting through 3D
  // space rather than all moving in lockstep with the page.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // 'start end'  -> progress 0 the instant the card's top crosses the
    //                  viewport's bottom edge (card is fully below, entering)
    // 'end start'  -> progress 1 the instant the card's bottom crosses the
    //                  viewport's top edge (card is fully above, exiting)
    offset: ['start end', 'end start'],
  })

  // Depth curve: card pushes toward camera (z rises, scale grows slightly)
  // as it crosses the center band of the viewport, then recedes on exit.
  // 0   -> below viewport, far away, transparent
  // 0.5 -> dead center, full depth pull, fully sharp
  // 1   -> above viewport, far away, dissolving
  const tunnelZ = useTransform(scrollYProgress, [0, 0.5, 1], [-260, 70, -220])
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.88, 1], [0, 1, 1, 1, 0])
  const tunnelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 0.9])

  // Anamorphic radial blur — sharpest at center depth, blurring outward at
  // the entrance/exit thresholds to simulate a shallow depth-of-field rack.
  const tunnelBlur = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [14, 0, 0, 0, 16],
  )
  const blurFilter = useTransform(tunnelBlur, (v) => `blur(${v}px)`)

  // Edge glow intensifies right at the entrance/exit thresholds — the
  // "catching light as it surfaces from the void" moment — and fades to
  // near-zero once the card is settled at full depth in the center band.
  const edgeGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.5, 0.78, 0.9, 1],
    [0, 0.9, 0.15, 0, 0.15, 0.9, 0],
  )

  // Subtle counter-rotation tied to scroll, layered under the mouse-tilt
  // rotation below, so the card also leans slightly as it travels the tunnel.
  const tunnelRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])

  // ── Mouse-tilt physics (existing interaction, preserved) ─────────────────
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, STEADICAM_PHYSICS)
  const mouseYSpring = useSpring(y, STEADICAM_PHYSICS)

  const mouseRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12])
  const mouseRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12])

  // Combine scroll-driven tunnel rotation with mouse-driven tilt rotation —
  // additive so hovering still works exactly as before, just riding on top
  // of whatever depth-lean the scroll position currently applies.
  const combinedRotateX = useTransform(
    [tunnelRotateX, mouseRotateX],
    (latest: number[]) => latest[0] + latest[1],
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleAuditTrigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onAuditWarp?.(item.slug)
  }

  // Fallback map parsing for dynamic aspect metrics
  const aspectClass = item.aspectRatio === "2.39:1" ? "aspect-[2.39/1]" : "aspect-[16/9]"

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: combinedRotateX,
        rotateY: mouseRotateY,
        z: tunnelZ,
        scale: tunnelScale,
        opacity: tunnelOpacity,
        filter: blurFilter,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered ? `0 35px 60px rgba(0,0,0,0.6), 0 0 40px ${theme.glow}` : '0 10px 30px rgba(0,0,0,0.3)',
      }}
      animate={{ scale: isHovered ? undefined : undefined }}
      className="group relative flex h-full flex-col rounded-2xl border border-neutral-900 bg-[#06060D] p-5 transition-colors duration-300 hover:border-neutral-800/80 glass-panel-premium"
    >
      {/* ── Anamorphic Edge Glow — fires on tunnel entrance/exit thresholds ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl"
        style={{
          opacity: edgeGlowOpacity,
          background: `linear-gradient(135deg, ${theme.rawHex}55 0%, transparent 40%, transparent 60%, ${theme.rawHex}40 100%)`,
          filter: 'blur(18px)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl ring-1"
        style={{
          opacity: edgeGlowOpacity,
          boxShadow: `0 0 0 1px ${theme.rawHex}80, 0 0 32px ${theme.glow}`,
        }}
      />

      {/* Hover-driven scale wrapper — separated from the scroll scale above so
          the two never fight; hover gives a quick local "lift", scroll gives
          slow global depth. */}
      <motion.div
        animate={{ scale: isHovered ? 1.015 : 1 }}
        transition={STEADICAM_PHYSICS}
        className="relative z-10 flex h-full flex-col"
      >
        {/* Aspect Ratio Browser Header Wrapper */}
        <div
          className={`relative w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-900/80 ${aspectClass}`}
          style={{ backgroundColor: '#020205', transformStyle: 'preserve-3d' }}
        >
          {item.liveUrl ? (
            <>
              <iframe
                src={item.liveUrl}
                title={item.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full border-0"
                style={{
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  width: '200%',
                  height: '200%',
                  pointerEvents: 'none',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060D] via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
            </>
          ) : item.image ? (
            <>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/40 opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
              <motion.img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={STEADICAM_PHYSICS}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                Preview Offline
              </span>
            </>
          )}

          {/* IMAX Shutter Variable Letterbox Crops */}
          {item.letterboxEnabled && (
            <>
              <motion.div
                className="absolute left-0 right-0 top-0 z-30 bg-[#06060D]"
                animate={{ height: isHovered ? '16px' : '0px' }}
                transition={STEADICAM_PHYSICS}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-30 bg-[#06060D]"
                animate={{ height: isHovered ? '16px' : '0px' }}
                transition={STEADICAM_PHYSICS}
              />
            </>
          )}

          {/* Category Floating Pill Badge (Depth Pull: 60px) */}
          <div
            className="absolute left-3 top-3 z-40 transition-transform duration-300"
            style={{ transform: 'translateZ(60px)' }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800/60 bg-neutral-950/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300 backdrop-blur-md">
              <span className="h-1 w-1 rounded-full animate-pulse" style={{ backgroundColor: theme.rawHex }} />
              {item.category}
            </span>
          </div>

          {/* Audit Warp Trigger — floating top-right, distinct from the
              category pill on the left. Separate affordance from "View Case
              Study": clicking this never navigates to the case study route,
              it only fires the shared hyperspace warp owned by the grid. */}
          {onAuditWarp && (
            <div
              className="absolute right-3 top-3 z-40 transition-transform duration-300"
              style={{ transform: 'translateZ(60px)' }}
            >
              <button
                type="button"
                onClick={handleAuditTrigger}
                aria-label={`Run performance audit referencing ${item.title}`}
                title="Run Audit"
                className="flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110"
                style={{
                  borderColor: `${theme.rawHex}50`,
                  backgroundColor: 'rgba(5,5,10,0.85)',
                  color: theme.rawHex,
                  boxShadow: `0 0 0 1px ${theme.rawHex}20`,
                }}
              >
                <AuditTriggerIcon size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Copy Information Rows (Depth Pull: 40px) */}
        <div
          className="flex flex-col flex-1 mt-5 transition-transform duration-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.rawHex }}>
            {item.cinematicTagline || "BHW Engineered"}
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-2">
            {item.description}
          </p>

          {/* Functional Actions (Depth Pull: 60px) */}
          <div
            className="mt-auto pt-6 flex flex-col gap-2 transition-transform duration-300"
            style={{ transform: 'translateZ(60px)' }}
          >
            <Link
              href={`/portfolio/${item.slug}`}
              className="group/btn relative flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/30 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/80"
            >
              View Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>

            {onAuditWarp && (
              <button
                type="button"
                onClick={handleAuditTrigger}
                className="group/audit relative flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all duration-300"
                style={{
                  borderColor: `${theme.rawHex}35`,
                  backgroundColor: `${theme.rawHex}0C`,
                  color: theme.rawHex,
                }}
              >
                <AuditTriggerIcon size={12} />
                Run Audit on This Build
              </button>
            )}

            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-800 bg-transparent px-4 py-2 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-400"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                Open Live Platform
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}