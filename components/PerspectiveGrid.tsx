
// components/PerspectiveGrid.tsx
'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Film, Layers, Monitor, Move, Sparkles } from 'lucide-react'

// ─── Interfaces & Types ───────────────────────────────────────────────────────

interface PortfolioItem {
  id: string
  image: string
  title: string
  category: string
  route: string
  description: string
  gridSpanClass: string
  parallazZ: number
}

// ─── Cinematic Media Data ─────────────────────────────────────────────────────

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'cinematic-1',
    image: '/real-estate.jpg',
    title: 'Luxury Pitch Engine',
    category: 'Real Estate Architecture',
    route: '/audit?project=realestate',
    description: 'Bespoke spatial design systems engineered for high-ticket acquisition vectors.',
    gridSpanClass: 'col-span-2 row-span-2 md:h-[450px]',
    parallazZ: 40,
  },
  {
    id: 'cinematic-2',
    image: '/cafe.jpg',
    title: 'Café Noirè Platform',
    category: 'Hospitality Ecosystem',
    route: '/audit?project=cafe',
    description: 'Immersive dark-mode transaction hubs processing flawless operational scale.',
    gridSpanClass: 'col-span-1 row-span-1 md:h-[210px]',
    parallazZ: -20,
  },
  {
    id: 'cinematic-3',
    image: '/fitness.jpg',
    title: 'Elite Fitness Terminal',
    category: 'Biometric Web Systems',
    route: '/audit?project=fitness',
    description: 'High-frequency rendering pipelines tracking real-time performance analytics.',
    gridSpanClass: 'col-span-1 row-span-2 md:h-[450px]',
    parallazZ: 60,
  },
  {
    id: 'cinematic-4',
    image: '/car-motors.jpg',
    title: 'Velocity Repair Engine',
    category: 'Automotive Core Hub',
    route: '/audit?project=automotive',
    description: 'High-octane commercial interfaces built on ultra-fast network architecture.',
    gridSpanClass: 'col-span-1 row-span-1 md:h-[210px]',
    parallazZ: 10,
  },
]

const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const
const EASE_FLYIN = [0.22, 1, 0.36, 1] as const

// ─── Individual Cinematic Card Component ──────────────────────────────────────

interface GridItemProps {
  item: PortfolioItem
  parentMouseX: any
  parentMouseY: any
  bounds: { width: number; height: number }
}

