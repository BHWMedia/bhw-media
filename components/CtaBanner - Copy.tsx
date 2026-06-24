'use client'

import Link from 'next/link'

const BOOKING_URL = 'https://calendly.com/mediabhw'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-900 bg-gradient-to-r from-purple-950/10 via-[#05050A] to-cyan-950/10 py-24">
      {/* Premium ambient glow backdrops */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#7C5BFF]/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to build something remarkable?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg leading-relaxed text-neutral-400">
          {"Let's talk about your project. We'll come back with a clear plan and honest price within 24 hours."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[#7C5BFF] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#9B7FFF] hover:shadow-[0_0_40px_rgba(124,91,255,0.5)]"
          >
            Start a Project →
          </Link>
          
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#7C5BFF]/40 bg-[#7C5BFF]/10 px-8 py-4 font-semibold text-purple-300 transition-all duration-200 hover:border-[#7C5BFF]/70 hover:bg-[#7C5BFF]/20"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            Book a Free Audit
          </a>

          <Link
            href="/portfolio"
            className="rounded-full border border-neutral-800 bg-neutral-950/40 px-8 py-4 font-semibold text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:text-white"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}