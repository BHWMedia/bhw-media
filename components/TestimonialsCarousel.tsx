'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

const CARD_STEP = 380 // card width 360 + gap 20

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (next: number) => {
      const clamped = ((next % TESTIMONIALS.length) + TESTIMONIALS.length) %
        TESTIMONIALS.length
      setIndex(clamped)
    },
    [],
  )

  useEffect(() => {
    const controls = animate(x, -index * CARD_STEP, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [index, x])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={containerRef} className="overflow-hidden px-1 py-2">
        <motion.div className="flex w-max gap-5" style={{ x }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="w-[360px] flex-shrink-0 rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mb-4 mt-3 text-base italic leading-relaxed text-text-secondary">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-sm font-semibold text-violet">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(index - 1)}
          className="rounded-full border border-border bg-card p-2 text-text-secondary transition-colors hover:border-violet hover:text-violet"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-violet' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(index + 1)}
          className="rounded-full border border-border bg-card p-2 text-text-secondary transition-colors hover:border-violet hover:text-violet"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
