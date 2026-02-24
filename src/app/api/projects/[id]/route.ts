import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        service: true,
        images: {
          orderBy: { order: "asc" },
        },
        videos: {
          orderBy: { order: "asc" },
        },
        testimonial: true,
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Proje bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Get project error:", error)
    return NextResponse.json(
      { success: false, message: "Proje alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update project (admin only)
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

    // Extract galleryImages if present
    const { galleryImages, ...projectData } = body

    // Update publishedAt if isPublished changes
    if (projectData.isPublished !== undefined) {
      const currentProject = await prisma.project.findUnique({
        where: { id },
        select: { isPublished: true },
      })

      if (currentProject && !currentProject.isPublished && projectData.isPublished) {
        projectData.publishedAt = new Date()
      }
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: projectData,
    })

    // Handle gallery images if provided
    if (galleryImages !== undefined && Array.isArray(galleryImages)) {
      // Delete existing images
      await prisma.projectImage.deleteMany({
        where: { projectId: id },
      })

      // Create new images
      if (galleryImages.length > 0) {
        await prisma.projectImage.createMany({
          data: galleryImages.map((url: string, index: number) => ({
            url,
            projectId: id,
            order: index,
          })),
        })
      }
    }

    // Fetch updated project with relations
    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        service: true,
        images: {
          orderBy: { order: "asc" },
        },
        videos: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Proje güncellendi",
      data: updatedProject,
    })
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json(
      { success: false, message: "Proje güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete project (admin only)
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

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Proje silindi",
    })
  } catch (error) {
    console.error("Delete project error:", error)
    return NextResponse.json(
      { success: false, message: "Proje silinemedi" },
      { status: 500 }
    )
  }
}
