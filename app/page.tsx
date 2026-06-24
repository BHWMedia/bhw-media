import { HeroSection } from '@/components/HeroSection'
import { LogoMarquee } from '@/components/LogoMarquee'
import { MetricsShowcase } from '@/components/MetricsShowcase'
import { TechMatrix } from '@/components/TechMatrix'
import { HorizontalServicesScroll } from '@/components/HorizontalServicesScroll'
import { StatsBanner } from '@/components/StatsBanner'
import { ValidationsBar } from '@/components/ValidationsBar'
import { ProcessSection } from '@/components/ProcessSection'
import { FounderSection } from '@/components/FounderSection'
import { PortfolioCarousel } from '@/components/PortfolioCarousel'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { FAQSection } from '@/components/FAQSection'
import { CtaBanner } from '@/components/CtaBanner'
import { ScrollAnimateWrapper } from '@/components/ScrollAnimateWrapper'
import { AmbientParticleSystem } from '@/components/AmbientParticleSystem'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-void text-text-primary overflow-x-hidden">

      {/* 1 — Hero: Full-viewport kinetic typography + fluid mesh */}
      <HeroSection />

      {/* 2 — Tech stack marquee */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-40px">
        <LogoMarquee />
      </ScrollAnimateWrapper>

      {/* 3 — Glassmorphism metrics cards */}
      <MetricsShowcase />

      {/* 4 — Tech stack pills grid */}
      <TechMatrix />

      {/* 5 — Horizontal scroll services (sticky, 280vh) */}
      <HorizontalServicesScroll />

      {/* 6 — Stats counter row */}
      <ScrollAnimateWrapper preset="fadeIn" delay={0} duration={0.6} margin="-50px">
        <StatsBanner />
      </ScrollAnimateWrapper>

      {/* 7 — Social proof validations */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-50px">
        <ValidationsBar />
      </ScrollAnimateWrapper>

      {/* 8 — Process steps */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.7} margin="-60px">
        <ProcessSection />
      </ScrollAnimateWrapper>

      {/* 9 — Founder / about */}
      <FounderSection />

      {/* 10 — Portfolio carousel */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
        <AmbientParticleSystem count={16} />
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
          <div className="relative mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
              // Selected Work
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Platforms that command attention.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
              Every engagement is custom-scoped and production-engineered from scratch.
              No templates. No shortcuts. Drag or use arrows to explore.
            </p>
          </div>
        </ScrollAnimateWrapper>
        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-60px">
          <PortfolioCarousel />
        </ScrollAnimateWrapper>
      </section>

      {/* 11 — Testimonials */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 overflow-hidden">
        <AmbientParticleSystem count={12} />
        <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-60px">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
              // Client Results
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
              Proof in their words.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
              From seed-stage startups to enterprise SaaS platforms, our clients trust BHW Media to
              deliver market-dominating web architecture.
            </p>
          </div>
        </ScrollAnimateWrapper>
        <ScrollAnimateWrapper preset="fadeUp" delay={0.1} duration={0.7} margin="-60px">
          <TestimonialsGrid />
        </ScrollAnimateWrapper>
      </section>

      {/* 12 — FAQ */}
      <FAQSection />

      {/* 13 — CTA Banner */}
      <ScrollAnimateWrapper preset="fadeUp" delay={0} duration={0.65} margin="-50px">
        <CtaBanner />
      </ScrollAnimateWrapper>

    </main>
  )
}
