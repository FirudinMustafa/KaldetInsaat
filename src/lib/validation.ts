import { z } from "zod"

// Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir email adresi girin"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
  projectType: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Quote Request
export const quoteRequestSchema = z.object({
  name: z.string().min(2, "İsim gerekli"),
  email: z.string().email("Geçerli email gerekli"),
  phone: z.string().min(10, "Geçerli telefon gerekli"),
  companyName: z.string().optional(),
  serviceId: z.string().optional(),
  projectType: z.string().min(1, "Proje tipi seçin"),
  area: z.number().positive("Alan pozitif olmalı"),
  location: z.string().min(1, "Konum gerekli"),
  description: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>

// Project
export const projectSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter"),
  slug: z.string().min(3, "Slug gerekli"),
  description: z.string().optional().default(""),
  location: z.string().optional(),
  client: z.string().optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]),
  serviceId: z.string().optional().nullable(),
  area: z.number().optional().nullable(),
  budget: z.number().optional().nullable(),
  duration: z.number().optional().nullable(),
  startDate: z.union([z.date(), z.string()]).optional().nullable(),
  endDate: z.union([z.date(), z.string()]).optional().nullable(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
})

export type ProjectData = z.infer<typeof projectSchema>

// Service
export const serviceSchema = z.object({
  title: z.string().min(3, "Başlık gerekli"),
  slug: z.string().min(3, "Slug gerekli"),
  shortDescription: z.string().min(10, "Kısa açıklama gerekli"),
  description: z.string().min(20, "Detaylı açıklama gerekli"),
  icon: z.string().optional(),
  coverImage: z.string().optional(),
  order: z.number().default(0),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean().default(false),
})

export type ServiceData = z.infer<typeof serviceSchema>

// Blog Post
export const blogPostSchema = z.object({
  title: z.string().min(3, "Başlık gerekli"),
  slug: z.string().min(3, "Slug gerekli"),
  excerpt: z.string().min(10, "Özet gerekli"),
  content: z.string().min(50, "İçerik gerekli"),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),
})

export type BlogPostData = z.infer<typeof blogPostSchema>

// Team Member
export const teamMemberSchema = z.object({
  name: z.string().min(2, "İsim gerekli"),
  position: z.string().min(2, "Pozisyon gerekli"),
  bio: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  order: z.number().default(0),
  isPublished: z.boolean().default(true),
})

export type TeamMemberData = z.infer<typeof teamMemberSchema>

// Testimonial
export const testimonialSchema = z.object({
  clientName: z.string().min(2, "İsim gerekli"),
  companyName: z.string().optional(),
  position: z.string().optional(),
  content: z.string().min(10, "Yorum içeriği gerekli"),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().optional(),
  projectId: z.string().optional(),
  featured: z.boolean().default(false),
  isApproved: z.boolean().default(false),
})

export type TestimonialData = z.infer<typeof testimonialSchema>

// User (Admin)
export const userSchema = z.object({
  name: z.string().min(2, "İsim gerekli"),
  email: z.string().email("Geçerli email gerekli"),
  password: z.string().min(6, "Şifre en az 6 karakter").optional(),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
  image: z.string().optional(),
})

export type UserData = z.infer<typeof userSchema>

// Login
export const loginSchema = z.object({
  email: z.string().email("Geçerli email adresi girin"),
  password: z.string().min(1, "Şifre gerekli"),
})

export type LoginData = z.infer<typeof loginSchema>

// FAQ
export const faqSchema = z.object({
  question: z.string().min(5, "Soru en az 5 karakter olmalı"),
  answer: z.string().min(10, "Cevap en az 10 karakter olmalı"),
  categoryId: z.string().optional(),
  order: z.number().default(0),
  isPublished: z.boolean().default(true),
})

export type FAQData = z.infer<typeof faqSchema>

// Certificate
export const certificateSchema = z.object({
  title: z.string().min(3, "Başlık gerekli"),
  description: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.date().optional(),
  image: z.string().optional(),
  pdfUrl: z.string().optional(),
  order: z.number().default(0),
  isPublished: z.boolean().default(true),
})

export type CertificateData = z.infer<typeof certificateSchema>
