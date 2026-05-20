import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import slugify from "slugify"

// GET - List FAQ categories
export async function GET() {
  try {
    const categories = await prisma.fAQCategory.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Get FAQ categories error:", error)
    return NextResponse.json(
      { success: false, message: "SSS kategorileri alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new FAQ category (admin only)
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

    // Generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = slugify(body.name, { lower: true, strict: true })
    }

    const category = await prisma.fAQCategory.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        order: body.order || 0,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "SSS kategorisi oluşturuldu",
        data: category,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create FAQ category error:", error)
    return NextResponse.json(
      { success: false, message: "SSS kategorisi oluşturulamadı" },
      { status: 500 }
    )
  }
}
