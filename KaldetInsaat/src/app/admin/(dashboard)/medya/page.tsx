import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Upload, Trash2, Download } from "lucide-react"
import Image from "next/image"

export const dynamic = "force-dynamic"

async function getMedia() {
  return await prisma.media.findMany({
    orderBy: { uploadedAt: "desc" },
    take: 50,
  })
}

export default async function MediaPage() {
  const media = await getMedia()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medya Kütüphanesi</h1>
          <p className="text-gray-500 mt-1">Tüm görselleri ve dosyaları yönetin</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Dosya Yükle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dosyalar ({media.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {media.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Henüz dosya yüklenmemiş</p>
              <Button>İlk Dosyayı Yükle</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square"
                >
                  {item.type === "IMAGE" ? (
                    <Image
                      src={item.url}
                      alt={item.alt || item.filename}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kullanım İpuçları</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ul className="text-gray-600 space-y-2">
            <li>Görselleri sürükleyip bırakarak yükleyebilirsiniz</li>
            <li>Desteklenen formatlar: JPG, PNG, GIF, WebP, PDF</li>
            <li>Maksimum dosya boyutu: 10MB</li>
            <li>Görseller otomatik olarak optimize edilir</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
