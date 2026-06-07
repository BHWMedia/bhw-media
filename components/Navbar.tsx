'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-studio/80 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-text-primary"
          onClick={() => setOpen(false)}
        >
          <span className="text-violet drop-shadow-[0_0_8px_rgba(124,91,255,0.8)]">
            ●
          </span>
          <span>BHW</span>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 hover:text-violet ${
                  active
                    ? 'font-medium text-violet'
                    : 'text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-full bg-violet px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-light hover:shadow-[0_0_24px_rgba(124,91,255,0.5)]"
          >
            Start a Project →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="text-text-secondary transition-colors hover:text-violet md:hidden"
        >
          {open ? <Menu className="h-6 w-6 opacity-0" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-void/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-text-primary"
                onClick={() => setOpen(false)}
              >
                <span className="text-violet">●</span>
                <span>BHW</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-text-secondary transition-colors hover:text-violet"
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
              {NAV_LINKS.map((link) => {
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
                      className={`text-2xl font-medium transition-colors hover:text-violet ${
                        active ? 'text-violet' : 'text-text-primary'
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
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-violet px-8 py-3 text-base font-medium text-white transition-all hover:bg-violet-light hover:shadow-[0_0_24px_rgba(124,91,255,0.5)]"
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
