"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Building2 } from "lucide-react"

interface ClientLogoProps {
  name: string
  logo: string
  index: number
}

export function ClientLogo({ name, logo, index }: ClientLogoProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Check if image exists by trying to load it
    const img = new window.Image()
    img.onload = () => setImageLoaded(true)
    img.onerror = () => {
      setImageError(true)
      setImageLoaded(false)
    }
    img.src = logo
  }, [logo])

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-400 flex items-center justify-center min-h-[120px] w-[180px] transition-all duration-300 relative overflow-hidden group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {imageLoaded && !imageError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={logo}
            alt={name}
            width={120}
            height={60}
            className="object-contain opacity-95 grayscale-0 group-hover:opacity-100 transform-smooth group-hover:scale-110 transition-all duration-300"
            style={{ filter: 'brightness(0.98)' }}
            priority={index < 3}
            onError={() => {
              setImageError(true)
              setImageLoaded(false)
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
            <Building2 className="w-8 h-8 text-blue-500 group-hover:text-blue-700 transition-colors duration-300" />
          </div>
          <div className="text-gray-800 group-hover:text-blue-700 font-bold text-center text-sm leading-tight transition-colors duration-300">
            {name}
          </div>
        </div>
      )}
    </div>
  )
}

