"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "DRAFT",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/blog")
        router.refresh()
      } else {
        const result = await response.json()
        alert(result.message || "Blog yazısı oluşturulamadı")
      }
    } catch (error) {
      alert("Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
          <p className="text-gray-500 mt-1">Yeni bir blog yazısı ekleyin</p>
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
                    Başlık <span className="text-red-600">*</span>
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
                    /blog/{formData.slug || "url-buraya"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt">
                    Özet <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Kısa bir özet yazın..."
                  />
                </div>

                <div>
                  <Label htmlFor="content">
                    İçerik <span className="text-red-600">*</span>
                  </Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                  />
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
                  folder="blog"
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
                    placeholder={formData.title || "Sayfa başlığı"}
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Açıklama</Label>
                  <Textarea
                    id="metaDescription"
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    placeholder={formData.excerpt || "Sayfa açıklaması"}
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
                  <p className="text-sm text-gray-500 mt-1">
                    Virgülle ayırarak girin
                  </p>
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
                  <Label htmlFor="status">Durum</Label>
                  <select
                    id="status"
                    className="w-full border rounded-md p-2"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="DRAFT">Taslak</option>
                    <option value="PUBLISHED">Yayınla</option>
                    <option value="ARCHIVED">Arşiv</option>
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
                  <Label htmlFor="featured">Öne Çıkan Yazı</Label>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Kaydediliyor..." : "Yazıyı Kaydet"}
              </Button>
              <Link href="/admin/blog" className="block">
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
