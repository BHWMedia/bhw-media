'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { TESTIMONIALS, type TestimonialItem } from '@/lib/constants'

// ─── Constants ─────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Inline SVG Nodes ──────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

// ─── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({
  item,
  size = 44,
}: {
  item: TestimonialItem
  size?: number
}) {
  const [imgError, setImgError] = useState(false)

  if (item.avatarUrl && !imgError) {
    return (
      <div
        className="relative flex-shrink-0 rounded-full overflow-hidden ring-2 ring-border/40"
        style={{ width: size, height: size }}
      >
        <Image
          src={item.avatarUrl}
          alt={item.name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-elevated ring-2 ring-border/40 font-semibold text-violet"
      style={{ width: size, height: size, fontSize: size * 0.33 }}
    >
      {item.avatar}
    </div>
  )
}

// ─── Star Row ─────────────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{ color: i < rating ? '#F5A623' : '#3A3A4E' }}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  )
}

// ─── LinkedIn Verification Badge ──────────────────────────────────────────────

function LinkedInBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View LinkedIn profile"
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-all duration-200"
      style={{
        backgroundColor: 'rgba(10,102,194,0.12)',
        border: '1px solid rgba(10,102,194,0.25)',
        color: '#6BA3D6',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.22)'
        e.currentTarget.style.borderColor = 'rgba(10,102,194,0.5)'
        e.currentTarget.style.color = '#93BEE8'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.12)'
        e.currentTarget.style.borderColor = 'rgba(10,102,194,0.25)'
        e.currentTarget.style.color = '#6BA3D6'
      }}
    >
      <LinkedInIcon />
      Verified
    </a>
  )
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({
  item,
  index,
}: {
  item: TestimonialItem
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-full flex-col rounded-2xl bg-card p-6 transition-all duration-500"
      style={{
        border: `1px solid ${hovered ? 'rgba(124,91,255,0.45)' : 'rgba(58,58,78,0.5)'}`,
        boxShadow: hovered
          ? '0 20px 56px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,91,255,0.12), inset 0 1px 0 rgba(124,91,255,0.08)'
          : '0 4px 24px rgba(0,0,0,0.18)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Hover glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(135deg, rgba(124,91,255,0.06) 0%, rgba(0,212,255,0.02) 100%)',
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Stars */}
        <div className="mb-4">
          <StarRow rating={item.rating} />
        </div>

        {/* Quote body */}
        <blockquote className="mb-6 flex-1 text-sm italic leading-relaxed text-text-secondary">
          &ldquo;{item.quote}&rdquo;
        </blockquote>

        {/* Author row */}
        <div className="flex items-center gap-3">
          <Avatar item={item} size={44} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-text-primary leading-tight">
                {item.name}
              </p>
              {item.linkedinUrl && (
                <LinkedInBadge href={item.linkedinUrl} />
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] transition-colors duration-200 text-text-muted hover:text-cyan"
                  aria-label={`Visit ${item.role} company`}
                >
                  {item.role}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-text-muted">
                  {item.role}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Featured Large Card ───────────────────────────────────────────────────────

function FeaturedCard({ item }: { item: TestimonialItem }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative col-span-1 md:col-span-2 flex flex-col rounded-2xl bg-card p-7 transition-all duration-500"
      style={{
        border: `1px solid ${hovered ? 'rgba(124,91,255,0.55)' : 'rgba(58,58,78,0.6)'}`,
        boxShadow: hovered
          ? '0 28px 72px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,91,255,0.15), inset 0 1px 0 rgba(124,91,255,0.1)'
          : '0 8px 32px rgba(0,0,0,0.22)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(135deg, rgba(124,91,255,0.09) 0%, rgba(0,212,255,0.03) 60%, transparent 100%)',
          opacity: hovered ? 1 : 0.6,
        }}
        aria-hidden="true"
      />

      {/* Corner accent mark */}
      <div
        className="pointer-events-none absolute right-7 top-7 font-mono text-[80px] font-bold leading-none select-none"
        style={{ color: 'rgba(124,91,255,0.06)', lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Stars */}
        <div className="mb-5">
          <StarRow rating={item.rating} />
        </div>

        {/* Quote — editorial word-by-word reveal */}
        <blockquote className="mb-7 flex-1 text-base italic leading-relaxed text-text-secondary sm:text-lg">
          &ldquo;
          <WordReveal text={item.quote.replace(/^"|"$/g, '')} />
          &rdquo;
        </blockquote>

        {/* Author row */}
        <div className="flex flex-wrap items-center gap-4">
          <Avatar item={item} size={52} />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-base font-bold text-text-primary leading-tight">
                {item.name}
              </p>
              {item.linkedinUrl && (
                <LinkedInBadge href={item.linkedinUrl} />
              )}
            </div>
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs transition-colors duration-200 text-text-muted hover:text-cyan"
                aria-label={`Visit ${item.role} company`}
              >
                {item.role}
                <ExternalLinkIcon />
              </a>
            ) : (
              <span className="font-mono text-xs text-text-muted">
                {item.role}
              </span>
            )}
          </div>

          {/* Divider + aggregate signal */}
          <div className="ml-auto hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: '#F5A623' }}>
                  <StarIcon />
                </span>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              5.0 / 5.0 · Clutch Verified
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── TestimonialsGrid Shell ────────────────────────────────────────────────────

export function TestimonialsGrid() {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null

  const [featured, ...rest] = TESTIMONIALS

  // Distribute remaining cards into two columns for a natural asymmetric masonry
  const leftCol: TestimonialItem[] = []
  const rightCol: TestimonialItem[] = []

  rest.forEach((item, i) => {
    if (i % 2 === 0) leftCol.push(item)
    else rightCol.push(item)
  })

  return (
    <div className="w-full">
      {/* Top aggregate trust signal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-10 flex flex-wrap items-center gap-6"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: '#F5A623' }}>
                <StarIcon />
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-text-primary">5.0</span>
          <span className="text-sm text-text-muted">across {TESTIMONIALS.length} verified clients</span>
        </div>
        <div
          className="h-4 w-px"
          style={{ backgroundColor: 'rgba(58,58,78,0.6)' }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{
              backgroundColor: 'rgba(124,91,255,0.1)',
              border: '1px solid rgba(124,91,255,0.2)',
              color: '#9B7FFF',
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="#9B7FFF" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Clutch Verified Reviews
          </span>
        </div>
      </motion.div>

      {/* Featured span-2 card */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <FeaturedCard item={featured} />
      </div>

      {/* Asymmetric two-column remainder grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {leftCol.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i * 2} />
          ))}
        </div>

        {/* Right column — offset downward for asymmetry on wider screens */}
        <div className="flex flex-col gap-5 sm:mt-10">
          {rightCol.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i * 2 + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}