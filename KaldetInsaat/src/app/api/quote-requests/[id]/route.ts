import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET - Get single quote request (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id },
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
    })

    if (!quoteRequest) {
      return NextResponse.json(
        { success: false, message: "Teklif talebi bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: quoteRequest,
    })
  } catch (error) {
    console.error("Get quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Teklif talebi alınamadı" },
      { status: 500 }
    )
  }
}

// PATCH - Update quote request (admin only)
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

    const quoteRequest = await prisma.quoteRequest.update({
      where: { id },
      data: body,
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
    })

    // TODO: Send email if quote is provided
    // if (body.quotedPrice && body.status === "QUOTED") {
    //   await sendEmail({...})
    // }

    return NextResponse.json({
      success: true,
      message: "Teklif talebi güncellendi",
      data: quoteRequest,
    })
  } catch (error) {
    console.error("Update quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Teklif talebi güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Delete quote request (admin only)
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

    await prisma.quoteRequest.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Teklif talebi silindi",
    })
  } catch (error) {
    console.error("Delete quote request error:", error)
    return NextResponse.json(
      { success: false, message: "Teklif talebi silinemedi" },
      { status: 500 }
    )
  }
}
