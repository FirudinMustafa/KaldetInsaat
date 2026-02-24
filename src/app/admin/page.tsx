import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  FileText,
  Mail,
  FileQuestion,
  Star,
  Award,
  Wrench,
  ArrowRight,
  Eye,
} from "lucide-react"

export const dynamic = "force-dynamic"

async function getDashboardStats() {
  const [
    projectCount,
    completedProjectCount,
    inProgressProjectCount,
    blogPostCount,
    publishedBlogCount,
    contactSubmissionCount,
    newContactCount,
    quoteRequestCount,
    pendingQuoteCount,
    testimonialCount,
    pendingTestimonialCount,
    serviceCount,
    certificateCount,
    recentProjects,
    recentContacts,
    recentQuotes,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "COMPLETED" } }),
    prisma.project.count({ where: { status: "IN_PROGRESS" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: "PENDING" } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { isApproved: false } }),
    prisma.service.count({ where: { isPublished: true } }),
    prisma.certificate.count({ where: { isPublished: true } }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
        location: true,
      },
    }),
    prisma.contactSubmission.findMany({
      take: 5,
      where: { status: "NEW" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.quoteRequest.findMany({
      take: 5,
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        projectType: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  return {
    projectCount,
    completedProjectCount,
    inProgressProjectCount,
    blogPostCount,
    publishedBlogCount,
    contactSubmissionCount,
    newContactCount,
    quoteRequestCount,
    pendingQuoteCount,
    testimonialCount,
    pendingTestimonialCount,
    serviceCount,
    certificateCount,
    recentProjects,
    recentContacts,
    recentQuotes,
  }
}

const statusLabels: Record<string, string> = {
  COMPLETED: "Tamamlandı",
  IN_PROGRESS: "Devam Ediyor",
  PLANNING: "Planlama",
  ON_HOLD: "Beklemede",
  CANCELLED: "İptal",
  NEW: "Yeni",
  READ: "Okundu",
  REPLIED: "Yanıtlandı",
  PENDING: "Bekliyor",
  REVIEWING: "İnceleniyor",
  QUOTED: "Teklif Verildi",
  ACCEPTED: "Kabul Edildi",
  REJECTED: "Reddedildi",
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: "Toplam Proje",
      value: stats.projectCount,
      subtitle: `${stats.completedProjectCount} tamamlandı`,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/projeler",
    },
    {
      title: "Blog Yazıları",
      value: stats.blogPostCount,
      subtitle: `${stats.publishedBlogCount} yayında`,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/blog",
    },
    {
      title: "Yeni İletişim",
      value: stats.newContactCount,
      subtitle: `${stats.contactSubmissionCount} toplam`,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/iletisim-formlari",
    },
    {
      title: "Bekleyen Teklif",
      value: stats.pendingQuoteCount,
      subtitle: `${stats.quoteRequestCount} toplam`,
      icon: FileQuestion,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/teklif-talepleri",
    },
    {
      title: "Onay Bekleyen",
      value: stats.pendingTestimonialCount,
      subtitle: `${stats.testimonialCount} referans`,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      href: "/admin/referanslar",
    },
  ]

  const secondaryStats = [
    {
      title: "Aktif Hizmetler",
      value: stats.serviceCount,
      icon: Wrench,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      href: "/admin/hizmetler",
    },
    {
      title: "Sertifikalar",
      value: stats.certificateCount,
      icon: Award,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      href: "/admin/sertifikalar",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Hoş geldiniz, işte genel bakış</p>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Son Projeler
            </CardTitle>
            <Link href="/admin/projeler">
              <Button variant="ghost" size="sm">
                Tümü <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentProjects.length === 0 ? (
              <p className="text-sm text-gray-500">Henüz proje eklenmemiş</p>
            ) : (
              <div className="space-y-3">
                {stats.recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {project.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          project.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : project.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusLabels[project.status] || project.status}
                      </span>
                      <Link href={`/projeler/${project.slug}`} target="_blank">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Yeni İletişim Formları
            </CardTitle>
            <Link href="/admin/iletisim-formlari">
              <Button variant="ghost" size="sm">
                Tümü <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentContacts.length === 0 ? (
              <p className="text-sm text-gray-500">Yeni form yok</p>
            ) : (
              <div className="space-y-3">
                {stats.recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{contact.name}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {contact.email}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Quote Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileQuestion className="w-5 h-5" />
              Bekleyen Teklif Talepleri
            </CardTitle>
            <Link href="/admin/teklif-talepleri">
              <Button variant="ghost" size="sm">
                Tümü <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentQuotes.length === 0 ? (
              <p className="text-sm text-gray-500">Bekleyen teklif yok</p>
            ) : (
              <div className="space-y-3">
                {stats.recentQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{quote.name}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {quote.projectType}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(quote.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
