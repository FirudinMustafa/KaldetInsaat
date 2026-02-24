"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    location: "",
    client: "",
    status: "IN_PROGRESS",
    featured: false,
    area: "",
    budget: "",
    coverImage: "",
    isPublished: false,
  })
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${id}`)
        if (response.ok) {
          const result = await response.json()
          const project = result.data
          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            description: project.description || "",
            location: project.location || "",
            client: project.client || "",
            status: project.status || "IN_PROGRESS",
            featured: project.featured || false,
            area: project.area?.toString() || "",
            budget: project.budget?.toString() || "",
            coverImage: project.coverImage || "",
            isPublished: project.isPublished || false,
          })
          // Load gallery images
          if (project.images && project.images.length > 0) {
            setGalleryImages(project.images.map((img: any) => img.url))
          }
        } else {
          alert("Proje bulunamadı")
          router.push("/admin/projeler")
        }
      } catch (error) {
        alert("Proje yüklenirken hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          area: formData.area ? parseFloat(formData.area) : null,
          budget: formData.budget ? parseFloat(formData.budget) : null,
          galleryImages: galleryImages,
        }),
      })

      if (response.ok) {
        router.push("/admin/projeler")
        router.refresh()
      } else {
        alert("Proje güncellenemedi")
      }
    } catch (error) {
      alert("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projeler">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projeyi Düzenle</h1>
          <p className="text-gray-500 mt-1">Proje bilgilerini güncelleyin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Proje Başlığı <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setFormData({
                        ...formData,
                        title,
                        slug: title
                          .toLowerCase()
                          .replace(/ğ/g, "g")
                          .replace(/ü/g, "u")
                          .replace(/ş/g, "s")
                          .replace(/ı/g, "i")
                          .replace(/ö/g, "o")
                          .replace(/ç/g, "c")
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, ""),
                      })
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">
                    URL (Slug) <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="slug"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    /projeler/{formData.slug || "url-buraya"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">
                    Açıklama <span className="text-red-600">*</span>
                  </Label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(content) =>
                      setFormData({ ...formData, description: content })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proje Detayları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="client">Müşteri</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Alan (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      step="0.01"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Bütçe (₺)</Label>
                    <Input
                      id="budget"
                      type="number"
                      step="0.01"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kapak Resmi</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  value={formData.coverImage}
                  onChange={(value) =>
                    setFormData({ ...formData, coverImage: value as string })
                  }
                  folder="projects"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proje Görselleri (Galeri)</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  value={galleryImages}
                  onChange={(value) => setGalleryImages(value as string[])}
                  multiple={true}
                  maxFiles={20}
                  folder="projects"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Projeye ait birden fazla görsel yükleyebilirsiniz. Bu görseller proje detay sayfasında galeri olarak gösterilecektir.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yayın Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Durum</Label>
                  <select
                    id="status"
                    className="w-full border rounded-md p-2"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="PLANNING">Planlamada</option>
                    <option value="IN_PROGRESS">Devam Ediyor</option>
                    <option value="COMPLETED">Tamamlandı</option>
                    <option value="ON_HOLD">Beklemede</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  <Label htmlFor="featured">Öne Çıkan Proje</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                  />
                  <Label htmlFor="isPublished">Yayınla</Label>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </Button>
              <Link href="/admin/projeler" className="block">
                <Button type="button" variant="outline" className="w-full">
                  İptal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
