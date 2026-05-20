import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

export const metadata = {
  title: "Sayfa Bulunamadı - 404 | Kaldet İnşaat",
  description: "Aradığınız sayfa bulunamadı",
}

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
              <div className="text-6xl mb-6">🏗️</div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sayfa Bulunamadı
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.
              <br />
              Lütfen ana sayfaya dönün veya menüden istediğiniz sayfayı bulun.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Home className="w-5 h-5" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
              <Link href="/hizmetler">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Search className="w-5 h-5" />
                  Hizmetleri Keşfet
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Popüler Sayfalar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/hakkimizda"
                  className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                    Hakkımızda
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Firmamız ve ekibimiz hakkında bilgi edinin
                  </div>
                </Link>
                <Link
                  href="/hizmetler"
                  className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                    Hizmetlerimiz
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Sunduğumuz endüstriyel inşaat hizmetleri
                  </div>
                </Link>
                <Link
                  href="/projeler"
                  className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                    Projelerimiz
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Tamamladığımız başarılı projeler
                  </div>
                </Link>
                <Link
                  href="/iletisim"
                  className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                    İletişim
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Bizimle iletişime geçin
                  </div>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                Yardıma mı ihtiyacınız var?{" "}
                <a
                  href="/iletisim"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Bize ulaşın
                </a>{" "}
                veya{" "}
                <a
                  href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, "")}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {CONTACT_INFO.PHONE}
                </a>{" "}
                numarasından arayın.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
