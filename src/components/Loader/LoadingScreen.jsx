import React, { useEffect, useState } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onFinished }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Prevent background scrolling while loading screen is active
    document.body.style.overflow = "hidden";

    // Start fade-out animation at 2.4s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2400);

    // Completely unmount at 2.8s
    const finishTimer = setTimeout(() => {
      document.body.style.overflow = "";
      if (onFinished) onFinished();
    }, 2850);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, [onFinished]);

  return (
    <div className={`loading-screen-overlay ${isFadingOut ? "fade-out" : ""}`}>
      {/* Background Decorative Radial Glows */}
      <div className="loader-glow loader-glow-1"></div>
      <div className="loader-glow loader-glow-2"></div>
      
      <div className="loader-center-content">
        {/* Animated Golden Crest Frame with Logo */}
        <div className="loader-logo-frame">
          <div className="loader-pulse-ring"></div>
          <div className="loader-logo-circle">
            <img 
              src="/logo.jpg" 
              alt="Javed Organic Store Logo" 
              className="loader-logo-img"
            />
          </div>
          <div className="loader-gold-sparkle">
            <Sparkles size={20} />
          </div>
        </div>

        {/* Brand Name with Animated Shimmer */}
        <div className="loader-brand-title">
          <h1 className="loader-brand-main">JAVED</h1>
          <span className="loader-brand-sub">ORGANIC STORE</span>
        </div>

        {/* Tagline */}
        <p className="loader-tagline">
          Reviving 100% Pure Village Traditions across Pakistan
        </p>

        {/* Animated Progress Bar */}
        <div className="loader-progress-track">
          <div className="loader-progress-fill"></div>
        </div>

        {/* Purity Badge */}
        <div className="loader-purity-tag">
          <ShieldCheck size={14} className="text-gold" />
          <span>100% Lab Tested & Hand-Churned Purity</span>
        </div>
      </div>
    </div>
  );
}
