import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// 1. Initialize Redis database connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// 2. Create the rate limiter: Allow 3 submissions per 1 hour per IP address
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Rate Limiting for Contact API
  if (pathname.startsWith('/api/contact')) {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.next()
    }

    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      )
    }
  }

  // 2. Trailing Slash Normalization (Prevents duplicate content)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }
  
  return NextResponse.next()
}

// 3. Optimize middleware to only run on the contact endpoint
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}