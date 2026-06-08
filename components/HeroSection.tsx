'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const BADGES = [
  'Trusted by 40+ Global Brands',
  'Avg. Project Delivery: 14 Days',
  '100% Source Code Ownership',
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#111118]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-mesh-violet opacity-60" />
      <div className="absolute inset-0 bg-mesh-cyan opacity-40" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Column: Premium Value Proposition */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[#3A3A4E]/60 bg-[#1A1A24] px-3 py-1 text-xs text-[#7C5BFF]"
            >
              <Zap size={12} className="fill-[#7C5BFF]" />
              <span>Next-Gen Web Architecture</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              We engineer elite digital platforms that <span className="bg-gradient-to-r from-[#7C5BFF] to-cyan-400 bg-clip-text text-transparent">drive revenue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-6 text-lg leading-relaxed text-[#7A7A94]"
            >
              Stop losing corporate conversions to slow, template-built websites. We architect custom, lightning-fast Next.js infrastructures wrapped in immersive motion design. Built for enterprise positioning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#7C5BFF] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#694ae0] hover:shadow-[0_0_32px_rgba(124,91,255,0.4)]"
              >
                Book Architecture Sprint
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
  href="/portfolio" 
  className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
>
  <span>Explore Live Inventory</span>
  <svg 
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</Link>
            </motion.div>

            {/* Micro-Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {BADGES.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#7A7A94]">
                  <CheckCircle size={14} className="text-[#7C5BFF]" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: High-Ticket Interactive Simulation Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7C5BFF]/30 to-cyan-500/20 blur-xl opacity-40 animate-pulse" />
            
            <div className="relative rounded-2xl border border-[#3A3A4E]/80 bg-[#111118] p-6 shadow-2xl">
              {/* Header simulation bar */}
              <div className="flex items-center justify-between border-b border-[#3A3A4E]/40 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-[#7A7A94]">engine_status: active</span>
                </div>
                <div className="rounded bg-[#1A1A24] px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                  NEXT.JS 16 // PROD
                </div>
              </div>

              {/* Main Core Metric Ring Display */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#3A3A4E]/40 bg-[#1A1A24]/40 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#7A7A94]">Core Web Vitals</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-black text-green-400"
                    >
                      99
                    </motion.span>
                    <span className="text-xs font-mono text-green-500">/ 100 Performance</span>
                  </div>
                  {/* Performance loader bar */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-[#111118]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '99%' }}
                      transition={{ duration: 1.5, ease: EASE }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#3A3A4E]/40 bg-[#1A1A24]/40 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#7A7A94]">Conversion Rate Lift</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#7C5BFF]">+42.6%</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                    <Shield size={10} /> Fully Documented Audit Proof
                  </div>
                </div>
              </div>

              {/* Simulated Real-Time Request Stream graph */}
              <div className="mt-4 rounded-xl border border-[#3A3A4E]/40 bg-[#1A1A24]/20 p-4">
                <p className="font-mono text-xs text-white">Live Node Response Feed</p>
                <div className="mt-4 flex h-24 items-end gap-1.5">
                  {[35, 65, 45, 85, 55, 95, 75, 100, 60, 85, 110, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(h / 110) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.05, ease: EASE }}
                        className={`w-full rounded-t-sm ${i === 7 || i === 10 ? 'bg-cyan-400' : 'bg-[#7C5BFF]'}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Automation Event Node */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4 flex items-center justify-between rounded-lg bg-[#7C5BFF]/10 border border-[#7C5BFF]/30 p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#7C5BFF] animate-ping" />
                  <span className="text-xs font-mono text-white">Inbound Lead Pipeline Triggered</span>
                </div>
                <span className="font-mono text-[10px] text-[#7C5BFF]">System OK</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}