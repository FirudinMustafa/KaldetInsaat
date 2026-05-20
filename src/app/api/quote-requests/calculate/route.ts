import { NextRequest, NextResponse } from "next/server"

// Fiyat hesaplama mantığı - 2025-2026 Türkiye piyasa fiyatları
// Güncel fiyatlar: Malzeme + İşçilik dahil ortalama birim fiyatlar (TL/m²)
const SERVICE_MULTIPLIERS: { [key: string]: number } = {
  "endustriyel-zemin-betonu": 950,      // Endüstriyel zemin betonu: 800-1100 TL/m²
  "baski-beton-uygulamalari": 650,      // Baskı beton: 500-800 TL/m²
  "epoksi-zemin-kaplama": 550,          // Epoksi kaplama: 400-700 TL/m²
  "celik-konstruksiyon": 2000,          // Çelik konstrüksiyon: 1500-2500 TL/m²
  "endustri-tesis-bakim-onarim": 400,   // Bakım-onarım: 300-500 TL/m²
  "altyapi-uygulamalari": 750,          // Altyapı: 600-900 TL/m²
  default: 700,
}

const PROJECT_TYPE_MULTIPLIERS: { [key: string]: number } = {
  residential: 1.0,
  commercial: 1.2,
  industrial: 1.3,
  infrastructure: 1.4,
  default: 1.0,
}

const TIMELINE_MULTIPLIERS: { [key: string]: number } = {
  urgent: 1.3, // Less than 1 month
  normal: 1.0, // 1-3 months
  flexible: 0.9, // 3+ months
  default: 1.0,
}

// POST - Calculate estimated price
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { serviceSlug, projectType, area, timeline } = body

    // Validate inputs
    if (!area || area <= 0) {
      return NextResponse.json(
        { success: false, message: "Geçerli bir alan (m²) girin" },
        { status: 400 }
      )
    }

    // Get multipliers
    const serviceMultiplier =
      SERVICE_MULTIPLIERS[serviceSlug] || SERVICE_MULTIPLIERS.default
    const projectTypeMultiplier =
      PROJECT_TYPE_MULTIPLIERS[projectType] || PROJECT_TYPE_MULTIPLIERS.default
    const timelineMultiplier =
      TIMELINE_MULTIPLIERS[timeline] || TIMELINE_MULTIPLIERS.default

    // Calculate base price
    const basePrice = area * serviceMultiplier

    // Apply multipliers
    const estimatedPrice =
      basePrice * projectTypeMultiplier * timelineMultiplier

    // Calculate range (±15%)
    const minPrice = estimatedPrice * 0.85
    const maxPrice = estimatedPrice * 1.15

    return NextResponse.json({
      success: true,
      data: {
        estimatedPrice: Math.round(estimatedPrice),
        minPrice: Math.round(minPrice),
        maxPrice: Math.round(maxPrice),
        pricePerSquareMeter: Math.round(
          estimatedPrice / area
        ),
        breakdown: {
          area,
          serviceMultiplier,
          projectTypeMultiplier,
          timelineMultiplier,
        },
      },
    })
  } catch (error) {
    console.error("Calculate quote error:", error)
    return NextResponse.json(
      { success: false, message: "Fiyat hesaplanamadı" },
      { status: 500 }
    )
  }
}
