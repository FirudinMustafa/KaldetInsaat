"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Save,
  Building2,
} from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    setMessage("")

    // Simüle edilmiş kaydetme işlemi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    setMessage("Ayarlar başarıyla kaydedildi")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-500 mt-1">Site ayarlarını yönetin</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Firma Bilgileri
          </CardTitle>
          <CardDescription>
            Temel firma bilgilerini düzenleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Firma Adı</Label>
              <Input id="companyName" defaultValue="Kaldet İnşaat" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slogan">Slogan</Label>
              <Input id="slogan" defaultValue="Endüstriyel Zemin ve İnşaat Çözümleri" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Firma Açıklaması</Label>
            <Textarea
              id="description"
              rows={3}
              defaultValue="Endüstriyel zemin betonu, baskı beton, epoksi kaplama, çelik konstrüksiyon ve altyapı uygulamalarında 25+ yıllık tecrübeyle profesyonel hizmet."
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            İletişim Bilgileri
          </CardTitle>
          <CardDescription>
            Müşterilerin size ulaşabileceği iletişim bilgileri
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="phone" className="pl-10" defaultValue="0262 642 2058" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobil</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="mobile" className="pl-10" defaultValue="0532 XXX XXXX" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="email" className="pl-10" defaultValue="info@kaldetinsaat.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Web Sitesi</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="website" className="pl-10" defaultValue="https://kaldetinsaat.com" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                id="address"
                className="pl-10"
                rows={2}
                defaultValue="Gebze, Kocaeli, Türkiye"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Sosyal Medya
          </CardTitle>
          <CardDescription>
            Sosyal medya hesap bağlantıları
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="facebook" className="pl-10" placeholder="https://facebook.com/..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="instagram" className="pl-10" placeholder="https://instagram.com/..." />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="linkedin" className="pl-10" placeholder="https://linkedin.com/company/..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter / X</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="twitter" className="pl-10" placeholder="https://twitter.com/..." />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            SEO Ayarları
          </CardTitle>
          <CardDescription>
            Arama motoru optimizasyonu için varsayılan meta bilgileri
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Varsayılan Meta Başlık</Label>
            <Input
              id="metaTitle"
              defaultValue="Kaldet İnşaat - Endüstriyel Zemin ve İnşaat Çözümleri"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Varsayılan Meta Açıklama</Label>
            <Textarea
              id="metaDescription"
              rows={2}
              defaultValue="Endüstriyel zemin betonu, baskı beton, epoksi kaplama, çelik konstrüksiyon ve altyapı uygulamalarında 25+ yıllık tecrübeyle profesyonel hizmet."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Anahtar Kelimeler</Label>
            <Textarea
              id="keywords"
              rows={2}
              placeholder="endüstriyel zemin, baskı beton, epoksi kaplama, ..."
              defaultValue="endüstriyel zemin betonu, baskı beton, epoksi zemin kaplama, çelik konstrüksiyon, altyapı uygulamaları, Kocaeli inşaat"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>
    </div>
  )
}
