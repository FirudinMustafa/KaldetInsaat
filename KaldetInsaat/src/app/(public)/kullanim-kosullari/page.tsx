'use client'

import Link from "next/link"
import { FileText, Mail, Phone, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

export default function TermsOfServicePage() {
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
            <span className="text-white">Kullanım Koşulları</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Kullanım Koşulları</h1>
              <p className="text-white/70">Web sitemizi kullanmadan önce lütfen bu koşulları okuyun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
            <div className="space-y-8">
              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">1. Genel Hükümler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu web sitesi, Kaldet İnşaat Mühendislik ve İnşaat Tic. Ltd. Şti. (&quot;Kaldet İnşaat&quot;)
                  tarafından işletilmektedir. Web sitemizi kullanarak, aşağıdaki kullanım koşullarını
                  kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen web sitemizi
                  kullanmayın.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">2. Web Sitesi Kullanımı</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Web sitemizi yalnızca yasal amaçlarla ve bu kullanım koşullarına uygun olarak
                  kullanabilirsiniz. Aşağıdaki faaliyetler yasaktır:
                </p>
                <ul className="space-y-2">
                  {[
                    'Web sitesinin içeriğini izinsiz kopyalama, dağıtma veya değiştirme',
                    'Web sitesini zararlı yazılımlarla etkileme veya saldırı yapma',
                    'Web sitesinin işleyişini engelleme veya bozma',
                    'Başkalarının kişisel bilgilerini izinsiz toplama',
                    'Yasa dışı veya zararlı içerik paylaşma'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">3. Fikri Mülkiyet Hakları</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizdeki tüm içerikler (metinler, görseller, logolar, tasarımlar vb.)
                  Kaldet İnşaat&apos;ın fikri mülkiyetidir ve telif hakları ile korunmaktadır.
                  İçerikleri izinsiz kullanmak yasaktır.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">4. İletişim Formları</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizdeki iletişim formlarını doldururken, doğru ve güncel bilgiler
                  sağlamanız gerekmektedir. Yanlış veya yanıltıcı bilgi vermek yasaktır.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">5. Teklif ve Fiyatlandırma</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizdeki fiyat bilgileri ve teklif hesaplamaları genel bilgilendirme
                  amaçlıdır. Kesin fiyatlar, proje detaylarına göre değişiklik gösterebilir.
                  Kesin fiyat için bizimle iletişime geçmeniz gerekmektedir.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">6. Üçüncü Taraf Bağlantılar</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantılar
                  yalnızca bilgilendirme amaçlıdır ve içeriklerinden sorumlu değiliz.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">7. Sorumluluk Reddi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. Bilgilerin doğruluğu,
                  güncelliği veya eksiksizliği konusunda garanti vermiyoruz. Web sitemizin
                  kullanımından kaynaklanan herhangi bir zarardan sorumlu değiliz.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">8. Değişiklikler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu kullanım koşullarını istediğimiz zaman değiştirme hakkını saklı tutarız.
                  Önemli değişikliklerde sizi bilgilendireceğiz. Güncel koşullar her zaman
                  web sitemizde yayınlanmaktadır.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">9. Uygulanacak Hukuk</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir
                  uyuşmazlık durumunda Kocaeli mahkemeleri yetkilidir.
                </p>
              </section>

              <section className="pb-8 border-b border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">10. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
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
                <p className="text-sm text-muted-foreground">
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
