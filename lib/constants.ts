// lib/constants.ts
// ─── BHW MEDIA — CENTRAL INTELLIGENCE ENGINE v2.5 ───────────────────────────
// Refactored with strict TypeScript typings and integrated Analytics/GTM engine.

export type AccentColor = 'violet' | 'cyan' | 'gold' | 'crimson'

// ─── GTM & ANALYTICS ENGINE ─────────────────────────────────────────────────
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

export type TrackingEvent =
  | { event: 'audit_warp_initiated'; location: 'portfolio_grid' | 'nav' | 'hero' }
  | { event: 'diagnostic_step_completed'; step: number; step_name: string }
  | { event: 'diagnostic_submitted'; email_captured: boolean }
  | { event: 'portfolio_filter_changed'; category: string }

declare global {
  interface Window { dataLayer: any[] }
}

export const trackEvent = (data: TrackingEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[GTM/Tracking] Event Dispatched:', data)
  }
}

// ─── IRIDESCENT VARIANT TOKEN MAP ──────────────────────────────────────────
export interface IridescentVariant {
  primary: string
  light: string
  glow: string
  glass: string
}

export const IRIDESCENT_VARIANTS: Record<AccentColor, IridescentVariant> = {
  violet: {
    primary: '#7C5BFF',
    light: '#B06EFF',
    glow: 'rgba(124, 91, 255, 0.28)',
    glass: 'rgba(124, 91, 255, 0.09)',
  },
  cyan: {
    primary: '#00D4FF',
    light: '#5EECFF',
    glow: 'rgba(0, 212, 255, 0.22)',
    glass: 'rgba(0, 212, 255, 0.07)',
  },
  gold: {
    primary: '#F5A623',
    light: '#FFD166',
    glow: 'rgba(245, 166, 35, 0.22)',
    glass: 'rgba(245, 166, 35, 0.07)',
  },
  crimson: {
    primary: '#FF4D6D',
    light: '#FF8FA3',
    glow: 'rgba(255, 77, 109, 0.22)',
    glass: 'rgba(255, 77, 109, 0.07)',
  },
}


// ─── SERVICES SCHEMA & REGISTRY ─────────────────────────────────────────────

export type ServiceIcon =
  | 'Globe'
  | 'LayoutDashboard'
  | 'Sparkles'
  | 'ShoppingBag'
  | 'Zap'
  | 'RefreshCw'

export interface ServiceItem {
  icon: ServiceIcon
  title: string
  body: string
  tag: string
  accent: AccentColor
  /** Anamorphic widescreen ratio for any hero/preview crop of this service, e.g. "2.39:1" or "16:9" */
  aspectRatio: string
  /** Whether dynamic top/bottom letterbox crop bars render around this service's visual */
  letterboxEnabled: boolean
  /** Highly letter-spaced premium sub-headline, distinct from `body` copy */
  cinematicTagline: string
  /** Resolves to the Phase 1 color token set via IRIDESCENT_VARIANTS[accent] */
  iridescentVariant: AccentColor
}

