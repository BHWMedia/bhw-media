'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO, type PortfolioItem } from '@/lib/constants'
import { AmbientParticleSystem } from '@/components/AmbientParticleSystem'

const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }
const EASE = [0.16, 1, 0.3, 1] as const

const ACCENT: Record<string, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

const CAROUSEL_ITEMS = PORTFOLIO.slice(0, 5)

function CarouselCard({
  item,
  index,
  activeIndex,
  total,
}: {
  item: PortfolioItem
  index: number
  activeIndex: number
  total: number
}) {
  const [hovered, setHovered] = useState(false)
  const accent = ACCENT[item.color] ?? ACCENT.violet

  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total

  const isActive = offset === 0
  const absOffset = Math.abs(offset)

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(92vw,420px)]"
      style={{
        transformStyle: 'preserve-3d',
        zIndex: 10 - absOffset,
      }}
      animate={{
        x: '-50%',
        y: '-50%',
        rotateY: offset * -28,
        translateX: offset * 220,
        translateZ: isActive ? 80 : -absOffset * 120,
        scale: isActive ? 1 : 0.82 - absOffset * 0.06,
        opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.22,
        filter: isActive ? 'blur(0px)' : `blur(${absOffset * 3}px)`,
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

      <Link href={`/portfolio/${item.slug}`} className="group block">
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
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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

export function PortfolioCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
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
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  const prev = () =>
    setActiveIndex((i) => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
  const next = () => setActiveIndex((i) => (i + 1) % CAROUSEL_ITEMS.length)

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-8"
      onMouseMove={handleMouseMove}
    >
      <AmbientParticleSystem count={18} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,91,255,0.08)_0%,transparent_65%)]"
      />

      <motion.div style={{ y: parallaxY }} className="relative mx-auto max-w-6xl px-6">
        <div
          className="relative mx-auto h-[520px] max-w-5xl"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative h-full w-full"
          >
            {CAROUSEL_ITEMS.map((item, i) => (
              <CarouselCard
                key={item.slug}
                item={item}
                index={i}
                activeIndex={activeIndex}
                total={CAROUSEL_ITEMS.length}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {CAROUSEL_ITEMS.map((_, i) => (
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
