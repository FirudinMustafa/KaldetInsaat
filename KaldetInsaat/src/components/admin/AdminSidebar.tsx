"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  Wrench,
  FileText,
  Award,
  MessageSquare,
  HelpCircle,
  Settings,
  Image,
  Mail,
  FileQuestion,
  Star,
  BarChart3,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Projeler",
    href: "/admin/projeler",
    icon: Briefcase,
  },
  {
    title: "Hizmetler",
    href: "/admin/hizmetler",
    icon: Wrench,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Referanslar",
    href: "/admin/referanslar",
    icon: Star,
  },
  {
    title: "Sertifikalar",
    href: "/admin/sertifikalar",
    icon: Award,
  },
  {
    title: "SSS",
    href: "/admin/sss",
    icon: HelpCircle,
  },
  {
    title: "İletişim Formları",
    href: "/admin/iletisim-formlari",
    icon: Mail,
  },
  {
    title: "Teklif Talepleri",
    href: "/admin/teklif-talepleri",
    icon: FileQuestion,
  },
  {
    title: "Medya",
    href: "/admin/medya",
    icon: Image,
  },
  {
    title: "Analitik",
    href: "/admin/analitik",
    icon: BarChart3,
  },
  {
    title: "Ayarlar",
    href: "/admin/ayarlar",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/admin" className="text-2xl font-bold">
          Kaldet İnşaat
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
