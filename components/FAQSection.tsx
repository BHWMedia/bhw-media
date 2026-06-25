'use client'

import { useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const EASE = [0.16, 1, 0.3, 1] as const

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'Who owns the source code and repository once production concludes?',
    answer:
      'You do. 100%. BHW Media completely hands over unencumbered ownership of the complete GitHub repository, configuration keys, and deployment pipelines under your corporate IP. No licensing fees, no vendor lock-in, no ongoing dependency on us to keep your site live.',
  },
  {
    question: 'Why do you engineer custom platforms instead of using WordPress or Elementor?',
    answer:
      'Standard templates and drag-and-drop builders load massive amounts of bloated code and tracking scripts that degrade your site speed, inflate your bundle size, and create unpatched security surface areas. We build with native code to guarantee fast performance, secure architectures, and search engine optimisation that template systems structurally cannot deliver.',
  },
  {
    question: 'How does the rapid 14-day delivery sprint cycle operate?',
    answer:
      'We operate on highly streamlined sprint blocks. Week 1 finalises wireframe architecture, design system tokens, and asset pipelines in Figma. Week 2 handles full-stack component engineering and live staging builds deployed to Vercel Edge. You watch progress live via staging deployment links throughout — no opaque "we go quiet for 6 weeks" cycles.',
  },
  {
    question: "What does the 'Free Site Audit' actually include?",
    answer:
      'This is a custom evaluation conducted by our engineering team — not an automated Lighthouse report dump anyone can get for free. We manually review your live web layout to expose performance bottlenecks, hidden mobile rendering bugs, CTA architecture failures, and conversion friction points. Delivered as a structured PDF within 24 hours. No obligation, no pitch attached.',
  },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 text-text-muted transition-colors duration-300 group-hover:text-text-primary"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  )
}

function FAQItemRow({ question, answer, index }: FAQItem & { index: number }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      className="border-b border-border/40 last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      >
        <span className="flex items-start gap-4">
          <span
            className="mt-0.5 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-muted"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-semibold text-text-primary transition-colors duration-200 group-hover:text-violet">
            {question}
          </span>
        </span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 text-sm leading-relaxed text-text-secondary">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="lg:sticky lg:top-28"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            // Objection Handling
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Questions enterprise clients actually ask.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            No vague answers. No marketing copy. Direct responses to the concerns that stall high-ticket deals.
          </p>

          {/* Image block */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-border/30">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=700&auto=format&fit=crop"
              alt="Engineering team collaboration"
              className="w-full h-48 object-cover opacity-70"
              loading="lazy"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/audit"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-light hover:shadow-[0_0_28px_rgba(124,91,255,0.45)]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Get a Free Site Audit
            </Link>
          </div>
        </motion.div>

        {/* Right column */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItemRow key={faq.question} {...faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}