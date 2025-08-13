# Elder Pharmaceuticals

Elder Pharmaceuticals is a professional website for a pharmaceutical company. The site showcases products and services in the pharmaceutical industry.

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

### Image Optimization with ImgBot

* The repository is configured with ImgBot to automatically optimize images
* ImgBot will raise a PR whenever new images are committed to the repository
* Configuration details:
  * Runs on every commit with new images (`"schedule": "onCommit"`)
  * Uses aggressive compression for maximum optimization
  * Ignores vendor and node_modules directories
  * Minimum 10KB size reduction required for optimization
  * Configuration stored in `.imgbotconfig` file in the root directory