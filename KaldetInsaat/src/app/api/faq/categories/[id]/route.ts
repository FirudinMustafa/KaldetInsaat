import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single FAQ category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await prisma.fAQCategory.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { questions: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Kategori bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error("Get FAQ category error:", error)
    return NextResponse.json(
      { success: false, message: "Kategori alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update FAQ category (admin only)
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

    const category = await prisma.fAQCategory.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        order: body.order,
      },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Kategori güncellendi",
      data: category,
    })
  } catch (error) {
    console.error("Update FAQ category error:", error)
    return NextResponse.json(
      { success: false, message: "Kategori güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete FAQ category (admin only)
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

    // Check if category has questions
    const category = await prisma.fAQCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Kategori bulunamadı" },
        { status: 404 }
      )
    }

    if (category._count.questions > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Bu kategoride ${category._count.questions} soru var. Önce soruları silin veya başka kategoriye taşıyın.`,
        },
        { status: 400 }
      )
    }

    await prisma.fAQCategory.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Kategori silindi",
    })
  } catch (error) {
    console.error("Delete FAQ category error:", error)
    return NextResponse.json(
      { success: false, message: "Kategori silinemedi" },
      { status: 500 }
    )
  }
}
