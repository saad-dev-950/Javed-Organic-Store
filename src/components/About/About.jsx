import React from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { 
  Sparkles, 
  HeartHandshake, 
  Award, 
  Leaf, 
  CheckCircle2,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual Brand Image */}
          <div className="about-visuals">
            <div className="about-image-main-wrap">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Organic Tradition"
                className="about-img-main"
              />
              <div className="about-floating-experience">
                <span className="exp-num">100%</span>
                <span className="exp-text">Authentic In-House Prepared</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Heritage */}
          <div className="about-content">
            <span className="section-badge">
              <Sparkles size={14} className="text-gold" />
              OUR HERITAGE & MISSION
            </span>

            <h2 className="about-title">
              Reviving Pure Pakistani Food Traditions with Honesty & Love
            </h2>

            <p className="about-lead">
              <strong>Javed Organic Store</strong> was founded with a singular purpose: to bring unadulterated, nutritious, and deeply nostalgic delicacies to modern households across Pakistan.
            </p>

            <p className="about-paragraph">
              We know the intoxicating fragrance of freshly churned Desi Ghee on a hot tandoori paratha, the raw therapeutic goodness of Karak wild forest honey, and the rich earthy aroma of genuine mustard oil.
            </p>

            <p className="about-paragraph">
              Today, commercial supermarkets are flooded with industrial shortcuts, chemical bleaches, and synthetic fragrances. We decided to bridge that gap. We prepare our products in-house to deliver uncompromised purity straight to your kitchen table.
            </p>

            {/* Core Values / Features */}
            <div className="about-features-grid">
              <div className="about-feature-item">
                <div className="feat-icon">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4>Zero Chemical Preservatives</h4>
                  <p>100% natural, whole food extracts without stabilizers or artificial colors.</p>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="feat-icon">
                  <Award size={20} />
                </div>
                <div>
                  <h4>100% Traditional Handcrafted</h4>
                  <p>Slowly prepared in small artisanal batches for rich authentic taste.</p>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="feat-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4>Lab-Tested Authenticity</h4>
                  <p>Every single batch undergoes rigorous quality and purity checks.</p>
                </div>
              </div>

              <div className="about-feature-item">
                <div className="feat-icon">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4>Personalized Human Care</h4>
                  <p>Direct communication and tailored service via WhatsApp for every customer.</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Story CTA */}
            <div className="about-action-row">
              <a
                href={createWhatsAppGeneralInquiryUrl("Our Story & Brand Inquiries")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={20} />
                <span>Talk to the Javed Organic Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
