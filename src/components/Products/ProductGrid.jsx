import React, { useState, useMemo } from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import { Search, Sparkles, Filter, MessageCircle, X } from "lucide-react";
import "./ProductGrid.css";

export default function ProductGrid({ onOpenProductModal }) {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(query)) ||
        (product.fullDescription && product.fullDescription.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="products" className="products-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} className="text-gold" />
            100% PURE DESI COLLECTION
          </span>
          <h2 className="section-title">Our Authentic Desi Products</h2>
          <p className="section-subtitle">
            Every item is prepared by us in-house with 100% purity, lab-inspected, and prepared without commercial shortcuts. Order directly on WhatsApp.
          </p>
        </div>

        {/* Filter & Search Controls Bar */}
        <div className="catalog-controls">
          {/* Search Bar */}
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search pure desi ghee, sidr honey, sarson oil, shakkar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="category-tabs-scroll">
            <div className="category-tabs">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    className={`cat-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-meta-bar">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> authentic products
            {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </span>

          <a
            href={createWhatsAppGeneralInquiryUrl("Custom Order & Bulk Request")}
            target="_blank"
            rel="noopener noreferrer"
            className="bulk-wa-link"
          >
            <MessageCircle size={15} />
            <span>Need Custom Quantity or Bulk Order? Chat with us</span>
          </a>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenProductModal}
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-state">
            <div className="empty-icon">🍃</div>
            <h3>No matching products found</h3>
            <p>We couldn't find any products matching "{searchQuery}".</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Assurance Banner */}
        <div className="product-bottom-banner">
          <div className="banner-left">
            <h4>Can't find a specific desi delicacy or herbal item?</h4>
            <p>We prepare authentic items upon customer request across Pakistan.</p>
          </div>
          <a
            href={createWhatsAppGeneralInquiryUrl("Special Product Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
