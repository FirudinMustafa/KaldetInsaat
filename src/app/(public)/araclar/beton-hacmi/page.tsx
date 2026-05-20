'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Download,
  Phone,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Calculator,
  FileText,
  Info
} from "lucide-react"
import { generateBetonHacmiPDF } from "@/lib/pdf-generator"
import QuoteRequestForm from "@/components/shared/QuoteRequestForm"

// Form state type
interface FormState {
  en: string
  boy: string
  kalinlik: string
  fireOrani: number
  projeAdi: string
  notlar: string
}

// Result type
interface ResultState {
  netHacim: number
  fireDahilHacim: number
  raporNo: string
}

export default function BetonHacmiPage() {
  const [form, setForm] = useState<FormState>({
    en: '',
    boy: '',
    kalinlik: '15',
    fireOrani: 5,
    projeAdi: '',
    notlar: ''
  })

  const [result, setResult] = useState<ResultState | null>(null)
  const [showFaq, setShowFaq] = useState<number | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Calculate volume
  const calculateVolume = useCallback(() => {
    const en = parseFloat(form.en)
    const boy = parseFloat(form.boy)
    const kalinlik = parseFloat(form.kalinlik) / 100 // cm to m

    if (isNaN(en) || isNaN(boy) || isNaN(kalinlik)) {
      return
    }

    const netHacim = en * boy * kalinlik
    const fireDahilHacim = netHacim * (1 + form.fireOrani / 100)

    // Generate report number
    const now = new Date()
    const year = now.getFullYear()
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const raporNo = `KD-${year}-${randomNum}`

    setResult({
      netHacim: Math.round(netHacim * 100) / 100,
      fireDahilHacim: Math.round(fireDahilHacim * 100) / 100,
      raporNo
    })
  }, [form])

  // Reset form
  const resetForm = () => {
    setForm({
      en: '',
      boy: '',
      kalinlik: '15',
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
      await generateBetonHacmiPDF({
        en: parseFloat(form.en),
        boy: parseFloat(form.boy),
        kalinlik: parseFloat(form.kalinlik),
        fireOrani: form.fireOrani,
        netHacim: result.netHacim,
        fireDahilHacim: result.fireDahilHacim,
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
  const isFormValid = form.en && form.boy && form.kalinlik

  // FAQ data
  const faqItems = [
    {
      question: 'Fire oranı nedir?',
      answer: 'Fire oranı, döküm sırasında oluşabilecek kayıpları (dökülme, sızma, kalıp düzensizliği) karşılamak için hesaplanan ekstra malzeme miktarıdır. Genellikle %3-10 arası önerilir.'
    },
    {
      question: 'Kalınlık nasıl ölçülür?',
      answer: 'Beton kalınlığı, döşeme veya plak yüksekliğidir. Standart endüstriyel zeminlerde 10-20 cm arası tercih edilir. Ağır yükler için 20-30 cm gerekebilir.'
    },
    {
      question: 'Bu hesaplama ne kadar doğru?',
      answer: 'Bu hesaplama matematiksel olarak doğrudur, ancak zemin düzensizlikleri, kalıp kayıpları ve uygulama detayları nedeniyle fiili tüketim değişebilir. Kesin metraj için yerinde ölçüm önerilir.'
    },
    {
      question: 'Fiyat nasıl hesaplanır?',
      answer: 'Beton fiyatı; beton sınıfı, pompa kullanımı, mesafe, iş hacmi ve piyasa koşullarına göre değişir. Güncel fiyat teklifi için bizimle iletişime geçin.'
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
              <span className="text-white">Beton Hacmi Hesabı</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/araclar">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Box className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Beton Hacmi Hesaplama</h1>
              <p className="text-white/70">Projeniz için gereken beton miktarını hesaplayın</p>
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
                    placeholder="Örn: 50"
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
                    placeholder="Örn: 30"
                    value={form.boy}
                    onChange={(e) => setForm({ ...form, boy: e.target.value })}
                    className="input-base"
                  />
                </div>

                {/* Kalınlık */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kalınlık (cm) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="5"
                    max="100"
                    placeholder="Örn: 15"
                    value={form.kalinlik}
                    onChange={(e) => setForm({ ...form, kalinlik: e.target.value })}
                    className="input-base"
                  />
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
                    placeholder="Örn: Fabrika Zemin Projesi"
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
                    onClick={calculateVolume}
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

                    {/* Net Volume */}
                    <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-2">Net Hacim</div>
                      <div className="text-4xl md:text-5xl font-bold text-primary">
                        {result.netHacim.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-xl text-primary/70">m³</div>
                    </div>

                    {/* Fire Included Volume */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Fire Dahil (%{form.fireOrani})</div>
                        <div className="text-2xl font-bold text-foreground">
                          {result.fireDahilHacim.toLocaleString('tr-TR')} m³
                        </div>
                      </div>
                      <Info className="w-5 h-5 text-muted-foreground" />
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
                        ⚠️ Bu hesaplama tahminidir. Fiyat içermez. Kesin fiyat teklif aşamasında belirlenir.
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

      {/* Formula & Info Section */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Formül ve Hesaplama Bilgisi
            </h2>

            {/* Formula */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-foreground mb-3">Beton Hacmi Hesaplama Formülü</h3>
              <div className="bg-white rounded-lg p-4 text-center">
                <code className="text-lg font-mono text-primary">
                  Hacim (m³) = En (m) × Boy (m) × Kalınlık (m)
                </code>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Fire dahil hacim = Net Hacim × (1 + Fire Oranı / 100)
              </p>
            </div>

            {/* Reference Table */}
            <h3 className="font-medium text-foreground mb-4">Endüstriyel Zemin Betonu Standartları</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Kullanım Alanı</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Önerilen Kalınlık</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Beton Sınıfı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">Hafif yük (ofis, mağaza)</td>
                    <td className="py-3 px-4 font-medium">10-12 cm</td>
                    <td className="py-3 px-4">C25/30</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">Orta yük (depo, atölye)</td>
                    <td className="py-3 px-4 font-medium">15-18 cm</td>
                    <td className="py-3 px-4">C30/37</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">Ağır yük (fabrika, lojistik)</td>
                    <td className="py-3 px-4 font-medium">20-25 cm</td>
                    <td className="py-3 px-4">C35/45</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">Çok ağır yük (ağır sanayi)</td>
                    <td className="py-3 px-4 font-medium">25-35 cm</td>
                    <td className="py-3 px-4">C40/50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Not:</strong> Yukarıdaki değerler genel önerilerdir. Kesin kalınlık ve beton sınıfı,
                projenin statik hesaplarına, zemin koşullarına ve yük analizine göre belirlenir.
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
                <Box className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Endüstriyel Zemin Betonu</h3>
                <p className="text-sm text-muted-foreground">Yüksek dayanımlı zemin betonu hizmetimizi inceleyin</p>
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

      {/* Quote Request Modal */}
      {result && (
        <QuoteRequestForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          calculationData={{
            toolType: 'beton-hacmi',
            toolName: 'Beton Hacmi Hesaplama',
            raporNo: result.raporNo,
            summary: `${result.netHacim} m³ net hacim, fire dahil ${result.fireDahilHacim} m³`,
            details: {
              en: parseFloat(form.en),
              boy: parseFloat(form.boy),
              kalinlik: parseFloat(form.kalinlik),
              fireOrani: form.fireOrani,
              netHacim: result.netHacim,
              fireDahilHacim: result.fireDahilHacim,
              projeAdi: form.projeAdi || undefined,
            }
          }}
        />
      )}
    </div>
  )
}
