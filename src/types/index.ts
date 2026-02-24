// Custom type definitions (Prisma uses String types)
export type UserRole = "ADMIN" | "EDITOR" | "VIEWER"
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED"
export type BlogPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"
export type ContactStatus = "PENDING" | "READ" | "REPLIED" | "ARCHIVED"
export type QuoteRequestStatus = "PENDING" | "REVIEWING" | "QUOTED" | "ACCEPTED" | "REJECTED"

// NextAuth type augmentation
declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    image?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter and Sort Types
export interface ProjectFilters {
  status?: ProjectStatus
  serviceId?: string
  featured?: boolean
  search?: string
}

export interface BlogFilters {
  status?: BlogPostStatus
  categoryId?: string
  featured?: boolean
  search?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Dashboard Stats
export interface DashboardStats {
  totalProjects: number
  totalBlogPosts: number
  totalContacts: number
  totalQuoteRequests: number
  recentContacts: number
  recentQuotes: number
  projectsByStatus: {
    planning: number
    inProgress: number
    completed: number
    onHold: number
  }
}

// Analytics Types
export interface PageViewStats {
  page: string
  views: number
}

export interface ConversionStats {
  type: string
  count: number
}

export interface AnalyticsData {
  pageViews: PageViewStats[]
  conversions: ConversionStats[]
  totalPageViews: number
  totalConversions: number
  conversionRate: number
}

// Form Field Types
export interface FormField {
  name: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// Media Upload Types
export interface UploadedFile {
  id: string
  url: string
  filename: string
  type: string
  size: number
  width?: number
  height?: number
}

