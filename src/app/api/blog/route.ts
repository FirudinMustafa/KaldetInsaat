import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import slugify from "slugify"

// GET - List blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit
    const status = searchParams.get("status")
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    // Build where clause
    const where: any = {}

    if (status) where.status = status
    if (categoryId) where.categoryId = categoryId
    if (featured === "true") where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          createdBy: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get blog posts error:", error)
    return NextResponse.json(
      { success: false, message: "Blog yazıları alınamadı" },
      { status: 500 }
    )
  }
}

// POST - Create new blog post (admin only)
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

    // Generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true })
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        status: body.status || "DRAFT",
        featured: body.featured || false,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        keywords: body.keywords,
        categoryId: body.categoryId,
        createdById: session.user.id,
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        category: true,
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Blog yazısı oluşturuldu",
        data: post,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create blog post error:", error)
    return NextResponse.json(
      { success: false, message: "Blog yazısı oluşturulamadı" },
      { status: 500 }
    )
  }
}
