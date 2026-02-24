'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  ChevronDown,
  Calculator,
  Building2,
  Layers,
  Wrench,
  Phone,
  MessageCircle,
  ArrowRight,
  FileText,
  HelpCircle,
  Box,
  PaintBucket,
  Hammer,
  Zap,
} from 'lucide-react'

// Navigation data
const services = [
  { name: 'Endüstriyel Zemin Betonu', href: '/hizmetler/endustriyel-zemin-betonu', icon: Building2 },
  { name: 'Baskı Beton Uygulamaları', href: '/hizmetler/baski-beton-uygulamalari', icon: Layers },
  { name: 'Epoksi Zemin Kaplama', href: '/hizmetler/epoksi-zemin-kaplama', icon: PaintBucket },
  { name: 'Çelik Konstrüksiyon', href: '/hizmetler/celik-konstruksiyon', icon: Building2 },
  { name: 'Bakım, Onarım ve Tadilat', href: '/hizmetler/endustri-tesis-bakim-onarim', icon: Wrench },
  { name: 'Altyapı Uygulamaları', href: '/hizmetler/altyapi-uygulamalari', icon: Hammer },
  { name: 'Endüstriyel Tesisat', href: '/hizmetler/endustriyel-tesisat-uygulamalari', icon: Zap },
]

const tools = [
  {
    name: 'Beton Hacmi Hesabı',
    description: 'm³ hesaplayın, PDF rapor alın',
    href: '/araclar/beton-hacmi',
    icon: Box,
  },
  {
    name: 'Epoksi Kaplama Hesabı',
    description: 'Sarfiyat ve malzeme hesabı',
    href: '/araclar/epoksi-kaplama',
    icon: PaintBucket,
  },
  {
    name: 'Donatı Ağırlık Hesabı',
    description: 'Demir ağırlığı hesaplayın',
    href: '/araclar/donati-agirlik',
    icon: Calculator,
  },
]

const infoCenter = [
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Bilgi Merkezi', href: '/bilgi-merkezi', icon: FileText },
  { name: 'Sık Sorulan Sorular', href: '/sss', icon: HelpCircle },
]


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-border'
          : 'bg-white border-b border-border'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo/kaldet-logo.png"
              alt="KalDet İnşaat Logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Araçlar - Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive('/araclar')
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <Calculator className="w-4 h-4" />
                Araçlar
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'tools' && "rotate-180"
                )} />
              </button>

              {/* Mega Menu */}
              <div
                className={cn(
                  "absolute top-full left-0 pt-2 transition-all duration-200",
                  activeDropdown === 'tools'
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="bg-white rounded-xl shadow-soft-lg border border-border p-6 w-[480px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Hesaplama Araçları</h3>
                    <Link
                      href="/araclar"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Tümünü Gör <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {tool.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Sonuçlar tahminidir ve fiyat içermez. Kesin fiyat teklif aşamasında belirlenir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hizmetler Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive('/hizmetler')
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                )}
              >
                Hizmetler
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'services' && "rotate-180"
                )} />
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 pt-2 transition-all duration-200",
                  activeDropdown === 'services'
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="bg-white rounded-xl shadow-soft-lg border border-border p-4 w-64">
                  <div className="space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <service.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          {service.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-border">
                    <Link
                      href="/hizmetler"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:underline"
                    >
                      Tüm Hizmetler <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeler */}
            <Link
              href="/projeler"
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                isActive('/projeler')
                  ? "text-primary"
                  : "text-foreground hover:text-primary hover:bg-muted"
              )}
            >
              Projeler
            </Link>

            {/* Bilgi Merkezi Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('info')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive('/bilgi-merkezi') || isActive('/blog') || isActive('/sss')
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                )}
              >
                Bilgi Merkezi
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'info' && "rotate-180"
                )} />
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 pt-2 transition-all duration-200",
                  activeDropdown === 'info'
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="bg-white rounded-xl shadow-soft-lg border border-border p-4 w-48">
                  {infoCenter.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hakkımızda */}
            <Link
              href="/hakkimizda"
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                isActive('/hakkimizda')
                  ? "text-primary"
                  : "text-foreground hover:text-primary hover:bg-muted"
              )}
            >
              Hakkımızda
            </Link>

            {/* İletişim */}
            <Link
              href="/iletisim"
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                isActive('/iletisim')
                  ? "text-primary"
                  : "text-foreground hover:text-primary hover:bg-muted"
              )}
            >
              İletişim
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/araclar" className="gap-2">
                <Calculator className="w-4 h-4" />
                Hesapla
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/iletisim" className="gap-2">
                <Phone className="w-4 h-4" />
                Teklif Al
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-[calc(100vh-80px)]" : "max-h-0"
          )}
        >
          <div className="py-4 space-y-2 bg-white border-t border-border">
            {/* Araçlar */}
            <div className="px-4">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                className="flex items-center justify-between w-full py-3 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  Araçlar
                </span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'tools' && "rotate-180"
                )} />
              </button>
              {activeDropdown === 'tools' && (
                <div className="pl-6 space-y-2 pb-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block py-2 text-muted-foreground hover:text-primary"
                    >
                      {tool.name}
                    </Link>
                  ))}
                  <Link href="/araclar" className="block py-2 text-primary font-medium">
                    Tüm Araçlar →
                  </Link>
                </div>
              )}
            </div>

            {/* Hizmetler */}
            <div className="px-4">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="flex items-center justify-between w-full py-3 font-medium"
              >
                Hizmetler
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'services' && "rotate-180"
                )} />
              </button>
              {activeDropdown === 'services' && (
                <div className="pl-6 space-y-2 pb-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-2 text-muted-foreground hover:text-primary"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <Link href="/hizmetler" className="block py-2 text-primary font-medium">
                    Tüm Hizmetler →
                  </Link>
                </div>
              )}
            </div>

            {/* Projeler */}
            <Link href="/projeler" className="block px-4 py-3 font-medium hover:text-primary">
              Projeler
            </Link>

            {/* Bilgi Merkezi */}
            <div className="px-4">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'info' ? null : 'info')}
                className="flex items-center justify-between w-full py-3 font-medium"
              >
                Bilgi Merkezi
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  activeDropdown === 'info' && "rotate-180"
                )} />
              </button>
              {activeDropdown === 'info' && (
                <div className="pl-6 space-y-2 pb-2">
                  {infoCenter.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-muted-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hakkımızda */}
            <Link href="/hakkimizda" className="block px-4 py-3 font-medium hover:text-primary">
              Hakkımızda
            </Link>

            {/* İletişim */}
            <Link href="/iletisim" className="block px-4 py-3 font-medium hover:text-primary">
              İletişim
            </Link>

            {/* CTA Buttons */}
            <div className="px-4 pt-4 space-y-3 border-t border-border">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/araclar" className="gap-2">
                  <Calculator className="w-4 h-4" />
                  Hesapla
                </Link>
              </Button>
              <Button variant="default" className="w-full" asChild>
                <Link href="/iletisim" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Teklif Al
                </Link>
              </Button>
              <a
                href="https://wa.me/902626422058"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp ile Yazın
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
