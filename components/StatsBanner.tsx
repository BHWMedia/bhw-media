import { AnimatedCounter } from '@/components/AnimatedCounter'

const STATS = [
  { target: 40, suffix: '+', label: 'Brands Delivered' },
  { target: 14, suffix: ' Days', label: 'Avg. Project Delivery' },
  { target: 100, suffix: '%', label: 'Source Code Ownership' },
]

export function StatsBanner() {
  return (
    <section className="border-y border-border/30 bg-studio/50 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 text-center sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
