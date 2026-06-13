// app/privacy/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | BHW Media',
  description:
    'BHW Media Privacy Policy — outlining data governance architecture, zero-tracker cookie configurations, telemetry data limits, and client data sovereignty.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'June 2026'

interface SectionProps {
  num: string
  title: string
  children: React.ReactNode
}

function Section({ num, title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-xs text-text-muted shrink-0">{num}</span>
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{title}</h2>
      </div>
      <div className="pl-8 space-y-4 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-void pt-28 pb-24">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-mesh-violet opacity-25"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
            // Data Sovereignty & Integrity
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-text-muted font-mono">
            Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Jurisdiction: England & Wales
          </p>
          <div className="mt-6 p-4 rounded-xl border border-violet/20 bg-violet/5">
            <p className="text-sm text-text-secondary leading-relaxed">
              At BHW Media (&ldquo;Agency&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), privacy is engineered directly into our 
              technical architectures. This Policy describes how we collect, store, and process signals 
              and metadata when you interact with our primary ecosystem, including bhw-media.vercel.app, 
              the Audit Wizard, and our localized telemetry systems.
            </p>
          </div>
        </div>

        <div
          className="h-px w-full mb-12"
          style={{ background: 'linear-gradient(to right, transparent, rgba(58,58,78,0.6), transparent)' }}
        />

        <Section num="01" title="Data Collection Framework">
          <p>
            We adhere rigorously to principles of data minimization. We do not engage in broad contextual 
            harvesting. We collect data explicitly through two distinct vector channels:
          </p>
          <div className="space-y-3 mt-4">
            <div className="rounded-xl border border-border/30 bg-card p-4">
              <p className="font-semibold text-text-primary text-sm mb-1.5">User-Initiated Submissions</p>
              <p className="text-sm text-text-muted leading-relaxed">
                When you initiate a project brief or interact with the Audit Wizard (/audit), we collect explicit properties: organization name, email addresses, operational assets, design system states, and project parameters necessary to compile your Project Specification Document (PSD).
              </p>
            </div>
            <div className="rounded-xl border border-border/30 bg-card p-4">
              <p className="font-semibold text-text-primary text-sm mb-1.5">Automated Technical Infrastructure</p>
              <p className="text-sm text-text-muted leading-relaxed">
                Our hosting engine (Vercel) automatically processes standard networking logs including localized IP headers, system user-agents, edge node locations, and runtime performance diagnostics to guarantee rapid payload deliveries.
              </p>
            </div>
          </div>
        </Section>

        <Section num="02" title="Utilization of Collected Signals">
          <p>
            The captured data streams are strictly containerized and used solely to advance the functional 
            parameters of your interaction with BHW Media:
          </p>
          <ul className="space-y-2 mt-3">
            {[
              'Generating custom project pricing nodes and milestone structures for your PSD.',
              'Executing deep interface audits and rendering localized technical benchmarks within the client engine.',
              'Routing transactional notifications and direct legal communications concerning your active digital production retainers.',
              'Mitigating system attacks, brute-force routing vectors, or un-authorized asset scraping across our preview platforms.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-violet mt-1 shrink-0 text-xs">▲</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="03" title="Cookie & Local Storage Architecture">
          <p>
            Our deployment runs on a zero-tracking framework. We operate entirely independent of third-party advertising cookies, multi-site pixels, or dynamic device fingerprinting arrays. 
          </p>
          <p className="mt-3">
            To satisfy specific compliance frameworks, we leverage sandboxed state identifiers within your local browser:
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated overflow-hidden">
            {[
              ['bhw_cookie_consent', 'LocalStorage', 'Records consent state flags ("accepted" / "declined") to isolate banner animations on future visits.'],
              ['__vercel_live_token', 'Session Cookie', 'Maintains optional core edge-collaboration parameters during platform demonstrations.'],
              ['_session_routing_sig', 'Cryptographic State', 'Protects stateless form entries from cross-site request forgery attacks (CSRF).'],
            ].map(([keyName, mechanism, definition]) => (
              <div
                key={keyName}
                className="grid grid-cols-[160px_100px_1fr] gap-4 px-5 py-3.5 border-b border-border/20 last:border-0 text-sm"
              >
                <span className="text-text-primary font-mono text-xs font-medium self-start">{keyName}</span>
                <span className="font-mono text-cyan text-xs self-start">{mechanism}</span>
                <span className="text-text-secondary text-xs">{definition}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section num="04" title="Sub-Processor Systems & Infrastructure Links">
          <p>
            We utilize third-party architectures to process code, assets, routing layers, and infrastructure functions. These third parties maintain strict individual compliance profiles and operate with sandboxed data structures:
          </p>
          <ul className="space-y-2 mt-3 text-xs font-mono grid grid-cols-2 gap-x-4 gap-y-1 pl-0">
            {[
              'Vercel Inc. — Edge Infrastructure & Serverless Functions',
              'Supabase Inc. — Cryptographic Database Middleware',
              'Resend Inc. — Transactional Mail Relays',
              'Upstash Inc. — Volatile Cache Layers',
              'Make.com — Operational Workflow Pipelines',
              'Shopify Inc. — Headless E-commerce sandboxes',
            ].map((processor) => (
              <li key={processor} className="flex items-center gap-2">
                <span className="text-violet">::</span>
                <span className="text-text-secondary">{processor}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="05" title="Data Sovereignty & Retention Lifecycles">
          <p>
            Client details submitted via form components are automatically scrubbed or compiled into secure offline document pools within 90 days if an active Project Specification Document does not mature into a binding agreement.
          </p>
          <p>
            For retained clients, project assets are containerized throughout the lifecycle of the active sprint or growth retainer. Upon final payment and source code handover under Section 04 of our Terms, you hold total data sovereignty over data stores engineered directly inside your tailored infrastructure.
          </p>
        </Section>

        <Section num="06" title="Statutory Rights & Jurisdiction Compliance">
          <p>
            Under the General Data Protection Regulation (GDPR) and the UK Data Protection Act, you maintain foundational assertions regarding your digital attributes: the right to review structural telemetry logs, demand complete records extraction, or enforce irreversible record erasure. 
          </p>
          <p>
            To activate any provision regarding your data, or if you believe your infrastructure credentials have been exposed across a shared development system, route a technical query directly to our secure intake hub below.
          </p>
        </Section>

        {/* Contact strip */}
        <div className="mt-16 p-8 rounded-2xl border border-border/40 bg-elevated text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted mb-3">
            Secure Privacy Desk
          </p>
          <a
            href="mailto:mediabhw@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-light hover:shadow-[0_0_24px_rgba(124,91,255,0.4)]"
          >
            Contact Privacy Officer →
          </a>
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center gap-4 text-xs text-text-muted">
          <Link href="/" className="hover:text-violet transition-colors">Home</Link>
          <span>/</span>
          <span className="text-text-secondary">Privacy Policy</span>
          <span className="ml-auto">
            <Link href="/terms" className="hover:text-violet transition-colors">
              Terms of Service →
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}