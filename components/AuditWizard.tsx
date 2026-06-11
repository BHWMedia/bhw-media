'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ─────────────────────────────────────────────────────────────────────

type PainPoint = 'speed' | 'conversion' | 'ui'

interface WizardPayload {
  websiteUrl: string
  painPoint: PainPoint
  email: string
  name: string
}

type Step = 1 | 2 | 3
type Direction = 'forward' | 'backward'

// ─── Constants ─────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

const PAIN_POINTS: {
  id: PainPoint
  label: string
  description: string
  icon: React.ReactNode
  accent: string
}[] = [
  {
    id: 'speed',
    label: 'Core Web Vitals / Speed',
    description: 'Slow load times are killing your bounce rate and search ranking.',
    accent: '#FF4D6D',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'conversion',
    label: 'Low Conversion Rates',
    description: 'Traffic is coming in but visitors aren\'t converting to leads or revenue.',
    accent: '#F5A623',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'ui',
    label: 'Outdated Layout / UI',
    description: 'Your site no longer reflects the quality of your product or brand.',
    accent: '#7C5BFF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

// Animation variants matching logical layout flow directions
const stepVariants = {
  initial: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'forward' ? 30 : -30,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'forward' ? -30 : 30,
  }),
}

// ─── Step Progress Indicator ───────────────────────────────────────────────────

function StepDots({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {([1, 2, 3] as Step[]).map((s) => (
        <div
          key={s}
          className="relative h-1 rounded-full transition-all duration-500"
          style={{
            width: s === current ? '28px' : '6px',
            backgroundColor: s === current ? '#7C5BFF' : s < current ? '#7C5BFF' : '#3A3A4E',
            opacity: s < current ? 0.5 : 1,
          }}
        />
      ))}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {current} / 3
      </span>
    </div>
  )
}

// ─── Step 1: Asset Discovery ───────────────────────────────────────────────────

function Step1({
  value,
  onChange,
  onNext,
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError('Enter your website URL to continue.')
      return
    }
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i
    if (!urlPattern.test(trimmed)) {
      setError('Enter a valid URL (e.g. yourbrand.com)')
      return
    }
    setError('')
    onNext()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan mb-3">
          // Step 1 — Asset Discovery
        </p>
        <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
          What\'s your website URL?
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          We\'ll run an instant performance scan and identify your primary conversion bottlenecks.
        </p>
      </div>

      <div>
        <div
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 bg-[#161622] border ${
            focused ? 'border-[#7C5BFF] shadow-[0_0_0_4px_rgba(124,91,255,0.12)]' : error ? 'border-[#FF4D6D]' : 'border-white/5'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A7A94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); if (error) setError('') }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="yourbrand.com"
            autoComplete="url"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-text-muted"
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs mt-2 text-[#FF4D6D]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </motion.p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 bg-[#7C5BFF] hover:bg-[#9B7FFF] hover:shadow-[0_8px_28px_rgba(124,91,255,0.38)]"
      >
        Analyse My Website
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  )
}

// ─── Step 2: Pain Point Selection ─────────────────────────────────────────────

