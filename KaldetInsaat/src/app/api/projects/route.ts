import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { projectSchema } from "@/lib/validation"
import slugify from "slugify"

// GET - List projects (public or admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit
    const status = searchParams.get("status")
    const serviceId = searchParams.get("serviceId")
    const featured = searchParams.get("featured")
    const isPublished = searchParams.get("published")

    // Build where clause
    const where: any = {}

    if (status) where.status = status
    if (serviceId) where.serviceId = serviceId
    if (featured === "true") where.featured = true
    if (isPublished === "true") where.isPublished = true

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          service: {
            select: { id: true, title: true, slug: true },
          },
          images: {
            orderBy: { order: "asc" },
            take: 5,
          },
          createdBy: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json(
      { success: false, message: "Projeler alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new project (admin only)
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
    if (!body.slug && body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true })
    }

    // Clean up null/undefined values for optional number fields
    const cleanedBody = {
      ...body,
      area: body.area || undefined,
      budget: body.budget || undefined,
      duration: body.duration || undefined,
      serviceId: body.serviceId || undefined,
      description: body.description || "",
    }

    // Validate data
    const validatedData = projectSchema.parse(cleanedBody)

    // Prepare data for Prisma (remove null values, use undefined instead)
    const prismaData: any = {
      title: validatedData.title,
      slug: validatedData.slug,
      description: validatedData.description || "",
      location: validatedData.location || "Belirtilmemiş",
      client: validatedData.client,
      status: validatedData.status,
      featured: validatedData.featured,
      isPublished: validatedData.isPublished,
      coverImage: validatedData.coverImage,
      metaTitle: validatedData.metaTitle,
      metaDescription: validatedData.metaDescription,
      createdById: session.user.id,
      publishedAt: validatedData.isPublished ? new Date() : null,
    }

    // Only add optional fields if they have values
    if (validatedData.area) prismaData.area = validatedData.area
    if (validatedData.budget) prismaData.budget = validatedData.budget
    if (validatedData.duration) prismaData.duration = validatedData.duration
    if (validatedData.serviceId) prismaData.serviceId = validatedData.serviceId

    // Create project
    const project = await prisma.project.create({
      data: prismaData,
      include: {
        service: true,
        images: true,
        videos: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Proje başarıyla oluşturuldu",
        data: project,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Create project error:", error)

    // Zod validation error
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Geçersiz veri: " + error.errors?.[0]?.message, error: error.errors },
        { status: 400 }
      )
    }

    // Prisma errors
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Bu slug zaten kullanımda. Farklı bir başlık deneyin." },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Proje oluşturulamadı: " + (error?.message || "Bilinmeyen hata") },
      { status: 500 }
    )
  }
}
