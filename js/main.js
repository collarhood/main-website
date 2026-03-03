// Collarhood Static Website - Main JavaScript

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const isActive = mobileMenu.classList.contains('active');
      menuIcon.innerHTML = isActive ? 
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />' :
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    });
    
    // Close menu when link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// Fetch Products from API
async function fetchProducts(category = null) {
  try {
    let url = `${API_BASE_URL}/products`;
    if (category && category !== 'all') {
      url += `?category=${category}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch Single Product
async function fetchProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch Gallery Items
async function fetchGallery() {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

// Fetch Testimonials
async function fetchTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Fetch Blog Posts
async function fetchBlogPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch Single Blog Post
async function fetchBlogPost(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`);
    if (!response.ok) throw new Error('Blog post not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Submit Custom Order
async function submitCustomOrder(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/custom-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) throw new Error('Failed to submit order');
    return await response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}

// Upload File
async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to upload file');
    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Render Product Card
function renderProductCard(product) {
  return `
    <a href="pages/product-detail.html?id=${product.id}" class="product-card" data-product-id="${product.id}">
      <div class="aspect-square overflow-hidden">
        <img src="${product.image_url}" alt="${product.name}" loading="lazy">
      </div>
      <div style="padding: 1.5rem;">
        <p class="font-mono" style="font-size: 0.75rem; color: var(--yellow); text-transform: uppercase; margin-bottom: 0.5rem;">${product.category}</p>
        <h3 class="font-outfit" style="font-weight: 700; font-size: 1.25rem; color: var(--white); margin-bottom: 0.5rem;">${product.name}</h3>
        <p class="line-clamp-2" style="color: var(--gray-400); font-size: 0.875rem;">${product.description}</p>
      </div>
    </a>
  `;
}

// Render Testimonial Card
function renderTestimonialCard(testimonial) {
  const stars = '★'.repeat(testimonial.rating);
  return `
    <div class="glass" style="padding: 2rem;">
      <div class="star-rating" style="margin-bottom: 1rem;">
        ${stars}
      </div>
      <p style="color: var(--gray-300); margin-bottom: 1.5rem; line-height: 1.6;">"${testimonial.content}"</p>
      <div>
        <p class="font-outfit" style="font-weight: 700; color: var(--white);">${testimonial.name}</p>
        <p class="font-mono" style="font-size: 0.75rem; color: var(--yellow); text-transform: uppercase;">${testimonial.crew_name}</p>
      </div>
    </div>
  `;
}

// Render Gallery Item
function renderGalleryItem(item) {
  return `
    <div class="card" style="overflow: hidden;">
      <div class="aspect-square overflow-hidden">
        <img src="${item.image_url}" alt="${item.title}" loading="lazy">
      </div>
      <div style="padding: 1.5rem;">
        <h3 class="font-outfit" style="font-weight: 700; font-size: 1.125rem; color: var(--white); margin-bottom: 0.5rem;">${item.title}</h3>
        <p style="color: var(--gray-400); font-size: 0.875rem; margin-bottom: 0.5rem;">${item.description}</p>
        ${item.crew_name ? `<p class="font-mono" style="font-size: 0.75rem; color: var(--yellow); text-transform: uppercase;">${item.crew_name}</p>` : ''}
      </div>
    </div>
  `;
}

// Render Blog Post Card
function renderBlogCard(post) {
  const date = new Date(post.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `
    <a href="pages/blog-detail.html?slug=${post.slug}" class="card" style="text-decoration: none; display: block;">
      <div class="aspect-square overflow-hidden">
        <img src="${post.image_url}" alt="${post.title}" loading="lazy">
      </div>
      <div style="padding: 1.5rem;">
        <p class="font-mono" style="font-size: 0.75rem; color: var(--gray-400); margin-bottom: 0.5rem;">${date}</p>
        <h3 class="font-outfit" style="font-weight: 700; font-size: 1.25rem; color: var(--white); margin-bottom: 0.75rem;">${post.title}</h3>
        <p class="line-clamp-2" style="color: var(--gray-400); font-size: 0.875rem; margin-bottom: 1rem;">${post.excerpt}</p>
        <span style="color: var(--yellow); font-size: 0.875rem; font-weight: 600;">Read More →</span>
      </div>
    </a>
  `;
}

// Show Toast Notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'var(--teal)' : 'var(--orange)'};
    color: var(--white);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    font-family: var(--font-outfit);
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Get URL Parameters
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
});

// Smooth Scroll to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Export functions for use in other scripts
window.CollarhoodAPI = {
  fetchProducts,
  fetchProduct,
  fetchGallery,
  fetchTestimonials,
  fetchBlogPosts,
  fetchBlogPost,
  submitCustomOrder,
  uploadFile,
  renderProductCard,
  renderTestimonialCard,
  renderGalleryItem,
  renderBlogCard,
  showToast,
  getUrlParam,
};
