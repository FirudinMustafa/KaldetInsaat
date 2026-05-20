import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single FAQ question
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const question = await prisma.fAQQuestion.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    if (!question) {
      return NextResponse.json(
        { success: false, message: "SSS sorusu bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: question,
    })
  } catch (error) {
    console.error("Get FAQ question error:", error)
    return NextResponse.json(
      { success: false, message: "SSS sorusu alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update FAQ question (admin only)
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

    const question = await prisma.fAQQuestion.update({
      where: { id },
      data: body,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "SSS sorusu güncellendi",
      data: question,
    })
  } catch (error) {
    console.error("Update FAQ question error:", error)
    return NextResponse.json(
      { success: false, message: "SSS sorusu güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete FAQ question (admin only)
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

    await prisma.fAQQuestion.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "SSS sorusu silindi",
    })
  } catch (error) {
    console.error("Delete FAQ question error:", error)
    return NextResponse.json(
      { success: false, message: "SSS sorusu silinemedi" },
      { status: 500 }
    )
  }
}
