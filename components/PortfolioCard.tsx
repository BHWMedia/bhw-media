import type { PortfolioItem, AccentColor } from '@/lib/constants'

const ACCENT_BORDER: Record<AccentColor, string> = {
  violet: 'border-violet',
  cyan: 'border-cyan',
  gold: 'border-gold',
  crimson: 'border-crimson',
}

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

function Mockup({ item }: { item: PortfolioItem }) {
  switch (item.mockupType) {
    case 'dashboard':
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="h-6 rounded bg-card" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded border-t-2 border-violet bg-card" />
            <div className="h-10 rounded border-t-2 border-cyan bg-card" />
            <div className="h-10 rounded border-t-2 border-gold bg-card" />
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded bg-card p-2">
            {[40, 70, 50, 90, 60, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-violet"
                style={{ height: `${h}%`, opacity: 0.4 + (h / 100) * 0.5 }}
              />
            ))}
          </div>
        </div>
      )
    case 'ecommerce':
      return (
        <div className="flex h-full flex-col gap-3 p-5">
          <div className="h-20 flex-1 rounded-lg bg-card" />
          <div className="h-2.5 w-2/3 rounded-full bg-card" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text-primary">
              $149.00
            </span>
            <span className="rounded-full bg-violet px-3 py-1 text-[10px] font-medium text-white">
              Add to Cart
            </span>
          </div>
        </div>
      )
    case 'web3':
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-5">
          <div
            className={`flex h-14 w-14 rotate-45 items-center justify-center rounded-lg border-2 ${ACCENT_BORDER[item.color]} bg-card`}
          >
            <div
              className={`h-6 w-6 -rotate-45 rounded ${ACCENT_TEXT[item.color]}`}
              style={{ backgroundColor: 'currentColor', opacity: 0.4 }}
            />
          </div>
          <span className="font-mono text-xs text-text-muted">
            0x7c…5bff
          </span>
          <span className="font-mono text-sm font-semibold text-text-primary">
            1,240.5 ETH
          </span>
        </div>
      )
    case 'brand':
      return (
        <div className="flex h-full items-center justify-center p-5">
          <span
            className={`text-balance text-center text-3xl font-bold ${ACCENT_TEXT[item.color]}`}
          >
            {item.title}
          </span>
        </div>
      )
    case 'saas':
      return (
        <div className="flex h-full gap-3 p-4">
          <div className="flex w-12 flex-col gap-2">
            <div className="h-2.5 rounded bg-card" />
            <div className="h-2.5 rounded bg-card" />
            <div className="h-2.5 rounded bg-card" />
            <div className="h-2.5 rounded bg-card" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-8 rounded bg-card" />
            <div className="h-16 rounded bg-card" />
            <div className="h-6 w-2/3 rounded bg-card" />
          </div>
        </div>
      )
    case 'finance':
      return (
        <div className="flex h-full flex-col gap-2 p-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded bg-card px-3 py-1.5"
            >
              <span className="font-mono text-[10px] text-text-muted">
                0{i + 1}
              </span>
              <div className="h-2 flex-1 rounded-full bg-elevated" />
              <span className="font-mono text-[10px] text-gold">
                ${(i + 1) * 1240}
              </span>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Visual area */}
      <div
        className={`relative h-52 border-b-2 bg-elevated ${ACCENT_BORDER[item.color]}`}
      >
        <Mockup item={item} />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-void/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-violet px-5 py-2 text-sm font-medium text-white">
            View Project →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
        <p className="mb-3 mt-1 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-elevated px-2.5 py-1 font-mono text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
