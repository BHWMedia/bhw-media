'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import { ServiceVisual } from '@/components/ServiceVisual'
import { PricingSection } from '@/components/PricingSection'
import { SERVICE_DETAILS, type AccentColor } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
}

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function ServicesPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-violet opacity-50" />
        <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-6xl flex-col justify-center px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
            // SERVICES
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Digital craft at every layer.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Each engagement is custom-scoped. Below are the disciplines
            we&apos;ve mastered — and the results they produce.
          </p>
        </div>
      </section>

      {/* Detail sections */}
      <div className="mx-auto max-w-6xl space-y-24 px-6 py-16">
        {SERVICE_DETAILS.map((service, i) => {
          const Icon = ICONS[service.icon]
          const reversed = i % 2 === 1
          return (
            <motion.section
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Copy */}
              <div className={reversed ? 'lg:order-2' : ''}>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-elevated ${ACCENT_TEXT[service.accent]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={reversed ? 'lg:order-1' : ''}>
                <ServiceVisual type={service.visual} />
              </div>
            </motion.section>
          )
        })}
      </div>

      <PricingSection />
    </main>
  )
}
