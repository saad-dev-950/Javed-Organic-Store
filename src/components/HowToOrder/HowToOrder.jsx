import React from "react";
import { ORDER_STEPS, STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { 
  ShoppingBag, 
  Send, 
  CheckCircle, 
  Sparkles, 
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import "./HowToOrder.css";

const stepIcons = {
  ShoppingBag: ShoppingBag,
  Send: Send,
  CheckCircle: CheckCircle,
};

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="how-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} className="text-gold" />
            EFFORTLESS ORDERING
          </span>
          <h2 className="section-title">How to Order in 3 Simple Steps</h2>
          <p className="section-subtitle">
            No registration forms, no forgotten passwords, and no complicated checkout funnels. Order directly from the palm of your hand.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="steps-container">
          {ORDER_STEPS.map((step, idx) => {
            const Icon = stepIcons[step.icon] || ShoppingBag;
            return (
              <div key={idx} className="step-card">
                <div className="step-badge">{step.step}</div>
                <div className="step-icon-circle">
                  <Icon size={28} className="step-icon" />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {idx < ORDER_STEPS.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visual Reassurance Banner */}
        <div className="order-reassurance-box">
          <div className="reassurance-content">
            <div className="reassurance-icon">
              <ShieldCheck size={32} className="text-gold" />
            </div>
            <div>
              <h3>Why We Choose WhatsApp Ordering</h3>
              <p>
                Organic food is personal. Chatting on WhatsApp allows you to ask questions about our harvest dates, receive live photo/video proof of our batches, specify custom weight requirements, and enjoy friendly Pakistani hospitality.
              </p>
            </div>
          </div>

          <a
            href={createWhatsAppGeneralInquiryUrl("How To Order Fast Help")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp reassurance-btn"
          >
            <MessageCircle size={20} />
            <span>Try an Order Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
