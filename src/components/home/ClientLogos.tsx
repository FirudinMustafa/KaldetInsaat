'use client'

import { CLIENT_LOGOS } from "@/lib/constants"
import { LogoCarousel } from "@/components/ui/logo-carousel"

export function ClientLogos() {
  return (
    <section className="py-16 bg-muted/20 border-y border-border">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <span className="w-8 h-px bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider">Çözüm Ortaklarımız</span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Güvenilen Marka
          </h2>
          <p className="text-lg text-muted-foreground">
            Türkiye&apos;nin önde gelen sanayi ve lojistik firmalarının tercih ettiği çözüm ortağı
          </p>
        </div>

        {/* Scrolling Logo Carousel */}
        <LogoCarousel
          logos={CLIENT_LOGOS}
          speed={30}
          pauseOnHover={true}
        />

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              <span className="text-primary">200+</span> Başarılı Proje ile Güvenilir Çözüm Ortağı
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
