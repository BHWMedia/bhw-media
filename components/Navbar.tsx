'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

function BHWLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label="BHW Media — Home"
    >
      {/* Original two-rectangle stacked logomark */}
      <span className="relative flex h-5 w-5 flex-shrink-0" aria-hidden="true">
        <span
          className="absolute right-0 top-0 h-2 w-2 rounded-sm transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ backgroundColor: '#3B82F6' }}
        />
        <span
          className="absolute bottom-0 left-0 h-3 w-3 rounded-sm transition-transform duration-300 group-hover:-translate-x-0.5"
          style={{ backgroundColor: '#1D4ED8' }}
        />
      </span>

      {/* Wordmark */}
      <span className="font-bold text-lg tracking-tight text-white transition-colors duration-300 group-hover:text-white">
        BHW
        <span className="ml-1 text-zinc-500 font-normal text-xs tracking-widest uppercase hidden sm:inline transition-colors duration-300 group-hover:text-zinc-400">
          Media
        </span>
      </span>
    </Link>
  )
}

function AuditCTA() {
  return (
    <Link
      href="/audit"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50"
      style={{ background: 'linear-gradient(135deg, #7C5BFF 0%, #00D4FF 100%)' }}
    >
      {/* Pulse ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(124,91,255,0.5) 0%, rgba(0,212,255,0.3) 100%)',
          animation: 'auditPulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes auditPulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.28); opacity: 0;   }
          100% { transform: scale(1.28); opacity: 0;   }
        }
      ` }} />
      {/* Shimmer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)' }}
      />
      {/* Pulse dot */}
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      <span className="relative z-10">Free Site Audit</span>
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(6,6,13,0.88)'
          : 'rgba(6,6,13,0.40)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled
          ? '1px solid rgba(46,46,74,0.6)'
          : '1px solid rgba(46,46,74,0.2)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <BHWLogo />

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 md:flex" role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, #7C5BFF, #00D4FF)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop right CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-full border border-border/50 bg-card/40 px-5 py-2.5 text-sm font-medium text-text-muted transition-all duration-200 hover:border-border hover:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
          >
            Start a Project
          </Link>
          <AuditCTA />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text-primary md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/40"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={open ? 'close' : 'menu'}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{
              background: 'rgba(6,6,13,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              paddingTop: '68px',
            }}
          >
            {/* Subtle gradient accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at top, rgba(124,91,255,0.06) 0%, transparent 60%)' }}
            />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-16">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-semibold transition-colors duration-200 ${
                        active ? 'text-violet' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="my-2 h-px w-full max-w-xs bg-border/30" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35, ease: EASE }}
                className="flex w-full max-w-xs flex-col gap-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full border border-border/50 bg-card py-3 text-center text-base font-medium text-text-muted transition-colors hover:text-text-secondary"
                >
                  Start a Project
                </Link>
                <Link
                  href="/audit"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C5BFF 0%, #00D4FF 100%)' }}
                >
                  Free Site Audit
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
