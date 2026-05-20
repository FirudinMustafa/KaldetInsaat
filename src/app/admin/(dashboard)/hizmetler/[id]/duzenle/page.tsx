"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

interface Process {
  id?: string
  title: string
  description: string
}

interface Material {
  id?: string
  name: string
  description: string
}

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    icon: "Layers",
    coverImage: "",
    order: 0,
    isPublished: false,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  })

  const [processes, setProcesses] = useState<Process[]>([])
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${id}`)
        if (response.ok) {
          const result = await response.json()
          const data = result.data
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            shortDescription: data.shortDescription || "",
            description: data.description || "",
            icon: data.icon || "Layers",
            coverImage: data.coverImage || "",
            order: data.order || 0,
            isPublished: data.isPublished || false,
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            keywords: data.keywords || "",
          })
          setProcesses(data.process || [])
          setMaterials(data.materials || [])
        } else {
          alert("Hizmet bulunamadı")
          router.push("/admin/hizmetler")
        }
      } catch (error) {
        console.error("Fetch error:", error)
        alert("Bir hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchService()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          process: processes,
          materials,
        }),
      })

      if (response.ok) {
        router.push("/admin/hizmetler")
        router.refresh()
      } else {
        alert("Hizmet güncellenemedi")
      }
    } catch (error) {
      alert("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addProcess = () => {
    setProcesses([...processes, { title: "", description: "" }])
  }

  const removeProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index))
  }

  const updateProcess = (index: number, field: string, value: string) => {
    const newProcesses = [...processes]
    newProcesses[index] = { ...newProcesses[index], [field]: value }
    setProcesses(newProcesses)
  }

  const addMaterial = () => {
    setMaterials([...materials, { name: "", description: "" }])
  }

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index))
  }

  const updateMaterial = (index: number, field: string, value: string) => {
    const newMaterials = [...materials]
    newMaterials[index] = { ...newMaterials[index], [field]: value }
    setMaterials(newMaterials)
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
        <Link href="/admin/hizmetler">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmet Düzenle</h1>
          <p className="text-gray-500 mt-1">Hizmet bilgilerini güncelleyin</p>
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
                    Hizmet Başlığı <span className="text-red-600">*</span>
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
                    /hizmetler/{formData.slug || "url-buraya"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="shortDescription">
                    Kısa Açıklama <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="shortDescription"
                    required
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="description">Detaylı Açıklama</Label>
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
                <CardTitle>Süreç Adımları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processes.map((process, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Adım {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProcess(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Adım başlığı"
                        value={process.title}
                        onChange={(e) =>
                          updateProcess(index, "title", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Adım açıklaması"
                        rows={2}
                        value={process.description}
                        onChange={(e) =>
                          updateProcess(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addProcess}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adım Ekle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Malzemeler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {materials.map((material, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Malzeme {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMaterial(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Malzeme adı"
                        value={material.name}
                        onChange={(e) =>
                          updateMaterial(index, "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Malzeme açıklaması"
                        value={material.description}
                        onChange={(e) =>
                          updateMaterial(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addMaterial}>
                  <Plus className="w-4 h-4 mr-2" />
                  Malzeme Ekle
                </Button>
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
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Başlık</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Açıklama</Label>
                  <Textarea
                    id="metaDescription"
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="keywords">Anahtar Kelimeler</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) =>
                      setFormData({ ...formData, keywords: e.target.value })
                    }
                    placeholder="kelime1, kelime2, kelime3"
                  />
                </div>
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
                  <Label htmlFor="icon">Icon</Label>
                  <select
                    id="icon"
                    className="w-full border rounded-md p-2"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                  >
                    <option value="Layers">Layers</option>
                    <option value="Sparkles">Sparkles</option>
                    <option value="Hammer">Hammer</option>
                    <option value="Building2">Building2</option>
                    <option value="Wrench">Wrench</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="order">Sıralama</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) })
                    }
                  />
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
              <Link href="/admin/hizmetler" className="block">
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
