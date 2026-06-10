import { ServicesGrid } from '@/components/ServicesGrid'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { HeroSection } from '@/components/HeroSection'
import { LogoMarquee } from '@/components/LogoMarquee'
import { StatsBanner } from '@/components/StatsBanner'
import { ValidationsBar } from '@/components/ValidationsBar'
import { ProcessSection } from '@/components/ProcessSection'
import { CtaBanner } from '@/components/CtaBanner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LogoMarquee />

      {/* Services Snapshot */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
            // What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Services built for high-performance brands.
          </h2>
        </div>
        <ServicesGrid />
      </section>

      <StatsBanner />
      
      {/* Step 8 Core Component Integration */}
      <ValidationsBar />
      
      <ProcessSection />

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
            // Client Results
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Proof in their words.
          </h2>
        </div>
        <TestimonialsCarousel />
      </section>

      <CtaBanner />
    </main>
  )
}