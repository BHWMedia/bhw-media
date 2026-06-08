export type AccentColor = 'violet' | 'cyan' | 'gold' | 'crimson'

export const SERVICES = [
  {
    icon: 'Globe',
    title: 'Web Architecture & Build',
    body: 'Custom-coded Next.js environments engineered for 99+ Core Web Vitals, instantaneous load times, and maximum conversion.',
    tag: 'Next.js 16 · React 19 · Tailwind',
    accent: 'violet' as AccentColor,
  },
  {
    icon: 'LayoutDashboard',
    title: 'SaaS Product Design',
    body: 'Frictionless UI/UX architectures for SaaS platforms — from zero-dropoff onboarding flows to deep-data retention dashboards.',
    tag: 'Figma · Design Systems · UX',
    accent: 'cyan' as AccentColor,
  },
  {
    icon: 'Sparkles',
    title: 'Brand Identity Systems',
    body: 'Authoritative visual identity from core logo architecture to comprehensive brand guidelines — built to dominate your market tier.',
    tag: 'Logo · Typography · Guidelines',
    accent: 'gold' as AccentColor,
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce Infrastructures',
    body: 'Headless Shopify and custom Next.js cart builds featuring seamless checkouts, cinematic product storytelling, and optimized layouts.',
    tag: 'Shopify Plus · Next.js · Stripe',
    accent: 'violet' as AccentColor,
  },
  {
    icon: 'Zap',
    title: 'Immersive Motion Design',
    body: 'High-fidelity Framer Motion physics, scroll-triggered reveals, and hardware-accelerated kinetic typography.',
    tag: 'Framer Motion · WebGL · CSS',
    accent: 'cyan' as AccentColor,
  },
  {
    icon: 'RefreshCw',
    title: 'Enterprise Growth Retainer',
    body: 'Dedicated scaling partnerships. We handle performance monitoring, feature deployments, A/B testing, and continuous iteration.',
    tag: 'Analytics · Iteration · DevOps',
    accent: 'gold' as AccentColor,
  },
]

export const MARQUEE_BRANDS = [
  'Shopify',
  'Next.js 16',
  'Vercel',
  'Framer Motion',
  'Figma',
  'Stripe',
  'Supabase',
  'OpenAI',
  'Tailwind CSS',
  'TypeScript',
]

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Architecture Audit',
    body: 'We tear down your current setup, analyze your market competitors, and engineer a technical blueprint designed purely for ROI.',
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
    body: 'Rigorous QA, technical SEO foundation, and seamless DNS transition. You own 100% of the codebase and intellectual property.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Marcus Webb',
    role: 'Founder, Stackform SaaS',
    quote: "BHW Media didn't just build our application — they engineered our market dominance. The platform's authority closed our seed round 3x faster.",
    rating: 5,
    avatar: 'MW',
  },
  {
    name: 'Priya Nair',
    role: 'CMO, Aether Commerce',
    quote: 'We abandoned a generic Shopify template for a BHW custom build. Revenue per visitor increased by 42% within 60 days of launch.',
    rating: 5,
    avatar: 'PN',
  },
  {
    name: 'James Okoye',
    role: 'CEO, Orion Web3 Studio',
    quote: 'The interaction design is unmatched. Our lead investors literally stopped our Series A pitch to ask who built the platform.',
    rating: 5,
    avatar: 'JO',
  },
  {
    name: 'Sofia Mendez',
    role: 'Head of Product, Lumio AI',
    quote: '14 days from initial technical brief to live production. I have worked with large-scale agencies that took 6 months to deliver half this quality.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'David Chen',
    role: 'Founder, NexLayer Cloud',
    quote: 'Four separate enterprise CTOs requested an introduction after seeing our infrastructure refresh. That is the actual ROI of elite engineering.',
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
  visual: 'lighthouse' | 'dashboard' | 'palette' | 'product' | 'timeline' | 'kanban'
}

// (Service Details Remain Structurally Identical but aligned with new copy)
export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    icon: 'Globe',
    title: 'Web Architecture',
    accent: 'violet',
    description: 'Custom-coded marketing platforms built on Next.js. Engineered for speed, accessibility, and conversion — every pixel and every millisecond accounted for.',
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
    description: 'End-to-end product design for enterprise SaaS. We architect interfaces that convert initial traffic into activated, long-term retained users.',
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
    description: 'A complete visual identity that establishes unquestionable market authority. From core logo marks to internal usage guidelines.',
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
    description: 'High-volume digital storefronts. We obsess over the micro-interactions from the product page to checkout to maximize gross conversion rates.',
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
    description: 'Hardware-accelerated motion that makes digital products feel visceral. Scroll-triggered physics and interactions tuned for performance.',
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
    description: 'An elite engineering partnership for companies that scale rapidly. Weekly sprint cycles, uptime monitoring, and continuous platform evolution.',
    outcomes: [
      'Dedicated weekly engineering sprints',
      'Real-time core web vitals monitoring',
      'Priority slack channel (< 4hr SLA)',
      'Monthly architectural strategy calls',
    ],
    visual: 'kanban',
  },
]

