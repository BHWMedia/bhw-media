'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { GlowCard } from '@/components/GlowCard'
import { SERVICES } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Zap,
  RefreshCw,
}

const EASE = [0.16, 1, 0.3, 1] as const

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {SERVICES.map((service) => {
        const Icon = ICONS[service.icon]
        return (
          <motion.div
            key={service.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <GlowCard
              icon={<Icon className="h-5 w-5" />}
              title={service.title}
              body={service.body}
              tag={service.tag}
              accentColor={service.accent}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
