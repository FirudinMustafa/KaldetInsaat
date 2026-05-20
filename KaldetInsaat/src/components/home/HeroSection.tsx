'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Calculator, CheckCircle, Factory, Layers, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/projects/fabrika-zemin.jpg"
          alt="Endüstriyel zemin betonu uygulaması"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
      </div>

      {/* Accent Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* What We Do - Clear Statement */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Factory className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">Fabrika & Depo Zemin Uygulayıcısı</span>
            </div>

            {/* Heading - Clear and Simple */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              <span className="text-white">Fabrikanızın Zemini</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Bizim İşimiz</span>
            </h1>

            {/* Description - Simple for non-experts */}
            <p className="text-xl text-white/80 mb-6 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Endüstriyel tesis, fabrika, depo ve üretim alanları için{' '}
              <strong className="text-white">dayanıklı zemin betonu</strong>,{' '}
              <strong className="text-white">epoksi kaplama</strong> ve{' '}
              <strong className="text-white">baskı beton</strong> uyguluyoruz.
            </p>

            {/* Key Benefits - Quick Understanding */}
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">Forklift Dayanımlı</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">Kimyasal Dayanıklı</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">25+ Yıl Tecrübe</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button size="xl" variant="default" asChild>
                <Link href="/iletisim" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Teklif Al
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="white-outline" asChild>
                <Link href="/araclar" className="gap-2">
                  <Calculator className="w-5 h-5" />
                  Hesapla
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-white/60">Tamamlanan Proje</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500K+</div>
                <div className="text-sm text-white/60">m² Uygulama</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-white/60">Yıl Tecrübe</div>
              </div>
            </div>
          </div>

          {/* Right Content - Tool Preview Card */}
          <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Beton Hacmi Hesabı</h3>
                  <p className="text-white/60 text-sm">Hızlı ve kolay m³ hesaplama</p>
                </div>
              </div>

              {/* Mini Calculator Preview */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <label className="text-xs text-white/50 block mb-1">En (m)</label>
                    <div className="text-white font-semibold">50</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <label className="text-xs text-white/50 block mb-1">Boy (m)</label>
                    <div className="text-white font-semibold">30</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <label className="text-xs text-white/50 block mb-1">Kalınlık (cm)</label>
                    <div className="text-white font-semibold">15</div>
                  </div>
                </div>

                {/* Result Preview */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Hesaplanan Hacim</span>
                    <span className="text-2xl font-bold text-primary">225 m³</span>
                  </div>
                </div>
              </div>

              <Button variant="white" className="w-full" asChild>
                <Link href="/araclar/beton-hacmi">
                  Aracı Kullan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <p className="text-xs text-white/40 text-center mt-4">
                ⚠️ Sonuçlar tahminidir ve fiyat içermez
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30L48 25C96 20 192 10 288 8.3C384 6.7 480 13.3 576 18.3C672 23.3 768 26.7 864 25C960 23.3 1056 16.7 1152 15C1248 13.3 1344 16.7 1392 18.3L1440 20V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V30Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  )
}
