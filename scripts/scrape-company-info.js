const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function to extract text
function extractText($, element, selector) {
  const found = $(element).find(selector);
  return found.length > 0 ? found.text().trim() : null;
}

// Extract phone number from text
function extractPhoneNumber(text) {
  if (!text) return null;
  
  // Try to find phone patterns
  const patterns = [
    /(\+90\s?)?(0?\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/g,
    /(\+90\s?)?(0?\d{3})\s?(\d{3})\s?(\d{4})/g,
    /(0?\d{3})[.\s-]?(\d{3})[.\s-]?(\d{2})[.\s-]?(\d{2})/g,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].replace(/\s/g, '').replace(/[.-]/g, '');
    }
  }
  
  return null;
}

// Extract WhatsApp number
function extractWhatsAppNumber(text) {
  if (!text) return null;
  
  // Look for WhatsApp links
  const whatsappPattern = /wa\.me\/(\d+)|whatsapp[:\s]+(\d+)/gi;
  const match = text.match(whatsappPattern);
  
  if (match) {
    const numberMatch = match[0].match(/(\d+)/);
    if (numberMatch) {
      return numberMatch[1];
    }
  }
  
  // Also try to find phone numbers that might be WhatsApp
  const phone = extractPhoneNumber(text);
  if (phone) {
    // Remove leading 0 and add country code if needed
    let cleanPhone = phone.replace(/^0/, '').replace(/\D/g, '');
    if (!cleanPhone.startsWith('90')) {
      cleanPhone = '90' + cleanPhone;
    }
    return cleanPhone;
  }
  
  return null;
}

// Extract establishment year
function extractEstablishmentYear(text) {
  if (!text) return null;
  
  // Look for year patterns near keywords like "kuruluş", "kuruldu", "founded"
  const yearPattern = /(?:kurulu[şs]|kuruldu|founded|established|since)[\s:]*(\d{4})/i;
  const match = text.match(yearPattern);
  
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 1950 && year <= new Date().getFullYear()) {
      return year;
    }
  }
  
  // Also try to find standalone years that might be establishment year
  const standaloneYearPattern = /\b(19\d{2}|20[0-2]\d)\b/;
  const yearMatch = text.match(standaloneYearPattern);
  if (yearMatch) {
    const year = parseInt(yearMatch[1]);
    if (year >= 1990 && year <= new Date().getFullYear()) {
      return year;
    }
  }
  
  return null;
}

// Scrape company info from hakkımızda page
async function scrapeCompanyInfo() {
  try {
    console.log('📥 Fetching company info from kaldetinsaat.com/hakkimizda...');
    const response = await axios.get('http://www.kaldetinsaat.com/hakkimizda/', {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const info = {};
    
    // Get all text content
    const bodyText = $('body').text();
    const mainContent = $('main, .content, .about, [class*="about"], [class*="content"]').text() || bodyText;
    
    // Extract establishment year
    const establishmentYear = extractEstablishmentYear(mainContent);
    if (establishmentYear) {
      info.establishmentYear = establishmentYear;
      console.log(`✅ Found establishment year: ${establishmentYear}`);
    }
    
    // Extract phone number
    const phone = extractPhoneNumber(mainContent);
    if (phone) {
      info.phone = phone;
      console.log(`✅ Found phone: ${phone}`);
    }
    
    // Extract WhatsApp number
    const whatsapp = extractWhatsAppNumber(response.data); // Check HTML for links
    if (whatsapp) {
      info.whatsapp = whatsapp;
      console.log(`✅ Found WhatsApp: ${whatsapp}`);
    }
    
    // Extract email
    const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
    const emailMatch = mainContent.match(emailPattern);
    if (emailMatch && emailMatch.length > 0) {
      info.email = emailMatch[0];
      console.log(`✅ Found email: ${emailMatch[0]}`);
    }
    
    // Extract address
    const addressSelectors = [
      '.address, [class*="address"]',
      '.location, [class*="location"]',
      '.contact-info, [class*="contact"]',
    ];
    
    for (const selector of addressSelectors) {
      const address = extractText($, $('body'), selector);
      if (address && address.length > 10) {
        info.address = address;
        console.log(`✅ Found address: ${address.substring(0, 50)}...`);
        break;
      }
    }
    
    // Extract company description
    const descriptionSelectors = [
      '.description, [class*="description"]',
      '.about-text, [class*="about"]',
      'p',
    ];
    
    for (const selector of descriptionSelectors) {
      const desc = extractText($, $('body'), selector);
      if (desc && desc.length > 50 && desc.length < 1000) {
        info.description = desc;
        console.log(`✅ Found description (${desc.length} chars)`);
        break;
      }
    }
    
    return info;
  } catch (error) {
    console.error('❌ Error scraping company info:', error.message);
    return {};
  }
}

// Also check main page for contact info
async function scrapeMainPageInfo() {
  try {
    console.log('📥 Fetching additional info from kaldetinsaat.com...');
    const response = await axios.get('http://www.kaldetinsaat.com/', {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const info = {};
    
    const bodyText = $('body').text();
    const htmlContent = response.data;
    
    // Extract WhatsApp from links
    $('a[href*="wa.me"], a[href*="whatsapp"]').each((i, el) => {
      const href = $(el).attr('href');
      const whatsapp = extractWhatsAppNumber(href);
      if (whatsapp) {
        info.whatsapp = whatsapp;
        console.log(`✅ Found WhatsApp from link: ${whatsapp}`);
      }
    });
    
    // Extract phone from links
    $('a[href^="tel:"]').each((i, el) => {
      const href = $(el).attr('href');
      const phone = href.replace('tel:', '').replace(/\D/g, '');
      if (phone && phone.length >= 10) {
        info.phone = phone;
        console.log(`✅ Found phone from link: ${phone}`);
      }
    });
    
    return info;
  } catch (error) {
    console.error('❌ Error scraping main page:', error.message);
    return {};
  }
}

// Update constants file
async function updateConstants(info) {
  const fs = require('fs');
  const path = require('path');
  
  const constantsPath = path.join(__dirname, '../src/lib/constants.ts');
  let constantsContent = fs.readFileSync(constantsPath, 'utf8');
  
  // Update phone if found
  if (info.phone) {
    const phoneFormatted = info.phone.replace(/^90/, '0').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    constantsContent = constantsContent.replace(
      /PHONE:\s*"[^"]*"/,
      `PHONE: "${info.phone.startsWith('+') ? info.phone : '+90 ' + phoneFormatted}"`
    );
    constantsContent = constantsContent.replace(
      /PHONE_DISPLAY:\s*"[^"]*"/,
      `PHONE_DISPLAY: "${phoneFormatted}"`
    );
  }
  
  // Update email if found
  if (info.email) {
    constantsContent = constantsContent.replace(
      /EMAIL:\s*"[^"]*"/,
      `EMAIL: "${info.email}"`
    );
  }
  
  // Update address if found
  if (info.address) {
    constantsContent = constantsContent.replace(
      /ADDRESS:\s*"[^"]*"/,
      `ADDRESS: "${info.address}"`
    );
  }
  
  fs.writeFileSync(constantsPath, constantsContent, 'utf8');
  console.log('✅ Updated constants.ts');
}

