// Product service for fetching real products from Blinkit/Instamart/Swiggy
// This is structured to easily integrate with real APIs

const API_CONFIG = {
  blinkit: {
    enabled: false, // Set to true when you have API credentials
    apiKey: '', // Add your API key here
    baseUrl: 'https://api.blinkit.com', // Example - update with actual API URL
  },
  instamart: {
    enabled: false,
    apiKey: '',
    baseUrl: 'https://api.instamart.com', // Example - update with actual API URL
  },
  swiggy: {
    enabled: false,
    apiKey: '',
    baseUrl: 'https://api.swiggy.com', // Example - update with actual API URL
  }
}

// Mock product data for demonstration
// In production, replace this with actual API calls
const MOCK_PRODUCTS = {
  'photography': [
    { id: '1', name: 'Canon EOS Camera Bag', price: 1299, platform: 'blinkit', image: '📷', inStock: true, deliveryTime: '10 min' },
    { id: '2', name: 'Memory Card 64GB', price: 499, platform: 'blinkit', image: '💾', inStock: true, deliveryTime: '10 min' },
    { id: '3', name: 'Camera Lens Cleaner Kit', price: 299, platform: 'swiggy', image: '🧹', inStock: true, deliveryTime: '30 min' },
  ],
  'cooking': [
    { id: '4', name: 'Premium Olive Oil 500ml', price: 599, platform: 'blinkit', image: '🫒', inStock: true, deliveryTime: '10 min' },
    { id: '5', name: 'Silicone Cooking Utensils Set', price: 799, platform: 'blinkit', image: '🥄', inStock: true, deliveryTime: '10 min' },
    { id: '6', name: 'Gourmet Spice Collection', price: 899, platform: 'swiggy', image: '🧂', inStock: true, deliveryTime: '30 min' },
  ],
  'coffee': [
    { id: '7', name: 'Arabica Coffee Beans 500g', price: 699, platform: 'blinkit', image: '☕', inStock: true, deliveryTime: '10 min' },
    { id: '8', name: 'French Press Coffee Maker', price: 1299, platform: 'blinkit', image: '☕', inStock: true, deliveryTime: '10 min' },
    { id: '9', name: 'Premium Tea Collection', price: 499, platform: 'swiggy', image: '🍵', inStock: true, deliveryTime: '30 min' },
  ],
  'books': [
    { id: '10', name: 'Bestseller Book Collection', price: 599, platform: 'blinkit', image: '📚', inStock: true, deliveryTime: '10 min' },
    { id: '11', name: 'Notebook Set - Premium', price: 399, platform: 'blinkit', image: '📓', inStock: true, deliveryTime: '10 min' },
  ],
  'wellness': [
    { id: '12', name: 'Aromatherapy Candle Set', price: 899, platform: 'blinkit', image: '🕯️', inStock: true, deliveryTime: '10 min' },
    { id: '13', name: 'Essential Oil Diffuser', price: 1299, platform: 'swiggy', image: '💨', inStock: true, deliveryTime: '30 min' },
    { id: '14', name: 'Yoga Mat Premium', price: 799, platform: 'blinkit', image: '🧘', inStock: true, deliveryTime: '10 min' },
  ],
  'chocolate': [
    { id: '15', name: 'Belgian Dark Chocolate Box', price: 599, platform: 'blinkit', image: '🍫', inStock: true, deliveryTime: '10 min' },
    { id: '16', name: 'Gourmet Chocolate Gift Set', price: 1299, platform: 'swiggy', image: '🍫', inStock: true, deliveryTime: '30 min' },
  ],
  'flowers': [
    { id: '17', name: 'Fresh Rose Bouquet', price: 499, platform: 'blinkit', image: '🌹', inStock: true, deliveryTime: '10 min' },
    { id: '18', name: 'Mixed Flower Arrangement', price: 799, platform: 'swiggy', image: '💐', inStock: true, deliveryTime: '30 min' },
  ],
  'general': [
    { id: '19', name: 'Gift Card - Amazon', price: 1000, platform: 'blinkit', image: '💳', inStock: true, deliveryTime: '10 min' },
    { id: '20', name: 'Gourmet Gift Hamper', price: 1499, platform: 'swiggy', image: '🎁', inStock: true, deliveryTime: '30 min' },
  ]
}

/**
 * Search for products on Blinkit/Instamart/Swiggy based on interests and budget
 * @param {Object} params - Search parameters
 * @param {string} params.interests - User interests
 * @param {string} params.budget - Budget range
 * @param {number} params.maxResults - Maximum number of results
 * @returns {Promise<Array>} Array of product objects
 */
