'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'bhw_cookie_consent'
const EASE = [0.16, 1, 0.3, 1] as const

export function CookieNotice() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Small delay so it doesn't flash immediately on page load
        const timer = setTimeout(() => setVisible(true), 1800)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage blocked (private browsing, etc.) — silently suppress
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // silently suppress
    }
    setVisible(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined')
    } catch {
      // silently suppress
    }
    setVisible(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-notice"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent notice"
          aria-live="polite"
          className="fixed bottom-0 inset-x-0 z-50 flex items-end justify-center px-4 pb-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-border/50 bg-elevated backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(124,91,255,0.08)] overflow-hidden">
            {/* Top accent line */}
            <div
              className="h-px w-full"
              style={{
                background: 'linear-gradient(to right, transparent, #7C5BFF 30%, #00D4FF 70%, transparent)',
              }}
              aria-hidden="true"
            />

            <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Icon */}
              <div
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(124,91,255,0.12)', border: '1px solid rgba(124,91,255,0.2)' }}
                aria-hidden="true"
              >
                {/* Cookie icon — inline SVG, no lucide dependency */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7C5BFF"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
              </div>

              {/* Copy */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary mb-1">
                  We use minimal cookies
                </p>
                <p className="text-xs leading-relaxed text-text-muted">
                  We store only essential session signals (no advertising trackers, no cross-site
                  fingerprinting). Read our{' '}
                  <Link
                    href="/privacy"
                    className="text-cyan underline underline-offset-3 hover:text-cyan-light transition-colors"
                    onClick={() => setVisible(false)}
                  >
                    Privacy Policy
                  </Link>{' '}
                  for full details.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none rounded-full border border-border/50 bg-card px-4 py-2 text-xs font-medium text-text-muted transition-all duration-200 hover:border-border hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-violet/30"
                >
                  Decline
                </button>

                <button
                  type="button"
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full bg-violet px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-violet-light hover:shadow-[0_0_16px_rgba(124,91,255,0.4)] focus:outline-none focus:ring-2 focus:ring-violet/40"
                >
                  {/* Checkmark icon — inline SVG */}
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}