import { CheckCircle, Circle, ArrowRight } from "lucide-react"

interface ProcessStep {
  number: number
  title: string
  description: string
  image?: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  title?: string
  description?: string
}

export function ProcessTimeline({ steps, title = "Çalışma Sürecimiz", description = "Projelerinizi adım adım nasıl gerçekleştirdiğimizi keşfedin" }: ProcessTimelineProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative mb-12 last:mb-0">
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    {index < steps.length - 1 ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Text Content */}
                    <div>
                      <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Adım {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Image */}
                    {step.image && (
                      <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${step.image}')`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4 md:hidden">
                  <ArrowRight className="w-6 h-6 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

