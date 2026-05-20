'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building2,
  MessageSquare,
  AlertCircle,
  ArrowLeft
} from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

// Form state type
interface FormState {
  ad: string
  soyad: string
  email: string
  telefon: string
  firma: string
  hizmet: string
  mesaj: string
  kvkk: boolean
}

// Form errors type
interface FormErrors {
  ad?: string
  email?: string
  telefon?: string
  mesaj?: string
  kvkk?: string
}

const hizmetler = [
  { value: '', label: 'Hizmet Seçiniz' },
  { value: 'endustriyel-zemin-betonu', label: 'Endüstriyel Zemin Betonu' },
  { value: 'epoksi-zemin-kaplama', label: 'Epoksi Zemin Kaplama' },
  { value: 'baski-beton', label: 'Baskı Beton' },
  { value: 'bakim-onarim-tadilat', label: 'Bakım Onarım & Tadilat' },
  { value: 'endustriyel-tesisat', label: 'Endüstriyel Tesisat' },
  { value: 'altyapi', label: 'Altyapı Hizmetleri' },
  { value: 'diger', label: 'Diğer' },
]

export default function IletisimPage() {
  const [form, setForm] = useState<FormState>({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    firma: '',
    hizmet: '',
    mesaj: '',
    kvkk: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.ad.trim()) {
      newErrors.ad = 'Ad alanı zorunludur'
    }

    if (!form.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz'
    }

    if (!form.telefon.trim()) {
      newErrors.telefon = 'Telefon alanı zorunludur'
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(form.telefon)) {
      newErrors.telefon = 'Geçerli bir telefon numarası giriniz'
    }

    if (!form.mesaj.trim()) {
      newErrors.mesaj = 'Mesaj alanı zorunludur'
    } else if (form.mesaj.trim().length < 20) {
      newErrors.mesaj = 'Mesaj en az 20 karakter olmalıdır'
    }

    if (!form.kvkk) {
      newErrors.kvkk = 'KVKK onayı zorunludur'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare data for API
      const apiData = {
        name: `${form.ad} ${form.soyad}`.trim(),
        email: form.email,
        phone: form.telefon,
        subject: form.hizmet ? hizmetler.find(h => h.value === form.hizmet)?.label : undefined,
        message: form.mesaj,
        projectType: form.hizmet || undefined,
        companyName: form.firma || undefined,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(result.message || "Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setForm({
      ad: '',
      soyad: '',
      email: '',
      telefon: '',
      firma: '',
      hizmet: '',
      mesaj: '',
      kvkk: false
    })
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-12">
        <div className="container-wide">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-white">İletişim</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Projeniz için <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Teklif Alın</span>
            </h1>
            <p className="text-lg text-white/70">
              Endüstriyel zemin ve tesis projeleriniz için ücretsiz keşif ve fiyat teklifi alın.
              Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                    <a href={`tel:${CONTACT_INFO.PHONE}`} className="text-primary hover:underline font-medium">
                      {CONTACT_INFO.PHONE_DISPLAY}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      {CONTACT_INFO.WORKING_HOURS}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-posta</h3>
                    <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-primary hover:underline font-medium">
                      {CONTACT_INFO.EMAIL}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      24 saat içinde yanıt
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Adres</h3>
                    <p className="text-muted-foreground">
                      {CONTACT_INFO.ADDRESS}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Çalışma Saatleri</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pazartesi - Cuma</span>
                        <span className="font-medium">08:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cumartesi</span>
                        <span className="font-medium">09:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pazar</span>
                        <span className="text-muted-foreground">Kapalı</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${CONTACT_INFO.PHONE.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 hover:bg-green-500/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Hızlı iletişim için yazın</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Teklif Talep Formu
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Talebiniz Alındı!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      En kısa sürede sizinle iletişime geçeceğiz.<br />
                      Genellikle 24 saat içinde dönüş yapıyoruz.
                    </p>
                    <Button variant="outline" onClick={resetForm}>
                      Yeni Talep Oluştur
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ad <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          placeholder="Adınız"
                          value={form.ad}
                          onChange={(e) => setForm({ ...form, ad: e.target.value })}
                          className={`input-base ${errors.ad ? 'border-destructive' : ''}`}
                        />
                        {errors.ad && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.ad}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Soyad
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          placeholder="Soyadınız"
                          value={form.soyad}
                          onChange={(e) => setForm({ ...form, soyad: e.target.value })}
                          className="input-base"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          E-posta <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          maxLength={100}
                          placeholder="ornek@firma.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`input-base ${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Telefon <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="tel"
                          maxLength={20}
                          placeholder="0212 123 45 67"
                          value={form.telefon}
                          onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                          className={`input-base ${errors.telefon ? 'border-destructive' : ''}`}
                        />
                        {errors.telefon && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.telefon}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company & Service */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Firma Adı
                        </label>
                        <input
                          type="text"
                          maxLength={100}
                          placeholder="Firma adı (opsiyonel)"
                          value={form.firma}
                          onChange={(e) => setForm({ ...form, firma: e.target.value })}
                          className="input-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          İlgilendiğiniz Hizmet
                        </label>
                        <select
                          value={form.hizmet}
                          onChange={(e) => setForm({ ...form, hizmet: e.target.value })}
                          className="input-base"
                        >
                          {hizmetler.map((h) => (
                            <option key={h.value} value={h.value}>
                              {h.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mesajınız <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        rows={5}
                        maxLength={2000}
                        placeholder="Projeniz hakkında bilgi verin. Alan, konum, ihtiyaçlarınız..."
                        value={form.mesaj}
                        onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                        className={`input-base resize-none ${errors.mesaj ? 'border-destructive' : ''}`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.mesaj ? (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.mesaj}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {form.mesaj.length}/2000
                        </span>
                      </div>
                    </div>

                    {/* KVKK Checkbox */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.kvkk}
                          onChange={(e) => setForm({ ...form, kvkk: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          <Link href="/kvkk" className="text-primary hover:underline">
                            KVKK Aydınlatma Metni
                          </Link>
                          &apos;ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                          <span className="text-destructive"> *</span>
                        </span>
                      </label>
                      {errors.kvkk && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.kvkk}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Teklif Talebi Gönder
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Formunuz bize ulaştığında en geç 24 saat içinde sizinle iletişime geçeceğiz.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <iframe
              src={CONTACT_INFO.GOOGLE_MAPS_URL}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kaldet İnşaat Konum"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
