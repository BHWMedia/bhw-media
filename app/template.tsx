'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const STEADICAM = { type: 'spring' as const, mass: 3, stiffness: 45, damping: 25 }

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
      transition={STEADICAM}
    >
      {children}
    </motion.div>
  )
}