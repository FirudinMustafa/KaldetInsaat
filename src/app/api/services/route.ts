import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import slugify from "slugify"

// GET - List services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    // Build where clause
    const where: any = {}
    if (published === "true") where.isPublished = true

    const services = await prisma.service.findMany({
      where,
      include: {
        process: {
          orderBy: { order: "asc" },
        },
        materials: {
          orderBy: { order: "asc" },
        },
        projects: {
          where: { isPublished: true },
          take: 6,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({
      success: true,
      data: services,
    })
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json(
      { success: false, message: "Hizmetler alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new service (admin only)
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

    // Create service
    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        icon: body.icon,
        coverImage: body.coverImage,
        order: body.order || 0,
        isPublished: body.isPublished || false,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        createdById: session.user.id,
      },
    })

    // Create processes if provided (accept both 'process' and 'processes' for flexibility)
    const processArray = body.process || body.processes
    if (processArray && Array.isArray(processArray)) {
      await Promise.all(
        processArray.map((process: any, index: number) =>
          prisma.serviceProcess.create({
            data: {
              serviceId: service.id,
              title: process.title,
              description: process.description,
              order: index,
            },
          })
        )
      )
    }

    // Create materials if provided
    if (body.materials && Array.isArray(body.materials)) {
      await Promise.all(
        body.materials.map((material: any, index: number) =>
          prisma.serviceMaterial.create({
            data: {
              serviceId: service.id,
              name: material.name,
              description: material.description,
              order: index,
            },
          })
        )
      )
    }

    const fullService = await prisma.service.findUnique({
      where: { id: service.id },
      include: {
        process: { orderBy: { order: "asc" } },
        materials: { orderBy: { order: "asc" } },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Hizmet oluşturuldu",
        data: fullService,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create service error:", error)
    return NextResponse.json(
      { success: false, message: "Hizmet oluşturulamadı" },
      { status: 500 }
    )
  }
}
