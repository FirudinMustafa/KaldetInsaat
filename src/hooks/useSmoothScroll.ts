"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useSmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Smooth scroll to top on route change
    const handleRouteChange = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // Small delay to ensure page is loaded
    const timer = setTimeout(handleRouteChange, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  // Smooth scroll to element
  const scrollToElement = (elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return { scrollToElement }
}