function PerspectiveGridItem({ item, parentMouseX, parentMouseY, bounds }: GridItemProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // High-inertia individual springs to calculate micro-parallax displacement fields
  const itemSpringX = useSpring(0, { stiffness: 40, damping: 12 })
  const itemSpringY = useSpring(0, { stiffness: 40, damping: 12 })

  // Mathematical Tracking of Focal Offsets and Euclidean Distance
  useEffect(() => {
    if (!cardRef.current || bounds.width === 0) return

    const calculateFocalDistance = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const itemCenterX = rect.left + rect.width / 2
      const itemCenterY = rect.top + rect.height / 2

      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2

      // Compute geometric offsets from the focal center lines
      const deltaX = itemCenterX - viewportCenterX
      const deltaY = itemCenterY - viewportCenterY

      // Feed high-inertia offsets back into the local transformation node
      itemSpringX.set(deltaX * 0.04)
      itemSpringY.set(deltaY * 0.04)
    }

    // Connect to global physics tick handlers
    const unsubscribeX = parentMouseX.on('change', calculateFocalDistance)
    const unsubscribeY = parentMouseY.on('change', calculateFocalDistance)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [parentMouseX, parentMouseY, bounds, itemSpringX, itemSpringY])

  // Map Euclidean vectors dynamically to cinematic optical artifacts
  const localParallaxX = useTransform(itemSpringX, (v) => v * (item.parallazZ * 0.02))
  const localParallaxY = useTransform(itemSpringY, (v) => v * (item.parallazZ * 0.02))
  
  // Depth-of-Field Simulation: Blur expands as elements drift away on the Z axis
  const dynamicBlur = useTransform(itemSpringX, (v) => {
    const combinedOffset = Math.abs(v) + Math.abs(itemSpringY.get())
    const blurPixels = Math.min(combinedOffset * 0.12, 8)
    return `blur(${blurPixels}px)`
  })

  const dynamicBrightness = useTransform(itemSpringX, (v) => {
    const combinedOffset = Math.abs(v) + Math.abs(itemSpringY.get())
    return Math.max(1 - combinedOffset * 0.003, 0.75)
  })

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950/40 group cursor-pointer ${item.gridSpanClass}`}
      style={{
        x: localParallaxX,
        y: localParallaxY,
        z: item.parallazZ,
        filter: dynamicBlur,
        opacity: dynamicBrightness,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: 'rgba(255,255,255,0.2)',
        transition: { duration: 0.4, ease: 'easeOut' } 
      }}
    >
      <Link href={item.route} className="block w-full h-full relative group">
        {/* Hardware Mockup Viewport */}
        <div className="w-full h-full relative min-h-[250px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Internal Specular Lens Flare Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-cyan-500/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-overlay" />
        </div>

        {/* Cinematic Card Overlay Information */}
        <div 
          className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end transform translate-z-[30px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400 mb-2 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-ping" />
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-cyan-200 transition-colors duration-300">
            {item.title}
            <ArrowUpRight size={16} className="text-white/40 group-hover:text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </h3>
          <p className="mt-2 text-xs text-neutral-400 font-light line-clamp-2 max-w-sm group-hover:text-neutral-300 transition-colors duration-300">
            {item.description}
          </p>
        </div>
        
        {/* Tech Border Specular Wrap */}
        <div className="absolute inset-0 border border-inset border-white/0 group-hover:border-white/10 rounded-2xl pointer-events-none transition-colors duration-500 z-30" />
      </Link>
    </motion.div>
  )
}

// ─── Master Continuous Multi-Layer Canvas ─────────────────────────────────────

export function PerspectiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({ width: 0, height: 0 })
  const [isCinematicsComplete, setIsCinematicsComplete] = useState(false)

  // System Core Coordinates (Mouse Input Layers)
  const globalMouseX = useMotionValue(0)
  const globalMouseY = useMotionValue(0)

  // System High Inertia Tracking Springs
  const cameraSpringX = useSpring(globalMouseX, { stiffness: 15, damping: 25, mass: 1.5 })
  const cameraSpringY = useSpring(globalMouseY, { stiffness: 15, damping: 25, mass: 1.5 })

  // Mapping Global Motion Vectors to Matrix Field Rotation Transforms
  const matrixRotateX = useTransform(cameraSpringY, [0, bounds.height || 1000], [12, -12])
  const matrixRotateY = useTransform(cameraSpringX, [0, bounds.width || 1000], [-12, 12])
  const matrixTranslateX = useTransform(cameraSpringX, [0, bounds.width || 1000], [40, -40])
  const matrixTranslateY = useTransform(cameraSpringY, [0, bounds.width || 1000], [40, -40])

  // Responsive Grid Dimension Tracker Node
  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setBounds({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })
    resizeObserver.observe(containerRef.current)

    // Center values to establish zero-field calibration on initial build
    globalMouseX.set(window.innerWidth / 2)
    globalMouseY.set(window.innerHeight / 2)

    return () => resizeObserver.disconnect()
  }, [globalMouseX, globalMouseY])

  // Low Frequency Micro-Drift Physics Engine (Live Spatial Camera Panning)
  useEffect(() => {
    let animationFrameId: number
    let trackingTime = 0

    const executeDriftCycle = () => {
      trackingTime += 0.003
      // Inject subtle trigonometry waves to ensure canvas is always organically drifting
      if (globalMouseX.get() === window.innerWidth / 2 && globalMouseY.get() === window.innerHeight / 2) {
        const driftOffsetX = (window.innerWidth / 2) + Math.sin(trackingTime) * 35
        const driftOffsetY = (window.innerHeight / 2) + Math.cos(trackingTime * 0.8) * 35
        cameraSpringX.set(driftOffsetX)
        cameraSpringY.set(driftOffsetY)
      }
      animationFrameId = requestAnimationFrame(executeDriftCycle)
    }

    animationFrameId = requestAnimationFrame(executeDriftCycle)
    return () => cancelAnimationFrame(animationFrameId)
  }, [cameraSpringX, cameraSpringY, globalMouseX, globalMouseY])

  const handleSpatialTracking = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return
    const { left, top } = containerRef.current.getBoundingClientRect()
    globalMouseX.set(event.clientX - left)
    globalMouseY.set(event.clientY - top)
  }, [globalMouseX, globalMouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#030303] flex flex-col justify-center items-center overflow-hidden py-24 px-6 md:px-12"
      onMouseMove={handleSpatialTracking}
    >
      {/* ── SCENE 1: THEATRICAL ANAMORPHIC SHUTTER OPENING SEQUENCE ── */}
      <AnimatePresence onExitComplete={() => setIsCinematicsComplete(true)}>
        {!isCinematicsComplete && (
          <>
            {/* Top Mask */}
            <motion.div
              initial={{ height: '50vh' }}
              animate={{ height: '0vh' }}
              exit={{ height: '0vh' }}
              transition={{ duration: 1.8, delay: 0.5, ease: EASE_CINEMATIC }}
              className="absolute top-0 inset-x-0 bg-black z-50 pointer-events-none border-b border-neutral-900"
            />
            {/* Bottom Mask */}
            <motion.div
              initial={{ height: '50vh' }}
              animate={{ height: '0vh' }}
              exit={{ height: '0vh' }}
              transition={{ duration: 1.8, delay: 0.5, ease: EASE_CINEMATIC }}
              className="absolute bottom-0 inset-x-0 bg-black z-50 pointer-events-none border-t border-neutral-900"
            />
          </>
        )}
      </AnimatePresence>

      {/* Atmospheric Space Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,16,40,0.6)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Section Text Header Content Layer */}
      <div className="relative z-20 text-center max-w-3xl mb-16 select-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_FLYIN }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 font-mono text-xs mb-4"
        >
          <Film size={12} className="text-indigo-400" />
          <span>PRODUCTION ENGINE MULTIPLEX</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: EASE_FLYIN }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
        >
          Curated Web <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Deployments</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-4 text-sm md:text-base text-neutral-400 font-light max-w-xl mx-auto"
        >
          Interact with the live deep-field projection matrix. Click any production cell vector to initialize full architecture audits.
        </motion.p>
      </div>

      {/* ── SCENE 2: VIRTUAL CAMERA FLY-IN 3D MULTIPLEX CANVAS ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 25, z: -400 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay: 0.6, ease: EASE_FLYIN }}
        className="relative z-10 w-full max-w-6xl mx-auto"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8"
          style={{
            rotateX: matrixRotateX,
            rotateY: matrixRotateY,
            x: matrixTranslateX,
            y: matrixTranslateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {PORTFOLIO_DATA.map((item) => (
            <PerspectiveGridItem
              key={item.id}
              item={item}
              parentMouseX={globalMouseX}
              parentMouseY={globalMouseY}
              bounds={bounds}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Interactive HUD Control Assistant Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 flex items-center gap-2 text-neutral-500 font-mono text-[10px] tracking-[0.2em] uppercase pointer-events-none select-none z-20"
      >
        <Move size={12} className="animate-bounce" />
        <span>Pan mouse across field to tilt spatial lens orientation</span>
      </motion.div>
    </section>
  )
}