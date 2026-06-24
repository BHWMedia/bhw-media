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

const Github = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

const Twitter = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ size = 18 }: { size?: number }) => (
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
    .max(80, 'Name parameter overflowed allocation grid'),
  email: z
    .string()
    .email('Please verify the input maps to a standard network node address'),
  company: z.string().max(100).optional(),
  projectType: z
    .string()
    .min(1, 'Target vector assignment is mandatory'),
  budget: z
    .string()
    .min(1, 'Financial limits mapping required'),
  brief: z
    .string()
    .min(30, 'Structural configuration descriptions must contain at least 30 characters')
    .max(2000, 'Specification limit maximized at 2000 structural elements'),
  referral: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// ─── High-End Component Datasets ──────────────────────────────────────────────

const INFO_CARDS = [
  {
    Icon: Mail,
    label: 'Production Intake Desk',
    value: 'mediabhw@gmail.com',
    href: 'mailto:mediabhw@gmail.com',
    accent: '#7C5BFF',
  },
  {
    Icon: Clock,
    label: 'Standard Evaluation Latency',
    value: 'Within 24 operational hours',
    href: null,
    accent: '#00D4FF',
  },
  {
    Icon: Globe,
    label: 'System Domain Availability',
    value: 'Deploying services worldwide',
    href: null,
    accent: '#F5A623',
  },
]

const SOCIAL_LINKS = [
  { Icon: Github, href: 'https://github.com', label: 'GitHub Network Link' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter Feed Link' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/bhwmedia', label: 'LinkedIn Enterprise Node' },
  { Icon: Instagram, href: 'https://instagram.com/media._bhw', label: 'Instagram Visual Channel' },
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
  'Google Search Engine',
  'Social Media Ecosystem',
  'Direct Network Referral',
  'Portfolio Matrix (Dribbble/Behance)',
  'Other Operational Vector',
]

// ─── Form Interface Components (React 19 Clean Forms Pattern) ─────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[10px] font-mono tracking-[0.12em] uppercase mb-2 text-[#A3A3C2] select-none">
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
      className="flex items-center gap-1.5 text-xs mt-2 text-[#FF4D6D] font-medium"
    >
      <AlertCircle size={12} className="flex-shrink-0" />
      {message}
    </motion.p>
  )
}

interface InputProps extends React.ComponentProps<'input'> {
  hasError?: boolean
}

function StyledInput({ hasError, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0D0D18] text-white placeholder-white/20 text-sm rounded-xl px-4 py-3 border transition-all duration-300 outline-none focus:border-[#7C5BFF] focus:ring-4 focus:ring-[#7C5BFF]/10 ${
        hasError ? 'border-[#FF4D6D]' : 'border-white/5 hover:border-white/10'
      } ${className || ''}`}
    />
  )
}

interface TextareaProps extends React.ComponentProps<'textarea'> {
  hasError?: boolean
}

function StyledTextarea({ hasError, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full bg-[#0D0D18] text-white placeholder-white/20 text-sm rounded-xl px-4 py-3 border transition-all duration-300 outline-none resize-none focus:border-[#7C5BFF] focus:ring-4 focus:ring-[#7C5BFF]/10 ${
        hasError ? 'border-[#FF4D6D]' : 'border-white/5 hover:border-white/10'
      } ${className || ''}`}
    />
  )
}

