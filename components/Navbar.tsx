'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

const BOOKING_URL = 'https://calendly.com/mediabhw'

function CalendarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
          onClick={() => setOpen(false)}
        >
          <span className="text-[#7C5BFF] drop-shadow-[0_0_8px_rgba(124,91,255,0.8)]">
            ●
          </span>
          <span>BHW</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS?.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 hover:text-[#7C5BFF] ${
                  active ? 'font-medium text-[#7C5BFF]' : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border border-[#7C5BFF]/40 text-[#B8A0FF] bg-[#7C5BFF]/10 hover:border-[#7C5BFF]/70 hover:bg-[#7C5BFF]/20 hover:text-[#D0BBFF] hover:shadow-[0_0_16px_rgba(124,91,255,0.18)] focus:outline-none focus:ring-2 focus:ring-[#7C5BFF]/40"
          >
            <CalendarIcon size={13} />
            Book Call
          </a>

          <Link
            href="/contact"
            className="rounded-full bg-[#7C5BFF] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9B7FFF] hover:shadow-[0_0_24px_rgba(124,91,255,0.5)] focus:outline-none focus:ring-2 focus:ring-[#7C5BFF]/40"
          >
            Start a Project →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="text-gray-400 transition-colors hover:text-[#7C5BFF] md:hidden relative z-50"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-white"
                onClick={() => setOpen(false)}
              >
                <span className="text-[#7C5BFF]">●</span>
                <span>BHW</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-gray-400 transition-colors hover:text-[#7C5BFF]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.div
              className="flex flex-1 flex-col items-center justify-center gap-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {NAV_LINKS?.map((link) => {
                const active = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-medium transition-colors hover:text-[#7C5BFF] ${
                        active ? 'text-[#7C5BFF]' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-medium border border-[#7C5BFF]/40 text-[#B8A0FF] bg-[#7C5BFF]/10 transition-all focus:outline-none"
                >
                  <CalendarIcon size={15} />
                  Book a Discovery Call
                </a>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-full bg-[#7C5BFF] px-8 py-3 text-base font-medium text-white transition-all hover:bg-[#9B7FFF] hover:shadow-[0_0_24px_rgba(124,91,255,0.5)]"
                >
                  Start a Project →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}