'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Clock,
  Globe,
  CheckCircle,
  Loader2,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react'

// ─── Drop-in Brand Icons ──────────────────────────────────────────────────────

const Github = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
)

const Twitter = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Linkedin = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

// ─── Validation schema ────────────────────────────────────────────────────────

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
    .min(1, 'Please select a project type'),
  budget: z
    .string()
    .min(1, 'Please select a budget range'),
  brief: z
    .string()
    .min(30, 'Please add more detail — minimum 30 characters')
    .max(2000, 'Brief is too long — maximum 2000 characters'),
  referral: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// ─── Static data ──────────────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'mediabhw@gmail.com',
    href: 'mailto:mediabhw@gmail.com',
    accent: '#7C5BFF',
  },
  {
    Icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    accent: '#00D4FF',
  },
  {
    Icon: Globe,
    label: 'Working With',
    value: 'Clients globally',
    href: null,
    accent: '#F5A623',
  },
]

const SOCIAL_LINKS = [
  {
    Icon: Github,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    Icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    Icon: Linkedin,
    href: 'https://linkedin.com/company/bhwmedia',
    label: 'LinkedIn',
  },
  {
    Icon: Instagram,
    href: 'https://instagram.com/media._bhw',
    label: 'Instagram',
  },
]

const PROJECT_TYPES = [
  'Web Design & Development',
  'SaaS Product Design',
  'Brand Identity',
  'E-Commerce Build',
  'Motion & Interaction Design',
  'Growth Retainer Plan',
  'Not sure yet — tell me more',
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
  'Social Media',
  'Referral from someone',
  'Portfolio / Dribbble',
  'Other',
]

// ─── Shared input styles ──────────────────────────────────────────────────────

const baseInputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#1A1A24',
  border: '1px solid rgba(58,58,78,0.7)',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  color: '#FFFFFF',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

const focusStyle: React.CSSProperties = {
  borderColor: '#7C5BFF',
  boxShadow: '0 0 0 3px rgba(124,91,255,0.18)',
}

const errorBorderStyle: React.CSSProperties = {
  borderColor: '#FF4D6D',
}

// ─── Reusable field components ────────────────────────────────────────────────

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      className="block text-sm font-medium mb-1.5"
      style={{ color: '#C8C8D8' }}
    >
      {children}
      {required && (
        <span style={{ color: '#7C5BFF', marginLeft: '2px' }}>*</span>
      )}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1.5 text-xs mt-1.5"
      style={{ color: '#FF4D6D' }}
    >
      <AlertCircle size={11} />
      {message}
    </motion.p>
  )
}

function StyledInput({
  hasError,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true)
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        props.onBlur?.(e)
      }}
      style={{
        ...baseInputStyle,
        ...(focused ? focusStyle : {}),
        ...(hasError && !focused ? errorBorderStyle : {}),
      }}
    />
  )
}

function StyledSelect({
  hasError,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      {...props}
      onFocus={(e) => {
        setFocused(true)
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        props.onBlur?.(e)
      }}
      style={{
        ...baseInputStyle,
        ...(focused ? focusStyle : {}),
        ...(hasError && !focused ? errorBorderStyle : {}),
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A7A94' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
        color: props.value === '' ? '#7A7A94' : '#FFFFFF',
      }}
    >
      {children}
    </select>
  )
}

