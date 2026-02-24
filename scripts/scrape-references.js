const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://www.kaldetinsaat.com/';

async function scrapeReferences() {
  try {
    console.log('🔍 Referanslar çekiliyor...\n');
    
    const response = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Referanslar bölümünü bul
    const references = [];
    
    // Ana sayfada referanslar bölümünü ara
    // Genellikle logo'lar veya firma isimleri olarak görünür
    $('section, div').each((i, elem) => {
      const text = $(elem).text();
      const heading = $(elem).find('h2, h3, h4').text();
      
      // "Referanslarımız" veya "Referanslar" içeren bölümleri bul
      if (heading.toLowerCase().includes('referans') || 
          text.toLowerCase().includes('referanslarımız') ||
          text.toLowerCase().includes('türkiye\'nin önde gelen firmalar')) {
        
        // Logo'ları veya firma isimlerini bul
        $(elem).find('img, a, span, div').each((j, item) => {
          const $item = $(item);
          const alt = $item.attr('alt') || '';
          const title = $item.attr('title') || '';
          const src = $item.attr('src') || '';
          const textContent = $item.text().trim();
          
          // Firma isimlerini çıkar
          const firmNames = [
            'Toyota', 'Enerjisa', 'Reysaş', 'CEVA', 'Ekol', 'Autoliv',
            'IHI', 'Dalgakıran', 'Lojistik', 'Enerji', 'Otomotiv'
          ];
          
          firmNames.forEach(firm => {
            if ((alt.toLowerCase().includes(firm.toLowerCase()) ||
                 title.toLowerCase().includes(firm.toLowerCase()) ||
                 textContent.toLowerCase().includes(firm.toLowerCase())) &&
                !references.find(r => r.name === firm)) {
              
              // Logo URL'ini düzelt
              let logoUrl = src;
              if (logoUrl && !logoUrl.startsWith('http')) {
                logoUrl = BASE_URL + logoUrl.replace(/^\//, '');
              }
              
              references.push({
                name: firm,
                logo: logoUrl || null,
                source: 'scraped'
              });
            }
          });
        });
      }
    });
    
    // Eğer yukarıdaki yöntemle bulamazsak, sayfadaki tüm görselleri kontrol et
    if (references.length === 0) {
      $('img').each((i, elem) => {
        const $img = $(elem);
        const alt = $img.attr('alt') || '';
        const src = $img.attr('src') || '';
        
        // Logo içeren görselleri bul
        if (alt && (alt.toLowerCase().includes('logo') || 
                    alt.toLowerCase().includes('firma') ||
                    alt.toLowerCase().includes('referans'))) {
          let logoUrl = src;
          if (logoUrl && !logoUrl.startsWith('http')) {
            logoUrl = BASE_URL + logoUrl.replace(/^\//, '');
          }
          
          const firmName = alt.replace(/logo|firma|referans/gi, '').trim();
          if (firmName && !references.find(r => r.name === firmName)) {
            references.push({
              name: firmName,
              logo: logoUrl,
              source: 'scraped'
            });
          }
        }
      });
    }
    
    // Bilinen referans firmaları (web sitesinden görünenler)
    const knownReferences = [
      { name: 'Toyota', logo: '/images/clients/toyota.png' },
      { name: 'Enerjisa', logo: '/images/clients/enerjisa.png' },
      { name: 'Reysaş', logo: '/images/clients/reysas.png' },
      { name: 'CEVA Lojistik', logo: '/images/clients/ceva-lojistik.png' },
      { name: 'Ekol Lojistik', logo: '/images/clients/ekol-lojistik.png' },
      { name: 'Autoliv', logo: '/images/clients/autoliv.png' },
      { name: 'IHI Dalgakıran', logo: '/images/clients/ihi-dalgakiran.png' },
    ];
    
    // Çekilen referansları birleştir
    const allReferences = [...knownReferences];
    
    // Çekilen referansları ekle (duplicate kontrolü ile)
    references.forEach(ref => {
      if (!allReferences.find(r => r.name.toLowerCase() === ref.name.toLowerCase())) {
        allReferences.push({
          name: ref.name,
          logo: ref.logo || `/images/clients/${ref.name.toLowerCase().replace(/\s+/g, '-')}.png`
        });
      }
    });
    
    console.log(`✅ ${allReferences.length} referans bulundu:\n`);
    allReferences.forEach((ref, index) => {
      console.log(`${index + 1}. ${ref.name}`);
    });
    
    // JSON dosyasına kaydet
    const outputPath = path.join(__dirname, '../data/references.json');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(allReferences, null, 2));
    console.log(`\n💾 Referanslar ${outputPath} dosyasına kaydedildi.`);
    
    return allReferences;
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('URL:', error.response.config.url);
    }
    throw error;
  }
}

// Script çalıştırılırsa
if (require.main === module) {
  scrapeReferences()
    .then(() => {
      console.log('\n✨ İşlem tamamlandı!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ İşlem başarısız:', error);
      process.exit(1);
    });
}

module.exports = { scrapeReferences };

