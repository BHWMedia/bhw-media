'use client'

import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, Search } from 'lucide-react'
import { 
  PORTFOLIO, 
  PORTFOLIO_FILTERS, 
  type PortfolioFilter, 
  type PortfolioItem,
  trackEvent 
} from '@/lib/constants'
import { AmbientParticleSystem } from '@/components/AmbientParticleSystem'

const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }
const EASE = [0.16, 1, 0.3, 1] as const

const ACCENT: Record<string, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

const FILTER_ACCENTS: Record<string, string> = {
  All: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  'Real Estate': 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Hospitality: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  Fitness: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  Automotive: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  SaaS: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  'E-Commerce': 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  Brand: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
}

function CarouselCard({
  item,
  index,
  activeIndex,
  total,
  isReducedMotion,
}: {
  item: PortfolioItem
  index: number
  activeIndex: number
  total: number
  isReducedMotion: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const accent = ACCENT[item.color] ?? ACCENT.violet

  let offset = index - activeIndex
  // Handle wrapping logic only if more than 2 items to avoid jumpy transitions
  if (total > 2) {
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
  }

  const isActive = offset === 0
  const absOffset = Math.abs(offset)

  // 3D Vault Transforms
  const rotateY = isReducedMotion ? 0 : offset * -28
  const translateX = isReducedMotion ? offset * 440 : offset * 240
  const translateZ = isReducedMotion ? 0 : (isActive ? 100 : -absOffset * 140)
  const scale = isReducedMotion ? (isActive ? 1 : 0.9) : (isActive ? 1 : 0.82 - absOffset * 0.05)
  const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.25
  const blur = isReducedMotion ? 0 : (isActive ? 0 : absOffset * 3)

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(92vw,420px)]"
      style={{
        transformStyle: isReducedMotion ? 'flat' : 'preserve-3d',
        zIndex: 10 - absOffset,
      }}
      animate={{
        x: '-50%',
        y: '-50%',
        rotateY,
        translateX,
        translateZ,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      transition={STEADICAM}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-16 select-none font-display font-bold leading-none transition-colors duration-500"
        style={{
          fontSize: 'clamp(120px, 18vw, 280px)',
          color: hovered ? `${accent}14` : 'rgba(255,255,255,0.025)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <Link href={`/portfolio/${item.slug}`} className="group block focus:outline-none">
        <motion.article
          className="filter-chromatic-hover relative overflow-hidden rounded-2xl border border-border/50 bg-card"
          animate={{
            y: hovered ? -8 : 0,
            boxShadow: hovered
              ? `0 40px 80px rgba(0,0,0,0.55), 0 0 60px ${accent}33`
              : '0 20px 50px rgba(0,0,0,0.4)',
          }}
          transition={STEADICAM}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-studio">
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={420}
                height={262}
                sizes="(max-width: 768px) 100vw, 420px"
                loading={isActive ? 'eager' : 'lazy'}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: hovered
                    ? 'none'
                    : 'drop-shadow(-3px 0 0 rgba(124,91,255,0.25)) drop-shadow(3px 0 0 rgba(0,212,255,0.2))',
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
            <span
              className="absolute left-4 top-4 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md"
              style={{
                borderColor: `${accent}40`,
                backgroundColor: `${accent}15`,
                color: accent,
              }}
            >
              {item.category}
            </span>
          </div>

          <div className="p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              {item.cinematicTagline}
            </p>
            <h3 className="mt-2 flex items-center gap-2 text-xl font-bold text-text-primary">
              {item.title}
              <ArrowUpRight
                size={16}
                className="text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan"
              />
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-text-muted">{item.description}</p>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

export function PortfolioCarousel({ showTitle = true }: { showTitle?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isReducedMotion = useReducedMotion()
  const [filter, setFilter] = useState<PortfolioFilter>('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [bounds, setBounds] = useState({ width: 1000, height: 600 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30, mass: 1 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30, mass: 1 })

  const rotateY = useTransform(springX, [0, bounds.width], [8, -8])
  const rotateX = useTransform(springY, [0, bounds.height], [-6, 6])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const filteredItems = useMemo(() => {
    return filter === 'All'
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === filter)
  }, [filter])

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0)
    trackEvent({ event: 'portfolio_filter_changed', category: filter })
  }, [filter])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setBounds({ width: e.contentRect.width, height: e.contentRect.height })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || isReducedMotion) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY, isReducedMotion],
  )

  const prev = useCallback(() =>
    setActiveIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length), [filteredItems.length])
  const next = useCallback(() => 
    setActiveIndex((i) => (i + 1) % filteredItems.length), [filteredItems.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next])

  const hasItems = filteredItems.length > 0
  const isSingleItem = filteredItems.length === 1

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16"
      onMouseMove={handleMouseMove}
    >
      <AmbientParticleSystem count={isReducedMotion ? 0 : 18} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,91,255,0.08)_0%,transparent_65%)]"
      />

      {/* Filter UI */}
      <div className="relative z-20 mx-auto mb-16 max-w-6xl px-6">
        {showTitle && (
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                Production Archive
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Select a vertical to explore tailored high-fidelity case studies.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {PORTFOLIO_FILTERS.map((tab) => {
            const active = filter === tab
            const style = FILTER_ACCENTS[tab] || FILTER_ACCENTS.All

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                  active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeCarouselFilterPill"
                    className={`absolute inset-0 rounded-full border ${style.split(' ')[0]} ${style.split(' ')[1]}`}
                    transition={STEADICAM}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {active && <span className="h-1 w-1 rounded-full animate-ping bg-current" />}
                  {tab}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <motion.div style={{ y: parallaxY }} className="relative mx-auto max-w-6xl px-6">
        <div
          className="relative mx-auto h-[520px] max-w-5xl"
          style={{ 
            perspective: isReducedMotion ? 'none' : '1400px', 
            transformStyle: isReducedMotion ? 'flat' : 'preserve-3d' 
          }}
        >
          <AnimatePresence mode="wait">
            {!hasItems ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex h-full w-full flex-col items-center justify-center text-center"
              >
                <div className="mb-4 rounded-full bg-studio p-6 text-text-muted">
                  <Search size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">No items found</h3>
                <p className="mt-2 text-text-muted">Try selecting a different vertical filter.</p>
              </motion.div>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ 
                  rotateX: isReducedMotion ? 0 : rotateX, 
                  rotateY: isReducedMotion ? 0 : rotateY, 
                  transformStyle: isReducedMotion ? 'flat' : 'preserve-3d' 
                }}
                className="relative h-full w-full"
              >
                {filteredItems.map((item, i) => (
                  <CarouselCard
                    key={item.slug}
                    item={item}
                    index={i}
                    activeIndex={activeIndex}
                    total={filteredItems.length}
                    isReducedMotion={isReducedMotion}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasItems && !isSingleItem && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary"
            >
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="flex gap-2">
              {filteredItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-violet' : 'w-1.5 bg-border hover:bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary"
            >
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