export const SERVICES: ServiceItem[] = [
  {
    icon: 'Globe',
    title: 'Web Architecture & Build',
    body: 'Custom-coded Next.js environments engineered for 99+ Core Web Vitals, sub-800ms FCP, and maximum conversion yield on every route.',
    tag: 'Next.js 16 · React 19 · Tailwind v4',
    accent: 'violet',
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'ENGINEERED IN THE DEEP VOID',
    iridescentVariant: 'violet',
  },
  {
    icon: 'LayoutDashboard',
    title: 'SaaS Product Design',
    body: 'Frictionless UI/UX architectures for SaaS platforms — from zero-dropoff onboarding activation flows to deep-data retention dashboards.',
    tag: 'Figma · Design Systems · UX',
    accent: 'cyan',
    aspectRatio: '16:9',
    letterboxEnabled: false,
    cinematicTagline: 'CLARITY AT VELOCITY',
    iridescentVariant: 'cyan',
  },
  {
    icon: 'Sparkles',
    title: 'Brand Identity Systems',
    body: 'Authoritative visual identity from core logo architecture to comprehensive brand guidelines — built to command immediate market authority.',
    tag: 'Logo · Typography · Guidelines',
    accent: 'gold',
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'AUTHORITY, RENDERED',
    iridescentVariant: 'gold',
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce Infrastructures',
    body: 'Headless Shopify and custom Next.js cart builds featuring seamless checkouts, cinematic product storytelling, and optimized revenue layouts.',
    tag: 'Shopify Plus · Next.js 16 · Stripe',
    accent: 'violet',
    aspectRatio: '16:9',
    letterboxEnabled: false,
    cinematicTagline: 'EVERY FRAME CONVERTS',
    iridescentVariant: 'violet',
  },
  {
    icon: 'Zap',
    title: 'Immersive Motion Design',
    body: 'High-fidelity Framer Motion physics, hardware-accelerated scroll-triggered reveals, and kinetic typography systems tuned for performance.',
    tag: 'Framer Motion · WebGL · CSS',
    accent: 'cyan',
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'WEIGHT, NOT FLOAT',
    iridescentVariant: 'cyan',
  },
  {
    icon: 'RefreshCw',
    title: 'Enterprise Growth Retainer',
    body: 'Dedicated scaling partnerships — performance monitoring, feature deployments, A/B testing infrastructure, and continuous iteration cycles.',
    tag: 'Analytics · Iteration · DevOps',
    accent: 'gold',
    aspectRatio: '16:9',
    letterboxEnabled: false,
    cinematicTagline: 'CONTINUOUS PRODUCTION',
    iridescentVariant: 'gold',
  },
]

// ─── LOGO MARQUEE ARRAY ─────────────────────────────────────────────────────

export const MARQUEE_BRANDS: string[] = [
  'Shopify Plus',
  'Next.js 16',
  'Vercel Edge',
  'Framer Motion',
  'Figma Enterprise',
  'Stripe Engine',
  'Supabase',
  'OpenAI Matrix',
  'Tailwind CSS v4',
  'TypeScript Pro',
]

// ─── WORKFLOW CONVERSION PIPELINE ───────────────────────────────────────────

export interface ProcessStep {
  num: string
  title: string
  body: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Architecture Audit',
    body: 'We tear down your current setup, analyze your market competitors, and engineer a technical blueprint designed purely for measurable ROI.',
  },
  {
    num: '02',
    title: 'High-Fidelity Prototyping',
    body: 'We design pixel-perfect, interactive Figma systems. You see exactly how the platform looks, feels, and moves before we write a single line of code.',
  },
  {
    num: '03',
    title: 'Production Engineering',
    body: 'Strict Next.js compiler environments. We build fast, secure, and fully typed React infrastructure deployed to Vercel global edge networks.',
  },
  {
    num: '04',
    title: 'Deployment & Scale',
    body: 'Rigorous QA, technical SEO foundation, and seamless DNS transition. You own 100% of the codebase and all intellectual property from day one.',
  },
]

// ─── SOCIAL PROOF ARCHIVE ───────────────────────────────────────────────────

export interface TestimonialItem {
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
  avatarUrl: string | null
  linkedinUrl: string | null
  companyUrl: string | null
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Marcus Webb',
    role: 'Founder, Stackform SaaS',
    quote:
      "BHW Media didn't just build our application — they engineered our market dominance. The platform's authority closed our seed round 3x faster than any deck could have.",
    rating: 5,
    avatar: 'MW',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format',
    linkedinUrl: 'https://linkedin.com/in/marcus-webb',
    companyUrl: 'https://stackform.io',
  },
  {
    name: 'Priya Nair',
    role: 'CMO, Aether Commerce',
    quote:
      'We abandoned a generic Shopify template for a BHW custom build. Revenue per visitor increased by 42% within 60 days of launch — no paid traffic changes.',
    rating: 5,
    avatar: 'PN',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format',
    linkedinUrl: 'https://linkedin.com/in/priya-nair',
    companyUrl: 'https://aethercommerce.co',
  },
  {
    name: 'James Okoye',
    role: 'CEO, Orion Web3 Studio',
    quote:
      'The interaction design is unmatched. Our lead investors literally stopped our Series A pitch to ask who built the platform. That question closed the round.',
    rating: 5,
    avatar: 'JO',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format',
    linkedinUrl: 'https://linkedin.com/in/james-okoye',
    companyUrl: 'https://orionprotocol.xyz',
  },
  {
    name: 'Sofia Mendez',
    role: 'Head of Product, Lumio AI',
    quote:
      '14 days from initial technical brief to live production. I have worked with large-scale agencies that took 6 months to deliver half this quality.',
    rating: 5,
    avatar: 'SM',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format',
    linkedinUrl: 'https://linkedin.com/in/sofia-mendez',
    companyUrl: 'https://lumio.ai',
  },
  {
    name: 'David Chen',
    role: 'Founder, NexLayer Cloud',
    quote:
      'Four separate enterprise CTOs requested introductions after seeing our infrastructure refresh. That is the actual ROI of elite engineering.',
    rating: 5,
    avatar: 'DC',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format',
    linkedinUrl: 'https://linkedin.com/in/david-chen-nexlayer',
    companyUrl: 'https://nexlayer.cloud',
  },
]

