export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/home/HeroSection"
import { ToolsQuickPanel } from "@/components/home/ToolsQuickPanel"
import { ServicesOverview } from "@/components/home/ServicesOverview"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CertificatesSection } from "@/components/home/CertificatesSection"
import { BlogSection } from "@/components/home/BlogSection"
import { ClientLogos } from "@/components/home/ClientLogos"
import { CTASection } from "@/components/home/CTASection"
import { TrustBadges } from "@/components/home/TrustBadges"

export const metadata = {
  title: "KalDet İnşaat | Endüstriyel Zemin & Tesis Çözümleri + Hesaplama Araçları",
  description: "Endüstriyel zemin betonu, epoksi kaplama, baskı beton uygulamalarında 25+ yıl tecrübe. Ücretsiz hesaplama araçları ile projenizi planlayın, PDF rapor alın.",
  keywords: "endüstriyel zemin, epoksi zemin kaplama, beton hacmi hesaplama, endüstriyel tesis, zemin betonu, Kocaeli inşaat, Gebze inşaat",
  authors: [{ name: "KalDet İnşaat" }],
  creator: "KalDet İnşaat",
  publisher: "KalDet İnşaat",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "KalDet İnşaat | Endüstriyel Zemin & Tesis Çözümleri",
    description: "Hesaplama araçlarıyla projenizi planlayın, PDF rapor alın. 25+ yıllık tecrübe.",
    type: "website",
    locale: "tr_TR",
    siteName: "KalDet İnşaat",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KalDet İnşaat - Endüstriyel Zemin Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KalDet İnşaat | Endüstriyel Zemin & Tesis Çözümleri",
    description: "Hesaplama araçlarıyla projenizi planlayın, PDF rapor alın.",
  },
  alternates: {
    canonical: "https://kaldetinsaat.com",
  },
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Tools Quick Panel */}
        <ToolsQuickPanel />

        {/* Services Overview */}
        <ServicesOverview />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Trust Badges & Stats */}
        <TrustBadges />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Client Logos */}
        <ClientLogos />

        {/* Certificates */}
        <CertificatesSection />

        {/* Blog Section */}
        <BlogSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
