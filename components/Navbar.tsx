'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// Mocking constants locally if @/lib/constants is structured differently
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' }
]

function AuditIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function AuditCTADesktop() {
  return (
    <Link
      href="/audit"
      className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-transform active:scale-[0.98]"
      style={{
        background: 'linear-gradient(135deg, #7C5BFF 0%, #00D4FF 100%)',
      }}
    >
      {/* Pulse ring animation via CSS style injection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(124,91,255,0.4) 0%, rgba(0,212,255,0.2) 100%)',
          animation: 'auditPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes auditPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.25); opacity: 0;   }
          100% { transform: scale(1.25); opacity: 0;   }
        }
      `}} />
      <AuditIcon size={14} />
      <span className="relative z-10">Free Site Audit</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />
    </Link>
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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.7)] bg-black/90' : ''
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">

        {/* Brand Mark Logo Implementation */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-white group"
          onClick={() => setOpen(false)}
        >
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
          <span className="tracking-tight text-white font-bold">BHW</span>
          <span className="text-zinc-500 font-normal text-xs tracking-widest uppercase hidden sm:inline transition-colors group-hover:text-zinc-400">
            Media
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide font-medium transition-colors duration-200 hover:text-[#7C5BFF] ${
                  active ? 'text-[#7C5BFF]' : 'text-zinc-400'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop Right Conversion CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full border border-zinc-800 bg-zinc-950/40 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-800"
          >
            Start a Project
          </Link>
          <AuditCTADesktop />
        </div>

        {/* Hamburger Control */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 text-zinc-400 transition-colors hover:text-white md:hidden p-2 rounded-lg"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-black/98 backdrop-blur-2xl md:hidden px-6 pt-[72px]"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-12">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-2xl font-semibold transition-colors ${
                      active ? 'text-[#7C5BFF]' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="w-full max-w-xs h-px bg-zinc-900 my-2" />

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full max-w-xs text-center rounded-full border border-zinc-800 bg-zinc-900/50 py-3 text-base font-medium text-zinc-300"
              >
                Start a Project
              </Link>

              <Link
                href="/audit"
                onClick={() => setOpen(false)}
                className="w-full max-w-xs text-center inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white shadow-[0_0_40px_rgba(124,91,255,0.3)]"
                style={{
                  background: 'linear-gradient(135deg, #7C5BFF 0%, #00D4FF 100%)',
                }}
              >
                <AuditIcon size={16} />
                Free Site Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}