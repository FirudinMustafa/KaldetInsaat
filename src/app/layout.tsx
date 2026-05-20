import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers/Providers"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://kaldetinsaat.com"),
  title: {
    default: "Kaldet İnşaat - Endüstriyel Zemin ve İnşaat Çözümleri",
    template: "%s | Kaldet İnşaat",
  },
  description: "Endüstriyel zemin betonu, baskı beton, epoksi kaplama, çelik konstrüksiyon ve altyapı uygulamalarında 25+ yıllık tecrübeyle profesyonel hizmet. Kocaeli ve çevre illerde güvenilir çözümler.",
  keywords: [
    "endüstriyel zemin betonu",
    "baskı beton",
    "epoksi zemin kaplama",
    "çelik konstrüksiyon",
    "altyapı uygulamaları",
    "zemin betonu",
    "endüstriyel zemin",
    "Kocaeli inşaat",
    "fabrika zemin",
    "depo zemin",
  ],
  authors: [{ name: "Kaldet İnşaat" }],
  creator: "Kaldet İnşaat",
  publisher: "Kaldet İnşaat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Kaldet İnşaat",
    title: "Kaldet İnşaat - Endüstriyel Zemin ve İnşaat Çözümleri",
    description: "Endüstriyel zemin betonu, baskı beton, epoksi kaplama, çelik konstrüksiyon ve altyapı uygulamalarında 25+ yıllık tecrübeyle profesyonel hizmet.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaldet İnşaat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaldet İnşaat - Endüstriyel Zemin ve İnşaat Çözümleri",
    description: "Endüstriyel zemin betonu, baskı beton, epoksi kaplama, çelik konstrüksiyon ve altyapı uygulamalarında profesyonel hizmet.",
    images: ["/images/og-image.jpg"],
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_TRACKING_ID || ""} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
