import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, PaintBucket, Layers, Wrench, Zap, Hammer, Sparkles, Construction } from "lucide-react"
import { prisma } from "@/lib/prisma"

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

async function getServices() {
  return await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    take: 6,
  })
}

export async function ServicesOverview() {
  const services = await getServices()
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Endüstriyel zemin ve tesis projeleriniz için kapsamlı çözümler sunuyoruz
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Hizmetler yakında eklenecek.</p>
            </div>
          ) : (
            services.map((service, index) => {
              const Icon = iconMap[service.icon || 'Building2'] || Building2
              return (
                <Link
                  key={service.slug}
                  href={`/hizmetler/${service.slug}`}
                  className="group bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.shortDescription || service.description?.replace(/<[^>]*>/g, '').slice(0, 100) || ''}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-primary">
                    <span>Detaylı Bilgi</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/hizmetler" className="gap-2">
              Tüm Hizmetleri Görüntüle
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
