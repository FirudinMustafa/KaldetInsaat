import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      service: {
        select: { title: true },
      },
      createdBy: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  return projects
}

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-gray-500 mt-1">Tüm projeleri yönetin</p>
        </div>
        <Link href="/admin/projeler/yeni">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Listesi ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz proje eklenmemiş</p>
              <Link href="/admin/projeler/yeni">
                <Button>İlk Projeyi Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Başlık</th>
                    <th className="text-left p-4 font-semibold">Hizmet</th>
                    <th className="text-left p-4 font-semibold">Durum</th>
                    <th className="text-left p-4 font-semibold">Yayın</th>
                    <th className="text-left p-4 font-semibold">Oluşturan</th>
                    <th className="text-left p-4 font-semibold">Tarih</th>
                    <th className="text-right p-4 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-gray-500">
                            {project.location}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        {project.service?.title || "-"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            project.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : project.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            project.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {project.isPublished ? "Yayında" : "Taslak"}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{project.createdBy.name}</td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/projeler/${project.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/projeler/${project.id}/duzenle`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteButton id={project.id} endpoint="projects" itemName="proje" />
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