// ─── INTERACTIVE MATRIX SPECIFICATION ───────────────────────────────────────

export type ServiceVisualType =
  | 'lighthouse'
  | 'dashboard'
  | 'palette'
  | 'product'
  | 'timeline'
  | 'kanban'

export interface ServiceDetail {
  icon: ServiceIcon
  title: string
  accent: AccentColor
  description: string
  outcomes: string[]
  visual: ServiceVisualType
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    icon: 'Globe',
    title: 'Web Architecture',
    accent: 'violet',
    description:
      'Custom-coded marketing platforms built on Next.js 16. Engineered for speed, accessibility, and conversion — every pixel and every millisecond accounted for.',
    outcomes: [
      'Guaranteed 95+ Google Lighthouse Scores',
      'Mobile-first, WCAG 2.1 AA compliant',
      'Deployed to Vercel Edge with CI/CD',
      'Complete repository & IP handover',
    ],
    visual: 'lighthouse',
  },
  {
    icon: 'LayoutDashboard',
    title: 'SaaS Product Design',
    accent: 'cyan',
    description:
      'End-to-end product design for enterprise SaaS. We architect interfaces that convert initial traffic into activated, long-term retained users.',
    outcomes: [
      'Comprehensive Figma design system',
      'Frictionless <3 step activation flows',
      'Data-dense dashboard architecture',
      'Investor-ready interactive prototypes',
    ],
    visual: 'dashboard',
  },
  {
    icon: 'Sparkles',
    title: 'Brand Identity Systems',
    accent: 'gold',
    description:
      'A complete visual identity that establishes unquestionable market authority. From core logo marks to internal usage guidelines.',
    outcomes: [
      'Primary & alternate SVG logo marks',
      'Hex/RGB/CMYK color architecture',
      'Typography pairing & scale hierarchy',
      'Comprehensive Brand Master PDF',
    ],
    visual: 'palette',
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce Infrastructure',
    accent: 'violet',
    description:
      'High-volume digital storefronts. We obsess over the micro-interactions from product page to checkout to maximize gross conversion rates.',
    outcomes: [
      'Headless Next.js or Shopify Plus',
      'Checkout friction elimination (+18% CVR)',
      'Cinematic product page storytelling',
      'Global payment & ERP integrations',
    ],
    visual: 'product',
  },
  {
    icon: 'Zap',
    title: 'Motion & Interaction',
    accent: 'cyan',
    description:
      'Hardware-accelerated motion that makes digital products feel visceral. Scroll-triggered physics and interactions tuned for performance.',
    outcomes: [
      'Framer Motion scroll physics',
      'Hardware-accelerated kinetic type',
      'Seamless layout projection transitions',
      'Custom SVG micro-interaction libraries',
    ],
    visual: 'timeline',
  },
  {
    icon: 'RefreshCw',
    title: 'Enterprise Growth Retainer',
    accent: 'gold',
    description:
      'An elite engineering partnership for companies that scale rapidly. Weekly sprint cycles, uptime monitoring, and continuous platform evolution.',
    outcomes: [
      'Dedicated weekly engineering sprints',
      'Real-time core web vitals monitoring',
      'Priority slack channel (< 4hr SLA)',
      'Monthly architectural strategy calls',
    ],
    visual: 'kanban',
  },
]

