'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, CheckCircle, AlertCircle } from "lucide-react"

interface CalculationData {
  toolType: 'beton-hacmi' | 'epoksi-kaplama' | 'donati-agirlik'
  toolName: string
  raporNo: string
  summary: string // e.g., "500 m³ beton, fire dahil 525 m³"
  details: Record<string, any> // All calculation details
}

interface QuoteRequestFormProps {
  isOpen: boolean
  onClose: () => void
  calculationData: CalculationData
}

export default function QuoteRequestForm({ isOpen, onClose, calculationData }: QuoteRequestFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    notes: '',
  })
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Ad soyad zorunludur'
    }

    if (!form.email.trim()) {
      newErrors.email = 'E-posta zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Geçerli bir e-posta girin'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Telefon zorunludur'
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(form.phone)) {
      newErrors.phone = 'Geçerli bir telefon girin'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Build description from calculation data + user notes
      let description = `
Araç: ${calculationData.toolName}
Rapor No: ${calculationData.raporNo}

Hesaplama Özeti:
${calculationData.summary}

Detaylar:
${JSON.stringify(calculationData.details, null, 2)}
      `.trim()

      // Add user notes if provided
      if (form.notes.trim()) {
        description += `\n\nMüşteri Notu:\n${form.notes.trim()}`
      }

      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceSlug: getServiceSlug(calculationData.toolType),
          projectType: 'industrial',
          description: description,
          timeline: 'normal',
          location: form.location || null,
          area: calculationData.details.alan || calculationData.details.netHacim || 0,
          estimatedPrice: null, // Will be calculated by admin
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(result.message || "Bir hata oluştu")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getServiceSlug = (toolType: string) => {
    switch (toolType) {
      case 'beton-hacmi':
        return 'endustriyel-zemin-betonu'
      case 'epoksi-kaplama':
        return 'epoksi-zemin-kaplama'
      case 'donati-agirlik':
        return 'celik-konstruksiyon'
      default:
        return 'endustriyel-zemin-betonu'
    }
  }

  const resetAndClose = () => {
    setForm({ name: '', email: '', phone: '', location: '', notes: '' })
    setErrors({})
    setIsSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <h3 className="font-semibold text-foreground">Teklif Talebi</h3>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Talebiniz Alındı!
              </h4>
              <p className="text-muted-foreground text-sm mb-6">
                Hesaplama verileriniz ile birlikte talebiniz iletildi.
                En kısa sürede size dönüş yapacağız.
              </p>
              <Button onClick={resetAndClose} variant="outline">
                Kapat
              </Button>
            </div>
          ) : (
            <>
              {/* Calculation Summary */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="text-xs text-muted-foreground mb-1">{calculationData.toolName}</div>
                <div className="font-medium text-foreground">{calculationData.summary}</div>
                <div className="text-xs text-muted-foreground mt-1">Rapor: {calculationData.raporNo}</div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ad Soyad <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`input-base ${errors.name ? 'border-destructive' : ''}`}
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    E-posta <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`input-base ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Telefon <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`input-base ${errors.phone ? 'border-destructive' : ''}`}
                    placeholder="0555 123 45 67"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Proje Konumu
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="input-base"
                    placeholder="İl / İlçe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ek Notlar
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input-base min-h-[80px] resize-none"
                    placeholder="Projenizle ilgili eklemek istediğiniz notlar..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Teklif Talep Et
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Hesaplama verileriniz otomatik olarak talebinize eklenecektir.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
