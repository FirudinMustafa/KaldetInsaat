import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    include: {
      category: {
        select: { name: true },
      },
      createdBy: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return posts
}

export default async function AdminBlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 mt-1">Tüm blog yazılarını yönetin</p>
        </div>
        <Link href="/admin/blog/yeni">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Yazıları ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz blog yazısı eklenmemiş</p>
              <Link href="/admin/blog/yeni">
                <Button>İlk Yazıyı Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Başlık</th>
                    <th className="text-left p-4 font-semibold">Kategori</th>
                    <th className="text-left p-4 font-semibold">Durum</th>
                    <th className="text-left p-4 font-semibold">Görüntülenme</th>
                    <th className="text-left p-4 font-semibold">Yazar</th>
                    <th className="text-left p-4 font-semibold">Tarih</th>
                    <th className="text-right p-4 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{post.title}</div>
                          {post.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-1 inline-block">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        {post.category?.name || "-"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            post.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : post.status === "DRAFT"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {post.status === "PUBLISHED"
                            ? "Yayında"
                            : post.status === "DRAFT"
                            ? "Taslak"
                            : "Arşiv"}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{post.viewCount}</td>
                      <td className="p-4 text-sm">{post.createdBy.name}</td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/blog/${post.id}/duzenle`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteButton id={post.id} endpoint="blog" itemName="blog yazısı" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
