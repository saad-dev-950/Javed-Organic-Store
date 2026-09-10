import React from "react";
import { TRUST_PILLARS } from "../../data/storeData";
import { 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  MessageCircle, 
  Truck 
} from "lucide-react";
import "./TrustHighlights.css";

const iconMap = {
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  HeartHandshake: HeartHandshake,
  MessageCircle: MessageCircle,
  Truck: Truck,
};

export default function TrustHighlights() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {TRUST_PILLARS.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <div key={item.id} className="trust-card">
                <div className="trust-card-header">
                  <div className="trust-icon-box">
                    <IconComponent size={24} className="trust-icon" />
                  </div>
                  <span className="trust-number">0{index + 1}</span>
                </div>
                <h4 className="trust-title">{item.title}</h4>
                <p className="trust-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
