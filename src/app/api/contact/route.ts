import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { contactFormSchema } from "@/lib/validation"
import { sendEmail, getContactEmailTemplate } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("=== Contact Form API ===")
    console.log("Received body:", JSON.stringify(body, null, 2))

    // Validate form data
    const validatedData = contactFormSchema.parse(body)

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        companyName: body.companyName || null,
        subject: validatedData.subject || null,
        message: validatedData.message,
        projectType: validatedData.projectType || null,
        status: "NEW",
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
        userAgent: request.headers.get("user-agent"),
      },
    })

    console.log("Created submission:", JSON.stringify(submission, null, 2))

    // Send email notification to admin
    const emailTemplate = getContactEmailTemplate(validatedData)
    await sendEmail({
      to: process.env.SMTP_USER || "admin@kaldetinsaat.com",
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
        submissionId: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Formu eksiksiz doldurun", error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}

// GET method for admin to list contact submissions
export async function GET(request: NextRequest) {
  try {
    // Auth check - only admin/editor can view submissions
    const session = await getServerSession(authOptions)
    if (!session || !["ADMIN", "EDITOR"].includes(session.user?.role || "")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where = status ? { status } : {}

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get submissions error:", error)
    return NextResponse.json(
      { success: false, message: "Veriler alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH method for admin to update submission status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["ADMIN", "EDITOR"].includes(session.user?.role || "")) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID gerekli" },
        { status: 400 }
      )
    }

    const validStatuses = ["NEW", "READ", "REPLIED", "ARCHIVED"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz durum" },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      message: "Mesaj güncellendi",
      data: updated,
    })
  } catch (error) {
    console.error("Update submission error:", error)
    return NextResponse.json(
      { success: false, message: "Güncelleme başarısız" },
      { status: 500 }
    )
  }
}
