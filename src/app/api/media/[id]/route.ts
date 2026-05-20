import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { unlink } from "fs/promises"
import { join } from "path"

// DELETE - Delete media file (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim - Sadece adminler silebilir" },
        { status: 403 }
      )
    }

    // Get media record
    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      return NextResponse.json(
        { success: false, message: "Medya dosyası bulunamadı" },
        { status: 404 }
      )
    }

    // Delete file from disk
    try {
      const filepath = join(process.cwd(), "public", media.url)
      await unlink(filepath)
    } catch (error) {
      console.error("Error deleting file from disk:", error)
      // Continue even if file deletion fails (file might not exist)
    }

    // Delete database record
    await prisma.media.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Medya dosyası silindi",
    })
  } catch (error) {
    console.error("Delete media error:", error)
    return NextResponse.json(
      { success: false, message: "Medya dosyası silinemedi" },
      { status: 500 }
    )
  }
}
