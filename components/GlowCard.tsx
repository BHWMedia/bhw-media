'use client'

import type { ReactNode } from 'react'
import type { AccentColor } from '@/lib/constants'

const ACCENT_TEXT: Record<AccentColor, string> = {
  violet: 'text-violet',
  cyan: 'text-cyan',
  gold: 'text-gold',
  crimson: 'text-crimson',
}

export function GlowCard({
  icon,
  title,
  body,
  tag,
  accentColor = 'violet',
}: {
  icon: ReactNode
  title: string
  body: string
  tag: string
  accentColor?: AccentColor
}) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_20px_60px_rgba(124,91,255,0.15)]">
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/8 via-transparent to-cyan/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-elevated ${ACCENT_TEXT[accentColor]}`}
        >
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
          {body}
        </p>
        <p className="font-mono text-xs tracking-wider text-text-muted">{tag}</p>
      </div>
    </div>
  )
}
