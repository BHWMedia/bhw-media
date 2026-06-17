'use client'

import { useEffect, useState, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Safe SSR fallback for Next.js to prevent useLayoutEffect warnings
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const SESSION_KEY = 'bhw-preloader-shown'
const STEADICAM_SPRING = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }

type Phase = 'line' | 'shutter' | 'flash' | 'exit' | 'done'

export function CinematicPreloader() {
  const [phase, setPhase] = useState<Phase>('line')

  // 1. Storage Check: Executes synchronously on client before paint
  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') {
        setPhase('done')
      }
    } catch (e) {
      // Graceful fallback for strict privacy browsers (Safari ITP, Brave)
      setPhase('line')
    }
  }, [])

  // 2. Timeline Sequence & Scroll Management
  useEffect(() => {
    if (phase === 'done') return

    // Lock page scrolling while the cinematic sequence is active
    document.body.style.overflow = 'hidden'

    // Physical timeline sequence
    const timers = [
      setTimeout(() => setPhase('shutter'), 550),
      setTimeout(() => setPhase('flash'), 1150),
      setTimeout(() => setPhase('exit'), 2400),
      setTimeout(() => {
        setPhase('done')
        document.body.style.overflow = '' // Restore scroll
        try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}
      }, 3300)
    ]

    // Cleanup function: clears timers AND guarantees scroll is unlocked 
    // even if the component unmounts unexpectedly (e.g., during Dev HMR)
    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, []) // <-- CRITICAL: Empty array ensures timers only initiate once

  if (phase === 'done') return null

  return (
    <motion.div
      key="preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === 'exit' ? 0 : 1,
        scale: phase === 'exit' ? 1.05 : 1,
      }}
      transition={phase === 'exit' ? STEADICAM_SPRING : { duration: 0.2 }}
    >
      {/* Shutter Bars */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1/2 origin-top bg-black" 
        animate={{ scaleY: phase === 'line' ? 1 : 0 }} 
        transition={STEADICAM_SPRING} 
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom bg-black" 
        animate={{ scaleY: phase === 'line' ? 1 : 0 }} 
        transition={STEADICAM_SPRING} 
      />

      {/* Iridescent Line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        style={{ boxShadow: '0 0 12px rgba(124, 91, 255, 0.8)' }}
        animate={{ opacity: phase === 'line' ? 1 : 0, scaleX: phase === 'line' ? 1 : 1.4 }}
      />

      {/* Wordmark (AnimatePresence belongs here since it conditionally unmounts) */}
      <AnimatePresence>
        {(phase === 'shutter' || phase === 'flash') && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0.4, 1] }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, times: [0, 0.3, 0.55, 1], ease: 'easeInOut' }}
            className="relative font-bold text-2xl sm:text-4xl tracking-[0.35em] text-white select-none"
          >
            {/* Chromatic Aberration Layers */}
            <span className="absolute inset-0 text-cyan-500 translate-x-[-2px] mix-blend-screen" aria-hidden="true">
              BHW MEDIA
            </span>
            <span className="absolute inset-0 text-red-500 translate-x-[2px] mix-blend-screen" aria-hidden="true">
              BHW MEDIA
            </span>
            <span className="relative">BHW MEDIA</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}