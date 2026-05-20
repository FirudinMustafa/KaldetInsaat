const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

// Helper function to generate slug
function generateSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'tr',
  });
}

// Helper function to extract text from element
function extractText($, element, selector) {
  const found = $(element).find(selector);
  return found.length > 0 ? found.text().trim() : null;
}

// Helper function to extract image URL
function extractImageUrl($, element, selector) {
  const found = $(element).find(selector);
  if (found.length > 0) {
    const src = found.attr('src') || found.attr('data-src') || found.attr('data-lazy-src');
    if (src) {
      // Convert relative URLs to absolute
      if (src.startsWith('http')) return src;
      if (src.startsWith('//')) return `https:${src}`;
      if (src.startsWith('/')) return `https://www.kaldetinsaat.com${src}`;
      return `https://www.kaldetinsaat.com/${src}`;
    }
  }
  return null;
}

// Parse date from Turkish format
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Try to parse various date formats
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) return date;
  
  // Try Turkish month names
  const turkishMonths = {
    'ocak': 0, 'şubat': 1, 'mart': 2, 'nisan': 3, 'mayıs': 4, 'haziran': 5,
    'temmuz': 6, 'ağustos': 7, 'eylül': 8, 'ekim': 9, 'kasım': 10, 'aralık': 11
  };
  
  for (const [month, index] of Object.entries(turkishMonths)) {
    if (dateStr.toLowerCase().includes(month)) {
      const yearMatch = dateStr.match(/\d{4}/);
      if (yearMatch) {
        return new Date(parseInt(yearMatch[0]), index, 1);
      }
    }
  }
  
  return null;
}

