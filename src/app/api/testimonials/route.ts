import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - List testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved")

    const where: any = {}
    if (approved === "true") where.isApproved = true

    const testimonials = await prisma.testimonial.findMany({
      where,
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      data: testimonials,
    })
  } catch (error) {
    console.error("Get testimonials error:", error)
    return NextResponse.json(
      { success: false, message: "Referanslar alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new testimonial (admin only)
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

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: body.clientName,
        companyName: body.companyName,
        position: body.position,
        content: body.content,
        rating: body.rating || 5,
        image: body.image,
        projectId: body.projectId,
        isApproved: body.isApproved || false,
        featured: body.featured || false,
      },
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Referans oluşturuldu",
        data: testimonial,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create testimonial error:", error)
    return NextResponse.json(
      { success: false, message: "Referans oluşturulamadı" },
      { status: 500 }
    )
  }
}
