'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion'

const DOT_SIZE = 8
const AURA_SIZE = 36

const SPRING_CONFIG: SpringOptions = {
  stiffness: 250,
  damping: 30,
  mass: 0.6,
}

const AURA_SPRING_CONFIG: SpringOptions = {
  stiffness: 120,
  damping: 22,
  mass: 0.8,
}

const MAGNETIC_SELECTORS = 'a, button, [data-magnetic]'

export function CursorTrail() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [magnetic, setMagnetic] = useState(false)
  const isTouchDevice = useRef(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const dotX = useSpring(rawX, SPRING_CONFIG)
  const dotY = useSpring(rawY, SPRING_CONFIG)

  const auraX = useSpring(rawX, AURA_SPRING_CONFIG)
  const auraY = useSpring(rawY, AURA_SPRING_CONFIG)

  useEffect(() => {
    setMounted(true)
    
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice.current) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest(MAGNETIC_SELECTORS)) {
        setMagnetic(true)
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest(MAGNETIC_SELECTORS)) {
        setMagnetic(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseLeave)
    }
  }, [rawX, rawY, visible])

  // Halt server-side compilation matching errors or touch device rendering entirely
  if (!mounted || isTouchDevice.current) return null

  return (
    <>
      {/* Primary dot — tight, direct */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          scale: magnetic ? 0.4 : 1,
          mixBlendMode: 'difference',
          transition: 'opacity 0.2s ease, scale 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Aura — lagging magnetic ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: magnetic ? AURA_SIZE * 1.85 : AURA_SIZE,
          height: magnetic ? AURA_SIZE * 1.85 : AURA_SIZE,
          borderRadius: '50%',
          border: `1.5px solid rgba(124, 91, 255, ${magnetic ? 0.7 : 0.45})`,
          backgroundColor: magnetic
            ? 'rgba(124, 91, 255, 0.1)'
            : 'rgba(124, 91, 255, 0.06)',
          boxShadow: magnetic
            ? '0 0 18px 4px rgba(124,91,255,0.35)'
            : '0 0 8px 1px rgba(124,91,255,0.18)',
          pointerEvents: 'none',
          zIndex: 99998,
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          transition:
            'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.2s ease',
        }}
      />
    </>
  )
}