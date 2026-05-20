import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export const dynamic = "force-dynamic"

async function getCertificates() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  })
  return certificates
}

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sertifikalar</h1>
          <p className="text-gray-500 mt-1">Firma sertifikalarını yönetin</p>
        </div>
        <Link href="/admin/sertifikalar/yeni">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Yeni Sertifika
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {certificates.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Toplam Sertifika</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {certificates.filter((c) => c.isPublished).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Yayında</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {certificates.filter((c) => !c.isPublished).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Taslak</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sertifika Listesi ({certificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz sertifika eklenmemiş</p>
              <Link href="/admin/sertifikalar/yeni">
                <Button>İlk Sertifikayı Ekle</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    {certificate.image ? (
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-5xl">📜</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {certificate.title}
                    </h3>
                    {certificate.issuer && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Veren:</span>{" "}
                        {certificate.issuer}
                      </p>
                    )}
                    {certificate.issueDate && (
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Tarih:</span>{" "}
                        {new Date(certificate.issueDate).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          certificate.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {certificate.isPublished ? "Yayında" : "Taslak"}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/admin/sertifikalar/${certificate.id}/duzenle`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteButton id={certificate.id} endpoint="certificates" itemName="sertifika" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
