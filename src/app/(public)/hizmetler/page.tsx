import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  PaintBucket,
  Layers,
  Wrench,
  Zap,
  Hammer,
  CheckCircle,
  Phone,
  Award,
  Clock,
  Shield,
  Sparkles,
  Construction
} from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Hizmetlerimiz | Endüstriyel Zemin & Tesis Çözümleri | KalDet İnşaat",
  description: "Endüstriyel zemin betonu, epoksi kaplama, baskı beton, bakım onarım ve altyapı hizmetleri. 25+ yıl tecrübe ile profesyonel çözümler.",
}

const iconMap: Record<string, any> = {
  Building2,
  PaintBucket,
  Layers,
  Wrench,
  Zap,
  Hammer,
  Sparkles,
  Construction,
}

const colorMap: Record<string, string> = {
  "endustriyel-zemin-betonu": "from-orange-500 to-amber-500",
  "epoksi-zemin-kaplama": "from-teal-500 to-cyan-500",
  "baski-beton-uygulamalari": "from-violet-500 to-purple-500",
  "celik-konstruksiyon": "from-slate-500 to-gray-500",
  "endustri-tesis-bakim-onarim": "from-rose-500 to-pink-500",
  "altyapi-uygulamalari": "from-emerald-500 to-green-500",
  "endustriyel-tesisat-uygulamalari": "from-yellow-500 to-amber-500",
}

async function getServices() {
  return await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  })
}

const stats = [
  { value: "150+", label: "Tamamlanan Proje", icon: CheckCircle },
  { value: "25+", label: "Yıl Tecrübe", icon: Clock },
  { value: "500K+", label: "m² Uygulama", icon: Award },
  { value: "0", label: "İş Kazası", icon: Shield },
]

export default async function HizmetlerPage() {
  const services = await getServices()
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container-wide">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-white">Hizmetlerimiz</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Endüstriyel Zemin &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Tesis Çözümleri</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              25+ yıllık tecrübemizle fabrikalar, depolar ve endüstriyel tesisler için
              kapsamlı zemin ve altyapı çözümleri sunuyoruz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center p-4 bg-white/5 rounded-xl">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Hizmetler yakında eklenecek.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon || 'Building2'] || Building2
                const color = colorMap[service.slug] || "from-orange-500 to-amber-500"
                return (
                  <div
                    key={service.slug}
                    className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {service.shortDescription || service.description?.replace(/<[^>]*>/g, '').slice(0, 150) || ''}
                    </p>

                    {/* CTA */}
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all" asChild>
                      <Link href={`/hizmetler/${service.slug}`}>
                        Detaylı Bilgi
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Neden KalDet İnşaat?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Her projede aynı kalite standardı ve müşteri memnuniyeti odaklı yaklaşım
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Kaliteli Malzeme</h3>
              <p className="text-sm text-muted-foreground">TSE ve CE sertifikalı malzemeler</p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hızlı Teslimat</h3>
              <p className="text-sm text-muted-foreground">Zamanında proje teslimi garantisi</p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Uzman Ekip</h3>
              <p className="text-sm text-muted-foreground">Deneyimli profesyonel kadro</p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Garanti</h3>
              <p className="text-sm text-muted-foreground">Uzun süreli iş garantisi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm bg-secondary text-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Projeniz İçin Ücretsiz Teklif Alın
            </h2>
            <p className="text-white/70 mb-8">
              Hangi hizmete ihtiyacınız olduğundan emin değil misiniz? Uzman ekibimiz size yardımcı olsun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link href="/araclar">
                  Hesaplama Araçları
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
                <Link href="/iletisim">
                  <Phone className="w-4 h-4 mr-2" />
                  İletişime Geçin
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
