import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({
      where: { id },
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
    })

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Hizmet bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error("Get service error:", error)
    return NextResponse.json(
      { success: false, message: "Hizmet alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update service (admin only)
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

    // Update service
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        icon: body.icon,
        coverImage: body.coverImage,
        order: body.order,
        isPublished: body.isPublished,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
      },
    })

    // Update process if provided
    if (body.process !== undefined) {
      // Delete existing process
      await prisma.serviceProcess.deleteMany({
        where: { serviceId: id },
      })

      // Create new process
      if (Array.isArray(body.process) && body.process.length > 0) {
        await Promise.all(
          body.process.map((process: any, index: number) =>
            prisma.serviceProcess.create({
              data: {
                serviceId: id,
                title: process.title,
                description: process.description,
                order: index,
              },
            })
          )
        )
      }
    }

    // Update materials if provided
    if (body.materials !== undefined) {
      // Delete existing materials
      await prisma.serviceMaterial.deleteMany({
        where: { serviceId: id },
      })

      // Create new materials
      if (Array.isArray(body.materials) && body.materials.length > 0) {
        await Promise.all(
          body.materials.map((material: any, index: number) =>
            prisma.serviceMaterial.create({
              data: {
                serviceId: id,
                name: material.name,
                description: material.description,
                order: index,
              },
            })
          )
        )
      }
    }

    const fullService = await prisma.service.findUnique({
      where: { id },
      include: {
        process: { orderBy: { order: "asc" } },
        materials: { orderBy: { order: "asc" } },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Hizmet güncellendi",
      data: fullService,
    })
  } catch (error) {
    console.error("Update service error:", error)
    return NextResponse.json(
      { success: false, message: "Hizmet güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete service (admin only)
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

    // Delete related process and materials (cascade should handle this)
    await prisma.service.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Hizmet silindi",
    })
  } catch (error) {
    console.error("Delete service error:", error)
    return NextResponse.json(
      { success: false, message: "Hizmet silinemedi" },
      { status: 500 }
    )
  }
}
