import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getServices() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  })
  return services
}

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmetler</h1>
          <p className="text-gray-500 mt-1">Tüm hizmetleri yönetin</p>
        </div>
        <Link href="/admin/hizmetler/yeni">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Yeni Hizmet
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hizmet Listesi ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz hizmet eklenmemiş</p>
              <Link href="/admin/hizmetler/yeni">
                <Button>İlk Hizmeti Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Sıra</th>
                    <th className="text-left p-4 font-semibold">Başlık</th>
                    <th className="text-left p-4 font-semibold">Kısa Açıklama</th>
                    <th className="text-left p-4 font-semibold">Durum</th>
                    <th className="text-right p-4 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-mono text-sm">{service.order}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{service.title}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {service.shortDescription}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            service.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {service.isPublished ? "Yayında" : "Taslak"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/hizmetler/${service.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/hizmetler/${service.id}/duzenle`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteButton id={service.id} endpoint="services" itemName="hizmet" />
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
