import React from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Truck, 
  Sparkles, 
  ShieldCheck,
  ShoppingBag
} from "lucide-react";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} className="text-gold" />
            DIRECT CONNECT
          </span>
          <h2 className="section-title">Chat & Order Directly With Us</h2>
          <p className="section-subtitle">
            We believe in honest, personal connections. No automated robots or ticket forms—our dedicated store team is ready to assist you on WhatsApp.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct WhatsApp Action Card */}
          <div className="contact-wa-card">
            <div className="wa-card-header">
              <div className="wa-icon-large">
                <MessageCircle size={36} />
              </div>
              <div className="wa-header-text">
                <span className="wa-online-tag">
                  <span className="online-indicator"></span> Active Now on WhatsApp
                </span>
                <h3>WhatsApp Direct Ordering Desk</h3>
              </div>
            </div>

            <p className="wa-card-desc">
              Have questions about batch freshness, recommended dosage for Salajeet/Honey, or want to order a custom gift hamper? Tap the button below to start a direct chat.
            </p>

            <div className="wa-actions-wrapper">
              <a
                href={createWhatsAppGeneralInquiryUrl("Instant Contact Section Order")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp wa-main-cta-btn pulse-wa"
              >
                <MessageCircle size={24} />
                <span>Chat With Us on WhatsApp</span>
              </a>

              <a
                href={`tel:${STORE_CONFIG.whatsappNumber}`}
                className="btn btn-outline-white wa-call-btn"
              >
                <Phone size={18} />
                <span>Call Us: {STORE_CONFIG.whatsappDisplayNumber}</span>
              </a>
            </div>

            <div className="wa-card-perks">
              <div className="perk-item">
                <ShieldCheck size={16} className="text-gold" />
                <span>Instant Human Response on WhatsApp</span>
              </div>
              <div className="perk-item">
                <Truck size={16} className="text-gold" />
                <span>Real-Time Courier Tracking & Dispatch Updates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Store Details & Timings */}
          <div className="contact-info-card">
            <h3 className="info-card-title">Store & Delivery Information</h3>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <MessageCircle size={20} className="text-gold" />
                </div>
                <div>
                  <h4>Primary WhatsApp</h4>
                  <p>
                    <a 
                      href={createWhatsAppGeneralInquiryUrl("Contact Section Link")} 
                      className="link-highlight"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {STORE_CONFIG.whatsappDisplayNumber}
                    </a> (24/7 Orders & Inquiries)
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <ShoppingBag size={20} className="text-gold" />
                </div>
                <div>
                  <h4>Store Model</h4>
                  <p>100% Online Store (Pure farm-to-table delivery, no physical walk-in counter)</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <h4>Business & Dispatch Hours</h4>
                  <p>{STORE_CONFIG.businessHours}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Truck size={20} className="text-gold" />
                </div>
                <div>
                  <h4>Nationwide Express Delivery</h4>
                  <p>{STORE_CONFIG.deliveryCoverage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
