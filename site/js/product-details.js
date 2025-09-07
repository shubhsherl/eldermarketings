$(document).ready(function() {
  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get product name from URL parameter
  const productSlug = getUrlParameter('name');
  
  if (productSlug) {
    // Get product data for this slug
    getProductBySlug(productSlug, function(product) {
      if (product) {
        // Update page title
        document.title = `Elder Pharmaceuticals - ${product.name}`;
        
        // Update product details
        $('#product-image').attr('src', product.image);
        $('#product-image').attr('alt', product.name);
        
        // Add an error handler for the image to use a placeholder if the product image doesn't exist
        $('#product-image').on('error', function() {
          $(this).attr('src', '/images/products/placeholder.png');
        });
        
        $('#product-name').text(product.name);
        $('#product-category span').text(product.category);
        $('#product-price').text(`₹${product.price}`);
        $('#product-description').text(product.description);
        
        // Update features
        const $featuresList = $('#product-features');
        $featuresList.empty();
        product.features.forEach(feature => {
          $featuresList.append(`<li>${feature}</li>`);
        });
        
        // Update contact link
        $('#contact-link').attr('href', `/contact/?product=${encodeURIComponent(product.slug)}`);
        
        // Get products in the same category for related products
        getProductsByCategory(product.category, function(categoryProducts) {
          // Filter out the current product
          const relatedProducts = categoryProducts.filter(p => p.slug !== product.slug).slice(0, 3);
          
          const $relatedContainer = $('#related-products');
          $relatedContainer.empty();
          
          if (relatedProducts.length > 0) {
            // Add a divider before related products
            $('.product-container').addClass('mb-5');
            
            relatedProducts.forEach(related => {
              $relatedContainer.append(`
                <div class="col-lg-4 col-md-6">
                  <div class="related-product">
                    <a href="/product/?name=${related.slug}">
                      <div class="related-product-image">
                        <img src="${related.image}" alt="${related.name}" class="img-fluid" onerror="this.src='/images/products/placeholder.png'">
                      </div>
                      <div class="related-product-details">
                        <h4>${related.name}</h4>
                        <p class="related-product-description">${getShortDescription(related.description)}</p>
                        <p class="related-product-price">₹${related.price}</p>
                      </div>
                    </a>
                  </div>
                </div>
              `);
            });
          } else {
            $('.row.mt-5.pt-4').hide();
          }
        });
      } else {
        // Product not found
        $('#product-container').html('<div class="col-12 text-center"><h2>Product not found</h2><p>The product you are looking for does not exist.</p><a href="/products/" class="btn btn-primary">View All Products</a></div>');
        $('.related-products').hide();
      }
    });
  } else {
    // No product specified, redirect to products page
    window.location.href = '/products/';
  }
});