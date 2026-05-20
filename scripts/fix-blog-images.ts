import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🖼️ Blog fotoğrafları atanıyor...\n")

  // Blog images mapping
  const imageAssignments: Record<string, string> = {
    'endustriyel-zemin-betonu-nedir-ve-nasil-uygulanir': '/images/blog/endustriyel-zemin.jpg',
    'epoksi-zemin-kaplama-rehberi': '/images/blog/epoksi-cesitleri.jpg',
    'celik-konstruksiyon-avantajlari': '/images/services/celik-konstruksiyon.jpg',
    'insaat-projelerinde-zaman-yonetimi': '/images/blog/helikopter-perdah.jpg',
    'baski-beton-uygulamalari-rehberi': '/images/services/baski-beton.jpg',
    '2025-insaat-sektoru-trendleri': '/images/blog/zemin-turleri.jpg',
    'zemin-hazirligi-rehberi': '/images/blog/beton-bakim.jpg',
    'insaat-malzemelerinde-kalite-kontrolu': '/images/blog/beton-sinifi.jpg',
    'endustriyel-tesislerde-guvenlik-onlemleri': '/images/blog/catlak-onleme.jpg',
    // Old slugs (in case they exist)
    'epoksi-zemin-kaplama-avantajlari': '/images/blog/epoksi-cesitleri.jpg',
    'baski-beton-uygulamalari-ve-tasarim-ipuclari': '/images/services/baski-beton.jpg',
    '2024-insaat-sektoru-trendleri': '/images/blog/zemin-turleri.jpg',
    // Additional old posts
    'endustriyel-zemin-betonu-avantajlari': '/images/blog/endustriyel-zemin.jpg',
    'baski-beton-dis-mekan-tasarimi': '/images/services/baski-beton.jpg',
    'toyota-fabrika-projesi-basari-hikayesi': '/images/projects/fabrika-zemin.jpg',
  }

  const posts = await prisma.blogPost.findMany()

  let updated = 0
  for (const post of posts) {
    const coverImage = imageAssignments[post.slug]
    if (coverImage) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { coverImage }
      })
      console.log(`✅ ${post.title} -> ${coverImage}`)
      updated++
    } else {
      console.log(`⚠️ Görsel bulunamadı: ${post.slug}`)
    }
  }

  console.log(`\n✅ Toplam ${updated} blog yazısına fotoğraf atandı!`)
}

main()
  .catch((e) => {
    console.error("❌ Hata:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
