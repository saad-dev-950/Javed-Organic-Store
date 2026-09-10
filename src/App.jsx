import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { ToastProvider } from "./context/ToastContext";
import { ReviewProvider } from "./context/ReviewContext";
import LoadingScreen from "./components/Loader/LoadingScreen";
import Navbar from "./components/Header/Navbar";
import Hero from "./components/Hero/Hero";
import TrustHighlights from "./components/TrustHighlights/TrustHighlights";
import ProductGrid from "./components/Products/ProductGrid";
import ProductModal from "./components/Modal/ProductModal";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import About from "./components/About/About";
import HowToOrder from "./components/HowToOrder/HowToOrder";
import Reviews from "./components/Reviews/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp/FloatingWhatsApp";
import NotFound from "./components/NotFound/NotFound";
import AdminLoginModal from "./components/Modal/AdminLoginModal";
import AdminDashboard from "./components/Admin/AdminDashboard";

function MainAppContent() {
  const { isAdminLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("site"); // "site" | "admin"

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsModalOpen(false);
  };

  // If Admin is logged in and requested admin view, render AdminDashboard
  if (isAdminLoggedIn && currentView === "admin") {
    return <AdminDashboard onBackToSite={() => setCurrentView("site")} />;
  }

  return (
    <div className="app-root">
      {/* 2 to 3 seconds Animated Luxury Splash/Loading Screen on Home Page */}
      {isLoading && (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      )}

      {/* Sticky Header with 5-Tap Logo Trigger */}
      <Navbar onOpenAdminModal={() => setIsAdminLoginModalOpen(true)} />

      {/* Main Content */}
      <main>
        <Hero onOpenProductModal={handleOpenProductModal} />

        {/* 5 Highlights / Trust Pillars */}
        <TrustHighlights />

        {/* Dynamic Filterable Products Section */}
        <ProductGrid onOpenProductModal={handleOpenProductModal} />

        {/* Why Choose Javed Organic Store */}
        <WhyChooseUs />

        {/* About & Brand Story */}
        <About />

        {/* 3-Step Visual Guide on How to Order */}
        <HowToOrder />

        {/* Realistic Pakistani Customer Photo Reviews */}
        <Reviews />

        {/* Common FAQs */}
        <FAQ />

        {/* Direct WhatsApp Ordering & Store Info */}
        <Contact />
      </main>

      {/* Sophisticated Dark Emerald Footer */}
      <Footer />

      {/* Fixed Floating WhatsApp Trigger */}
      <FloatingWhatsApp />

      {/* Interactive Product Details & WhatsApp Order Dialog */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseProductModal}
      />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setCurrentView("admin");
        }}
      />
    </div>
  );
}

function AdminRouteView() {
  const { isAdminLoggedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(!isAdminLoggedIn);
  const navigate = useNavigate();

  if (!isAdminLoggedIn) {
    return (
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => navigate("/")}
        onSuccess={() => setIsLoginOpen(false)}
      />
    );
  }

  return <AdminDashboard onBackToSite={() => navigate("/")} />;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <ReviewProvider>
            <Routes>
              <Route path="/" element={<MainAppContent />} />
              <Route path="/admin" element={<AdminRouteView />} />
              {/* 404 Route without LoadingScreen */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ReviewProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
