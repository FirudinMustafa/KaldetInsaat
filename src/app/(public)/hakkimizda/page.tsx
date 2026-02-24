'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Award,
  Target,
  Eye,
  Users,
  TrendingUp,
  Shield,
  Building2,
  ArrowRight,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Briefcase,
  Calendar
} from "lucide-react"

// Timeline data
const timelineItems = [
  {
    year: '1999',
    title: 'Sektöre Giriş',
    description: 'Kurucumuz İsmail Kaya, inşaat sektöründe Şantiye Şefliği görevine başladı.'
  },
  {
    year: '2004',
    title: 'Endüstriyel Uzmanlaşma',
    description: 'Endüstriyel zemin betonu, bina inşaatı ve altyapı projelerinde deneyim kazandı.'
  },
  {
    year: '2016',
    title: 'Kaldet İnşaat Kuruluşu',
    description: 'Birikilen tecrübeyle Kaldet İnşaat resmi olarak kuruldu.'
  },
  {
    year: '2020',
    title: 'Büyüme Dönemi',
    description: 'Epoksi kaplama ve özel beton çözümleri portföye eklendi.'
  },
  {
    year: '2024',
    title: 'Dijital Dönüşüm',
    description: 'Online teklif ve proje takip sistemleri devreye alındı.'
  }
]

// Values data
const valuesData = [
  {
    icon: Award,
    title: 'Kalite',
    description: 'En yüksek kalite standartlarında hizmet sunuyoruz',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Users,
    title: 'Müşteri Odaklılık',
    description: 'Müşteri memnuniyeti bizim için her şeyden önemlidir',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Sürekli Gelişim',
    description: 'Kendimizi ve hizmetlerimizi sürekli geliştiriyoruz',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Verdiğimiz sözleri tutma konusunda kararlıyız',
    color: 'from-rose-500 to-pink-500'
  }
]

// Stats data
const statsData = [
  { value: '25+', label: 'Yıllık Tecrübe', icon: Calendar },
  { value: '150+', label: 'Tamamlanan Proje', icon: Briefcase },
  { value: '%98', label: 'Müşteri Memnuniyeti', icon: Users },
  { value: '50+', label: 'Uzman Personel', icon: Building2 }
]

export default function HakkimizdaPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="container-wide">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-8">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-white">Hakkımızda</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Kalite</span>{' '}
              <span className="text-white">Detaylarda Gizlidir</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              2016 yılından bu yana endüstriyel zemin ve inşaat sektöründe kaliteli,
              güvenilir ve yenilikçi çözümler sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/iletisim">
                  <Phone className="w-4 h-4 mr-2" />
                  İletişime Geçin
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/projeler">
                  Projelerimiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                Hikayemiz
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Kaldet İnşaat Hikayesi
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Kaldet İnşaat</strong>,
                  <strong className="text-primary"> 2016 yılı Mart ayında İsmail Kaya</strong> tarafından
                  Kocaeli/Gebze merkezli olarak kurulmuştur.
                </p>
                <p>
                  Kurucumuz İsmail Kaya, 1999-2004 yılları arasında özel bir inşaat şirketinde
                  <strong className="text-foreground"> Endüstriyel Zemin Betonu</strong>,
                  <strong className="text-foreground"> Endüstri Bina İnşaatı</strong> ve
                  <strong className="text-foreground"> Altyapı İnşaatı</strong> gibi projelerde
                  Şantiye Şefliği görevlerinde bulunmuştur.
                </p>
                <p>
                  <span className="text-primary font-semibold">25+ yıllık sektör tecrübesi</span> ile
                  birikimimizi her projemize yansıtarak, müşterilerimize yüksek kaliteli ve güvenilir
                  çözümler sunmaktayız.
                </p>
              </div>

              {/* Founder Section */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src="/images/team/ismail-kaya.png"
                    alt="İsmail Kaya - Kaldet İnşaat Kurucusu"
                    fill
                    className="object-cover rounded-full border-2 border-primary/30"
                  />
                </div>
                <div>
                  <p className="text-foreground font-semibold">İsmail Kaya</p>
                  <p className="text-sm text-primary font-medium">Kurucu & Genel Müdür</p>
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    &quot;Kalite Detaylarda Gizlidir&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">Kilometre Taşları</h3>
              <div className="space-y-6">
                {timelineItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {item.year.slice(-2)}
                      </div>
                      {index < timelineItems.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="text-sm text-primary font-medium">{item.year}</div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Misyonumuz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Endüstriyel zemin ve inşaat sektöründe, en yüksek kalite standartlarında,
                çevre dostu ve yenilikçi çözümler sunarak, müşterilerimizin beklentilerini
                aşan projeler gerçekleştirmek. Güvenilirlik, profesyonellik ve müşteri memnuniyetini
                her zaman ön planda tutarak sektörde lider konumumuzu sürdürmek.
              </p>
              <ul className="mt-6 space-y-2">
                {['Kalite odaklı üretim', 'Zamanında teslimat', 'Şeffaf iletişim'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Vizyonumuz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Türkiye&apos;nin en çok tercih edilen, uluslararası standartlarda hizmet veren,
                sürdürülebilir ve çevreye duyarlı inşaat çözümleri sunan, teknolojik gelişmeleri
                takip eden ve sektöre yön veren bir marka olmak. Sürekli gelişim ve yenilikçilik
                ile global pazarda da tanınan bir firma haline gelmek.
              </p>
              <ul className="mt-6 space-y-2">
                {['Sürdürülebilir büyüme', 'Teknolojik yenilik', 'Global standartlar'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Değerlerimiz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              İş yapış şeklimizi belirleyen ve her projede rehberimiz olan temel değerlerimiz
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why KalDet */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Kaldet İnşaat</span>?
              </h2>
              <p className="text-white/70 mb-8">
                25 yılı aşkın tecrübemiz, uzman ekibimiz ve kalite odaklı anlayışımızla
                projelerinizi güvenle teslim ediyoruz.
              </p>

              <div className="space-y-4">
                {[
                  'Sektörde 25+ yıllık deneyim',
                  '150+ başarılı tamamlanmış proje',
                  'Yerinde keşif ve özel çözümler',
                  'Garanti kapsamında kaliteli işçilik',
                  '7/24 teknik destek hizmeti',
                  'Şeffaf fiyatlandırma politikası'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-6">Projeniz İçin Teklif Alın</h3>
              <p className="text-white/70 mb-6">
                Uzman ekibimiz projenizi değerlendirsin ve size özel bir teklif hazırlasın.
              </p>
              <div className="space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/iletisim">
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Teklif Alın
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/hizmetler">
                    Hizmetlerimizi İnceleyin
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
