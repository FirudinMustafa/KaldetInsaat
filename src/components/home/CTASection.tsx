import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-amber-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projenize Bugün Başlayalım
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Uzman ekibimizle projenizi en kısa sürede ve en yüksek kalitede tamamlayalım
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Quote Calculator Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Teklif Hesapla</h3>
              <p className="text-white/80 mb-6 text-sm">
                Projeniz için anında fiyat tahmini alın
              </p>
              <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/teklif-hesapla">
                  Hesapla
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Contact Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">İletişime Geçin</h3>
              <p className="text-white/80 mb-6 text-sm">
                Detaylı bilgi için bizimle iletişime geçin
              </p>
              <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/iletisim">
                  İletişim
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
