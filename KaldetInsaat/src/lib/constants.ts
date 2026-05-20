// Site Configuration
export const SITE_CONFIG = {
  name: "Kaldet İnşaat",
  description: "Endüstriyel zemin betonu, baskı beton, epoksi kaplama ve inşaat çözümleri",
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
}

// Service Types
export const SERVICES = [
  {
    slug: "endustriyel-zemin-betonu",
    title: "Endüstriyel Zemin Betonu",
    icon: "building",
  },
  {
    slug: "baski-beton-uygulamalari",
    title: "Baskı Beton Uygulamaları",
    icon: "stamp",
  },
  {
    slug: "epoksi-zemin-kaplama",
    title: "Epoksi Zemin Kaplama",
    icon: "paint-bucket",
  },
  {
    slug: "celik-konstruksiyon",
    title: "Çelik Konstrüksiyon",
    icon: "building-2",
  },
  {
    slug: "endustri-tesis-bakim-onarim",
    title: "Endüstri Tesisleri Bakım, Onarım ve Tadilat",
    icon: "wrench",
  },
  {
    slug: "altyapi-uygulamalari",
    title: "Altyapı Uygulamaları",
    icon: "construction",
  },
  {
    slug: "endustriyel-tesisat-uygulamalari",
    title: "Endüstriyel Tesisat Uygulamaları",
    icon: "zap",
  },
] as const

// Project Status
export const PROJECT_STATUS = {
  PLANNING: "Planlanıyor",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED: "Tamamlandı",
  ON_HOLD: "Beklemede",
} as const

// Blog Status
export const BLOG_STATUS = {
  DRAFT: "Taslak",
  PUBLISHED: "Yayınlandı",
  ARCHIVED: "Arşivlendi",
} as const

// Contact Status
export const CONTACT_STATUS = {
  NEW: "Yeni",
  READ: "Okundu",
  REPLIED: "Yanıtlandı",
  ARCHIVED: "Arşivlendi",
} as const

// Quote Request Status
export const QUOTE_STATUS = {
  PENDING: "Bekliyor",
  REVIEWING: "İnceleniyor",
  QUOTED: "Teklif Verildi",
  ACCEPTED: "Kabul Edildi",
  REJECTED: "Reddedildi",
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: "Yönetici",
  EDITOR: "Editör",
  VIEWER: "Görüntüleyici",
} as const

// Pagination
export const ITEMS_PER_PAGE = {
  PROJECTS: 9,
  BLOG: 10,
  ADMIN_TABLE: 20,
  TESTIMONIALS: 6,
} as const

// File Upload
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf"],
} as const

// Quote Calculator Base Prices (per m2) - 2025-2026 Türkiye Piyasa Fiyatları
export const QUOTE_BASE_PRICES = {
  "endustriyel-zemin-betonu": 950,
  "baski-beton-uygulamalari": 650,
  "epoksi-zemin-kaplama": 550,
  "celik-konstruksiyon": 2000,
  "endustri-tesis-bakim-onarim": 400,
  "altyapi-uygulamalari": 750,
  "endustriyel-tesisat-uygulamalari": 600,
} as const

// Email Addresses
export const EMAIL_ADDRESSES = {
  ADMIN: process.env.SMTP_USER || "admin@kaldetinsaat.com",
  INFO: "info@kaldetinsaat.com",
  SUPPORT: "destek@kaldetinsaat.com",
} as const

// Contact Information
export const CONTACT_INFO = {
  PHONE: "+90 262 642 2058",
  PHONE_DISPLAY: "0262 642 2058",
  FAX: "0262 642 5058",
  EMAIL: "info@kaldetinsaat.com",
  ADDRESS: "İnönü Mah. Güzeller OSB. Ziya Gökalp Cad. No:8 Gebze / Kocaeli",
  WORKING_HOURS: "Pazartesi - Cuma: 08:00 - 18:00, Cumartesi: 09:00 - 14:00",
  GOOGLE_MAPS_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.8!2d29.4406!3d40.8334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb2079b6a7ce87%3A0xd0a96642166bef7a!2sKaldet%20M%C3%BChendislik%20ve%20%C4%B0n%C5%9Faat%20Tic.%20Ltd.%20%C5%9Eti.!5e0!3m2!1str!2str!4v1705000000000!5m2!1str!2str",
} as const

// Social Media
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/kaldetinsaat",
  INSTAGRAM: "https://instagram.com/kaldetinsaat",
  LINKEDIN: "https://www.linkedin.com/company/kaldet-m%C3%BChendislik-ve-in%C5%9Faat-tic.-ltd.-%C5%9Fti./",
  YOUTUBE: "https://youtube.com/@kaldetinsaat",
} as const

// Navigation
export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/iletisim", label: "İletişim" },
] as const

// Admin Sidebar Navigation
export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/admin/projeler", label: "Projeler", icon: "folder" },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: "briefcase" },
  { href: "/admin/blog", label: "Blog", icon: "newspaper" },
  { href: "/admin/ekip", label: "Ekip", icon: "users" },
  { href: "/admin/referanslar", label: "Referanslar", icon: "star" },
  { href: "/admin/sertifikalar", label: "Sertifikalar", icon: "award" },
  { href: "/admin/iletisim-formlari", label: "İletişim Formları", icon: "mail" },
  { href: "/admin/teklif-talepleri", label: "Teklif Talepleri", icon: "calculator" },
  { href: "/admin/medya", label: "Medya", icon: "image" },
  { href: "/admin/sss", label: "SSS", icon: "help-circle" },
  { href: "/admin/seo", label: "SEO", icon: "search" },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "settings" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "user-cog" },
  { href: "/admin/analitik", label: "Analitik", icon: "bar-chart" },
] as const

// Client Logos - Centralized list for consistency
export const CLIENT_LOGOS = [
  { name: "Toyota", logo: "/images/clients/toyota.png" },
  { name: "IHI Dalgakıran", logo: "/images/clients/ihi-dalgakiran.png" },
  { name: "Enerjisa", logo: "/images/clients/enerjisa.png" },
  { name: "Reysaş Lojistik", logo: "/images/clients/reysas.png" },
  { name: "CEVA Lojistik", logo: "/images/clients/ceva-lojistik.png" },
  { name: "Ekol Lojistik", logo: "/images/clients/ekol-lojistik.png" },
  { name: "Autoliv", logo: "/images/clients/autoliv.png" },
  { name: "Bosch", logo: "/images/clients/bosch.svg" },
  { name: "Mercedes-Benz", logo: "/images/clients/mercedes.svg" },
  { name: "Ford Otosan", logo: "/images/clients/ford.svg" },
  { name: "Hyundai", logo: "/images/clients/hyundai.svg" },
  { name: "Arçelik", logo: "/images/clients/arcelik.svg" },
  { name: "Vestel", logo: "/images/clients/vestel.svg" },
  { name: "Tüpraş", logo: "/images/clients/tupras.svg" },
  { name: "DHL", logo: "/images/clients/dhl.svg" },
  { name: "Kordsa", logo: "/images/clients/kordsa.svg" },
] as const
