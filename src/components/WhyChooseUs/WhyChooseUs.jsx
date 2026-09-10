import React from "react";
import { WHY_CHOOSE_US, STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { 
  Award, 
  CheckCircle2, 
  SearchCheck, 
  Leaf, 
  Headphones, 
  ThumbsUp, 
  Sparkles,
  MessageCircle,
  ShieldAlert
} from "lucide-react";
import "./WhyChooseUs.css";

const iconMap = {
  Award: Award,
  CheckCircle2: CheckCircle2,
  SearchCheck: SearchCheck,
  Leaf: Leaf,
  Headphones: Headphones,
  ThumbsUp: ThumbsUp,
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="why-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge section-badge-green">
            <Sparkles size={14} className="text-gold" />
            OUR UNCOMPROMISING STANDARD
          </span>
          <h2 className="section-title">Why Choose Javed Organic Store?</h2>
          <p className="section-subtitle">
            In an era filled with adulteration and artificial shortcuts, we stand firmly for authentic Pakistani traditions, pure in-house nourishment, and honest quality.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="why-grid">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div key={item.id} className="why-card">
                <div className="why-icon-wrap">
                  <Icon size={26} className="why-icon" />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.description}</p>
                <div className="why-bottom-line"></div>
              </div>
            );
          })}
        </div>

        {/* Comparison Box: Our Purity vs Ordinary Commercial Brands */}
        <div className="comparison-container">
          <div className="comparison-header">
            <h3>The Javed Organic Difference</h3>
            <p>See how our authentic desi process compares to commercial grocery store brands.</p>
          </div>

          <div className="comparison-grid">
            {/* The Javed Way */}
            <div className="compare-card compare-javed">
              <div className="compare-tag javed-tag">✨ Javed Organic Store</div>
              <ul className="compare-list">
                <li>
                  <CheckCircle2 size={18} className="text-gold" />
                  <span><strong>Traditional Bilona Ghee:</strong> Churned from cultured dahi butter over slow fire.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-gold" />
                  <span><strong>100% Raw Wild Honey:</strong> Unheated, unpasteurized, high in natural bee enzymes.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-gold" />
                  <span><strong>Chemical-Free Shakkar:</strong> No sulfur, no artificial food colors or bleaching.</span>
                </li>
              </ul>
            </div>

            {/* Ordinary Store Brands */}
            <div className="compare-card compare-ordinary">
              <div className="compare-tag ordinary-tag">⚠️ Ordinary Commercial Brands</div>
              <ul className="compare-list">
                <li>
                  <ShieldAlert size={18} className="text-danger" />
                  <span>Industrial cream heating with artificial fragrance and palm oil mixing.</span>
                </li>
                <li>
                  <ShieldAlert size={18} className="text-danger" />
                  <span>Ultra-heated honey fed with corn syrup and sugar adulteration.</span>
                </li>
                <li>
                  <ShieldAlert size={18} className="text-danger" />
                  <span>Chemically bleached white sugars and artificial molasses dyes.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="comparison-cta">
            <a
              href={createWhatsAppGeneralInquiryUrl("Why Choose Us Consultation")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Experience Real Desi Purity on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
