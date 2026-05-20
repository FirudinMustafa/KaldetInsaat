"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Reset on pathname change
    setIsVisible(false)
    
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    
    // Small delay for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      className={`transition-all duration-500 ease-smooth ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