function Step2({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: PainPoint | null
  onChange: (v: PainPoint) => void
  onNext: () => void
  onBack: () => void
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
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan mb-3">
          // Step 2 — Friction Identification
        </p>
        <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
          What\'s your biggest blocker?
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          We\'ll prioritize this area in your custom diagnostic report.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PAIN_POINTS.map((point) => {
          const isSelected = value === point.id
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => { onChange(point.id); if (error) setError('') }}
              className="flex items-start gap-4 rounded-xl p-4 text-left transition-all duration-300 border"
              style={{
                backgroundColor: isSelected ? `${point.accent}12` : '#161622',
                borderColor: isSelected ? point.accent : 'rgba(255,255,255,0.05)',
                boxShadow: isSelected ? `0 0 20px ${point.accent}18` : 'none',
              }}
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                style={{
                  backgroundColor: isSelected ? `${point.accent}22` : 'rgba(255,255,255,0.04)',
                  color: isSelected ? point.accent : '#7A7A94',
                }}
              >
                {point.icon}
              </div>
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold mb-0.5 transition-colors duration-300"
                  style={{ color: isSelected ? '#FFFFFF' : '#C8C8D8' }}
                >
                  {point.label}
                </p>
                <p className="text-xs leading-relaxed text-text-muted">
                  {point.description}
                </p>
              </div>
              <div
                className="ml-auto flex-shrink-0 mt-1 h-4 w-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                style={{
                  borderColor: isSelected ? point.accent : '#3A3A4E',
                  backgroundColor: isSelected ? point.accent : 'transparent',
                }}
              >
                {isSelected && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs -mt-2 text-[#FF4D6D]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </motion.p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-elevated px-5 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border hover:text-text-primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 bg-[#7C5BFF] hover:bg-[#9B7FFF] hover:shadow-[0_8px_28px_rgba(124,91,255,0.38)]"
        >
          Continue
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Payload Handshake ─────────────────────────────────────────────────

function Step3({
  email,
  name,
  onEmailChange,
  onNameChange,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: {
  email: string
  name: string
  onEmailChange: (v: string) => void
  onNameChange: (v: string) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string
}) {
  const [focusedField, setFocusedField] = useState<'email' | 'name' | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; name?: string }>({})

  const validate = (): boolean => {
    const errs: { email?: string; name?: string } = {}
    if (!name.trim() || name.trim().length < 2) errs.name = 'Enter your name (min 2 characters).'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email address.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan mb-3">
          // Step 3 — Payload Handshake
        </p>
        <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
          Where do we send your audit?
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          Your personalized diagnostic report lands in your inbox within 24 hours. Zero spam, ever.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
            Full Name <span className="text-[#7C5BFF]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { onNameChange(e.target.value); if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined })) }}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            placeholder="Your name"
            autoComplete="name"
            className={`w-full rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-text-muted transition-all duration-200 bg-[#161622] border ${
              focusedField === 'name' ? 'border-[#7C5BFF] shadow-[0_0_0_4px_rgba(124,91,255,0.12)]' : fieldErrors.name ? 'border-[#FF4D6D]' : 'border-white/5'
            }`}
          />
          {fieldErrors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs mt-2 text-[#FF4D6D]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {fieldErrors.name}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
            Email Address <span className="text-[#7C5BFF]">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { onEmailChange(e.target.value); if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined })) }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            placeholder="you@company.com"
            autoComplete="email"
            className={`w-full rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-text-muted transition-all duration-200 bg-[#161622] border ${
              focusedField === 'email' ? 'border-[#7C5BFF] shadow-[0_0_0_4px_rgba(124,91,255,0.12)]' : fieldErrors.email ? 'border-[#FF4D6D]' : 'border-white/5'
            }`}
          />
          {fieldErrors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs mt-2 text-[#FF4D6D]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {fieldErrors.email}
            </motion.p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 text-[#FF4D6D]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[2px]"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border/40 bg-elevated px-5 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
            isSubmitting ? 'bg-[#5A3FD4]' : 'bg-[#7C5BFF] hover:bg-[#9B7FFF] hover:shadow-[0_8px_28px_rgba(124,91,255,0.38)]'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Dispatching Audit Request...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Request Free Audit
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Success State ─────────────────────────────────────────────────────────────

function SuccessState({ name, email, onReset }: { name: string; email: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center justify-center text-center py-8 px-2"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full mb-6 bg-[#124912]/10 border border-[#7C5BFF]/20">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 className="font-bold text-xl text-text-primary tracking-tight mb-2">
        Audit Request Received
      </h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-1.5">
        {name}, your diagnostic is queued. Our engineering team will analyze your platform and deliver a full report within 24 hours.
      </p>
      <p className="text-xs mb-8 text-[#7A7A94]">
        Confirmation dispatched to{' '}
        <span className="font-mono text-[#00D4FF]">{email}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 transition-colors duration-200 text-[#7A7A94] hover:text-white"
      >
        Submit another request
      </button>
    </motion.div>
  )
}

// ─── AuditWizard Shell ─────────────────────────────────────────────────────────

export function AuditWizard() {
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<Direction>('forward')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [painPoint, setPainPoint] = useState<PainPoint | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleNextStep = (next: Step) => {
    setDirection('forward')
    setStep(next)
  }

  const handleBackStep = (prev: Step) => {
    setDirection('backward')
    setStep(prev)
  }

  const handleSubmit = useCallback(async () => {
    if (!painPoint) return
    setIsSubmitting(true)
    setSubmitError('')

    const painLabelMap: Record<PainPoint, string> = {
      speed: 'Core Web Vitals / Speed',
      conversion: 'Low Conversion Rates',
      ui: 'Outdated Layout / UI',
    }

    const payload: WizardPayload & {
      projectType: string
      budget: string
      brief: string
      source: string
    } = {
      websiteUrl,
      painPoint,
      email,
      name,
      projectType: 'Not sure yet — consult me',
      budget: 'Prefer to discuss',
      brief: `Free Audit Request — Website: ${websiteUrl} — Primary Pain Point: ${painLabelMap[painPoint]}`,
      source: 'AuditWizard',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Transmission failure')
      }

      setIsSuccess(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message !== 'Transmission failure'
          ? err.message
          : 'Submission failed. Email us directly at mediabhw@gmail.com',
      )
    } finally {
      setIsSubmitting(false)
    }
  }, [websiteUrl, painPoint, email, name])

  const handleReset = () => {
    setDirection('backward')
    setStep(1)
    setWebsiteUrl('')
    setPainPoint(null)
    setEmail('')
    setName('')
    setSubmitError('')
    setIsSuccess(false)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-[#111118] border border-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
      {/* Ambient violet backdrop */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl bg-gradient-to-r from-[#7C5BFF]/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {isSuccess ? (
          <SuccessState name={name} email={email} onReset={handleReset} />
        ) : (
          <>
            <StepDots current={step} />
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Step1
                    value={websiteUrl}
                    onChange={setWebsiteUrl}
                    onNext={() => handleNextStep(2)}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Step2
                    value={painPoint}
                    onChange={setPainPoint}
                    onNext={() => handleNextStep(3)}
                    onBack={() => handleBackStep(1)}
                  />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Step3
                    email={email}
                    name={name}
                    onEmailChange={setEmail}
                    onNameChange={setName}
                    onBack={() => handleBackStep(2)}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
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