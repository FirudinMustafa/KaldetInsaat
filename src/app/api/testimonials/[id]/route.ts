import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Referans bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    })
  } catch (error) {
    console.error("Get testimonial error:", error)
    return NextResponse.json(
      { success: false, message: "Referans alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update testimonial (admin only)
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

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: body,
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Referans güncellendi",
      data: testimonial,
    })
  } catch (error) {
    console.error("Update testimonial error:", error)
    return NextResponse.json(
      { success: false, message: "Referans güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete testimonial (admin only)
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

    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Referans silindi",
    })
  } catch (error) {
    console.error("Delete testimonial error:", error)
    return NextResponse.json(
      { success: false, message: "Referans silinemedi" },
      { status: 500 }
    )
  }
}
