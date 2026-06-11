// app/page.tsx
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

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#05050A] text-white overflow-x-hidden">
      {/* ── Hero — manages its own entrance animations internally ── */}
      <HeroSection />

      {/* ── Logo Marquee ─────────────────────────────────────────────────────── */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-48px">
        <LogoMarquee />
      </ScrollAnimateWrapper>

      {/* ── Services Snapshot ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#00D4FF]">
              // What We Do
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Services built for high-performance brands.
            </h2>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <ServicesGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── Stats Banner ─────────────────────────────────────────────────────── */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-60px">
        <StatsBanner />
      </ScrollAnimateWrapper>

      {/* ── Validations Bar ──────────────────────────────────────────────────── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
        <ValidationsBar />
      </ScrollAnimateWrapper>

      {/* ── Process Section ──────────────────────────────────────────────────── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.7} margin="-72px">
        <ProcessSection />
      </ScrollAnimateWrapper>

      {/* ── Portfolio / Case Studies ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#00D4FF]">
              // Selected Work
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Platforms that command attention.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#7A7A94]">
              Every engagement is custom-scoped and production-engineered from scratch.
              No templates. No shortcuts.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <PortfolioGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── Testimonials Grid — Social Proof Layer ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-72px">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#00D4FF]">
              // Client Results
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Proof in their words.
            </h2>
          </div>
        </ScrollAnimateWrapper>

        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-72px">
          <TestimonialsGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
        <CtaBanner />
      </ScrollAnimateWrapper>
    </main>
  )
}