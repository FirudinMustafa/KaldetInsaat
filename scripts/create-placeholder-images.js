/**
 * Create Placeholder Images Script
 *
 * This script creates placeholder image directories and README files
 * for all required images in the project.
 *
 * Run: node scripts/create-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');

// Define all required image paths
const imagePaths = {
  clients: [
    'toyota.png',
    'ihi-dalgakiran.png',
    'enerjisa.png',
    'reysas.png',
    'ceva-lojistik.png',
    'ekol-lojistik.png',
    'autoliv.png',
  ],
  services: [
    'endustriyel-zemin-betonu.jpg',
    'baski-beton.jpg',
    'epoksi-zemin.jpg',
    'celik-konstruksiyon.jpg',
    'bakim-onarim.jpg',
    'altyapi.jpg',
  ],
  projects: [
    'project-1.jpg',
    'project-2.jpg',
    'project-3.jpg',
    'project-4.jpg',
    'project-5.jpg',
    'project-6.jpg',
  ],
  root: [
    'hero-slider.png',
    'og-image.jpg',
  ],
  logo: [
    'kaldet-logo.png',
    'kaldet-logo-white.png',
  ],
};

// Create directory if it doesn't exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

// Create a README file for missing images
function createReadme(dir, files) {
  const readmePath = path.join(dir, 'README.md');
  const content = `# ${path.basename(dir).charAt(0).toUpperCase() + path.basename(dir).slice(1)} Images

## Required Images

The following images are required for this directory:

${files.map(file => `- ${file}`).join('\n')}

## Image Specifications

### For Client Logos:
- **Format:** PNG (with transparent background preferred)
- **Size:** 200x80px or similar aspect ratio
- **Quality:** High resolution for retina displays

### For Service Images:
- **Format:** JPG
- **Size:** 1200x800px (3:2 aspect ratio)
- **Quality:** High quality, optimized for web

### For Project Images:
- **Format:** JPG
- **Size:** 1200x900px (4:3 aspect ratio)
- **Quality:** High quality, before-after shots preferred

### For Hero/OG Images:
- **hero-slider.png:** 1920x1080px (16:9)
- **og-image.jpg:** 1200x630px (OpenGraph standard)

## Adding Images

1. Place the image files in this directory
2. Ensure filenames match exactly (case-sensitive)
3. Optimize images before uploading (use tools like TinyPNG)
4. Test on the website to ensure proper display

## Alternative: Use Placeholder Service

If you don't have images yet, you can use placeholder services:
- https://placehold.co/
- https://via.placeholder.com/

Example:
\`\`\`
https://placehold.co/200x80/png?text=Toyota+Logo
\`\`\`
`;

  fs.writeFileSync(readmePath, content);
  console.log(`📝 Created README: ${readmePath}`);
}

// Main function
function main() {
  console.log('🎨 Creating placeholder image structure...\n');

  const publicDir = path.join(process.cwd(), 'public', 'images');
  ensureDir(publicDir);

  // Create client logos directory
  const clientsDir = path.join(publicDir, 'clients');
  ensureDir(clientsDir);
  createReadme(clientsDir, imagePaths.clients);

  // Create services directory
  const servicesDir = path.join(publicDir, 'services');
  ensureDir(servicesDir);
  createReadme(servicesDir, imagePaths.services);

  // Create projects directory
  const projectsDir = path.join(publicDir, 'projects');
  ensureDir(projectsDir);
  createReadme(projectsDir, imagePaths.projects);

  // Create logo directory
  const logoDir = path.join(publicDir, 'logo');
  ensureDir(logoDir);
  createReadme(logoDir, imagePaths.logo);

  // Create README for root images
  const rootImagesReadme = path.join(publicDir, 'ROOT-IMAGES.md');
  const rootContent = `# Root Level Images

## Required Images (place in /public/images/)

${imagePaths.root.map(file => `- ${file}`).join('\n')}

### hero-slider.png
- **Size:** 1920x1080px
- **Purpose:** Homepage hero background
- **Content:** Construction site or industrial facility

### og-image.jpg
- **Size:** 1200x630px
- **Purpose:** Social media sharing (OpenGraph)
- **Content:** Company logo with tagline or featured project
`;

  fs.writeFileSync(rootImagesReadme, rootContent);
  console.log(`📝 Created root images guide: ${rootImagesReadme}`);

  console.log('\n✅ Placeholder structure created successfully!');
  console.log('\n📌 Next steps:');
  console.log('1. Review the README files in each directory');
  console.log('2. Add your actual images to the directories');
  console.log('3. Run the development server and check image loading');
  console.log('\n💡 Tip: You can use placeholder images from https://placehold.co/ for testing');
}

// Run the script
main();
