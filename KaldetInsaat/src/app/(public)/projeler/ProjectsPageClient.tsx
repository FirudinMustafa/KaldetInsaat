"use client"

import { useState } from "react"
import { ProjectFilters, FilterState } from "@/components/projects/ProjectFilters"
import { ProjectsList } from "@/components/projects/ProjectsList"

interface Service {
  id: string
  title: string
}

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
    id: string
    title: string
  } | null
}

interface ProjectsPageClientProps {
  projects: Project[]
  services: Service[]
}

export function ProjectsPageClient({ projects, services }: ProjectsPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    service: "all",
    status: "all",
    year: "all",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredCount, setFilteredCount] = useState(projects.length)

  return (
    <>
      <ProjectFilters
        services={services}
        onFilterChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <div className="mb-4 text-sm text-gray-600">
        {projects.length} projeden{" "}
        <span className="font-semibold text-gray-900">{filteredCount}</span>{" "}
        tanesi gösteriliyor
      </div>
      <ProjectsList 
        projects={projects} 
        filters={filters} 
        viewMode={viewMode}
        onFilteredCountChange={setFilteredCount}
      />
    </>
  )
}