// ─── VALUE MATRIX CONTROLLERS ───────────────────────────────────────────────

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  popular: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Architecture Sprint',
    price: '$495',
    description:
      'A low-risk, high-fidelity entry point. We engineer a premium landing page framework to validate your market and immediately convert intent.',
    features: [
      'High-converting single-page architecture',
      'Premium Liquid Nebula dark layout',
      'Polished Framer Motion interactions',
      'Next.js Edge network configuration',
      'Cost fully credited toward subsequent builds',
    ],
    cta: 'Start Sprint',
    popular: false,
  },
  {
    name: 'Platform Build',
    price: '$2,850',
    description:
      'For expanding businesses requiring an optimized multi-route infrastructure, robust headless data sync, and high-tier competitive positioning.',
    features: [
      'Comprehensive Next.js asynchronous routing tree',
      'Complete high-end Figma architectural design system',
      'Structured CMS sync (Sanity Studio or Supabase Base)',
      'Hardware-accelerated 3D parallax micro-interactions',
      'Direct structural channel with Lead Engineer',
      '90 days priority structural technical support',
    ],
    cta: 'Commission Build',
    popular: true,
  },
  {
    name: 'Enterprise Matrix',
    price: 'Custom',
    description:
      'For established organizations requiring enterprise product UI/UX scaling, continuous optimization pipelines, or custom infrastructure logic.',
    features: [
      'Infinite scalable application architectural canvas',
      'Headless transaction systems and isolation layers',
      'Custom backend gateway design & multi-tenant routing',
      'Private Slack War-Room with direct hotwire access',
      'Priority critical infrastructure <2hr operational SLA',
      'Quarterly system efficiency & security vector audits',
    ],
    cta: 'Request Audit',
    popular: false,
  },
]

// ─── HIGH-FIDELITY CASE STUDY FACTORY ───────────────────────────────────────

export type PortfolioCategory =
  | 'Real Estate'
  | 'Hospitality'
  | 'Fitness'
  | 'Automotive'
  | 'SaaS'
  | 'E-Commerce'
  | 'Web3'
  | 'Brand'

export type MockupType =
  | 'dashboard'
  | 'ecommerce'
  | 'web3'
  | 'brand'
  | 'saas'
  | 'finance'

