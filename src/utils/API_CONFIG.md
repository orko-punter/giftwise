# API Configuration Guide

This app supports integration with Blinkit, Instamart, and Swiggy Instamart for real product recommendations.

## Current Status

Currently, the app uses **mock data** for demonstration purposes. To enable real product fetching, you need to:

1. Obtain API credentials from the respective platforms
2. Update the configuration in `src/utils/productService.js`

## Setting Up Real API Integration

### Step 1: Get API Credentials

Contact the respective platforms to get API access:
- **Blinkit**: Contact their developer relations team
- **Instamart**: Check their developer portal
- **Swiggy**: Access their partner API program

### Step 2: Update Configuration

Edit `src/utils/productService.js` and update the `API_CONFIG` object:

```javascript
const API_CONFIG = {
  blinkit: {
    enabled: true, // Change to true
    apiKey: 'YOUR_BLINKIT_API_KEY', // Add your key
    baseUrl: 'https://api.blinkit.com/v1', // Update with actual URL
  },
  instamart: {
    enabled: true,
    apiKey: 'YOUR_INSTAMART_API_KEY',
    baseUrl: 'https://api.instamart.com/v1',
  },
  swiggy: {
    enabled: true,
    apiKey: 'YOUR_SWIGGY_API_KEY',
    baseUrl: 'https://api.swiggy.com/v1',
  }
}
```

### Step 3: Implement API Functions

The placeholder functions `fetchBlinkitProducts()` and `fetchSwiggyProducts()` in `productService.js` need to be implemented with actual API calls.

Example structure:
```javascript
async function fetchBlinkitProducts({ interests, budget }) {
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
}
```

## Security Note

⚠️ **Important**: Never commit API keys to version control. Consider using environment variables:

1. Create a `.env` file in the project root
2. Add your keys:
   ```
   VITE_BLINKIT_API_KEY=your_key_here
   VITE_SWIGGY_API_KEY=your_key_here
   ```
3. Update `productService.js` to read from environment:
   ```javascript
   apiKey: import.meta.env.VITE_BLINKIT_API_KEY
   ```

## Mock Data

Until real APIs are configured, the app uses mock product data that matches common interests like photography, cooking, coffee, books, wellness, etc. This allows you to see how the dual recommendation system works.

