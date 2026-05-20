/**
 * SQLite → PostgreSQL (Neon) Veri Taşıma Scripti
 * Çalıştır: node scripts/migrate-sqlite-to-pg.js
 */

const Database = require('better-sqlite3')
const { PrismaClient } = require('@prisma/client')

const sqlite = new Database('prisma/dev.db')
const prisma = new PrismaClient()

function toDate(val) {
  if (!val) return null
  if (val instanceof Date) return val
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

function rows(table) {
  return sqlite.prepare(`SELECT * FROM "${table}"`).all()
}

async function main() {
  console.log('🚀 Taşıma başlıyor...\n')

  // 1. Users
  const users = rows('users')
  for (const u of users) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {},
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role || 'EDITOR',
        image: u.image || null,
        emailVerified: toDate(u.emailVerified),
        createdAt: toDate(u.createdAt) || new Date(),
        updatedAt: toDate(u.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ Users: ${users.length}`)

  // 2. Blog Categories
  const blogCats = rows('blog_categories')
  for (const c of blogCats) {
    await prisma.blogCategory.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description || null,
        order: c.order || 0,
        createdAt: toDate(c.createdAt) || new Date(),
        updatedAt: toDate(c.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ Blog Kategorileri: ${blogCats.length}`)

  // 3. Services
  const services = rows('services')
  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        slug: s.slug,
        title: s.title,
        shortDescription: s.shortDescription,
        description: s.description,
        icon: s.icon || null,
        coverImage: s.coverImage || null,
        order: s.order || 0,
        featured: s.featured === 1 || s.featured === true,
        metaTitle: s.metaTitle || null,
        metaDescription: s.metaDescription || null,
        createdById: s.createdById,
        createdAt: toDate(s.createdAt) || new Date(),
        updatedAt: toDate(s.updatedAt) || new Date(),
        isPublished: s.isPublished === 1 || s.isPublished === true,
      }
    })
  }
  console.log(`✅ Hizmetler: ${services.length}`)

  // 4. Service Processes
  const procs = rows('service_processes')
  for (const p of procs) {
    await prisma.serviceProcess.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        description: p.description,
        order: p.order || 0,
        icon: p.icon || null,
        serviceId: p.serviceId,
      }
    })
  }
  console.log(`✅ Hizmet Süreçleri: ${procs.length}`)

  // 5. Service Materials
  const mats = rows('service_materials')
  for (const m of mats) {
    await prisma.serviceMaterial.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        name: m.name,
        description: m.description || null,
        order: m.order || 0,
        serviceId: m.serviceId,
      }
    })
  }
  console.log(`✅ Hizmet Materyalleri: ${mats.length}`)

  // 6. Projects
  const projects = rows('projects')
  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        location: p.location,
        client: p.client || null,
        startDate: toDate(p.startDate),
        endDate: toDate(p.endDate),
        status: p.status || 'COMPLETED',
        featured: p.featured === 1 || p.featured === true,
        area: p.area || null,
        budget: p.budget || null,
        duration: p.duration || null,
        metaTitle: p.metaTitle || null,
        metaDescription: p.metaDescription || null,
        coverImage: p.coverImage || null,
        serviceId: p.serviceId || null,
        createdById: p.createdById,
        createdAt: toDate(p.createdAt) || new Date(),
        updatedAt: toDate(p.updatedAt) || new Date(),
        publishedAt: toDate(p.publishedAt),
        isPublished: p.isPublished === 1 || p.isPublished === true,
      }
    })
  }
  console.log(`✅ Projeler: ${projects.length}`)

  // 7. Project Images
  const pImages = rows('project_images')
  for (const img of pImages) {
    await prisma.projectImage.upsert({
      where: { id: img.id },
      update: {},
      create: {
        id: img.id,
        url: img.url,
        alt: img.alt || null,
        caption: img.caption || null,
        order: img.order || 0,
        isBefore: img.isBefore === 1 || img.isBefore === true,
        isAfter: img.isAfter === 1 || img.isAfter === true,
        projectId: img.projectId,
        createdAt: toDate(img.createdAt) || new Date(),
      }
    })
  }
  console.log(`✅ Proje Görselleri: ${pImages.length}`)

  // 8. Blog Posts
  const posts = rows('blog_posts')
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.coverImage || null,
        status: p.status || 'PUBLISHED',
        featured: p.featured === 1 || p.featured === true,
        metaTitle: p.metaTitle || null,
        metaDescription: p.metaDescription || null,
        keywords: p.keywords || null,
        viewCount: p.viewCount || 0,
        categoryId: p.categoryId || null,
        createdById: p.createdById,
        createdAt: toDate(p.createdAt) || new Date(),
        updatedAt: toDate(p.updatedAt) || new Date(),
        publishedAt: toDate(p.publishedAt),
      }
    })
  }
  console.log(`✅ Blog Yazıları: ${posts.length}`)

  // 9. Team Members
  const team = rows('team_members')
  for (const t of team) {
    await prisma.teamMember.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        position: t.position,
        bio: t.bio || null,
        image: t.image || null,
        email: t.email || null,
        phone: t.phone || null,
        linkedin: t.linkedin || null,
        order: t.order || 0,
        isPublished: t.isPublished === 1 || t.isPublished === true,
        createdAt: toDate(t.createdAt) || new Date(),
        updatedAt: toDate(t.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ Ekip: ${team.length}`)

  // 10. Testimonials
  const testimonials = rows('testimonials')
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        clientName: t.clientName,
        companyName: t.companyName || null,
        position: t.position || null,
        content: t.content,
        rating: t.rating || 5,
        image: t.image || null,
        featured: t.featured === 1 || t.featured === true,
        projectId: t.projectId || null,
        isApproved: t.isApproved === 1 || t.isApproved === true,
        createdAt: toDate(t.createdAt) || new Date(),
        updatedAt: toDate(t.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ Referanslar/Yorumlar: ${testimonials.length}`)

  // 11. Certificates
  const certs = rows('certificates')
  for (const c of certs) {
    await prisma.certificate.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        title: c.title,
        description: c.description || null,
        issuer: c.issuer || null,
        issueDate: toDate(c.issueDate),
        image: c.image || null,
        pdfUrl: c.pdfUrl || null,
        order: c.order || 0,
        isPublished: c.isPublished === 1 || c.isPublished === true,
        createdAt: toDate(c.createdAt) || new Date(),
        updatedAt: toDate(c.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ Sertifikalar: ${certs.length}`)

  // 12. FAQ Categories
  const faqCats = rows('faq_categories')
  for (const c of faqCats) {
    await prisma.fAQCategory.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || null,
        order: c.order || 0,
        createdAt: toDate(c.createdAt) || new Date(),
        updatedAt: toDate(c.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ SSS Kategorileri: ${faqCats.length}`)

  // 13. FAQ Questions
  const faqQs = rows('faq_questions')
  for (const q of faqQs) {
    await prisma.fAQQuestion.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        question: q.question,
        answer: q.answer,
        order: q.order || 0,
        categoryId: q.categoryId || null,
        isPublished: q.isPublished === 1 || q.isPublished === true,
        createdAt: toDate(q.createdAt) || new Date(),
        updatedAt: toDate(q.updatedAt) || new Date(),
      }
    })
  }
  console.log(`✅ SSS Soruları: ${faqQs.length}`)

  console.log('\n🎉 Taşıma tamamlandı!')
}

main()
  .catch(e => { console.error('❌ Hata:', e.message); process.exit(1) })
  .finally(() => { prisma.$disconnect(); sqlite.close() })
