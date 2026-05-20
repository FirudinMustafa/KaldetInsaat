import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - List certificates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    const where: any = {}
    if (published === "true") where.isPublished = true

    const certificates = await prisma.certificate.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      data: certificates,
    })
  } catch (error) {
    console.error("Get certificates error:", error)
    return NextResponse.json(
      { success: false, message: "Sertifikalar alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new certificate (admin only)
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

    const certificate = await prisma.certificate.create({
      data: {
        title: body.title,
        description: body.description,
        issuer: body.issuedBy,
        issueDate: body.issuedDate ? new Date(body.issuedDate) : null,
        image: body.image,
        pdfUrl: body.documentUrl,
        isPublished: body.isPublished ?? true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Sertifika oluşturuldu",
        data: certificate,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create certificate error:", error)
    return NextResponse.json(
      { success: false, message: "Sertifika oluşturulamadı" },
      { status: 500 }
    )
  }
}
