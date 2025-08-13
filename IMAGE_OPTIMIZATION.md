# Image Optimization for Elder Marketing Website

This document explains how image optimization works in the Elder Marketing website to ensure fast loading times and optimal user experience.

## Overview

The website now uses a modern image optimization approach that:

1. **Converts images to WebP and AVIF formats** - Modern formats that are 30-90% smaller than JPEG/PNG
2. **Creates responsive image sizes** - Different sizes for different devices to reduce bandwidth
3. **Implements lazy loading** - Images load only when they come into view
4. **Uses image compression** - Reduces file size without visible quality loss

## How to Use the Optimized Images

### 1. For Regular Images

Replace standard `<img>` tags with the picture include:

```liquid
{% include picture.html 
   src="/images/hero/hero-image.jpg" 
   alt="Hero image description" 
   width="800" 
   height="600" %}
```

### 2. For Background Images

Use the responsive classes in your HTML:

```html
<div class="image-container aspect-16-9">
   <img src="/images/hero/hero-image.jpg" alt="Description" loading="lazy">
</div>
```

## Workflow for Adding New Images

### Option 1: Optimize a Single Image

1. **Add your new image** to the appropriate folder in `/site/images/`
2. **Optimize just that image** with:
   ```
   npm run optimize-image site/images/your-folder/your-image.jpg
   ```
3. **Use the responsive picture include** in your templates

### Option 2: Optimize All Images

1. **Add original high-quality images** to the appropriate folder in `/site/images/`
2. **Run batch image optimization** with one of these commands:
   ```
   # Keep original images
   npm run optimize-images
   
   # Remove original images after optimization (saves space)
   npm run optimize-images -- --remove-originals
   ```
3. **Use the responsive picture include** in your templates

> **Important**: The image optimization process is intentionally a separate, manual step to avoid unnecessary processing. Run it only after adding new images, not every time you serve the site. The scripts are designed to skip already optimized images.

## Available Image Sizes

The system automatically creates these sizes for each image:
- Mobile: 480px wide
- Tablet: 800px wide
- Desktop: 1400px wide

## Image Formats Generated

For each image, these formats are created:
- Original format (.jpg/.png) - For browser fallback
- WebP - Modern format with wide browser support
- AVIF - Newest format with best compression (where supported)

## Technical Implementation

- Jekyll plugins handle WebP generation
- Node.js scripts process AVIF versions and responsive sizes
- CSS ensures proper rendering and prevents layout shifts
- ImgBot is configured for additional compression

## Monitoring Performance

After implementing these changes, you should see significant improvements in:
- Page load speed
- Mobile performance scores
- Core Web Vitals metrics

## Troubleshooting

If images aren't showing correctly:
1. Make sure the responsive CSS is included
2. Check that image paths are correct
3. Verify the optimization script has been run
4. Check browser support for WebP/AVIF

If you need to revert to standard images, you can use regular `<img>` tags.
