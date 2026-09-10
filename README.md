# 🌿 Javed Organic Store — Premium Full-Stack E-Commerce Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Website-javed--organic--store.web.app-00E676?style=for-the-badge&logo=google-chrome&logoColor=white)](https://javed-organic-store.web.app)
[![Admin Panel](https://img.shields.io/badge/Admin%20Panel-Protected%20Dashboard-D4AF37?style=for-the-badge&logo=firebase&logoColor=white)](https://javed-organic-store.web.app/admin)
[![Developer](https://img.shields.io/badge/Developer-Saad%20Nadeem%20%7C%20Saad%20Dev%20Hub-103320?style=for-the-badge&logo=codefactor&logoColor=white)](https://github.com)

> **Javed Organic Store** is a luxury, high-performance, full-stack e-commerce web application engineered for an authentic organic foods brand in Pakistan. It offers 100% pure, in-house handcrafted Bilona Desi Ghee, A2 Cow Ghee, Wild Sidr Honey (*Chhoti Makhi*), Organic Cold-Pressed Oils, Desi Shakkar, and Himalayan Herbs with nationwide Cash on Delivery (COD) and 1-click WhatsApp instant ordering.

---

## 🌟 Key Highlights & Business Features

- 🛍️ **Interactive Product Showcase & Weight Variants**: Full product catalog supporting weight selectors (500g, 1KG, 2KG, 5KG Family Tins), purity guarantees, and modal story popups.
- 💬 **1-Click WhatsApp Instant Ordering**: Direct friction-free checkout engine pre-filling customized WhatsApp order messages with item name, weight, quantity, and price inquiry.
- 🔐 **Secret Admin Panel & Management Suite**: Stealth 5-tap brand logo trigger or `/admin` route featuring Grid vs Table product views, Category CRUD, and real-time password management.
- 📸 **Customer Photo Reviews & Moderation Queue**: Customer photo review submission modal with local image attachments and 1-click admin approval/rejection.
- ⚡ **Google Cloud Firestore Database Real-Time Sync**: Real-time NoSQL document synchronization (`onSnapshot`) for products, categories, reviews, and admin security settings with 0ms instant startup offline fallback.
- 🖼️ **Automatic Canvas Image Compression & Storage Protection**: Integrated HTML5 Canvas image compressor scaling heavy camera uploads down to ~35KB, preventing browser storage quota errors (`QuotaExceededError`).
- 🎨 **Luxury Responsive Design System**: Built with custom Vanilla CSS Tokens, dark/light mode toggle, glassmorphism cards, and smooth micro-animations across all mobile, tablet, and desktop viewports.
- 🔍 **Advanced Technical SEO & Rich Snippets**: Google JSON-LD Schemas (`WebSite`, `Store`, `Product` offers & ratings), Open Graph HTTPS preview tags for WhatsApp link sharing, `sitemap.xml`, `robots.txt`, and Google Search Console verification.

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend Framework** | React.js (v18+) with ES6+ JavaScript |
| **Build Tooling** | Vite (Ultra-fast HMR & Minified Rollup/Rolldown Bundler) |
| **Styling & Design System** | Vanilla CSS3 (Custom Design System System Tokens, Variables & HSL Colors) |
| **Cloud Database** | Google Firebase Cloud Firestore (Real-time NoSQL Database) |
| **Cloud Infrastructure & Hosting** | Google Firebase Hosting (Global Google CDN with Free SSL) |
| **State & Context Management** | React Context API (`ProductContext`, `ReviewContext`, `AuthContext`, `ToastContext`, `ThemeContext`) |
| **Icons & UI Assets** | Lucide React Icons |

---

## 📂 Project Architecture & Directory Structure

```
Javed Organic Store/
├── public/
│   ├── logo.jpg               # Store Brand Logo & Open Graph Sharing Image
│   ├── robots.txt             # Search Engine Crawler Directives
│   └── sitemap.xml            # Google Search Console Indexing Sitemap
├── src/
│   ├── assets/                # Static Media & Images
│   ├── components/            # UI Components
│   │   ├── About/             # Our Story & Traditional Methods Section
│   │   ├── Admin/             # Secret Admin Dashboard & Product/Category Forms
│   │   ├── Contact/           # Contact Details, Phone, Email & Map Section
│   │   ├── Footer/            # Footer Navigation, Social Links & Trust Badges
│   │   ├── Header/            # Responsive Navbar, Theme Switcher & Mobile Menu
│   │   ├── Hero/              # Hero Banner with Floating Purity Badges
│   │   ├── Modal/             # Product Details Modal & Review Submit Modal
│   │   ├── Products/          # Product Grid, Filter Tabs & Weight Variants
│   │   ├── Reviews/           # Verified Customer Reviews & Photo Gallery
│   │   ├── ShippingBar/       # Announcement Top Bar
│   │   └── WhyChooseUs/       # Javed Organic vs Commercial Brands Matrix
│   ├── context/               # Global React Context State Managers
│   │   ├── AuthContext.jsx    # Admin Authentication & Cloud Password Sync
│   │   ├── ProductContext.jsx # Products & Categories Firestore Real-time Sync
│   │   ├── ReviewContext.jsx  # Customer Reviews & Photo Approvals Sync
│   │   ├── ThemeContext.jsx   # Dark / Light Mode State
│   │   └── ToastContext.jsx   # Global High-Contrast Notification Toasts
│   ├── data/
│   │   └── storeData.js       # Master Store Configuration & Default Catalog
│   ├── firebase.js            # Firebase App & Firestore Initialization
│   ├── App.jsx                # Main Application Container & Route Handling
│   ├── index.css              # Core Design System, Variables & Global Reset
│   └── main.jsx               # React DOM Entrypoint
├── firebase.json              # Firebase Hosting Configuration (public: "dist")
├── .firebaserc                # Firebase Project Alias (javed-organic-store)
├── index.html                 # Primary Document, SEO Meta Tags & JSON-LD Schemas
└── package.json               # NPM Dependencies & Build Scripts
```

---

## 🚀 Local Development Setup

Follow these steps to run the application locally on your machine:

1. **Clone or Navigate to the Project Directory**:
   ```bash
   cd "Javed Organic Store"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Access the Secret Admin Panel**:
   - Click the brand logo in the header **5 times in quick succession**, OR navigate to `http://localhost:5173/admin`.
   - **Default Admin Username**: `admin`
   - **Default Admin Password**: `JavedStore786#`

---

## 📦 Production Build & Firebase Deployment

To build and deploy updates live to Google Firebase Hosting:

1. **Compile Production Build**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**:
   ```bash
   npx firebase-tools deploy
   ```

---

## 🌐 Live Production Links

- 🛍️ **Live Website**: [https://javed-organic-store.web.app](https://javed-organic-store.web.app)
- 🔑 **Admin Panel**: [https://javed-organic-store.web.app/admin](https://javed-organic-store.web.app/admin)
- 🗺️ **XML Sitemap**: [https://javed-organic-store.web.app/sitemap.xml](https://javed-organic-store.web.app/sitemap.xml)

---

## 👨‍💻 Developer & Credits

- **Developer Name**: **Saad Nadeem**
- **Agency / Studio**: **Saad Dev Hub**
- **Specialization**: Full-Stack Web Development, Custom E-Commerce Engineering & Modern UI/UX Architecture

---

© 2026 **Javed Organic Store**. All Rights Reserved. Built with ❤️ by **Saad Dev Hub**.
