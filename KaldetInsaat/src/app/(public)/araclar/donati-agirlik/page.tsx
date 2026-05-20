'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Download,
  Phone,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  Plus,
  Trash2
} from "lucide-react"
import { generateDonatiAgirlikPDF } from "@/lib/pdf-generator"
import QuoteRequestForm from "@/components/shared/QuoteRequestForm"

// Demir çapları ve birim ağırlıkları (kg/m)
const DEMIR_CAPLARI = [
  { cap: 6, agirlik: 0.222 },
  { cap: 8, agirlik: 0.395 },
  { cap: 10, agirlik: 0.617 },
  { cap: 12, agirlik: 0.888 },
  { cap: 14, agirlik: 1.208 },
  { cap: 16, agirlik: 1.578 },
  { cap: 18, agirlik: 1.998 },
  { cap: 20, agirlik: 2.466 },
  { cap: 22, agirlik: 2.984 },
  { cap: 25, agirlik: 3.853 },
  { cap: 28, agirlik: 4.834 },
  { cap: 32, agirlik: 6.313 },
]

// Donatı kalemi tipi
interface DonatiKalemi {
  id: string
  cap: number
  boy: string
  adet: string
}

// Form state type
interface FormState {
  kalemler: DonatiKalemi[]
  fireOrani: number
  projeAdi: string
  notlar: string
}

// Result type
interface ResultState {
  kalemSonuclari: {
    cap: number
    boy: number
    adet: number
    birimAgirlik: number
    toplamAgirlik: number
  }[]
  netAgirlik: number
  fireDahilAgirlik: number
  raporNo: string
}

