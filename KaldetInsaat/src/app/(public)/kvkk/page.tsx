'use client'

import Link from "next/link"
import { Shield, FileText, Mail, Phone, MapPin } from "lucide-react"

// KVKK sections data
const kvkkSections = [
  {
    title: '1. Veri Sorumlusu',
    content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz aşağıda belirtilen kapsamda işlenmektedir.`,
    contactInfo: true
  },
  {
    title: '2. İşlenen Kişisel Veriler',
    content: 'Aşağıdaki kategorilerdeki kişisel verileriniz işlenmektedir:',
    list: [
      { label: 'Kimlik Verileri', desc: 'Ad, soyad' },
      { label: 'İletişim Verileri', desc: 'E-posta adresi, telefon numarası, adres' },
      { label: 'Müşteri İşlem Verileri', desc: 'Teklif talepleri, proje bilgileri, iletişim formu verileri' },
      { label: 'İşlem Güvenliği Verileri', desc: 'IP adresi, tarayıcı bilgileri, çerez verileri' },
      { label: 'Pazarlama Verileri', desc: 'E-posta abonelik durumu, tercihler' }
    ]
  },
  {
    title: '3. Kişisel Verilerin İşlenme Amaçları',
    content: 'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
    bullets: [
      'Hizmetlerimizi sunmak ve projelerinizi yönetmek',
      'Teklif taleplerinize yanıt vermek',
      'İletişim formlarınızı işlemek',
      'Yasal yükümlülüklerimizi yerine getirmek',
      'Web sitemizi geliştirmek ve kullanıcı deneyimini iyileştirmek',
      'Pazarlama faaliyetleri yürütmek (açık rıza ile)',
      'Müşteri memnuniyetini ölçmek ve geliştirmek'
    ]
  },
  {
    title: '4. Kişisel Verilerin İşlenme Hukuki Sebepleri',
    content: 'Kişisel verileriniz aşağıdaki hukuki sebeplere dayanarak işlenmektedir:',
    bullets: [
      'KVKK Madde 5/2-c: "Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması"',
      'KVKK Madde 5/2-e: "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi"',
      'KVKK Madde 5/2-f: "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri"',
      'KVKK Madde 5/2-a: "Açık rıza" (pazarlama faaliyetleri için)'
    ]
  },
  {
    title: '5. Kişisel Verilerin Aktarımı',
    content: 'Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için, hizmet sağlayıcılarımız (hosting, e-posta servisleri, CRM sistemleri vb.) ile sınırlı olarak paylaşılabilir. Bu aktarımlar KVKK\'ya uygun olarak yapılmaktadır.'
  },
  {
    title: '6. Kişisel Verilerin Saklanma Süresi',
    content: 'Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal saklama süreleri dahilinde saklanmaktadır. İşleme amacı ortadan kalktığında, verileriniz silinir, yok edilir veya anonim hale getirilir.'
  },
  {
    title: '7. İlgili Kişinin Hakları',
    content: 'KVKK Madde 11 uyarınca, aşağıdaki haklara sahipsiniz:',
    bullets: [
      'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
      'İşlenen kişisel verileriniz hakkında bilgi talep etme',
      'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
      'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
      'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
      'KVKK\'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
      'Düzeltme, silme, yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
      'İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç doğmasına itiraz etme',
      'Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme'
    ]
  },
  {
    title: '8. Haklarınızı Kullanma Yöntemi',
    content: 'Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici belgelerle birlikte yazılı olarak veya kayıtlı elektronik posta (KEP) adresimiz üzerinden başvuruda bulunabilirsiniz. Başvurularınız, KVKK\'nın 13. maddesi uyarınca en geç 30 gün içinde sonuçlandırılacaktır.'
  }
]

export default function KVKKPage() {
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-12">
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">KVKK Aydınlatma Metni</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">KVKK Aydınlatma Metni</h1>
              <p className="text-white/70">6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
            {/* Introduction */}
            <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl mb-8">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun
                10. maddesi uyarınca veri sorumlusu sıfatıyla Kaldet İnşaat tarafından hazırlanmıştır.
              </p>
            </div>

            <div className="space-y-8">
              {kvkkSections.map((section, index) => (
                <div key={index} className="pb-8 border-b border-border last:border-0">
                  <h2 className="text-lg font-bold text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>

                  {/* Contact Info */}
                  {section.contactInfo && (
                    <div className="mt-4 p-4 bg-muted rounded-xl space-y-3">
                      <div className="font-semibold text-foreground">
                        Veri Sorumlusu: Kaldet İnşaat Mühendislik ve İnşaat Tic. Ltd. Şti.
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          İnönü Mah. Güzeller OSB. Ziya Gökalp Cad. No:8 Gebze / Kocaeli
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          0262 642 2058
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          info@kaldetinsaat.com
                        </div>
                      </div>
                    </div>
                  )}

                  {/* List with labels */}
                  {section.list && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">{item.label}:</strong> {item.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bullet list */}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Contact Section */}
              <div className="pt-4">
                <h2 className="text-lg font-bold text-foreground mb-4">9. İletişim</h2>
                <p className="text-muted-foreground mb-4">
                  KVKK kapsamındaki haklarınızı kullanmak veya sorularınız için:
                </p>
                <div className="p-4 bg-muted rounded-xl space-y-2 text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">Kaldet İnşaat</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    info@kaldetinsaat.com
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    0262 642 2058
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    İnönü Mah. Güzeller OSB. Ziya Gökalp Cad. No:8 Gebze / Kocaeli
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="pt-4 text-sm text-muted-foreground">
                Son güncelleme: {currentDate}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
