import { ServicesGrid } from '@/components/ServicesGrid'
import { HeroSection } from '@/components/HeroSection'
import { LogoMarquee } from '@/components/LogoMarquee'
import { StatsBanner } from '@/components/StatsBanner'
import { ValidationsBar } from '@/components/ValidationsBar'
import { ProcessSection } from '@/components/ProcessSection'
import { CtaBanner } from '@/components/CtaBanner'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { ScrollAnimateWrapper } from '@/components/ScrollAnimateWrapper'
import { MetricsShowcase } from '@/components/MetricsShowcase'
import { TechMatrix } from '@/components/TechMatrix'
import { FAQSection } from '@/components/FAQSection'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-void text-text-primary overflow-x-hidden">

      {/* ── Hero — internal entrance orchestration management ── */}
      <HeroSection />

      {/* ── Logo Marquee — core identity stack ribbon ── */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-48px">
        <LogoMarquee />
      </ScrollAnimateWrapper>

      {/* ── Metrics Showcase — objective verification layer ── */}
      <MetricsShowcase />

      {/* ── Tech Matrix — technological stack conversion layer ── */}
      <TechMatrix />

      {/* ── Services Layout Layer ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
              // What We Do
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Services built for high-performance brands.
            </h2>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <ServicesGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── Stats Telemetry Banner ── */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-60px">
        <StatsBanner />
      </ScrollAnimateWrapper>

      {/* ── Trust Validations Bar ── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
        <ValidationsBar />
      </ScrollAnimateWrapper>

      {/* ── Core Production Process Pipeline ── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.7} margin="-72px">
        <ProcessSection />
      </ScrollAnimateWrapper>

      {/* ── Premium Engineering Portfolio Grid ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
              // Selected Work
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Platforms that command attention.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Every engagement is custom-scoped and production-engineered from scratch.
              No templates. No shortcuts.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <PortfolioGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── Testimonials Social Proof Matrix ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
              // Client Results
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Proof in their words.
            </h2>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <TestimonialsGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── FAQ Objection Mitigation Matrix ── */}
      <FAQSection />

      {/* ── Closure CTA Pitch Banner ── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
        <CtaBanner />
      </ScrollAnimateWrapper>

    </main>
  )
}