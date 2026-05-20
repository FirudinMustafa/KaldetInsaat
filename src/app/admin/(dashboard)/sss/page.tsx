import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, FolderOpen } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getFAQs() {
  const faqs = await prisma.fAQQuestion.findMany({
    include: {
      category: {
        select: { name: true },
      },
    },
    orderBy: { order: "asc" },
  })
  return faqs
}

async function getCategories() {
  const categories = await prisma.fAQCategory.findMany({
    include: {
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { order: "asc" },
  })
  return categories
}

export default async function AdminFAQPage() {
  const faqs = await getFAQs()
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sıkça Sorulan Sorular (SSS)
          </h1>
          <p className="text-gray-500 mt-1">SSS içeriğini yönetin</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/sss/kategoriler">
            <Button variant="outline" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              Kategoriler
            </Button>
          </Link>
          <Link href="/admin/sss/yeni">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Yeni Soru
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{faqs.length}</div>
            <div className="text-sm text-gray-600 mt-1">Toplam Soru</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {faqs.filter((f) => f.isPublished).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Yayında</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {faqs.filter((f) => !f.isPublished).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Taslak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Kategori</div>
          </CardContent>
        </Card>
      </div>

      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kategoriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category._count.questions} soru
                    </span>
                    <Link href="/admin/sss/kategoriler">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Soru Listesi ({faqs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz soru eklenmemiş</p>
              <Link href="/admin/sss/yeni">
                <Button>İlk Soruyu Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Sıra</th>
                    <th className="text-left p-4 font-semibold">Soru</th>
                    <th className="text-left p-4 font-semibold">Kategori</th>
                    <th className="text-left p-4 font-semibold">Durum</th>
                    <th className="text-right p-4 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-mono text-sm">{faq.order}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium max-w-md">{faq.question}</div>
                        <div className="text-sm text-gray-500 mt-1 max-w-md truncate">
                          {faq.answer}
                        </div>
                      </td>
                      <td className="p-4">
                        {faq.category && (
                          <Badge variant="outline">{faq.category.name}</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            faq.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {faq.isPublished ? "Yayında" : "Taslak"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/sss/${faq.id}/duzenle`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteButton id={faq.id} endpoint="faq" itemName="soru" />
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
