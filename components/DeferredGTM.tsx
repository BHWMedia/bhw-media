'use client'

/**
 * DeferredGTM
 * * Performance Architecture:
 * Defers Google Tag Manager script injection to an idle period via requestIdleCallback.
 * This completely prevents blocking the main thread during critical hydration,
 * directly optimizing the mobile Interaction to Next Paint (INP) score.
 */

import { useEffect } from 'react'

interface DeferredGTMProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export function DeferredGTM({ gtmId }: DeferredGTMProps) {
  useEffect(() => {
    if (!gtmId || gtmId === 'GTM-XXXXXXX') return

    const loadGTM = () => {
      // Prevent duplicate injection passes
      if (document.getElementById('gtm-script')) return

      // Initialize structured tracking layers safely
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })

      // Construct asynchronous GTM script element
      const script = document.createElement('script')
      script.id = 'gtm-script'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
      document.head.appendChild(script)

      // Construct noscript fallback layer for zero-JS clients
      const noscript = document.createElement('noscript')
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
      iframe.height = '0'
      iframe.width = '0'
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)
      document.body.insertBefore(noscript, document.body.firstChild)
    }

    // Schedule task during browser idle time to free up main execution threads
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGTM, { timeout: 3500 })
    } else {
      // Resilient fallback configuration for legacy Safari architectures
      if (document.readyState === 'complete') {
        setTimeout(loadGTM, 1200)
      } else {
        window.addEventListener('load', () => setTimeout(loadGTM, 1200), { once: true })
      }
    }
  }, [gtmId])

  return null
}