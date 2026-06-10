'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: TRANSITION_EASE,
      }}
    >
      {children}
    </motion.div>
  )
}