'use client'

import Link from "next/link"
import { Shield, Mail, Phone, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-12">
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Gizlilik Politikası</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Gizlilik Politikası</h1>
              <p className="text-white/70">Kişisel verilerinizin korunması bizim için önemlidir</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-bold text-foreground mb-4">1. Genel Bilgiler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kaldet İnşaat Mühendislik ve İnşaat Tic. Ltd. Şti. (&quot;Kaldet İnşaat&quot;, &quot;biz&quot;, &quot;bizim&quot;) olarak,
                  kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası,
                  web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda topladığımız
                  kişisel bilgilerin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklar.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">2. Toplanan Bilgiler</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Aşağıdaki bilgileri toplayabiliriz:
                </p>
                <ul className="space-y-2">
                  {[
                    'Ad, soyad, e-posta adresi, telefon numarası gibi iletişim bilgileri',
                    'Proje detayları ve teklif talepleri',
                    'Web sitesi kullanım verileri (IP adresi, tarayıcı türü, sayfa görüntülemeleri)',
                    'Çerezler ve benzeri teknolojiler aracılığıyla toplanan veriler'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">3. Bilgilerin Kullanımı</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Toplanan bilgileri aşağıdaki amaçlarla kullanırız:
                </p>
                <ul className="space-y-2">
                  {[
                    'Hizmetlerimizi sunmak ve projelerinizi yönetmek',
                    'Teklif taleplerinize yanıt vermek',
                    'İletişim formlarınızı işlemek',
                    'Web sitemizi geliştirmek ve kullanıcı deneyimini iyileştirmek',
                    'Yasal yükümlülüklerimizi yerine getirmek',
                    'Yasal izinler dahilinde pazarlama faaliyetleri yürütmek'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">4. Bilgilerin Paylaşımı</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel bilgilerinizi, yasal yükümlülüklerimiz dışında üçüncü taraflarla paylaşmayız.
                  Ancak, hizmet sağlayıcılarımız (hosting, e-posta servisleri vb.) ile sınırlı olarak
                  paylaşım yapabiliriz. Bu durumda, verilerinizin güvenliğini sağlamak için gerekli
                  önlemleri alırız.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">5. Veri Güvenliği</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemleri alırız.
                  Ancak, internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayın.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">6. Çerezler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizde çerezler kullanılmaktadır. Çerezler, web sitemizin işlevselliğini
                  artırmak ve kullanıcı deneyimini iyileştirmek için kullanılır. Tarayıcı
                  ayarlarınızdan çerezleri yönetebilirsiniz.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">7. Haklarınız</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="space-y-2">
                  {[
                    'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                    'İşlenen kişisel verileriniz hakkında bilgi talep etme',
                    'Kişisel verilerinizin düzeltilmesini isteme',
                    'Kişisel verilerinizin silinmesini isteme',
                    'İşleme faaliyetlerine itiraz etme',
                    'Kişisel verilerinizin aktarılmasını isteme'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">8. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="p-4 bg-muted rounded-xl space-y-2 text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">Kaldet İnşaat</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    {CONTACT_INFO.EMAIL}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {CONTACT_INFO.PHONE_DISPLAY}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {CONTACT_INFO.ADDRESS}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-foreground mb-4">9. Değişiklikler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişikliklerde
                  sizi bilgilendireceğiz. Güncel politika her zaman web sitemizde yayınlanmaktadır.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Son güncelleme: {currentDate}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
