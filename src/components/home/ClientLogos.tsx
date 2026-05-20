'use client'

import { CLIENT_LOGOS } from "@/lib/constants"
import { LogoCarousel } from "@/components/ui/logo-carousel"

export function ClientLogos() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Referanslarımız
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
        <div className="mt-12 text-center">
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
  )
}
