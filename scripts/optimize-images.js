const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Parse command line arguments
const args = process.argv.slice(2);
const REMOVE_ORIGINALS = args.includes('--remove-originals');

const IMAGES_DIR = path.join(__dirname, '../site/images');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];  // Don't process WebP files
const RESPONSIVE_SIZES = [480, 800, 1400];

// Skip patterns for already processed images
const SKIP_PATTERNS = [
  /-\d+\.(jpg|jpeg|png|webp)$/i,  // Skip files with -480, -800, -1400
  /\.(webp|avif)$/i               // Skip already converted WebP/AVIF files
];

// Create output directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Check if file should be skipped (already processed)
function shouldSkipFile(filename) {
  return SKIP_PATTERNS.some(pattern => pattern.test(filename));
}

// Process all images recursively
async function processImages(directory) {
  ensureDirectoryExists(directory);
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const processedImages = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const subDirProcessed = await processImages(entryPath);
      processedImages.push(...subDirProcessed);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      
      // Skip already processed images
      if (shouldSkipFile(entry.name)) {
        continue;
      }
      
      if (EXTENSIONS.includes(ext)) {
        try {
          console.log(`Processing: ${entryPath}`);
          
          // Create responsive versions
          const baseName = path.basename(entry.name, ext);
          const outputDir = path.dirname(entryPath);
          
          for (const size of RESPONSIVE_SIZES) {
            const outputPath = path.join(
              outputDir,
              `${baseName}-${size}${ext}`
            );
            
            await sharp(entryPath)
              .resize(size)
              .jpeg({ quality: 85, mozjpeg: true })
              .png({ quality: 85, compressionLevel: 9 })
              .toFile(outputPath);
          }
          
          // Create WebP versions - both standard and size-specific
          const webpPath = path.join(
            outputDir,
            `${baseName}.webp`
          );
          
          await sharp(entryPath)
            .webp({ quality: 85 })
            .toFile(webpPath);
          
          // Create size-specific WebP versions for responsive images
          for (const size of RESPONSIVE_SIZES) {
            const sizedWebpPath = path.join(
              outputDir,
              `${baseName}-${size}.webp`
            );
            
            await sharp(entryPath)
              .resize(size)
              .webp({ quality: 85 })
              .toFile(sizedWebpPath);
          }
          
          // Create AVIF versions - both standard and size-specific
          const avifPath = path.join(
            outputDir,
            `${baseName}.avif`
          );
          
          await sharp(entryPath)
            .avif({ quality: 80 })
            .toFile(avifPath);
            
          // Create size-specific AVIF versions for responsive images
          for (const size of RESPONSIVE_SIZES) {
            const sizedAvifPath = path.join(
              outputDir,
              `${baseName}-${size}.avif`
            );
            
            await sharp(entryPath)
              .resize(size)
              .avif({ quality: 80 })
              .toFile(sizedAvifPath);
          }
            
          // Mark this image as successfully processed
          processedImages.push({
            path: entryPath,
            baseName,
            ext,
            outputDir
          });
          
        } catch (error) {
          console.error(`Error processing ${entryPath}:`, error.message);
        }
      }
    }
  }
  
  return processedImages;
}

// Main execution
(async () => {
  try {
    console.log('Starting image optimization...');
    if (REMOVE_ORIGINALS) {
      console.log('⚠️ Original images will be removed after optimization');
    }
    
    const processedImages = await processImages(IMAGES_DIR);
    console.log(`Processed ${processedImages.length} images`);
    
    // Remove original images if requested
    if (REMOVE_ORIGINALS && processedImages.length > 0) {
      console.log('Removing original images...');
      
      let removedCount = 0;
      for (const img of processedImages) {
        try {
          // Check that optimized files exist before deleting original
          const mainSizeFile = path.join(img.outputDir, `${img.baseName}-800${img.ext}`);
          const webpFile = path.join(img.outputDir, `${img.baseName}.webp`);
          
          if (fs.existsSync(mainSizeFile) && fs.existsSync(webpFile)) {
            fs.unlinkSync(img.path);
            removedCount++;
          } else {
            console.warn(`Skipping deletion of ${img.path} - optimized versions not found`);
          }
        } catch (err) {
          console.error(`Error removing original image ${img.path}:`, err.message);
        }
      }
      
      console.log(`Removed ${removedCount} original images`);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
