import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Box, PaintBucket, Calculator, FileText, Phone, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hesaplama Araçları | Beton, Epoksi, Donatı Hesabı | KalDet",
  description: "Ücretsiz hesaplama araçları ile projeniz için gereken malzeme miktarını hesaplayın. Beton hacmi, epoksi kaplama, donatı ağırlığı hesabı + PDF rapor.",
}

const tools = [
  {
    name: 'Beton Hacmi Hesabı',
    description: 'Projeniz için gereken beton miktarını hesaplayın. En, boy ve kalınlık değerlerini girerek m³ cinsinden net hacim ve fire dahil hesap sonucunu alın.',
    output: 'm³ hacim',
    features: ['Fire oranı ayarlama (%3-15)', 'Proje adı ekleme', 'PDF rapor'],
    href: '/araclar/beton-hacmi',
    icon: Box,
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Epoksi Kaplama Hesabı',
    description: 'Zemin kaplama projeleri için epoksi sarfiyatını hesaplayın. Alan, kat sayısı ve sarfiyat tipine göre gereken malzeme miktarını öğrenin.',
    output: 'kg sarfiyat',
    features: ['1-3 kat seçimi', 'Standart/yoğun sarfiyat', 'PDF rapor'],
    href: '/araclar/epoksi-kaplama',
    icon: PaintBucket,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Donatı Ağırlık Hesabı',
    description: 'İnşaat demiri ağırlığını hesaplayın. Çap, boy ve adet bilgilerini girerek toplam demir ağırlığını kg cinsinden öğrenin.',
    output: 'kg ağırlık',
    features: ['6-32mm çap seçimi', 'Adet çarpanı', 'PDF rapor'],
    href: '/araclar/donati-agirlik',
    icon: Calculator,
    color: 'from-violet-500 to-purple-500',
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'Ölçüleri Girin',
    description: 'Projenize ait boyut ve miktar bilgilerini forma girin.',
  },
  {
    step: 2,
    title: 'Sonucu Görün',
    description: 'Hesaplama sonucu anında görüntülenir.',
  },
  {
    step: 3,
    title: 'PDF İndirin',
    description: 'Sonuçları PDF rapor olarak kaydedin.',
  },
  {
    step: 4,
    title: 'Teklif Alın',
    description: 'Hesabınıza göre profesyonel teklif alın.',
  },
]

export default function AraclarPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding-sm bg-secondary text-white">
        <div className="container-wide">
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
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Ücretsiz Hesaplama Araçları</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Projeniz için{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Hızlı Hesaplama</span>
            </h1>
            <p className="text-lg text-white/70 mb-6">
              Beton hacmi, epoksi sarfiyatı, donatı ağırlığı... Tüm hesaplamalarınızı yapın,
              PDF rapor alın ve profesyonel teklif isteyin.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Ücretsiz</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Kayıt Gerektirmez</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>PDF Rapor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.href}
                  className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tool.description}
                  </p>

                  {/* Output Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Çıktı:</span>
                    <span className="text-sm font-medium text-foreground">{tool.output} + PDF</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button variant="default" className="w-full" asChild>
                    <Link href={tool.href}>
                      Aracı Kullan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-muted-foreground">
              4 kolay adımda hesaplama yapın ve teklif alın
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="text-center p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                ⚠️ <strong className="text-foreground">Önemli:</strong> Bu araçlarla yapılan hesaplamalar tahminidir ve fiyat içermez.
              </p>
              <p className="text-sm text-muted-foreground">
                Kesin fiyat ve detaylı metraj için profesyonel keşif ve teklif hizmetimizden yararlanın.
              </p>
            </div>
            <Button variant="default" size="lg" asChild>
              <Link href="/iletisim" className="gap-2">
                <Phone className="w-5 h-5" />
                Teklif Al
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
