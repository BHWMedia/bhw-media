'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Mail,
  Clock,
  Globe,
  CheckCircle,
  Loader2,
  ArrowUpRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

// ─── Drop-In Premium Brand SVGs ──────────────────────────────────────────────

const Github = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

const Twitter = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

// ─── Strict Schema Validation ──────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  projectType: z
    .string()
    .min(1, 'Please select a project type selection'),
  budget: z
    .string()
    .min(1, 'Please select your target budget scope'),
  brief: z
    .string()
    .min(30, 'Please add more details — minimum 30 characters required')
    .max(2000, 'Brief limit exceeded — maximum 2000 characters'),
  referral: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// ─── Production Datasets ──────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    Icon: Mail,
    label: 'Email Production Desk',
    value: 'mediabhw@gmail.com',
    href: 'mailto:mediabhw@gmail.com',
    accent: '#7C5BFF',
  },
  {
    Icon: Clock,
    label: 'Response Latency',
    value: 'Within 24 business hours',
    href: null,
    accent: '#00D4FF',
  },
  {
    Icon: Globe,
    label: 'Availability Spectrum',
    value: 'Deploying networks globally',
    href: null,
    accent: '#F5A623',
  },
]

const SOCIAL_LINKS = [
  { Icon: Github, href: 'https://github.com', label: 'GitHub' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/bhwmedia', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/media._bhw', label: 'Instagram' },
]

const PROJECT_TYPES = [
  'Web Design & Development',
  'SaaS Product Design',
  'Brand Identity',
  'E-Commerce Build',
  'Motion & Interaction Design',
  'Growth Retainer Plan',
  'Not sure yet — consult me',
]

const BUDGET_RANGES = [
  'Under $2,500',
  '$2,500 – $6,500',
  '$6,500 – $15,000',
  '$15,000+',
  'Prefer to discuss',
]

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media Workspace',
  'Direct Network Referral',
  'Portfolio Showcase (Dribbble/Behance)',
  'Other Stream',
]

// ─── High-End Sub-Components (React 19 Ref Compliant) ─────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-mono tracking-wider uppercase mb-2 text-[#A3A3C2]">
      {children}
      {required && <span className="text-[#7C5BFF] ml-1">*</span>}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 text-xs mt-2 text-[#FF4D6D]"
    >
      <AlertCircle size={12} />
      {message}
    </motion.p>
  )
}

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  hasError?: boolean
}

function StyledInput({ hasError, className, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
      className={`w-full bg-[#161622] text-white text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none ${
        focused
          ? 'border-[#7C5BFF] ring-4 ring-[#7C5BFF]/15'
          : hasError
          ? 'border-[#FF4D6D]'
          : 'border-white/5 hover:border-white/10'
      } ${className || ''}`}
    />
  )
}

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  hasError?: boolean
}

function StyledTextarea({ hasError, className, ...props }: TextareaProps) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
      className={`w-full bg-[#161622] text-white text-sm rounded-xl px-4 py-3 border transition-all duration-200 outline-none resize-none ${
        focused
          ? 'border-[#7C5BFF] ring-4 ring-[#7C5BFF]/15'
          : hasError
          ? 'border-[#FF4D6D]'
          : 'border-white/5 hover:border-white/10'
      } ${className || ''}`}
    />
  )
}

