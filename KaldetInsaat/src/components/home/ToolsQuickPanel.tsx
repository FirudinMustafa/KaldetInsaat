'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, PaintBucket, Calculator, FileText } from "lucide-react"

const tools = [
  {
    name: 'Beton Hacmi Hesabı',
    description: 'En, boy, kalınlık girerek m³ hesaplayın',
    output: 'm³ hacim + PDF',
    href: '/araclar/beton-hacmi',
    icon: Box,
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Epoksi Kaplama Hesabı',
    description: 'Alan ve kat sayısına göre sarfiyat hesabı',
    output: 'kg sarfiyat + PDF',
    href: '/araclar/epoksi-kaplama',
    icon: PaintBucket,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Donatı Ağırlık Hesabı',
    description: 'Çap, boy, adet ile demir ağırlığı hesaplama',
    output: 'kg ağırlık + PDF',
    href: '/araclar/donati-agirlik',
    icon: Calculator,
    color: 'from-violet-500 to-purple-500',
  },
]

export function ToolsQuickPanel() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hesaplama Araçları
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projeniz için gereken malzeme miktarını hızlıca hesaplayın,{' '}
            <strong className="text-foreground">PDF rapor</strong> alın.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tool.description}
                </p>

                {/* Output Badge */}
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Çıktı:</span>
                  <span className="font-medium text-foreground">{tool.output}</span>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Disclaimer + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="text-amber-500">⚠️</span>
            Sonuçlar tahminidir ve fiyat içermez. Kesin fiyat teklif aşamasında belirlenir.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/araclar" className="gap-2">
              Tüm Araçlar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