export async function searchProducts({ interests = '', budget = '', maxResults = 5 }) {
  // For now, return mock data
  // In production, replace this with actual API calls
  
  // Check if any service is enabled
  const hasEnabledService = Object.values(API_CONFIG).some(config => config.enabled)
  
  if (!hasEnabledService) {
    // Return mock products for demo
    return getMockProducts(interests, budget, maxResults)
  }
  
  // TODO: Implement real API calls when credentials are available
  // Example structure:
  /*
  const products = []
  
  if (API_CONFIG.blinkit.enabled) {
    const blinkitProducts = await fetchBlinkitProducts({ interests, budget })
    products.push(...blinkitProducts)
  }
  
  if (API_CONFIG.swiggy.enabled) {
    const swiggyProducts = await fetchSwiggyProducts({ interests, budget })
    products.push(...swiggyProducts)
  }
  
  return products.slice(0, maxResults)
  */
  
  return getMockProducts(interests, budget, maxResults)
}

/**
 * Get mock products based on interests
 */
function getMockProducts(interests, budget, maxResults) {
  const interestLower = interests.toLowerCase()
  const products = []
  
  // Match interests to product categories
  if (interestLower.includes('photography') || interestLower.includes('photo') || interestLower.includes('camera')) {
    products.push(...MOCK_PRODUCTS.photography)
  }
  if (interestLower.includes('cooking') || interestLower.includes('cook') || interestLower.includes('chef')) {
    products.push(...MOCK_PRODUCTS.cooking)
  }
  if (interestLower.includes('coffee') || interestLower.includes('tea') || interestLower.includes('drink')) {
    products.push(...MOCK_PRODUCTS.coffee)
  }
  if (interestLower.includes('book') || interestLower.includes('read') || interestLower.includes('reading')) {
    products.push(...MOCK_PRODUCTS.books)
  }
  if (interestLower.includes('wellness') || interestLower.includes('spa') || interestLower.includes('relax')) {
    products.push(...MOCK_PRODUCTS.wellness)
  }
  if (interestLower.includes('chocolate') || interestLower.includes('sweet')) {
    products.push(...MOCK_PRODUCTS.chocolate)
  }
  if (interestLower.includes('flower') || interestLower.includes('rose')) {
    products.push(...MOCK_PRODUCTS.flowers)
  }
  
  // If no specific match, add general products
  if (products.length === 0) {
    products.push(...MOCK_PRODUCTS.general)
  }
  
  // Filter by budget if provided
  let filteredProducts = products
  if (budget) {
    const budgetRanges = {
      'under-25': { min: 0, max: 2500 },
      '25-50': { min: 2500, max: 5000 },
      '50-100': { min: 5000, max: 10000 },
      '100-250': { min: 10000, max: 25000 },
      '250-500': { min: 25000, max: 50000 },
      '500-plus': { min: 50000, max: Infinity }
    }
    
    const range = budgetRanges[budget]
    if (range) {
      filteredProducts = products.filter(p => p.price >= range.min && p.price <= range.max)
    }
  }
  
  // Return limited results
  return filteredProducts.slice(0, maxResults)
}

/**
 * Fetch products from Blinkit API (placeholder for real implementation)
 */
async function fetchBlinkitProducts({ interests, budget }) {
  // TODO: Implement actual Blinkit API call
  // Example:
  /*
  const response = await fetch(`${API_CONFIG.blinkit.baseUrl}/products/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.blinkit.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: interests,
      priceRange: budget,
      limit: 10
    })
  })
  const data = await response.json()
  return data.products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    platform: 'blinkit',
    image: product.image_url,
    inStock: product.in_stock,
    deliveryTime: product.delivery_time,
    url: product.order_url
  }))
  */
  return []
}

/**
 * Fetch products from Swiggy API (placeholder for real implementation)
 */
async function fetchSwiggyProducts({ interests, budget }) {
  // TODO: Implement actual Swiggy API call
  return []
}

/**
 * Get platform display name
 */
export function getPlatformName(platform) {
  const names = {
    'blinkit': 'Blinkit',
    'instamart': 'Instamart',
    'swiggy': 'Swiggy Instamart'
  }
  return names[platform] || platform
}

/**
 * Get platform color for UI
 */
export function getPlatformColor(platform) {
  const colors = {
    'blinkit': '#00D9FF',
    'instamart': '#FF6B35',
    'swiggy': '#FC8019'
  }
  return colors[platform] || '#8b5cf6'
}

