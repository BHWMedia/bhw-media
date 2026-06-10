'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function ValidationsBar() {
  return (
    <section className="py-12 bg-black border-b border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Clutch Rating */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-4 md:py-0"
          >
            <div className="flex items-center gap-1 mb-2 text-[#F5A623]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill="currentColor" />
              ))}
            </div>
            <div className="text-white font-semibold tracking-tight text-lg">5.0 / 5.0 Rating</div>
            <div className="text-[#7A7A94] text-xs font-mono tracking-widest uppercase mt-1">Verified on Clutch</div>
          </motion.div>

          {/* Independent Awards */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center py-4 md:py-0"
          >
            <div className="text-[#00D4FF] font-bold text-2xl mb-1 leading-none tracking-tighter">
              Awwwards.
            </div>
            <div className="text-white font-semibold tracking-tight text-lg">Honorable Mention</div>
            <div className="text-[#7A7A94] text-xs font-mono tracking-widest uppercase mt-1">UI/UX Excellence</div>
          </motion.div>

          {/* Output Metric */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-4 md:py-0"
          >
            <div className="text-[#7C5BFF] font-bold text-3xl mb-1 leading-none tracking-tighter">
              $40M+
            </div>
            <div className="text-white font-semibold tracking-tight text-lg">Client Revenue</div>
            <div className="text-[#7A7A94] text-xs font-mono tracking-widest uppercase mt-1">Generated via our platforms</div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}