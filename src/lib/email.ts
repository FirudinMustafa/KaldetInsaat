import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@kaldetinsaat.com",
      to,
      subject,
      text,
      html,
    })

    console.log("Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Email error:", error)
    return { success: false, error }
  }
}

// Contact Form Email Template
export function getContactEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  projectType?: string
}) {
  return {
    subject: `Yeni İletişim Formu: ${data.subject || "Konu Yok"}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni İletişim Formu</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">İsim:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              ${data.phone ? `
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone}</div>
                </div>
              ` : ""}
              ${data.subject ? `
                <div class="field">
                  <div class="label">Konu:</div>
                  <div class="value">${data.subject}</div>
                </div>
              ` : ""}
              ${data.projectType ? `
                <div class="field">
                  <div class="label">Proje Tipi:</div>
                  <div class="value">${data.projectType}</div>
                </div>
              ` : ""}
              <div class="field">
                <div class="label">Mesaj:</div>
                <div class="value">${data.message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

// Quote Request Email Template
export function getQuoteEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  companyName?: string
  serviceId?: string
  projectType?: string
  area?: number
  location?: string
  description?: string
  estimatedPrice?: number
}) {
  return {
    subject: `Yeni Teklif Talebi: ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #059669; }
            .value { margin-top: 5px; }
            .highlight { background: #d1fae5; padding: 10px; border-left: 4px solid #059669; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni Teklif Talebi</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">İsim:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              ${data.phone ? `
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone}</div>
                </div>
              ` : ""}
              ${data.companyName ? `
                <div class="field">
                  <div class="label">Firma:</div>
                  <div class="value">${data.companyName}</div>
                </div>
              ` : ""}
              ${data.projectType ? `
                <div class="field">
                  <div class="label">Proje Tipi:</div>
                  <div class="value">${data.projectType}</div>
                </div>
              ` : ""}
              ${data.area ? `
                <div class="field">
                  <div class="label">Alan (m²):</div>
                  <div class="value">${data.area} m²</div>
                </div>
              ` : ""}
              ${data.location ? `
                <div class="field">
                  <div class="label">Konum:</div>
                  <div class="value">${data.location}</div>
                </div>
              ` : ""}
              ${data.description ? `
                <div class="field">
                  <div class="label">Açıklama:</div>
                  <div class="value">${data.description}</div>
                </div>
              ` : ""}
              ${data.estimatedPrice ? `
                <div class="field highlight">
                  <div class="label">Tahmini Fiyat:</div>
                  <div class="value" style="font-size: 18px; font-weight: bold;">
                    ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(data.estimatedPrice)}
                  </div>
                </div>
              ` : ""}
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

// Auto Reply Email Template
export function getAutoReplyTemplate(name: string) {
  return {
    subject: "Mesajınız Alındı - Kaldet İnşaat",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #f59e0b, #d97706); color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; margin-top: 0; }
            .contact-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Kaldet İnşaat</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Endüstriyel Zemin ve İnşaat Çözümleri</p>
            </div>
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Merhaba ${name},</h2>
              <p>Mesajınız için teşekkür ederiz. Talebiniz başarıyla alınmıştır.</p>
              <p>Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
              <p>Acil durumlar için bizi doğrudan arayabilirsiniz:</p>
              <div class="contact-box">
                <p style="margin: 5px 0;"><strong>Telefon:</strong> <a href="tel:+902626422058" style="color: #f59e0b;">0262 642 2058</a></p>
                <p style="margin: 5px 0;"><strong>E-posta:</strong> <a href="mailto:info@kaldetinsaat.com" style="color: #f59e0b;">info@kaldetinsaat.com</a></p>
                <p style="margin: 5px 0;"><strong>Adres:</strong> Kocaeli, Türkiye</p>
              </div>
              <p>Saygılarımızla,<br><strong>Kaldet İnşaat Ekibi</strong></p>
            </div>
            <div class="footer">
              <p>Bu e-posta otomatik olarak gönderilmiştir. Lütfen bu adrese yanıt vermeyiniz.</p>
              <p>&copy; ${new Date().getFullYear()} Kaldet İnşaat. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

// Send contact notification with auto-reply
export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "info@kaldetinsaat.com"

  // Send notification to admin
  const adminTemplate = getContactEmailTemplate(data)
  await sendEmail({
    to: adminEmail,
    subject: adminTemplate.subject,
    html: adminTemplate.html,
  })

  // Send auto-reply to user
  const autoReplyTemplate = getAutoReplyTemplate(data.name)
  await sendEmail({
    to: data.email,
    subject: autoReplyTemplate.subject,
    html: autoReplyTemplate.html,
  })
}

// Send quote notification with auto-reply
export async function sendQuoteNotification(data: {
  name: string
  email: string
  phone?: string
  companyName?: string
  serviceId?: string
  projectType?: string
  area?: number
  location?: string
  description?: string
  estimatedPrice?: number
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "info@kaldetinsaat.com"

  // Send notification to admin
  const adminTemplate = getQuoteEmailTemplate(data)
  await sendEmail({
    to: adminEmail,
    subject: adminTemplate.subject,
    html: adminTemplate.html,
  })

  // Send auto-reply to user
  const autoReplyTemplate = getAutoReplyTemplate(data.name)
  await sendEmail({
    to: data.email,
    subject: "Teklif Talebiniz Alındı - Kaldet İnşaat",
    html: autoReplyTemplate.html,
  })
}
