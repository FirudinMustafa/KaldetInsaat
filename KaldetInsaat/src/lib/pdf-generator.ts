import jsPDF from 'jspdf'
import { CONTACT_INFO } from './constants'
import { LOGO_BASE64 } from './logo-data'

// Company info
const COMPANY = {
  name: 'KalDet Insaat',
  fullName: 'Kaldet Muhendislik ve Insaat Tic. Ltd. Sti.',
  tagline: 'Endustriyel Zemin & Tesis Cozumleri',
  phone: CONTACT_INFO.PHONE_DISPLAY,
  email: CONTACT_INFO.EMAIL,
  website: 'www.kaldetinsaat.com',
  address: 'Inonu Mah. Guzeller OSB. Ziya Gokalp Cad. No:8 Gebze / Kocaeli'
}

// Colors
const COLORS = {
  primary: [249, 115, 22] as [number, number, number], // Orange
  secondary: [38, 38, 38] as [number, number, number], // Anthracite
  text: [51, 51, 51] as [number, number, number],
  muted: [128, 128, 128] as [number, number, number],
  border: [229, 229, 229] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  lightBg: [249, 249, 249] as [number, number, number],
  warningBg: [255, 243, 224] as [number, number, number]
}

// Helper function to draw header with real logo
function drawHeader(doc: jsPDF, pageWidth: number) {
  // Header background
  doc.setFillColor(...COLORS.secondary)
  doc.rect(0, 0, pageWidth, 45, 'F')

  // Real company logo (800x292 aspect ratio = 2.74:1)
  const logoWidth = 50
  const logoHeight = logoWidth / 2.74
  doc.addImage(LOGO_BASE64, 'PNG', 15, 12, logoWidth, logoHeight)

  // Company info on right side
  doc.setTextColor(...COLORS.white)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(COMPANY.tagline, pageWidth - 20, 18, { align: 'right' })

  doc.setFontSize(8)
  doc.text(`Tel: ${COMPANY.phone} | E-posta: ${COMPANY.email}`, pageWidth - 20, 28, { align: 'right' })
  doc.text(COMPANY.website, pageWidth - 20, 38, { align: 'right' })
}

// Helper function to draw footer
function drawFooter(doc: jsPDF, pageWidth: number) {
  const y = 275

  // Divider
  doc.setDrawColor(...COLORS.border)
  doc.line(20, y, pageWidth - 20, y)

  // Footer content
  doc.setTextColor(...COLORS.muted)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')

  doc.text(COMPANY.fullName, 20, y + 6)
  doc.text(COMPANY.address, 20, y + 12)
  doc.text(`Tel: ${COMPANY.phone} | ${COMPANY.website}`, pageWidth - 20, y + 9, { align: 'right' })
}

// PDF Generator for Concrete Volume Calculator
export function generateBetonHacmiPDF(data: {
  raporNo: string
  en: number
  boy: number
  kalinlik: number
  fireOrani: number
  netHacim: number
  fireDahilHacim: number
  projeAdi?: string
  notlar?: string
}) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // Header
  drawHeader(doc, pageWidth)

  // Report Title
  y = 60
  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('BETON HACMI HESAPLAMA RAPORU', 20, y)

  // Report Info
  y += 12
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.text(`Rapor No: ${data.raporNo}`, 20, y)
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, pageWidth - 20, y, { align: 'right' })

  // Divider
  y += 8
  doc.setDrawColor(...COLORS.border)
  doc.line(20, y, pageWidth - 20, y)

  // Project Name (if provided)
  if (data.projeAdi) {
    y += 12
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Proje Adi:', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(data.projeAdi, 55, y)
  }

  // Input Parameters Section
  y += 18
  doc.setFillColor(...COLORS.lightBg)
  doc.roundedRect(20, y - 5, pageWidth - 40, 50, 3, 3, 'F')

  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Girilen Degerler', 28, y + 6)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.text)

  y += 18
  doc.text(`En: ${data.en} m`, 28, y)
  doc.text(`Boy: ${data.boy} m`, 80, y)
  doc.text(`Kalinlik: ${data.kalinlik} cm`, 132, y)

  y += 14
  doc.text(`Fire Orani: %${data.fireOrani}`, 28, y)

  // Results Section
  y += 28
  doc.setFillColor(...COLORS.primary)
  doc.roundedRect(20, y - 5, pageWidth - 40, 50, 3, 3, 'F')

  doc.setTextColor(...COLORS.white)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Hesaplama Sonuclari', 28, y + 6)

  y += 18
  doc.setFontSize(14)
  doc.text(`Net Hacim: ${data.netHacim.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m3`, 28, y)

  y += 14
  doc.setFontSize(12)
  doc.text(`Fire Dahil Hacim (%${data.fireOrani}): ${data.fireDahilHacim.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m3`, 28, y)

  // Notes (if provided)
  if (data.notlar) {
    y += 28
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Notlar:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 8
    const notLines = doc.splitTextToSize(data.notlar, pageWidth - 40)
    doc.text(notLines, 20, y)
  }

  // Disclaimer
  y = 235
  doc.setFillColor(...COLORS.warningBg)
  doc.roundedRect(20, y - 5, pageWidth - 40, 30, 3, 3, 'F')

  doc.setTextColor(...COLORS.muted)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Onemli: Bu hesaplama tahminidir ve fiyat icermez.', 28, y + 5)
  doc.text('Zemin duzensizlikleri, kalip kayiplari ve uygulama detaylari nedeniyle', 28, y + 12)
  doc.text('fiili tuketim degisebilir. Kesin fiyat teklif asamasinda belirlenir.', 28, y + 19)

  // Footer
  drawFooter(doc, pageWidth)

  // Save
  doc.save(`beton-hacmi-${data.raporNo}.pdf`)
}

