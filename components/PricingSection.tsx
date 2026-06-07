import Link from 'next/link'
import { Check } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'

export function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
          // Pricing
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Transparent pricing. No surprises.
        </h2>
        <p className="mt-4 text-text-secondary">
          Every engagement is custom-scoped, but here&apos;s where most projects
          land.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
              plan.popular
                ? 'border-violet/50 shadow-[0_0_40px_rgba(124,91,255,0.15)]'
                : 'border-border/50'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-8 rounded-full bg-violet/20 px-3 py-1 font-mono text-xs text-violet">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-text-primary">
              {plan.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-text-primary">
                {plan.price}
              </span>
              {plan.price !== 'Custom' && (
                <span className="text-sm text-text-muted">/ project</span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {plan.description}
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-violet text-white hover:shadow-[0_0_30px_rgba(124,91,255,0.5)]'
                  : 'border border-border text-text-secondary hover:border-violet hover:text-violet'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
