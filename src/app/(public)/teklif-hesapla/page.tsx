"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, Check, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

// 2025-2026 Türkiye piyasa fiyatları (TL/m²)
const services = [
  { value: "endustriyel-zemin-betonu", label: "Endüstriyel Zemin Betonu", multiplier: 950 },
  { value: "baski-beton-uygulamalari", label: "Baskı Beton Uygulamaları", multiplier: 650 },
  { value: "epoksi-zemin-kaplama", label: "Epoksi Zemin Kaplama", multiplier: 550 },
  { value: "celik-konstruksiyon", label: "Çelik Konstrüksiyon", multiplier: 2000 },
  { value: "endustri-tesis-bakim-onarim", label: "Tesis Bakım-Onarım", multiplier: 400 },
  { value: "altyapi-uygulamalari", label: "Altyapı Uygulamaları", multiplier: 750 },
]

const projectTypes = [
  { value: "residential", label: "Konut", multiplier: 1.0 },
  { value: "commercial", label: "Ticari", multiplier: 1.2 },
  { value: "industrial", label: "Endüstriyel", multiplier: 1.3 },
  { value: "infrastructure", label: "Altyapı", multiplier: 1.4 },
]

const timelines = [
  { value: "urgent", label: "Acil (1 ay içinde)", multiplier: 1.3 },
  { value: "normal", label: "Normal (1-3 ay)", multiplier: 1.0 },
  { value: "flexible", label: "Esnek (3+ ay)", multiplier: 0.9 },
]

export default function QuoteCalculatorPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceSlug: "",
    projectType: "",
    area: "",
    timeline: "",
    location: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  })
  const [estimate, setEstimate] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculatePrice = async () => {
    setIsCalculating(true)

    try {
      const response = await fetch("/api/quote-requests/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: formData.serviceSlug,
          projectType: formData.projectType,
          area: parseFloat(formData.area),
          timeline: formData.timeline,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setEstimate(result.data)
        setStep(3)
      } else {
        alert("Fiyat hesaplanamadı. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      alert("Bir hata oluştu.")
    } finally {
      setIsCalculating(false)
    }
  }

  const submitQuoteRequest = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          area: parseFloat(formData.area),
          estimatedPrice: estimate?.estimatedPrice,
        }),
      })

      if (response.ok) {
        alert("Teklif talebiniz alındı! En kısa sürede size dönüş yapacağız.")
        // Reset form
        setStep(1)
        setFormData({
          serviceSlug: "",
          projectType: "",
          area: "",
          timeline: "",
          location: "",
          description: "",
          name: "",
          email: "",
          phone: "",
        })
        setEstimate(null)
      } else {
        alert("Teklif talebi gönderilemedi.")
      }
    } catch (error) {
      alert("Bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-end mb-6">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
              <Calculator className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">Online Teklif</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Teklif{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Hesapla
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Projeniz için anında fiyat tahmini alın. 4 adımda hemen öğrenin!
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-12">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= num
                          ? "bg-amber-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step > num ? <Check className="w-5 h-5" /> : num}
                    </div>
                    {num < 4 && (
                      <div
                        className={`w-16 h-1 ${
                          step > num ? "bg-amber-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Service Selection */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-amber-600" />
                      Adım 1: Hizmet Seçimi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Hangi hizmeti almak istiyorsunuz?</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {services.map((service) => (
                          <button
                            key={service.value}
                            onClick={() =>
                              setFormData({ ...formData, serviceSlug: service.value })
                            }
                            className={`p-4 border-2 rounded-lg text-left transition ${
                              formData.serviceSlug === service.value
                                ? "border-amber-600 bg-amber-50"
                                : "border-gray-200 hover:border-amber-300"
                            }`}
                          >
                            <div className="font-semibold">{service.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="area">Alan (m²) *</Label>
                      <Input
                        id="area"
                        type="number"
                        step="0.01"
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                        placeholder="Örn: 500"
                      />
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.serviceSlug || !formData.area}
                      className="w-full"
                      size="lg"
                    >
                      Devam Et
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Adım 2: Proje Detayları</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Proje Tipi</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        {projectTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() =>
                              setFormData({ ...formData, projectType: type.value })
                            }
                            className={`p-4 border-2 rounded-lg text-center transition ${
                              formData.projectType === type.value
                                ? "border-amber-600 bg-amber-50"
                                : "border-gray-200 hover:border-amber-300"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Tamamlanma Süresi</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        {timelines.map((timeline) => (
                          <button
                            key={timeline.value}
                            onClick={() =>
                              setFormData({ ...formData, timeline: timeline.value })
                            }
                            className={`p-4 border-2 rounded-lg text-center transition ${
                              formData.timeline === timeline.value
                                ? "border-amber-600 bg-amber-50"
                                : "border-gray-200 hover:border-amber-300"
                            }`}
                          >
                            {timeline.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1"
                      >
                        Geri
                      </Button>
                      <Button
                        onClick={calculatePrice}
                        disabled={!formData.projectType || !formData.timeline || isCalculating}
                        className="flex-1"
                        size="lg"
                      >
                        {isCalculating ? "Hesaplanıyor..." : "Fiyat Hesapla"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Price Estimate */}
              {step === 3 && estimate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Tahmini Fiyat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg text-center">
                      <div className="text-sm text-gray-600 mb-2">Tahmini Proje Maliyeti</div>
                      <div className="text-5xl font-bold text-gray-900 mb-4">
                        {new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                          maximumFractionDigits: 0,
                        }).format(estimate.estimatedPrice)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Fiyat Aralığı: {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(estimate.minPrice)} - {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(estimate.maxPrice)}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Not:</strong> Bu fiyat tahmini genel bilgilere dayanmaktadır.
                        Kesin fiyat için lütfen bizimle iletişime geçin.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location">Konum</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="Proje konumu"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Proje Açıklaması</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          placeholder="Projeniz hakkında detaylı bilgi..."
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1"
                      >
                        Geri
                      </Button>
                      <Button onClick={() => setStep(4)} className="flex-1" size="lg">
                        Teklif Talep Et
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Adım 4: İletişim Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Adınız Soyadınız *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">E-posta *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(3)}
                        variant="outline"
                        className="flex-1"
                      >
                        Geri
                      </Button>
                      <Button
                        onClick={submitQuoteRequest}
                        disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                        className="flex-1"
                        size="lg"
                      >
                        {isSubmitting ? "Gönderiliyor..." : "Teklif Talep Et"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
    </div>
  )
}
