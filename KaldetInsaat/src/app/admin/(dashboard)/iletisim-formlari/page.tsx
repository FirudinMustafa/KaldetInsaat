"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Phone, Mail, Calendar, MessageSquare, Building2, X, Briefcase, CheckCircle, Archive, BookOpen, Search, CalendarDays } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  companyName: string | null
  subject: string | null
  message: string
  projectType: string | null
  status: string
  notes: string | null
  createdAt: string
}

export default function AdminContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState<string>("ALL")
  const [customDateStart, setCustomDateStart] = useState<string>("")
  const [customDateEnd, setCustomDateEnd] = useState<string>("")

  useEffect(() => {
    fetchSubmissions()
  }, [])

  // Date filter helper
  const isWithinDateRange = (dateStr: string) => {
    if (dateFilter === "ALL") return true

    const date = new Date(dateStr)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (dateFilter) {
      case "TODAY":
        return date >= today
      case "WEEK":
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return date >= weekAgo
      case "MONTH":
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return date >= monthAgo
      case "CUSTOM":
        if (customDateStart && customDateEnd) {
          const start = new Date(customDateStart)
          const end = new Date(customDateEnd)
          end.setHours(23, 59, 59, 999)
          return date >= start && date <= end
        }
        return true
      default:
        return true
    }
  }

  // Filter and search logic
  const filteredSubmissions = submissions.filter((submission) => {
    // Status filter
    if (statusFilter !== "ALL" && submission.status !== statusFilter) {
      return false
    }
    // Date filter
    if (!isWithinDateRange(submission.createdAt)) {
      return false
    }
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        submission.name.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query) ||
        (submission.phone && submission.phone.toLowerCase().includes(query)) ||
        (submission.companyName && submission.companyName.toLowerCase().includes(query)) ||
        (submission.subject && submission.subject.toLowerCase().includes(query)) ||
        submission.message.toLowerCase().includes(query)
      )
    }
    return true
  })

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      if (data.success) {
        setSubmissions(data.data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true)
    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        setSubmissions(prev =>
          prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
        )
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status: newStatus })
        }
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setUpdating(false)
    }
  }

  const statusColors: { [key: string]: string } = {
    NEW: "bg-blue-100 text-blue-700",
    READ: "bg-yellow-100 text-yellow-700",
    REPLIED: "bg-green-100 text-green-700",
    ARCHIVED: "bg-gray-100 text-gray-700",
  }

  const statusLabels: { [key: string]: string } = {
    NEW: "Yeni",
    READ: "Okundu",
    REPLIED: "Yanıtlandı",
    ARCHIVED: "Arşiv",
  }

  const serviceLabels: { [key: string]: string } = {
    "endustriyel-zemin-betonu": "Endüstriyel Zemin Betonu",
    "epoksi-zemin-kaplama": "Epoksi Zemin Kaplama",
    "baski-beton": "Baskı Beton",
    "bakim-onarim-tadilat": "Bakım Onarım & Tadilat",
    "endustriyel-tesisat": "Endüstriyel Tesisat",
    "altyapi": "Altyapı Hizmetleri",
    "diger": "Diğer",
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İletişim Formları</h1>
          <p className="text-gray-500 mt-1">Gelen form mesajlarını yönetin</p>
        </div>
      </div>

      {/* Stats Cards - Clickable for filtering */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "ALL" ? "ring-2 ring-gray-400" : ""}`}
          onClick={() => setStatusFilter("ALL")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {submissions.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Tümü</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "NEW" ? "ring-2 ring-blue-400" : ""}`}
          onClick={() => setStatusFilter("NEW")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {submissions.filter((s) => s.status === "NEW").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Yeni</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "READ" ? "ring-2 ring-yellow-400" : ""}`}
          onClick={() => setStatusFilter("READ")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {submissions.filter((s) => s.status === "READ").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Okundu</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "REPLIED" ? "ring-2 ring-green-400" : ""}`}
          onClick={() => setStatusFilter("REPLIED")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter((s) => s.status === "REPLIED").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Yanıtlandı</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "ARCHIVED" ? "ring-2 ring-gray-400" : ""}`}
          onClick={() => setStatusFilter("ARCHIVED")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-500">
              {submissions.filter((s) => s.status === "ARCHIVED").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Arşiv</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Date Filter Bar */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ad, e-posta, telefon, konu veya mesaj ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="ALL">Tüm Zamanlar</option>
            <option value="TODAY">Bugün</option>
            <option value="WEEK">Son 7 Gün</option>
            <option value="MONTH">Son 30 Gün</option>
            <option value="CUSTOM">Özel Tarih</option>
          </select>
        </div>

        {/* Custom Date Range */}
        {dateFilter === "CUSTOM" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customDateStart}
              onChange={(e) => setCustomDateStart(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={customDateEnd}
              onChange={(e) => setCustomDateEnd(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Clear Filters */}
        {(statusFilter !== "ALL" || searchQuery || dateFilter !== "ALL") && (
          <Button
            variant="outline"
            onClick={() => {
              setStatusFilter("ALL")
              setSearchQuery("")
              setDateFilter("ALL")
              setCustomDateStart("")
              setCustomDateEnd("")
            }}
          >
            Filtreleri Temizle
          </Button>
        )}
      </div>

      {/* Main Content - Table and Detail Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Mesaj Listesi ({filteredSubmissions.length}
              {filteredSubmissions.length !== submissions.length && ` / ${submissions.length}`})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {submissions.length === 0
                    ? "Henüz form gönderimi yok"
                    : "Filtreye uygun mesaj bulunamadı"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold text-sm">Ad Soyad</th>
                      <th className="text-left p-3 font-semibold text-sm">Hizmet</th>
                      <th className="text-left p-3 font-semibold text-sm">Mesaj</th>
                      <th className="text-left p-3 font-semibold text-sm">Durum</th>
                      <th className="text-left p-3 font-semibold text-sm">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedSubmission?.id === submission.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <td className="p-3">
                          <div className="font-medium text-sm">{submission.name}</div>
                          <div className="text-xs text-gray-500">{submission.email}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            {submission.projectType
                              ? serviceLabels[submission.projectType] || submission.subject || "-"
                              : submission.subject || "-"}
                          </div>
                          {submission.companyName && (
                            <div className="text-xs text-gray-500">{submission.companyName}</div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {submission.message}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={statusColors[submission.status]}>
                            {statusLabels[submission.status]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedSubmission(submission)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Mesaj Detayı</CardTitle>
            {selectedSubmission && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(null)}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {selectedSubmission ? (
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">Gönderen Bilgileri</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{selectedSubmission.name}</span>
                    </div>
                    {selectedSubmission.companyName && (
                      <div className="flex items-center gap-2 ml-6">
                        <Briefcase className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedSubmission.companyName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:underline text-sm">
                        {selectedSubmission.email}
                      </a>
                    </div>
                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${selectedSubmission.phone}`} className="text-blue-600 hover:underline text-sm">
                          {selectedSubmission.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Info */}
                {(selectedSubmission.projectType || selectedSubmission.subject) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700">İlgilendiği Hizmet</h4>
                    <div className="font-medium text-sm">
                      {selectedSubmission.projectType
                        ? serviceLabels[selectedSubmission.projectType] || selectedSubmission.projectType
                        : selectedSubmission.subject}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Mesaj
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedSubmission.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {/* Current Status */}
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-2">Mevcut Durum</div>
                  <Badge className={`${statusColors[selectedSubmission.status]} text-sm px-3 py-1`}>
                    {statusLabels[selectedSubmission.status]}
                  </Badge>
                </div>

                {/* Status Actions */}
                <div className="pt-4 border-t">
                  <div className="text-xs text-gray-500 mb-3">Durumu Güncelle</div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSubmission.status === "NEW" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        onClick={() => updateStatus(selectedSubmission.id, "READ")}
                        disabled={updating}
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        Okundu
                      </Button>
                    )}
                    {(selectedSubmission.status === "NEW" || selectedSubmission.status === "READ") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => updateStatus(selectedSubmission.id, "REPLIED")}
                        disabled={updating}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Yanıtlandı
                      </Button>
                    )}
                    {selectedSubmission.status !== "ARCHIVED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-200 hover:bg-gray-50"
                        onClick={() => updateStatus(selectedSubmission.id, "ARCHIVED")}
                        disabled={updating}
                      >
                        <Archive className="w-3 h-3 mr-1" />
                        Arşivle
                      </Button>
                    )}
                    {selectedSubmission.status === "ARCHIVED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 col-span-2"
                        onClick={() => updateStatus(selectedSubmission.id, "NEW")}
                        disabled={updating}
                      >
                        Arşivden Çıkar
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      window.open(`mailto:${selectedSubmission.email}`, '_blank')
                      // Automatically mark as replied when opening email
                      if (selectedSubmission.status !== "REPLIED" && selectedSubmission.status !== "ARCHIVED") {
                        updateStatus(selectedSubmission.id, "REPLIED")
                      }
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    E-posta Gönder
                  </Button>
                  {selectedSubmission.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`tel:${selectedSubmission.phone}`, '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Ara
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Detay görmek için bir mesaj seçin</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
