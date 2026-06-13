// components/HeroSection.tsx
'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ExternalLink } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoPreview {
  label: string
  shortUrl: string
  fullUrl: string
  accentColor: string
}

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMOS: DemoPreview[] = [
  {
    label: 'Real Estate Pitch Engine',
    shortUrl: '864e3ea2.app-preview.com',
    fullUrl: 'https://864e3ea2-bb69-4dbe-8857-dd6a67a5e1b9.app-preview.com/',
    accentColor: '#F5A623',
  },
  {
    label: 'Café Noirè Platform',
    shortUrl: '9fe54dd0.app-preview.com',
    fullUrl: 'https://9fe54dd0-d708-486d-8b97-6666f8143cef.app-preview.com/',
    accentColor: '#00D4FF',
  },
  {
    label: 'Elite Fitness Terminal',
    shortUrl: 'dbf4e340.app-preview.com',
    fullUrl: 'https://dbf4e340-e582-453d-9d2e-9ffeafe38825.app-preview.com/',
    accentColor: '#7C5BFF',
  },
  {
    label: 'Car Motors Repair Engine',
    shortUrl: '6afec9fb.app-preview.com',
    fullUrl: 'https://6afec9fb-fe05-4c83-b801-a7028c9df3ba.app-preview.com/',
    accentColor: '#DC2626',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const
const CYCLE_INTERVAL_MS = 5_000

const BADGES = [
  'Trusted by 40+ Global Brands',
  'Avg. Project Delivery: 14 Days',
  '100% Source Code Ownership',
]

// ── Split-text word animation ─────────────────────────────────────────────────

function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: delay + i * 0.07,
              duration: 0.75,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Browser Chrome ───────────────────────────────────────────────────────────

interface BrowserChromeProps {
  demo: DemoPreview
  isLoaded: boolean
  onLoad: () => void
}

function BrowserChrome({ demo, isLoaded, onLoad }: BrowserChromeProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        boxShadow: `0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${demo.accentColor}22`,
        transition: 'box-shadow 0.6s ease',
      }}
    >
      {/* ── Title bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex h-[38px] items-center gap-3 px-4"
        style={{
          backgroundColor: '#12121A',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-[6px]">
          <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#FFBD2E]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
        </div>

        <div
          className="flex flex-1 items-center gap-2 rounded-md px-3 py-[5px]"
          style={{
            backgroundColor: '#1E1E2A',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={demo.accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.8, flexShrink: 0 }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          <span
            className="truncate font-mono text-[11px] leading-none"
            style={{ color: '#C8C8D8' }}
          >
            {demo.shortUrl}
          </span>

          <a
            href={demo.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${demo.label} in new tab`}
            className="ml-auto flex-shrink-0 transition-opacity hover:opacity-100"
            style={{ opacity: 0.4, color: '#C8C8D8' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ── Viewport ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: '340px', backgroundColor: '#0A0A0F' }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-30">
              <div
                className="h-1.5 w-24 animate-pulse rounded-full"
                style={{ backgroundColor: demo.accentColor }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: '#7A7A94' }}
              >
                Loading preview
              </span>
            </div>
          </div>
        )}

        <iframe
          src={demo.fullUrl}
          title={demo.label}
          sandbox="allow-scripts allow-same-origin"
          onLoad={onLoad}
          className="h-full w-full border-0"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{
            background: 'linear-gradient(to top, #0A0A0F 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Label strip ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          backgroundColor: '#0E0E16',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: demo.accentColor }}
        >
          {demo.label}
        </span>
        <span
          className="font-mono text-[10px]"
          style={{ color: '#3A3A4E' }}
        >
          LIVE PREVIEW
        </span>
      </div>
    </div>
  )
}

// ─── Carousel dots ────────────────────────────────────────────────────────────

interface DotsProps {
  total: number
  active: number
  accentColor: string
  onSelect: (i: number) => void
}

function CarouselDots({ total, active, accentColor, onSelect }: DotsProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Switch to demo ${i + 1}`}
          onClick={() => onSelect(i)}
          className="rounded-full transition-all duration-300 focus:outline-none"
          style={{
            width: i === active ? '24px' : '6px',
            height: '6px',
            backgroundColor: i === active ? accentColor : '#3A3A4E',
          }}
        />
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [shouldPreload, setShouldPreload] = useState(false)
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({})

  const activateIndex = useCallback((i: number) => {
    setActiveIndex(((i % DEMOS.length) + DEMOS.length) % DEMOS.length)
  }, [])

  // Optimization: Wait for main layout hydration before preloading dynamic background frames
  useEffect(() => {
    const handleLoad = () => setShouldPreload(true)
    if (document.readyState === 'complete') {
      setShouldPreload(true)
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  // FIX: Reset dynamic timer correctly when activeIndex shifts manually via dots
  useEffect(() => {
    if (paused) return
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMOS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(intervalId)
  }, [paused, activeIndex])

  const markLoaded = useCallback((i: number) => {
    setLoadedMap((prev) => ({ ...prev, [i]: true }))
  }, [])

  const activeDemo = DEMOS[activeIndex]

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-mesh-violet opacity-60" />
      <div className="absolute inset-0 bg-mesh-cyan opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.15em] text-cyan"
            >
              // PREMIUM WEB PRODUCTION STUDIO
            </motion.span>

            <h1
              className="mt-5 font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
            >
              <span className="block">
                <SplitText
                  text="We Build Websites"
                  className="text-text-primary"
                  delay={0.15}
                />
              </span>
              <span
                className="block bg-gradient-to-r from-[#7C5BFF] to-[#00D4FF] bg-clip-text text-transparent"
              >
                <SplitText text="That Convert." delay={0.45} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
            >
              From immersive SaaS platforms to high-ticket brand launches — BHW
              Media engineers digital experiences that command attention, build
              trust, and drive revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="rounded-full bg-[#7C5BFF] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#9B7FFF] hover:shadow-[0_0_40px_rgba(124,91,255,0.5)]"
              >
                Start a Project →
              </Link>

              <Link
                href="/audit"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-elevated/40 px-8 py-4 font-semibold text-text-secondary backdrop-blur-sm transition-all duration-200 hover:border-violet/50 hover:text-violet hover:bg-elevated/60"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Free Site Audit
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 text-sm text-text-muted"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-[#7C5BFF]" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Iframe carousel ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE }}
            className="relative hidden justify-self-end lg:block"
            style={{ width: '460px' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="absolute inset-0 -z-10 blur-3xl transition-colors duration-700"
              style={{
                background: `radial-gradient(ellipse at center, ${activeDemo.accentColor}18 0%, transparent 70%)`,
              }}
            />

            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <BrowserChrome
                    demo={activeDemo}
                    isLoaded={!!loadedMap[activeIndex]}
                    onLoad={() => markLoaded(activeIndex)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Performance Optimized Preloader Track */}
            {shouldPreload && DEMOS.map((demo, i) =>
              i === activeIndex ? null : (
                <iframe
                  key={demo.fullUrl}
                  src={demo.fullUrl}
                  title={`preload-${demo.label}`}
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => markLoaded(i)}
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0.001,
                    pointerEvents: 'none',
                    border: 'none',
                    zIndex: -1,
                  }}
                />
              )
            )}

            <CarouselDots
              total={DEMOS.length}
              active={activeIndex}
              accentColor={activeDemo.accentColor}
              onSelect={activateIndex}
            />

            {!paused && (
              <motion.div
                key={`progress-${activeIndex}`}
                className="mx-auto mt-3 h-px rounded-full overflow-hidden"
                style={{
                  width: '80px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: activeDemo.accentColor }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: CYCLE_INTERVAL_MS / 1_000,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}