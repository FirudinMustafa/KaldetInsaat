'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from './button'

interface BackButtonProps {
  label?: string
  fallbackUrl?: string
  className?: string
}

export function BackButton({ label = 'Geri', fallbackUrl = '/', className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 2) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`gap-2 text-muted-foreground hover:text-foreground ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
