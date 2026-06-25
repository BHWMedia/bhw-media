'use client'

import { motion } from 'framer-motion'

const TECH_STACK = [
  { name: 'Next.js 16', color: '#ffffff' },
  { name: 'React 19', color: '#61DAFB' },
  { name: 'Tailwind v4', color: '#38BDF8' },
  { name: 'Framer Motion', color: '#BB4AFF' },
  { name: 'TypeScript 5.7', color: '#3178C6' },
  { name: 'Vercel Edge', color: '#ffffff' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Shopify Plus', color: '#96BF48' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'OpenAI API', color: '#74AA9C' },
  { name: 'Upstash Redis', color: '#FF4D4D' },
  { name: 'Zod', color: '#3068B7' },
]

const doubled = [...TECH_STACK, ...TECH_STACK]

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-studio/50 py-12 backdrop-blur-sm">
      {/* Label */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="relative -translate-y-1/2">
          <span className="block rounded-full border border-border/40 bg-studio px-4 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-violet">
            // Production Stack
          </span>
        </div>
      </div>

      {/* Track */}
      <div className="flex" aria-hidden="true">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
          className="flex flex-none items-center gap-12 pr-12"
        >
          {doubled.map((item, i) => (
            <div key={i} className="group flex cursor-default items-center gap-2.5 whitespace-nowrap opacity-30 transition-all duration-300 hover:opacity-100">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-300"
                style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
              <span className="font-mono text-xs font-medium tracking-wider text-text-secondary transition-colors duration-300 group-hover:text-text-primary"
                style={{ '--accent': item.color } as React.CSSProperties}>
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge fades */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-studio to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-studio to-transparent" />
    </section>
  )
}
