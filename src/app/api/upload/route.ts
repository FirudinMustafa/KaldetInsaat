import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    // Auth check - only admin/editor can upload
    const session = await getServerSession(authOptions)
    if (!session || !["ADMIN", "EDITOR"].includes(session.user?.role || "")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "projects"

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Dosya bulunamadı" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz dosya türü. Sadece JPEG, PNG, GIF, WEBP desteklenir." },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "Dosya boyutu 10MB'dan büyük olamaz" },
        { status: 400 }
      )
    }

    // Create unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const filename = `${timestamp}-${randomStr}.${ext}`

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const url = `/uploads/${folder}/${filename}`

    return NextResponse.json({
      success: true,
      message: "Dosya başarıyla yüklendi",
      url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { success: false, message: "Dosya yüklenirken hata oluştu" },
      { status: 500 }
    )
  }
}
