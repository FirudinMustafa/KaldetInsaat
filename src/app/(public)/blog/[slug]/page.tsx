import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  User,
  Eye,
  ArrowLeft,
  Tag,
  Clock,
  Share2,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Sparkles
} from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      metaTitle: true,
      metaDescription: true,
      keywords: true,
    },
  })

  if (!post) {
    return {
      title: "Yazı Bulunamadı | Kaldet İnşaat Blog",
    }
  }

  return {
    title: post.metaTitle || `${post.title} | Kaldet İnşaat Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      createdBy: {
        select: { name: true, email: true },
      },
    },
  })

  if (!post || post.status !== "PUBLISHED") {
    return null
  }

  // Increment view count
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  return post
}

async function getRelatedPosts(categoryId: string | null, currentPostId: string) {
  if (!categoryId) return []

  return await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categoryId,
      id: { not: currentPostId },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: {
      category: {
        select: { name: true },
      },
    },
  })
}

async function getRecentPosts(currentPostId: string) {
  return await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: currentPostId },
    },
    take: 5,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      content: true,
    },
  })
}

// Reading time calculator
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.categoryId, post.id)
  const recentPosts = await getRecentPosts(post.id)
  const readingTime = getReadingTime(post.content)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative">
        {/* Cover Image Background */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {post.coverImage ? (
            <>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <BookOpen className="w-48 h-48 text-white" />
              </div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white/80 truncate max-w-[200px]">{post.title}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.featured && (
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Öne Çıkan
                  </span>
                )}
                {post.category && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    {post.category.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-white">{post.createdBy.name}</span>
                </div>
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {readingTime} dk okuma
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {post.viewCount} görüntülenme
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2">
              {/* Excerpt */}
              {post.excerpt && (
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary p-6 rounded-r-2xl mb-10">
                  <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Article Body */}
              <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-foreground/80 prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-ul:text-foreground/80 prose-ol:text-foreground/80
                    prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.keywords && (
                <div className="mt-8 p-6 bg-muted/50 rounded-2xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    {post.keywords.split(",").map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-background text-foreground/70 px-4 py-2 rounded-full text-sm font-medium border border-border hover:border-primary/50 transition-colors cursor-default"
                      >
                        #{keyword.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-8 p-6 bg-card rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground font-medium">Bu yazıyı paylaşın</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                    İlgili Yazılar
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
                      >
                        <div className="relative h-36 overflow-hidden">
                          {related.coverImage ? (
                            <Image
                              src={related.coverImage}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <BookOpen className="w-10 h-10 text-primary/20" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Back Button */}
              <Link href="/blog">
                <Button variant="outline" className="w-full rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tüm Yazılara Dön
                </Button>
              </Link>

              {/* Recent Posts */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Son Yazılar
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((recent) => (
                    <Link
                      key={recent.id}
                      href={`/blog/${recent.slug}`}
                      className="group flex gap-4"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                        {recent.coverImage ? (
                          <Image
                            src={recent.coverImage}
                            alt={recent.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                            <BookOpen className="w-6 h-6 text-primary/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                          {recent.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          {recent.publishedAt && (
                            <span>{new Date(recent.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
                          )}
                          <span>·</span>
                          <span>{getReadingTime(recent.content)} dk</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-secondary to-secondary/90 text-white rounded-2xl p-8 sticky top-24">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Projeniz için Teklif Alın</h3>
                <p className="text-white/70 mb-6 text-sm">
                  25+ yıllık tecrübemizle projenizi hayata geçirelim.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/teklif-hesapla">
                      Teklif Hesapla
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" asChild>
                    <Link href="/iletisim">
                      İletişime Geçin
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Daha Fazla İçerik Keşfedin
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Sektördeki son gelişmeleri, ipuçlarını ve projelerimizi takip edin.
          </p>
          <Button size="lg" asChild>
            <Link href="/blog">
              Tüm Blog Yazıları
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
