import type { ServiceDetail } from '@/lib/constants'

export function ServiceVisual({
  type,
}: {
  type: ServiceDetail['visual']
}) {
  switch (type) {
    case 'lighthouse':
      return (
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-elevated px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-text-muted">
              yourbrand.com
            </span>
          </div>
          <div className="flex items-center justify-center py-4">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background:
                  'conic-gradient(#22c55e 0% 98%, #22222e 98% 100%)',
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-card">
                <span className="text-3xl font-bold text-green-500">98</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Performance
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Accessibility', 'Best Practices', 'SEO'].map((l) => (
              <div key={l} className="text-center">
                <div className="text-lg font-semibold text-green-500">100</div>
                <div className="font-mono text-[10px] text-text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'dashboard':
      return (
        <div className="flex gap-3 rounded-2xl border border-border/50 bg-card p-5">
          <div className="flex w-16 flex-col gap-2">
            <div className="h-3 w-full rounded bg-violet/60" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-2.5 w-full rounded bg-elevated" />
            ))}
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 rounded-lg border-t-2 border-violet bg-elevated" />
              <div className="h-14 rounded-lg border-t-2 border-cyan bg-elevated" />
              <div className="h-14 rounded-lg border-t-2 border-gold bg-elevated" />
            </div>
            <div className="relative mt-3 flex h-28 items-end gap-1.5 rounded-lg bg-elevated p-3">
              {[50, 70, 45, 85, 60, 95, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-cyan"
                  style={{ height: `${h}%`, opacity: 0.4 + (h / 100) * 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      )

    case 'palette':
      return (
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { c: '#7C5BFF', n: 'Violet 500' },
              { c: '#00D4FF', n: 'Cyan 400' },
              { c: '#F5A623', n: 'Gold 500' },
              { c: '#FF4D6D', n: 'Crimson' },
              { c: '#1A1A24', n: 'Card' },
              { c: '#FFFFFF', n: 'White' },
            ].map((s) => (
              <div key={s.n}>
                <div
                  className="h-16 w-full rounded-xl border border-border/50"
                  style={{ backgroundColor: s.c }}
                />
                <p className="mt-2 font-mono text-[11px] text-text-muted">
                  {s.n}
                </p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'product':
      return (
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mx-auto max-w-[240px]">
            <div className="h-40 w-full rounded-xl bg-elevated" />
            <div className="mt-4 h-3 w-3/4 rounded-full bg-border" />
            <div className="mt-2 h-3 w-1/2 rounded-full bg-border/60" />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-text-primary">
                $189.00
              </span>
              <span className="rounded-full bg-violet px-4 py-2 text-xs font-medium text-white">
                Add to Cart
              </span>
            </div>
          </div>
        </div>
      )

    case 'timeline':
      return (
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="space-y-4">
            {['Intro', 'Reveal', 'Loop'].map((label, row) => (
              <div key={label}>
                <p className="mb-2 font-mono text-[11px] text-text-muted">
                  {label}
                </p>
                <div className="relative h-8 rounded-lg bg-elevated">
                  {[10, 35, 60, 80].map((pos, i) => (
                    <span
                      key={i}
                      className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm"
                      style={{
                        left: `${pos + row * 4}%`,
                        backgroundColor:
                          i % 2 === 0 ? '#7C5BFF' : '#00D4FF',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'kanban':
      return (
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { t: 'To Do', n: 3 },
              { t: 'In Progress', n: 2 },
              { t: 'Done', n: 4 },
            ].map((col) => (
              <div key={col.t}>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {col.t}
                </p>
                <div className="space-y-2">
                  {Array.from({ length: col.n }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border/50 bg-elevated p-2.5"
                    >
                      <div className="h-2 w-full rounded-full bg-border" />
                      <div className="mt-1.5 h-2 w-2/3 rounded-full bg-border/60" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}
