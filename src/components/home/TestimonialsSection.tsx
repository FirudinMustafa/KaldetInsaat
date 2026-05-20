import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Quote } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getTestimonials() {
  return await prisma.testimonial.findMany({
    where: {
      isApproved: true,
      featured: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  })
}

export async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tamamladığımız projeler hakkında müşterilerimizin görüşleri
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 line-clamp-4 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {testimonial.clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.clientName}
                  </div>
                  {testimonial.companyName && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position && `${testimonial.position}, `}
                      {testimonial.companyName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/referanslar" className="gap-2">
              Tüm Referansları Görüntüle
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
