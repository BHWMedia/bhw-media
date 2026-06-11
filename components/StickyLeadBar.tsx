'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const SESSION_KEY = 'bhw_slb_dismissed'
const SCROLL_THRESHOLD_VH = 40

export function StickyLeadBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration guard — prevents SSR mismatch on sessionStorage read
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const alreadyDismissed = sessionStorage.getItem(SESSION_KEY) === '1'
      if (alreadyDismissed) setDismissed(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted || dismissed) return

    const threshold = (SCROLL_THRESHOLD_VH / 100) * window.innerHeight

    const onScroll = () => {
      setVisible(window.scrollY >= threshold)
    }

    // Evaluate immediately in case the page loaded pre-scrolled
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted, dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1')
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <>
          {/* Localized fallback style tag ensures the animation functions immediately */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes glowPulse {
              0%, 100% { transform: scale(1); opacity: 0.6; box-shadow: 0 0 0 0 rgba(124, 91, 255, 0.7); }
              50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 12px 4px rgba(124, 91, 255, 0.4); }
            }
          `}} />
          <motion.div
            key="sticky-lead-bar"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            role="complementary"
            aria-label="Project inquiry prompt"
            className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-center px-4 pb-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-elevated backdrop-blur-xl px-5 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(124,91,255,0.08)]">

              {/* Left — status dot + copy */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="hidden sm:flex h-2 w-2 flex-shrink-0 rounded-full bg-violet"
                  style={{ animation: 'glowPulse 3s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-text-secondary truncate">
                  <span className="text-text-primary font-semibold">Ready to build?</span>
                  {' '}We deliver production-grade platforms in&nbsp;14&nbsp;days.
                </p>
              </div>

              {/* Right — CTA + dismiss */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/contact"
                  className="rounded-full bg-violet px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-violet-light hover:shadow-[0_0_20px_rgba(124,91,255,0.45)] focus:outline-none focus:ring-2 focus:ring-violet/50 focus:ring-offset-2 focus:ring-offset-elevated whitespace-nowrap"
                >
                  Start a Project →
                </Link>

                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss this prompt"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-border/40 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-violet/40"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}