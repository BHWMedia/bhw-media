'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// ─── Static data ──────────────────────────────────────────────────────────────

const serviceLinks = [
  { label: 'Web Design & Development', href: '/services' },
  { label: 'SaaS Product Design', href: '/services' },
  { label: 'Brand Identity', href: '/services' },
  { label: 'E-Commerce Builds', href: '/services' },
  { label: 'Motion & Interaction', href: '/services' },
  { label: 'Growth Retainer Plans', href: '/services' },
]

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/services#pricing' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    Icon: ({ size }: { size: number }) => (
      <svg
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
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    Icon: ({ size }: { size: number }) => (
      <svg
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
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/bhwmedia',
    Icon: ({ size }: { size: number }) => (
      <svg
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/media._bhw',
    Icon: ({ size }: { size: number }) => (
      <svg
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-studio border-t border-border/50 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-5 group"
            >
              <span className="text-lg leading-none text-violet transition-opacity duration-200 group-hover:opacity-80">
                ●
              </span>
              <span className="font-bold text-xl tracking-tight text-text-primary">
                BHW MEDIA
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-text-muted mb-6 max-w-[200px]">
              Premium web design and digital production for brands that demand excellence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-elevated border border-border/60 text-text-muted transition-all duration-200 hover:text-violet hover:border-violet/50 hover:bg-card focus:outline-none focus:ring-2 focus:ring-violet/50"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Services ── */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-5">
              Services
            </p>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary transition-colors duration-200 hover:text-violet focus:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Company ── */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-5">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary transition-colors duration-200 hover:text-violet focus:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-5">
              Get In Touch
            </p>

            <a
              href="mailto:mediabhw@gmail.com"
              className="block text-sm text-text-secondary mb-2 transition-colors duration-200 hover:text-violet"
            >
              mediabhw@gmail.com
            </a>

            <a
              href="https://instagram.com/media._bhw"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-muted mb-7 transition-colors duration-200 hover:text-violet"
            >
              @media._bhw
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet transition-colors duration-200 hover:text-violet-light focus:outline-none"
            >
              Start a project
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40">
          <p className="text-xs text-text-muted" suppressHydrationWarning>
            © {new Date().getFullYear()} BHW Media. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with Next.js &amp; Framer Motion · Deployed on Vercel
          </p>
        </div>

      </div>
    </footer>
  )
}