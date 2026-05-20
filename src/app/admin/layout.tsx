import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || ""

  // Login sayfası için session kontrolü yapma
  const isLoginPage = pathname.includes("/admin/login") || pathname === "/admin/login"

  // Middleware zaten auth kontrolü yapıyor, ama layout'ta da kontrol edelim
  // Login sayfası değilse session kontrolü yap
  if (!isLoginPage) {
    const session = await getServerSession(authOptions)
    if (!session) {
      redirect("/admin/login")
    }
  }

  // Login sayfası için sadece children render et (sidebar/header olmadan)
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="pt-16">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
