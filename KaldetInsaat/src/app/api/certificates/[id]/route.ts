import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single certificate
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const certificate = await prisma.certificate.findUnique({
      where: { id },
    })

    if (!certificate) {
      return NextResponse.json(
        { success: false, message: "Sertifika bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: certificate,
    })
  } catch (error) {
    console.error("Get certificate error:", error)
    return NextResponse.json(
      { success: false, message: "Sertifika alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update certificate (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const body = await request.json()

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        issuer: body.issuedBy,
        issueDate: body.issuedDate ? new Date(body.issuedDate) : null,
        image: body.image,
        pdfUrl: body.documentUrl,
        isPublished: body.isPublished,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Sertifika güncellendi",
      data: certificate,
    })
  } catch (error) {
    console.error("Update certificate error:", error)
    return NextResponse.json(
      { success: false, message: "Sertifika güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete certificate (admin only)
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

    await prisma.certificate.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Sertifika silindi",
    })
  } catch (error) {
    console.error("Delete certificate error:", error)
    return NextResponse.json(
      { success: false, message: "Sertifika silinemedi" },
      { status: 500 }
    )
  }
}
