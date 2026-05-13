import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { testimonialSchema } from "@/lib/validation"

// GET - List testimonials
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const isStaff =
      session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR"

    const { searchParams } = new URL(request.url)
    const approvedParam = searchParams.get("approved")

    const where: Record<string, unknown> = {}

    // Public: only approved testimonials. Staff may list all or filter.
    if (!isStaff) {
      where.isApproved = true
    } else if (approvedParam === "true") {
      where.isApproved = true
    } else if (approvedParam === "false") {
      where.isApproved = false
    }

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
    const validated = testimonialSchema.parse(body)

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: validated.clientName,
        companyName: validated.companyName,
        position: validated.position,
        content: validated.content,
        rating: validated.rating,
        image: validated.image,
        projectId: validated.projectId,
        isApproved: validated.isApproved,
        featured: validated.featured,
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
  } catch (error: unknown) {
    console.error("Create testimonial error:", error)
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Geçersiz veri" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: "Referans oluşturulamadı" },
      { status: 500 }
    )
  }
}
