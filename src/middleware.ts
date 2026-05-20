import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isAdmin = req.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = req.nextUrl.pathname === "/admin/login"

  // Response nesnesini oluştur ve pathname header'ı ekle
  const response = NextResponse.next()
  response.headers.set("x-pathname", req.nextUrl.pathname)

  // Allow access to login page
  if (isLoginPage) {
    // Redirect logged-in users away from login page
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    return response
  }

  // Require authentication for admin routes
  if (isAdmin && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // Role-based access control
  if (token && isAdmin) {
    const userRole = token.role as string

    // Only ADMIN can access user management
    if (
      req.nextUrl.pathname.startsWith("/admin/kullanicilar") &&
      userRole !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Only ADMIN and EDITOR can access content management
    const contentPaths = [
      "/admin/projeler",
      "/admin/hizmetler",
      "/admin/blog",
      "/admin/referanslar",
      "/admin/sertifikalar",
      "/admin/sss",
    ]

    const isContentPath = contentPaths.some((path) =>
      req.nextUrl.pathname.startsWith(path)
    )

    if (isContentPath && userRole === "VIEWER") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
