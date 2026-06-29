'use client'

import { useRef, useMemo } from 'react'
import { useInView, motion, useReducedMotion } from 'framer-motion'

// STEADICAM spring configuration as per requirements
const STEADICAM = { mass: 3, stiffness: 45, damping: 25 }

interface OdometerCounterProps {
  value: number | string
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

function parseNumericParts(value: number | string): { prefix: string; digits: string; suffix: string } {
  const str = String(value)
  const match = str.match(/^([^0-9]*)([0-9]+)(.*)$/)
  if (!match) return { prefix: '', digits: '0', suffix: str }
  return { prefix: match[1], digits: match[2], suffix: match[3] }
}

function DigitDrum({
  digit,
  delay,
  active,
  isReducedMotion,
}: {
  digit: string
  delay: number
  active: boolean
  isReducedMotion: boolean
}) {
  const target = parseInt(digit, 10)
  // Strip goes from 0-9 and then 0 again for a seamless feel if we ever looped,
  // but here it's just to provide a standard set of digits.
  const strip = useMemo(
    () => Array.from({ length: 11 }, (_, i) => (i > 9 ? 0 : i)),
    [],
  )

  return (
    <span className="relative inline-block h-[1em] overflow-hidden tabular-nums" aria-hidden="true">
      {/* Static digit: visible immediately for SSR/SEO and Fallback */}
      <span className={active && !isReducedMotion ? "invisible" : "visible"}>
        {digit}
      </span>
      
      {/* Animated drum: marked aria-hidden and only rendered if motion is allowed */}
      {!isReducedMotion && (
        <motion.span
          className="absolute left-0 top-0 flex flex-col"
          initial={{ y: 0 }}
          animate={active ? { y: `-${target}em` } : { y: 0 }}
          transition={{
            ...STEADICAM,
            delay,
          }}
          aria-hidden="true"
        >
          {strip.map((n, i) => (
            <span key={i} className="block h-[1em] leading-none">
              {n}
            </span>
          ))}
        </motion.span>
      )}
    </span>
  )
}

export function OdometerCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
}: OdometerCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isReducedMotion = useReducedMotion()
  
  const parsed = parseNumericParts(value)
  const digits = parsed.digits.split('')

  const fullValue = `${prefix || parsed.prefix}${parsed.digits}${parsed.suffix || suffix}`

  return (
    <span 
      ref={ref} 
      className={`inline-flex items-baseline ${className}`}
      role="img" 
      aria-label={fullValue}
    >
      <span aria-hidden="true" className="flex items-baseline">
        {prefix || parsed.prefix}
        {digits.map((d, i) => (
          <DigitDrum
            key={`${i}-${d}`}
            digit={d}
            delay={(digits.length - 1 - i) * 0.1}
            active={inView}
            isReducedMotion={isReducedMotion ?? false}
          />
        ))}
        {parsed.suffix || suffix}
      </span>
      
      {/* Hidden text for screen readers ensuring accessibility */}
      <span className="sr-only">
        {fullValue}
      </span>
    </span>
  )
}
