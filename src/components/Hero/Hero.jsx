import React from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Leaf
} from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Decorative Warm Ambient Glows */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        {/* Left Column: Headline & Value Prop */}
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={16} className="text-gold" />
            <span>100% Pure & Hand-Crafted In-House</span>
          </div>

          <h1 className="hero-title">
            Pure Desi Taste, <br />
            <span className="hero-title-highlight">Delivered to Your Door</span>
          </h1>

          <p className="hero-description">
            Experience the nostalgic aroma and unadulterated nourishment of hand-crafted
            <strong> Bilona Desi Ghee, Wild Forest Honey, Mustard & Almond Oils</strong>, 
            and chemical-free organic essentials prepared by us with utmost purity and care.
          </p>

          {/* CTAs */}
          <div className="hero-actions">
            <a
              href={createWhatsAppGeneralInquiryUrl("Hero Quick Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp hero-btn-wa"
            >
              <MessageCircle size={22} />
              <span>Inquire & Order on WhatsApp</span>
            </a>

            <a href="#products" className="btn btn-outline hero-btn-explore">
              <span>Explore Catalog</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Trust Guarantee Micro-Badges */}
          <div className="hero-trust-row">
            <div className="trust-pill">
              <ShieldCheck size={16} className="text-gold" />
              <span>Self-Prepared Purity</span>
            </div>
            <div className="trust-pill">
              <CheckCircle2 size={16} className="text-gold" />
              <span>Direct WhatsApp Desk</span>
            </div>
            <div className="trust-pill">
              <Leaf size={16} className="text-gold" />
              <span>Zero Chemicals or Oils</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pure Logo Image Display Only */}
        <div className="hero-showcase">
          <div className="showcase-card-wrapper hero-logo-only-wrapper">
            <div className="hero-logo-frame-card">
              <img 
                src="/logo.jpg" 
                alt="Javed Organic Store Official Logo"
                className="hero-pure-logo-img"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
