const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Optimize only a few test images
async function optimizeTestImages() {
  try {
    console.log('Starting test optimization...');
    
    // Test with one image
    const testImage = path.join(__dirname, '../site/images/blog/blog-thumb-1.jpg');
    
    if (!fs.existsSync(testImage)) {
      console.error(`Test image not found: ${testImage}`);
      return;
    }
    
    console.log(`Processing: ${testImage}`);
    
    // Create responsive version
    await sharp(testImage)
      .resize(480)
      .jpeg({ quality: 85 })
      .toFile(path.join(__dirname, '../site/images/blog/blog-thumb-1-480.jpg'));
    
    console.log('Created responsive version');
    
    // Create WebP version
    await sharp(testImage)
      .webp({ quality: 85 })
      .toFile(path.join(__dirname, '../site/images/blog/blog-thumb-1.webp'));
    
    console.log('Created WebP version');
    
    // Create AVIF version
    await sharp(testImage)
      .avif({ quality: 80 })
      .toFile(path.join(__dirname, '../site/images/blog/blog-thumb-1.avif'));
    
    console.log('Created AVIF version');
    
    console.log('Test image optimization complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

optimizeTestImages();
