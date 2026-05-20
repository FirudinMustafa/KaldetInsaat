import { prisma } from "@/lib/prisma"
import { ServiceComparison } from "@/components/services/ServiceComparison"

export const metadata = {
  title: "Hizmet Karşılaştırma | Kaldet İnşaat",
  description: "Hizmetlerimizi karşılaştırın ve projeniz için en uygun çözümü bulun",
}

async function getServices() {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    include: {
      process: {
        orderBy: { order: "asc" },
      },
      materials: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  })
  return services
}

export default async function ServiceComparisonPage() {
  const services = await getServices()

  return (
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Hizmet Karşılaştırma
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              Hizmetlerimizi karşılaştırarak projeniz için en uygun çözümü bulun
            </p>
          </div>
        </div>

        {/* Comparison Tool */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <ServiceComparison services={services} />
          </div>
        </section>
      </main>
  )
}

