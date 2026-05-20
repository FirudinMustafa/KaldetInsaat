import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CONTACT_INFO } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Ruler,
  Clock,
  Building2,
  Users,
  CheckCircle,
  Phone,
  Mail,
  FileText
} from "lucide-react"

export const dynamic = "force-dynamic"

async function getProject(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
    include: {
      service: {
        select: { title: true, slug: true }
      },
      images: {
        orderBy: { order: "asc" }
      }
    }
  })
}

async function getRelatedProjects(serviceId: string | null, currentSlug: string) {
  if (!serviceId) return []

  return await prisma.project.findMany({
    where: {
      serviceId,
      slug: { not: currentSlug },
      isPublished: true
    },
    take: 3,
    orderBy: { createdAt: "desc" }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: "Proje Bulunamadı | Kaldet Pro",
    }
  }

  return {
    title: `${project.title} | Kaldet Pro`,
    description: project.metaDescription || project.metaDescription,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(project.serviceId, slug)

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/projeler" className="hover:text-white">Projeler</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {project.service && (
                  <Link href={`/hizmetler/${project.service.slug}`} className="text-amber-400 text-sm font-medium hover:underline">
                    {project.service.title}
                  </Link>
                )}
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  project.status === "COMPLETED"
                    ? "bg-green-500/90 text-white"
                    : project.status === "IN_PROGRESS"
                    ? "bg-blue-500/90 text-white"
                    : "bg-amber-500/90 text-white"
                }`}>
                  {project.status === "COMPLETED" ? "Tamamlandı" :
                   project.status === "IN_PROGRESS" ? "Devam Ediyor" :
                   project.status === "PLANNING" ? "Planlama" : project.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
              <p className="text-white/80 text-lg max-w-2xl">
                {project.location} {project.area && `- ${project.area.toLocaleString('tr-TR')} m²`}
              </p>
            </div>

            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-shrink-0" asChild>
              <Link href="/projeler">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tüm Projeler
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cover Image */}
              <div className="relative h-80 md:h-96 bg-gray-200 rounded-2xl overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-slate-900/40 flex items-center justify-center">
                    <Building2 className="w-24 h-24 text-white/30" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {project.area && (
                    <span className="bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                      {project.area.toLocaleString('tr-TR')} m²
                    </span>
                  )}
                  {project.endDate && (
                    <span className="bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                      {new Date(project.endDate).getFullYear()}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Proje Görselleri</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div key={image.id} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={image.url}
                          alt={image.alt || `${project.title} - Görsel ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Proje Detayları</h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Benzer Projeler</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedProjects.map((related) => (
                      <Link
                        key={related.id}
                        href={`/projeler/${related.slug}`}
                        className="group p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors"
                      >
                        <h3 className="font-medium text-gray-900 group-hover:text-amber-600 mb-1">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-500">{related.location}</p>
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
              {/* Project Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Proje Bilgileri</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Konum</div>
                      <div className="font-medium text-gray-900">{project.location}</div>
                    </div>
                  </div>

                  {project.area && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Ruler className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Alan</div>
                        <div className="font-medium text-gray-900">{project.area.toLocaleString('tr-TR')} m²</div>
                      </div>
                    </div>
                  )}

                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Süre</div>
                        <div className="font-medium text-gray-900">{project.duration} gün</div>
                      </div>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Tamamlanma</div>
                        <div className="font-medium text-gray-900">
                          {new Date(project.endDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.client && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Müşteri</div>
                        <div className="font-medium text-gray-900">{project.client}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4">
                  Benzer Bir Proje mi Planlıyorsunuz?
                </h3>
                <p className="text-white/70 mb-6">
                  Projeniz için ücretsiz keşif ve fiyat teklifi alın.
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

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Daha Fazla Proje Keşfedin
            </h2>
            <p className="text-gray-600 mb-8">
              Tüm tamamlanmış ve devam eden projelerimizi inceleyin
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600" asChild>
              <Link href="/projeler">
                Tüm Projeleri Görüntüle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
