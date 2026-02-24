import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { CONTACT_INFO } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Tag,
  BookOpen,
  Phone,
  ChevronRight,
  FileText
} from "lucide-react"

export const dynamic = "force-dynamic"

async function getBlogPost(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: {
        select: { name: true, slug: true }
      },
      createdBy: {
        select: { name: true }
      }
    }
  })
}

async function getRelatedPosts(categoryId: string | null, currentSlug: string) {
  if (!categoryId) return []

  return await prisma.blogPost.findMany({
    where: {
      categoryId,
      slug: { not: currentSlug },
      status: "PUBLISHED"
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: {
      title: true,
      slug: true,
      excerpt: true
    }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Yazı Bulunamadı | Kaldet Pro",
    }
  }

  return {
    title: `${post.title} | Kaldet Pro`,
    description: post.excerpt || post.metaDescription,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.categoryId, slug)

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/bilgi-merkezi" className="hover:text-white">Bilgi Merkezi</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <Link
                  href={`/bilgi-merkezi?kategori=${post.category.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 rounded-full text-xs font-medium text-white hover:bg-amber-600 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {post.category.name}
                </Link>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1 text-sm text-white/60">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-white/80 text-lg">{post.excerpt}</p>
            )}

            {post.createdBy && (
              <p className="text-white/60 text-sm mt-4">
                Yazar: {post.createdBy.name}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {post.coverImage && (
                <div className="mb-8 rounded-2xl overflow-hidden relative h-64 md:h-96">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
                <div
                  className="prose prose-lg prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Navigation */}
                <div className="mt-8 pt-8 border-t flex items-center justify-between">
                  <Link
                    href="/bilgi-merkezi"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tüm Yazılar
                  </Link>

                  <Button className="bg-amber-500 hover:bg-amber-600" asChild>
                    <Link href="/iletisim">
                      Danışmanlık Alın
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 sticky top-24">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Projeniz İçin Danışın</h3>
                <p className="text-sm text-white/70 mb-6">
                  Uzman ekibimiz sorularınızı yanıtlamak ve projeniz için en uygun çözümü sunmak için hazır.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" asChild>
                    <Link href="/teklif-hesapla">
                      <FileText className="w-4 h-4 mr-2" />
                      Teklif Hesapla
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" asChild>
                    <Link href="/iletisim">
                      Bize Ulaşın
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    İlgili Yazılar
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/bilgi-merkezi/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        {relatedPost.excerpt && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Card */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Sorularınız mı var?</h3>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>{CONTACT_INFO.PHONE_DISPLAY}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Posts CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Daha Fazla İçerik Keşfedin
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Endüstriyel zemin, beton ve epoksi uygulamaları hakkında daha fazla bilgi edinmek için bilgi merkezimizi ziyaret edin.
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600" asChild>
              <Link href="/bilgi-merkezi">
                Tüm Yazıları Görüntüle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