function StyledSelect({ hasError, children, className, ...props }: React.ComponentProps<'select'> & { hasError?: boolean }) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={`w-full bg-[#0D0D18] text-white text-sm rounded-xl px-4 py-3 border outline-none appearance-none transition-all duration-300 focus:border-[#7C5BFF] focus:ring-4 focus:ring-[#7C5BFF]/10 ${
          hasError ? 'border-[#FF4D6D]' : 'border-white/5 hover:border-white/10'
        } ${className || ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%237C5BFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1.2rem center',
          paddingRight: '2.5rem',
        }}
      >
        {children}
      </select>
    </div>
  )
}

function SuccessState({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#7C5BFF]/10 border border-[#7C5BFF]/20 shadow-[0_0_30px_rgba(124,91,255,0.15)]">
        <CheckCircle size={28} className="text-[#00D4FF]" />
      </div>

      <h3 className="font-bold text-2xl text-white mb-3 tracking-tight">
        Brief Transmitted Successfully
      </h3>

      <p className="text-sm text-[#A3A3C2] max-w-sm mb-2 leading-relaxed">
        Our evaluation architecture is analyzing your structural metrics. An interactive planning lead will establish visual contact within 24 hours.
      </p>

      <p className="text-xs font-mono text-[#7A7A94] mb-8">
        Tracking metrics routed to: <span className="text-[#7C5BFF]">{email}</span>
      </p>

      <button
        onClick={onReset}
        className="text-xs font-mono uppercase tracking-widest text-[#7A7A94] hover:text-white transition-colors underline underline-offset-8 decoration-[#7C5BFF]"
      >
        Open alternative connection line
      </button>
    </motion.div>
  )
}

// ─── Contact Functional Pipeline Core ─────────────────────────────────────────

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

  const handleFormTransmission = async (data: ContactFormData) => {
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const fallbackBody = await res.json().catch(() => ({}))
        throw new Error(fallbackBody?.error || 'System linkage busy')
      }

      setSubmittedEmail(data.email)
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message !== 'System linkage busy'
          ? err.message
          : 'High system usage. Secure an automated queue position by routing structural specs directly to mediabhw@gmail.com'
      )
    }
  }

  if (isSubmitted) {
    return <SuccessState email={submittedEmail} onReset={() => { setIsSubmitted(false); reset() }} />
  }

  return (
    <form onSubmit={handleSubmit(handleFormTransmission)} noValidate className="space-y-6">
      
      {/* Identity Core Split Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel required>Full Identity</FieldLabel>
          <StyledInput
            {...register('name')}
            placeholder="E.g., Alexander Wright"
            hasError={!!errors.name}
            disabled={isSubmitting}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <FieldLabel required>Communication Node</FieldLabel>
          <StyledInput
            {...register('email')}
            type="email"
            placeholder="alexander@ecosystem.com"
            hasError={!!errors.email}
            disabled={isSubmitting}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Corporate Layer Data */}
      <div>
        <FieldLabel>Company Ecosystem</FieldLabel>
        <StyledInput
          {...register('company')}
          placeholder="E.g., Vercel Inc."
          disabled={isSubmitting}
        />
      </div>

      {/* Modern Interaction Grid Vector Component */}
      <div>
        <FieldLabel required>Project Target Vector</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {PROJECT_TYPES.map((type) => {
            const active = watchedProjectType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => setValue('projectType', type, { shouldValidate: true })}
                disabled={isSubmitting}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-[#7C5BFF]/30 disabled:opacity-40 ${
                  active
                    ? 'border-[#7C5BFF] text-white bg-[#7C5BFF]/10 shadow-[0_0_15px_rgba(124,91,255,0.15)]'
                    : 'border-white/5 text-[#7A7A94] bg-white/[0.01] hover:border-white/10 hover:text-white'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>
        <FieldError message={errors.projectType?.message} />
      </div>

      {/* Financial Limits Selection Matrix */}
      <div>
        <FieldLabel required>Allocated Investment Threshold</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {BUDGET_RANGES.map((range) => {
            const active = watchedBudget === range
            return (
              <button
                key={range}
                type="button"
                onClick={() => setValue('budget', range, { shouldValidate: true })}
                disabled={isSubmitting}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-[#7C5BFF]/30 disabled:opacity-40 ${
                  active
                    ? 'border-[#7C5BFF] text-white bg-[#7C5BFF]/10 shadow-[0_0_15px_rgba(124,91,255,0.15)]'
                    : 'border-white/5 text-[#7A7A94] bg-white/[0.01] hover:border-white/10 hover:text-white'
                }`}
              >
                {range}
              </button>
            )
          })}
        </div>
        <FieldError message={errors.budget?.message} />
      </div>

      {/* Configuration Specifications Field */}
      <div>
        <div className="flex justify-between items-center mb-2 select-none">
          <FieldLabel required>Structural Brief Specifications</FieldLabel>
          <span className={`text-[10px] font-mono tracking-wider transition-colors ${watchedBrief.length >= 30 ? 'text-[#00D4FF]' : 'text-[#7A7A94]'}`}>
            {watchedBrief.length} / 2000 UNITS
          </span>
        </div>
        <StyledTextarea
          {...register('brief')}
          rows={5}
          placeholder="Elaborate on technical parameters, primary timeline targets, architectural examples, or scaling milestones..."
          hasError={!!errors.brief}
          disabled={isSubmitting}
        />
        <FieldError message={errors.brief?.message} />
      </div>

      {/* Discovery Channels */}
      <div>
        <FieldLabel>System Discovery Vector</FieldLabel>
        <StyledSelect
          {...register('referral')}
          disabled={isSubmitting}
        >
          <option value="" className="bg-[#0D0D18]">Select Connection Node (Optional)</option>
          {REFERRAL_SOURCES.map((src) => (
            <option key={src} value={src} className="bg-[#0D0D18]">{src}</option>
          ))}
        </StyledSelect>
      </div>

      {/* Dynamic Queue Dispatch Trigger */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 bg-[#7C5BFF] hover:bg-[#8C6FFF] disabled:bg-[#1C1C2E] disabled:text-[#7A7A94] disabled:cursor-not-allowed hover:shadow-[0_8px_32px_rgba(124,91,255,0.25)] outline-none focus:ring-4 focus:ring-[#7C5BFF]/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin text-[#00D4FF]" />
            Transmitting Node Configuration Matrix...
          </>
        ) : (
          <>
            Dispatch Project Specifications
            <ArrowUpRight size={15} className="text-[#00D4FF]" />
          </>
        )}
      </button>

      {/* Alert Messaging System */}
      <AnimatePresence mode="wait">
        {submitError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 text-[#FF4D6D] leading-relaxed"
          >
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  )
}

