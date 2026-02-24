"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Building2 } from "lucide-react"
import { FilterState } from "./ProjectFilters"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  location: string
  coverImage: string | null
  status: string
  featured: boolean
  startDate: Date | null
  area: number | null
  service: {
    title: string
  } | null
}

interface ProjectsListProps {
  projects: Project[]
  filters: FilterState
  viewMode: "grid" | "list"
  onFilteredCountChange?: (count: number) => void
}

export function ProjectsList({ projects, filters, viewMode, onFilteredCountChange }: ProjectsListProps) {
  // Filter projects
  const filteredProjects = projects.filter((project) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Service filter
    if (filters.service !== "all") {
      const projectServiceId = (project.service as any)?.id
      if (!projectServiceId || projectServiceId !== filters.service) {
        return false
      }
    }

    // Status filter
    if (filters.status !== "all" && project.status !== filters.status) {
      return false
    }

    // Year filter
    if (filters.year !== "all" && project.startDate) {
      const projectYear = new Date(project.startDate).getFullYear().toString()
      if (projectYear !== filters.year) return false
    }

    return true
  })

  // Notify parent of filtered count
  if (onFilteredCountChange) {
    onFilteredCountChange(filteredProjects.length)
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-20">
        <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">Proje bulunamadı</p>
        <p className="text-gray-400 text-sm">
          Filtreleri değiştirerek tekrar deneyin
        </p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <Link key={project.id} href={`/projeler/${project.slug}`}>
            <Card className={`group overflow-hidden card-hover card-entrance`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-64 h-64 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden flex-shrink-0">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-blue-500" />
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Öne Çıkan
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === "COMPLETED"
                          ? "bg-green-500 text-white"
                          : project.status === "IN_PROGRESS"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {project.status === "COMPLETED"
                        ? "Tamamlandı"
                        : project.status === "IN_PROGRESS"
                        ? "Devam Ediyor"
                        : project.status === "PLANNING"
                        ? "Planlamada"
                        : "Beklemede"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex-1">
                  {project.service && (
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      {project.service.title}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {project.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                    )}
                    {project.startDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(project.startDate).getFullYear()}
                      </div>
                    )}
                    {project.area && (
                      <div>
                        <span className="font-semibold">Alan:</span> {project.area} m²
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <Link key={project.id} href={`/projeler/${project.slug}`}>
          <Card className={`group overflow-hidden h-full card-hover card-entrance`} style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Project Image */}
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-smooth"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                </div>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Öne Çıkan
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === "COMPLETED"
                      ? "bg-green-500 text-white"
                      : project.status === "IN_PROGRESS"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {project.status === "COMPLETED"
                    ? "Tamamlandı"
                    : project.status === "IN_PROGRESS"
                    ? "Devam Ediyor"
                    : project.status === "PLANNING"
                    ? "Planlamada"
                    : "Beklemede"}
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Service Tag */}
              {project.service && (
                <div className="text-sm text-blue-600 font-semibold mb-2">
                  {project.service.title}
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-500 ease-smooth">
                {project.title}
              </h3>

              {/* Project Info */}
              <div className="space-y-2">
                {project.location && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </div>
                )}

                {project.startDate && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(project.startDate).getFullYear()}
                  </div>
                )}

                {project.area && (
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">Alan:</span> {project.area} m²
                  </div>
                )}
              </div>

              {/* Read More */}
              <div className="mt-4 text-blue-600 font-semibold group-hover:underline">
                Detayları Görüntüle →
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

