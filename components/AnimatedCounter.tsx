'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export function AnimatedCounter({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 25 })

  useEffect(() => {
    if (inView) {
      motionValue.set(target)
    }
  }, [inView, target, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
    return () => unsubscribe()
  }, [spring, suffix])

  return (
    <span ref={ref} className="text-5xl font-bold text-text-primary">
      0{suffix}
    </span>
  )
}
