'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectColor = 'violet' | 'cyan' | 'gold' | 'crimson'
type MockupType = 'dashboard' | 'ecommerce' | 'web3' | 'brand' | 'saas' | 'finance'
type Category = 'All' | 'SaaS' | 'E-Commerce' | 'Brand' | 'Web3'

interface Project {
  id: number
  title: string
  category: Exclude<Category, 'All'>
  description: string
  tags: string[]
  color: ProjectColor
  mockupType: MockupType
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ['All', 'SaaS', 'E-Commerce', 'Brand', 'Web3']

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Stackform',
    category: 'SaaS',
    description:
      'SaaS onboarding platform — zero to live in 12 days. Full design system, activation flow architecture, and dashboard built for retention.',
    tags: ['Next.js', 'Framer Motion', 'Design System'],
    color: 'violet',
    mockupType: 'dashboard',
  },
  {
    id: 2,
    title: 'Aether Commerce',
    category: 'E-Commerce',
    description:
      'Premium DTC fashion brand redesigned from a generic Shopify template to a custom luxury experience. Revenue per visitor increased 2× within 60 days.',
    tags: ['Shopify', 'Custom CSS', 'Motion Design'],
    color: 'gold',
    mockupType: 'ecommerce',
  },
  {
    id: 3,
    title: 'Orion Protocol',
    category: 'Web3',
    description:
      'Web3 launchpad platform with a dark cinematic aesthetic, wallet-connect UX, and real-time on-chain data visualisation.',
    tags: ['Next.js', 'Web3', 'Wagmi'],
    color: 'cyan',
    mockupType: 'web3',
  },
  {
    id: 4,
    title: 'Lumio AI',
    category: 'SaaS',
    description:
      'AI productivity SaaS — onboarding flow with 3-step activation, a dashboard built for feature discovery, and a Figma design system handed off to their in-house team.',
    tags: ['Figma', 'React', 'TypeScript'],
    color: 'violet',
    mockupType: 'saas',
  },
  {
    id: 5,
    title: 'NexLayer Cloud',
    category: 'SaaS',
    description:
      'Cloud infrastructure brand refresh — enterprise-grade visual language, B2B positioning, and a full marketing site rebuild that shortened their sales cycle.',
    tags: ['Brand', 'Next.js', 'Tailwind CSS'],
    color: 'cyan',
    mockupType: 'dashboard',
  },
  {
    id: 6,
    title: 'Vanta Studio',
    category: 'Brand',
    description:
      'Creative agency brand identity from scratch — primary and alternate logo marks, full color architecture, typography pairing, and a delivered brand guidelines PDF.',
    tags: ['Figma', 'Brand Identity', 'Typography'],
    color: 'gold',
    mockupType: 'brand',
  },
  {
    id: 7,
    title: 'Pulse Health',
    category: 'Web3',
    description:
      'Health-tech NFT platform — an accessible, clinical UI layered over complex blockchain infrastructure. WCAG 2.1 AA compliant.',
    tags: ['Web3', 'React', 'Framer Motion'],
    color: 'crimson',
    mockupType: 'web3',
  },
  {
    id: 8,
    title: 'Crest Capital',
    category: 'Brand',
    description:
      'Fintech brand identity and marketing site engineered for institutional authority. Three enterprise clients made contact within the first week of launch.',
    tags: ['Brand', 'Next.js', 'Motion Design'],
    color: 'gold',
    mockupType: 'finance',
  },
]

// ─── Accent colour maps ───────────────────────────────────────────────────────

const ACCENT: Record<ProjectColor, string> = {
  violet: '#7C5BFF',
  cyan: '#00D4FF',
  gold: '#F5A623',
  crimson: '#FF4D6D',
}

const ACCENT_GLOW: Record<ProjectColor, string> = {
  violet: 'rgba(124,91,255,0.22)',
  cyan: 'rgba(0,212,255,0.18)',
  gold: 'rgba(245,166,35,0.18)',
  crimson: 'rgba(255,77,109,0.18)',
}

// ─── CSS-only mockup components ───────────────────────────────────────────────

