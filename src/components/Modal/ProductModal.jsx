import React, { useState, useEffect } from "react";
import { createWhatsAppOrderUrl, STORE_CONFIG } from "../../data/storeData";
import { 
  X, 
  MessageCircle, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Star, 
  Check, 
  Truck, 
  Award,
  Sparkles
} from "lucide-react";
import "./ProductModal.css";

export default function ProductModal({ product, isOpen, onClose }) {
  // Selected variant state
  const initialVariant = product?.variants?.find((v) => v.isDefault) || product?.variants?.[0] || null;
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState("");

  // Reset variant and quantity whenever product changes
  useEffect(() => {
    if (product && product.variants) {
      const def = product.variants.find((v) => v.isDefault) || product.variants[0];
      setSelectedVariant(def);
      setQuantity(1);
      setCustomNote("");
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scrolling safely when modal is open
  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  if (!isOpen || !product || !selectedVariant) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOrderSubmit = () => {
    const url = createWhatsAppOrderUrl({
      productName: product.name,
      weight: selectedVariant.weight,
      quantity: quantity,
      customNote: customNote.trim(),
    });
    window.open(url, "_blank");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={22} />
        </button>

        <div className="modal-body-grid">
          {/* Left Column: Image & Authenticity Badges */}
          <div className="modal-image-col">
            <div className="modal-image-wrap">
              <img 
                src={product.image} 
                alt={product.name} 
                className="modal-main-img" 
              />
              {product.badge && (
                <span className={`modal-badge badge-${product.badgeType || "gold"}`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Purity Badge Card */}
            <div className="modal-purity-card">
              <div className="purity-header">
                <Award size={20} className="text-gold" />
                <strong>100% In-House Purity Guarantee</strong>
              </div>
              <p className="purity-text">{product.purityGuarantee}</p>
            </div>

            <div className="modal-delivery-card">
              <div className="delivery-row">
                <Truck size={18} className="text-green" />
                <div>
                  <strong>Nationwide Express Dispatch</strong>
                  <span>Cash on Delivery (COD) available across Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Selectors, and WhatsApp Action */}
          <div className="modal-details-col">
            {/* Rating Tag */}
            <div className="modal-rating-row">
              <div className="star-box">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviewsCount} Verified Customer Reviews)
              </span>
            </div>

            {/* Title */}
            <h2 id="modal-product-title" className="modal-title">{product.name}</h2>
            {product.tagline && <p className="modal-tagline">{product.tagline}</p>}

            {/* Rate Preview Status */}
            <div className="modal-price-box">
              <div className="unit-price-display">
                <span className="modal-price-val">
                  Best Rate on Request
                </span>
                <span className="modal-price-unit">for {selectedVariant.weight}</span>
              </div>
              <span className="modal-stock-badge">
                <Check size={14} /> Fresh In-House Prepared
              </span>
            </div>

            {/* Weight / Size Selection */}
            <div className="variant-selector-section">
              <label className="section-label">
                Select Weight / Size Option:
              </label>
              <div className="variant-options-grid">
                {product.variants.map((variant, idx) => {
                  const isSelected = selectedVariant.weight === variant.weight;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`variant-option-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <span className="var-weight">{variant.weight}</span>
                      <span className="var-price">Inquire Rate</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Selected Summary */}
            <div className="modal-qty-total-section">
              <div className="qty-picker-wrap">
                <label className="section-label">Quantity:</label>
                <div className="qty-control">
                  <button 
                    className="qty-btn" 
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={handleIncrement}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="total-price-wrap">
                <span className="total-label">Selected Item:</span>
                <span className="total-val">{quantity} x {selectedVariant.weight}</span>
              </div>
            </div>

            {/* Optional Special Instruction Note */}
            <div className="note-input-wrap">
              <input
                type="text"
                placeholder="Add special instructions or delivery city (optional)"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="modal-note-field"
              />
            </div>

            {/* Primary Order on WhatsApp Action */}
            <button 
              className="btn btn-whatsapp modal-order-btn pulse-wa"
              onClick={handleOrderSubmit}
            >
              <MessageCircle size={22} />
              <span>Inquire Rate & Order on WhatsApp ({selectedVariant.weight})</span>
            </button>

            <p className="instant-order-hint">
              ⚡ Clicking opens WhatsApp directly to get the current price rate and dispatch details.
            </p>

            {/* Full Description */}
            <div className="modal-desc-section">
              <h4 className="desc-heading">About this In-House Product</h4>
              <p className="modal-full-desc">{product.fullDescription}</p>
            </div>

            {/* Benefits List */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="modal-benefits-section">
                <h4 className="desc-heading">Key Health Benefits & Purity Highlights</h4>
                <ul className="benefits-list">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="benefit-item">
                      <ShieldCheck size={16} className="benefit-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
