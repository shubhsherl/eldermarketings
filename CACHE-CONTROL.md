# Cache Control Configuration for Static Assets

This document provides instructions for implementing long-term cache control headers for static assets (images, CSS, JavaScript, and fonts) to improve website performance.

## Why Cache Control Matters

Setting proper cache control headers:
- Reduces bandwidth usage and server load
- Improves page load times for returning visitors
- Reduces the number of HTTP requests
- Improves your Lighthouse and PageSpeed scores

## Included Configuration Files

1. `.htaccess` - For Apache servers
2. `nginx-cache-config.conf` - For Nginx servers

## Implementation Guide

### Apache Server

If your site is hosted on an Apache server, the included `.htaccess` file should be automatically used. Make sure your hosting provider has `mod_expires` and `mod_headers` modules enabled.

### Nginx Server

If you're using Nginx, include the contents of `nginx-cache-config.conf` in your server block configuration.

Example:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Include the cache configuration
    include /path/to/nginx-cache-config.conf;
    
    # Rest of your server configuration...
}
```

### Cloudflare or Other CDNs

If you're using Cloudflare or another CDN:

1. Set the Browser Cache TTL to "1 year" in the Cloudflare dashboard under the Caching section.
2. Make sure the "Respect Existing Headers" option is enabled if you've also implemented the server-side caching.

### GitHub Pages

GitHub Pages doesn't allow custom cache control headers. Consider using Cloudflare in front of GitHub Pages to gain control over caching.

### Netlify

Add a `netlify.toml` file in your project root with:

```toml
[[headers]]
  for = "*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Add similar rules for other file types
```

## Versioning Strategy

When you update an image or static asset, you should use one of these strategies to ensure the browser downloads the new version:

1. **Filename versioning**: Change the filename (e.g., `logo-v2.png`)
2. **Query parameters**: Add a query parameter (e.g., `logo.png?v=2`)

## Testing Cache Headers

To verify that your cache headers are working correctly, use:

1. Chrome DevTools: Network tab, click on any image and check the Response Headers
2. Online tools like [REDbot](https://redbot.org/)
3. Command line: `curl -I https://yourdomain.com/path/to/image.jpg`

## References

- [MDN Web Docs: HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Google Lighthouse: Serve static assets with an efficient cache policy](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl)
