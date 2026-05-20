import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    select: { title: true, coverImage: true },
    orderBy: { publishedAt: 'desc' }
  })

  console.log("\n📋 Blog Yazıları ve Fotoğrafları:\n")
  posts.forEach(p => {
    const icon = p.coverImage ? '✅' : '❌'
    console.log(`${icon} ${p.title}`)
    if (p.coverImage) {
      console.log(`   └─ ${p.coverImage}`)
    }
  })
  console.log(`\nToplam: ${posts.length} yazı`)
}

main().finally(() => prisma.$disconnect())
