'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Globe, Sparkles } from 'lucide-react'

// Define resilient TypeScript interfaces to fully support advanced metadata
export interface PortfolioItem {
  id: string | number
  title: string
  description: string
  category: string
  image: string
  tags?: string[]
  link?: string
  target?: string
}

interface PortfolioCardProps {
  item: PortfolioItem
}

const EASE = [0.16, 1, 0.3, 1] as const

export function PortfolioCard({ item }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Advanced mouse position tracking for the 3D tilt & dynamic glow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs to eliminate jitter and create high-end organic movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 25,
    stiffness: 150,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 25,
    stiffness: 150,
  })

  // Dynamic radial gradient positioning for the premium glowing backdrop
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), {
    damping: 30,
    stiffness: 200,
  })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), {
    damping: 30,
    stiffness: 200,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate normalized position relative to the center (-0.5 to 0.5)
    const width = rect.width
    const height = rect.height
    const mouseXPos = (e.clientX - rect.left) / width - 0.5
    const mouseYPos = (e.clientY - rect.top) / height - 0.5

    mouseX.set(mouseXPos)
    mouseY.set(mouseYPos)
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500"
    >
      {/* ── BACKGROUND LAYER & CARD OVERLAYS ── */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-500 bg-[#111118] group-hover:bg-[#14141F]" 
        style={{ border: '1px solid rgba(58, 58, 78, 0.4)' }}
      />
      
      {/* Premium Dynamic Spotlight Glow Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${glowX.get()} ${glowY.get()}, rgba(124, 91, 255, 0.12), transparent 40%)`,
        }}
      />

      <div className="relative z-20 flex h-full flex-col p-5" style={{ transform: 'translateZ(20px)' }}>
        
        {/* ── IMAGE SECTION (ASPECT-RATIO LOCK) ── */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-void">
          {/* Subtle thumbnail gradient mask */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/0 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
          
          <motion.img
            src={item.image || '/placeholder-portfolio.jpg'}
            alt={item.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          />

          {/* Floating Category Badge inside image space */}
          <div className="absolute left-4 top-4 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono tracking-wider text-cyan backdrop-blur-md bg-void/60 border border-white/5 uppercase">
              <Sparkles size={10} className="text-cyan animate-pulse" />
              {item.category}
            </span>
          </div>

          {/* Interactive Live Preview Trigger */}
          {item.link && (
            <div className="absolute right-4 bottom-4 z-20">
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white bg-violet/90 backdrop-blur-sm shadow-lg transition-transform hover:scale-110 hover:bg-violet-light"
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          )}
        </div>

        {/* ── DETAILS SECTION ── */}
        <div className="mt-5 flex flex-1 flex-col justify-between">
          <div>
            {/* Title with sleek interactive text reveal color highlight */}
            <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-violet">
              {item.title}
            </h3>

            {/* Target Audience / Pipeline Context Tag */}
            {item.target && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#7A7A94]">
                <Globe size={12} className="text-cyan" />
                Target: {item.target}
              </p>
            )}

            {/* Core Description Body */}
            <p className="mt-3 text-sm leading-relaxed text-[#C8C8D8] line-clamp-3">
              {item.description}
            </p>
          </div>

          {/* ── TECHNOLOGY PILLS FOOTER ── */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(58, 58, 78, 0.3)' }}>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-[#7A7A94] border border-white/[0.04] transition-all duration-300 group-hover:border-violet/20 group-hover:text-[#A3A3C2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}