"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

interface WhatsAppWidgetProps {
  phoneNumber: string // Format: 905551234567 (country code + number without +)
  message?: string
  position?: "left" | "right"
}

export function WhatsAppWidget({
  phoneNumber,
  message = "Merhaba, web sitenizden ulaşıyorum. Bilgi almak istiyorum.",
  position = "right",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  const handleClick = () => {
    // Track WhatsApp click (optional analytics)
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "WhatsApp Widget",
      })
    }

    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 ${
          position === "right" ? "right-6" : "left-6"
        } z-50 flex flex-col items-end gap-2`}
      >
        {/* Tooltip */}
        {isOpen && (
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs animate-in slide-in-from-bottom-2">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  WhatsApp Desteği
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Projeniz hakkında konuşmak ister misiniz?
                </p>
                <button
                  onClick={handleClick}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Mesaj Gönder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
          aria-label="WhatsApp ile iletişime geç"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white animate-pulse group-hover:animate-none" />
          )}
        </button>
      </div>

      {/* Pulsing ring animation */}
      {!isOpen && (
        <div
          className={`fixed bottom-6 ${
            position === "right" ? "right-6" : "left-6"
          } z-40 pointer-events-none`}
        >
          <div className="w-14 h-14 bg-green-500 rounded-full animate-ping opacity-75"></div>
        </div>
      )}
    </>
  )
}
