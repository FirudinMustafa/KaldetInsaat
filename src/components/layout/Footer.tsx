import Link from "next/link"
import Image from "next/image"
import {
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Calculator,
  MessageCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT_INFO } from "@/lib/constants"

const services = [
  { name: "Endüstriyel Zemin Betonu", href: "/hizmetler/endustriyel-zemin-betonu" },
  { name: "Epoksi Zemin Kaplama", href: "/hizmetler/epoksi-zemin-kaplama" },
  { name: "Baskı Beton", href: "/hizmetler/baski-beton-uygulamalari" },
  { name: "Bakım Onarım & Tadilat", href: "/hizmetler/endustri-tesis-bakim-onarim" },
  { name: "Endüstriyel Tesisat", href: "/hizmetler/endustriyel-tesisat-uygulamalari" },
  { name: "Altyapı Hizmetleri", href: "/hizmetler/altyapi-uygulamalari" },
]

const tools = [
  { name: "Beton Hacmi Hesabı", href: "/araclar/beton-hacmi" },
  { name: "Epoksi Kaplama Hesabı", href: "/araclar/epoksi-kaplama" },
  { name: "Donatı Ağırlık Hesabı", href: "/araclar/donati-agirlik" },
]

const corporate = [
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Projeler", href: "/projeler" },
  { name: "Blog", href: "/blog" },
  { name: "SSS", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
]

const legal = [
  { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
]

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/kaldet-m%C3%BChendislik-ve-in%C5%9Faat-tic.-ltd.-%C5%9Fti./", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com/kaldetinsaat", icon: Instagram },
]

// Contact info from constants
const contactInfo = {
  phone: CONTACT_INFO.PHONE,
  phoneDisplay: CONTACT_INFO.PHONE_DISPLAY,
  email: CONTACT_INFO.EMAIL,
  address: CONTACT_INFO.ADDRESS,
  whatsapp: "902626422058"
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="container-wide py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Projeniz için teklif alın
              </h3>
              <p className="text-white/70">
                Ücretsiz keşif ve detaylı fiyat teklifi için hemen iletişime geçin.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="white" size="lg" asChild>
                <Link href="/iletisim" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Teklif Al
                </Link>
              </Button>
              <Button variant="white-outline" size="lg" asChild>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <Image
                src="/images/logo/kaldet-logo.png"
                alt="KalDet İnşaat Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Endüstriyel zemin ve tesis çözümlerinde 25+ yıllık tecrübe.
              Kaliteli malzeme, uzman ekip ve zamanında teslim garantisi.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm leading-relaxed">{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Araçlar */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />
              Araçlar
            </h4>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                  >
                    {tool.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/araclar"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Tüm Araçlar
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hizmetler"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Tüm Hizmetler
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-3">
              {corporate.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} KalDet İnşaat. Tüm hakları saklıdır.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/50 hover:text-white/70 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