// PDF Generator for Epoxy Coating Calculator
export function generateEpoksiKaplamaPDF(data: {
  raporNo: string
  en: number
  boy: number
  alan: number
  katSayisi: number
  sarfiyatTipi: string
  fireOrani: number
  netSarfiyat: number
  fireDahilSarfiyat: number
  projeAdi?: string
  notlar?: string
}) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // Header
  drawHeader(doc, pageWidth)

  // Report Title
  y = 60
  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('EPOKSI KAPLAMA HESAPLAMA RAPORU', 20, y)

  // Report Info
  y += 12
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.text(`Rapor No: ${data.raporNo}`, 20, y)
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, pageWidth - 20, y, { align: 'right' })

  // Divider
  y += 8
  doc.setDrawColor(...COLORS.border)
  doc.line(20, y, pageWidth - 20, y)

  // Project Name (if provided)
  if (data.projeAdi) {
    y += 12
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Proje Adi:', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(data.projeAdi, 55, y)
  }

  // Input Parameters Section
  y += 18
  doc.setFillColor(...COLORS.lightBg)
  doc.roundedRect(20, y - 5, pageWidth - 40, 60, 3, 3, 'F')

  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Girilen Degerler', 28, y + 6)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.text)

  y += 18
  doc.text(`En: ${data.en} m`, 28, y)
  doc.text(`Boy: ${data.boy} m`, 80, y)
  doc.text(`Toplam Alan: ${data.alan.toLocaleString('tr-TR')} m2`, 132, y)

  y += 12
  doc.text(`Kat Sayisi: ${data.katSayisi} kat`, 28, y)
  doc.text(`Sarfiyat Tipi: ${data.sarfiyatTipi === 'standart' ? 'Standart (300g/m2)' : 'Yogun (500g/m2)'}`, 80, y)

  y += 12
  doc.text(`Fire Orani: %${data.fireOrani}`, 28, y)

  // Results Section - Teal color for epoxy
  y += 25
  doc.setFillColor(20, 184, 166)
  doc.roundedRect(20, y - 5, pageWidth - 40, 50, 3, 3, 'F')

  doc.setTextColor(...COLORS.white)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Hesaplama Sonuclari', 28, y + 6)

  y += 18
  doc.setFontSize(14)
  doc.text(`Net Sarfiyat: ${data.netSarfiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`, 28, y)

  y += 14
  doc.setFontSize(12)
  doc.text(`Fire Dahil Sarfiyat (%${data.fireOrani}): ${data.fireDahilSarfiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`, 28, y)

  // Notes (if provided)
  if (data.notlar) {
    y += 28
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Notlar:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 8
    const notLines = doc.splitTextToSize(data.notlar, pageWidth - 40)
    doc.text(notLines, 20, y)
  }

  // Disclaimer
  y = 235
  doc.setFillColor(...COLORS.warningBg)
  doc.roundedRect(20, y - 5, pageWidth - 40, 30, 3, 3, 'F')

  doc.setTextColor(...COLORS.muted)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Onemli: Bu hesaplama tahminidir ve fiyat icermez.', 28, y + 5)
  doc.text('Zemin durumuna gore sarfiyat degisebilir.', 28, y + 12)
  doc.text('Kesin fiyat teklif asamasinda belirlenir.', 28, y + 19)

  // Footer
  drawFooter(doc, pageWidth)

  // Save
  doc.save(`epoksi-kaplama-${data.raporNo}.pdf`)
}

