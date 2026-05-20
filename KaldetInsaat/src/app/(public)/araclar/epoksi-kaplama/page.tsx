'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  PaintBucket,
  Download,
  Phone,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Calculator,
  FileText,
  Info
} from "lucide-react"
import { generateEpoksiKaplamaPDF } from "@/lib/pdf-generator"
import QuoteRequestForm from "@/components/shared/QuoteRequestForm"

// Form state type
interface FormState {
  en: string
  boy: string
  katSayisi: number
  sarfiyatTipi: 'standart' | 'yogun'
  fireOrani: number
  projeAdi: string
  notlar: string
}

// Result type
interface ResultState {
  alan: number
  netSarfiyat: number
  fireDahilSarfiyat: number
  raporNo: string
}

// Sarfiyat oranları (kg/m² per kat)
const SARFIYAT_ORANLARI = {
  standart: 0.3, // 300g/m² per kat
  yogun: 0.5     // 500g/m² per kat
}

export default function EpoksiKaplamaPage() {
  const [form, setForm] = useState<FormState>({
    en: '',
    boy: '',
    katSayisi: 2,
    sarfiyatTipi: 'standart',
    fireOrani: 5,
    projeAdi: '',
    notlar: ''
  })

  const [result, setResult] = useState<ResultState | null>(null)
  const [showFaq, setShowFaq] = useState<number | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Calculate consumption
  const calculateConsumption = useCallback(() => {
    const en = parseFloat(form.en)
    const boy = parseFloat(form.boy)

    if (isNaN(en) || isNaN(boy)) {
      return
    }

    const alan = en * boy
    const sarfiyatOrani = SARFIYAT_ORANLARI[form.sarfiyatTipi]
    const netSarfiyat = alan * form.katSayisi * sarfiyatOrani
    const fireDahilSarfiyat = netSarfiyat * (1 + form.fireOrani / 100)

    // Generate report number
    const now = new Date()
    const year = now.getFullYear()
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const raporNo = `KD-EPX-${year}-${randomNum}`

    setResult({
      alan: Math.round(alan * 100) / 100,
      netSarfiyat: Math.round(netSarfiyat * 100) / 100,
      fireDahilSarfiyat: Math.round(fireDahilSarfiyat * 100) / 100,
      raporNo
    })
  }, [form])

  // Reset form
  const resetForm = () => {
    setForm({
      en: '',
      boy: '',
      katSayisi: 2,
      sarfiyatTipi: 'standart',
      fireOrani: 5,
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
      await generateEpoksiKaplamaPDF({
        en: parseFloat(form.en),
        boy: parseFloat(form.boy),
        katSayisi: form.katSayisi,
        sarfiyatTipi: form.sarfiyatTipi,
        fireOrani: form.fireOrani,
        alan: result.alan,
        netSarfiyat: result.netSarfiyat,
        fireDahilSarfiyat: result.fireDahilSarfiyat,
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
  const isFormValid = form.en && form.boy

  // FAQ data
  const faqItems = [
    {
      question: 'Kaç kat epoksi uygulanmalı?',
      answer: 'Standart kullanım için 2 kat yeterlidir. Yüksek trafik, kimyasal maruz kalma veya ağır yük altındaki zeminlerde 3 kat önerilir. İlk kat astar, sonrakiler kaplama olarak uygulanır.'
    },
    {
      question: 'Standart ve yoğun sarfiyat farkı nedir?',
      answer: 'Standart sarfiyat (300g/m²) düzgün yüzeylerde yeterlidir. Yoğun sarfiyat (500g/m²) pürüzlü, gözenekli veya eski zeminlerde tercih edilir. Zemin durumuna göre seçim yapılmalıdır.'
    },
    {
      question: 'Epoksi ne kadar sürede kurur?',
      answer: 'Yürümeye açılma süresi 24-48 saat, tam kürleme süresi 7 gündür. Ortam sıcaklığı (15-25°C) ve nem oranı (%80 altı) kuruma süresini etkiler.'
    },
    {
      question: 'Hangi zeminlere epoksi uygulanabilir?',
      answer: 'Beton, şap, mozaik ve taş yüzeylere uygulanabilir. Zemin nem oranı %4 altında olmalı, yüzey temiz, kuru ve tozdan arındırılmış olmalıdır.'
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
              <span className="text-white">Epoksi Kaplama Hesabı</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/araclar">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <PaintBucket className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Epoksi Kaplama Hesaplama</h1>
              <p className="text-white/70">Zemin kaplama için gereken epoksi miktarını hesaplayın</p>
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
                {/* En */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    En (m) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1000"
                    placeholder="Örn: 20"
                    value={form.en}
                    onChange={(e) => setForm({ ...form, en: e.target.value })}
                    className="input-base"
                  />
                </div>

                {/* Boy */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Boy (m) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1000"
                    placeholder="Örn: 15"
                    value={form.boy}
                    onChange={(e) => setForm({ ...form, boy: e.target.value })}
                    className="input-base"
                  />
                </div>

                {/* Kat Sayısı */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kat Sayısı
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((kat) => (
                      <button
                        key={kat}
                        type="button"
                        onClick={() => setForm({ ...form, katSayisi: kat })}
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                          form.katSayisi === kat
                            ? 'bg-primary text-white border-primary'
                            : 'bg-background border-border text-foreground hover:border-primary/50'
                        }`}
                      >
                        {kat} Kat
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sarfiyat Tipi */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sarfiyat Tipi
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, sarfiyatTipi: 'standart' })}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                        form.sarfiyatTipi === 'standart'
                          ? 'bg-primary text-white border-primary'
                          : 'bg-background border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      <div>Standart</div>
                      <div className="text-xs opacity-70">300g/m²</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, sarfiyatTipi: 'yogun' })}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                        form.sarfiyatTipi === 'yogun'
                          ? 'bg-primary text-white border-primary'
                          : 'bg-background border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      <div>Yoğun</div>
                      <div className="text-xs opacity-70">500g/m²</div>
                    </button>
                  </div>
                </div>

                {/* Fire Oranı */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fire Oranı: <span className="text-primary font-bold">%{form.fireOrani}</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={form.fireOrani}
                    onChange={(e) => setForm({ ...form, fireOrani: parseInt(e.target.value) })}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>%3</span>
                    <span>%15</span>
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
                    placeholder="Örn: Depo Zemin Kaplama"
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
                    onClick={calculateConsumption}
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

                    {/* Area */}
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Toplam Alan</span>
                      <span className="font-medium">{result.alan.toLocaleString('tr-TR')} m²</span>
                    </div>

                    {/* Net Consumption */}
                    <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-2">Net Sarfiyat ({form.katSayisi} kat)</div>
                      <div className="text-4xl md:text-5xl font-bold text-primary">
                        {result.netSarfiyat.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-xl text-primary/70">kg</div>
                    </div>

                    {/* Fire Included */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Fire Dahil (%{form.fireOrani})</div>
                        <div className="text-2xl font-bold text-foreground">
                          {result.fireDahilSarfiyat.toLocaleString('tr-TR')} kg
                        </div>
                      </div>
                      <Info className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Sarfiyat Tipi</div>
                        <div className="font-medium text-foreground capitalize">{form.sarfiyatTipi}</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">m² Başı</div>
                        <div className="font-medium text-foreground">
                          {(SARFIYAT_ORANLARI[form.sarfiyatTipi] * form.katSayisi * 1000).toFixed(0)}g
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
                        ⚠️ Bu hesaplama tahminidir. Zemin durumuna göre sarfiyat değişebilir. Fiyat içermez.
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
            toolType: 'epoksi-kaplama',
            toolName: 'Epoksi Kaplama Hesaplama',
            raporNo: result.raporNo,
            summary: `${result.alan} m² alan, ${result.fireDahilSarfiyat} kg epoksi (${form.katSayisi} kat)`,
            details: {
              alan: result.alan,
              en: parseFloat(form.en),
              boy: parseFloat(form.boy),
              katSayisi: form.katSayisi,
              sarfiyatTipi: form.sarfiyatTipi,
              fireOrani: form.fireOrani,
              netSarfiyat: result.netSarfiyat,
              fireDahilSarfiyat: result.fireDahilSarfiyat,
              projeAdi: form.projeAdi || undefined,
            }
          }}
        />
      )}

      {/* Formula & Info Section */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Formül ve Hesaplama Bilgisi
            </h2>

            {/* Formula */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-foreground mb-3">Epoksi Sarfiyat Hesaplama Formülü</h3>
              <div className="bg-white rounded-lg p-4 text-center">
                <code className="text-lg font-mono text-primary">
                  Sarfiyat (kg) = Alan (m²) × Birim Sarfiyat (kg/m²) × Kat Sayısı
                </code>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Fire dahil sarfiyat = Net Sarfiyat × (1 + Fire Oranı / 100)
              </p>
            </div>

            {/* Reference Table */}
            <h3 className="font-medium text-foreground mb-4">Epoksi Kaplama Tipleri ve Sarfiyatları</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Kaplama Tipi</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Birim Sarfiyat</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Kalınlık</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">İnce (Primer)</td>
                    <td className="py-3 px-4">150-200 g/m²</td>
                    <td className="py-3 px-4">0.1-0.3 mm</td>
                    <td className="py-3 px-4">Astar, hafif trafik</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">Orta (Standart)</td>
                    <td className="py-3 px-4">300-400 g/m²</td>
                    <td className="py-3 px-4">0.5-1.0 mm</td>
                    <td className="py-3 px-4">Depo, atölye, otopark</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">Kalın (Self-leveling)</td>
                    <td className="py-3 px-4">500-700 g/m²</td>
                    <td className="py-3 px-4">1.5-3.0 mm</td>
                    <td className="py-3 px-4">Fabrika, gıda tesisi</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">Çok Kalın (Endüstriyel)</td>
                    <td className="py-3 px-4">800-1200 g/m²</td>
                    <td className="py-3 px-4">3.0-5.0 mm</td>
                    <td className="py-3 px-4">Ağır sanayi, kimya</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Not:</strong> Zemin durumu (pürüzlülük, gözeneklilik) sarfiyatı %10-30 oranında artırabilir.
                Kesin sarfiyat için yerinde inceleme önerilir.
              </p>
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
                <PaintBucket className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Epoksi Zemin Kaplama</h3>
                <p className="text-sm text-muted-foreground">Hijyenik ve dayanıklı zemin kaplama hizmetimizi inceleyin</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/hizmetler/epoksi-zemin-kaplama">
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
