import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, CheckCircle, Shield } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getCertificates() {
  return await prisma.certificate.findMany({
    where: { isPublished: true },
    take: 4,
    orderBy: { order: "asc" },
  })
}

export async function CertificatesSection() {
  const certificates = await getCertificates()

  if (certificates.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-secondary text-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Kalite Belgelerimiz</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Uluslararası Standartlara Uygun Hizmet
            </h2>
            <p className="text-white/70 mb-6">
              ISO sertifikaları ve kalite belgelerimiz ile güvenilir ve profesyonel hizmet sunuyoruz.
            </p>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/sertifikalar" className="gap-2">
                Tüm Sertifikalar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right Side - Certificates Grid */}
          <div className="grid grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 text-sm">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-xs text-white/60">{cert.issuer}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Points */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/80">ISO 9001 Sertifikalı</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/80">ISO 14001 Çevre</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/80">ISO 45001 İSG</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/80">CE Belgeli Malzeme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
