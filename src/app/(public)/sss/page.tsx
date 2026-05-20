import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { CONTACT_INFO } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Phone, Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Sıkça Sorulan Sorular | Kaldet İnşaat",
  description: "Endüstriyel zemin ve inşaat hizmetlerimiz hakkında sıkça sorulan sorular ve cevapları",
}

async function getFAQCategories() {
  const categories = await prisma.fAQCategory.findMany({
    where: {
      questions: {
        some: {
          isPublished: true
        }
      }
    },
    include: {
      questions: {
        where: {
          isPublished: true,
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  })
  return categories
}

async function getAllQuestions() {
  return await prisma.fAQQuestion.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  })
}

export default async function FAQPage() {
  const categories = await getFAQCategories()
  const allQuestions = await getAllQuestions()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-end mb-6">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Link>
            </Button>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">Yardım Merkezi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sıkça Sorulan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Sorular
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hizmetlerimiz ve süreçlerimiz hakkında merak ettiğiniz her şey
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{allQuestions.length}</div>
              <div className="text-sm text-gray-600">Soru</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Kategori</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Henüz SSS eklenmemiştir.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-10">
              {categories.map((category) => (
                <div key={category.id}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                    </span>
                    {category.name}
                  </h2>

                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((question) => (
                        <AccordionItem
                          key={question.id}
                          value={`item-${question.id}`}
                          className="border-b last:border-0"
                        >
                          <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50">
                            <span className="font-semibold text-gray-900 pr-4">
                              {question.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div
                              className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: question.answer,
                              }}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sorunuzu Bulamadınız mı?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Merak ettiğiniz her şeyi bize sorabilirsiniz. Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100" asChild>
                <Link href="/iletisim">
                  <Mail className="w-4 h-4 mr-2" />
                  İletişime Geçin
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, "")}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {CONTACT_INFO.PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
