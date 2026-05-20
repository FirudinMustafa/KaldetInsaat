"use client"

import Script from "next/script"

interface GoogleAnalyticsProps {
  measurementId: string
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Hook for tracking custom events
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    eventParams?: {
      category?: string
      label?: string
      value?: number
      [key: string]: any
    }
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, eventParams)
    }
  }

  const trackPageView = (url: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
      })
    }
  }

  return { trackEvent, trackPageView }
}
