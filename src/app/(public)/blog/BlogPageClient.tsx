"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Eye, Clock, Search, BookOpen, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogCategory {
  id: string
  slug: string
  name: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  status: string
  featured: boolean
  publishedAt: Date | null
  createdAt: Date
  viewCount: number
  category: {
    id: string
    slug: string
    name: string
  } | null
  createdBy: {
    name: string
  }
}

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: BlogCategory[]
}

// Estimated reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.category && post.category.name.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    // Category filter
    if (selectedCategory !== "all" && post.category?.slug !== selectedCategory) {
      return false
    }

    return true
  })

  // Separate featured post
  const featuredPost = filteredPosts.find(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured || p.id !== featuredPost?.id)

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Yazı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-muted/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.slug
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredPosts.length}</span> yazı bulundu
          </p>
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="text-sm text-primary hover:underline"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && !searchQuery && selectedCategory === "all" && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 lg:h-96 overflow-hidden">
              {featuredPost.coverImage ? (
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/50 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-secondary lg:block hidden" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Öne Çıkan
                </span>
                {featuredPost.category && (
                  <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                    {featuredPost.category.name}
                  </span>
                )}
              </div>

              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-white/70 text-lg mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-6">
                {featuredPost.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(featuredPost.content)} dk okuma
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {featuredPost.createdBy.name}
                </div>
                {featuredPost.viewCount > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {featuredPost.viewCount} görüntülenme
                  </div>
                )}
              </div>

              <Button className="self-start bg-white text-secondary hover:bg-white/90 group-hover:translate-x-1 transition-transform">
                Yazıyı Oku
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Link>
      )}

      {/* Blog Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Yazı bulunamadı</h3>
          <p className="text-muted-foreground">
            Farklı bir arama terimi veya kategori deneyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 flex flex-col"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted to-secondary/10 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-primary/20" />
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      {post.category.name}
                    </span>
                  </div>
                )}

                {/* Reading time badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getReadingTime(post.content)} dk
                  </span>
                </div>

                {/* Featured Badge */}
                {post.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Öne Çıkan
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    )}
                    {post.viewCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.viewCount}
                      </div>
                    )}
                  </div>

                  <span className="text-primary text-sm font-medium group-hover:underline flex items-center gap-1">
                    Oku
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
