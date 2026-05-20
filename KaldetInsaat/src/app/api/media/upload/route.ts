import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// POST - Upload media file (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Dosya bulunamadı" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz dosya tipi" },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "Dosya boyutu çok büyük (max 10MB)" },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s/g, "-")
    const filename = `${timestamp}-${originalName}`

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Create media record in database
    const url = `/uploads/${filename}`

    // Determine media type
    let mediaType = "OTHER"
    if (file.type.startsWith("image/")) mediaType = "IMAGE"
    else if (file.type.startsWith("video/")) mediaType = "VIDEO"
    else if (file.type === "application/pdf") mediaType = "DOCUMENT"

    const media = await prisma.media.create({
      data: {
        filename: originalName,
        url: url,
        type: mediaType,
        mimeType: file.type,
        size: file.size,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Dosya yüklendi",
        data: {
          id: media.id,
          url: url,
          filename: originalName,
          size: file.size,
          type: file.type,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Upload media error:", error)
    return NextResponse.json(
      { success: false, message: "Dosya yüklenemedi" },
      { status: 500 }
    )
  }
}
