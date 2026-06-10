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
  // Only apply this security guard to the contact API
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    
    // Bypass rate limiting entirely if Upstash keys are missing (prevents local crashes if you haven't set up the .env yet)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      console.warn('[Middleware] Upstash Redis keys missing. Bypassing rate limit.')
      return NextResponse.next()
    }

    // Extract user IP
    const ip = request.ip ?? '127.0.0.1'
    
    // Check against the limit
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      console.warn(`[Middleware] Rate limit triggered for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      )
    }
  }
  
  return NextResponse.next()
}

// 3. Optimize middleware to only run on the contact endpoint
export const config = {
  matcher: '/api/contact',
}