# Elder Marketings

Elder Marketings is a professional website for a pharmaceutical company. The site showcases products and services in the pharmaceutical industry.

[![Deploy to CloudCannon](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/CloudCannon/sendit-eleventy-template)

## Features

- Pre-built pages
- Pre-styled components
- Blog with pagination and category pages
- Configurable navigation and footer
- Multiple hero options
- Configurable theme colors
- Optimised for editing in CloudCannon

## Setup

Get a workflow going to see your site's output (with [CloudCannon](https://app.cloudcannon.com/) or locally).

## Prerequisites

## Quickstart

2. Run `npm i` to install the modules.
3. Run `npm run start` to run the project. this will create a \_site folder, where all the developed file will remain.

By default the site will be at `http://localhost:8080`

## Editing

Sendit is set up for adding, updating and removing pages, components, posts, navigation and footer elements in [CloudCannon](https://app.cloudcannon.com/).

### Nav/footer details

* Reused around the site to save multiple editing locations.
* Set in the *Data* section with respective names

### SEO details and favicon

* Favicon and site SEO details are set in the *Data* / *Site* section
* SEO details can also be set in pages for page specific details

### Theme colors

* Theme colors can be set in *Data* / *Site* / *theme*
* The main colors are set and variants of them are computed
* The colors will update on the next build

### Image Optimization

#### Manual Image Optimization (Recommended)

We use a custom image optimization system that creates responsive, modern-format images:

1. **Adding New Images**:
   - Place original high-quality images in the appropriate folder under `site/images/`
   - Run `npm run optimize-image site/images/your-folder/your-image.jpg` for a single image
   - Run `npm run optimize-images` to process all unoptimized images
   - To save space, run `npm run optimize-images -- --remove-originals` to delete original files after optimization

2. **Using Optimized Images in Content**:
   - In HTML/Jekyll templates: 
     ```liquid
     {% include picture.html src="/images/folder/image.jpg" alt="Description" %}
     ```
   - In Markdown content:
     ```markdown
     ![Image description]({% include picture-url.html src="/images/folder/image.jpg" %})
     ```

3. **Available Image Formats**:
   - For each image, the system generates:
     - Three sizes (480px, 800px, 1400px) in original format
     - WebP versions of all sizes
     - AVIF versions of all sizes

For detailed documentation, see [IMAGE_OPTIMIZATION.md](./IMAGE_OPTIMIZATION.md).

#### Automated Optimization with ImgBot (Fallback)

* ImgBot will automatically optimize images that haven't been manually optimized
* ImgBot will raise a PR whenever new images are committed to the repository
* Configuration details:
  * Runs daily (`"schedule": "daily"`)
  * Uses aggressive compression for maximum optimization
  * Ignores vendor and node_modules directories
  * Configuration stored in `.imgbotconfig` file in the root directory