'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

const EASE = [0.16, 1, 0.3, 1] as const

const STEP_ACCENTS = ['#7C5BFF', '#00D4FF', '#7C5BFF', '#00D4FF']

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE }}
        className="max-w-2xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">
          // Our Process
        </span>
        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
          Four steps from brief to launch.
        </h2>
        <p className="mt-4 text-sm leading-[1.8] text-text-secondary sm:text-base">
          Our methodology is engineering-first: every sprint begins with performance baselines,
          accessibility audits, and conversion mapping before a single component ships. We
          prototype in Figma, build in TypeScript strict mode, and deploy on Vercel Edge with
          full repository handoff — no lock-in, no page-builder exports.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-5">
        {/* Desktop connector line */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-5 hidden h-px md:block"
          style={{
            background: 'linear-gradient(to right, rgba(124,91,255,0.3), rgba(0,212,255,0.3), rgba(124,91,255,0.3))',
          }}
        />

        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
            className="group relative"
          >
            {/* Step number circle */}
            <div
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-400 group-hover:scale-110"
              style={{
                backgroundColor: `${STEP_ACCENTS[i]}15`,
                borderColor: `${STEP_ACCENTS[i]}40`,
                color: STEP_ACCENTS[i],
                boxShadow: `0 0 20px ${STEP_ACCENTS[i]}20`,
              }}
            >
              <span className="font-mono text-xs font-bold">{step.num}</span>
            </div>

            {/* Content */}
            <h3 className="mt-5 text-base font-semibold text-text-primary group-hover:text-text-primary transition-colors">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {step.body}
            </p>

            {/* Hover underline accent */}
            <div
              className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full rounded-full"
              style={{ background: `linear-gradient(to right, ${STEP_ACCENTS[i]}, transparent)` }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
