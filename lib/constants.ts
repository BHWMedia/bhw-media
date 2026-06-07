export type AccentColor = 'violet' | 'cyan' | 'gold' | 'crimson'

export const SERVICES = [
  {
    icon: 'Globe',
    title: 'Web Design & Development',
    body: 'Custom-coded Next.js and React websites engineered for Core Web Vitals, conversion, and stunning visual impact.',
    tag: 'Next.js · React · Tailwind',
    accent: 'violet' as AccentColor,
  },
  {
    icon: 'LayoutDashboard',
    title: 'SaaS Product Design',
    body: 'Full UI/UX systems for SaaS platforms — from onboarding flows to dashboard architecture designed for activation and retention.',
    tag: 'Figma · Design Systems · UX',
    accent: 'cyan' as AccentColor,
  },
  {
    icon: 'Sparkles',
    title: 'Brand Identity Systems',
    body: 'Complete visual identity from logo mark to brand guidelines — built to position you as the authority in your market.',
    tag: 'Logo · Typography · Guidelines',
    accent: 'gold' as AccentColor,
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce Experiences',
    body: 'Premium Shopify and custom cart builds with seamless checkout, product storytelling, and conversion-optimized layouts.',
    tag: 'Shopify · Custom Cart · Stripe',
    accent: 'violet' as AccentColor,
  },
  {
    icon: 'Zap',
    title: 'Motion & Interaction Design',
    body: 'Framer Motion micro-animations, scroll-triggered reveals, and kinetic typography that make your product feel alive.',
    tag: 'Framer Motion · GSAP · CSS',
    accent: 'cyan' as AccentColor,
  },
  {
    icon: 'RefreshCw',
    title: 'Growth & Maintenance',
    body: 'Monthly retainer plans covering performance monitoring, feature builds, A/B testing, and continuous design iteration.',
    tag: 'Analytics · Iteration · Support',
    accent: 'gold' as AccentColor,
  },
]

export const MARQUEE_BRANDS = [
  'Shopify',
  'Next.js',
  'Vercel',
  'Framer',
  'Figma',
  'Webflow',
  'Stripe',
  'Supabase',
  'OpenAI',
  'Tailwind CSS',
]

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We dig into your goals, audience, and competition. A focused strategy session that shapes every decision.',
  },
  {
    num: '02',
    title: 'Design Sprint',
    body: 'Pixel-perfect wireframes and high-fidelity mockups delivered in Figma. You approve, we iterate — fast.',
  },
  {
    num: '03',
    title: 'Build & Animate',
    body: 'Clean Next.js code. Framer Motion animations. Performance-first. Deployed on Vercel or your preferred host.',
  },
  {
    num: '04',
    title: 'Launch & Grow',
    body: 'Go live with full QA, SEO foundation, and post-launch support. Your code, your domain, zero lock-in.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Marcus Webb',
    role: 'Founder, Stackform SaaS',
    quote:
      "BHW Media didn't just build our website — they built our market position. The design alone added legitimacy that closed our seed round faster.",
    rating: 5,
    avatar: 'MW',
  },
  {
    name: 'Priya Nair',
    role: 'CMO, Aether Commerce',
    quote:
      'We went from a generic Shopify template to a brand that stops the scroll. Revenue per visitor doubled within 60 days of launch.',
    rating: 5,
    avatar: 'PN',
  },
  {
    name: 'James Okoye',
    role: 'CEO, Orion Web3 Studio',
    quote:
      'The motion design work alone is worth 10x the fee. Our investors literally asked who built the site at our Series A pitch.',
    rating: 5,
    avatar: 'JO',
  },
  {
    name: 'Sofia Mendez',
    role: 'Head of Product, Lumio AI',
    quote:
      "14 days from brief to live. Full rebrand, new site, new positioning. I've worked with agencies that took 6 months and delivered less.",
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'David Chen',
    role: 'Founder, NexLayer Cloud',
    quote:
      "Three separate enterprise clients asked for an intro after seeing our site refresh. That's the ROI of premium design.",
    rating: 5,
    avatar: 'DC',
  },
]

