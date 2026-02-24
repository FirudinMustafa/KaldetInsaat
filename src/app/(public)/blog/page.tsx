import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { BlogPageClient } from "./BlogPageClient"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Blog | Kaldet İnşaat",
  description: "İnşaat, teknoloji ve sektörel gelişmeler hakkında yazılar",
}

async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
      createdBy: {
        select: { name: true },
      },
    },
    orderBy: [
      { featured: "desc" },
      { publishedAt: "desc" },
    ],
  })
  // Ensure content is included for reading time calculation
  return posts.map(post => ({
    ...post,
    content: post.content || '',
  }))
}

async function getBlogCategories() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { order: "asc" },
  })
  return categories
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()])

  return (
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <nav className="flex items-center gap-2 text-sm text-white/60">
                <Link href="/" className="hover:text-white">Ana Sayfa</Link>
                <span>/</span>
                <span className="text-white">Blog</span>
              </nav>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Geri
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Blog</h1>
            <p className="text-xl text-white/70 max-w-2xl">
              İnşaat sektöründeki en son gelişmeler, ipuçları ve projelerimiz hakkında bilgiler
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-4 py-12">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz yayınlanmış blog yazısı bulunmamaktadır.</p>
              <p className="text-gray-400 text-sm mt-2">
                Blog yazıları eklemek için: <code className="bg-gray-100 px-2 py-1 rounded">npm run seed:blog</code>
              </p>
            </div>
          ) : (
            <BlogPageClient posts={posts} categories={categories} />
          )}
        </div>
      </div>
  )
}
