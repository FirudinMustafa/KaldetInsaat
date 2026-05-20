'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Logo {
  name: string
  logo: string
}

interface LogoCarouselProps {
  logos: readonly Logo[]
  speed?: number // pixels per second
  className?: string
  pauseOnHover?: boolean
}

export function LogoCarousel({
  logos,
  speed = 40,
  className,
  pauseOnHover = true
}: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return

    // Clone the logos for infinite scroll
    const scrollerContent = Array.from(scrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      scrollerRef.current?.appendChild(duplicatedItem)
    })
  }, [])

  // Calculate animation duration based on speed and content width
  const animationDuration = `${(logos.length * 200) / speed}s`

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-8 w-max animate-scroll",
          isPaused && "pause-animation"
        )}
        style={{
          animationDuration,
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 w-[140px] h-[70px] flex items-center justify-center bg-white rounded-xl border border-border/50 p-4 hover:border-primary/30 transition-colors"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Fallback to text if image fails */}
              <LogoImage name={logo.name} src={logo.logo} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LogoImage({ name, src }: { name: string; src: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    // Fallback: Show company name with styling
    return (
      <div className="text-center">
        <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
          {name}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${name} logo`}
      fill
      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      onError={() => setHasError(true)}
    />
  )
}