export type ServiceDetail = {
  icon: string
  title: string
  accent: AccentColor
  description: string
  outcomes: string[]
  visual:
    | 'lighthouse'
    | 'dashboard'
    | 'palette'
    | 'product'
    | 'timeline'
    | 'kanban'
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    icon: 'Globe',
    title: 'Web Design & Development',
    accent: 'violet',
    description:
      'Custom-coded marketing sites and web apps built on Next.js. Engineered for speed, accessibility, and conversion — every pixel and every millisecond accounted for.',
    outcomes: [
      'Performance scores 95+ on Google Lighthouse',
      'Mobile-first, WCAG 2.1 AA compliant',
      'Deployed to Vercel/Netlify with CI/CD',
      'Full handover — codebase, CMS, documentation',
    ],
    visual: 'lighthouse',
  },
  {
    icon: 'LayoutDashboard',
    title: 'SaaS Product Design',
    accent: 'cyan',
    description:
      'End-to-end product design for SaaS platforms. We architect interfaces that turn first-time users into activated, retained customers.',
    outcomes: [
      'Full design system in Figma',
      'Onboarding flow with <3 step activation',
      'Dashboard UI with real data hierarchy',
      'Prototype for investor/stakeholder demos',
    ],
    visual: 'dashboard',
  },
  {
    icon: 'Sparkles',
    title: 'Brand Identity Systems',
    accent: 'gold',
    description:
      'A complete visual identity that positions you as the authority. From the logo mark to a full brand book your whole team can use.',
    outcomes: [
      'Primary + alternate logo marks (SVG)',
      'Brand color system with usage rules',
      'Typography pairing and hierarchy guide',
      'Brand guidelines PDF document',
    ],
    visual: 'palette',
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce Experiences',
    accent: 'violet',
    description:
      'Premium storefronts that sell. We obsess over the path from product page to checkout so more visitors become customers.',
    outcomes: [
      'Shopify Plus or custom Next.js Commerce',
      'Checkout optimization (avg. +18% CVR)',
      'Product page architecture for storytelling',
      'Payment gateway + inventory integration',
    ],
    visual: 'product',
  },
  {
    icon: 'Zap',
    title: 'Motion & Interaction Design',
    accent: 'cyan',
    description:
      'Motion that makes your product feel alive. Scroll-triggered reveals, kinetic type, and micro-interactions tuned for delight and performance.',
    outcomes: [
      'Scroll-triggered reveal animations',
      'Kinetic typography sequences',
      'Page transition system',
      'Lottie/SVG micro-interaction library',
    ],
    visual: 'timeline',
  },
  {
    icon: 'RefreshCw',
    title: 'Growth & Maintenance Retainers',
    accent: 'gold',
    description:
      'Ongoing partnership for brands that keep shipping. Weekly sprints, monitoring, and strategy so your site keeps improving after launch.',
    outcomes: [
      'Weekly design/dev sprints',
      'Performance monitoring dashboard',
      'Priority response (< 4hr SLA)',
      'Monthly strategy calls included',
    ],
    visual: 'kanban',
  },
]

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '$2,500',
    description:
      'For startups and solo founders launching their first premium presence.',
    features: [
      '5-page custom website',
      '3 revision rounds',
      'Basic SEO setup',
      'Vercel deployment',
      '30 days post-launch support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$6,500',
    description:
      'For scaling businesses that need a full brand + web ecosystem.',
    features: [
      'Up to 15 pages',
      'Brand identity system',
      'Motion animations',
      'CMS integration',
      '90 days support',
      'Monthly report',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For agencies, Series A+ startups, and established brands.',
    features: [
      'Unlimited pages',
      'Design system',
      'SaaS UI/UX',
      'Dedicated PM',
      'Priority 4hr SLA',
      'Quarterly strategy sessions',
    ],
    cta: 'Book a Call',
    popular: false,
  },
]

export type PortfolioItem = {
  id: number
  title: string
  category: 'SaaS' | 'E-Commerce' | 'Web3' | 'Brand'
  description: string
  tags: string[]
  color: AccentColor
  mockupType: 'dashboard' | 'ecommerce' | 'web3' | 'brand' | 'saas' | 'finance'
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Stackform',
    category: 'SaaS',
    description:
      'SaaS onboarding platform — 0 to live in 12 days. Full design system.',
    tags: ['Next.js', 'Framer Motion', 'Design System'],
    color: 'violet',
    mockupType: 'dashboard',
  },
  {
    id: 2,
    title: 'Aether Commerce',
    category: 'E-Commerce',
    description:
      'Premium DTC fashion brand — redesigned from Shopify template to custom luxury experience.',
    tags: ['Shopify', 'Custom CSS', 'Motion'],
    color: 'gold',
    mockupType: 'ecommerce',
  },
  {
    id: 3,
    title: 'Orion Protocol',
    category: 'Web3',
    description:
      'Web3 launchpad platform — dark cinematic aesthetic, wallet-connect UX, real-time data.',
    tags: ['Next.js', 'Web3', 'Wagmi'],
    color: 'cyan',
    mockupType: 'web3',
  },
  {
    id: 4,
    title: 'Lumio AI',
    category: 'SaaS',
    description:
      'AI productivity SaaS — onboarding flow with 3-step activation, dashboard architecture.',
    tags: ['Figma', 'React', 'TypeScript'],
    color: 'violet',
    mockupType: 'dashboard',
  },
  {
    id: 5,
    title: 'NexLayer Cloud',
    category: 'SaaS',
    description:
      'Cloud infrastructure brand refresh — B2B positioning, enterprise-grade visual language.',
    tags: ['Brand', 'Next.js', 'TailwindCSS'],
    color: 'cyan',
    mockupType: 'saas',
  },
  {
    id: 6,
    title: 'Vanta Studio',
    category: 'Brand',
    description:
      'Creative agency brand identity — full logo system, color architecture, brand book.',
    tags: ['Figma', 'Brand', 'Typography'],
    color: 'gold',
    mockupType: 'brand',
  },
  {
    id: 7,
    title: 'Pulse Health',
    category: 'Web3',
    description:
      'Health-tech NFT platform — accessible UI over complex blockchain infrastructure.',
    tags: ['Web3', 'React', 'Framer'],
    color: 'crimson',
    mockupType: 'web3',
  },
  {
    id: 8,
    title: 'Crest Capital',
    category: 'Brand',
    description:
      'Fintech brand identity and marketing site — authority positioning for institutional clients.',
    tags: ['Brand', 'Next.js', 'Motion'],
    color: 'gold',
    mockupType: 'finance',
  },
]

export const PORTFOLIO_FILTERS = [
  'All',
  'SaaS',
  'E-Commerce',
  'Brand',
  'Web3',
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]