function DashboardMockup({ color }: { color: ProjectColor }) {
  const accent = ACCENT[color]
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      {/* Fake browser / app bar */}
      <div
        className="h-6 rounded-md flex items-center px-2.5 gap-1.5 flex-shrink-0"
        style={{ backgroundColor: 'rgba(5,5,10,0.8)' }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#FF4D6D' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#F5A623' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#3FB950' }}
        />
        <div
          className="ml-2 flex-1 h-2.5 rounded-sm"
          style={{ backgroundColor: 'rgba(58,58,78,0.5)' }}
        />
      </div>

      {/* Three metric cards */}
      <div className="flex gap-2 flex-shrink-0">
        {([0, 1, 2] as const).map((i) => (
          <div
            key={i}
            className="flex-1 rounded-lg p-2.5"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderTop: `2px solid ${accent}`,
            }}
          >
            <div
              className="h-1.5 w-8 rounded-full mb-2"
              style={{ backgroundColor: 'rgba(58,58,78,0.7)' }}
            />
            <div
              className="h-4 w-10 rounded"
              style={{ backgroundColor: `${accent}35` }}
            />
          </div>
        ))}
      </div>

      {/* Fake bar chart */}
      <div
        className="flex-1 rounded-lg p-2 overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex items-end gap-1 h-full">
          {[38, 62, 48, 78, 55, 88, 66, 82, 50, 72].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, ${accent}, ${accent}55)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommerceMockup({ color }: { color: ProjectColor }) {
  const accent = ACCENT[color]
  return (
    <div className="w-full h-full p-4 flex gap-3 items-center">
      {/* Product image placeholder */}
      <div
        className="w-2/5 h-full rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        <div
          className="w-10 h-10 rounded-lg opacity-40"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Product info */}
      <div className="flex-1 flex flex-col gap-2 h-full py-1">
        <div
          className="h-1.5 w-16 rounded-full"
          style={{ backgroundColor: 'rgba(58,58,78,0.6)' }}
        />
        <div
          className="h-3 w-24 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        />
        <div
          className="h-1.5 w-20 rounded-full"
          style={{ backgroundColor: 'rgba(58,58,78,0.4)' }}
        />
        <div
          className="h-1.5 w-14 rounded-full mt-0.5"
          style={{ backgroundColor: `${accent}70` }}
        />
        <div className="mt-auto">
          <div
            className="h-8 w-full rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accent }}
          >
            <span className="text-white text-[10px] font-semibold tracking-wide">
              Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Web3Mockup({ color }: { color: ProjectColor }) {
  const accent = ACCENT[color]
  const degrees = [0, 60, 120, 180, 240, 300]
  return (
    <div className="w-full h-full p-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div
          className="h-2 w-20 rounded-full"
          style={{ backgroundColor: 'rgba(5,5,10,0.6)' }}
        />
        <div
          className="px-3 py-1 rounded-full text-[9px] font-mono font-medium"
          style={{
            backgroundColor: `${accent}22`,
            color: accent,
          }}
        >
          Connected
        </div>
      </div>

      {/* Hex pattern orb */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-12 h-12">
          {degrees.map((deg, i) => (
            <div
              key={deg}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: `${accent}${i % 2 === 0 ? '88' : '44'}`,
                top: '50%',
                left: '50%',
                marginTop: -6,
                marginLeft: -6,
                transform: `rotate(${deg}deg) translateY(-22px)`,
              }}
            />
          ))}
          <div
            className="w-12 h-12 rounded-full absolute inset-0"
            style={{
              backgroundColor: `${accent}25`,
              border: `1.5px solid ${accent}`,
            }}
          />
        </div>
      </div>

      {/* Wallet bar */}
      <div
        className="h-8 rounded-lg flex items-center px-3 gap-2 flex-shrink-0"
        style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      >
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: accent }}
        />
        <div
          className="h-1.5 flex-1 rounded-full"
          style={{ backgroundColor: 'rgba(58,58,78,0.4)' }}
        />
        <div
          className="h-1.5 w-10 rounded-full"
          style={{ backgroundColor: 'rgba(58,58,78,0.25)' }}
        />
      </div>
    </div>
  )
}

