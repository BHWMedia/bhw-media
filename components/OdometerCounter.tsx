'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useInView, motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

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
  duration,
  active,
}: {
  digit: string
  delay: number
  duration: number
  active: boolean
}) {
  const target = parseInt(digit, 10)
  const strip = useMemo(
    () => Array.from({ length: 11 }, (_, i) => (i > 9 ? 0 : i)),
    [],
  )

  return (
    <span className="odometer-digit" aria-hidden="true">
      <motion.span
        className="odometer-strip"
        initial={{ y: 0 }}
        animate={active ? { y: `-${target}em` } : { y: 0 }}
        transition={{
          duration,
          delay,
          ease: EASE,
        }}
      >
        {strip.map((n, i) => (
          <span key={i} className="block h-[1em] leading-none tabular-nums">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export function OdometerCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 1.2,
}: OdometerCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const parsed = parseNumericParts(value)
  const digits = parsed.digits.split('')

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix || parsed.prefix}
      {digits.map((d, i) => (
        <DigitDrum
          key={`${i}-${d}`}
          digit={d}
          delay={(digits.length - 1 - i) * 0.08}
          duration={duration}
          active={inView}
        />
      ))}
      {parsed.suffix}
      {suffix}
    </span>
  )
}
