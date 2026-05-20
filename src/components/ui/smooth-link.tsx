"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, MouseEvent } from "react"

interface SmoothLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  scroll?: boolean
  smooth?: boolean
}

export function SmoothLink({
  href,
  children,
  className = "",
  onClick,
  scroll = true,
  smooth = true,
}: SmoothLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e)
    }

    // If it's the same page, just scroll to top smoothly
    if (href === pathname) {
      e.preventDefault()
      if (smooth) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "auto" })
      }
      return
    }

    // If it's an anchor link on the same page
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const offset = 80 // Header height offset
        const targetPosition = targetElement.offsetTop - offset
        
        if (smooth) {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: "auto",
          })
        }
      }
      return
    }

    // For internal links, add smooth fade effect
    if (href.startsWith("/") && !href.startsWith("http") && smooth) {
      // Add subtle fade effect before navigation
      const body = document.body
      const originalOpacity = body.style.opacity
      body.style.opacity = "0.98"
      body.style.transition = "opacity 0.15s ease-smooth"

      // Reset opacity after a short delay (Next.js handles the navigation)
      setTimeout(() => {
        body.style.opacity = originalOpacity || "1"
      }, 200)
    }
  }

  // External links
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      scroll={scroll}
    >
      {children}
    </Link>
  )
}

