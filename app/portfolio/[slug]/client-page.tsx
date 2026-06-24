// app/portfolio/[slug]/client-page.tsx
'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Activity, Target, Zap, CheckCircle2 } from 'lucide-react'

// Using dynamic Hex maps instead of Tailwind strings for actual glowing box-shadow math
const ACCENT_MAP: Record<string, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

export default function PortfolioClientPage({ item }: { item: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  
  const accentColor = ACCENT_MAP[item.color] || ACCENT_MAP.violet

  // Cinematic Parallax Scroll Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Track scroll depth to trigger the conversion engine
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setShowStickyCTA(true)
      } else {
        setShowStickyCTA(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Robust Fallbacks
  const tags = item.tags || ['Next.js App Router', 'React Server Components', 'Tailwind V4']
  const outcomeMetrics = item.outcomeMetrics || ['+340% Pipeline Velocity', 'Sub-40ms Load Times', '100% Lighthouse Score']

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)] overflow-hidden">
      
      {/* ─── 1. PARALLAX HERO WIDESCREEN ─── */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-bottom"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <Image
            sizes="100vw"
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover object-top opacity-40 filter saturate-50"
            sizes="100vw"
          />
          {/* Deep Space Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/30 via-transparent to-[#020202] z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-80 z-10" />
        </motion.div>

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors mb-8 group w-fit uppercase"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Return to Matrix
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span 
              className="inline-block px-3 py-1 mb-6 text-xs font-mono tracking-[0.2em] rounded-full uppercase backdrop-blur-md border"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor, borderColor: `${accentColor}30` }}
            >
              Deployment Phase // {item.category}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: string, i: number) => (
                <span key={i} className="text-xs font-mono text-neutral-400 border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── 2. 3D PERSPECTIVE DATA MODULES ─── */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Challenge Glass Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative p-10 rounded-3xl border border-white/5 bg-neutral-950/40 backdrop-blur-xl"
            style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}
          >
            <div className="absolute top-0 left-10 w-20 h-[1px]" style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}` }} />
            <Target size={24} style={{ color: accentColor }} className="mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">The Architectural Challenge</h2>
            <p className="text-neutral-400 leading-relaxed text-lg font-light">
              {item.challenge}
            </p>
          </motion.div>

          {/* Methodology Glass Panel (Staggered Downward) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative p-10 rounded-3xl border border-white/5 bg-neutral-950/40 backdrop-blur-xl lg:mt-24"
            style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}
          >
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-cyan-500 shadow-[0_0_20px_#00D4FF]" />
            <Zap size={24} className="text-cyan-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">The Engineering Methodology</h2>
            <p className="text-neutral-400 leading-relaxed text-lg font-light">
              {item.methodology}
            </p>
          </motion.div>

        </div>
      </div>

      {/* ─── 3. GLOWING HARDWARE BENTO METRICS ─── */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 py-24 border-t border-neutral-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Performance Vectors</h2>
          <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Measured Output Dynamics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomeMetrics.map((metric: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-[#080808] border border-neutral-800 overflow-hidden cursor-default"
            >
              {/* Internal Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent)` }}
              />
              <CheckCircle2 size={20} className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }} />
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-neutral-400 transition-all">
                {metric}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── 4. AGGRESSIVE STICKY CONVERSION ENGINE ─── */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 w-full max-w-2xl"
          >
            <div 
              className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-5 rounded-2xl backdrop-blur-2xl border bg-[#050505]/80"
              style={{ borderColor: `${accentColor}40`, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 40px ${accentColor}15` }}
            >
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-white font-bold tracking-tight">Require this level of architecture?</p>
                <p className="text-neutral-400 text-sm font-light">Deploy our diagnostic engine against your current infrastructure.</p>
              </div>
              <Link
                href={`/audit?ref=${item.slug}`}
                className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white overflow-hidden group w-full sm:w-auto justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Activity size={16} className="relative z-10 animate-pulse" />
                <span className="relative z-10">Launch Performance Audit</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}