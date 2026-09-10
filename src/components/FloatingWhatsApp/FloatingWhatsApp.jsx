import React, { useState, useEffect } from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { MessageCircle, X } from "lucide-react";
import "./FloatingWhatsApp.css";

export default function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show quick greeting bubble after 3 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    // Auto-dismiss bubble card after 10 seconds so it never blocks content indefinitely
    const autoDismiss = setTimeout(() => {
      setShowBubble(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoDismiss);
    };
  }, []);

  return (
    <div className="floating-wa-wrapper">
      {/* Interactive Tooltip Bubble Card */}
      {showBubble && (
        <div className="wa-bubble-card">
          <button 
            className="bubble-close-btn" 
            onClick={() => setShowBubble(false)}
            aria-label="Dismiss chat prompt"
          >
            <X size={14} />
          </button>
          
          <div className="bubble-header">
            <span className="bubble-avatar">🌿</span>
            <div className="bubble-meta">
              <strong>Javed Organic Store</strong>
              <span className="bubble-online-status">Online • Instant Reply</span>
            </div>
          </div>

          <p className="bubble-msg">
            Assalam o Alaikum! 👋 Need authentic Desi Ghee, Sidr Honey, or Oils? Tap here to order directly on WhatsApp!
          </p>

          <a
            href={createWhatsAppGeneralInquiryUrl("Floating Prompt Chat")}
            target="_blank"
            rel="noopener noreferrer"
            className="bubble-action-btn"
            onClick={() => setShowBubble(false)}
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Pulse Button */}
      <a
        href={createWhatsAppGeneralInquiryUrl("Floating WhatsApp Button")}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn pulse-wa"
        aria-label="Chat with Javed Organic Store on WhatsApp"
      >
        <MessageCircle size={30} />
        <span className="wa-btn-tooltip">Order on WhatsApp</span>
      </a>
    </div>
  );
}
