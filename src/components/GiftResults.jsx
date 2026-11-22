import { getPlatformName, getPlatformColor } from '../utils/productService'
import './GiftResults.css'

function GiftResults({ recommendations, formData, onReset, onBackToProfiles }) {
  // Handle both old format (array) and new format (object with experiences and materials)
  const isNewFormat = recommendations && typeof recommendations === 'object' && !Array.isArray(recommendations)
  
  const realProducts = isNewFormat ? (recommendations.realProducts || []) : []
  const experiences = isNewFormat ? (recommendations.experiences || []) : []
  const materials = isNewFormat ? (recommendations.materials || []) : []
  
  // Fallback for old format
  const oldFormatRecs = Array.isArray(recommendations) ? recommendations : []

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <div className="gift-results">
      <div className="results-header">
        <h2>🎁 Gift Recommendations</h2>
        <div className="results-actions">
          {onBackToProfiles && (
            <button onClick={onBackToProfiles} className="back-button">
              ← Back to Profiles
            </button>
          )}
          <button onClick={onReset} className="reset-button">
            Start Over
          </button>
        </div>
      </div>

      {formData && Object.keys(formData.person || {}).length === 0 && Object.keys(formData.event || {}).length === 0 ? (
        <div className="info-badge">
          <p>✨ You didn't provide any specific information, so we're showing you our top general gift ideas!</p>
        </div>
      ) : (
        <div className="info-badge">
          <p>✨ Based on the information you provided, here are our recommendations:</p>
        </div>
      )}

      {/* Real Products Section - Order Now */}
      {realProducts.length > 0 && (
        <div className="recommendations-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🛒</span>
              Order Now - Quick Delivery
            </h3>
            <p className="section-subtitle">These items are available for immediate delivery on Blinkit/Swiggy Instamart</p>
          </div>
          <div className="recommendations-grid products-grid">
            {realProducts.map((product, index) => (
              <div key={product.id || index} className="gift-card product-card">
                <div className="product-badge" style={{ backgroundColor: getPlatformColor(product.platform) + '20', color: getPlatformColor(product.platform) }}>
                  {product.platformName || getPlatformName(product.platform)}
                </div>
                <div className="gift-icon product-icon">{product.image || '📦'}</div>
                <h3 className="gift-name">{product.name}</h3>
                <div className="product-details">
                  <div className="product-price">
                    <span className="price-amount">{formatPrice(product.price)}</span>
                    {product.deliveryTime && (
                      <span className="delivery-time">⚡ {product.deliveryTime}</span>
                    )}
                  </div>
                  {product.inStock !== false && (
                    <div className="stock-badge in-stock">In Stock</div>
                  )}
                </div>
                <button 
                  className="order-button"
                  style={{ backgroundColor: getPlatformColor(product.platform) }}
                  onClick={() => {
                    // In production, this would open the product page or app
                    alert(`Opening ${product.platformName || getPlatformName(product.platform)} to order: ${product.name}`)
                  }}
                >
                  Order on {product.platformName || getPlatformName(product.platform)}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experiences Section */}
      {experiences.length > 0 && (
        <div className="recommendations-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🎫</span>
              Experience Gifts
            </h3>
            <p className="section-subtitle">Create lasting memories with these experience-based gifts</p>
          </div>
          <div className="recommendations-grid">
            {experiences.map((gift, index) => (
              <div key={index} className="gift-card experience-card">
                <div className="experience-badge">Experience</div>
                <div className="gift-icon">{gift.icon}</div>
                <h3 className="gift-name">{gift.name}</h3>
                <p className="gift-description">{gift.description}</p>
                {gift.priceRange && (
                  <div className="gift-price">
                    <span className="price-label">Price Range:</span>
                    <span className="price-value">{gift.priceRange}</span>
                  </div>
                )}
                {gift.reason && (
                  <div className="gift-reason">
                    <strong>Why this gift:</strong> {gift.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materials Section */}
      {materials.length > 0 && (
        <div className="recommendations-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🎁</span>
              Material Gifts
            </h3>
            <p className="section-subtitle">Physical gifts and items they can keep and enjoy</p>
          </div>
          <div className="recommendations-grid">
            {materials.map((gift, index) => (
              <div key={index} className="gift-card material-card">
                <div className="material-badge">Material</div>
                <div className="gift-icon">{gift.icon}</div>
                <h3 className="gift-name">{gift.name}</h3>
                <p className="gift-description">{gift.description}</p>
                {gift.priceRange && (
                  <div className="gift-price">
                    <span className="price-label">Price Range:</span>
                    <span className="price-value">{gift.priceRange}</span>
                  </div>
                )}
                {gift.reason && (
                  <div className="gift-reason">
                    <strong>Why this gift:</strong> {gift.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback for old format */}
      {oldFormatRecs.length > 0 && (
        <div className="recommendations-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">💡</span>
              Recommendations
            </h3>
          </div>
          <div className="recommendations-grid">
            {oldFormatRecs.map((gift, index) => (
              <div key={index} className="gift-card">
                <div className="gift-icon">{gift.icon}</div>
                <h3 className="gift-name">{gift.name}</h3>
                <p className="gift-description">{gift.description}</p>
                {gift.priceRange && (
                  <div className="gift-price">
                    <span className="price-label">Price Range:</span>
                    <span className="price-value">{gift.priceRange}</span>
                  </div>
                )}
                {gift.reason && (
                  <div className="gift-reason">
                    <strong>Why this gift:</strong> {gift.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {realProducts.length === 0 && experiences.length === 0 && materials.length === 0 && oldFormatRecs.length === 0 && (
        <div className="empty-results">
          <p>No recommendations found. Try adjusting your search criteria.</p>
        </div>
      )}

      <div className="results-footer">
        <p>💡 Need more ideas? Try adjusting your information or click "Start Over" to try different criteria.</p>
        {realProducts.length > 0 && (
          <p className="footer-note">
            📱 Real products are fetched from Blinkit/Swiggy Instamart. Click "Order" to purchase directly.
          </p>
        )}
      </div>
    </div>
  )
}

export default GiftResults
