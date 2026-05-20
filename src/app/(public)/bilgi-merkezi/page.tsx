'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  Tag
} from "lucide-react"

// Blog categories
const categories = [
  { id: 'tumu', label: 'Tümü' },
  { id: 'beton', label: 'Beton' },
  { id: 'epoksi', label: 'Epoksi' },
  { id: 'bakim', label: 'Bakım' },
  { id: 'teknik', label: 'Teknik Bilgi' }
]

// Blog posts data
const blogPosts = [
  {
    slug: 'endustriyel-zemin-betonu-nedir',
    title: 'Endüstriyel Zemin Betonu Nedir? Avantajları ve Uygulama Alanları',
    excerpt: 'Endüstriyel zemin betonu, yüksek dayanım ve aşınma direnci gerektiren alanlarda kullanılan özel beton türüdür. Bu yazıda detaylarını inceliyoruz.',
    category: 'beton',
    categoryLabel: 'Beton',
    date: '2024-01-15',
    readTime: 8,
    image: '/images/blog/endustriyel-zemin.jpg',
    featured: true
  },
  {
    slug: 'epoksi-kaplama-cesitleri',
    title: 'Epoksi Kaplama Çeşitleri: Hangisi Size Uygun?',
    excerpt: 'Self-leveling, mortar ve quartz epoksi arasındaki farkları, uygulama alanlarını ve seçim kriterlerini bu rehberde bulabilirsiniz.',
    category: 'epoksi',
    categoryLabel: 'Epoksi',
    date: '2024-01-10',
    readTime: 6,
    image: '/images/blog/epoksi-cesitleri.jpg',
    featured: true
  },
  {
    slug: 'beton-zemin-bakim-rehberi',
    title: 'Beton Zemin Bakım Rehberi: Uzun Ömürlü Zeminler İçin İpuçları',
    excerpt: 'Endüstriyel beton zeminlerinizin ömrünü uzatmak için düzenli bakım ve koruma yöntemlerini bu rehberde bulabilirsiniz.',
    category: 'bakim',
    categoryLabel: 'Bakım',
    date: '2024-01-05',
    readTime: 5,
    image: '/images/blog/beton-bakim.jpg',
    featured: false
  },
  {
    slug: 'helikopter-perdah-nedir',
    title: 'Helikopter Perdah Nedir? Uygulama Teknikleri ve Avantajları',
    excerpt: 'Helikopter perdah, beton yüzeylerin düzgün ve dayanıklı hale getirilmesi için kullanılan mekanik bir yöntemdir.',
    category: 'teknik',
    categoryLabel: 'Teknik Bilgi',
    date: '2023-12-28',
    readTime: 7,
    image: '/images/blog/helikopter-perdah.jpg',
    featured: false
  },
  {
    slug: 'epoksi-uygulama-hatalari',
    title: 'Epoksi Uygulamada En Sık Yapılan 5 Hata',
    excerpt: 'Epoksi kaplama uygulamalarında yapılan yaygın hatalar ve bunlardan nasıl kaçınılacağına dair uzman tavsiyeleri.',
    category: 'epoksi',
    categoryLabel: 'Epoksi',
    date: '2023-12-20',
    readTime: 4,
    image: '/images/blog/epoksi-hatalar.jpg',
    featured: false
  },
  {
    slug: 'beton-sinifi-secimi',
    title: 'Doğru Beton Sınıfı Nasıl Seçilir? C25, C30, C35 Karşılaştırması',
    excerpt: 'Projeniz için hangi beton sınıfının uygun olduğunu belirlemenize yardımcı olacak kapsamlı rehber.',
    category: 'beton',
    categoryLabel: 'Beton',
    date: '2023-12-15',
    readTime: 6,
    image: '/images/blog/beton-sinifi.jpg',
    featured: false
  },
  {
    slug: 'zemin-catlagi-onleme',
    title: 'Beton Zeminde Çatlak Oluşumunu Önleme Yöntemleri',
    excerpt: 'Beton zeminlerde çatlak oluşumunun nedenleri ve önleme teknikleri hakkında detaylı bilgi.',
    category: 'teknik',
    categoryLabel: 'Teknik Bilgi',
    date: '2023-12-10',
    readTime: 5,
    image: '/images/blog/catlak-onleme.jpg',
    featured: false
  },
  {
    slug: 'endustriyel-zemin-turleri',
    title: 'Endüstriyel Zemin Türleri: Karşılaştırmalı Rehber',
    excerpt: 'Beton, epoksi, poliüretan ve diğer endüstriyel zemin türlerinin karşılaştırmalı analizi.',
    category: 'teknik',
    categoryLabel: 'Teknik Bilgi',
    date: '2023-12-05',
    readTime: 8,
    image: '/images/blog/zemin-turleri.jpg',
    featured: false
  }
]

export default function BilgiMerkeziPage() {
  const [selectedCategory, setSelectedCategory] = useState('tumu')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'tumu' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured)

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
              <span className="text-white">Bilgi Merkezi</span>
            </nav>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Bilgi Merkezi</h1>
              <p className="text-white/70">Endüstriyel zemin ve inşaat hakkında faydalı içerikler</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Makale ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && searchQuery === '' && selectedCategory === 'tumu' && (
        <section className="section-padding-sm bg-muted/30">
          <div className="container-wide">
            <h2 className="text-lg font-semibold text-foreground mb-6">Öne Çıkan Yazılar</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bilgi-merkezi/${post.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <div className="aspect-[2/1] bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex px-2 py-1 bg-primary rounded text-xs font-medium text-white mb-2">
                        {post.categoryLabel}
                      </span>
                      <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} dk okuma
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter & Posts */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bilgi-merkezi/${post.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <div className="aspect-[16/10] bg-muted relative">
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs font-medium text-white">
                        <Tag className="w-3 h-3" />
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} dk
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">Arama kriterlerinize uygun makale bulunamadı</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('tumu'); }}>
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-wide">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Projeniz İçin Danışmanlık Alın</h3>
              <p className="text-sm text-muted-foreground">
                Uzman ekibimiz projeleriniz için en uygun çözümü sunmak için hazır
              </p>
            </div>
            <Button asChild>
              <Link href="/iletisim">
                Bize Ulaşın
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
