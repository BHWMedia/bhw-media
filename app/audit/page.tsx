'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Zap,
  Target,
  BarChart,
  Loader2,
} from 'lucide-react'

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// ─── Step Typing ───────────────────────────────────────────────────────────────
type Direction = 'forward' | 'backward'

interface DiagnosticState {
  performanceRating: string
  strategicGoal: string
  trafficScale: string
  name: string
  email: string
  websiteUrl: string
}

const INITIAL_STATE: DiagnosticState = {
  performanceRating: '',
  strategicGoal: '',
  trafficScale: '',
  name: '',
  email: '',
  websiteUrl: '',
}

// ─── Step Slide Variants ───────────────────────────────────────────────────────
const slideVariants = {
  initial: (dir: Direction) => ({
    opacity: 0,
    x: dir === 'forward' ? 48 : -48,
    filter: 'blur(4px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
  },
  exit: (dir: Direction) => ({
    opacity: 0,
    x: dir === 'forward' ? -48 : 48,
    filter: 'blur(4px)',
  }),
}

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressTrack({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <div className="flex items-center gap-3" role="img" aria-label={`Step ${step} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => {
          const isDone = i < step - 1
          const isActive = i === step - 1
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold font-mono transition-all duration-500"
                  style={{
                    backgroundColor: isDone
                      ? '#7C5BFF'
                      : isActive
                      ? 'rgba(124,91,255,0.15)'
                      : 'rgba(255,255,255,0.04)',
                    borderColor: isDone
                      ? '#7C5BFF'
                      : isActive
                      ? '#7C5BFF'
                      : 'rgba(58,58,78,0.6)',
                    color: isDone ? '#fff' : isActive ? '#7C5BFF' : '#7A7A94',
                    boxShadow: isActive
                      ? '0 0 16px rgba(124,91,255,0.4)'
                      : 'none',
                  }}
                >
                  {isDone ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </div>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '1px solid rgba(124,91,255,0.5)' }}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
              {i < total - 1 && (
                <div
                  className="h-px w-8 transition-all duration-500"
                  style={{
                    background: isDone
                      ? 'linear-gradient(to right, #7C5BFF, #7C5BFF)'
                      : 'rgba(58,58,78,0.5)',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Step {step} of {total}
      </span>
    </div>
  )
}

// ─── Option Card ───────────────────────────────────────────────────────────────
interface OptionCardProps {
  label: string
  description?: string
  icon?: React.ReactNode
  selected: boolean
  onClick: () => void
  accentColor?: string
}

function OptionCard({
  label,
  description,
  icon,
  selected,
  onClick,
  accentColor = '#7C5BFF',
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      className="group relative w-full rounded-xl border p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 cursor-pointer"
      style={{
        backgroundColor: selected
          ? `${accentColor}10`
          : 'rgba(255,255,255,0.02)',
        borderColor: selected ? accentColor : 'rgba(58,58,78,0.5)',
        boxShadow: selected ? `0 0 24px ${accentColor}20` : 'none',
      }}
    >
      <div
        className="absolute right-4 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{
          borderColor: selected ? accentColor : 'rgba(58,58,78,0.8)',
          backgroundColor: selected ? accentColor : 'transparent',
        }}
      >
        {selected && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div className="flex items-start gap-3 pr-8">
        {icon && (
          <div
            className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: selected
                ? `${accentColor}22`
                : 'rgba(255,255,255,0.04)',
              color: selected ? accentColor : '#7A7A94',
            }}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p
            className="text-sm font-semibold leading-tight transition-colors duration-300"
            style={{ color: selected ? '#FFFFFF' : '#C8C8D8' }}
          >
            {label}
          </p>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}

// ─── Step 1: Performance Assessment ────────────────────────────────────────────
const PERFORMANCE_OPTIONS = [
  {
    value: 'slow-legacy',
    label: 'Painfully slow / Built on WordPress or Elementor',
    description:
      'Bloated plugins, unoptimised images, and template-level Core Web Vitals that are costing you search ranking.',
    icon: <Zap size={16} />,
    accent: '#FF4D6D',
  },
  {
    value: 'decent-low-conversion',
    label: 'Decent speed, but conversion is low',
    description:
      'Traffic is landing but CTAs underperform. Structural friction is bleeding qualified leads.',
    icon: <BarChart size={16} />,
    accent: '#F5A623',
  },
  {
    value: 'fast-outdated',
    label: 'Blazing fast, but looks outdated',
    description:
      'Technical performance is solid. The visual identity and interaction layer need a complete overhaul.',
    icon: <Target size={16} />,
    accent: '#7C5BFF',
  },
] as const

function Step1({
  value,
  onChange,
  onNext,
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!value) {
      setError('Select one option to continue.')
      return
    }
    setError('')
    onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
          // Performance Assessment
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary leading-tight">
          How does your current digital platform perform?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Be brutally honest. This is the baseline that determines your entire
          engineering prescription.
        </p>
      </div>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Performance selection">
        {PERFORMANCE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={value === opt.value}
            onClick={() => {
              onChange(opt.value)
              setError('')
            }}
            accentColor={opt.accent}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-crimson"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </motion.p>
      )}

      <button
        type="button"
        onClick={handleNext}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(124,91,255,0.4)] cursor-pointer bg-[#7C5BFF]"
      >
        Continue
        <ArrowRight size={15} />
      </button>
    </div>
  )
}

// ─── Step 2: Strategic Goal ────────────────────────────────────────────────────
const GOAL_OPTIONS = [
  {
    value: 'maximize-conversion',
    label: 'Maximize inbound conversion rates',
    description:
      'Re-architect CTAs, funnel hierarchy, and lead capture to extract maximum revenue from existing traffic.',
    icon: <BarChart size={16} />,
    accent: '#7C5BFF',
  },
  {
    value: 'elite-authority',
    label: 'Establish elite-tier industry authority',
    description:
      'Position the brand visually and structurally above every competitor in the vertical.',
    icon: <Target size={16} />,
    accent: '#00D4FF',
  },
  {
    value: 'migrate-legacy',
    label: 'Migrate away from legacy code / builders',
    description:
      'Escape Webflow, Squarespace, or WordPress into a custom, owned Next.js infrastructure.',
    icon: <Zap size={16} />,
    accent: '#F5A623',
  },
  {
    value: 'ship-mvp',
    label: 'Rapidly ship a new MVP or product line',
    description:
      'From zero to live production in 14 days. Validated architecture, no technical debt.',
    icon: <ArrowRight size={16} />,
    accent: '#FF4D6D',
  },
] as const

function Step2({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!value) {
      setError('Select a primary objective to continue.')
      return
    }
    setError('')
    onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
          // Strategic Goal
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary leading-tight">
          What is the primary objective of this overhaul?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          We scope the entire engineering architecture around a single primary
          outcome. Choose the one that unlocks the most value.
        </p>
      </div>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Objective selection">
        {GOAL_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={value === opt.value}
            onClick={() => {
              onChange(opt.value)
              setError('')
            }}
            accentColor={opt.accent}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-crimson"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </motion.p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-elevated px-5 py-3.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border hover:text-text-primary focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(124,91,255,0.4)] cursor-pointer bg-[#7C5BFF]"
        >
          Continue
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Traffic Scale ─────────────────────────────────────────────────────
const TRAFFIC_OPTIONS = [
  {
    value: 'under-10k',
    label: 'Under 10k monthly views',
    description:
      'Early-stage or under-marketed. We architect for rapid organic growth and paid traffic readiness.',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: '#7C5BFF',
  },
  {
    value: '10k-100k',
    label: '10k to 100k monthly views',
    description:
      'Growth-stage. Platform architecture must convert consistently without degrading under traffic spikes.',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    accent: '#00D4FF',
  },
  {
    value: '100k-plus',
    label: '100k+ enterprise-level scale',
    description:
      'Mission-critical infrastructure. We deploy on Vercel Edge with CDN-optimised static generation and zero single points of failure.',
    icon: <BarChart size={16} />,
    accent: '#F5A623',
  },
] as const

function Step3({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!value) {
      setError('Select your traffic tier to continue.')
      return
    }
    setError('')
    onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
          // Traffic Scale
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary leading-tight">
          What is your current monthly digital traffic volume?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Infrastructure architecture, caching strategies, and CDN configuration
          are all tuned to your specific scale tier.
        </p>
      </div>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Traffic scale selection">
        {TRAFFIC_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={value === opt.value}
            onClick={() => {
              onChange(opt.value)
              setError('')
            }}
            accentColor={opt.accent}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-crimson"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </motion.p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-elevated px-5 py-3.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border hover:text-text-primary focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(124,91,255,0.4)] cursor-pointer bg-[#7C5BFF]"
        >
          Continue
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Step 4: Enterprise Identity Capture ──────────────────────────────────────
interface FieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label 
        htmlFor={id}
        className="mb-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-text-muted"
      >
        {label}
        {required && <span className="text-violet">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-crimson"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function useInputStyle(focused: boolean, hasError: boolean) {
  return {
    backgroundColor: '#161622',
    border: `1px solid ${focused ? '#7C5BFF' : hasError ? '#FF4D6D' : 'rgba(255,255,255,0.06)'}`,
    boxShadow: focused ? '0 0 0 4px rgba(124,91,255,0.12)' : 'none',
  }
}

function Step4({
  state,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}: {
  state: Pick<DiagnosticState, 'name' | 'email' | 'websiteUrl'>
  onChange: (key: keyof DiagnosticState, value: string) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  submitError: string
}) {
  const [focused, setFocused] = useState<'name' | 'email' | 'url' | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string; url?: string }>({})

  const validate = (): boolean => {
    const errs: { name?: string; email?: string; url?: string } = {}
    if (!state.name.trim() || state.name.trim().length < 2)
      errs.name = 'Enter your name (minimum 2 characters).'
    if (!state.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()))
      errs.email = 'Enter a valid corporate email address.'
    if (state.websiteUrl.trim()) {
      const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i
      if (!urlPattern.test(state.websiteUrl.trim()))
        errs.url = 'Enter a valid URL (e.g. yourbrand.com)'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit()
  }

  const baseInputClass =
    'w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-text-muted transition-all duration-200'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
          // Enterprise Identity Capture
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary leading-tight">
          Where do we send your custom diagnostic report?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Our engineering team builds a personalised PDF audit covering performance
          gaps, conversion architecture, and a prioritised fix roadmap. Delivered
          within 24 hours. Zero spam, ever.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Field id="wizard-name" label="Full Name" required error={errors.name}>
          <input
            id="wizard-name"
            type="text"
            value={state.name}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'wizard-name-error' : undefined}
            onChange={(e) => {
              onChange('name', e.target.value)
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
            }}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className={baseInputClass}
            style={useInputStyle(focused === 'name', !!errors.name)}
          />
        </Field>

        <Field id="wizard-email" label="Corporate Work Email" required error={errors.email}>
          <input
            id="wizard-email"
            type="email"
            value={state.email}
            placeholder="you@yourcompany.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'wizard-email-error' : undefined}
            onChange={(e) => {
              onChange('email', e.target.value)
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
            }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            className={baseInputClass}
            style={useInputStyle(focused === 'email', !!errors.email)}
          />
        </Field>

        <Field id="wizard-url" label="Current Website URL" error={errors.url}>
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3.5 transition-all duration-200"
            style={useInputStyle(focused === 'url', !!errors.url)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7A7A94"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <input
              id="wizard-url"
              type="url"
              value={state.websiteUrl}
              placeholder="yourbrand.com (optional)"
              autoComplete="url"
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? 'wizard-url-error' : undefined}
              onChange={(e) => {
                onChange('websiteUrl', e.target.value)
                if (errors.url) setErrors((p) => ({ ...p, url: undefined }))
              }}
              onFocus={() => setFocused('url')}
              onBlur={() => setFocused(null)}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-text-muted"
            />
          </div>
        </Field>
      </div>

      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-3 rounded-xl border px-4 py-3 text-sm"
            style={{
              backgroundColor: 'rgba(255,77,109,0.08)',
              borderColor: 'rgba(255,77,109,0.2)',
              color: '#FF4D6D',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-elevated px-5 py-3.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(124,91,255,0.4)] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          style={{
            backgroundColor: isSubmitting ? '#5A3FD4' : '#7C5BFF',
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Analysing Architecture...
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Dispatch Diagnostic Request
            </>
          )}
        </button>
      </div>

      <p className="text-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
        No credit card &nbsp;·&nbsp; No pitch deck &nbsp;·&nbsp; Delivered in 24h
      </p>
    </div>
  )
}

// ─── Analysis Overlay ──────────────────────────────────────────────────────────
const ANALYSIS_PHASES = [
  'Scanning Core Web Vitals signatures...',
  'Mapping conversion architecture gaps...',
  'Profiling traffic infrastructure tier...',
  'Compiling engineering prescription...',
]

function AnalysisOverlay({ name }: { name: string }) {
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((i) => Math.min(i + 1, ANALYSIS_PHASES.length - 1))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-20"
      style={{ backgroundColor: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(12px)' }}
    >
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#7C5BFF',
            borderRightColor: 'rgba(124,91,255,0.3)',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full"
          style={{
            border: '1.5px solid transparent',
            borderTopColor: '#00D4FF',
            borderRightColor: 'rgba(0,212,255,0.2)',
          }}
        />
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: '#7C5BFF', boxShadow: '0 0 16px rgba(124,91,255,0.8)' }}
        />
      </div>

      <p className="mb-3 text-lg font-bold tracking-tight text-white">
        Analysing Engineering Architecture...
      </p>
      <p className="mb-6 text-sm text-text-secondary">
        Building your custom diagnostic, {name || 'there'}.
      </p>

      <div className="h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={phaseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center font-mono text-[11px] uppercase tracking-widest text-text-muted"
          >
            {ANALYSIS_PHASES[phaseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Success State ─────────────────────────────────────────────────────────────
function SuccessState({ name, email }: { name: string; email: string }) {
  return (
    <motion.div
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center py-10 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: 'rgba(124,91,255,0.2)' }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            backgroundColor: 'rgba(124,91,255,0.12)',
            border: '1px solid rgba(124,91,255,0.3)',
          }}
        >
          <CheckCircle size={36} className="text-violet" />
        </div>
      </div>

      <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
        // Diagnostic Queued
      </span>

      <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">
        Architecture analysis in progress.
      </h2>

      <p className="mb-2 max-w-sm text-sm leading-relaxed text-text-secondary">
        {name}, your custom engineering diagnostic is being compiled by our team.
        A full PDF report — Core Web Vitals breakdown, conversion gap analysis,
        and a prioritised fix roadmap — lands in your inbox within{' '}
        <span className="font-semibold text-text-primary">24 hours</span>.
      </p>

      <p className="mb-10 font-mono text-xs text-text-muted">
        Confirmation dispatched to{' '}
        <span className="text-cyan">{email}</span>
      </p>

      <div
        className="mb-8 h-px w-32"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(124,91,255,0.4), transparent)',
        }}
      />

      <div className="mb-10 grid w-full max-w-sm grid-cols-1 gap-3 text-left">
        {[
          { step: '01', label: 'PDF diagnostic delivered to your inbox' },
          { step: '02', label: 'Engineering prescription scoped to your stack' },
          { step: '03', label: 'Optional 15-min discovery call booked at your pace' },
        ].map(({ step, label }) => (
          <div
            key={step}
            className="flex items-center gap-3 rounded-xl border border-border/30 bg-card px-4 py-3"
          >
            <span className="font-mono text-[10px] text-text-muted">{step}</span>
            <span className="text-sm text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_32px_rgba(124,91,255,0.45)] bg-[#7C5BFF]"
      >
        Return to BHW Media
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}

// ─── Label map utilities for brief generation ──────────────────────────────────
const PERF_LABEL: Record<string, string> = {
  'slow-legacy': 'Painfully slow / Built on WordPress or Elementor',
  'decent-low-conversion': 'Decent speed, but conversion is low',
  'fast-outdated': 'Blazing fast, but looks outdated',
}

const GOAL_LABEL: Record<string, string> = {
  'maximize-conversion': 'Maximize inbound conversion rates',
  'elite-authority': 'Establish elite-tier industry authority',
  'migrate-legacy': 'Migrate away from legacy code / builders',
  'ship-mvp': 'Rapidly ship a new MVP or product line',
}

const TRAFFIC_LABEL: Record<string, string> = {
  'under-10k': 'Under 10k monthly views',
  '10k-100k': '10k to 100k monthly views',
  '100k-plus': '100k+ enterprise-level scale',
}

// ─── Wizard Shell ──────────────────────────────────────────────────────────────
type WizardStep = 1 | 2 | 3 | 4
type WizardPhase = 'wizard' | 'analysing' | 'success'

function DiagnosticWizard() {
  const [step, setStep] = useState<WizardStep>(1)
  const [direction, setDirection] = useState<Direction>('forward')
  const [phase, setPhase] = useState<WizardPhase>('wizard')
  const [submitError, setSubmitError] = useState('')
  const [data, setData] = useState<DiagnosticState>(INITIAL_STATE)

  const setField = useCallback(<K extends keyof DiagnosticState>(
    key: K,
    value: DiagnosticState[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const goNext = useCallback(() => {
    setDirection('forward')
    setStep((s) => Math.min(s + 1, 4) as WizardStep)
  }, [])

  const goBack = useCallback(() => {
    setDirection('backward')
    setStep((s) => Math.max(s - 1, 1) as WizardStep)
  }, [])

  const handleSubmit = useCallback(async () => {
    setSubmitError('')

    const brief = [
      `Diagnostic Audit Request — Enterprise Engineering Assessment`,
      ``,
      `Performance Rating: ${PERF_LABEL[data.performanceRating] ?? data.performanceRating}`,
      `Strategic Goal: ${GOAL_LABEL[data.strategicGoal] ?? data.strategicGoal}`,
      `Traffic Scale: ${TRAFFIC_LABEL[data.trafficScale] ?? data.trafficScale}`,
      data.websiteUrl ? `Current Website: ${data.websiteUrl}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const payload = {
      name: data.name,
      email: data.email,
      company: '',
      projectType: 'Not sure yet — consult me',
      budget: 'Prefer to discuss',
      brief,
      referral: '',
      websiteUrl: data.websiteUrl || undefined,
      source: 'DiagnosticWizard',
    }

    setPhase('analysing')
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          (body as { error?: string }).error || 'Transmission failure',
        )
      }

      setPhase('success')
    } catch (err) {
      setPhase('wizard')
      setSubmitError(
        err instanceof Error && err.message !== 'Transmission failure'
          ? err.message
          : 'Submission failed. Email us directly at mediabhw@gmail.com',
      )
    }
  }, [data])

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 32px 72px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, #7C5BFF 30%, #00D4FF 70%, transparent)',
        }}
      />

      <AnimatePresence>
        {phase === 'analysing' && (
          <AnalysisOverlay name={data.name} />
        )}
      </AnimatePresence>

      <div className="p-7 sm:p-9">
        {phase === 'success' ? (
          <SuccessState name={data.name} email={data.email} />
        ) : (
          <>
            <ProgressTrack step={step} total={4} />

            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Step1
                    value={data.performanceRating}
                    onChange={(v) => setField('performanceRating', v)}
                    onNext={goNext}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Step2
                    value={data.strategicGoal}
                    onChange={(v) => setField('strategicGoal', v)}
                    onNext={goNext}
                    onBack={goBack}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Step3
                    value={data.trafficScale}
                    onChange={(v) => setField('trafficScale', v)}
                    onNext={goNext}
                    onBack={goBack}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Step4
                    state={{
                      name: data.name,
                      email: data.email,
                      websiteUrl: data.websiteUrl,
                    }}
                    onChange={setField}
                    onSubmit={handleSubmit}
                    onBack={goBack}
                    isSubmitting={phase === 'analysing'}
                    submitError={submitError}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Trust Signals ─────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { label: 'No credit card required' },
  { label: 'PDF delivered in 24 hours' },
  { label: 'Zero spam. Unsubscribe anytime.' },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AuditPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void pb-24 pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-mesh-violet opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-mesh-cyan opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[900px] -translate-x-1/2 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(124,91,255,0.55) 0%, transparent 65%)',
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_480px] lg:items-start">

          {/* ── Left column ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:pt-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-cyan"
                style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                aria-hidden="true"
              />
              Free Diagnostic — No Obligation
            </span>

            <h1
              className="mt-5 font-bold tracking-tight text-text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.07 }}
            >
              Your website is leaving
              <br />
              <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
                revenue on the table.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
              Answer four questions about your current digital infrastructure. Our
              engineering team analyses your platform and delivers a custom
              diagnostic — Lighthouse breakdown, conversion architecture gaps, and
              a prioritised fix list — within 24 hours.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {TRUST_ITEMS.map(({ label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm text-text-muted"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet/10">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7C5BFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-14 hidden lg:grid grid-cols-3 gap-4">
              {[
                { value: '40+', label: 'Audits Delivered', accent: 'text-violet' },
                { value: '98', label: 'Avg. Lighthouse', accent: 'text-cyan' },
                { value: '14d', label: 'Avg. Fix Delivery', accent: 'text-gold' },
              ].map(({ value, label, accent }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border/40 bg-elevated p-5"
                >
                  <p className={`text-3xl font-bold tracking-tight ${accent}`}>
                    {value}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 hidden lg:flex items-center gap-3">
              <div className="flex -space-x-2">
                {['MW', 'PN', 'JO', 'SM', 'DC'].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-elevated font-semibold text-[10px] text-violet"
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted">
                <span className="font-semibold text-text-primary">40+ brands</span>{' '}
                already audited this quarter
              </p>
            </div>
          </motion.div>

          {/* ── Right column: wizard ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <DiagnosticWizard />

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Prefer to talk directly?{' '}
              <a
                href="https://calendly.com/mediabhw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet underline underline-offset-4 transition-colors hover:text-violet-light"
              >
                Book a live call →
              </a>
            </p>
          </motion.div>
        </div>

        {/* Mobile metric nodes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-3 lg:hidden"
        >
          {[
            { value: '40+', label: 'Audits', accent: 'text-violet' },
            { value: '98', label: 'Lighthouse', accent: 'text-cyan' },
            { value: '14d', label: 'Delivery', accent: 'text-gold' },
          ].map(({ value, label, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-border/40 bg-elevated p-4 text-center"
            >
              <p className={`text-2xl font-bold tracking-tight ${accent}`}>
                {value}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-text-muted">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Minimal footer strip */}
      <div className="relative z-10 mt-20 border-t border-border/30 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6">
          <p className="font-mono text-[11px] text-text-muted">
            © {new Date().getFullYear()} BHW Media. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Services', href: '/services' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-mono text-[11px] text-text-muted transition-colors hover:text-violet"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 