// Scrape projects from kaldetinsaat.com/projelerimiz
async function scrapeKaldetProjects() {
  try {
    console.log('📥 Fetching projects from kaldetinsaat.com/projelerimiz...');
    const response = await axios.get('http://www.kaldetinsaat.com/projelerimiz/', {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const projects = [];
    
    // Try different selectors based on common website structures
    const projectSelectors = [
      '.project-item',
      '.project',
      '.portfolio-item',
      '.proje-item',
      'article.project',
      '[class*="project"]',
    ];
    
    let projectElements = $();
    for (const selector of projectSelectors) {
      projectElements = $(selector);
      if (projectElements.length > 0) {
        console.log(`✅ Found ${projectElements.length} projects using selector: ${selector}`);
        break;
      }
    }
    
    // If no specific selector works, try to find all cards/items
    if (projectElements.length === 0) {
      projectElements = $('.card, .item, article, [class*="card"], [class*="item"]');
      console.log(`⚠️  Using fallback selector, found ${projectElements.length} elements`);
    }
    
    projectElements.each((index, element) => {
      try {
        const title = extractText($, element, 'h2, h3, .title, [class*="title"]') || 
                     extractText($, element, 'a') || 
                     'Proje ' + (index + 1);
        
        if (!title || title.length < 3) return; // Skip if title is too short
        
        const description = extractText($, element, '.description, .content, p, [class*="desc"]') || 
                           extractText($, element, 'p') || 
                           '';
        
        const location = extractText($, element, '.location, [class*="location"]') || 
                        extractText($, element, '[class*="konum"]') || 
                        'Kocaeli';
        
        const coverImage = extractImageUrl($, element, 'img, [class*="image"]');
        
        const link = $(element).find('a').attr('href');
        const projectUrl = link ? (link.startsWith('http') ? link : `http://www.kaldetinsaat.com${link}`) : null;
        
        // Try to extract date
        const dateText = extractText($, element, '.date, [class*="date"], time');
        const startDate = parseDate(dateText);
        
        // Try to extract area
        const areaText = extractText($, element, '.area, [class*="area"], [class*="alan"]');
        const areaMatch = areaText ? areaText.match(/(\d+(?:[.,]\d+)?)\s*m[²2]/i) : null;
        const area = areaMatch ? parseFloat(areaMatch[1].replace(',', '.')) : null;
        
        const slug = generateSlug(title);
        
        projects.push({
          slug,
          title,
          description: description || `${title} projesi hakkında detaylı bilgi.`,
          location,
          coverImage,
          startDate,
          area,
          projectUrl,
          source: 'kaldetinsaat.com',
        });
      } catch (err) {
        console.error(`❌ Error parsing project ${index}:`, err.message);
      }
    });
    
    console.log(`✅ Scraped ${projects.length} projects from kaldetinsaat.com`);
    return projects;
  } catch (error) {
    console.error('❌ Error scraping kaldetinsaat.com:', error.message);
    return [];
  }
}

// Scrape projects from preview site
async function scrapePreviewProjects() {
  try {
    console.log('📥 Fetching projects from build-kaldet.preview.emergentagent.com...');
    const response = await axios.get('https://build-kaldet.preview.emergentagent.com/', {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const projects = [];
    
    // Try different selectors
    const projectSelectors = [
      '.project-item',
      '.project',
      '.portfolio-item',
      'article.project',
      '[class*="project"]',
    ];
    
    let projectElements = $();
    for (const selector of projectSelectors) {
      projectElements = $(selector);
      if (projectElements.length > 0) {
        console.log(`✅ Found ${projectElements.length} projects using selector: ${selector}`);
        break;
      }
    }
    
    if (projectElements.length === 0) {
      projectElements = $('.card, .item, article');
      console.log(`⚠️  Using fallback selector, found ${projectElements.length} elements`);
    }
    
    projectElements.each((index, element) => {
      try {
        const title = extractText($, element, 'h2, h3, .title, [class*="title"]') || 
                     extractText($, element, 'a') || 
                     'Proje ' + (index + 1);
        
        if (!title || title.length < 3) return;
        
        const description = extractText($, element, '.description, .content, p, [class*="desc"]') || '';
        const location = extractText($, element, '.location, [class*="location"]') || 'Kocaeli';
        const coverImage = extractImageUrl($, element, 'img');
        
        const link = $(element).find('a').attr('href');
        const projectUrl = link ? (link.startsWith('http') ? link : `https://build-kaldet.preview.emergentagent.com${link}`) : null;
        
        const dateText = extractText($, element, '.date, [class*="date"], time');
        const startDate = parseDate(dateText);
        
        const areaText = extractText($, element, '.area, [class*="area"]');
        const areaMatch = areaText ? areaText.match(/(\d+(?:[.,]\d+)?)\s*m[²2]/i) : null;
        const area = areaMatch ? parseFloat(areaMatch[1].replace(',', '.')) : null;
        
        const slug = generateSlug(title);
        
        projects.push({
          slug,
          title,
          description: description || `${title} projesi hakkında detaylı bilgi.`,
          location,
          coverImage,
          startDate,
          area,
          projectUrl,
          source: 'preview.emergentagent.com',
        });
      } catch (err) {
        console.error(`❌ Error parsing project ${index}:`, err.message);
      }
    });
    
    console.log(`✅ Scraped ${projects.length} projects from preview site`);
    return projects;
  } catch (error) {
    console.error('❌ Error scraping preview site:', error.message);
    return [];
  }
}

// Merge projects - if duplicate exists, prefer preview site
function mergeProjects(kaldetProjects, previewProjects) {
  const merged = [];
  const seenSlugs = new Set();
  
  // First add preview projects (higher priority)
  previewProjects.forEach(project => {
    merged.push(project);
    seenSlugs.add(project.slug);
  });
  
  // Then add kaldet projects that don't have duplicates
  kaldetProjects.forEach(project => {
    if (!seenSlugs.has(project.slug)) {
      merged.push(project);
      seenSlugs.add(project.slug);
    } else {
      console.log(`⚠️  Skipping duplicate: ${project.title} (preview site version preferred)`);
    }
  });
  
  return merged;
}

// Save projects to database
async function saveProjects(projects) {
  if (projects.length === 0) {
    console.log('⚠️  No projects to save');
    return;
  }
  
  // Get first admin user for createdById
  const adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });
  
  if (!adminUser) {
    console.error('❌ No admin user found. Please create an admin user first.');
    return;
  }
  
  let saved = 0;
  let updated = 0;
  let errors = 0;
  
  for (const projectData of projects) {
    try {
      const existing = await prisma.project.findUnique({
        where: { slug: projectData.slug },
      });
      
      if (existing) {
        // Update existing project
        await prisma.project.update({
          where: { slug: projectData.slug },
          data: {
            title: projectData.title,
            description: projectData.description,
            location: projectData.location,
            coverImage: projectData.coverImage || existing.coverImage,
            startDate: projectData.startDate || existing.startDate,
            area: projectData.area || existing.area,
            isPublished: true,
          },
        });
        updated++;
        console.log(`✅ Updated: ${projectData.title}`);
      } else {
        // Create new project
        await prisma.project.create({
          data: {
            slug: projectData.slug,
            title: projectData.title,
            description: projectData.description,
            location: projectData.location,
            coverImage: projectData.coverImage,
            startDate: projectData.startDate,
            area: projectData.area,
            status: 'COMPLETED',
            isPublished: true,
            createdById: adminUser.id,
          },
        });
        saved++;
        console.log(`✅ Created: ${projectData.title}`);
      }
    } catch (error) {
      errors++;
      console.error(`❌ Error saving project ${projectData.title}:`, error.message);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Created: ${saved}`);
  console.log(`   🔄 Updated: ${updated}`);
  console.log(`   ❌ Errors: ${errors}`);
}

// Main function
async function main() {
  console.log('🚀 Starting project scraping...\n');
  
  try {
    // Scrape from both sites
    const [kaldetProjects, previewProjects] = await Promise.all([
      scrapeKaldetProjects(),
      scrapePreviewProjects(),
    ]);
    
    // Merge projects (preview site has priority)
    const mergedProjects = mergeProjects(kaldetProjects, previewProjects);
    
    console.log(`\n📦 Total unique projects: ${mergedProjects.length}`);
    
    // Save to database
    await saveProjects(mergedProjects);
    
    console.log('\n✅ Scraping completed successfully!');
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

module.exports = { scrapeKaldetProjects, scrapePreviewProjects, mergeProjects, saveProjects };

