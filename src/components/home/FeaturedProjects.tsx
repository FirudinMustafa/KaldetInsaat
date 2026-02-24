import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Building2, Ruler } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getFeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
      featured: true,
    },
    include: {
      service: {
        select: { title: true },
      },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  })
  return projects
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Öne Çıkan Projeler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Başarıyla tamamladığımız ve gurur duyduğumuz projelerimizden bazıları
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projeler/${project.slug}`}
              className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Project Image */}
              <div className="relative h-56 bg-muted overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white/30" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "COMPLETED"
                      ? "bg-green-500 text-white"
                      : project.status === "IN_PROGRESS"
                      ? "bg-amber-500 text-white"
                      : "bg-slate-500 text-white"
                  }`}>
                    {project.status === "COMPLETED" ? "Tamamlandı" : project.status === "IN_PROGRESS" ? "Devam Ediyor" : "Planlama"}
                  </span>
                </div>

                {/* Service Tag */}
                {project.service && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white/90 text-sm">{project.service.title}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {project.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                  )}
                  {project.area && (
                    <div className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      {project.area.toLocaleString('tr-TR')} m²
                    </div>
                  )}
                </div>

                <div className="text-primary font-medium flex items-center text-sm">
                  Detayları İncele
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projeler" className="gap-2">
              Tüm Projeleri Görüntüle
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
