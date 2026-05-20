'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Grid3X3,
  List,
  Building2,
  PaintBucket,
  Layers,
  Search,
  Phone
} from "lucide-react"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string | null
  location: string | null
  area: number | null
  duration: string | null
  status: string
  featured: boolean
  publishedAt: string | null
  service?: {
    title: string
    slug: string
  } | null
}

// Service filters
const serviceFilters = [
  { slug: "all", title: "Tümü", icon: Grid3X3 },
  { slug: "endustriyel-zemin-betonu", title: "Zemin Betonu", icon: Building2 },
  { slug: "epoksi-zemin-kaplama", title: "Epoksi Kaplama", icon: PaintBucket },
  { slug: "baski-beton-uygulamalari", title: "Baskı Beton", icon: Layers },
]

export default function ProjelerPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?published=true')
        if (response.ok) {
          const result = await response.json()
          setProjects(result.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const serviceSlug = project.service?.slug || ''
    const matchesFilter = activeFilter === "all" || serviceSlug === activeFilter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Stats
  const totalArea = projects.reduce((sum, p) => sum + (p.area || 0), 0)
  const completedCount = projects.filter(p => p.status === "COMPLETED").length

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Projeler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container-wide">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span>/</span>
              <span className="text-white">Projelerimiz</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Tamamladığımız{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Projeler</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              25+ yıllık tecrübemizle gerçekleştirdiğimiz endüstriyel zemin ve kaplama projelerini inceleyin.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">{projects.length}</div>
                <div className="text-xs text-white/60">Toplam Proje</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">{totalArea > 1000 ? `${(totalArea / 1000).toFixed(0)}K+` : totalArea}</div>
                <div className="text-xs text-white/60">m² Uygulama</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">{completedCount}</div>
                <div className="text-xs text-white/60">Tamamlanan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border sticky top-20 bg-background z-10">
        <div className="container-wide py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Service Filters */}
            <div className="flex flex-wrap gap-2">
              {serviceFilters.map((filter) => {
                const Icon = filter.icon
                return (
                  <button
                    key={filter.slug}
                    onClick={() => setActiveFilter(filter.slug)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter.slug
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.title}
                  </button>
                )
              })}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Proje ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-background shadow" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-background shadow" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Proje bulunamadı</h3>
              <p className="text-muted-foreground">Farklı bir filtre veya arama terimi deneyin.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projeler/${project.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative h-56 bg-muted overflow-hidden">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        Öne Çıkan
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        project.status === "COMPLETED"
                          ? "bg-green-500/90 text-white"
                          : "bg-blue-500/90 text-white"
                      }`}>
                        {project.status === "COMPLETED" ? "Tamamlandı" : "Devam Ediyor"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white/80 text-sm">{project.service?.title || 'Proje'}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {project.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                      )}
                      {project.area && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          {project.area.toLocaleString('tr-TR')} m²
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projeler/${project.slug}`}
                  className="group flex gap-6 bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-lg transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="192px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center">
                        <Building2 className="w-10 h-10 text-white/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs text-primary font-medium">{project.service?.title || 'Proje'}</span>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                        project.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {project.status === "COMPLETED" ? "Tamamlandı" : "Devam Ediyor"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      {project.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                      )}
                      {project.area && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          {project.area.toLocaleString('tr-TR')} m²
                        </div>
                      )}
                      {project.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.publishedAt).getFullYear()}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm bg-secondary text-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Projeniz İçin Teklif Alın
            </h2>
            <p className="text-white/70 mb-8">
              Siz de güvenilir bir iş ortağı arıyorsanız, projeniz için ücretsiz keşif ve teklif alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link href="/araclar">
                  Hesaplama Araçları
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
                <Link href="/iletisim">
                  <Phone className="w-4 h-4 mr-2" />
                  İletişime Geçin
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