function BrandMockup({ title, color }: { title: string; color: ProjectColor }) {
  const accent = ACCENT[color]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-5">
      {/* Logotype initials */}
      <div
        className="font-bold text-4xl tracking-tighter leading-none"
        style={{ color: accent }}
      >
        {title.slice(0, 2).toUpperCase()}
      </div>

      {/* Colour swatches */}
      <div className="flex gap-2">
        {[accent, `${accent}88`, `${accent}44`, '#3A3A4E'].map((c, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-lg"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Typography bars */}
      <div className="space-y-1.5 w-full">
        {[80, 55, 65].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.09)',
              width: `${w}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function SaaSMockup({ color }: { color: ProjectColor }) {
  const accent = ACCENT[color]
  return (
    <div className="w-full h-full flex gap-2 p-3">
      {/* Sidebar */}
      <div className="w-10 flex flex-col gap-2 pt-1 flex-shrink-0">
        {[true, false, false, false, false].map((active, i) => (
          <div
            key={i}
            className="h-7 rounded-lg"
            style={{
              backgroundColor: active
                ? `${accent}28`
                : 'rgba(255,255,255,0.04)',
              border: active ? `1px solid ${accent}45` : 'none',
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Top bar */}
        <div
          className="h-5 rounded-md flex items-center px-2 gap-1.5 flex-shrink-0"
          style={{ backgroundColor: 'rgba(5,5,10,0.6)' }}
        >
          <div
            className="h-1.5 w-8 rounded-full"
            style={{ backgroundColor: 'rgba(58,58,78,0.6)' }}
          />
          <div
            className="ml-auto h-1.5 w-5 rounded-full"
            style={{ backgroundColor: `${accent}60` }}
          />
        </div>

        {/* Content lines */}
        <div
          className="flex-1 rounded-lg p-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          {[70, 45, 85, 60].map((w, i) => (
            <div
              key={i}
              className="h-1.5 mb-2 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: `${w}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function FinanceMockup({ color }: { color: ProjectColor }) {
  const accent = ACCENT[color]
  const rows = ['+12.4%', '+8.1%', '−2.3%', '+19.7%', '+5.5%']
  return (
    <div className="w-full h-full p-3 flex flex-col gap-1.5">
      {/* Header row */}
      <div className="flex justify-between items-center mb-0.5 flex-shrink-0">
        <div
          className="h-2 w-16 rounded-full"
          style={{ backgroundColor: 'rgba(58,58,78,0.6)' }}
        />
        <div
          className="h-1.5 w-8 rounded-full"
          style={{ backgroundColor: `${accent}55` }}
        />
      </div>

      {/* Data rows */}
      {rows.map((val, i) => {
        const isNegative = val.startsWith('−')
        return (
          <div
            key={i}
            className="flex items-center gap-2 py-1"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span
              className="font-mono w-3 flex-shrink-0"
              style={{ fontSize: '9px', color: '#7A7A94' }}
            >
              {i + 1}
            </span>
            <div
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            />
            <span
              className="font-mono flex-shrink-0"
              style={{
                fontSize: '9px',
                color: isNegative ? '#FF4D6D' : accent,
              }}
            >
              {val}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ProjectMockup({
  mockupType,
  color,
  title,
}: {
  mockupType: MockupType
  color: ProjectColor
  title: string
}) {
  switch (mockupType) {
    case 'dashboard':
      return <DashboardMockup color={color} />
    case 'ecommerce':
      return <EcommerceMockup color={color} />
    case 'web3':
      return <Web3Mockup color={color} />
    case 'brand':
      return <BrandMockup title={title} color={color} />
    case 'saas':
      return <SaaSMockup color={color} />
    case 'finance':
      return <FinanceMockup color={color} />
    default:
      return <DashboardMockup color={color} />
  }
}

// ─── Portfolio card ───────────────────────────────────────────────────────────

function PortfolioCard({ project }: { project: Project }) {
  const accent = ACCENT[project.color]
  const glow = ACCENT_GLOW[project.color]
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#1A1A24',
        border: '1px solid rgba(58,58,78,0.55)',
        borderRadius: '1rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 64px ${glow}` : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Mockup area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '192px',
          backgroundColor: '#22222E',
          borderBottom: `2px solid ${accent}`,
        }}
      >
        <ProjectMockup
          mockupType={project.mockupType}
          color={project.color}
          title={project.title}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(5,5,10,0.85)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: accent }}
          >
            View Project
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1.5">
          <h3
            className="font-semibold text-lg leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            {project.title}
          </h3>
          <span
            className="font-mono text-[10px] px-2.5 py-1 rounded-full ml-2 flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
            }}
          >
            {project.category}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: '#C8C8D8' }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: '#22222E',
                color: '#7A7A94',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: '#05050A', paddingTop: '7rem', paddingBottom: '6rem' }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Page hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span
            className="font-mono text-xs uppercase tracking-[0.15em]"
            style={{ color: '#00D4FF' }}
          >
            // SELECTED WORK
          </span>

          <h1
            className="font-bold tracking-tight mt-3 mb-4"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
            }}
          >
            Work that speaks.
          </h1>

          <p
            className="text-lg leading-relaxed max-w-xl"
            style={{ color: '#C8C8D8' }}
          >
            Selected projects across SaaS, e-commerce, Web3, and brand identity. Every engagement is custom — no templates, no shortcuts.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-2.5 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{
                  backgroundColor: isActive ? '#7C5BFF' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#FFFFFF' : '#7A7A94',
                  border: isActive
                    ? '1px solid #7C5BFF'
                    : '1px solid rgba(255,255,255,0.1)',
                  outline: 'none',
                  boxShadow: isActive
                    ? '0 0 16px rgba(124,91,255,0.35)'
                    : 'none',
                }}
              >
                {cat}
              </button>
            )
          })}

          <span
            className="ml-auto font-mono text-xs self-center"
            style={{ color: '#7A7A94' }}
          >
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm mb-5" style={{ color: '#7A7A94' }}>
            These are just the highlights — there&apos;s more where this came from.
          </p>
          
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300"
            style={{ backgroundColor: '#7C5BFF' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#9B7FFF'
              e.currentTarget.style.boxShadow = '0 0 36px rgba(124,91,255,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#7C5BFF'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start your project
            <ArrowUpRight size={15} />
          </a>
        </motion.div>

      </div>
    </main>
  )
}