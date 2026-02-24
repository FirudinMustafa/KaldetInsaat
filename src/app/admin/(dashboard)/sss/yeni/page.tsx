"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewFAQPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    categoryId: "",
    order: 0,
    isPublished: true,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/faq/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categoryId: formData.categoryId || null,
        }),
      })

      if (response.ok) {
        router.push("/admin/sss")
        router.refresh()
      } else {
        alert("Soru oluşturulamadı")
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
        <Link href="/admin/sss">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni SSS</h1>
          <p className="text-gray-500 mt-1">Yeni bir soru ekleyin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Soru ve Cevap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="question">
                    Soru <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="question"
                    required
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    placeholder="Hizmetlerinizin fiyatları nasıl belirleniyor?"
                  />
                </div>

                <div>
                  <Label htmlFor="answer">
                    Cevap <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="answer"
                    required
                    rows={8}
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                    placeholder="Fiyatlarımız proje büyüklüğü, kullanılan malzemeler ve işçilik süresine göre belirlenmektedir..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ayarlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="categoryId">Kategori</Label>
                  <select
                    id="categoryId"
                    className="w-full border rounded-md p-2"
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                  >
                    <option value="">Kategori Seçiniz (Opsiyonel)</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {categories.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Henüz kategori yok.{" "}
                      <Link
                        href="/admin/sss/kategoriler"
                        className="text-blue-600 hover:underline"
                      >
                        Kategori ekleyin
                      </Link>
                    </p>
                  )}
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
                  <p className="text-sm text-gray-500 mt-1">
                    Küçük numara önce gösterilir
                  </p>
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Kaydediliyor..." : "Soruyu Kaydet"}
              </Button>
              <Link href="/admin/sss" className="block">
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
