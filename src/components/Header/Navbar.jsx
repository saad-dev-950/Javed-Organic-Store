import React, { useState, useEffect } from "react";
import { STORE_CONFIG, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { useTheme } from "../../context/ThemeContext";
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  MessageCircle,
  ShieldCheck,
  Truck,
  Sun,
  Moon
} from "lucide-react";
import "./Navbar.css";

export default function Navbar({ onOpenAdminModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  // 5-Tap Logo Secret Admin Trigger
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  const handleLogoTap = (e) => {
    setLogoClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        e.preventDefault();
        if (onOpenAdminModal) onOpenAdminModal();
        return 0;
      }
      return next;
    });

    if (clickTimer) clearTimeout(clickTimer);
    const timer = setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
    setClickTimer(timer);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Products", href: "#products" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Our Story", href: "#about" },
    { label: "How to Order", href: "#how-to-order" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
      {/* Top Announcement Bar */}
      <div className="top-banner">
        <div className="container banner-content">
          <div className="banner-item banner-hide-mobile">
            <Sparkles size={14} className="banner-icon text-gold" />
            <span>100% Pure & Lab Tested Desi Delicacies • Pure Online Store</span>
          </div>
          <div className="banner-item banner-hide-mobile">
            <Truck size={14} className="banner-icon" />
            <span>Nationwide Express Doorstep Delivery Across Pakistan</span>
          </div>
          <div className="banner-item banner-mobile-full">
            <span className="live-status-dot"></span>
            <a 
              href={createWhatsAppGeneralInquiryUrl("Instant Order Header Link")} 
              target="_blank" 
              rel="noopener noreferrer"
              className="banner-wa-link"
            >
              Order on WhatsApp: <strong>{STORE_CONFIG.whatsappDisplayNumber}</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="container nav-container">
          {/* Brand Logo with 5-Tap Secret Admin Trigger */}
          <a 
            href="#hero" 
            className="brand-logo" 
            onClick={(e) => {
              handleLogoTap(e);
              handleLinkClick();
            }}
            title="Javed Organic Store (Tap 5 times for Admin Login)"
          >
            <div className="brand-logo-img-wrap">
              <img src="/logo.jpg" alt="Javed Organic Store Official Brand Logo" className="brand-logo-img" />
            </div>
            <div className="brand-text">
              <span className="brand-name">JAVED</span>
              <span className="brand-sub">ORGANIC STORE</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links desktop-only">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Nav Actions (Theme Toggle + WhatsApp CTA) */}
          <div className="nav-actions">
            {/* Animated Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <Sun size={20} className="theme-icon-sun" />
              ) : (
                <Moon size={20} className="theme-icon-moon" />
              )}
            </button>

            {/* WhatsApp Action Button */}
            <a
              href={createWhatsAppGeneralInquiryUrl("Navbar Fast Order")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp nav-wa-btn"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle size={18} />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              className="mobile-toggle-btn mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
        <div className="mobile-drawer-content">
          <div className="drawer-header">
            <a 
              href="#hero" 
              className="brand-logo" 
              onClick={(e) => {
                handleLogoTap(e);
                handleLinkClick();
              }}
            >
              <div className="brand-logo-img-wrap sm">
                <img src="/logo.jpg" alt="Javed Organic Store Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text">
                <span className="brand-name">JAVED</span>
                <span className="brand-sub">ORGANIC STORE</span>
              </div>
            </a>
            <div className="drawer-header-actions">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              >
                {isDark ? (
                  <Sun size={18} className="theme-icon-sun" />
                ) : (
                  <Moon size={18} className="theme-icon-moon" />
                )}
              </button>
              <button 
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="drawer-footer">
            <div className="drawer-info-card">
              <div className="info-row">
                <ShieldCheck size={16} className="text-gold" />
                <span>100% In-House Purity Guarantee</span>
              </div>
              <div className="info-row">
                <Truck size={16} className="text-gold" />
                <span>Nationwide Courier COD Delivery</span>
              </div>
            </div>

            <a
              href={createWhatsAppGeneralInquiryUrl("Mobile Menu Direct Order")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp drawer-wa-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle size={20} />
              <span>Chat & Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