function StyledTextarea({
  hasError,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={(e) => {
        setFocused(true)
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        props.onBlur?.(e)
      }}
      style={{
        ...baseInputStyle,
        resize: 'none',
        ...(focused ? focusStyle : {}),
        ...(hasError && !focused ? errorBorderStyle : {}),
      }}
    />
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({
  email,
  onReset,
}: {
  email: string
  onReset: () => void
}) {
  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="flex flex-col items-center justify-center text-center py-14 px-6"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(124,91,255,0.15)' }}
      >
        <CheckCircle size={40} style={{ color: '#7C5BFF' }} />
      </div>

      <h3
        className="font-bold text-2xl mb-3"
        style={{ color: '#FFFFFF' }}
      >
        Message received.
      </h3>

      <p
        className="text-sm leading-relaxed max-w-xs mb-2"
        style={{ color: '#C8C8D8' }}
      >
        We&apos;ll review your brief and come back with a clear plan within 24 hours.
      </p>

      <p className="text-xs mb-8" style={{ color: '#7A7A94' }}>
        Look out for us at{' '}
        <span style={{ color: '#00D4FF' }}>{email}</span>
      </p>

      <button
        onClick={onReset}
        className="text-sm transition-colors duration-200 underline underline-offset-4"
        style={{ color: '#7A7A94' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#7A7A94'
        }}
      >
        Send another message
      </button>
    </motion.div>
  )
}

// ─── The form ─────────────────────────────────────────────────────────────────

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
        throw new Error(body?.error ?? 'Send failed')
      }

      setSubmittedEmail(data.email)
      setIsSubmitted(true)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error'
      setSubmitError(
        message === 'Send failed'
          ? 'Something went wrong on our end. Please email us directly at mediabhw@gmail.com'
          : message,
      )
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setSubmitError('')
    setSubmittedEmail('')
    reset()
  }

  if (isSubmitted) {
    return <SuccessState email={submittedEmail} onReset={handleReset} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* ── Row: Name + Email ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel required>Full Name</FieldLabel>
          <StyledInput
            {...register('name')}
            placeholder="Your name"
            hasError={!!errors.name}
            autoComplete="name"
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <FieldLabel required>Email Address</FieldLabel>
          <StyledInput
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            hasError={!!errors.email}
            autoComplete="email"
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* ── Company ── */}
      <div>
        <FieldLabel>Company / Brand</FieldLabel>
        <StyledInput
          {...register('company')}
          placeholder="Your company name (optional)"
          autoComplete="organization"
        />
      </div>

      {/* ── Row: Project type + Budget ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel required>Project Type</FieldLabel>
          <StyledSelect
            {...register('projectType')}
            hasError={!!errors.projectType}
            value={watchedProjectType}
          >
            <option value="" disabled>
              Select a service
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </StyledSelect>
          <FieldError message={errors.projectType?.message} />
        </div>

        <div>
          <FieldLabel required>Budget Range</FieldLabel>
          <StyledSelect
            {...register('budget')}
            hasError={!!errors.budget}
            value={watchedBudget}
          >
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </StyledSelect>
          <FieldError message={errors.budget?.message} />
        </div>
      </div>

      {/* ── Project brief ── */}
      <div>
        <FieldLabel required>Project Brief</FieldLabel>
        <StyledTextarea
          {...register('brief')}
          rows={5}
          placeholder="Describe what you're building, the problem you're solving, and any reference sites you love..."
          hasError={!!errors.brief}
        />
        <FieldError message={errors.brief?.message} />
      </div>

      {/* ── Referral ── */}
      <div>
        <FieldLabel>How did you find us?</FieldLabel>
        <StyledSelect
          {...register('referral')}
          value={watchedReferral ?? ''}
        >
          <option value="">Select (optional)</option>
          {REFERRAL_SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </StyledSelect>
      </div>

      {/* ── Submit button ── */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0"
        style={{
          backgroundColor: isSubmitting ? '#5A3FD4' : '#7C5BFF',
          opacity: isSubmitting ? 0.75 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#9B7FFF'
            e.currentTarget.style.boxShadow =
              '0 8px 30px rgba(124,91,255,0.45)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isSubmitting
            ? '#5A3FD4'
            : '#7C5BFF'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending your brief...
          </>
        ) : (
          <>
            Send Project Brief
            <ArrowUpRight size={15} />
          </>
        )}
      </button>

      {/* ── Submit error ── */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm"
            style={{
              backgroundColor: 'rgba(255,77,109,0.1)',
              border: '1px solid rgba(255,77,109,0.3)',
              color: '#FF4D6D',
            }}
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: '#05050A',
        paddingTop: '7rem',
        paddingBottom: '6rem',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Info column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-mono text-xs uppercase tracking-[0.15em]"
              style={{ color: '#00D4FF' }}
            >
              // GET IN TOUCH
            </span>

            <h1
              className="font-bold tracking-tight mt-3 mb-5 leading-tight"
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              Let&apos;s build something remarkable.
            </h1>

            <p
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: '#C8C8D8' }}
            >
              Whether you have a polished brief, a rough idea, or just a budget
              — we&apos;ll help you figure out the rest. Most projects kick off
              within 72 hours of your first message.
            </p>

            {/* Info cards */}
            <div className="space-y-3 mb-10">
              {INFO_CARDS.map(({ Icon, label, value, href, accent }) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${accent}18` }}
                    >
                      <Icon size={17} style={{ color: accent }} />
                    </div>
                    <div>
                      <p
                        className="font-mono text-xs mb-0.5"
                        style={{ color: '#7A7A94' }}
                      >
                        {label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                        {value}
                      </p>
                    </div>
                  </div>
                )

                const cardStyle: React.CSSProperties = {
                  backgroundColor: '#1A1A24',
                  border: '1px solid rgba(58,58,78,0.6)',
                  borderRadius: '0.875rem',
                  padding: '1rem',
                  display: 'block',
                  textDecoration: 'none',
                  width: '100%',
                }

                return href ? (
                  <a
                    key={label}
                    href={href}
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}50`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(58,58,78,0.6)'
                    }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} style={cardStyle}>
                    {inner}
                  </div>
                )
              })}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none"
                  style={{
                    backgroundColor: '#1A1A24',
                    border: '1px solid rgba(58,58,78,0.6)',
                    color: '#7A7A94',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#7C5BFF'
                    e.currentTarget.style.borderColor =
                      'rgba(124,91,255,0.5)'
                    e.currentTarget.style.backgroundColor = '#22222E'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#7A7A94'
                    e.currentTarget.style.borderColor =
                      'rgba(58,58,78,0.6)'
                    e.currentTarget.style.backgroundColor = '#1A1A24'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              backgroundColor: '#111118',
              border: '1px solid rgba(58,58,78,0.5)',
              borderRadius: '1.25rem',
              padding: '2rem',
            }}
          >
            <h2
              className="font-semibold text-xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Tell us about your project
            </h2>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </main>
  )
}