export const PRICING_PLANS = [
  {
    name: 'v0 Architecture Sprint',
    price: '$495',
    description: 'A low-risk, high-fidelity entry point. We engineer a premium landing page to validate your market.',
    features: [
      'High-converting single-page architecture',
      'Premium dark-mode aesthetic',
      'Basic Framer Motion interactions',
      'Next.js Vercel deployment',
      'Apply this cost to a full build later',
    ],
    cta: 'Start Sprint',
    popular: false,
  },
  {
    name: 'Platform Build',
    price: '$2,850',
    description: 'For businesses requiring a multi-route digital ecosystem, robust CMS, and elite visual proof.',
    features: [
      'Comprehensive Next.js routing tree',
      'Complete Figma design system',
      'CMS integration (Sanity/Supabase)',
      'Advanced motion & 3D micro-interactions',
      'Dedicated project manager',
      '90 days priority technical support',
    ],
    cta: 'Commission Build',
    popular: true,
  },
  {
    name: 'Enterprise Matrix',
    price: 'Custom',
    description: 'For established corporations requiring full-scale SaaS UI, secure infrastructure, or headless e-commerce.',
    features: [
      'Unlimited scalable page architecture',
      'Headless Shopify / Secure Auth flows',
      'Custom API endpoint development',
      'Direct Slack channel with Lead Engineer',
      'Priority <4hr response SLA',
      'Quarterly architectural audits',
    ],
    cta: 'Request Audit',
    popular: false,
  },
]

export type PortfolioItem = {
  id: number
  title: string
  // 1. UPDATED: Expanded the strict type union to accept high-ticket verticals
  category: 'Real Estate' | 'Hospitality' | 'Fitness' | 'SaaS' | 'E-Commerce' | 'Web3' | 'Brand'
  description: string
  tags: string[]
  color: AccentColor
  mockupType: 'dashboard' | 'ecommerce' | 'web3' | 'brand' | 'saas' | 'finance'
  liveUrl?: string
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Aura Real Estate Engine',
    category: 'Real Estate', // 2. UPDATED
    description: 'High-ticket commercial real estate pitch platform. Immersive mapping and investor data visualization.',
    tags: ['Next.js', 'Mapbox', 'Framer Motion'],
    color: 'violet',
    mockupType: 'finance',
    liveUrl: 'https://864e3ea2-bb69-4dbe-8857-dd6a67a5e1b9.app-preview.com/'
  },
  {
    id: 2,
    title: 'Café Noirè',
    category: 'Hospitality', // 2. UPDATED
    description: 'Cinematic digital storefront for luxury hospitality. Built for visceral brand connection and high-end reservations.',
    tags: ['React 19', 'Motion Physics', 'Tailwind'],
    color: 'gold',
    mockupType: 'ecommerce',
    liveUrl: 'https://9fe54dd0-d708-486d-8b97-6666f8143cef.app-preview.com/'
  },
  {
    id: 3,
    title: 'Elite Fitness Terminal',
    category: 'Fitness', // 2. UPDATED
    description: 'Performance tracking dashboard for premium strength facilities. Real-time metric rendering and secure auth.',
    tags: ['Next.js', 'Recharts', 'Supabase'],
    color: 'cyan',
    mockupType: 'dashboard',
    liveUrl: 'https://dbf4e340-e582-453d-9d2e-9ffeafe38825.app-preview.com/'
  },
  {
    id: 4,
    title: 'Orion Protocol',
    category: 'Web3',
    description: 'Web3 launchpad platform — dark cinematic aesthetic, wallet-connect UX, and real-time blockchain data indexing.',
    tags: ['Next.js', 'Web3', 'Wagmi'],
    color: 'cyan',
    mockupType: 'web3',
  },
  {
    id: 5,
    title: 'Aether Commerce',
    category: 'E-Commerce',
    description: 'Premium DTC fashion infrastructure — transitioned from a bottlenecked template to a custom luxury headless experience.',
    tags: ['Shopify Plus', 'Next.js', 'Stripe'],
    color: 'violet',
    mockupType: 'ecommerce',
  },
  {
    id: 6,
    title: 'NexLayer Cloud',
    category: 'SaaS',
    description: 'Cloud infrastructure interface redesign — B2B enterprise positioning, dense data tables, and secure access protocols.',
    tags: ['Brand Architecture', 'React', 'Tailwind'],
    color: 'gold',
    mockupType: 'saas',
  },
  {
    id: 7,
    title: 'Lumio AI',
    category: 'SaaS',
    description: 'AI productivity SaaS terminal. We engineered the entire frontend onboarding flow to achieve a 92% completion rate.',
    tags: ['Figma', 'React 19', 'TypeScript'],
    color: 'violet',
    mockupType: 'dashboard',
  },
  {
    id: 8,
    title: 'Vanta Studio',
    category: 'Brand',
    description: 'Creative agency brand identity ecosystem — complete logo system, color architecture, and digital deployment.',
    tags: ['Figma', 'Brand Matrix', 'Typography'],
    color: 'crimson',
    mockupType: 'brand',
  },
]

// 3. UPDATED: Exposed the new pipeline targets to the frontend filter engine
export const PORTFOLIO_FILTERS = [
  'All',
  'Real Estate',
  'Hospitality',
  'Fitness',
  'SaaS',
  'E-Commerce',
  'Brand'
] as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]