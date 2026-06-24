'use client'

import { motion } from 'framer-motion'
import { MARQUEE_BRANDS } from '@/lib/constants'

export function LogoMarquee() {
  const doubled = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS]

  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-studio/60 py-14 backdrop-blur-sm">
      {/* Section label */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="relative -translate-y-1/2">
          <span className="block rounded-full border border-border/40 bg-studio px-4 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-violet">
            // Core Engineering Stack
          </span>
        </div>
      </div>

      {/* Marquee track */}
      <div className="flex" aria-hidden="true">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 42,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex flex-none items-center gap-14 pr-14"
        >
          {doubled.map((brand, i) => (
            <div
              key={i}
              className="group flex cursor-default items-center gap-3 opacity-35 transition-all duration-300 hover:opacity-100"
            >
              {/* Mini dot accent */}
              <span
                className="h-1 w-1 flex-shrink-0 rounded-full bg-violet/60 transition-colors duration-300 group-hover:bg-violet"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-mono text-sm font-medium tracking-wider text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-studio to-transparent"
        style={{ opacity: 0.85 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-studio to-transparent"
        style={{ opacity: 0.85 }}
      />
    </section>
  )
}
