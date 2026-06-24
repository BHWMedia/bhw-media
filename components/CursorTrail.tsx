'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion'

type CursorMode = 'default' | 'text' | 'link' | 'image' | 'button'

const DOT_SIZE = 6
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

function resolveCursorMode(target: Element | null): CursorMode {
  if (!target) return 'default'
  const el = target.closest(
    'button, [role="button"], input[type="submit"], .btn-nebula',
  )
  if (el) return 'button'
  if (target.closest('a')) return 'link'
  if (target.closest('img, picture, [data-cursor-image], .filter-chromatic-hover')) return 'image'
  if (target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, span.font-mono, label')) return 'text'
  return 'default'
}

export function CursorTrail() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
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
      setMode(resolveCursorMode(e.target as Element))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, visible])

  if (!mounted || isTouchDevice.current) return null

  const isLink = mode === 'link'
  const isText = mode === 'text'
  const isImage = mode === 'image'
  const isButton = mode === 'button'

  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={{
          width: isText ? 2 : isButton ? DOT_SIZE + 6 : isLink ? AURA_SIZE * 1.6 : DOT_SIZE,
          height: isText ? 18 : isButton ? DOT_SIZE + 6 : isLink ? AURA_SIZE * 1.6 : DOT_SIZE,
          borderRadius: isText ? 2 : '50%',
          opacity: visible ? 1 : 0,
          scale: isButton ? 1 : isLink ? 1 : 1,
          backgroundColor: isButton
            ? 'rgba(124, 91, 255, 0.85)'
            : isText
              ? 'rgba(0, 212, 255, 0.9)'
              : '#FFFFFF',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: isButton ? 'normal' : 'difference',
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={{
          width: isImage ? 48 : isLink ? AURA_SIZE * 2 : AURA_SIZE,
          height: isImage ? 48 : isLink ? AURA_SIZE * 2 : AURA_SIZE,
          opacity: visible ? (isImage ? 0.9 : 1) : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: isImage ? 4 : '50%',
          border: isImage
            ? '1px solid rgba(0, 212, 255, 0.7)'
            : `1.5px solid rgba(124, 91, 255, ${isLink ? 0.75 : 0.45})`,
          backgroundColor: isImage
            ? 'rgba(0, 212, 255, 0.06)'
            : isLink
              ? 'rgba(124, 91, 255, 0.12)'
              : 'rgba(124, 91, 255, 0.06)',
          boxShadow: isLink
            ? '0 0 24px 6px rgba(124,91,255,0.35)'
            : '0 0 8px 1px rgba(124,91,255,0.18)',
          pointerEvents: 'none',
          zIndex: 99998,
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {isLink && (
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-violet"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            →
          </motion.span>
        )}
        {isImage && (
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan/80" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan/80" />
          </span>
        )}
        {isButton && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-widest text-violet">
            click
          </span>
        )}
      </motion.div>
    </>
  )
}
