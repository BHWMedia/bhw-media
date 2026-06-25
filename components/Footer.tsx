'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

function AuditIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

const NAV_COLUMN = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

const CONVERSION_COLUMN = [
  {
    label: 'Instant Site Audit',
    href: '/audit',
    description: 'Free performance diagnostic. Delivered in 24h.',
    highlight: true,
    Icon: AuditIcon,
  },
  {
    label: 'Start a Project',
    href: '/contact',
    description: 'Full brief — scoped within 24h.',
    highlight: false,
    Icon: ArrowUpRight,
  },
  {
    label: 'Email Directly',
    href: 'mailto:mediabhw@gmail.com',
    description: 'mediabhw@gmail.com',
    highlight: false,
    Icon: MailIcon,
  },
]

const LEGAL_COLUMN = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const SOCIAL_LINKS = [
  { Icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { Icon: TwitterIcon, href: 'https://twitter.com/mediabhw', label: 'Twitter / X' },
  { Icon: LinkedinIcon, href: 'https://linkedin.com/company/bhwmedia', label: 'LinkedIn' },
  { Icon: InstagramIcon, href: 'https://instagram.com/media._bhw', label: 'Instagram' },
  { Icon: YoutubeIcon, href: 'https://youtube.com/@bhwmedia', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-zinc-900 bg-black">
      {/* Visual Accent Rule Line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.4) 30%, rgba(0,212,255,0.3) 70%, transparent)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8 mb-16">
          
          {/* Studio Profile Branding Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-5">
              <span className="relative flex h-5 w-5 flex-shrink-0" aria-hidden="true">
                <span className="absolute right-0 top-0 h-2 w-2 rounded-sm" style={{ backgroundColor: '#3B82F6' }} />
                <span className="absolute bottom-0 left-0 h-3 w-3 rounded-sm" style={{ backgroundColor: '#1D4ED8' }} />
              </span>
              <span className="font-bold text-lg tracking-tight text-white">
                BHW MEDIA
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 mb-4 max-w-[240px]">
              Premium web production and software design built meticulously for enterprise visibility.
            </p>
            <address className="not-italic text-xs leading-relaxed text-zinc-500 mb-6 space-y-1">
              <a href="mailto:mediabhw@gmail.com" className="transition-colors hover:text-violet">
                mediabhw@gmail.com
              </a>
            </address>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Internal Pages Column */}
          <div className="pl-0 md:pl-8">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_COLUMN.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors duration-200 hover:text-[#7C5BFF]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explicit Conversion Access System */}
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              Get Started
            </p>
            <ul className="space-y-4">
              {CONVERSION_COLUMN.map(({ label, href, description, highlight, Icon }) => (
                <li key={label}>
                  <Link href={href} className="group flex flex-col gap-0.5">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                      highlight ? 'text-[#7C5BFF] group-hover:text-cyan-400' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {highlight && (
                        <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5BFF] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C5BFF]" />
                        </span>
                      )}
                      <Icon size={13} />
                      {label}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-normal">
                      {description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Due Diligence Column */}
          <div className="pl-0 md:pl-4">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              Legal
            </p>
            <ul className="space-y-3 mb-6">
              {LEGAL_COLUMN.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-zinc-900 pt-4">
              {['GDPR Compliant', 'CCPA Compliant'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Operational Footer Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {year} BHW Media. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
              All infrastructure operational
            </span>
          </div>

          <p className="text-xs text-zinc-500 font-mono">
            Next.js 16 · Vercel Edge
          </p>
        </div>
      </div>
    </footer>
  )
}