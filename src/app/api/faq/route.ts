import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - List FAQ questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")

    const where: any = {}
    if (categoryId) where.categoryId = categoryId

    const questions = await prisma.fAQQuestion.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({
      success: true,
      data: questions,
    })
  } catch (error) {
    console.error("Get FAQ questions error:", error)
    return NextResponse.json(
      { success: false, message: "SSS soruları alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new FAQ question (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const body = await request.json()

    const question = await prisma.fAQQuestion.create({
      data: {
        question: body.question,
        answer: body.answer,
        categoryId: body.categoryId,
        order: body.order || 0,
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "SSS sorusu oluşturuldu",
        data: question,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create FAQ question error:", error)
    return NextResponse.json(
      { success: false, message: "SSS sorusu oluşturulamadı" },
      { status: 500 }
    )
  }
}
