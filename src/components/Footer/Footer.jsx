import React from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl, CATEGORIES } from "../../data/storeData";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Truck,
  ArrowUp
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Top Banner inside Footer */}
      <div className="footer-top-strip">
        <div className="container strip-content">
          <div className="strip-item">
            <ShieldCheck size={20} className="text-gold" />
            <span>100% In-House Bilona Ghee & Raw Honey Purity Guaranteed</span>
          </div>
          <div className="strip-item">
            <Truck size={20} className="text-gold" />
            <span>Cash on Delivery (COD) Available Across All Pakistani Cities</span>
          </div>
          <div className="strip-item">
            <MessageCircle size={20} className="text-gold" />
            <span>Direct WhatsApp Ordering • No Complicated Checkouts</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand & About Column */}
          <div className="footer-col footer-col-brand">
            <a href="#hero" className="footer-logo">
              <div className="brand-logo-img-wrap lg">
                <img src="/logo.jpg" alt="Javed Organic Store Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text">
                <span className="brand-name">JAVED</span>
                <span className="brand-sub">ORGANIC STORE</span>
              </div>
            </a>

            <p className="footer-brand-desc">
              {STORE_CONFIG.name} is dedicated to reviving authentic Pakistani culinary traditions. Delivering unadulterated Desi Ghee, pure raw honeys, organic oils, and shakkar directly to your doorstep.
            </p>

            <div className="footer-wa-highlight">
              <a
                href={createWhatsAppGeneralInquiryUrl("Footer Brand Connect")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp footer-wa-btn"
              >
                <MessageCircle size={18} />
                <span>Chat: {STORE_CONFIG.whatsappDisplayNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#products">Pure Desi Products</a></li>
              <li><a href="#why-choose-us">Why Choose Us</a></li>
              <li><a href="#about">Our Story & Heritage</a></li>
              <li><a href="#how-to-order">How to Order (3 Steps)</a></li>
              <li><a href="#reviews">Customer Reviews</a></li>
              <li><a href="#contact">Contact & Delivery Hub</a></li>
            </ul>
          </div>

          {/* Product Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Desi Categories</h4>
            <ul className="footer-links">
              <li><a href="#products">Pure Buffalo Desi Ghee</a></li>
              <li><a href="#products">A2 Cow Desi Ghee</a></li>
              <li><a href="#products">Wild Sidr (Beri) Honey</a></li>
              <li><a href="#products">Pure Mustard Oil</a></li>
              <li><a href="#products">Pure Sweet Almond Oil</a></li>
              <li><a href="#products">Traditional Desi Shakkar</a></li>
              <li><a href="#products">Himalayan Pure Salajeet</a></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Store Contacts</h4>
            <div className="footer-contact-items">
              <div className="contact-row">
                <MessageCircle size={16} className="text-gold" />
                <span>WhatsApp: <a href={createWhatsAppGeneralInquiryUrl("Footer Inquiry")} className="link-hover">{STORE_CONFIG.whatsappDisplayNumber}</a></span>
              </div>
              <div className="contact-row">
                <Phone size={16} className="text-gold" />
                <span>Call: {STORE_CONFIG.secondaryWhatsApp}</span>
              </div>
              <div className="contact-row">
                <Clock size={16} className="text-gold" />
                <span>{STORE_CONFIG.businessHours}</span>
              </div>
              <div className="contact-row">
                <MapPin size={16} className="text-gold" />
                <span>{STORE_CONFIG.address}</span>
              </div>
            </div>

            {/* Social Placeholder Links */}
            <div className="footer-socials">
              <a href={STORE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-pill">Instagram</a>
              <a href={STORE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-pill">Facebook</a>
              <a href={STORE_CONFIG.socials.youtube} target="_blank" rel="noopener noreferrer" className="social-pill">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>{STORE_CONFIG.name}</strong>. Pure Desi Taste, Delivered to Your Door. All Rights Reserved.
          </p>

          <button 
            className="scroll-top-btn" 
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