function StyledSelect({ hasError, children, className, ...props }: React.ComponentPropsWithRef<'select'> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative w-full">
      <select
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
        className={`w-full bg-[#161622] text-white text-sm rounded-xl px-4 py-3 border outline-none appearance-none transition-all duration-200 ${
          focused
            ? 'border-[#7C5BFF] ring-4 ring-[#7C5BFF]/15'
            : hasError
            ? 'border-[#FF4D6D]'
            : 'border-white/5 hover:border-white/10'
        } ${className || ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A7A94' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
          paddingRight: '2.5rem',
        }}
      >
        {children}
      </select>
    </div>
  )
}

// ─── Modern Post-Submission Interface ──────────────────────────────────────────

function SuccessState({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center text-center py-12 px-4"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#7C5BFF]/10 border border-[#7C5BFF]/20">
        <CheckCircle size={32} className="text-[#7C5BFF]" />
      </div>

      <h3 className="font-bold text-2xl text-white mb-2 tracking-tight">
        Brief Synchronized Successfully
      </h3>

      <p className="text-sm text-[#C8C8D8] max-w-sm mb-1.5 leading-relaxed">
        Our strategy core is reviewing your structural metrics. A dedicated proposal architect will establish contact within 24 hours.
      </p>

      <p className="text-xs text-[#7A7A94] mb-8">
        Receipt confirmation dispatched to <span className="text-[#00D4FF] font-mono">{email}</span>
      </p>

      <button
        onClick={onReset}
        className="text-xs font-mono uppercase tracking-wider text-[#7A7A94] hover:text-white transition-colors underline underline-offset-4"
      >
        Initiate secondary terminal brief
      </button>
    </motion.div>
  )
}

// ─── Dynamic Engine Core (Form Module) ─────────────────────────────────────────

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      brief: '',
      referral: '',
    },
  })

  const watchedProjectType = watch('projectType')
  const watchedBudget = watch('budget')
  const watchedBrief = watch('brief') || ''
  const watchedReferral = watch('referral')

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Transmission failure')
      }

      setSubmittedEmail(data.email)
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message !== 'Transmission failure'
          ? err.message
          : 'Communication node busy. Please transfer your scope directly to mediabhw@gmail.com'
      )
    }
  }

  if (isSubmitted) {
    return <SuccessState email={submittedEmail} onReset={() => { setIsSubmitted(false); reset() }} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      
      {/* Name & Email Field Split Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel required>Full Identity</FieldLabel>
          <StyledInput
            {...register('name')}
            placeholder="John Doe"
            hasError={!!errors.name}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <FieldLabel required>Email Node</FieldLabel>
          <StyledInput
            {...register('email')}
            type="email"
            placeholder="john@studio.com"
            hasError={!!errors.email}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Corporate Metadata Group */}
      <div>
        <FieldLabel>Company / Ecosystem</FieldLabel>
        <StyledInput
          {...register('company')}
          placeholder="Corporate ecosystem name (optional)"
        />
      </div>

      {/* Luxury Interactive Project Matrix (Pill Selector Design Pattern) */}
      <div>
        <FieldLabel required>Project Target Vector</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {PROJECT_TYPES.map((type) => {
            const isSelected = watchedProjectType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => setValue('projectType', type, { shouldValidate: true })}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#7C5BFF] text-white bg-[#7C5BFF]/10 shadow-[0_0_20px_rgba(124,91,255,0.15)]'
                    : 'border-white/5 text-[#7A7A94] bg-white/[0.01] hover:border-white/15 hover:text-white'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>
        <FieldError message={errors.projectType?.message} />
      </div>

      {/* Luxury Budget Allocator Matrix */}
      <div>
        <FieldLabel required>Financial Threshold Scope</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {BUDGET_RANGES.map((range) => {
            const isSelected = watchedBudget === range
            return (
              <button
                key={range}
                type="button"
                onClick={() => setValue('budget', range, { shouldValidate: true })}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#7C5BFF] text-white bg-[#7C5BFF]/10 shadow-[0_0_20px_rgba(124,91,255,0.15)]'
                    : 'border-white/5 text-[#7A7A94] bg-white/[0.01] hover:border-white/15 hover:text-white'
                }`}
              >
                {range}
              </button>
            )
          })}
        </div>
        <FieldError message={errors.budget?.message} />
      </div>

      {/* Scope Brief + High Fidelity Character Metric Ring */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <FieldLabel required>Structural Brief Specifications</FieldLabel>
          <span className={`text-[10px] font-mono tracking-wider ${watchedBrief.length >= 30 ? 'text-[#00D4FF]' : 'text-[#7A7A94]'}`}>
            {watchedBrief.length} / 2000 CHARS
          </span>
        </div>
        <StyledTextarea
          {...register('brief')}
          rows={5}
          placeholder="Elaborate on operational features, targeted milestones, timeline pressures, or design architectures you hold in high regard..."
          hasError={!!errors.brief}
        />
        <FieldError message={errors.brief?.message} />
      </div>

      {/* Referral Optimization Selection */}
      <div>
        <FieldLabel>Discovery Vector</FieldLabel>
        <StyledSelect
          {...register('referral')}
          value={watchedReferral || ''}
        >
          <option value="">Select Discovery Point (Optional)</option>
          {REFERRAL_SOURCES.map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </StyledSelect>
      </div>

      {/* Premium Active CTA Node */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 bg-[#7C5BFF] hover:bg-[#9B7FFF] disabled:bg-[#5A3FD4] disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_8px_32px_rgba(124,91,255,0.35)] outline-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Transmitting Structural Metrics...
          </>
        ) : (
          <>
            Dispatch Project Specifications
            <ArrowUpRight size={15} />
          </>
        )}
      </button>

      {/* Dynamic Error Messaging Dropdown */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 text-[#FF4D6D]"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  )
}

// ─── Complete Global Page Layout View ──────────────────────────────────────────

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // High-end ambient tracking for custom spotlight matrix overlays
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), { damping: 35, stiffness: 180 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), { damping: 35, stiffness: 180 })

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen bg-[#05050A] pt-28 pb-24 overflow-hidden"
    >
      {/* Cinematic Studio Backdrop Matrix Lines */}
      <div className="absolute inset-0 bg-mesh-violet opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-cyan opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Interactive Global Mouse Follower Overlay Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(1000px circle at ${glowX.get()} ${glowY.get()}, rgba(124, 91, 255, 0.08), transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
        
        {/* Left Informational Desk Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase bg-[#00D4FF]/5 border border-[#00D4FF]/10">
            <Sparkles size={10} className="animate-pulse" />
            Establish Node Connection
          </span>

          <h1 className="font-bold tracking-tight text-white mt-4 mb-6 leading-[1.1] text-4xl sm:text-5xl">
            Let&apos;s engineer something remarkable.
          </h1>

          <p className="text-base text-[#C8C8D8] leading-relaxed mb-10 max-w-md">
            Whether your operational framework holds a finalized spec sheet, raw logic metrics, or general budget considerations — we establish optimal pathways. Initial pipelines activate within 72 hours of structural sync.
          </p>

          {/* Premium Core Context Cards */}
          <div className="space-y-3 mb-10">
            {INFO_CARDS.map(({ Icon, label, value, href, accent }) => {
              const insideNode = (
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accent}12`, border: `1px solid ${accent}20` }}
                  >
                    <Icon size={16} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#7A7A94] mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              )

              const templateClass = "block p-4 rounded-xl bg-[#111118] border border-white/5 transition-all duration-300"

              return href ? (
                <a
                  key={label}
                  href={href}
                  className={`${templateClass} hover:border-[#7C5BFF]/30`}
                >
                  {insideNode}
                </a>
              ) : (
                <div key={label} className={templateClass}>
                  {insideNode}
                </div>
              )
            })}
          </div>

          {/* Connected Network Channels */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#111118] border border-white/5 text-[#7A7A94] hover:text-[#7C5BFF] hover:border-[#7C5BFF]/30 hover:bg-[#141420] transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Structural Form Block */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="bg-[#111118]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
        >
          <h2 className="font-semibold text-lg text-white mb-6 tracking-tight flex items-center gap-2">
            Scope Specification Matrix
          </h2>
          <ContactForm />
        </motion.div>

      </div>
    </main>
  )
}