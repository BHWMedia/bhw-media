// app/audit/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { AuditWizard } from '@/components/AuditWizard'
import { ScrollAnimateWrapper } from '@/components/ScrollAnimateWrapper'

export const metadata: Metadata = {
  title: 'Free Core Web Vitals & Conversion Audit | BHW Media',
  description:
    'Get a free, personalized diagnostic report identifying your biggest performance bottlenecks and conversion gaps. Delivered within 24 hours by BHW Media engineers.',
  openGraph: {
    title: 'Free Core Web Vitals & Conversion Audit | BHW Media',
    description:
      'Get a free, personalized diagnostic report identifying your biggest performance bottlenecks and conversion gaps. Delivered within 24 hours by BHW Media engineers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Core Web Vitals & Conversion Audit | BHW Media',
    description:
      'Get a free, personalized diagnostic report identifying your biggest performance bottlenecks and conversion gaps. Delivered within 24 hours by BHW Media engineers.',
  },
}

const TRUST_SIGNALS = [
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'No credit card required',
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Delivered within 24 hours',
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Zero spam. Unsubscribe anytime.',
  },
]

const METRIC_NODES = [
  {
    value: '40+',
    label: 'Audits Delivered',
    accent: 'text-violet',
  },
  {
    value: '98',
    label: 'Avg. Lighthouse Score',
    accent: 'text-cyan',
  },
  {
    value: '14d',
    label: 'Avg. Fix Turnaround',
    accent: 'text-gold',
  },
]

export default function AuditPage() {
  return (
    <main className="relative min-h-screen bg-void overflow-hidden">
      {/* ── Ambient backdrop layers ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-mesh-violet opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-mesh-cyan opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial center bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] blur-3xl opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(124,91,255,0.6) 0%, transparent 65%)',
        }}
      />

      {/* ── Minimal nav strip ───────────────────────────────────────────────── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="BHW Media — return to homepage"
        >
          <span className="text-violet text-xl leading-none drop-shadow-[0_0_8px_rgba(124,91,255,0.8)] transition-opacity duration-200 group-hover:opacity-80">
            ●
          </span>
          <span className="font-bold text-lg tracking-tight text-text-primary">
            BHW
          </span>
        </Link>

        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-elevated px-4 py-2 text-xs font-medium text-text-secondary transition-all duration-200 hover:border-violet/50 hover:text-violet"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Full Project Inquiry
        </Link>
      </nav>

      {/* ── Page body ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:items-start">

          {/* ── Left column: headline + value prop ──────────────────────────── */}
          <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.7}>
            <div className="lg:pt-6">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-cyan animate-pulse"
                  aria-hidden="true"
                />
                Free Diagnostic — No Obligation
              </span>

              {/* Headline */}
              <h1
                className="mt-5 font-bold tracking-tight text-text-primary leading-[1.08]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
              >
                Your website is leaving
                <br />
                <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
                  revenue on the table.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
                In under 3 minutes, tell us your URL and biggest friction point.
                Our engineering team delivers a custom diagnostic — Lighthouse breakdown,
                conversion architecture gaps, and a prioritized fix list — within 24 hours.
              </p>

              {/* Trust signals */}
              <ul className="mt-7 flex flex-col gap-2.5" aria-label="Audit guarantees">
                {TRUST_SIGNALS.map((sig) => (
                  <li
                    key={sig.label}
                    className="flex items-center gap-3 text-sm text-text-muted"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet">
                      {sig.icon}
                    </span>
                    {sig.label}
                  </li>
                ))}
              </ul>

              {/* Metric nodes — desktop only */}
              <div className="mt-12 hidden lg:grid grid-cols-3 gap-5">
                {METRIC_NODES.map((node) => (
                  <div
                    key={node.label}
                    className="rounded-2xl border border-border/40 bg-elevated p-5"
                  >
                    <p className={`text-3xl font-bold tracking-tight ${node.accent}`}>
                      {node.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                      {node.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social proof micro-strip */}
              <div className="mt-8 hidden lg:flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['MW', 'PN', 'JO', 'SM', 'DC'].map((initials) => (
                    <div
                      key={initials}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-elevated font-semibold text-[10px] text-violet"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted">
                  <span className="font-semibold text-text-primary">40+ brands</span> already audited this quarter
                </p>
              </div>
            </div>
          </ScrollAnimateWrapper>

          {/* ── Right column: AuditWizard ────────────────────────────────────── */}
          <ScrollAnimateWrapper preset="fadeUp" delay={0.12} duration={0.7}>
            <div className="lg:sticky lg:top-24">
              <AuditWizard />

              {/* Micro-strip below form */}
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Prefer to talk directly?{' '}
                <a
                  href="https://calendly.com/mediabhw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet underline underline-offset-4 transition-colors duration-200 hover:text-violet-light"
                >
                  Book a live call →
                </a>
              </p>
            </div>
          </ScrollAnimateWrapper>
        </div>

        {/* ── Mobile metric nodes ─────────────────────────────────────────────── */}
        <ScrollAnimateWrapper preset="fadeUp" delay={0.18} duration={0.6} className="mt-10 lg:hidden">
          <div className="grid grid-cols-3 gap-3">
            {METRIC_NODES.map((node) => (
              <div
                key={node.label}
                className="rounded-2xl border border-border/40 bg-elevated p-4 text-center"
              >
                <p className={`text-2xl font-bold tracking-tight ${node.accent}`}>
                  {node.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {node.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimateWrapper>
      </div>

      {/* ── Minimal footer strip ────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border/30 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6">
          <p className="font-mono text-[11px] text-text-muted">
            © {new Date().getFullYear()} BHW Media. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/portfolio"
              className="font-mono text-[11px] text-text-muted transition-colors duration-200 hover:text-violet"
            >
              Portfolio
            </Link>
            <Link
              href="/services"
              className="font-mono text-[11px] text-text-muted transition-colors duration-200 hover:text-violet"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[11px] text-text-muted transition-colors duration-200 hover:text-violet"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}