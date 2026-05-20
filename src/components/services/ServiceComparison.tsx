"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QUOTE_BASE_PRICES } from "@/lib/constants"

interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  process: Array<{ title: string; description: string }>
  materials: Array<{ name: string; description: string | null }>
}

interface ServiceComparisonProps {
  services: Service[]
}

export function ServiceComparison({ services }: ServiceComparisonProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const addService = (serviceId: string) => {
    if (!selectedServices.includes(serviceId) && selectedServices.length < 4) {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter((id) => id !== serviceId))
  }

  const getSelectedServiceData = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)
  }

  const getPriceRange = (slug: string) => {
    const basePrice = QUOTE_BASE_PRICES[slug as keyof typeof QUOTE_BASE_PRICES]
    if (!basePrice) return null
    return {
      min: basePrice * 0.85,
      max: basePrice * 1.15,
      base: basePrice,
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      {/* Service Selector */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Karşılaştırmak İstediğiniz Hizmetleri Seçin
          </h2>
          <p className="text-gray-600 mb-6">
            En fazla 4 hizmeti aynı anda karşılaştırabilirsiniz
          </p>

          <div className="flex flex-wrap gap-4">
            {selectedServices.length < 4 && (
              <Select
                onValueChange={addService}
                value=""
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Hizmet seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {services
                    .filter((s) => !selectedServices.includes(s.id))
                    .map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}

            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedServices.map((serviceId) => {
                  const service = getSelectedServiceData(serviceId)
                  return (
                    <div
                      key={serviceId}
                      className="flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg"
                    >
                      <span className="font-semibold">{service?.title}</span>
                      <button
                        onClick={() => removeService(serviceId)}
                        className="hover:bg-blue-200 rounded p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedServices.length > 0 ? (
        <div className="overflow-x-auto">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-bold text-gray-900">
                        Özellik
                      </th>
                      {selectedServices.map((serviceId) => {
                        const service = getSelectedServiceData(serviceId)
                        return (
                          <th
                            key={serviceId}
                            className="text-center p-4 font-bold text-gray-900 min-w-[200px]"
                          >
                            {service?.title}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Description */}
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">
                        Açıklama
                      </td>
                      {selectedServices.map((serviceId) => {
                        const service = getSelectedServiceData(serviceId)
                        return (
                          <td key={serviceId} className="p-4 text-gray-600 text-sm">
                            {service?.shortDescription}
                          </td>
                        )
                      })}
                    </tr>

                    {/* Price Range */}
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold text-gray-700">
                        Fiyat Aralığı (m²)
                      </td>
                      {selectedServices.map((serviceId) => {
                        const service = getSelectedServiceData(serviceId)
                        const priceRange = service
                          ? getPriceRange(service.slug)
                          : null
                        return (
                          <td key={serviceId} className="p-4 text-center">
                            {priceRange ? (
                              <div>
                                <div className="font-bold text-blue-600">
                                  {formatPrice(priceRange.base)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatPrice(priceRange.min)} -{" "}
                                  {formatPrice(priceRange.max)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">Belirtilmemiş</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>

                    {/* Process Steps Count */}
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">
                        Uygulama Adımları
                      </td>
                      {selectedServices.map((serviceId) => {
                        const service = getSelectedServiceData(serviceId)
                        return (
                          <td key={serviceId} className="p-4 text-center">
                            <span className="font-semibold text-blue-600">
                              {service?.process.length || 0} adım
                            </span>
                          </td>
                        )
                      })}
                    </tr>

                    {/* Materials Count */}
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold text-gray-700">
                        Kullanılan Malzemeler
                      </td>
                      {selectedServices.map((serviceId) => {
                        const service = getSelectedServiceData(serviceId)
                        return (
                          <td key={serviceId} className="p-4 text-center">
                            <span className="font-semibold text-green-600">
                              {service?.materials.length || 0} malzeme
                            </span>
                          </td>
                        )
                      })}
                    </tr>

                    {/* Detailed Comparison */}
                    {selectedServices.length > 0 && (
                      <>
                        <tr className="border-t-2 border-gray-300">
                          <td
                            colSpan={selectedServices.length + 1}
                            className="p-4 bg-blue-50"
                          >
                            <h3 className="font-bold text-gray-900 text-lg">
                              Detaylı Karşılaştırma
                            </h3>
                          </td>
                        </tr>

                        {/* Process Steps */}
                        {[0, 1, 2, 3, 4].map((index) => (
                          <tr key={`process-${index}`} className="border-b">
                            <td className="p-4 font-semibold text-gray-700">
                              Adım {index + 1}
                            </td>
                            {selectedServices.map((serviceId) => {
                              const service = getSelectedServiceData(serviceId)
                              const step = service?.process[index]
                              return (
                                <td key={serviceId} className="p-4">
                                  {step ? (
                                    <div>
                                      <div className="font-semibold text-gray-900 mb-1">
                                        {step.title}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {step.description}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        ))}

                        {/* Materials */}
                        {[0, 1, 2, 3].map((index) => (
                          <tr key={`material-${index}`} className="border-b bg-gray-50">
                            <td className="p-4 font-semibold text-gray-700">
                              Malzeme {index + 1}
                            </td>
                            {selectedServices.map((serviceId) => {
                              const service = getSelectedServiceData(serviceId)
                              const material = service?.materials[index]
                              return (
                                <td key={serviceId} className="p-4">
                                  {material ? (
                                    <div>
                                      <div className="font-semibold text-gray-900">
                                        {material.name}
                                      </div>
                                      {material.description && (
                                        <div className="text-sm text-gray-600 mt-1">
                                          {material.description}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Karşılaştırdığınız hizmetlerden birini seçtiniz mi?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  window.location.href = "/teklif-hesapla"
                }}
              >
                Teklif Hesapla
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  window.location.href = "/iletisim"
                }}
              >
                İletişime Geçin
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              Karşılaştırmak için yukarıdan hizmet seçin
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

