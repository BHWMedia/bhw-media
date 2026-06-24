'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  driftX: number
  driftY: number
  duration: number
  delay: number
}

interface AmbientParticleSystemProps {
  count?: number
  className?: string
  repelRadius?: number
}

const STEADICAM = { stiffness: 120, damping: 28, mass: 0.6 }

export function AmbientParticleSystem({
  count = 25,
  className = '',
  repelRadius = 100,
}: AmbientParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)
  const springX = useSpring(cursorX, STEADICAM)
  const springY = useSpring(cursorY, STEADICAM)

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.2,
      driftX: (Math.random() - 0.5) * 0.015,
      driftY: (Math.random() - 0.5) * 0.012,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 4,
    }))
  }, [count])

  useEffect(() => {
    initParticles()
    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      cursorX.set(e.clientX - rect.left)
      cursorY.set(e.clientY - rect.top)
    }

    container.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      timeRef.current += 0.016
      const els = container.querySelectorAll<HTMLElement>('[data-particle]')
      const cx = springX.get()
      const cy = springY.get()
      const rect = container.getBoundingClientRect()

      particlesRef.current.forEach((p, i) => {
        const el = els[i]
        if (!el) return

        let px = p.x + Math.sin(timeRef.current / p.duration + p.delay) * p.driftX * 100
        let py = p.y + Math.cos(timeRef.current / (p.duration * 0.9) + p.delay) * p.driftY * 100

        const absX = (px / 100) * rect.width
        const absY = (py / 100) * rect.height
        const dx = absX - cx
        const dy = absY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          px += (dx / dist) * force * 3
          py += (dy / dist) * force * 3
        }

        el.style.left = `${px}%`
        el.style.top = `${py}%`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [cursorX, cursorY, springX, springY, initParticles, repelRadius])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particlesRef.current.length === 0 &&
        Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            data-particle
            className="absolute rounded-full bg-cyan/40"
            style={{
              width: 3,
              height: 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
          />
        ))}
      {particlesRef.current.map((p) => (
        <span
          key={p.id}
          data-particle
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            background:
              p.id % 3 === 0
                ? 'var(--color-violet)'
                : p.id % 3 === 1
                  ? 'var(--color-cyan)'
                  : 'var(--color-gold)',
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
        />
      ))}
    </div>
  )
}
