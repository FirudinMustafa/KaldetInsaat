"use client"

import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectTimelineProps {
  status: string
  startDate: Date | null
  endDate: Date | null
  duration?: number | null
}

interface TimelineStep {
  id: string
  label: string
  status: "completed" | "current" | "upcoming"
  date?: Date | null
}

export function ProjectTimeline({
  status,
  startDate,
  endDate,
  duration,
}: ProjectTimelineProps) {
  const getTimelineSteps = (): TimelineStep[] => {
    const steps: TimelineStep[] = [
      {
        id: "planning",
        label: "Planlama",
        status: "upcoming",
      },
      {
        id: "in_progress",
        label: "İnşaat",
        status: "upcoming",
      },
      {
        id: "completed",
        label: "Tamamlandı",
        status: "upcoming",
      },
    ]

    // Update step statuses based on project status
    if (status === "PLANNING") {
      steps[0].status = "current"
      steps[0].date = startDate
    } else if (status === "IN_PROGRESS") {
      steps[0].status = "completed"
      steps[0].date = startDate
      steps[1].status = "current"
    } else if (status === "COMPLETED") {
      steps[0].status = "completed"
      steps[0].date = startDate
      steps[1].status = "completed"
      steps[2].status = "completed"
      steps[2].date = endDate
    }

    return steps
  }

  const steps = getTimelineSteps()
  const currentStepIndex = steps.findIndex((s) => s.status === "current")
  const completedSteps = steps.filter((s) => s.status === "completed").length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return null
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getEstimatedEndDate = () => {
    if (endDate) return formatDate(endDate)
    if (startDate && duration) {
      const estimated = new Date(startDate)
      estimated.setDate(estimated.getDate() + duration)
      return formatDate(estimated)
    }
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Proje Zaman Çizelgesi</h3>
          <div className="text-sm text-gray-600">
            {Math.round(progressPercentage)}% Tamamlandı
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-12 ${
                    step.status === "completed"
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                />
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-blue-500 text-white"
                      : step.status === "current"
                      ? "bg-blue-100 border-2 border-blue-500 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : step.status === "current" ? (
                    <Clock className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-semibold ${
                        step.status === "completed"
                          ? "text-gray-900"
                          : step.status === "current"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </h4>
                    {step.date && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(step.date)}
                      </div>
                    )}
                  </div>

                  {step.status === "current" && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 mb-2">
                        {step.id === "planning" && "Proje planlama aşaması devam ediyor"}
                        {step.id === "in_progress" && "İnşaat çalışmaları sürüyor"}
                        {step.id === "completed" && "Proje tamamlandı"}
                      </div>
                      {step.id === "in_progress" && getEstimatedEndDate() && (
                        <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                          Tahmini tamamlanma: {getEstimatedEndDate()}
                        </div>
                      )}
                    </div>
                  )}

                  {step.status === "completed" && (
                    <div className="text-sm text-gray-500 mt-1">
                      Tamamlandı
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Duration Info */}
        {(startDate || duration) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {startDate && (
                <div>
                  <div className="text-gray-600 mb-1">Başlangıç Tarihi</div>
                  <div className="font-semibold text-gray-900">
                    {formatDate(startDate)}
                  </div>
                </div>
              )}
              {getEstimatedEndDate() && (
                <div>
                  <div className="text-gray-600 mb-1">
                    {endDate ? "Bitiş Tarihi" : "Tahmini Bitiş"}
                  </div>
                  <div className="font-semibold text-gray-900">
                    {getEstimatedEndDate()}
                  </div>
                </div>
              )}
              {duration && (
                <div className="col-span-2">
                  <div className="text-gray-600 mb-1">Tahmini Süre</div>
                  <div className="font-semibold text-gray-900">
                    {duration} gün
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

