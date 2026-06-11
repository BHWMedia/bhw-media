'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, type Variant } from 'framer-motion'

// ─── Types ─────────────────────────────────────────────────────────────────────

type AnimationPreset = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp'

interface ScrollAnimateWrapperProps {
  children: ReactNode
  /** Stagger delay in seconds — use when nesting inside grids or lists */
  delay?: number
  /** Distance in px the element travels during the reveal (default: 24) */
  distance?: number
  /** Animation entrance profile (default: 'fadeUp') */
  preset?: AnimationPreset
  /** Framer Motion viewport margin before trigger fires (default: '-72px') */
  margin?: string
  /** Only animate once on first intersection (default: true) */
  once?: boolean
  /** Animation duration in seconds (default: 0.65) */
  duration?: number
  /** Optional className forwarded to the motion wrapper div */
  className?: string
  /** Render as a different HTML element (default: 'div') */
  as?: keyof typeof motion
}

// ─── Preset Definitions ────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

function buildVariants(
  preset: AnimationPreset,
  distance: number,
): { hidden: Variant; visible: Variant } {
  const base: Variant = { opacity: 0 }
  const revealed: Variant = { opacity: 1 }

  switch (preset) {
    case 'fadeUp':
      return {
        hidden: { ...base, y: distance, filter: 'blur(0px)' },
        visible: { ...revealed, y: 0, filter: 'blur(0px)' },
      }
    case 'fadeIn':
      return {
        hidden: { ...base },
        visible: { ...revealed },
      }
    case 'fadeLeft':
      return {
        hidden: { ...base, x: -distance },
        visible: { ...revealed, x: 0 },
      }
    case 'fadeRight':
      return {
        hidden: { ...base, x: distance },
        visible: { ...revealed, x: 0 },
      }
    case 'scaleUp':
      return {
        hidden: { ...base, scale: 0.96, y: distance * 0.5 },
        visible: { ...revealed, scale: 1, y: 0 },
      }
    default:
      return {
        hidden: { ...base, y: distance },
        visible: { ...revealed, y: 0 },
      }
  }
}

// ─── ScrollAnimateWrapper ──────────────────────────────────────────────────────

export function ScrollAnimateWrapper({
  children,
  delay = 0,
  distance = 24,
  preset = 'fadeUp',
  margin = '-72px',
  once = true,
  duration = 0.65,
  className,
  as = 'div',
}: ScrollAnimateWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once,
    margin: margin as `${number}px`,
  })

  const variants = buildVariants(preset, distance)
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div

  return (
    <MotionComponent
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: EASE,
      }}
      // Fixed string interpolation gap below to maintain isolated Tailwind tokens
      className={`transform-gpu will-change-transform ${className || ''}`.trim()}
    >
      {children}
    </MotionComponent>
  )
}

// ─── ScrollStaggerGroup ────────────────────────────────────────────────────────

interface ScrollStaggerGroupProps {
  children: ReactNode
  /** Base stagger interval between each child reveal in seconds (default: 0.08) */
  staggerInterval?: number
  /** Viewport margin before the group trigger fires (default: '-72px') */
  margin?: string
  /** Only fire once (default: true) */
  once?: boolean
  /** Optional className forwarded to the container div */
  className?: string
}

export function ScrollStaggerGroup({
  children,
  staggerInterval = 0.08,
  margin = '-72px',
  once = true,
  className,
}: ScrollStaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once,
    margin: margin as `${number}px`,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerInterval,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ScrollStaggerItem ─────────────────────────────────────────────────────────

interface ScrollStaggerItemProps {
  children: ReactNode
  distance?: number
  duration?: number
  preset?: AnimationPreset
  className?: string
  as?: keyof typeof motion
}

export function ScrollStaggerItem({
  children,
  distance = 24,
  duration = 0.6,
  preset = 'fadeUp',
  className,
  as = 'div',
}: ScrollStaggerItemProps) {
  const variants = buildVariants(preset, distance)
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div

  return (
    <MotionComponent
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: {
            duration,
            ease: EASE,
          },
        },
      }}
      className={`transform-gpu will-change-transform ${className || ''}`.trim()}
    >
      {children}
    </MotionComponent>
  )
}