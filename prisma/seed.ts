import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kaldetinsaat.com' },
    update: {},
    create: {
      email: 'admin@kaldetinsaat.com',
      name: 'Kaldet Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create Services
  console.log('\n📦 Creating services...')
  const services = [
    {
      slug: 'endustriyel-zemin-betonu',
      title: 'Endüstriyel Zemin Betonu',
      shortDescription: 'Dayanıklı ve uzun ömürlü endüstriyel zemin çözümleri',
      description: '<p>Endüstriyel zemin betonu uygulamalarında 30 yılı aşkın deneyimimizle, fabrika ve depo zeminlerinde mükemmel performans sağlıyoruz.</p><p>Yüksek dayanımlı beton karışımları ve profesyonel uygulama teknikleriyle uzun ömürlü zeminler inşa ediyoruz.</p>',
      coverImage: '/images/services/endustriyel-zemin-betonu.jpg',
      icon: 'Layers',
      order: 1,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'baski-beton-uygulamalari',
      title: 'Baskı Beton Uygulamaları',
      shortDescription: 'Estetik ve fonksiyonel dekoratif beton uygulamaları',
      description: '<p>Baskı beton uygulamalarımızla dış mekanlarınıza estetik ve dayanıklılık katıyoruz.</p><p>Park alanları, yürüyüş yolları, bahçe düzenlemeleri için ideal çözümler sunuyoruz.</p>',
      coverImage: '/images/services/baski-beton.jpg',
      icon: 'Sparkles',
      order: 2,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'epoksi-zemin-kaplama',
      title: 'Epoksi Zemin Kaplama',
      shortDescription: 'Hijyenik ve kolay temizlenebilir epoksi sistemler',
      description: '<p>Epoksi zemin kaplama sistemlerimiz ile hijyenik, kimyasal dayanımlı ve kolay temizlenebilir zeminler elde edin.</p><p>Hastaneler, gıda tesisleri, laboratuvarlar ve temiz odalar için mükemmel çözüm.</p>',
      coverImage: '/images/services/epoksi-zemin.jpg',
      icon: 'Hammer',
      order: 3,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'celik-konstruksiyon',
      title: 'Çelik Konstrüksiyon',
      shortDescription: 'Modern ve güvenli çelik yapı çözümleri',
      description: '<p>Depreme dayanıklı, hızlı montajlı ve ekonomik çelik konstrüksiyon çözümleri.</p><p>Endüstriyel tesisler, depolar, fabrika binaları için profesyonel çelik yapı hizmetleri.</p>',
      coverImage: '/images/services/celik-konstruksiyon.jpg',
      icon: 'Building2',
      order: 4,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'endustri-tesis-bakim-onarim',
      title: 'Endüstri Tesis Bakım-Onarım',
      shortDescription: 'Profesyonel bakım ve onarım hizmetleri',
      description: '<p>Endüstriyel tesislerinizin kesintisiz çalışması için kapsamlı bakım ve onarım hizmetleri sunuyoruz.</p><p>Düzenli bakım ile tesislerinizin ömrünü uzatın, verimliliğini artırın.</p>',
      coverImage: '/images/services/bakim-onarim.jpg',
      icon: 'Wrench',
      order: 5,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'altyapi-uygulamalari',
      title: 'Altyapı Uygulamaları',
      shortDescription: 'Kapsamlı altyapı projeleri ve çözümler',
      description: '<p>Altyapı inşaatı, kanalizasyon sistemleri, yol çalışmaları ve daha fazlası için profesyonel hizmetler.</p><p>Güçlü altyapı, uzun ömürlü yapıların temelidir.</p>',
      coverImage: '/images/services/altyapi.jpg',
      icon: 'Construction',
      order: 6,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'endustriyel-tesisat-uygulamalari',
      title: 'Endüstriyel Tesisat Uygulamaları',
      shortDescription: 'Profesyonel endüstriyel tesisat çözümleri',
      description: '<p>Endüstriyel tesisler için mekanik tesisat, boru hattı, basınçlı hava sistemleri ve proses tesisatı çözümleri sunuyoruz.</p><p>Deneyimli kadromuzla tüm endüstriyel tesisat ihtiyaçlarınızı karşılıyoruz.</p>',
      coverImage: '/images/services/endustriyel-tesisat.jpg',
      icon: 'Zap',
      order: 7,
      featured: true,
      isPublished: true,
      createdById: admin.id,
    },
  ]

  for (const serviceData of services) {
    await prisma.service.upsert({
      where: { slug: serviceData.slug },
      update: {},
      create: serviceData,
    })
  }
  console.log(`✅ Created ${services.length} services`)

  // Add Service Processes
  console.log('\n⚙️  Adding service processes...')
  const serviceProcesses: Record<string, Array<{title: string, description: string}>> = {
    'endustriyel-zemin-betonu': [
      { title: 'Zemin Analizi', description: 'Mevcut zemin durumunun incelenmesi ve gerekli testlerin yapılması' },
      { title: 'Proje Hazırlık', description: 'Beton kalınlığı, donatı ve kalite sınıfı belirlenmesi' },
      { title: 'Zemin Hazırlığı', description: 'Alt zemin sıkıştırma ve drenaj sisteminin oluşturulması' },
      { title: 'Beton Dökümü', description: 'Profesyonel ekiple kesintisiz beton dökümü' },
      { title: 'Kür ve Teslimat', description: 'Beton kürü ve kalite kontrol sonrası teslimat' },
    ],
    'epoksi-zemin-kaplama': [
      { title: 'Yüzey Hazırlığı', description: 'Zemin temizliği ve kumlama ile yüzey hazırlığı' },
      { title: 'Primer Uygulama', description: 'Epoksi astar uygulaması ile yapışma gücü artırma' },
      { title: 'Ana Kaplama', description: 'Çok katmanlı epoksi uygulaması' },
      { title: 'Son Kat', description: 'Cilalı veya mat son kat uygulaması' },
    ],
    'baski-beton-uygulamalari': [
      { title: 'Desen Seçimi', description: 'Müşteri ile desen ve renk belirleme' },
      { title: 'Beton Hazırlığı', description: 'Özel karışım betonun hazırlanması' },
      { title: 'Kalıp Uygulama', description: 'Seçilen desene uygun kalıp basımı' },
      { title: 'Renklendirme', description: 'Özel pigmentler ile renklendirme' },
      { title: 'Koruyucu Kaplama', description: 'UV dayanımlı koruyucu kaplama' },
    ],
    'celik-konstruksiyon': [
      { title: 'Statik Proje', description: 'Statik hesaplar ve proje çizimleri' },
      { title: 'Malzeme Temini', description: 'CE belgeli çelik profillerin temini' },
      { title: 'İmalat', description: 'Fabrikada çelik profil kesim ve kaynak' },
      { title: 'Montaj', description: 'Sahada profesyonel montaj' },
      { title: 'Boya ve Kaplama', description: 'Antipas ve son kat boya uygulaması' },
    ],
    'endustri-tesis-bakim-onarim': [
      { title: 'Keşif ve Analiz', description: 'Mevcut durum analizi ve hasar tespiti' },
      { title: 'Planlama', description: 'Onarım planı ve malzeme listesi' },
      { title: 'Uygulama', description: 'Profesyonel onarım çalışmaları' },
      { title: 'Test ve Kontrol', description: 'Kalite kontrol ve fonksiyon testleri' },
    ],
    'altyapi-uygulamalari': [
      { title: 'Arazi Etüdü', description: 'Zemin etüdü ve topografik çalışmalar' },
      { title: 'Projelendirme', description: 'Altyapı projelerinin hazırlanması' },
      { title: 'Kazı İşleri', description: 'Hassas kazı ve dolgu çalışmaları' },
      { title: 'Boru ve Kanal', description: 'Altyapı sistemlerinin döşenmesi' },
      { title: 'Restorasyon', description: 'Üst yapı restorasyonu ve teslim' },
    ],
  }

  for (const [slug, processes] of Object.entries(serviceProcesses)) {
    const service = await prisma.service.findUnique({ where: { slug } })
    if (service) {
      // Delete existing processes
      await prisma.serviceProcess.deleteMany({ where: { serviceId: service.id } })
      // Create new ones
      for (let i = 0; i < processes.length; i++) {
        await prisma.serviceProcess.create({
          data: {
            serviceId: service.id,
            title: processes[i].title,
            description: processes[i].description,
            order: i + 1,
          },
        })
      }
    }
  }
  console.log('✅ Service processes added')

  // Add Service Materials
  console.log('\n🧱 Adding service materials...')
  const serviceMaterials: Record<string, Array<{name: string, description: string}>> = {
    'endustriyel-zemin-betonu': [
      { name: 'C30/37 Beton', description: 'Yüksek dayanımlı endüstriyel beton sınıfı' },
      { name: 'Çelik Donatı', description: 'S420 sınıfı nervürlü çelik donatı' },
      { name: 'Fiber Katkı', description: 'Çelik veya polipropilen fiber takviye' },
      { name: 'Derz Dolgu', description: 'Poliüretan esaslı derz dolgu malzemesi' },
    ],
    'epoksi-zemin-kaplama': [
      { name: 'Epoksi Reçine', description: 'Self-leveling epoksi reçine sistemi' },
      { name: 'Astar', description: 'Penetrasyon astarı' },
      { name: 'Kuvars Kum', description: 'Kaymaz yüzey için kuvars kum' },
      { name: 'Poliüretan Vernik', description: 'UV dayanımlı koruyucu vernik' },
    ],
    'baski-beton-uygulamalari': [
      { name: 'Özel Beton', description: 'Baskı beton için özel karışım' },
      { name: 'Pigment', description: 'UV dayanımlı mineral pigmentler' },
      { name: 'Kalıplar', description: 'Profesyonel desen kalıpları' },
      { name: 'Sealer', description: 'Koruyucu sealer kaplama' },
    ],
    'celik-konstruksiyon': [
      { name: 'Çelik Profil', description: 'S235/S355 sınıfı çelik profiller' },
      { name: 'Kaynak Malzemesi', description: 'E7018 kaynak elektrodları' },
      { name: 'Cıvata/Somun', description: '8.8 ve 10.9 sınıfı bağlantı elemanları' },
      { name: 'Antipas Boya', description: 'Çinko fosfat astar' },
    ],
  }

  for (const [slug, materials] of Object.entries(serviceMaterials)) {
    const service = await prisma.service.findUnique({ where: { slug } })
    if (service) {
      // Delete existing materials
      await prisma.serviceMaterial.deleteMany({ where: { serviceId: service.id } })
      // Create new ones
      for (let i = 0; i < materials.length; i++) {
        await prisma.serviceMaterial.create({
          data: {
            serviceId: service.id,
            name: materials[i].name,
            description: materials[i].description,
            order: i + 1,
          },
        })
      }
    }
  }
  console.log('✅ Service materials added')

  // Create Projects from website
  console.log('\n🏗️  Creating projects...')
  const allServices = await prisma.service.findMany()
  const zeminService = allServices.find(s => s.slug === 'endustriyel-zemin-betonu')
  const celikService = allServices.find(s => s.slug === 'celik-konstruksiyon')
  const bakimService = allServices.find(s => s.slug === 'endustri-tesis-bakim-onarim')
  const altyapiService = allServices.find(s => s.slug === 'altyapi-uygulamalari')

  const projects = [
    {
      slug: 'vsy-biotechnology-demontaj-montaj',
      title: 'VSY Biotechnology Demontaj ve Montaj',
      description: 'VSY Biotechnology Fabrika demontaj ve montaj işleri. Profesyonel ekip ve modern ekipmanlarla gerçekleştirilen kapsamlı demontaj ve montaj çalışması.',
      location: 'İstanbul',
      client: 'VSY Biotechnology',
      status: 'COMPLETED',
      featured: true,
      area: 2500,
      duration: 45,
      serviceId: bakimService?.id,
      publishedAt: new Date('2023-01-15'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'duravit-tadilat-isleri',
      title: 'Duravit Tadilat İşleri',
      description: 'Duravit Yapı Ürünleri Tuzla Tesisleri Tadilat işleri. Endüstriyel tesis tadilat ve bakım çalışmaları.',
      location: 'Tuzla, İstanbul',
      client: 'Duravit Yapı Ürünleri',
      status: 'COMPLETED',
      featured: true,
      area: 3200,
      duration: 30,
      serviceId: bakimService?.id,
      publishedAt: new Date('2023-03-20'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'cinarli-bahce-tadilat-bakim',
      title: 'Çınarlı Bahçe Tadilat ve Bakım İşleri',
      description: 'Tuzla Çınarlı Bahçe Konutları Tamirat ve Bakım İşleri. Konut kompleksi için kapsamlı bakım ve onarım hizmetleri.',
      location: 'Tuzla, İstanbul',
      client: 'Çınarlı Bahçe Konutları',
      status: 'COMPLETED',
      featured: false,
      area: 1800,
      duration: 21,
      serviceId: bakimService?.id,
      publishedAt: new Date('2023-05-10'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'yamato-cati-tadilat',
      title: 'Yamato Çatı Tadilat İşleri',
      description: 'Yamato Tuzla Fabrikası Çatı Tadilat İşleri. Endüstriyel çatı onarım ve güçlendirme çalışmaları.',
      location: 'Tuzla, İstanbul',
      client: 'Yamato',
      status: 'COMPLETED',
      featured: false,
      area: 4500,
      duration: 35,
      serviceId: bakimService?.id,
      publishedAt: new Date('2023-06-15'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'cam-elyaf-oksijen-uretim-tesisi',
      title: 'Cam Elyaf Oksijen Üretim Tesisi İnşaatı',
      description: 'Cam Elyaf San. A.Ş. Oksijen üretim tesisi için makine temelleri, zemin betonları ve diğer inşaat işlerinin yapılması. Endüstriyel tesis inşaatı projesi.',
      location: 'Kocaeli',
      client: 'Cam Elyaf San. A.Ş.',
      status: 'COMPLETED',
      featured: true,
      area: 8500,
      duration: 60,
      serviceId: zeminService?.id,
      publishedAt: new Date('2023-08-01'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'reysas-cati-tadilati',
      title: 'Reysaş Çatı Tadilatı',
      description: 'Reysaş Lojistik Çayırova bölgesindeki depolarının çatı tadilatlarının yapılması. Lojistik depo çatı onarım ve güçlendirme projesi.',
      location: 'Çayırova, Kocaeli',
      client: 'Reysaş Lojistik',
      status: 'COMPLETED',
      featured: false,
      area: 6000,
      duration: 28,
      serviceId: bakimService?.id,
      publishedAt: new Date('2023-09-20'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'ihi-dalgakiran-celik-konstruksiyon',
      title: 'IHI Dalgakıran Çelik Konstrüksiyon',
      description: 'IHI Dalgakıran için mevcut zemin betonları ve çelik konstrüksiyonların yeni yüklemeler için statik analizlerinin yapılması. Çelik yapı güçlendirme ve statik analiz projesi.',
      location: 'Kocaeli',
      client: 'IHI Dalgakıran',
      status: 'COMPLETED',
      featured: true,
      area: 5200,
      duration: 40,
      serviceId: celikService?.id,
      publishedAt: new Date('2023-11-10'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'enerjisa-hat-modifikasyonu',
      title: 'EnerjiSa Hat Modifikasyonu',
      description: 'EnerjiSA D/G Çevrim Santrali GRP Hat Modifikasyonu ve DN 600 GPR deniz suyu hattı revizyonu yapılması. Endüstriyel tesisat ve altyapı modifikasyon projesi.',
      location: 'Kocaeli',
      client: 'EnerjiSA',
      status: 'COMPLETED',
      featured: true,
      area: 3800,
      duration: 50,
      serviceId: altyapiService?.id,
      publishedAt: new Date('2024-01-15'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'toyota-fabrika-zemin-betonu',
      title: 'Toyota Fabrikası Zemin Betonu',
      description: 'Toyota Türkiye fabrikasında 25.000 m² endüstriyel zemin betonu uygulaması. Ağır yük trafiğine dayanıklı, fiber takviyeli C30/37 beton.',
      location: 'Sakarya',
      client: 'Toyota Türkiye',
      status: 'COMPLETED',
      featured: true,
      area: 25000,
      duration: 45,
      serviceId: zeminService?.id,
      publishedAt: new Date('2024-02-01'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'ceva-lojistik-depo-epoksi',
      title: 'CEVA Lojistik Depo Epoksi Kaplama',
      description: 'CEVA Lojistik depolarında 12.000 m² epoksi zemin kaplama uygulaması. Hijyenik ve kolay temizlenebilir yüzey.',
      location: 'Gebze, Kocaeli',
      client: 'CEVA Lojistik',
      status: 'COMPLETED',
      featured: true,
      area: 12000,
      duration: 30,
      serviceId: allServices.find(s => s.slug === 'epoksi-zemin-kaplama')?.id,
      publishedAt: new Date('2024-03-15'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'ford-otosan-bakim-onarim',
      title: 'Ford Otosan Bakım Onarım',
      description: 'Ford Otosan tesislerinde kapsamlı bakım ve onarım çalışmaları. Üretim hattı ve depo alanlarının yenilenmesi.',
      location: 'Kocaeli',
      client: 'Ford Otosan',
      status: 'IN_PROGRESS',
      featured: false,
      area: 8000,
      duration: 60,
      serviceId: bakimService?.id,
      publishedAt: new Date('2024-11-01'),
      isPublished: true,
      createdById: admin.id,
    },
    {
      slug: 'arcelik-fabrika-altyapi',
      title: 'Arçelik Fabrika Altyapı',
      description: 'Arçelik fabrikasında altyapı yenileme ve genişletme projesi. Kanalizasyon, elektrik ve su şebekesi.',
      location: 'Çerkezköy, Tekirdağ',
      client: 'Arçelik A.Ş.',
      status: 'PLANNING',
      featured: false,
      area: 15000,
      serviceId: altyapiService?.id,
      isPublished: true,
      createdById: admin.id,
    },
  ]

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: projectData,
    })
  }
  console.log(`✅ Created ${projects.length} projects`)

  // Create FAQ Categories and Questions
  console.log('\n❓ Creating FAQ categories and questions...')
  
  const faqCategories = [
    {
      name: 'Genel Sorular',
      slug: 'genel-sorular',
      order: 1,
      questions: [
        {
          question: 'Kaldet İnşaat ne zaman kuruldu?',
          answer: 'Kaldet İnşaat, 2016 yılı Mart ayında İsmail Kaya tarafından kurulmuştur. Kurucumuz, 1999-2004 yılları arasında özel bir inşaat şirketinde Endüstriyel Zemin Betonu, Endüstri Bina İnşaatı ve Altyapı İnşaatı projelerinde Şantiye Şefliği görevlerinde bulunmuştur.',
          order: 1,
        },
        {
          question: 'Hangi bölgelerde hizmet veriyorsunuz?',
          answer: 'Türkiye genelinde hizmet vermekteyiz. Özellikle İstanbul, Kocaeli, Sakarya, Bursa ve çevre illerde yoğun olarak çalışmaktayız. Tüm Türkiye\'de projeler gerçekleştirebiliriz.',
          order: 2,
        },
        {
          question: 'Proje süreleri ne kadar?',
          answer: 'Proje süreleri, projenin büyüklüğüne ve kapsamına göre değişiklik göstermektedir. Küçük ölçekli projeler 1-2 hafta içinde tamamlanırken, büyük ölçekli endüstriyel projeler birkaç ay sürebilir. Detaylı süre bilgisi için ücretsiz teklif alabilirsiniz.',
          order: 3,
        },
        {
          question: 'Garanti süreniz ne kadar?',
          answer: 'Tüm işlerimizde garanti vermekteyiz. Garanti süreleri hizmet türüne göre değişiklik göstermektedir. Genellikle 2-5 yıl arasında garanti süreleri sunmaktayız. Detaylı garanti bilgisi için bizimle iletişime geçebilirsiniz.',
          order: 4,
        },
      ],
    },
    {
      name: 'Hizmetler Hakkında',
      slug: 'hizmetler-hakkinda',
      order: 2,
      questions: [
        {
          question: 'Endüstriyel zemin betonu nedir?',
          answer: 'Endüstriyel zemin betonu, fabrika, depo ve üretim tesisleri gibi ağır yük taşıyan alanlar için özel olarak tasarlanmış yüksek dayanımlı beton çözümleridir. Yüksek basınç dayanımı, aşınma direnci ve uzun ömürlülük sağlar.',
          order: 1,
        },
        {
          question: 'Epoksi zemin kaplama nerelerde kullanılır?',
          answer: 'Epoksi zemin kaplama, hijyen gerektiren alanlarda (hastaneler, gıda tesisleri, temiz odalar), kimyasal dayanım gerektiren endüstriyel tesislerde ve estetik görünüm istenen ticari alanlarda kullanılır. Kolay temizlenebilir ve uzun ömürlüdür.',
          order: 2,
        },
        {
          question: 'Baskı beton uygulaması ne kadar sürer?',
          answer: 'Baskı beton uygulama süresi, alan büyüklüğüne ve desen karmaşıklığına göre değişir. 100 m² alan için yaklaşık 3-5 gün sürmektedir. Büyük alanlar için daha detaylı süre bilgisi teklif aşamasında verilir.',
          order: 3,
        },
        {
          question: 'Çelik konstrüksiyon yapıların avantajları nelerdir?',
          answer: 'Çelik konstrüksiyon yapılar hızlı montaj, depreme dayanıklılık, esneklik, uzun ömür ve çevre dostu olma gibi avantajlar sunar. Ayrıca bakım maliyetleri düşüktür ve genişletme imkanı sağlar.',
          order: 4,
        },
      ],
    },
    {
      name: 'Fiyatlandırma ve Ödeme',
      slug: 'fiyatlandirma-odeme',
      order: 3,
      questions: [
        {
          question: 'Fiyat teklifi nasıl alabilirim?',
          answer: 'Web sitemizdeki "Teklif Hesapla" bölümünden online teklif alabilir veya iletişim formunu doldurarak detaylı teklif talep edebilirsiniz. Ayrıca telefon (0262 642 2058) veya e-posta (info@kaldetinsaat.com) ile de bizimle iletişime geçebilirsiniz.',
          order: 1,
        },
        {
          question: 'Fiyatlar neye göre belirleniyor?',
          answer: 'Fiyatlar, projenin büyüklüğü, kullanılacak malzeme kalitesi, işçilik zorluğu, lokasyon ve teslim süresi gibi faktörlere göre belirlenmektedir. Her proje için özel fiyatlandırma yapılmaktadır.',
          order: 2,
        },
        {
          question: 'Ödeme koşulları nasıl?',
          answer: 'Ödeme koşulları projeye göre değişiklik göstermektedir. Genellikle peşin, avans ve vade seçenekleri sunulmaktadır. Detaylı ödeme planı teklif aşamasında belirlenir.',
          order: 3,
        },
        {
          question: 'Online teklif hesaplama aracındaki fiyatlar kesin mi?',
          answer: 'Online teklif hesaplama aracındaki fiyatlar tahmini fiyatlardır. Kesin fiyat için proje detaylarının incelenmesi ve yerinde keşif yapılması gerekmektedir. Ücretsiz keşif hizmetimizden yararlanabilirsiniz.',
          order: 4,
        },
      ],
    },
    {
      name: 'Proje Süreci',
      slug: 'proje-sureci',
      order: 4,
      questions: [
        {
          question: 'Proje süreci nasıl işliyor?',
          answer: 'Proje sürecimiz şu aşamalardan oluşur: 1) İlk görüşme ve ihtiyaç analizi, 2) Yerinde keşif, 3) Teklif hazırlama, 4) Sözleşme, 5) Proje planlama, 6) Uygulama, 7) Kontrol ve teslim, 8) Garanti ve bakım hizmetleri.',
          order: 1,
        },
        {
          question: 'Keşif ücretsiz mi?',
          answer: 'Evet, yerinde keşif hizmetimiz tamamen ücretsizdir. Projenizin detaylarını inceleyerek en doğru teklifi hazırlamak için keşif yapmaktayız.',
          order: 2,
        },
        {
          question: 'Proje sırasında iletişim nasıl sağlanıyor?',
          answer: 'Her projede bir proje sorumlusu atanır ve süreç boyunca düzenli olarak bilgilendirme yapılır. Telefon, e-posta ve WhatsApp üzerinden 7/24 iletişim kurabilirsiniz.',
          order: 3,
        },
        {
          question: 'Proje sırasında değişiklik yapılabilir mi?',
          answer: 'Evet, proje sırasında değişiklik talepleri değerlendirilir. Değişikliklerin maliyet ve süre etkisi analiz edilerek onayınıza sunulur.',
          order: 4,
        },
      ],
    },
  ]

  for (const categoryData of faqCategories) {
    const { questions, ...categoryInfo } = categoryData
    const category = await prisma.fAQCategory.upsert({
      where: { slug: categoryInfo.slug },
      update: {},
      create: categoryInfo,
    })

    for (const questionData of questions) {
      const existingQuestion = await prisma.fAQQuestion.findFirst({
        where: {
          categoryId: category.id,
          question: questionData.question,
        },
      })

      if (!existingQuestion) {
        await prisma.fAQQuestion.create({
          data: {
            ...questionData,
            categoryId: category.id,
          },
        })
      }
    }
  }
  console.log(`✅ Created ${faqCategories.length} FAQ categories with questions`)

  // Create Blog Categories
  console.log('\n📝 Creating blog categories...')
  const blogCategories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'endustriyel-insaat' },
      update: {},
      create: {
        name: 'Endüstriyel İnşaat',
        slug: 'endustriyel-insaat',
        description: 'Endüstriyel inşaat projeleri ve uygulamaları hakkında bilgiler',
        order: 1,
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'zemin-sistemleri' },
      update: {},
      create: {
        name: 'Zemin Sistemleri',
        slug: 'zemin-sistemleri',
        description: 'Endüstriyel zemin betonu, epoksi ve baskı beton uygulamaları',
        order: 2,
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'proje-hikayeleri' },
      update: {},
      create: {
        name: 'Proje Hikayeleri',
        slug: 'proje-hikayeleri',
        description: 'Tamamlanan projelerimizden başarı hikayeleri',
        order: 3,
      },
    }),
  ])

  // Create Blog Posts
  console.log('📰 Creating blog posts...')
  const blogPosts = [
    {
      slug: 'endustriyel-zemin-betonu-avantajlari',
      title: 'Endüstriyel Zemin Betonu Avantajları ve Uygulama Teknikleri',
      excerpt: 'Endüstriyel zemin betonu, fabrika ve depolarda uzun ömürlü ve dayanıklı zeminler için en iyi çözümdür. Bu yazımızda avantajlarını ve uygulama tekniklerini inceliyoruz.',
      content: '<h2>Endüstriyel Zemin Betonu Nedir?</h2><p>Endüstriyel zemin betonu, yüksek yük taşıma kapasitesi ve aşınma direnci gerektiren alanlarda kullanılan özel beton karışımlarıdır. Fabrikalar, depolar, lojistik merkezleri ve üretim tesislerinde tercih edilir.</p><h3>Avantajları</h3><ul><li>Yüksek basınç dayanımı</li><li>Aşınma direnci</li><li>Uzun ömür</li><li>Kolay bakım</li><li>Maliyet etkinliği</li></ul><h3>Uygulama Süreci</h3><p>Kaliteli bir endüstriyel zemin betonu uygulaması için zemin hazırlığı, doğru beton karışımı ve profesyonel uygulama şarttır. Kaldet İnşaat olarak 30 yıllık deneyimimizle en kaliteli uygulamaları gerçekleştiriyoruz.</p>',
      coverImage: '/images/blog/endustriyel-zemin-betonu.jpg',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
      categoryId: blogCategories[0].id,
      createdById: admin.id,
    },
    {
      slug: 'epoksi-zemin-kaplama-rehberi',
      title: 'Epoksi Zemin Kaplama: Kapsamlı Rehber ve İpuçları',
      excerpt: 'Epoksi zemin kaplama sistemleri hijyenik, dayanıklı ve estetik çözümler sunar. Bu rehberde epoksi zemin hakkında bilmeniz gereken her şeyi bulabilirsiniz.',
      content: '<h2>Epoksi Zemin Kaplama Nedir?</h2><p>Epoksi zemin kaplama, reçine bazlı, iki bileşenli kimyasal dayanımlı bir zemin sistemidir. Özellikle hijyen gerektiren alanlarda tercih edilir.</p><h3>Kullanım Alanları</h3><ul><li>Hastaneler ve sağlık tesisleri</li><li>Gıda üretim tesisleri</li><li>İlaç fabrikaları</li><li>Temiz odalar</li><li>Ticari alanlar</li></ul><h3>Neden Epoksi?</h3><p>Kolay temizlenebilir yüzeyi, kimyasal dayanımı ve uzun ömrü ile epoksi zemin kaplama, endüstriyel alanlarda vazgeçilmez bir çözümdür.</p>',
      coverImage: '/images/blog/epoksi-zemin.jpg',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-02-01'),
      categoryId: blogCategories[1].id,
      createdById: admin.id,
    },
    {
      slug: 'baski-beton-dis-mekan-tasarimi',
      title: 'Baskı Beton ile Dış Mekan Tasarımı: Yaratıcı Fikirler',
      excerpt: 'Baskı beton uygulamaları ile bahçenize, park alanlarınıza ve yürüyüş yollarınıza estetik ve dayanıklılık kazandırın.',
      content: '<h2>Baskı Beton Nedir?</h2><p>Baskı beton, taze betonun yüzeyine özel kalıplar ve renklerle desen verilmesi işlemidir. Doğal taş, tuğla, ahşap ve diğer dokuları taklit edebilir.</p><h3>Avantajları</h3><ul><li>Estetik görünüm</li><li>Dayanıklılık</li><li>Uygun maliyet</li><li>Kolay bakım</li><li>Geniş renk ve desen seçeneği</li></ul><h3>Kullanım Alanları</h3><p>Yürüyüş yolları, park alanları, havuz kenarları, bahçe düzenlemeleri, otopark alanları ve daha fazlası için idealdir.</p>',
      coverImage: '/images/blog/baski-beton.jpg',
      featured: false,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-02-15'),
      categoryId: blogCategories[1].id,
      createdById: admin.id,
    },
    {
      slug: 'celik-konstruksiyon-avantajlari',
      title: 'Çelik Konstrüksiyon Yapıların Avantajları ve Modern Uygulamalar',
      excerpt: 'Çelik konstrüksiyon yapılar modern mimarinin vazgeçilmezi. Hızlı montaj, deprem dayanımı ve esneklik avantajlarını keşfedin.',
      content: '<h2>Çelik Konstrüksiyon Nedir?</h2><p>Çelik konstrüksiyon, çelik profillerin kullanıldığı taşıyıcı sistem uygulamalarıdır. Modern yapılarda sıklıkla tercih edilmektedir.</p><h3>Avantajları</h3><ul><li>Hızlı montaj süresi</li><li>Depreme dayanıklılık</li><li>Geniş açıklık imkanı</li><li>Esneklik ve genişletilebilirlik</li><li>Çevre dostu</li><li>Uzun ömür</li></ul><h3>Modern Uygulamalar</h3><p>Fabrika binaları, depolar, spor salonları, havalimanları ve ticari yapılarda yaygın olarak kullanılmaktadır.</p>',
      coverImage: '/images/blog/celik-konstruksiyon.jpg',
      featured: false,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-03-01'),
      categoryId: blogCategories[0].id,
      createdById: admin.id,
    },
    {
      slug: 'toyota-fabrika-projesi-basari-hikayesi',
      title: 'Toyota Fabrikası Projesi: Bir Başarı Hikayesi',
      excerpt: 'Toyota fabrikasında gerçekleştirdiğimiz endüstriyel zemin betonu projesinin detayları ve başarı hikayes.',
      content: '<h2>Proje Özeti</h2><p>Toyota Türkiye fabrikasında 25.000 m² endüstriyel zemin betonu uygulamamız, sektördeki en kapsamlı projelerimizden biriydi.</p><h3>Proje Detayları</h3><ul><li>Alan: 25.000 m²</li><li>Süre: 45 gün</li><li>Beton Sınıfı: C30/37</li><li>Ekip: 25 kişi</li></ul><h3>Zorluklar ve Çözümler</h3><p>Fabrika üretimi devam ederken çalışmak zordu. Gece vardiyaları ve hassas planlama ile işi zamanında tamamladık.</p><h3>Sonuç</h3><p>Müşteri memnuniyeti %100 seviyesinde. Zemin 5 yıldır sorunsuz kullanılıyor.</p>',
      coverImage: '/images/blog/toyota-proje.jpg',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-03-15'),
      categoryId: blogCategories[2].id,
      createdById: admin.id,
    },
  ]

  for (const postData of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }
  console.log(`✅ Created ${blogPosts.length} blog posts`)

  // Create Testimonials
  console.log('\n⭐ Creating testimonials...')
  const testimonials = [
    {
      clientName: 'Ahmet Yılmaz',
      companyName: 'Toyota Türkiye',
      position: 'Fabrika Müdürü',
      rating: 5,
      content: 'Kaldet İnşaat ile çalışmak bizim için büyük bir şanstı. Endüstriyel zemin betonu uygulamasında gösterdikleri profesyonellik ve zamanında teslimat, projemizin başarısını sağladı. Ekibin yaklaşımı ve kalite anlayışı gerçekten takdire şayan.',
      featured: true,
      isApproved: true,
      createdAt: new Date('2023-06-15'),
    },
    {
      clientName: 'Mehmet Demir',
      companyName: 'CEVA Lojistik',
      position: 'Tesis Yöneticisi',
      rating: 5,
      content: 'Depo zemin uygulamasında Kaldet İnşaat\'ın deneyimi ve kaliteli işçiliği sayesinde sorunsuz bir proje tamamladık. Ağır yük trafiğine dayanıklı zemin, operasyonlarımızı kesintisiz sürdürmemize olanak sağlıyor. Teşekkürler!',
      featured: true,
      isApproved: true,
      createdAt: new Date('2023-08-20'),
    },
    {
      clientName: 'Ayşe Kaya',
      companyName: 'Enerjisa',
      position: 'Proje Müdürü',
      rating: 5,
      content: 'Enerjisa tesislerimizde yapılan epoksi zemin kaplama işi mükemmel sonuç verdi. Hijyenik ve kolay temizlenebilir yüzey, gıda güvenliği standartlarımıza tam uyum sağladı. Profesyonel ekiple çalışmak çok keyifliydi.',
      featured: true,
      isApproved: true,
      createdAt: new Date('2023-09-10'),
    },
    {
      clientName: 'Serkan Yıldız',
      companyName: 'İHH Dalgakıran',
      position: 'Proje Koordinatörü',
      rating: 5,
      content: 'Çelik konstrüksiyon projemizde Kaldet İnşaat\'ın uzmanlığı işimizi kolaylaştırdı. Statik analizler doğru yapıldı ve güçlendirme işleri sorunsuz tamamlandı.',
      featured: false,
      isApproved: true,
      createdAt: new Date('2023-10-05'),
    },
    {
      clientName: 'Gülay Korkmaz',
      companyName: 'İlaç Üretim Firması',
      position: 'Tesis Yöneticisi',
      rating: 5,
      content: 'Temiz oda standartlarına uygun zemin uygulaması için Kaldet İnşaat ile çalıştık. Toz tutmayan ve hijyenik yüzey, üretim kalitemizi artırdı. Profesyonel ekip ve kaliteli hizmet için teşekkürler.',
      featured: false,
      isApproved: true,
      createdAt: new Date('2023-11-12'),
    },
  ]

  let testimonialsCreated = 0
  for (const testimonialData of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: {
        clientName: testimonialData.clientName,
        companyName: testimonialData.companyName,
      }
    })

    if (!existing) {
      await prisma.testimonial.create({
        data: testimonialData,
      })
      testimonialsCreated++
    }
  }
  console.log(`✅ Created ${testimonialsCreated} testimonials`)

  // Create Certificates
  console.log('\n📜 Creating certificates...')
  const certificates = [
    {
      title: 'ISO 9001:2015 Kalite Yönetim Sistemi',
      description: 'Uluslararası kalite yönetim sistemi standardı sertifikası',
      issuer: 'TSE',
      issueDate: new Date('2022-03-15'),
      order: 1,
      isPublished: true,
    },
    {
      title: 'ISO 14001:2015 Çevre Yönetim Sistemi',
      description: 'Çevresel sürdürülebilirlik ve çevre yönetimi sertifikası',
      issuer: 'TSE',
      issueDate: new Date('2022-03-15'),
      order: 2,
      isPublished: true,
    },
    {
      title: 'ISO 45001:2018 İş Sağlığı ve Güvenliği',
      description: 'İş sağlığı ve güvenliği yönetim sistemi sertifikası',
      issuer: 'TSE',
      issueDate: new Date('2022-05-20'),
      order: 3,
      isPublished: true,
    },
    {
      title: 'CE Belgesi - Yapı Malzemeleri',
      description: 'Avrupa Birliği yapı malzemeleri uygunluk sertifikası',
      issuer: 'Eurolab',
      issueDate: new Date('2023-01-10'),
      order: 4,
      isPublished: true,
    },
    {
      title: 'İş Güvenliği Uzmanlığı Belgesi',
      description: 'A Sınıfı iş güvenliği uzmanlığı yetki belgesi',
      issuer: 'Çalışma ve Sosyal Güvenlik Bakanlığı',
      issueDate: new Date('2021-06-01'),
      order: 5,
      isPublished: true,
    },
  ]

  for (const certData of certificates) {
    const existing = await prisma.certificate.findFirst({
      where: { title: certData.title }
    })
    if (!existing) {
      await prisma.certificate.create({ data: certData })
    }
  }
  console.log(`✅ Created ${certificates.length} certificates`)

  // Create Team Members
  console.log('\n👥 Creating team members...')
  const teamMembers = [
    {
      name: 'İsmail Kaya',
      position: 'Genel Müdür & Kurucu',
      bio: '1999-2004 yılları arasında özel inşaat şirketinde Şantiye Şefliği görevlerinde bulunmuş, 2016 yılında Kaldet İnşaat\'ı kurmuştur. Endüstriyel zemin betonu, çelik konstrüksiyon ve altyapı projelerinde 25 yılı aşkın deneyime sahiptir.',
      email: 'ismail@kaldetinsaat.com',
      phone: '+90 532 XXX XX XX',
      order: 1,
      isPublished: true,
    },
    {
      name: 'Ahmet Çelik',
      position: 'Proje Müdürü',
      bio: '15 yıllık sektör deneyimi ile endüstriyel projelerin yönetiminden sorumludur. İnşaat Mühendisliği mezunu olup, büyük ölçekli fabrika ve depo projelerinde uzmanlaşmıştır.',
      email: 'ahmet@kaldetinsaat.com',
      order: 2,
      isPublished: true,
    },
    {
      name: 'Mehmet Yılmaz',
      position: 'Şantiye Şefi',
      bio: 'Saha operasyonlarının koordinasyonundan sorumludur. Beton uygulamaları ve çelik montaj konularında uzmanlaşmıştır.',
      order: 3,
      isPublished: true,
    },
    {
      name: 'Fatma Demir',
      position: 'Kalite Kontrol Uzmanı',
      bio: 'Tüm projelerde kalite standartlarının uygulanmasını denetler. ISO 9001 iç denetçi sertifikasına sahiptir.',
      order: 4,
      isPublished: true,
    },
  ]

  for (const memberData of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: memberData.name }
    })
    if (!existing) {
      await prisma.teamMember.create({ data: memberData })
    }
  }
  console.log(`✅ Created ${teamMembers.length} team members`)

  console.log('\n🎉 Seeding complete!')
  console.log('\n📊 Database Summary:')
  console.log('   👤 Admin: admin@kaldetinsaat.com / admin123')
  console.log(`   📦 Services: ${services.length}`)
  console.log(`   🏗️  Projects: ${projects.length}`)
  console.log(`   ❓ FAQ Categories: ${faqCategories.length}`)
  console.log(`   📝 Blog Posts: ${blogPosts.length}`)
  console.log(`   ⭐ Testimonials: ${testimonials.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
