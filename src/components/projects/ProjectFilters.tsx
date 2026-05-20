"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProjectFiltersProps {
  services: Array<{ id: string; title: string }>
  onFilterChange: (filters: FilterState) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export interface FilterState {
  search: string
  service: string
  status: string
  year: string
}

export function ProjectFilters({
  services,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: ProjectFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    service: "all",
    status: "all",
    year: "all",
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      service: "all",
      status: "all",
      year: "all",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.search ||
    filters.service !== "all" ||
    filters.status !== "all" ||
    filters.year !== "all"

  // Get unique years from projects (would need to be passed as prop or fetched)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Proje ara..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 flex-1">
          <Select
            value={filters.service}
            onValueChange={(value) => handleFilterChange("service", value)}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Hizmet Tipi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Hizmetler</SelectItem>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="COMPLETED">Tamamlandı</SelectItem>
              <SelectItem value="IN_PROGRESS">Devam Ediyor</SelectItem>
              <SelectItem value="PLANNING">Planlamada</SelectItem>
              <SelectItem value="ON_HOLD">Beklemede</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.year}
            onValueChange={(value) => handleFilterChange("year", value)}
          >
            <SelectTrigger className="w-full lg:w-[130px]">
              <SelectValue placeholder="Yıl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Yıllar</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Temizle
            </Button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="flex items-center gap-2"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Liste</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

