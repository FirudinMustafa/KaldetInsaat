import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Testimonials data
const testimonials = [
  {
    clientName: "Ahmet Yılmaz",
    companyName: "Toyota Türkiye",
    position: "Fabrika Müdürü",
    content: "Kaldet İnşaat ile çalışmak bizim için büyük bir şanstı. Endüstriyel zemin betonu uygulamasında gösterdikleri profesyonellik ve zamanında teslimat, projemizin başarısını sağladı. Ekibin yaklaşımı ve kalite anlayışı gerçekten takdire şayan.",
    rating: 5,
    featured: true,
    projectSlug: null, // Will be linked to a project if exists
  },
  {
    clientName: "Mehmet Demir",
    companyName: "CEVA Lojistik",
    position: "Tesis Yöneticisi",
    content: "Depo zemin uygulamasında Kaldet İnşaat'ın deneyimi ve kaliteli işçiliği sayesinde sorunsuz bir proje tamamladık. Ağır yük trafiğine dayanıklı zemin, operasyonlarımızı kesintisiz sürdürmemize olanak sağlıyor. Teşekkürler!",
    rating: 5,
    featured: true,
    projectSlug: null,
  },
  {
    clientName: "Ayşe Kaya",
    companyName: "Enerjisa",
    position: "Proje Müdürü",
    content: "Enerjisa tesislerimizde yapılan epoksi zemin kaplama işi mükemmel sonuç verdi. Hijyenik ve kolay temizlenebilir yüzey, gıda güvenliği standartlarımıza tam uyum sağladı. Profesyonel ekiple çalışmak çok keyifliydi.",
    rating: 5,
    featured: true,
    projectSlug: null,
  },
  {
    clientName: "Fatih Özkan",
    companyName: "Reysaş",
    position: "Genel Müdür",
    content: "Çelik konstrüksiyon projemizde Kaldet İnşaat'ın hızlı montaj ve kaliteli işçiliği bizi çok etkiledi. Proje zamanında tamamlandı ve tüm beklentilerimizi aştı. Kesinlikle tavsiye ederim.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Zeynep Arslan",
    companyName: "Ekol Lojistik",
    position: "Operasyon Müdürü",
    content: "Lojistik merkezimizde yapılan zemin uygulaması, ağır araç trafiğine rağmen hiçbir sorun yaşamadan hizmet veriyor. Dayanıklılık ve kalite konusunda beklentilerimizi fazlasıyla karşıladılar.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Can Şahin",
    companyName: "Autoliv",
    position: "Tesis Müdürü",
    content: "Otomotiv sektöründe çalışan bir firma olarak, zemin kalitesi bizim için kritik öneme sahip. Kaldet İnşaat'ın endüstriyel zemin çözümü, üretim hattımızın verimliliğini artırdı. Çok memnunuz.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Serkan Yıldız",
    companyName: "İHH Dalgakıran",
    position: "Proje Koordinatörü",
    content: "Altyapı projemizde gösterdikleri titizlik ve profesyonellik gerçekten takdire şayan. Zamanında teslimat ve kaliteli işçilik ile projemizi başarıyla tamamladık. Ekip çalışması mükemmeldi.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Elif Çelik",
    companyName: "Özel Gıda Üretim A.Ş.",
    position: "Kalite Müdürü",
    content: "Gıda üretim tesisimizde epoksi zemin kaplama uygulaması yapıldı. Hijyen standartlarına tam uyum ve kolay temizlenebilir yüzey sayesinde, kalite kontrol süreçlerimiz çok daha verimli hale geldi.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Burak Aydın",
    companyName: "Tekstil Fabrikası",
    position: "Genel Müdür",
    content: "Fabrika zemin uygulamasında Kaldet İnşaat'ın deneyimi ve çözüm odaklı yaklaşımı bizi çok etkiledi. Özellikle kimyasal direnç konusunda gösterdikleri başarı, üretim süreçlerimizi olumlu etkiledi.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Gülay Korkmaz",
    companyName: "İlaç Üretim Firması",
    position: "Tesis Yöneticisi",
    content: "Temiz oda standartlarına uygun zemin uygulaması için Kaldet İnşaat ile çalıştık. Toz tutmayan ve hijyenik yüzey, üretim kalitemizi artırdı. Profesyonel ekip ve kaliteli hizmet için teşekkürler.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Murat Özdemir",
    companyName: "Otomotiv Yan Sanayi",
    position: "Fabrika Müdürü",
    content: "Endüstriyel zemin betonu uygulamasında gösterdikleri kalite ve zamanında teslimat, üretim planlamamızı olumlu etkiledi. Ağır makine trafiğine dayanıklı zemin, operasyonlarımızı kesintisiz sürdürmemize olanak sağlıyor.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
  {
    clientName: "Selin Avcı",
    companyName: "Emlak Geliştirme A.Ş.",
    position: "Proje Müdürü",
    content: "Konut projemizde baskı beton uygulaması yapıldı. Estetik görünüm ve dayanıklılık bir arada. Müşterilerimiz zemin kalitesinden çok memnun. Kaldet İnşaat ile çalışmak keyifliydi.",
    rating: 5,
    featured: false,
    projectSlug: null,
  },
]

async function main() {
  console.log("🌱 Referanslar ekleniyor...\n")

  // Get all projects to potentially link testimonials
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    select: { id: true, slug: true, title: true },
  })

  console.log(`📦 ${projects.length} proje bulundu\n`)

  let created = 0
  let updated = 0

  for (const testimonialData of testimonials) {
    try {
      // Try to find a related project by company name or randomly
      let projectId: string | null = null
      
      // Get projects that don't have testimonials yet
      const projectsWithTestimonials = await prisma.testimonial.findMany({
        where: { projectId: { not: null } },
        select: { projectId: true },
      })
      const usedProjectIds = new Set(projectsWithTestimonials.map(t => t.projectId).filter(Boolean))
      const availableProjects = projects.filter(p => !usedProjectIds.has(p.id))
      
      if (availableProjects.length > 0) {
        // Try to match by company name (simple matching)
        const companyLower = testimonialData.companyName?.toLowerCase() || ""
        const matchedProject = availableProjects.find((p) => 
          p.title.toLowerCase().includes(companyLower.split(" ")[0]) ||
          companyLower.includes(p.title.toLowerCase().split(" ")[0])
        )
        
        if (matchedProject) {
          projectId = matchedProject.id
        } else {
          // Random project assignment for some testimonials (only from available)
          if (Math.random() > 0.5 && availableProjects.length > 0) {
            const randomProject = availableProjects[Math.floor(Math.random() * availableProjects.length)]
            projectId = randomProject.id
          }
        }
      }

      // Check if testimonial already exists (by client name and company)
      const existing = await prisma.testimonial.findFirst({
        where: {
          clientName: testimonialData.clientName,
          companyName: testimonialData.companyName,
        },
      })

      if (existing) {
        // Update existing
        await prisma.testimonial.update({
          where: { id: existing.id },
          data: {
            content: testimonialData.content,
            rating: testimonialData.rating,
            featured: testimonialData.featured,
            projectId: projectId || existing.projectId,
            isApproved: true,
          },
        })
        updated++
        console.log(`🔄 Güncellendi: ${testimonialData.clientName} - ${testimonialData.companyName}`)
      } else {
        // Create new
        await prisma.testimonial.create({
          data: {
            clientName: testimonialData.clientName,
            companyName: testimonialData.companyName,
            position: testimonialData.position,
            content: testimonialData.content,
            rating: testimonialData.rating,
            featured: testimonialData.featured,
            projectId: projectId,
            isApproved: true,
          },
        })
        created++
        console.log(`✅ Oluşturuldu: ${testimonialData.clientName} - ${testimonialData.companyName}`)
      }
    } catch (error: any) {
      console.error(`❌ Hata (${testimonialData.clientName}):`, error.message)
    }
  }

  console.log(`\n📊 Özet:`)
  console.log(`   ✅ Oluşturuldu: ${created}`)
  console.log(`   🔄 Güncellendi: ${updated}`)
  console.log(`   📝 Toplam: ${testimonials.length} referans`)
}

main()
  .catch((e) => {
    console.error("❌ Fatal error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

