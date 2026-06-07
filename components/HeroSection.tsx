'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const BADGES = [
  'Trusted by 40+ Global Brands',
  'Avg. Project Delivery: 14 Days',
  '100% Source Code Ownership',
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-mesh-violet opacity-60" />
      <div className="absolute inset-0 bg-mesh-cyan opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.15em] text-cyan"
            >
              // PREMIUM WEB PRODUCTION STUDIO
            </motion.span>

            <h1 className="mt-5 font-bold leading-[1.05] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
                className="block text-text-primary"
                style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
              >
                We Build Websites
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                className="block bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent"
                style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
              >
                That Convert.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
            >
              From immersive SaaS platforms to high-ticket brand launches — BHW
              Media engineers digital experiences that command attention, build
              trust, and drive revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/portfolio"
                className="rounded-full bg-violet px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,91,255,0.5)]"
              >
                View Our Work
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-border px-8 py-4 font-semibold text-text-secondary transition-all duration-200 hover:border-violet hover:text-violet"
              >
                Explore Services →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 text-sm text-text-muted"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-violet" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Floating mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE }}
            className="relative hidden justify-self-end lg:block"
          >
            <div className="absolute inset-0 -z-10 bg-violet/10 blur-3xl" />
            <div className="animate-float shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              {/* Title bar */}
              <div className="flex h-8 items-center gap-1.5 rounded-t-xl bg-card px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              {/* Body */}
              <div className="w-[480px] rounded-b-xl bg-elevated p-4">
                {/* Top nav */}
                <div className="mb-4 flex h-10 items-center gap-3 rounded-lg bg-card px-4">
                  <span className="h-3 w-16 rounded-full bg-border" />
                  <span className="h-3 w-16 rounded-full bg-border" />
                  <span className="h-3 w-16 rounded-full bg-border" />
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-lg border-t-2 border-violet bg-card" />
                  <div className="h-20 rounded-lg border-t-2 border-cyan bg-card" />
                  <div className="h-20 rounded-lg border-t-2 border-gold bg-card" />
                </div>
                {/* Chart */}
                <div className="relative mt-3 flex h-32 items-end gap-2 rounded-lg bg-card p-4">
                  {[40, 65, 35, 80, 55, 90, 70, 100, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-violet"
                      style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.6 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