// Update WhatsApp widget
async function updateWhatsAppWidget(whatsappNumber) {
  if (!whatsappNumber) return;
  
  const fs = require('fs');
  const path = require('path');
  
  const widgetPath = path.join(__dirname, '../src/components/shared/WhatsAppWidget.tsx');
  let widgetContent = fs.readFileSync(widgetPath, 'utf8');
  
  // Update phone number in layout
  const layoutPath = path.join(__dirname, '../src/app/(public)/layout.tsx');
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Remove leading 90 if present, or add if not
  let cleanNumber = whatsappNumber.replace(/^90/, '').replace(/\D/g, '');
  if (!cleanNumber.startsWith('90')) {
    cleanNumber = '90' + cleanNumber;
  }
  
  layoutContent = layoutContent.replace(
    /phoneNumber="[^"]*"/,
    `phoneNumber="${cleanNumber}"`
  );
  
  fs.writeFileSync(layoutPath, layoutContent, 'utf8');
  console.log(`✅ Updated WhatsApp widget with number: ${cleanNumber}`);
}

// Main function
async function main() {
  console.log('🚀 Starting company info scraping...\n');
  
  try {
    // Scrape from both pages
    const [aboutInfo, mainInfo] = await Promise.all([
      scrapeCompanyInfo(),
      scrapeMainPageInfo(),
    ]);
    
    // Merge info (main page info takes priority for contact details)
    const mergedInfo = {
      ...aboutInfo,
      ...mainInfo,
      // Keep about page info for description and establishment year
      description: aboutInfo.description || mainInfo.description,
      establishmentYear: aboutInfo.establishmentYear || mainInfo.establishmentYear,
    };
    
    console.log('\n📦 Scraped company info:');
    console.log(JSON.stringify(mergedInfo, null, 2));
    
    // Update constants file
    await updateConstants(mergedInfo);
    
    // Update WhatsApp widget
    if (mergedInfo.whatsapp) {
      await updateWhatsAppWidget(mergedInfo.whatsapp);
    }
    
    console.log('\n✅ Company info scraping completed!');
    console.log('\n📝 Note: Please review the extracted information and update manually if needed.');
    console.log('   - Establishment year:', mergedInfo.establishmentYear || 'Not found');
    console.log('   - Phone:', mergedInfo.phone || 'Not found');
    console.log('   - WhatsApp:', mergedInfo.whatsapp || 'Not found');
    console.log('   - Email:', mergedInfo.email || 'Not found');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { scrapeCompanyInfo, scrapeMainPageInfo };

