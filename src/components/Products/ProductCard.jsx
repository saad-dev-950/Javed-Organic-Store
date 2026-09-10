import React from "react";
import { createWhatsAppOrderUrl } from "../../data/storeData";
import { MessageCircle, Eye, Star, Check } from "lucide-react";
import "./ProductCard.css";

export default function ProductCard({ product, onOpenModal }) {
  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const url = createWhatsAppOrderUrl({
      productName: product.name,
      weight: defaultVariant.weight,
      quantity: 1,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="product-card" onClick={() => onOpenModal(product)}>
      {/* Product Image Container */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`product-badge badge-${product.badgeType || "gold"}`}>
            {product.badge}
          </span>
        )}

        {/* Quick View Overlay Button */}
        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(product);
          }}
          aria-label="View product details"
        >
          <Eye size={16} />
          <span>View Details</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="product-content">
        {/* Rating & Stock */}
        <div className="product-meta-row">
          <div className="product-stars">
            <Star size={13} fill="#D4AF37" color="#D4AF37" />
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>
          <span className="in-stock-tag">
            <Check size={12} /> Pure Desi
          </span>
        </div>

        {/* Title */}
        <h3 className="product-title">{product.name}</h3>

        {/* Short Description */}
        <p className="product-short-desc">{product.shortDescription}</p>

        {/* Available Weights Pill List */}
        <div className="weights-preview">
          <span className="weights-label">Available Packets:</span>
          <div className="weights-tags">
            {product.variants.map((v, i) => (
              <span 
                key={i} 
                className={`weight-tag ${v.isDefault ? "tag-default" : ""}`}
              >
                {v.weight}
              </span>
            ))}
          </div>
        </div>

        {/* Rate Inquiry & WhatsApp CTA */}
        <div className="product-footer">
          <div className="price-block">
            <span className="price-starting-text">Pricing</span>
            <span className="product-rate-inquire">Rate on Request</span>
            <span className="price-weight-hint">Select Weight</span>
          </div>

          <div className="product-card-actions">
            <button
              className="btn btn-whatsapp btn-sm-card"
              onClick={handleWhatsAppOrder}
              title="Inquire price & order on WhatsApp"
            >
              <MessageCircle size={17} />
              <span>Get Price on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
