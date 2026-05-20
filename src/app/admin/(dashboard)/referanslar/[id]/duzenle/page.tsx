"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

export default function EditTestimonialPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  const [formData, setFormData] = useState({
    clientName: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    photo: "",
    projectId: "",
    status: "APPROVED" as "PENDING" | "APPROVED" | "REJECTED",
    featured: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch testimonial
        const testimonialResponse = await fetch(`/api/testimonials/${id}`)
        if (testimonialResponse.ok) {
          const result = await testimonialResponse.json()
          const data = result.data
          setFormData({
            clientName: data.clientName || "",
            position: data.position || "",
            company: data.companyName || "",
            content: data.content || "",
            rating: data.rating || 5,
            photo: data.image || "",
            projectId: data.projectId || "",
            status: data.isApproved ? "APPROVED" : "PENDING",
            featured: data.featured || false,
          })
        } else {
          alert("Referans bulunamadı")
          router.push("/admin/referanslar")
          return
        }

        // Fetch projects
        const projectsResponse = await fetch("/api/projects")
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json()
          setProjects(projectsData.data || [])
        }
      } catch (error) {
        console.error("Fetch error:", error)
        alert("Bir hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.clientName,
          position: formData.position,
          companyName: formData.company,
          content: formData.content,
          rating: formData.rating,
          image: formData.photo,
          projectId: formData.projectId || null,
          isApproved: formData.status === "APPROVED",
          featured: formData.featured,
        }),
      })

      if (response.ok) {
        router.push("/admin/referanslar")
        router.refresh()
      } else {
        alert("Referans güncellenemedi")
      }
    } catch (error) {
      alert("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStarRating = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className="focus:outline-none transition-all"
          >
            <Star
              className={`w-8 h-8 ${
                star <= formData.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/referanslar">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referans Düzenle</h1>
          <p className="text-gray-500 mt-1">Referans bilgilerini güncelleyin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientName">
                    Müşteri Adı <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="clientName"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="Ahmet Yılmaz"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Pozisyon</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="Genel Müdür"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Firma</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="ABC Holding"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">
                    Referans Metni <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Kaldet İnşaat ile çalışmak harika bir deneyimdi..."
                  />
                </div>

                <div>
                  <Label className="mb-3 block">
                    Puan <span className="text-red-600">*</span>
                  </Label>
                  {renderStarRating()}
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.rating}/5 yıldız
                  </p>
                </div>

                <div>
                  <Label htmlFor="projectId">İlgili Proje</Label>
                  <select
                    id="projectId"
                    className="w-full border rounded-md p-2"
                    value={formData.projectId}
                    onChange={(e) =>
                      setFormData({ ...formData, projectId: e.target.value })
                    }
                  >
                    <option value="">Proje Seçiniz (Opsiyonel)</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Müşteri Fotoğrafı</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  value={formData.photo}
                  onChange={(value) =>
                    setFormData({ ...formData, photo: value as string })
                  }
                />
                <p className="text-sm text-gray-500 mt-2">
                  Profesyonel bir fotoğraf referansın güvenilirliğini artırır
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
                      setFormData({
                        ...formData,
                        status: e.target.value as "PENDING" | "APPROVED" | "REJECTED",
                      })
                    }
                  >
                    <option value="PENDING">Beklemede</option>
                    <option value="APPROVED">Onaylandı</option>
                    <option value="REJECTED">Reddedildi</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Sadece onaylanan referanslar web sitesinde görünür
                  </p>
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
                  <Label htmlFor="featured">Öne Çıkar</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Öne çıkan referanslar ana sayfada gösterilir
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </Button>
              <Link href="/admin/referanslar" className="block">
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
