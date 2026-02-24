import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget"
import { CONTACT_INFO } from "@/lib/constants"
import { PageTransition } from "@/components/ui/page-transition"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

// Convert phone number to WhatsApp format (remove spaces, dashes, and ensure country code)
function formatWhatsAppNumber(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[\s.-]/g, '')

  // If starts with +90, remove + and return
  if (cleaned.startsWith('+90')) {
    return cleaned.substring(1)
  }

  // If starts with 90, return as is
  if (cleaned.startsWith('90')) {
    return cleaned
  }

  // If starts with 0, remove 0 and add 90
  if (cleaned.startsWith('0')) {
    return '90' + cleaned.substring(1)
  }

  // Otherwise, assume it's a local number and add 90
  return '90' + cleaned
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get WhatsApp number from constants (will be updated by scraping script)
  const whatsappNumber = formatWhatsAppNumber(CONTACT_INFO.PHONE)

  return (
    <>
      <Header />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />

      {/* WhatsApp Widget */}
      <WhatsAppWidget
        phoneNumber={whatsappNumber}
        message="Merhaba, Kaldet İnşaat web sitenizden ulaşıyorum. Bilgi almak istiyorum."
        position="right"
      />
    </>
  )
}
