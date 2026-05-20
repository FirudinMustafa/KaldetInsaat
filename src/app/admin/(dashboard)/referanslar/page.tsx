import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Star } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    include: {
      project: {
        select: { title: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return testimonials
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials()

  const getStatusStyle = (isApproved: boolean) =>
    isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"

  const getStatusLabel = (isApproved: boolean) =>
    isApproved ? "Onaylı" : "Onay Bekliyor"

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referanslar</h1>
          <p className="text-gray-500 mt-1">Müşteri referanslarını yönetin</p>
        </div>
        <Link href="/admin/referanslar/yeni">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Yeni Referans
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {testimonials.filter((t) => t.isApproved).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Onaylı</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {testimonials.filter((t) => !t.isApproved).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Onay Bekliyor</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">
              {testimonials.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Toplam</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referans Listesi ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz referans eklenmemiş</p>
              <Link href="/admin/referanslar/yeni">
                <Button>İlk Referansı Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Müşteri</th>
                    <th className="text-left p-4 font-semibold">Firma</th>
                    <th className="text-left p-4 font-semibold">Proje</th>
                    <th className="text-left p-4 font-semibold">Puan</th>
                    <th className="text-left p-4 font-semibold">Durum</th>
                    <th className="text-left p-4 font-semibold">Tarih</th>
                    <th className="text-right p-4 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {testimonial.image && (
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative flex-shrink-0">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.clientName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{testimonial.clientName}</div>
                            {testimonial.position && (
                              <div className="text-sm text-gray-500">
                                {testimonial.position}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{testimonial.companyName || "-"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {testimonial.project?.title || "-"}
                        </div>
                      </td>
                      <td className="p-4">{renderStars(testimonial.rating)}</td>
                      <td className="p-4">
                        <Badge className={getStatusStyle(testimonial.isApproved)}>
                          {getStatusLabel(testimonial.isApproved)}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/referanslar/${testimonial.id}/duzenle`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteButton id={testimonial.id} endpoint="testimonials" itemName="referans" />
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

      {testimonials.length > 0 && testimonials[0] && (
        <Card>
          <CardHeader>
            <CardTitle>Son Referans Detayı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {testimonials[0].image && (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 relative flex-shrink-0">
                    <Image
                      src={testimonials[0].image}
                      alt={testimonials[0].clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {testimonials[0].clientName}
                  </h3>
                  {testimonials[0].position && (
                    <p className="text-gray-600">{testimonials[0].position}</p>
                  )}
                  {testimonials[0].companyName && (
                    <p className="text-gray-600">{testimonials[0].companyName}</p>
                  )}
                  <div className="mt-2">{renderStars(testimonials[0].rating)}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{testimonials[0].content}</p>
              </div>
              {testimonials[0].project && (
                <div>
                  <span className="text-sm text-gray-600">İlgili Proje: </span>
                  <span className="font-medium">{testimonials[0].project.title}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
