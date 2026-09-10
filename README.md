# 🌿 Javed Organic Store

> **A Luxury, High-Performance Full-Stack E-Commerce Web Application** crafted for an authentic organic foods brand in Pakistan. Built with React.js, Vite, Google Firebase Cloud Firestore, and a custom Vanilla CSS Luxury Design System.

---

[![Live Website](https://img.shields.io/badge/Live%20Website-javed--organic--store.web.app-00E676?style=for-the-badge&logo=google-chrome&logoColor=white)](https://javed-organic-store.web.app)
[![Admin Panel](https://img.shields.io/badge/Admin%20Panel-Protected%20Dashboard-D4AF37?style=for-the-badge&logo=firebase&logoColor=white)](https://javed-organic-store.web.app/admin)
[![Developer](https://img.shields.io/badge/Developer-Saad%20Nadeem%20%7C%20Saad%20Dev%20Hub-103320?style=for-the-badge&logo=codefactor&logoColor=white)](https://github.com/saad-dev-950)

---

## 📌 Project Overview

**Javed Organic Store** is an end-to-end digital storefront designed to deliver 100% pure, hand-crafted Bilona Desi Ghee, A2 Cow Ghee, Wild Sidr Honey (*Chhoti Makhi*), Organic Cold-Pressed Oils, Desi Shakkar, and Himalayan Herbs nationwide across Pakistan.

The platform combines ultra-fast client-side rendering with real-time cloud data synchronization, 1-click WhatsApp ordering, and a secret protected Admin Panel for seamless catalog management.

---

## ✨ Key Features & Highlights

### 🛍️ Customer Experience & Storefront
- **Dynamic Product Catalog**: Filter by category, view weight variants (500g, 1KG, 2KG, 5KG), and inspect detailed purity guarantees.
- **1-Click WhatsApp Checkout Engine**: Zero-friction ordering system that builds custom pre-filled WhatsApp messages with selected items, weight, and price inquiry.
- **Customer Photo Reviews**: Interactive review modal supporting customer photo uploads and verified buyer ratings.
- **Responsive Luxury UI System**: Modern dark & light mode theme toggle, glassmorphism UI cards, smooth micro-animations, and 100% mobile-first optimization.

### 🔐 Admin Panel & Store Management
- **Secret Stealth Login**: Accessible via 5-tap logo gesture or `/admin` route with cloud-persisted authentication.
- **Full Product & Category CRUD**: Create, edit, and delete catalog items with real-time Google Cloud Firestore synchronization.
- **Photo Review Moderation**: Live queue for approving or rejecting submitted customer photo reviews.
- **Automatic Image Compression**: Canvas-based image compressor scaling heavy photo uploads down to ~35KB, preventing browser storage quota errors (`QuotaExceededError`).

### 🔍 Technical SEO & Performance
- **Google Search Console Integration**: Verified ownership meta tags, custom `sitemap.xml`, and `robots.txt`.
- **Structured Data (JSON-LD)**: Configured `WebSite`, `Store`, and `Product` rich snippet schemas for price, currency (`PKR`), and aggregate ratings.
- **Social Link Previews**: Open Graph and Twitter meta cards optimized for rich card previews when links are shared on WhatsApp and social media.

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend Framework** | React.js (v18+) |
| **Build Tool & Bundler** | Vite (HMR & Rolldown/Rollup Production Optimizer) |
| **Styling & UI Tokens** | Vanilla CSS3 (Custom Design System Tokens, Flexbox/Grid, Dark/Light Variables) |
| **Cloud Database** | Google Firebase Cloud Firestore (Real-time NoSQL Database) |
| **Hosting & CDN** | Google Firebase Hosting (Global Google Edge CDN with SSL) |
| **State Management** | React Context API (`ProductContext`, `AuthContext`, `ReviewContext`, `ToastContext`, `ThemeContext`) |
| **Icons & Utilities** | Lucide React Icons |

---

## 📂 Directory Structure

```text
Javed Organic Store/
├── public/
│   ├── logo.jpg               # Store Brand Logo & Open Graph Sharing Card
│   ├── robots.txt             # Search Engine Crawler Directives
│   └── sitemap.xml            # Google Search Console Indexing Sitemap
├── src/
│   ├── assets/                # Static Media Assets
│   ├── components/            # UI Components (Header, Hero, Products, Admin, Reviews, etc.)
│   ├── context/               # Global State Context Providers
│   ├── data/                  # Master Store Configuration & Default Catalog
│   ├── firebase.js            # Firebase App & Firestore Cloud Connection
│   ├── App.jsx                # Main Application Shell & Routing
│   ├── index.css              # Core Design System Tokens & Global Styles
│   └── main.jsx               # Application Entrypoint
├── .env                       # Environment Variables (Git Ignored)
├── .env.example               # Environment Variables Template
├── firebase.json              # Firebase Hosting Configuration
└── index.html                 # Primary HTML Document & SEO Structured Data
```

---

## 💻 Local Development Setup

Follow these steps to run the application locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/saad-dev-950/Javed-Organic-Store.git

# 2. Navigate to the project directory
cd Javed-Organic-Store

# 3. Install dependencies
npm install

# 4. Create local environment file
cp .env.example .env

# 5. Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 👨‍💻 Developer Information

- **Developer Name**: **Saad Nadeem**
- **Platform / Brand**: **Saad Dev Hub 🚀**
- **Role**: Full-Stack Web Developer
- **Mission**: Building clean, modern, high-performance, and user-centric web applications.

---

## 🔗 Live Application Links

- 🌐 **Live Website**: [https://javed-organic-store.web.app](https://javed-organic-store.web.app)
- 🔐 **Admin Dashboard**: [https://javed-organic-store.web.app/admin](https://javed-organic-store.web.app/admin)
- 🗺️ **XML Sitemap**: [https://javed-organic-store.web.app/sitemap.xml](https://javed-organic-store.web.app/sitemap.xml)

---

© 2026 **Javed Organic Store**. Crafted with excellence by **Saad Dev Hub 🚀**.
