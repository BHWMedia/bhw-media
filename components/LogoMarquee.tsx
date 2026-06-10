'use client'

import { motion } from 'framer-motion'
import { MARQUEE_BRANDS } from '@/lib/constants'

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden py-16 border-y border-white/5 bg-[#05050A]">
      {/* Infrastructure Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#05050A] px-4">
        <span className="text-[10px] font-mono tracking-widest text-[#7C5BFF] uppercase">
          // Core Engineering Stack
        </span>
      </div>

      <div className="flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex flex-none gap-16 pr-16"
        >
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#05050A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#05050A] to-transparent" />
    </section>
  )
}