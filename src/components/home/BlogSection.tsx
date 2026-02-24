import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, BookOpen, Clock, TrendingUp } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: {
        select: { name: true, slug: true },
      },
      createdBy: {
        select: { name: true },
      },
    },
    take: 4,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  })
}

// Estimated reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function BlogSection() {
  const posts = await getBlogPosts()

  if (posts.length === 0) {
    return null
  }

  const [featuredPost, ...otherPosts] = posts

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Blog & Haberler</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sektörden Son{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                Gelişmeler
              </span>
            </h2>
          </div>
          <Button variant="outline" size="lg" className="self-start md:self-auto" asChild>
            <Link href="/blog" className="gap-2">
              Tüm Yazılar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Blog Grid - Featured + Others */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post - Large */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-72 lg:h-80 overflow-hidden">
                {featuredPost.coverImage ? (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-primary/20" />
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {featuredPost.featured && (
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      Öne Çıkan
                    </span>
                  )}
                  {featuredPost.category && (
                    <span className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
                      {featuredPost.category.name}
                    </span>
                  )}
                </div>

                {/* Content on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    {featuredPost.publishedAt && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {getReadingTime(featuredPost.content)} dk okuma
                    </div>
                    {featuredPost.createdBy && (
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featuredPost.createdBy.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Posts - Stacked */}
          <div className="flex flex-col gap-4">
            {otherPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-5 bg-card rounded-2xl border border-border p-4 hover:border-primary/30 hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-28 md:w-40 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="160px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-2 left-2 bg-primary/90 text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                      {post.category.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 hidden md:block">
                    {post.excerpt}
                  </p>
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
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {getReadingTime(post.content)} dk
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
