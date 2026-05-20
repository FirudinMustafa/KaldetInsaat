import { prisma } from "@/lib/prisma"
import { Award, Calendar, Building2, Download, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Sertifikalar | Kaldet Pro",
  description: "Kaldet İnşaat kalite, çevre ve iş güvenliği sertifikaları. ISO 9001, ISO 14001, ISO 45001 ve diğer yetkinlik belgelerimiz.",
}

async function getCertificates() {
  return await prisma.certificate.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  })
}

export default async function SertifikalarPage() {
  const certificates = await getCertificates()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-end mb-6">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">Kalite Belgelerimiz</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sertifikalar ve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Yetkinlik Belgeleri
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Uluslararası standartlara uygunluğumuz ve kalite taahhüdümüzün resmi belgeleri
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">{certificates.length}</div>
              <div className="text-gray-600">Aktif Sertifika</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">ISO</div>
              <div className="text-gray-600">Uluslararası Standart</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">TSE</div>
              <div className="text-gray-600">Türk Standardları</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">CE</div>
              <div className="text-gray-600">Avrupa Uygunluk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Henüz sertifika eklenmemiş.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Certificate Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                      <div className="flex items-center justify-between">
                        <Award className="w-12 h-12 text-white opacity-90" />
                        <CheckCircle className="w-8 h-8 text-white opacity-75" />
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {cert.title}
                      </h3>

                      {cert.description && (
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm">
                        {cert.issuer && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building2 className="w-4 h-4 text-amber-500" />
                            <span>Veren Kurum: <strong>{cert.issuer}</strong></span>
                          </div>
                        )}

                        {cert.issueDate && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span>
                              Verilme Tarihi:{" "}
                              <strong>
                                {new Date(cert.issueDate).toLocaleDateString("tr-TR", {
                                  year: "numeric",
                                  month: "long",
                                })}
                              </strong>
                            </span>
                          </div>
                        )}
                      </div>

                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Sertifikayı İndir
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Certifications Matter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Neden Sertifikalar Önemli?
              </h2>
              <p className="text-gray-600">
                Sertifikalarımız, kalite ve güvenlik standartlarına olan bağlılığımızın kanıtıdır.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Kalite Güvencesi</h3>
                  <p className="text-gray-600 text-sm">
                    ISO 9001 sertifikamız, tüm süreçlerimizin uluslararası kalite standartlarına uygun olduğunu garanti eder.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Çevre Duyarlılığı</h3>
                  <p className="text-gray-600 text-sm">
                    ISO 14001 ile çevresel sürdürülebilirlik taahhüdümüzü belgeler, doğaya saygılı üretim yaparız.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">İş Güvenliği</h3>
                  <p className="text-gray-600 text-sm">
                    ISO 45001 sertifikası, çalışanlarımızın ve müşterilerimizin güvenliğini ön planda tuttuğumuzu gösterir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Uluslararası Kabul</h3>
                  <p className="text-gray-600 text-sm">
                    CE belgesi ve diğer uluslararası sertifikalar, küresel standartlara uygunluğumuzu kanıtlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Kalite Standartlarımızla Tanışın
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Sertifikalı hizmetlerimiz hakkında daha fazla bilgi almak veya proje teklifi için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/teklif-hesapla"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
            >
              Teklif Alın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
