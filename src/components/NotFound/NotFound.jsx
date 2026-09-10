import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Sparkles, 
  ShieldAlert
} from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page-root">
      <main className="not-found-main section-padding">
        {/* Ambient Glows */}
        <div className="nf-glow nf-glow-1"></div>
        <div className="nf-glow nf-glow-2"></div>

        <div className="container container-narrow">
          <div className="not-found-card">
            {/* Badge */}
            <div className="nf-badge">
              <ShieldAlert size={16} className="text-gold" />
              <span>404 ERROR • PAGE NOT FOUND</span>
            </div>

            {/* Large 404 Display with Logo & Sparkle */}
            <div className="nf-404-display">
              <span className="nf-digit">4</span>
              <div className="nf-logo-badge">
                <img 
                  src="/logo.jpg" 
                  alt="Javed Organic Store Logo" 
                  className="nf-logo-img" 
                />
                <Sparkles size={20} className="nf-sparkle-icon" />
              </div>
              <span className="nf-digit">4</span>
            </div>

            {/* Main Title & Story */}
            <h1 className="nf-title">Oops! Page Lost in the Orchard</h1>
            <p className="nf-subtitle">
              Yeh page shayad khatam ho chuka hai ya iska URL badal gaya hai. Don't worry, humare 100% pure desi products abhi bhi aapke intezaar mein hain!
            </p>

            {/* Quick Suggestions Card */}
            <div className="nf-suggestions-box">
              <span className="sugg-label">What would you like to do next?</span>
              <ul className="sugg-list">
                <li>🌱 Browse our 100% Pure In-House Desi Ghee & Raw Honey catalog.</li>
                <li>🏠 Return to the store front page to view all categories.</li>
              </ul>
            </div>

            {/* Action CTA */}
            <div className="nf-actions-group">
              <Link to="/" className="btn btn-primary nf-btn-home">
                <Home size={18} />
                <span>Return to Store Front</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
