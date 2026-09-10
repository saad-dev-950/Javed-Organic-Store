import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { STORE_CONFIG, createWhatsAppOrderUrl } from "../../data/storeData";
import { 
  Gift, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  MessageCircle, 
  Heart,
  PackageCheck,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import "./GiftBoxBuilder.css";

const GIFT_BOX_STYLES = [
  {
    id: "royal-gold",
    name: "Royal Gold Wooden Chest",
    desc: "Hand-crafted polished wooden box with velvet gold interior & metallic latch.",
    icon: "👑",
    badge: "Most Popular",
  },
  {
    id: "desi-jute",
    name: "Traditional Desi Jute Hamper",
    desc: "Eco-friendly organic jute basket tied with golden ribbon & pine straw.",
    icon: "🌿",
    badge: "Eco-Friendly",
  },
  {
    id: "emerald-chest",
    name: "Luxury Emerald Gift Box",
    desc: "Premium dark emerald matte box embossed with gold foiled Javed crest.",
    icon: "🎁",
    badge: "Luxury Edition",
  },
];

export default function GiftBoxBuilder() {
  const { products } = useProducts();
  const [selectedBoxStyle, setSelectedBoxStyle] = useState(GIFT_BOX_STYLES[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [greetingNote, setGreetingNote] = useState("");

  // Add product to gift box
  const handleAddItem = (product) => {
    if (selectedItems.length >= 4) {
      alert("Custom gift box fits up to 4 items. Remove an item to add another.");
      return;
    }
    const defaultVar = product.variants.find((v) => v.isDefault) || product.variants[0];
    const newItem = {
      product: product,
      selectedWeight: defaultVar.weight,
    };
    setSelectedItems((prev) => [...prev, newItem]);
  };

  // Remove item from box
  const handleRemoveItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Change weight of an added item
  const handleWeightChange = (index, weight) => {
    const updated = [...selectedItems];
    updated[index].selectedWeight = weight;
    setSelectedItems(updated);
  };

  // Generate WhatsApp Gift Box Order
  const handleOrderGiftBox = () => {
    if (selectedItems.length < 2) {
      alert("Please select at least 2 products for your custom organic gift box.");
      return;
    }

    const itemsSummary = selectedItems
      .map((item, i) => `${i + 1}. ${item.product.name} (${item.selectedWeight})`)
      .join("\n");

    const messageLines = [
      "Assalam o Alaikum!",
      `I want to order a *Custom Organic Gift Box* from *${STORE_CONFIG.name}*:`,
      "",
      `🎁 *Packaging Style*: ${selectedBoxStyle.name}`,
      "",
      "📦 *Selected Organic Delicacies*:",
      itemsSummary,
      "",
      greetingNote.trim() ? `💌 *Gift Card Message*: "${greetingNote.trim()}"` : "",
      "",
      "Please share the total price rate and express delivery details for this gift hamper.",
      "JazakAllah!"
    ].filter(Boolean);

    const cleanPhone = STORE_CONFIG.whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <section id="gift-box" className="gift-builder-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge section-badge-gold">
            <Gift size={14} className="text-gold" />
            LUXURY DESI GIVING
          </span>
          <h2 className="section-title">Build Your Own Organic Gift Box</h2>
          <p className="section-subtitle">
            Create a custom organic hamper for Eid, Weddings, or Health Gifts. Combine 2 to 4 pure hand-crafted items in luxury packaging and order directly on WhatsApp.
          </p>
        </div>

        <div className="gift-builder-grid">
          {/* Left Column: Builder Controls & Selection */}
          <div className="gift-controls-col">
            {/* Step 1: Choose Packaging Box */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">1</span>
                <div>
                  <h3>Select Luxury Gift Packaging</h3>
                  <p>Choose the presentation box for your recipient</p>
                </div>
              </div>

              <div className="box-styles-grid">
                {GIFT_BOX_STYLES.map((box) => {
                  const isSelected = selectedBoxStyle.id === box.id;
                  return (
                    <div
                      key={box.id}
                      className={`box-style-card ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedBoxStyle(box)}
                    >
                      <div className="box-icon-wrap">{box.icon}</div>
                      <div className="box-info">
                        <strong>{box.name}</strong>
                        <span>{box.desc}</span>
                      </div>
                      {isSelected && (
                        <div className="box-check-badge">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Products to Add */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">2</span>
                <div>
                  <h3>Select 2 to 4 Products ({selectedItems.length}/4 Selected)</h3>
                  <p>Tap products to pack inside your custom gift box</p>
                </div>
              </div>

              <div className="catalog-picker-grid">
                {products.map((p) => {
                  const countInBox = selectedItems.filter((i) => i.product.id === p.id).length;
                  return (
                    <div key={p.id} className="picker-prod-card">
                      <img src={p.image} alt={p.name} className="picker-img" />
                      <div className="picker-details">
                        <strong>{p.name}</strong>
                        <span className="picker-cat">{p.category}</span>
                      </div>
                      <button
                        className="btn-add-picker"
                        onClick={() => handleAddItem(p)}
                        disabled={selectedItems.length >= 4}
                        title="Add to Gift Box"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Greeting Message */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">3</span>
                <div>
                  <h3>Personalized Greeting Card (Optional)</h3>
                  <p>Add a heartfelt note to be printed on gold foil card</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="e.g. Happy Eid Mubarak to Khala & Family! Wishing you health & joy."
                value={greetingNote}
                onChange={(e) => setGreetingNote(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          {/* Right Column: Live Gift Box Summary & WhatsApp CTA */}
          <div className="gift-summary-col">
            <div className="gift-preview-card">
              <div className="preview-top-banner">
                <Sparkles size={18} className="text-gold" />
                <span>Your Custom Organic Hamper</span>
              </div>

              <div className="preview-box-type">
                <span className="box-preview-icon">{selectedBoxStyle.icon}</span>
                <div>
                  <strong>{selectedBoxStyle.name}</strong>
                  <span className="box-sub-desc">Custom Packed & Sealed</span>
                </div>
              </div>

              <div className="selected-items-list">
                <span className="items-list-title">Contents ({selectedItems.length}/4 items):</span>
                {selectedItems.length === 0 ? (
                  <div className="empty-box-placeholder">
                    <span>🎁 Box is currently empty.</span>
                    <small>Tap "+ Add" on products to fill your hamper.</small>
                  </div>
                ) : (
                  selectedItems.map((item, idx) => (
                    <div key={idx} className="hamper-item-row">
                      <img src={item.product.image} alt={item.product.name} className="hamper-img" />
                      <div className="hamper-item-info">
                        <strong>{item.product.name}</strong>
                        <select
                          value={item.selectedWeight}
                          onChange={(e) => handleWeightChange(idx, e.target.value)}
                          className="hamper-weight-select"
                        >
                          {item.product.variants.map((v, i) => (
                            <option key={i} value={v.weight}>
                              {v.weight}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="btn-del-mini"
                        onClick={() => handleRemoveItem(idx)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {greetingNote && (
                <div className="greeting-preview-box">
                  <strong>💌 Printed Greeting Note:</strong>
                  <p>"{greetingNote}"</p>
                </div>
              )}

              <div className="gift-checkout-block">
                <div className="purity-guarantee-line">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>100% In-House Purity & Express Dispatch</span>
                </div>

                <button
                  className="btn btn-whatsapp gift-wa-order-btn pulse-wa"
                  onClick={handleOrderGiftBox}
                  disabled={selectedItems.length < 2}
                >
                  <MessageCircle size={22} />
                  <span>Order Custom Gift Box on WhatsApp</span>
                </button>

                <p className="instant-order-hint">
                  ⚡ Pre-filled WhatsApp message will open with your box style & selected items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
