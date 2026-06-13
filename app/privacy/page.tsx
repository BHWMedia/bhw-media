import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | BHW Media',
  description:
    'BHW Media Privacy Policy — how we collect, process, and protect your data across our digital production platforms and client intake pipelines.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'June 2026'
const CANONICAL_ORIGIN = 'https://bhw-media.vercel.app'

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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 py-3 border-b border-border/30">
      <span className="font-mono text-xs text-text-muted uppercase tracking-wider self-start pt-0.5">
        {label}
      </span>
      <span className="text-sm text-text-secondary">{value}</span>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-void pt-28 pb-24">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-void opacity-30"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
            // Legal Architecture
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-text-muted font-mono">
            Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective immediately upon publication
          </p>
          <div className="mt-6 p-4 rounded-xl border border-cyan/20 bg-cyan/5">
            <p className="text-sm text-text-secondary leading-relaxed">
              BHW Media (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates{' '}
              <a
                href={CANONICAL_ORIGIN}
                className="text-cyan hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                bhw-media.vercel.app
              </a>{' '}
              and associated digital production platforms. This policy governs all personal data
              collected through our intake pipelines, contact forms, audit request engines, and
              client project portals. We are committed to GDPR (EU 2016/679), UK GDPR, and CCPA
              compliance.
            </p>
          </div>
        </div>

        {/* Separator utilizing native Tailwind v4 tokens instead of hardcoded inline styles */}
        <div className="h-px w-full mb-12 bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Section 1 */}
        <Section num="01" title="Data Controller Identity">
          <p>
            The data controller responsible for your personal information is BHW Media,
            operating as a premium web design and digital production studio. All data
            governance inquiries must be directed to our primary contact node:
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated p-5">
            <DataRow label="Entity" value="BHW Media" />
            <DataRow label="Contact Email" value="mediabhw@gmail.com" />
            <DataRow label="Platform URL" value="bhw-media.vercel.app" />
            <DataRow label="Social Handle" value="@media._bhw (Instagram)" />
          </div>
        </Section>

        {/* Section 2 */}
        <Section num="02" title="Data Ingestion Pathways">
          <p>
            We collect personal data exclusively through the following structured intake
            channels. No passive tracking infrastructure (e.g., advertising pixels, behavioral
            fingerprinting, third-party retargeting scripts) is deployed on our platforms.
          </p>

          <div className="mt-4 space-y-3">
            {[
              {
                label: 'Contact Form (app/contact)',
                desc: 'Name, email, company, project type, budget scope, project brief, and optional referral source. Submitted data is validated server-side via Zod schema enforcement before transmission.',
              },
              {
                label: 'Audit Wizard (app/audit)',
                desc: 'Website URL, primary pain point selection (speed / conversion / UI), full name, and email address. Submitted exclusively for free diagnostic delivery.',
              },
              {
                label: 'Cookie Consent Preferences',
                desc: 'A boolean consent signal stored locally in your browser localStorage under the key "bhw_cookie_consent". No server-side cookie data is stored or transmitted.',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border/30 bg-card p-4">
                <p className="font-mono text-xs text-violet mb-2 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 3 */}
        <Section num="03" title="Data Transmission & Processing Pipeline">
          <p>
            Upon form submission, your data traverses the following verified processing stack.
            All transmission occurs over TLS 1.3-encrypted HTTPS channels. No data is sold,
            auctioned, or shared with advertising networks under any circumstances.
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated p-5 space-y-0">
            {[
              ['Form Submission', 'Client browser → Next.js Edge Runtime validation'],
              ['Schema Validation', 'Zod schema enforcement on app/api/contact/route.ts'],
              ['Email Dispatch', 'Resend API → mediabhw@gmail.com (TLS encrypted)'],
              ['CRM Sync (Optional)', 'Make.com webhook → internal project management workspace'],
              ['Rate Limiting', 'Upstash Redis: 3 submissions / IP / hour (sliding window)'],
            ].map(([stage, detail], i) => (
              <div
                key={stage}
                className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b border-border/20 last:border-0"
              >
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider self-start pt-1">
                  {String(i + 1).padStart(2, '0')} {stage}
                </span>
                <span className="text-sm text-text-secondary">{detail}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4 */}
        <Section num="04" title="Legal Basis for Processing (GDPR Article 6)">
          <p>
            We process personal data under the following lawful bases as defined by GDPR
            Article 6:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              ['Letitimate Interest (Art. 6(1)(f))', 'Processing contact and audit request data to respond to genuine business inquiries from prospective clients.'],
              ['Contractual Necessity (Art. 6(1)(b))', 'Processing data required to deliver agreed services under active client engagements.'],
              ['Consent (Art. 6(1)(a))', 'Cookie preference storage is conditional on explicit user consent via our cookie notice component.'],
            ].map(([basis, detail]) => (
              <li key={basis} className="flex gap-3">
                <span className="text-violet mt-1 shrink-0">▲</span>
                <span>
                  <strong className="text-text-primary">{basis}:</strong>{' '}
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Section 5 */}
        <Section num="05" title="Data Retention Schedule">
          <p>
            We retain personal data only for the minimum period necessary to fulfil the purpose
            of collection, unless a longer retention period is required by law.
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated overflow-hidden">
            {[
              ['Contact form submissions', '24 months from receipt, or until project delivery'],
              ['Audit request data', '12 months from diagnostic delivery'],
              ['Email correspondence', '36 months (active client) / 12 months (non-converted)'],
              ['Cookie consent signal', 'Session-scoped localStorage; cleared on browser data deletion'],
            ].map(([category, period]) => (
              <div
                key={category}
                className="grid grid-cols-[1fr_200px] gap-4 px-5 py-3.5 border-b border-border/20 last:border-0"
              >
                <span className="text-sm text-text-secondary">{category}</span>
                <span className="font-mono text-xs text-text-muted text-right self-center">
                  {period}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 6 */}
        <Section num="06" title="Your Rights Under GDPR & CCPA">
          <p>
            Depending on your jurisdiction, you hold the following enforceable rights over
            your personal data. Submit all requests to{' '}
            <a href="mailto:mediabhw@gmail.com" className="text-cyan hover:underline">
              mediabhw@gmail.com
            </a>{' '}
            with subject line &ldquo;Data Rights Request&rdquo;. We respond within 30 calendar days.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['Right of Access', 'Request a complete export of all personal data we hold about you.'],
              ['Right to Erasure', 'Request permanent deletion of all your personal data from our systems.'],
              ['Right to Rectification', 'Correct any inaccurate or incomplete personal data we hold.'],
              ['Right to Restriction', 'Restrict processing of your data while a dispute is resolved.'],
              ['Right to Portability', 'Receive your data in a structured, machine-readable format (JSON/CSV).'],
              ['Right to Object', 'Object to processing based on legitimate interest at any time.'],
            ].map(([right, detail]) => (
              <div
                key={right}
                className="rounded-xl border border-border/30 bg-card p-4"
              >
                <p className="font-semibold text-text-primary text-sm mb-1">{right}</p>
                <p className="text-xs text-text-muted leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 7 */}
        <Section num="07" title="Third-Party Sub-Processors">
          <p>
            We engage the following sub-processors under binding Data Processing Agreements (DPAs):
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated overflow-hidden">
            {[
              ['Vercel Inc.', 'Hosting & Edge Runtime', 'United States', 'EU SCCs'],
              ['Resend Inc.', 'Transactional Email', 'United States', 'EU SCCs'],
              ['Upstash Inc.', 'Rate Limiting (Redis)', 'United States', 'EU SCCs'],
              ['Make.com (Celonis)', 'CRM Webhook Automation', 'European Union', 'GDPR Native'],
            ].map(([name, role, location, mechanism]) => (
              <div
                key={name}
                className="grid grid-cols-[140px_1fr_120px_100px] gap-4 px-5 py-3.5 border-b border-border/20 last:border-0 text-sm"
              >
                <span className="text-text-primary font-medium">{name}</span>
                <span className="text-text-secondary">{role}</span>
                <span className="font-mono text-xs text-text-muted self-center">{location}</span>
                <span className="font-mono text-xs text-cyan self-center">{mechanism}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 8 */}
        <Section num="08" title="Security Architecture">
          <p>
            BHW Media deploys the following technical and organizational security measures
            across all data processing operations:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'All data transmission protected by TLS 1.3 encryption end-to-end.',
              'API endpoints protected by IP-based sliding window rate limiting (Upstash Redis).',
              'Strict server-side input validation via Zod schema enforcement on all intake routes.',
              'No client-side storage of sensitive data beyond explicit consent signals.',
              'Vercel Edge Runtime deployment with automatic DDoS mitigation and WAF protection.',
              'Internal access to form submission data restricted to authenticated personnel only.',
            ].map((measure) => (
              <li key={measure} className="flex items-start gap-3">
                <span className="text-violet mt-1 shrink-0 text-xs">▲</span>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Section 9 */}
        <Section num="09" title="Cookie Policy">
          <p>
            Our platforms use minimal, purpose-limited cookie and local storage mechanisms.
            We do not deploy advertising cookies, cross-site tracking, or third-party analytics
            fingerprinting of any kind.
          </p>
          <div className="mt-4 rounded-xl border border-border/40 bg-elevated overflow-hidden">
            {[
              ['bhw_cookie_consent', 'localStorage', 'Session', 'Records your cookie consent preference. Value: \u201Caccepted\u201D or null.'],
              ['bhw_slb_dismissed', 'sessionStorage', 'Session', 'Records whether you dismissed the sticky lead bar. Clears on tab close.'],
            ].map(([name, type, duration, purpose]) => (
              <div
                key={name}
                className="px-5 py-4 border-b border-border/20 last:border-0"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-xs text-violet">{name}</span>
                  <span className="font-mono text-[10px] text-text-muted px-2 py-0.5 rounded-full border border-border/40">
                    {type}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted">{duration}</span>
                </div>
                <p className="text-sm text-text-secondary">{purpose}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 10 */}
        <Section num="10" title="Policy Amendments">
          <p>
            This policy is reviewed and updated quarterly. Material changes will be communicated
            via the &ldquo;Last Updated&rdquo; timestamp above. Continued use of BHW Media platforms
            following a policy update constitutes acceptance of the revised terms. We do not
            provide individual email notification of policy amendments unless legally required.
          </p>
        </Section>

        {/* Footer CTA strip */}
        <div className="mt-16 p-8 rounded-2xl border border-border/40 bg-elevated text-center">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted mb-3">
            Questions about this policy?
          </p>
          <a
            href="mailto:mediabhw@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-opacity-90 hover:shadow-[0_0_24px_rgba(124,91,255,0.4)]"
          >
            Contact Our Data Team →
          </a>
        </div>

        {/* Breadcrumb nav */}
        <div className="mt-10 flex items-center gap-4 text-xs text-text-muted">
          <Link href="/" className="hover:text-violet transition-colors">
            Home
          </Link>
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