import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { SmoothLink } from "@/components/ui/smooth-link"
import { CLIENT_LOGOS } from "@/lib/constants"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Referanslarımız | Kaldet İnşaat",
  description:
    "Kaldet İnşaat müşteri referansları ve görüşleri. Tamamladığımız projeler hakkında müşterilerimizin değerlendirmeleri.",
  keywords: "kaldet inşaat referanslar, müşteri görüşleri, proje değerlendirmeleri",
}

async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: {
      isApproved: true,
    },
    include: {
      project: {
        select: { title: true, slug: true },
      },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })
  return testimonials
}

async function getClients() {
  // Get unique companies from approved testimonials
  const testimonials = await prisma.testimonial.findMany({
    where: {
      isApproved: true,
      companyName: { not: null },
    },
    select: {
      companyName: true,
      image: true,
    },
    distinct: ["companyName"],
    orderBy: { companyName: "asc" },
  })
  return testimonials
}

export default async function ReferanslarPage() {
  const testimonials = await getTestimonials()
  const clients = await getClients()

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <nav className="flex items-center gap-2 text-sm text-white/60">
                <Link href="/" className="hover:text-white">Ana Sayfa</Link>
                <span>/</span>
                <span className="text-white">Referanslar</span>
              </nav>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Geri
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Müşteri Referanslarımız
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Kaldet İnşaat olarak tamamladığımız projeler hakkında müşterilerimizin değerlendirmeleri
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-amber-600">
                  {testimonials.length}+
                </div>
                <div className="text-gray-600 mt-2">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">
                  {clients.length}+
                </div>
                <div className="text-gray-600 mt-2">Kurumsal Firma</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">
                  {Math.round(
                    testimonials.reduce((sum, t) => sum + t.rating, 0) /
                      testimonials.length || 0
                  )}/5
                </div>
                <div className="text-gray-600 mt-2">Ortalama Puan</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">100%</div>
                <div className="text-gray-600 mt-2">Memnuniyet</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Müşterilerimiz Ne Diyor?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tamamladığımız projeler hakkında müşterilerimizin görüş ve değerlendirmeleri
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Henüz referans eklenmemiş</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className={`group card-hover card-entrance ${
                      testimonial.featured ? "ring-2 ring-amber-500" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      {testimonial.featured && (
                        <div className="mb-4">
                          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">
                            Öne Çıkan Referans
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        {testimonial.image ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-200 hover:ring-amber-400 transform-smooth">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.clientName}
                              width={64}
                              height={64}
                              className="object-cover hover:scale-110 transform-smooth"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0 ring-2 ring-amber-200 hover:ring-amber-400 transform-smooth group-hover:scale-110">
                            <span className="text-2xl text-amber-600 font-bold">
                              {testimonial.clientName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 text-smooth">
                            {testimonial.clientName}
                          </h3>
                          {testimonial.position && (
                            <p className="text-sm text-gray-600">
                              {testimonial.position}
                            </p>
                          )}
                          {testimonial.companyName && (
                            <p className="text-sm font-medium text-amber-600 text-smooth">
                              {testimonial.companyName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 transform-smooth">{renderStars(testimonial.rating)}</div>

                      <p className="text-gray-700 leading-relaxed mb-4 italic text-smooth">
                        &quot;{testimonial.content}&quot;
                      </p>

                      {testimonial.project && (
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600">
                            İlgili Proje:{" "}
                            <SmoothLink
                              href={`/projeler/${testimonial.project.slug}`}
                              className="text-amber-600 hover:underline font-medium text-smooth"
                            >
                              {testimonial.project.title}
                            </SmoothLink>
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Client Logos - Scrolling Carousel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Çalıştığımız Firmalar
              </h2>
              <p className="text-lg text-gray-600">
                Türkiye&apos;nin önde gelen firmalarının güvendiği çözüm ortağı
              </p>
            </div>

            {/* Scrolling Logo Carousel */}
            <LogoCarousel
              logos={CLIENT_LOGOS}
              speed={30}
              pauseOnHover={true}
            />

            {/* Trust Badge */}
            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-full border border-orange-200">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  <span className="text-orange-600">150+</span> Başarılı Proje ile Güvenilir Çözüm Ortağı
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Siz de Referanslarımıza Katılın
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Projeniz için ücretsiz fiyat teklifi almak ve detaylı bilgi edinmek için bizimle iletişime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SmoothLink
                href="/teklif-hesapla"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Teklif Alın
              </SmoothLink>
              <SmoothLink
                href="/iletisim"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10"
              >
                İletişime Geçin
              </SmoothLink>
            </div>
          </div>
        </section>
      </main>
  )
}
