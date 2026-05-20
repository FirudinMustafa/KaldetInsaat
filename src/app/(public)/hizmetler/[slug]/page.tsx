import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CONTACT_INFO } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  PaintBucket,
  Layers,
  Wrench,
  Zap,
  Hammer,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Award,
  Shield,
  FileText,
  Construction
} from "lucide-react"

export const dynamic = "force-dynamic"

// Icon mapping
const iconMap: Record<string, any> = {
  Building2,
  PaintBucket,
  Layers,
  Wrench,
  Zap,
  Hammer,
  Construction,
  Sparkles: Layers,
}

// Fallback colors for services
const colorMap: Record<string, string> = {
  "endustriyel-zemin-betonu": "from-orange-500 to-amber-500",
  "baski-beton-uygulamalari": "from-violet-500 to-purple-500",
  "epoksi-zemin-kaplama": "from-teal-500 to-cyan-500",
  "celik-konstruksiyon": "from-blue-500 to-indigo-500",
  "endustri-tesis-bakim-onarim": "from-rose-500 to-pink-500",
  "altyapi-uygulamalari": "from-emerald-500 to-green-500",
  "endustriyel-tesisat-uygulamalari": "from-yellow-500 to-amber-500",
}

async function getService(slug: string) {
  return await prisma.service.findUnique({
    where: { slug },
    include: {
      process: { orderBy: { order: "asc" } },
      materials: { orderBy: { order: "asc" } },
      projects: {
        where: { isPublished: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      },
    },
  })
}

async function getOtherServices(currentSlug: string) {
  return await prisma.service.findMany({
    where: {
      isPublished: true,
      slug: { not: currentSlug },
    },
    select: { slug: true, title: true, shortDescription: true, icon: true },
    take: 3,
    orderBy: { order: "asc" },
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: "Hizmet Bulunamadı | Kaldet Pro",
    }
  }

  return {
    title: `${service.title} | Kaldet Pro`,
    description: service.shortDescription || service.metaDescription,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const otherServices = await getOtherServices(slug)
  const Icon = iconMap[service.icon || "Building2"] || Building2
  const colorClass = colorMap[slug] || "from-amber-500 to-orange-500"

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/hizmetler" className="hover:text-white">Hizmetler</Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/hizmetler">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">{service.title}</h1>
              <p className="text-white/80 text-lg max-w-2xl">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hizmet Detayları</h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>

              {/* Materials/Features */}
              {service.materials.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Özellikler ve Malzemeler</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.materials.map((material) => (
                      <div key={material.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900">{material.name}</span>
                          {material.description && (
                            <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Steps */}
              {service.process.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Çalışma Sürecimiz</h2>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {index < service.process.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-200 mx-auto mt-2" />
                          )}
                        </div>
                        <div className="pb-8">
                          <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {service.projects.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">İlgili Projeler</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projeler/${project.slug}`}
                        className="group p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors"
                      >
                        <h3 className="font-medium text-gray-900 group-hover:text-amber-600 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500">{project.location}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      href="/projeler"
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm inline-flex items-center gap-1"
                    >
                      Tüm Projeleri Gör
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4">
                  Bu Hizmet İçin Teklif Alın
                </h3>
                <p className="text-white/70 mb-6">
                  {service.title} için ücretsiz keşif ve fiyat teklifi almak ister misiniz?
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" size="lg" asChild>
                    <Link href="/teklif-hesapla">
                      <FileText className="w-4 h-4 mr-2" />
                      Teklif Hesapla
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" size="lg" asChild>
                    <Link href="/iletisim">
                      <Phone className="w-4 h-4 mr-2" />
                      İletişime Geçin
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Neden Kaldet?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-600">25+ Yıl Tecrübe</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-600">150+ Tamamlanan Proje</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Shield className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-600">Garanti Kapsamı</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-600">Zamanında Teslimat</span>
                  </li>
                </ul>
              </div>

              {/* Contact Card */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Sorularınız mı var?</h3>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>{CONTACT_INFO.PHONE_DISPLAY}</span>
                  </a>
                  <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>{CONTACT_INFO.EMAIL}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Diğer Hizmetlerimiz
              </h2>
              <p className="text-gray-600">
                Tüm endüstriyel zemin ve tesis ihtiyaçlarınız için kapsamlı çözümler
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {otherServices.map((svc) => {
                const SvcIcon = iconMap[svc.icon || "Building2"] || Building2
                return (
                  <Link
                    key={svc.slug}
                    href={`/hizmetler/${svc.slug}`}
                    className="group p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors text-center"
                  >
                    <SvcIcon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{svc.shortDescription}</p>
                  </Link>
                )
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600" asChild>
                <Link href="/hizmetler">
                  Tüm Hizmetleri Görüntüle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/hizmetler">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Geri Dön
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