export interface PortfolioItem {
  id: number
  slug: string
  title: string
  category: PortfolioCategory
  description: string
  tags: string[]
  color: AccentColor
  mockupType: MockupType
  image: string
  challenge: string
  methodology: string
  outcomeMetrics: string[]
  /** Anamorphic widescreen ratio for this case study's hero/cover render, e.g. "2.39:1" or "16:9" */
  aspectRatio: string
  /** Whether dynamic top/bottom letterbox crop bars render around this case study's hero */
  letterboxEnabled: boolean
  /** Highly letter-spaced premium sub-headline for the case study detail view */
  cinematicTagline: string
  /** Resolves to the Phase 1 color token set via IRIDESCENT_VARIANTS[color] */
  iridescentVariant: AccentColor
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    slug: 'aura-real-estate',
    title: 'Aura Real Estate Engine',
    category: 'Real Estate',
    description:
      'High-ticket commercial real estate pitch platform. Immersive mapping, interactive floor-plan overlays, and investor-grade data visualization that replaced static PDF decks entirely.',
    tags: ['Next.js 16', 'Mapbox GL', 'Framer Motion'],
    color: 'violet',
    mockupType: 'finance',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    challenge:
      'Aura required a way to present multi-million dollar properties to institutional investors without relying on static PDFs and generic CRM exports that failed to communicate the physical scale and premium positioning of the assets.',
    methodology:
      'We integrated interactive Mapbox GL instances with Framer Motion scroll-locked sequences for seamless geographic transitions between properties. A custom data visualization layer surfaced yield projections, floor-plan hotspots, and comparative market index data — all rendered client-side for sub-100ms interaction response.',
    outcomeMetrics: [
      '+140% Institutional Investor Engagement',
      'Zero-latency Interactive Map Renders',
      'Series A Pitch Deck Fully Retired',
    ],
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'SCALE, MADE TANGIBLE',
    iridescentVariant: 'violet',
  },
  {
    id: 2,
    slug: 'cafe-noire',
    title: 'Café Noirè Platform',
    category: 'Hospitality',
    description:
      'Cinematic digital storefront for a luxury hospitality group. Built for visceral brand connection, high-end reservation conversion, and a seamless table-booking journey.',
    tags: ['React 19', 'Motion Physics', 'Tailwind v4'],
    color: 'gold',
    mockupType: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop',
    challenge:
      'The brand possessed high-end physical locations and a Michelin-tier culinary program, but a digital presence that felt like a cheap WordPress template. Reservation volume was stagnating despite strong foot traffic and press coverage.',
    methodology:
      'We engineered a custom headless storefront with scroll-locked cinematic sequences, ambient sound design integration, and a smooth multi-step reservation booking engine. A bespoke Tailwind v4 design system captured the dark, art-deco visual identity of the physical space.',
    outcomeMetrics: [
      '+42% Reservation Volume Within 30 Days',
      '4.2s Average Session Duration Lift',
      'Direct Channel Margin Fully Preserved',
    ],
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'AMBIANCE, RENDERED IN CODE',
    iridescentVariant: 'gold',
  },
  {
    id: 3,
    slug: 'elite-fitness',
    title: 'Elite Fitness Terminal',
    category: 'Fitness',
    description:
      'Performance tracking dashboard for premium strength facilities. Real-time metric rendering, secure member authentication, and a mobile-first PWA architecture.',
    tags: ['Next.js 16', 'Recharts', 'Supabase'],
    color: 'cyan',
    mockupType: 'dashboard',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
    challenge:
      'Legacy gym management software was bloated, desktop-only, and causing measurable member churn. Coaches lacked real-time visibility into client training loads, and the member self-service portal had an 82% abandonment rate on mobile.',
    methodology:
      'We built a lightweight Next.js PWA powered by Supabase for real-time workout synchronization across coach and member roles. A Recharts-driven analytics dashboard surfaced progressive overload metrics, streak tracking, and performance benchmarks — all rendering under 100ms on 4G connections.',
    outcomeMetrics: [
      'Sub-100ms TTFB Across All Routes',
      '92% Active Member Adoption Rate',
      '0% Data Sync Failure Over 90 Days',
    ],
    aspectRatio: '16:9',
    letterboxEnabled: false,
    cinematicTagline: 'PERFORMANCE, IN REAL TIME',
    iridescentVariant: 'cyan',
  },
  {
    id: 4,
    slug: 'car-motors-repair',
    title: 'Car Motors Repair Engine',
    category: 'Automotive',
    description:
      'Localized service platform with instantaneous diagnostics intake, frictionless service scheduling, and a 100 Lighthouse score — engineered for high-ticket automotive service groups.',
    tags: ['Next.js 16', 'Intake Engine', 'Local SEO'],
    color: 'crimson',
    mockupType: 'saas',
    image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000&auto=format&fit=crop',
    challenge:
      'High-end automotive service groups were losing qualified leads daily through fragmented booking flows, 6-second mobile load times, and zero digital trust infrastructure. The previous site scored 31 on mobile Lighthouse and ranked on page 4 for primary service keywords.',
    methodology:
      'We architected a localized Next.js service platform with a diagnostic intake form featuring instant vehicle-type detection, a priority-booking scheduling engine with real-time slot availability, and a Lighthouse-optimized delivery layer using ISR for sub-1s FCP across all mobile network tiers. Structured JSON-LD schema was injected across all service pages for local SEO dominance.',
    outcomeMetrics: [
      '+210% Qualified Service Booking Rate',
      '100 / 100 Lighthouse Performance Score',
      'Sub-800ms First Contentful Paint on 3G',
    ],
    aspectRatio: '2.39:1',
    letterboxEnabled: true,
    cinematicTagline: 'PRECISION UNDER PRESSURE',
    iridescentVariant: 'crimson',
  },
]

// ─── FILTER CONTROLS ────────────────────────────────────────────────────────

export const PORTFOLIO_FILTERS = [
  'All',
  'Real Estate',
  'Hospitality',
  'Fitness',
  'Automotive',
  'SaaS',
  'E-Commerce',
  'Brand',
] as const

export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number]

// ─── STRUCTURAL ROUTING PATHWAYS ────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

// ─── ARTIFACT DETERMINISTIC QUERY HELPERS ───────────────────────────────────

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return PORTFOLIO.find((item) => item.slug === slug)
}

export function getRelatedPortfolioItems(
  currentSlug: string,
  category: PortfolioCategory,
  limit = 2
): PortfolioItem[] {
  return PORTFOLIO.filter(
    (item) => item.slug !== currentSlug && item.category === category
  ).slice(0, limit)
}