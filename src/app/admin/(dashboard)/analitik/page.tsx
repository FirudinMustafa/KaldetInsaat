import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Eye,
  MousePointerClick,
  FileText,
  Phone,
  Mail,
  TrendingUp,
  Calendar,
} from "lucide-react"

export const dynamic = "force-dynamic"

async function getAnalytics() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalPageViews,
    last30DaysViews,
    last7DaysViews,
    totalConversions,
    contactConversions,
    quoteConversions,
    phoneConversions,
    topPages,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.pageView.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.conversionEvent.count(),
    prisma.conversionEvent.count({
      where: { type: "contact_form" },
    }),
    prisma.conversionEvent.count({
      where: { type: "quote_request" },
    }),
    prisma.conversionEvent.count({
      where: { type: "phone_click" },
    }),
    prisma.pageView.groupBy({
      by: ["page"],
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
      take: 10,
    }),
  ])

  return {
    totalPageViews,
    last30DaysViews,
    last7DaysViews,
    totalConversions,
    contactConversions,
    quoteConversions,
    phoneConversions,
    topPages,
  }
}

export default async function AnalyticsPage() {
  const stats = await getAnalytics()

  const statCards = [
    {
      title: "Toplam Sayfa Görüntüleme",
      value: stats.totalPageViews,
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Son 30 Gün",
      value: stats.last30DaysViews,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Son 7 Gün",
      value: stats.last7DaysViews,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Toplam Dönüşüm",
      value: stats.totalConversions,
      icon: MousePointerClick,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const conversionCards = [
    {
      title: "İletişim Formu",
      value: stats.contactConversions,
      icon: Mail,
      color: "text-blue-600",
    },
    {
      title: "Teklif Talebi",
      value: stats.quoteConversions,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Telefon Tıklaması",
      value: stats.phoneConversions,
      icon: Phone,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analitik</h1>
        <p className="text-gray-500 mt-1">Site trafiği ve dönüşüm istatistikleri</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value.toLocaleString("tr-TR")}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Conversion Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5" />
            Dönüşüm İstatistikleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conversionCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            En Çok Ziyaret Edilen Sayfalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.topPages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Henüz veri yok</p>
          ) : (
            <div className="space-y-3">
              {stats.topPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {index + 1}.
                    </span>
                    <span className="font-medium">{page.page}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {page._count.page.toLocaleString("tr-TR")} görüntüleme
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <BarChart3 className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Google Analytics Entegrasyonu</h3>
              <p className="text-sm text-blue-800">
                Daha detaylı analitik için Google Analytics entegrasyonunu aktifleştirin.
                .env dosyasına NEXT_PUBLIC_GA_TRACKING_ID değerini ekleyerek başlayabilirsiniz.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
