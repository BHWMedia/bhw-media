'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

const EASE = [0.16, 1, 0.3, 1] as const

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
          // Our Process
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Four steps from brief to launch.
        </h2>
      </div>

      <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
        {/* Dashed connector line (desktop) */}
        <div
          className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-border md:block"
          aria-hidden="true"
        />

        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
            className="relative"
          >
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-elevated font-mono text-sm text-violet">
              {step.num}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
