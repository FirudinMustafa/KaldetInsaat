import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - List quote requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where: any = {}
    if (status) where.status = status

    const requests = await prisma.quoteRequest.findMany({
      where,
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      data: requests,
    })
  } catch (error) {
    console.error("Get quote requests error:", error)
    return NextResponse.json(
      { success: false, message: "Teklif talepleri alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new quote request (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("=== Quote Request API ===")
    console.log("Received body:", JSON.stringify(body, null, 2))

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, message: "Gerekli alanları doldurun" },
        { status: 400 }
      )
    }

    // Find serviceId from serviceSlug if provided
    let serviceId = body.serviceId || null
    if (!serviceId && body.serviceSlug) {
      console.log("Looking up service with slug:", body.serviceSlug)
      const service = await prisma.service.findUnique({
        where: { slug: body.serviceSlug },
        select: { id: true, title: true },
      })
      console.log("Found service:", service)
      serviceId = service?.id || null
    }

    console.log("Final serviceId:", serviceId)

    // Create quote request
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        companyName: body.companyName || null,
        serviceId: serviceId,
        projectType: body.projectType || null,
        area: body.area ? parseFloat(body.area) : null,
        budget: body.budget || null,
        timeline: body.timeline || null,
        description: body.description || null,
        location: body.location || null,
        estimatedPrice: body.estimatedPrice ? parseFloat(body.estimatedPrice) : null,
        status: "PENDING",
      },
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
    })

    console.log("Created quote request:", JSON.stringify(quoteRequest, null, 2))

    // TODO: Send email notification to admin
    // await sendEmail({
    //   to: process.env.SMTP_USER,
    //   subject: `Yeni Teklif Talebi: ${body.name}`,
    //   html: `...email template...`
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.",
        data: quoteRequest,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Teklif talebi oluşturulamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update quote request status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { id, status, quoteNotes, finalQuote } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Talep ID gerekli" },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz durum" },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (quoteNotes !== undefined) updateData.quoteNotes = quoteNotes
    if (finalQuote !== undefined) updateData.finalQuote = finalQuote ? parseFloat(finalQuote) : null
    if (status === "QUOTED") updateData.quotedAt = new Date()

    const updated = await prisma.quoteRequest.update({
      where: { id },
      data: updateData,
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Talep güncellendi",
      data: updated,
    })
  } catch (error) {
    console.error("Update quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Talep güncellenemedi" },
      { status: 500 }
    )
  }
}
