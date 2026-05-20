"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditCertificatePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issuer: "",
    issueDate: "",
    image: "",
    pdfUrl: "",
    order: 0,
    isPublished: true,
  })

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/${id}`)
        if (response.ok) {
          const result = await response.json()
          const data = result.data
          setFormData({
            title: data.title || "",
            description: data.description || "",
            issuer: data.issuer || "",
            issueDate: data.issueDate
              ? new Date(data.issueDate).toISOString().split("T")[0]
              : "",
            image: data.image || "",
            pdfUrl: data.pdfUrl || "",
            order: data.order || 0,
            isPublished: data.isPublished ?? true,
          })
        } else {
          alert("Sertifika bulunamadı")
          router.push("/admin/sertifikalar")
        }
      } catch (error) {
        console.error("Fetch error:", error)
        alert("Bir hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertificate()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          issuedBy: formData.issuer,
          issuedDate: formData.issueDate || null,
          image: formData.image,
          documentUrl: formData.pdfUrl,
          isPublished: formData.isPublished,
        }),
      })

      if (response.ok) {
        router.push("/admin/sertifikalar")
        router.refresh()
      } else {
        alert("Sertifika güncellenemedi")
      }
    } catch (error) {
      alert("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
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
        <Link href="/admin/sertifikalar">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sertifika Düzenle
          </h1>
          <p className="text-gray-500 mt-1">
            Sertifika bilgilerini güncelleyin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sertifika Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Sertifika Adı <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="ISO 9001:2015 Kalite Yönetim Sistemi"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Sertifika hakkında kısa açıklama..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issuer">Veren Kurum</Label>
                    <Input
                      id="issuer"
                      value={formData.issuer}
                      onChange={(e) =>
                        setFormData({ ...formData, issuer: e.target.value })
                      }
                      placeholder="TÜV Rheinland"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issueDate">Verilme Tarihi</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, issueDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="order">Sıralama</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="pdfUrl">Belge URL (PDF)</Label>
                  <Input
                    id="pdfUrl"
                    type="url"
                    value={formData.pdfUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, pdfUrl: e.target.value })
                    }
                    placeholder="https://example.com/certificate.pdf"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    PDF belgesinin linki (opsiyonel)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sertifika Görseli</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  value={formData.image}
                  onChange={(value) =>
                    setFormData({ ...formData, image: value as string })
                  }
                />
                <p className="text-sm text-gray-500 mt-2">
                  Sertifika görselini yükleyin (PNG, JPG)
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
                <p className="text-sm text-gray-500">
                  Yayınlanan sertifikalar web sitesinde görünür
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </Button>
              <Link href="/admin/sertifikalar" className="block">
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
