import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Blog yazısı bulunamadı" },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("Get blog post error:", error)
    return NextResponse.json(
      { success: false, message: "Blog yazısı alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update blog post (admin only)
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

    // Update publishedAt if status changes to PUBLISHED
    if (body.status === "PUBLISHED") {
      const currentPost = await prisma.blogPost.findUnique({
        where: { id },
        select: { status: true },
      })

      if (currentPost && currentPost.status !== "PUBLISHED") {
        body.publishedAt = new Date()
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: body,
      include: {
        category: true,
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Blog yazısı güncellendi",
      data: post,
    })
  } catch (error) {
    console.error("Update blog post error:", error)
    return NextResponse.json(
      { success: false, message: "Blog yazısı güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post (admin only)
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

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Blog yazısı silindi",
    })
  } catch (error) {
    console.error("Delete blog post error:", error)
    return NextResponse.json(
      { success: false, message: "Blog yazısı silinemedi" },
      { status: 500 }
    )
  }
}
