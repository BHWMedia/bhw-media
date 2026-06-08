'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layout, ShoppingBag, Hexagon, Component, LineChart, Cpu } from 'lucide-react'
import { type PortfolioItem } from '@/lib/constants'

// Extend the interface locally to allow for optional images
interface ExtendedPortfolioItem extends PortfolioItem {
  image?: string;
}

interface PortfolioCardProps {
  item: ExtendedPortfolioItem
}

const EASE = [0.16, 1, 0.3, 1] as const

// Elite Theme Engine based on constants.ts colors
const getTheme = (color: string) => {
  switch (color) {
    case 'violet': return { text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', glow: 'rgba(139, 92, 246, 0.15)' }
    case 'cyan': return { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', glow: 'rgba(6, 182, 212, 0.15)' }
    case 'gold': return { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', glow: 'rgba(245, 158, 11, 0.15)' }
    case 'crimson': return { text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', glow: 'rgba(244, 63, 94, 0.15)' }
    default: return { text: 'text-zinc-400', border: 'border-zinc-500/30', bg: 'bg-zinc-500/10', glow: 'rgba(255, 255, 255, 0.1)' }
  }
}

// Map mockup types to high-end Lucide icons
const getMockupIcon = (type: string) => {
  switch (type) {
    case 'dashboard': return <Layout size={32} strokeWidth={1.5} />
    case 'ecommerce': return <ShoppingBag size={32} strokeWidth={1.5} />
    case 'web3': return <Hexagon size={32} strokeWidth={1.5} />
    case 'brand': return <Component size={32} strokeWidth={1.5} />
    case 'finance': return <LineChart size={32} strokeWidth={1.5} />
    case 'saas': return <Cpu size={32} strokeWidth={1.5} />
    default: return <Layout size={32} strokeWidth={1.5} />
  }
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const theme = getTheme(item.color)

  // Fluid 3D Physics Engine
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 30, stiffness: 200 })
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), { damping: 40, stiffness: 150 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), { damping: 40, stiffness: 150 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#0C0C12] transition-all duration-500"
    >
      {/* Base Structural Layer */}
      <div className="absolute inset-0 z-0 rounded-2xl border border-white/[0.08] transition-colors duration-500 group-hover:border-white/[0.15]" />
      
      {/* GPU-Accelerated Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(600px circle at ${glowX.get()} ${glowY.get()}, ${theme.glow}, transparent 40%)` }}
      />

      <div className="relative z-20 flex h-full flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
        
        {/* ── VISUAL HEADER (HYBRID ENGINE) ── */}
        <div className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border ${theme.border} ${item.image ? 'bg-black' : theme.bg}`}>
          
          {item.image ? (
            // Render Image if provided in constants.ts
            <>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/0 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
              <motion.img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </>
          ) : (
            // Render High-End Generative Background if no image exists
            <>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div className={`${theme.text} opacity-80`}>
                  {getMockupIcon(item.mockupType)}
                </div>
                <span className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase">
                  {item.mockupType} Matrix
                </span>
              </motion.div>
            </>
          )}

          {/* Floating Category Badge */}
          <div className="absolute left-3 top-3 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles size={10} className={theme.text} />
              {item.category}
            </span>
          </div>
        </div>

        {/* ── METADATA & CTA SECTION ── */}
        <div className="mt-6 flex flex-1 flex-col">
          <h3 className={`text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:${theme.text.replace('text-', '')}`}>
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-2">
            {item.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition-colors group-hover:border-white/10 group-hover:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          {/* High-Converting CTA Button */}
          <div className="mt-auto pt-6">
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/btn relative flex w-full items-center justify-center gap-2 rounded-lg border ${theme.border} ${theme.bg} px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}
                onClick={(e) => e.stopPropagation()}
              >
                Launch Live Platform
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>
            ) : (
              <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-white/30 cursor-not-allowed">
                Environment Offline
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}