// PDF Generator for Rebar Weight Calculator
export function generateDonatiAgirlikPDF(data: {
  raporNo: string
  kalemler: { cap: number; boy: number; adet: number; toplamAgirlik: number }[]
  fireOrani: number
  netAgirlik: number
  fireDahilAgirlik: number
  projeAdi?: string
  notlar?: string
}) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // Header
  drawHeader(doc, pageWidth)

  // Report Title
  y = 60
  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('DONATI AGIRLIK HESAPLAMA RAPORU', 20, y)

  // Report Info
  y += 12
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.text(`Rapor No: ${data.raporNo}`, 20, y)
  doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, pageWidth - 20, y, { align: 'right' })

  // Divider
  y += 8
  doc.setDrawColor(...COLORS.border)
  doc.line(20, y, pageWidth - 20, y)

  // Project Name (if provided)
  if (data.projeAdi) {
    y += 12
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Proje Adi:', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.text(data.projeAdi, 55, y)
  }

  // Items Table
  y += 18
  doc.setTextColor(...COLORS.secondary)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Donati Kalemleri', 20, y)

  // Table Header
  y += 10
  doc.setFillColor(...COLORS.secondary)
  doc.roundedRect(20, y - 5, pageWidth - 40, 12, 2, 2, 'F')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.white)
  doc.text('Cap (mm)', 28, y + 3)
  doc.text('Boy (m)', 70, y + 3)
  doc.text('Adet', 110, y + 3)
  doc.text('Agirlik (kg)', 150, y + 3)

  // Table Rows
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...COLORS.text)
  data.kalemler.forEach((kalem, index) => {
    y += 12
    if (index % 2 === 0) {
      doc.setFillColor(...COLORS.lightBg)
      doc.rect(20, y - 5, pageWidth - 40, 12, 'F')
    }
    doc.text(`O${kalem.cap}`, 28, y + 3)
    doc.text(`${kalem.boy}`, 70, y + 3)
    doc.text(`${kalem.adet}`, 110, y + 3)
    doc.text(`${kalem.toplamAgirlik.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 150, y + 3)
  })

  // Fire Rate
  y += 18
  doc.setTextColor(...COLORS.muted)
  doc.text(`Fire Orani: %${data.fireOrani}`, 20, y)

  // Results Section - Violet color for rebar
  y += 15
  doc.setFillColor(139, 92, 246)
  doc.roundedRect(20, y - 5, pageWidth - 40, 55, 3, 3, 'F')

  doc.setTextColor(...COLORS.white)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Hesaplama Sonuclari', 28, y + 6)

  y += 18
  doc.setFontSize(14)
  doc.text(`Net Agirlik: ${data.netAgirlik.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`, 28, y)
  doc.setFontSize(10)
  doc.text(`(${(data.netAgirlik / 1000).toFixed(2)} ton)`, 130, y)

  y += 15
  doc.setFontSize(12)
  doc.text(`Fire Dahil (%${data.fireOrani}): ${data.fireDahilAgirlik.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`, 28, y)
  doc.setFontSize(10)
  doc.text(`(${(data.fireDahilAgirlik / 1000).toFixed(2)} ton)`, 130, y)

  // Notes (if provided)
  if (data.notlar) {
    y += 25
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Notlar:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 8
    const notLines = doc.splitTextToSize(data.notlar, pageWidth - 40)
    doc.text(notLines, 20, y)
  }

  // Disclaimer
  const disclaimerY = Math.max(y + 20, 240)
  doc.setFillColor(...COLORS.warningBg)
  doc.roundedRect(20, disclaimerY - 5, pageWidth - 40, 25, 3, 3, 'F')

  doc.setTextColor(...COLORS.muted)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Onemli: Bu hesaplama teorik degerlerdir ve fiyat icermez.', 28, disclaimerY + 5)
  doc.text('Gercek agirlik uretici toleranslarina gore degisebilir.', 28, disclaimerY + 12)

  // Footer
  drawFooter(doc, pageWidth)

  // Save
  doc.save(`donati-agirlik-${data.raporNo}.pdf`)
}