export default function DonatiAgirlikPage() {
  const [form, setForm] = useState<FormState>({
    kalemler: [
      { id: '1', cap: 12, boy: '', adet: '' }
    ],
    fireOrani: 3,
    projeAdi: '',
    notlar: ''
  })

  const [result, setResult] = useState<ResultState | null>(null)
  const [showFaq, setShowFaq] = useState<number | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Add new item
  const addKalem = () => {
    const newId = Date.now().toString()
    setForm({
      ...form,
      kalemler: [...form.kalemler, { id: newId, cap: 12, boy: '', adet: '' }]
    })
  }

  // Remove item
  const removeKalem = (id: string) => {
    if (form.kalemler.length > 1) {
      setForm({
        ...form,
        kalemler: form.kalemler.filter(k => k.id !== id)
      })
    }
  }

  // Update item
  const updateKalem = (id: string, field: keyof DonatiKalemi, value: string | number) => {
    setForm({
      ...form,
      kalemler: form.kalemler.map(k =>
        k.id === id ? { ...k, [field]: value } : k
      )
    })
  }

  // Calculate weight
  const calculateWeight = useCallback(() => {
    const kalemSonuclari: ResultState['kalemSonuclari'] = []
    let netAgirlik = 0

    for (const kalem of form.kalemler) {
      const boy = parseFloat(kalem.boy)
      const adet = parseInt(kalem.adet)

      if (isNaN(boy) || isNaN(adet) || boy <= 0 || adet <= 0) {
        continue
      }

      const birimAgirlik = DEMIR_CAPLARI.find(d => d.cap === kalem.cap)?.agirlik || 0
      const toplamAgirlik = birimAgirlik * boy * adet

      kalemSonuclari.push({
        cap: kalem.cap,
        boy,
        adet,
        birimAgirlik,
        toplamAgirlik: Math.round(toplamAgirlik * 100) / 100
      })

      netAgirlik += toplamAgirlik
    }

    if (kalemSonuclari.length === 0) {
      return
    }

    const fireDahilAgirlik = netAgirlik * (1 + form.fireOrani / 100)

    // Generate report number
    const now = new Date()
    const year = now.getFullYear()
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const raporNo = `KD-DNT-${year}-${randomNum}`

    setResult({
      kalemSonuclari,
      netAgirlik: Math.round(netAgirlik * 100) / 100,
      fireDahilAgirlik: Math.round(fireDahilAgirlik * 100) / 100,
      raporNo
    })
  }, [form])

  // Reset form
  const resetForm = () => {
    setForm({
      kalemler: [{ id: '1', cap: 12, boy: '', adet: '' }],
      fireOrani: 3,
      projeAdi: '',
      notlar: ''
    })
    setResult(null)
  }

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!result) return

    setIsGeneratingPdf(true)
    try {
      await generateDonatiAgirlikPDF({
        kalemler: result.kalemSonuclari,
        fireOrani: form.fireOrani,
        netAgirlik: result.netAgirlik,
        fireDahilAgirlik: result.fireDahilAgirlik,
        raporNo: result.raporNo,
        projeAdi: form.projeAdi || undefined,
        notlar: form.notlar || undefined
      })
    } catch (error) {
      console.error('PDF oluşturma hatası:', error)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Check if form is valid for calculation
  const isFormValid = form.kalemler.some(k => k.boy && k.adet)

  // FAQ data
  const faqItems = [
    {
      question: 'Demir ağırlığı nasıl hesaplanır?',
      answer: 'Demir ağırlığı formülü: Ağırlık (kg) = Çap² × 0.00617 × Boy (m). Bu formül yuvarlak inşaat demiri için geçerlidir. Hesaplayıcımız standart birim ağırlıkları kullanır.'
    },
    {
      question: 'Fire oranı ne kadar olmalı?',
      answer: 'Donatı işlerinde fire oranı genellikle %2-5 arasındadır. Kesim, bükme ve döşeme kayıpları için %3 standart kabul edilir. Karmaşık projeler için %5 tercih edilebilir.'
    },
    {
      question: 'Hangi çap demirler kullanılır?',
      answer: 'Konut projelerinde genellikle Ø8-Ø16, endüstriyel yapılarda Ø12-Ø25, büyük yapılarda Ø20-Ø32 kullanılır. Proje mühendisi çapları statik hesaba göre belirler.'
    },
    {
      question: 'Nervürlü ve düz demir farkı var mı?',
      answer: 'Ağırlık açısından fark yoktur, aynı formül geçerlidir. Ancak nervürlü (çelik hasır) demirler betona daha iyi tutunur ve inşaat projelerinde zorunludur.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-12">
        <div className="container-wide">
          {/* Breadcrumb & Back */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/araclar" className="hover:text-white">Araçlar</Link>
              <span>/</span>
              <span className="text-white">Donatı Ağırlık Hesabı</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/araclar">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Donatı Ağırlık Hesaplama</h1>
              <p className="text-white/70">İnşaat demiri ağırlığını hesaplayın</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Hesaplama Formu
              </h2>

              <div className="space-y-6">
                {/* Donatı Kalemleri */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Donatı Kalemleri
                  </label>

                  {form.kalemler.map((kalem, index) => (
                    <div key={kalem.id} className="p-4 bg-muted/50 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Kalem {index + 1}
                        </span>
                        {form.kalemler.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKalem(kalem.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {/* Çap */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">
                            Çap (mm)
                          </label>
                          <select
                            value={kalem.cap}
                            onChange={(e) => updateKalem(kalem.id, 'cap', parseInt(e.target.value))}
                            className="input-base text-sm"
                          >
                            {DEMIR_CAPLARI.map((d) => (
                              <option key={d.cap} value={d.cap}>
                                Ø{d.cap}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Boy */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">
                            Boy (m)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            max="12"
                            placeholder="6"
                            value={kalem.boy}
                            onChange={(e) => updateKalem(kalem.id, 'boy', e.target.value)}
                            className="input-base text-sm"
                          />
                        </div>

                        {/* Adet */}
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">
                            Adet
                          </label>
                          <input
                            type="number"
                            step="1"
                            min="1"
                            max="10000"
                            placeholder="100"
                            value={kalem.adet}
                            onChange={(e) => updateKalem(kalem.id, 'adet', e.target.value)}
                            className="input-base text-sm"
                          />
                        </div>
                      </div>

                      {/* Birim Ağırlık Info */}
                      <div className="text-xs text-muted-foreground">
                        Birim ağırlık: {DEMIR_CAPLARI.find(d => d.cap === kalem.cap)?.agirlik.toFixed(3)} kg/m
                      </div>
                    </div>
                  ))}

                  {/* Add Button */}
                  <button
                    type="button"
                    onClick={addKalem}
                    className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Kalem Ekle
                  </button>
                </div>

                {/* Fire Oranı */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fire Oranı: <span className="text-primary font-bold">%{form.fireOrani}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={form.fireOrani}
                    onChange={(e) => setForm({ ...form, fireOrani: parseInt(e.target.value) })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>%1</span>
                    <span>%10</span>
                  </div>
                </div>

                {/* Proje Adı (Opsiyonel) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Proje Adı <span className="text-muted-foreground text-xs">(opsiyonel)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="Örn: A Blok Temel Donatısı"
                    value={form.projeAdi}
                    onChange={(e) => setForm({ ...form, projeAdi: e.target.value })}
                    className="input-base"
                  />
                </div>

                {/* Notlar (Opsiyonel) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Notlar <span className="text-muted-foreground text-xs">(opsiyonel)</span>
                  </label>
                  <textarea
                    maxLength={500}
                    rows={3}
                    placeholder="Ek notlar..."
                    value={form.notlar}
                    onChange={(e) => setForm({ ...form, notlar: e.target.value })}
                    className="input-base resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="flex-1"
                    onClick={calculateWeight}
                    disabled={!isFormValid}
                  >
                    Hesapla
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={resetForm}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Hesaplama Sonucu
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Report Number */}
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Rapor No</span>
                      <span className="font-mono text-sm font-medium">{result.raporNo}</span>
                    </div>

                    {/* Item Details */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Kalem Detayları</div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {result.kalemSonuclari.map((kalem, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg text-sm">
                            <span className="text-muted-foreground">
                              Ø{kalem.cap} × {kalem.boy}m × {kalem.adet} adet
                            </span>
                            <span className="font-medium">{kalem.toplamAgirlik.toLocaleString('tr-TR')} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Net Weight */}
                    <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-2">Net Ağırlık</div>
                      <div className="text-4xl md:text-5xl font-bold text-primary">
                        {result.netAgirlik.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-xl text-primary/70">kg</div>
                    </div>

                    {/* Fire Included */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Fire Dahil (%{form.fireOrani})</div>
                        <div className="text-2xl font-bold text-foreground">
                          {result.fireDahilAgirlik.toLocaleString('tr-TR')} kg
                        </div>
                      </div>
                      <Info className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Ton conversion */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Net (ton)</div>
                        <div className="font-medium text-foreground">
                          {(result.netAgirlik / 1000).toFixed(2)} ton
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Fire Dahil (ton)</div>
                        <div className="font-medium text-foreground">
                          {(result.fireDahilAgirlik / 1000).toFixed(2)} ton
                        </div>
                      </div>
                    </div>

                    {/* Project Name */}
                    {form.projeAdi && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Proje</span>
                        <span className="text-sm font-medium">{form.projeAdi}</span>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        ⚠️ Bu hesaplama teorik değerlerdir. Gerçek ağırlık üretici toleranslarına göre değişebilir.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Button
                        variant="default"
                        className="w-full"
                        size="lg"
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {isGeneratingPdf ? 'Oluşturuluyor...' : 'PDF Oluştur'}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => setShowQuoteForm(true)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Teklif Al
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-2">Hesaplama sonucu burada görünecek</p>
                    <p className="text-sm text-muted-foreground">Formu doldurup &quot;Hesapla&quot; butonuna tıklayın</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Modal */}
      {result && (
        <QuoteRequestForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          calculationData={{
            toolType: 'donati-agirlik',
            toolName: 'Donatı Ağırlık Hesaplama',
            raporNo: result.raporNo,
            summary: `${result.netAgirlik} kg net ağırlık, fire dahil ${result.fireDahilAgirlik} kg (${(result.fireDahilAgirlik / 1000).toFixed(2)} ton)`,
            details: {
              kalemler: result.kalemSonuclari.map(k => `Ø${k.cap} x ${k.boy}m x ${k.adet} adet = ${k.toplamAgirlik} kg`),
              fireOrani: form.fireOrani,
              netAgirlik: result.netAgirlik,
              fireDahilAgirlik: result.fireDahilAgirlik,
              tonCinsinden: (result.fireDahilAgirlik / 1000).toFixed(2),
              projeAdi: form.projeAdi || undefined,
            }
          }}
        />
      )}

      {/* Reference Table */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Demir Çapları ve Birim Ağırlıkları
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Çap (mm)</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Birim Ağırlık (kg/m)</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">12m Çubuk (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMIR_CAPLARI.map((d) => (
                    <tr key={d.cap} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">Ø{d.cap}</td>
                      <td className="py-3 px-4">{d.agirlik.toFixed(3)}</td>
                      <td className="py-3 px-4">{(d.agirlik * 12).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setShowFaq(showFaq === index ? null : index)}
                >
                  <span className="font-medium text-foreground">{item.question}</span>
                  {showFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {showFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Service CTA */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Endüstriyel Zemin Betonu</h3>
                <p className="text-sm text-muted-foreground">Donatılı zemin betonu hizmetimizi inceleyin</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/hizmetler/endustriyel-zemin-betonu">
                Hizmeti İncele
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
