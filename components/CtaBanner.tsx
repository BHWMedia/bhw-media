import Link from 'next/link'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border/30 bg-gradient-to-r from-violet/20 via-studio to-cyan/10">
      {/* Floating blurred circles */}
      <div className="animate-float pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
      <div className="animate-float pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Ready to build something remarkable?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary">
          {
            "Let's talk about your project. We'll come back with a clear plan and honest price within 24 hours."
          }
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-violet px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,91,255,0.5)]"
          >
            Start a Project →
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-border px-8 py-4 font-semibold text-text-secondary transition-all duration-200 hover:border-violet hover:text-violet"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}