// ─── Global System Layout View ────────────────────────────────────────────────

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // High-performance hardware accelerated mouse positioning metrics
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const glowX = useSpring(mouseX, { damping: 40, stiffness: 200 })
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 200 })

  // Construct optimized CSS properties straight from motion coordinates
  const glowStyle = {
    background: useTransform(
      [glowX, glowY],
      ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(124, 91, 255, 0.06), transparent 50%)`
    )
  }

  const handlePointerInteraction = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const bounds = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - bounds.left)
    mouseY.set(e.clientY - bounds.top)
  }

  const handlePointerLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handlePointerInteraction}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-screen bg-[#06060D] pt-28 pb-24 overflow-hidden"
    >
      {/* Background Chromatic Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(124,91,255,0.04),_transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(0,212,255,0.03),_transparent_40%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Thread-safe hardware-accelerated spotlight surface overlay layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={glowStyle}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 items-start">
        
        {/* Informational Interface Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] font-mono tracking-[0.15em] text-[#00D4FF] uppercase bg-[#00D4FF]/5 border border-[#00D4FF]/15">
            <Sparkles size={10} className="animate-pulse" />
            Establish Node Connection
          </span>

          <h1 className="font-bold tracking-tight text-white mt-5 mb-6 leading-[1.08] text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70">
            Let&apos;s build platforms that dominate.
          </h1>

          <p className="text-sm sm:text-base text-[#A3A3C2] leading-relaxed mb-10 max-w-md">
            Whether your product features a structured spec sheet or raw deployment concepts — we evaluate metrics to map out optimal design paths.
          </p>

          {/* Core Configuration Context Informational Matrix */}
          <div className="space-y-3 mb-10">
            {INFO_CARDS.map(({ Icon, label, value, href, accent }) => {
              const cardInside = (
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#12121F] border border-white/5"
                    style={{ borderColor: `${accent}15` }}
                  >
                    <Icon size={15} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7A7A94] mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-white/90">{value}</p>
                  </div>
                </div>
              )

              const stylingBase = "block p-4 rounded-xl bg-[#12121F]/40 backdrop-blur-sm border border-white/5 transition-all duration-300"

              return href ? (
                <a
                  key={label}
                  href={href}
                  className={`${stylingBase} hover:border-[#7C5BFF]/30 hover:bg-[#12121F]/60 group`}
                >
                  {cardInside}
                </a>
              ) : (
                <div key={label} className={stylingBase}>
                  {cardInside}
                </div>
              )
            })}
          </div>

          {/* Social Network Grid Channels */}
          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#12121F]/40 border border-white/5 text-[#7A7A94] hover:text-[#7C5BFF] hover:border-[#7C5BFF]/30 hover:bg-[#12121F] transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form Module Shell */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="bg-[#12121F]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-500"
        >
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#7A7A94] mb-6 flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5BFF] animate-pulse" />
            Specification Grid Allocation Matrix
          </h2>
          <ContactForm />
        </motion.div>

      </div>
    </main>
  )
}