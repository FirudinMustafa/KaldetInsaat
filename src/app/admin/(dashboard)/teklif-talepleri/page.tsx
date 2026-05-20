"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Phone, Mail, MapPin, Calendar, FileText, Clock, Building2, X, CheckCircle, XCircle, AlertCircle, Search, Send, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string | null
  companyName: string | null
  serviceId: string | null
  projectType: string | null
  area: number | null
  location: string | null
  description: string | null
  budget: string | null
  timeline: string | null
  estimatedPrice: number | null
  finalQuote: number | null
  quoteNotes: string | null
  status: string
  createdAt: string
  service: { id: string; title: string } | null
}

export default function AdminQuoteRequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState<string>("ALL")
  const [customDateStart, setCustomDateStart] = useState<string>("")
  const [customDateEnd, setCustomDateEnd] = useState<string>("")

  useEffect(() => {
    fetchQuoteRequests()
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
  const filteredRequests = requests.filter((request) => {
    // Status filter
    if (statusFilter !== "ALL" && request.status !== statusFilter) {
      return false
    }
    // Date filter
    if (!isWithinDateRange(request.createdAt)) {
      return false
    }
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        (request.phone && request.phone.toLowerCase().includes(query)) ||
        (request.companyName && request.companyName.toLowerCase().includes(query)) ||
        (request.service?.title && request.service.title.toLowerCase().includes(query)) ||
        (request.location && request.location.toLowerCase().includes(query))
      )
    }
    return true
  })

  const fetchQuoteRequests = async () => {
    try {
      const response = await fetch("/api/quote-requests")
      const data = await response.json()
      if (data.success) {
        setRequests(data.data)
      }
    } catch (error) {
      console.error("Error fetching quote requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true)
    try {
      const response = await fetch("/api/quote-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        // Update local state
        setRequests(prev =>
          prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
        )
        if (selectedRequest?.id === id) {
          setSelectedRequest({ ...selectedRequest, status: newStatus })
        }
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setUpdating(false)
    }
  }

  const statusColors: { [key: string]: string } = {
    PENDING: "bg-blue-100 text-blue-700",
    REVIEWING: "bg-yellow-100 text-yellow-700",
    QUOTED: "bg-purple-100 text-purple-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  }

  const statusLabels: { [key: string]: string } = {
    PENDING: "Beklemede",
    REVIEWING: "İnceleniyor",
    QUOTED: "Teklif Verildi",
    ACCEPTED: "Kabul Edildi",
    REJECTED: "Reddedildi",
  }

  const projectTypeLabels: { [key: string]: string } = {
    residential: "Konut",
    commercial: "Ticari",
    industrial: "Endüstriyel",
    infrastructure: "Altyapı",
  }

  const timelineLabels: { [key: string]: string } = {
    urgent: "Acil (1 ay içinde)",
    normal: "Normal (1-3 ay)",
    flexible: "Esnek (3+ ay)",
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
          <h1 className="text-3xl font-bold text-gray-900">Teklif Talepleri</h1>
          <p className="text-gray-500 mt-1">Gelen teklif taleplerini yönetin</p>
        </div>
      </div>

      {/* Stats Cards - Clickable for filtering */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "ALL" ? "ring-2 ring-gray-400" : ""}`}
          onClick={() => setStatusFilter("ALL")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {requests.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Tümü</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "PENDING" ? "ring-2 ring-blue-400" : ""}`}
          onClick={() => setStatusFilter("PENDING")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {requests.filter((r) => r.status === "PENDING").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Beklemede</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "REVIEWING" ? "ring-2 ring-yellow-400" : ""}`}
          onClick={() => setStatusFilter("REVIEWING")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {requests.filter((r) => r.status === "REVIEWING").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">İnceleniyor</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "QUOTED" ? "ring-2 ring-purple-400" : ""}`}
          onClick={() => setStatusFilter("QUOTED")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {requests.filter((r) => r.status === "QUOTED").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Teklif Verildi</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "ACCEPTED" ? "ring-2 ring-green-400" : ""}`}
          onClick={() => setStatusFilter("ACCEPTED")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {requests.filter((r) => r.status === "ACCEPTED").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Kabul Edildi</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === "REJECTED" ? "ring-2 ring-red-400" : ""}`}
          onClick={() => setStatusFilter("REJECTED")}
        >
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {requests.filter((r) => r.status === "REJECTED").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Reddedildi</div>
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
            placeholder="Ad, e-posta, telefon, firma veya hizmet ara..."
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
              Teklif Listesi ({filteredRequests.length}
              {filteredRequests.length !== requests.length && ` / ${requests.length}`})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {requests.length === 0
                    ? "Henüz teklif talebi yok"
                    : "Filtreye uygun talep bulunamadı"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold text-sm">Ad Soyad</th>
                      <th className="text-left p-3 font-semibold text-sm">Hizmet</th>
                      <th className="text-left p-3 font-semibold text-sm">Alan</th>
                      <th className="text-left p-3 font-semibold text-sm">Fiyat</th>
                      <th className="text-left p-3 font-semibold text-sm">Durum</th>
                      <th className="text-left p-3 font-semibold text-sm">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedRequest?.id === request.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <td className="p-3">
                          <div className="font-medium text-sm">{request.name}</div>
                          <div className="text-xs text-gray-500">{request.email}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            {request.service?.title || "-"}
                          </div>
                          {request.projectType && (
                            <div className="text-xs text-gray-500">
                              {projectTypeLabels[request.projectType] || request.projectType}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-sm">
                          {request.area ? `${request.area} m²` : "-"}
                        </td>
                        <td className="p-3">
                          <div className="text-sm font-semibold text-green-700">
                            {request.estimatedPrice
                              ? new Intl.NumberFormat("tr-TR", {
                                  style: "currency",
                                  currency: "TRY",
                                  maximumFractionDigits: 0,
                                }).format(request.estimatedPrice)
                              : "-"}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={statusColors[request.status]}>
                            {statusLabels[request.status]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedRequest(request)
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
            <CardTitle className="text-lg">Talep Detayı</CardTitle>
            {selectedRequest && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(null)}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-4">
                {/* Customer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">Müşteri Bilgileri</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{selectedRequest.name}</span>
                    </div>
                    {selectedRequest.companyName && (
                      <div className="text-sm text-gray-600 ml-6">
                        {selectedRequest.companyName}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline text-sm">
                        {selectedRequest.email}
                      </a>
                    </div>
                    {selectedRequest.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline text-sm">
                          {selectedRequest.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">Proje Bilgileri</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Hizmet</div>
                      <div className="font-medium text-sm">
                        {selectedRequest.service?.title || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-500">Proje Tipi</div>
                        <div className="font-medium text-sm">
                          {selectedRequest.projectType
                            ? projectTypeLabels[selectedRequest.projectType] || selectedRequest.projectType
                            : "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Alan</div>
                        <div className="font-medium text-sm">
                          {selectedRequest.area ? `${selectedRequest.area} m²` : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-500">Süre</div>
                        <div className="font-medium text-sm">
                          {selectedRequest.timeline
                            ? timelineLabels[selectedRequest.timeline] || selectedRequest.timeline
                            : "-"}
                        </div>
                      </div>
                      {selectedRequest.location && (
                        <div>
                          <div className="text-xs text-gray-500">Konum</div>
                          <div className="font-medium text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            {selectedRequest.location}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Fiyat Bilgisi</h4>
                  <div className="text-2xl font-bold text-green-700">
                    {selectedRequest.estimatedPrice
                      ? new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                          maximumFractionDigits: 0,
                        }).format(selectedRequest.estimatedPrice)
                      : "-"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Tahmini Fiyat</div>
                </div>

                {/* Description */}
                {selectedRequest.description && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Proje Açıklaması
                    </h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {selectedRequest.description}
                    </p>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedRequest.createdAt).toLocaleDateString("tr-TR", {
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
                  <Badge className={`${statusColors[selectedRequest.status]} text-sm px-3 py-1`}>
                    {statusLabels[selectedRequest.status]}
                  </Badge>
                </div>

                {/* Status Actions */}
                <div className="pt-4 border-t">
                  <div className="text-xs text-gray-500 mb-3">Durumu Güncelle</div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRequest.status === "PENDING" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        onClick={() => updateStatus(selectedRequest.id, "REVIEWING")}
                        disabled={updating}
                      >
                        <Search className="w-3 h-3 mr-1" />
                        İncele
                      </Button>
                    )}
                    {(selectedRequest.status === "PENDING" || selectedRequest.status === "REVIEWING") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        onClick={() => updateStatus(selectedRequest.id, "QUOTED")}
                        disabled={updating}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Teklif Ver
                      </Button>
                    )}
                    {selectedRequest.status === "QUOTED" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => updateStatus(selectedRequest.id, "ACCEPTED")}
                          disabled={updating}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Kabul
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => updateStatus(selectedRequest.id, "REJECTED")}
                          disabled={updating}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Red
                        </Button>
                      </>
                    )}
                    {(selectedRequest.status === "ACCEPTED" || selectedRequest.status === "REJECTED") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 col-span-2"
                        onClick={() => updateStatus(selectedRequest.id, "PENDING")}
                        disabled={updating}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Tekrar Beklet
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Detay görmek için bir talep seçin</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
