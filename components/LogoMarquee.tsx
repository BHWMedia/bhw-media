import { MARQUEE_BRANDS } from '@/lib/constants'

export function LogoMarquee() {
  const items = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS]
  return (
    <section className="border-y border-border/30 bg-studio/50 py-8">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {items.map((brand, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-sm font-medium uppercase tracking-widest text-text-muted">
                {brand}
              </span>
              <span className="text-violet">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
