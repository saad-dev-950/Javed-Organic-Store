import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../context/ToastContext";
import { useReviews } from "../../context/ReviewContext";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  LogOut, 
  Package, 
  ShieldCheck,
  X,
  Check,
  Image as ImageIcon,
  Upload,
  Layers,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Edit2,
  Star,
  MessageSquareQuote,
  LayoutGrid,
  List
} from "lucide-react";
import "./AdminDashboard.css";

export default function AdminDashboard({ onBackToSite }) {
  const { logout, changePassword } = useAuth();
  const { showToast } = useToast();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetProductsToDefault, 
    exportProductsJSON,
  } = useProducts();

  const { reviews, pendingReviews, approveReview, deleteReview } = useReviews();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  
  // Modal states for Add / Edit product
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploadType, setImageUploadType] = useState("file"); // "file" | "url"
  
  // Form State
  const [formData, setFormData] = useState(getEmptyForm());

  // Password Change Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Category CRUD Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatName, setEditingCatName] = useState("");

  // Reviews Moderation Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Confirmation Dialog Modal State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  function getEmptyForm() {
    return {
      name: "",
      category: "ghee",
      image: "",
      tagline: "",
      shortDescription: "",
      fullDescription: "",
      badge: "Bestseller",
      badgeType: "gold",
      purityGuarantee: "100% Guaranteed pure in-house prepared.",
      variants: [
        { weight: "500 Grams", isDefault: false },
        { weight: "1 Kilogram (1 KG)", isDefault: true },
      ],
      benefits: ["100% Pure In-House Prepared with zero chemicals"],
    };
  }

  // Open Form Modal for Create
  const handleOpenCreateForm = () => {
    setEditingProduct(null);
    setFormData(getEmptyForm());
    setImageUploadType("file");
    setIsFormModalOpen(true);
  };

  // Open Form Modal for Edit
  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "ghee",
      image: product.image || "",
      tagline: product.tagline || "",
      shortDescription: product.shortDescription || "",
      fullDescription: product.fullDescription || "",
      badge: product.badge || "",
      badgeType: product.badgeType || "gold",
      purityGuarantee: product.purityGuarantee || "",
      variants: product.variants ? [...product.variants] : [{ weight: "1 KG", isDefault: true }],
      benefits: product.benefits ? [...product.benefits] : [""],
    });
    setImageUploadType(product.image?.startsWith("data:") ? "file" : "url");
    setIsFormModalOpen(true);
  };

  // Local File Image Upload Handler with Automatic Canvas Compression
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 900;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        showToast("Local image compressed & uploaded successfully!", "success");
      };
      img.onerror = () => {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Product Name is required!", "error");
      return;
    }
    if (!formData.image.trim()) {
      showToast("Please upload an image file or enter an Image URL!", "error");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        showToast(`Product "${formData.name}" updated successfully!`, "success");
      } else {
        await addProduct(formData);
        showToast(`Product "${formData.name}" created successfully!`, "success");
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error("Product save error:", err);
      showToast("Error saving product. Please try again.", "error");
    }
  };

  // Variant Helpers
  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { weight: "2 KG", isDefault: false }],
    }));
  };

  const handleRemoveVariant = (index) => {
    if (formData.variants.length <= 1) {
      showToast("Product must have at least 1 weight option.", "warning");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantWeightChange = (index, val) => {
    const updated = [...formData.variants];
    updated[index].weight = val;
    setFormData((prev) => ({ ...prev, variants: updated }));
  };

  const handleSetDefaultVariant = (index) => {
    const updated = formData.variants.map((v, i) => ({
      ...v,
      isDefault: i === index,
    }));
    setFormData((prev) => ({ ...prev, variants: updated }));
  };

  // Benefit Helpers
  const handleAddBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }));
  };

  const handleBenefitChange = (index, val) => {
    const updated = [...formData.benefits];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, benefits: updated }));
  };

  const handleRemoveBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  // Category CRUD Handlers
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const res = addCategory(newCatName);
    if (res.success) {
      showToast(`Category "${newCatName}" added!`, "success");
      setNewCatName("");
    } else {
      showToast(res.message, "error");
    }
  };

  const handleSaveEditCategory = (catId) => {
    if (!editingCatName.trim()) return;
    updateCategory(catId, editingCatName);
    showToast("Category name updated!", "success");
    setEditingCatId(null);
    setEditingCatName("");
  };

  const handleDeleteCategoryClick = (catId, catName) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Category",
      message: `Are you sure you want to delete category "${catName}"?`,
      onConfirm: () => {
        deleteCategory(catId);
        showToast(`Category "${catName}" deleted.`, "info");
      },
    });
  };

  // Password Update Submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(oldPass, newPass);
      if (res && res.success) {
        showToast(res.message || "Password updated successfully!", "success");
        setOldPass("");
        setNewPass("");
        setIsPasswordModalOpen(false);
      } else {
        showToast(res?.message || "Invalid current password.", "error");
      }
    } catch (err) {
      showToast("Error updating password. Please try again.", "error");
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-dashboard-layout">
      {/* Top Sticky Header Bar */}
      <header className="admin-header-bar">
        <div className="admin-header-top-row">
          <div className="admin-brand-group">
            <div className="admin-logo-pill">
              <img src="/logo.jpg" alt="Logo" className="admin-logo-mini" />
              <span className="admin-store-name">JAVED ADMIN</span>
            </div>

            <button className="btn-admin-back" onClick={onBackToSite} title="Return to store front">
              <ArrowLeft size={15} />
              <span>Live Store</span>
            </button>
          </div>

          <div className="admin-header-actions-row">
            <button 
              className="btn-admin-action" 
              onClick={() => setIsReviewModalOpen(true)}
              title="Moderate customer reviews"
            >
              <MessageSquareQuote size={15} />
              <span>Reviews ({pendingReviews.length})</span>
            </button>

            <button 
              className="btn-admin-action" 
              onClick={() => setIsCategoryModalOpen(true)}
              title="Manage Categories"
            >
              <Layers size={15} />
              <span>Categories</span>
            </button>

            <button 
              className="btn-admin-action" 
              onClick={() => {
                exportProductsJSON();
                showToast("Backup JSON exported!", "success");
              }}
              title="Export backup JSON"
            >
              <Download size={15} />
              <span className="hide-mobile-text">Export</span>
            </button>

            <button 
              className="btn-admin-action" 
              onClick={() => setIsPasswordModalOpen(true)}
              title="Change Password"
            >
              <KeyRound size={15} />
              <span className="hide-mobile-text">Settings</span>
            </button>

            <button 
              className="btn-admin-action btn-admin-logout" 
              onClick={() => {
                logout();
                showToast("Logged out.", "info");
              }}
              title="Logout from admin panel"
            >
              <LogOut size={15} />
              <span className="hide-mobile-text">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="admin-main-container container">
        {/* Stat Cards Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-gold">
              <Package size={20} />
            </div>
            <div>
              <span className="stat-num">{products.length}</span>
              <span className="stat-lbl">Total Products</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-emerald">
              <MessageSquareQuote size={20} />
            </div>
            <div>
              <span className="stat-num">{pendingReviews.length}</span>
              <span className="stat-lbl">Pending Reviews</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap bg-gold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="stat-num">{categories.length - 1}</span>
              <span className="stat-lbl">Categories</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filter, View Mode Toggle & Add Button */}
        <div className="admin-toolbar">
          <div className="toolbar-search-filter">
            <div className="admin-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search catalog products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <div className="admin-filter-box">
              <Filter size={16} className="filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="admin-select"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id === "all" ? products.length : products.filter(p => p.category === c.id).length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="toolbar-actions">
            {/* View Mode Toggle: Grid Cards vs Table */}
            <div className="view-mode-toggle">
              <button
                className={`btn-view-mode ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid Cards View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`btn-view-mode ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table List View"
              >
                <List size={16} />
              </button>
            </div>

            <button className="btn btn-whatsapp btn-add-prod" onClick={handleOpenCreateForm}>
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Modern Product Cards Grid */}
        {viewMode === "grid" ? (
          <div className="admin-cards-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-catalog-box">
                <Package size={40} className="text-gold" />
                <p>No products found. Tap "Add Product" to create one.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="admin-prod-card">
                  <div className="admin-card-top">
                    <img src={product.image} alt={product.name} className="admin-card-img" />
                    <div className="admin-card-badge-row">
                      <span className="cat-badge">{product.category}</span>
                    </div>
                  </div>

                  <div className="admin-card-body">
                    <h4 className="admin-card-title">{product.name}</h4>
                    <p className="admin-card-desc">{product.shortDescription || product.tagline}</p>
                    <div className="admin-card-meta">
                      <span>⭐ {product.rating || "5.0"} ({product.reviewsCount || 0} reviews)</span>
                    </div>
                  </div>

                  <div className="admin-card-footer">
                    <button 
                      className="btn-card-action btn-edit"
                      onClick={() => handleOpenEditForm(product)}
                    >
                      <Edit3 size={15} /> Edit
                    </button>
                    <button 
                      className="btn-card-action btn-delete"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Delete Product",
                          message: `Delete "${product.name}"?`,
                          onConfirm: () => {
                            deleteProduct(product.id);
                            showToast(`Product deleted.`, "info");
                          },
                        });
                      }}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* View Mode 2: Ultra-Clean Simplified Responsive Table */
          <div className="admin-table-wrapper">
            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-table-cell">
                        No products found. Tap "Add Product" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="table-prod-info">
                            <img src={product.image} alt={product.name} className="table-prod-img" />
                            <div>
                              <strong className="prod-name-title">{product.name}</strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cat-badge">{product.category}</span>
                        </td>
                        <td>⭐ {product.rating || "5.0"}</td>
                        <td className="text-right">
                          <div className="table-actions">
                            <button 
                              className="action-btn edit-btn"
                              onClick={() => handleOpenEditForm(product)}
                              title="Edit product"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              className="action-btn delete-btn"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Delete Product",
                                  message: `Delete "${product.name}"?`,
                                  onConfirm: () => {
                                    deleteProduct(product.id);
                                    showToast(`Product deleted.`, "info");
                                  },
                                });
                              }}
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* REVIEWS MODERATION MODAL */}
      {isReviewModalOpen && (
        <div className="admin-form-backdrop" onClick={() => setIsReviewModalOpen(false)}>
          <div className="admin-form-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>Reviews Moderation</h3>
              <button className="form-close-btn" onClick={() => setIsReviewModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="reviews-moderation-list">
              <span className="sec-label">Pending Reviews ({pendingReviews.length}):</span>
              {pendingReviews.length === 0 ? (
                <p className="empty-msg">No pending customer reviews.</p>
              ) : (
                pendingReviews.map((rev) => (
                  <div key={rev.id} className="review-mod-card">
                    {rev.photo && (
                      <div className="mod-photo-wrap">
                        <img src={rev.photo} alt="Customer upload" className="mod-photo-img" />
                      </div>
                    )}
                    <div className="mod-details">
                      <strong>{rev.name} ({rev.city})</strong>
                      <span className="mod-product">Product: {rev.product} • ⭐ {rev.rating} Stars</span>
                      <p className="mod-text">"{rev.review}"</p>
                    </div>
                    <div className="mod-actions">
                      <button 
                        className="btn-approve"
                        onClick={() => {
                          approveReview(rev.id);
                          showToast(`Approved review from ${rev.name}!`, "success");
                        }}
                      >
                        <Check size={16} /> Approve
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => {
                          deleteReview(rev.id);
                          showToast(`Review deleted.`, "info");
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}

              <hr className="mod-divider" />

              <span className="sec-label">Live Approved Reviews ({reviews.filter(r => r.isApproved).length}):</span>
              {reviews.filter(r => r.isApproved).map((rev) => (
                <div key={rev.id} className="review-mod-card approved">
                  {rev.photo && (
                    <div className="mod-photo-wrap">
                      <img src={rev.photo} alt="Customer upload" className="mod-photo-img" />
                    </div>
                  )}
                  <div className="mod-details">
                    <strong>{rev.name} ({rev.city})</strong>
                    <span className="mod-product">Product: {rev.product} • ⭐ {rev.rating} Stars</span>
                    <p className="mod-text">"{rev.review}"</p>
                  </div>
                  <div className="mod-actions">
                    <button 
                      className="btn-delete"
                      onClick={() => {
                        deleteReview(rev.id);
                        showToast(`Review removed.`, "info");
                      }}
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT FORM MODAL */}
      {isFormModalOpen && (
        <div className="admin-form-backdrop" onClick={() => setIsFormModalOpen(false)}>
          <div className="admin-form-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button className="form-close-btn" onClick={() => setIsFormModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="admin-product-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pure Buffalo Desi Ghee"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input"
                  >
                    {categories.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Image Option: Local File Upload vs Image URL */}
              <div className="form-group">
                <div className="image-source-toggle-bar">
                  <label className="form-label">Product Image *</label>
                  <div className="source-toggle-buttons">
                    <button
                      type="button"
                      className={`btn-source-toggle ${imageUploadType === "file" ? "active" : ""}`}
                      onClick={() => setImageUploadType("file")}
                    >
                      <Upload size={14} /> Upload from Computer
                    </button>
                    <button
                      type="button"
                      className={`btn-source-toggle ${imageUploadType === "url" ? "active" : ""}`}
                      onClick={() => setImageUploadType("url")}
                    >
                      <ImageIcon size={14} /> Image URL Link
                    </button>
                  </div>
                </div>

                {imageUploadType === "file" ? (
                  <div className="file-upload-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      id="local-image-input"
                      className="hidden-file-input"
                    />
                    <label htmlFor="local-image-input" className="file-upload-label">
                      <Upload size={24} className="upload-icon text-gold" />
                      <span>Click to select image file from computer</span>
                      <small>Supports PNG, JPG, WEBP (Max 5MB)</small>
                    </label>
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or /logo.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="admin-input"
                  />
                )}

                {formData.image && (
                  <div className="image-preview-bar">
                    <img src={formData.image} alt="Preview" className="img-preview" />
                    <span>Live Image Preview Ready</span>
                  </div>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Sub-Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Granular Danedaar • Cultured Butter"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, 100% Pure"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  placeholder="Brief 1-2 sentence overview..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description (Product Modal)</label>
                <textarea
                  rows="3"
                  placeholder="Complete product story and preparation details..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="admin-input textarea-input"
                />
              </div>

              {/* Dynamic Packet Sizes / Variants Manager */}
              <div className="form-section-box">
                <div className="sec-box-header">
                  <strong>Packet Sizes / Weight Options *</strong>
                  <button type="button" className="btn-add-mini" onClick={handleAddVariant}>
                    <Plus size={14} /> Add Weight Option
                  </button>
                </div>
                <div className="variants-editor-list">
                  {formData.variants.map((variant, idx) => (
                    <div key={idx} className="variant-edit-row">
                      <input
                        type="text"
                        placeholder="e.g. 1 Kilogram (1 KG)"
                        value={variant.weight}
                        onChange={(e) => handleVariantWeightChange(idx, e.target.value)}
                        className="admin-input input-sm"
                      />
                      <label className="radio-label-def">
                        <input
                          type="radio"
                          name="defaultVariant"
                          checked={variant.isDefault}
                          onChange={() => handleSetDefaultVariant(idx)}
                        />
                        <span>Default Option</span>
                      </label>
                      <button
                        type="button"
                        className="btn-del-mini"
                        onClick={() => handleRemoveVariant(idx)}
                        title="Delete variant"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Benefits List Manager */}
              <div className="form-section-box">
                <div className="sec-box-header">
                  <strong>Purity & Health Benefits Highlights</strong>
                  <button type="button" className="btn-add-mini" onClick={handleAddBenefit}>
                    <Plus size={14} /> Add Benefit
                  </button>
                </div>
                <div className="benefits-editor-list">
                  {formData.benefits.map((benefit, idx) => (
                    <div key={idx} className="benefit-edit-row">
                      <input
                        type="text"
                        placeholder="e.g. 100% In-House prepared without chemical bleaching"
                        value={benefit}
                        onChange={(e) => handleBenefitChange(idx, e.target.value)}
                        className="admin-input input-sm"
                      />
                      <button
                        type="button"
                        className="btn-del-mini"
                        onClick={() => handleRemoveBenefit(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-whatsapp">
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MANAGEMENT CRUD MODAL */}
      {isCategoryModalOpen && (
        <div className="admin-form-backdrop" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="admin-form-card modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>Manage Categories</h3>
              <button className="form-close-btn" onClick={() => setIsCategoryModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Add New Category Form */}
            <form onSubmit={handleAddCategorySubmit} className="add-cat-row">
              <input
                type="text"
                placeholder="New Category Name..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="admin-input input-sm"
              />
              <button type="submit" className="btn btn-whatsapp btn-sm">
                <Plus size={16} /> Add
              </button>
            </form>

            <div className="categories-crud-list">
              {categories.map((cat) => (
                <div key={cat.id} className="category-crud-row">
                  {editingCatId === cat.id ? (
                    <div className="cat-edit-inline">
                      <input
                        type="text"
                        value={editingCatName}
                        onChange={(e) => setEditingCatName(e.target.value)}
                        className="admin-input input-sm"
                        autoFocus
                      />
                      <button 
                        className="btn-cat-save"
                        onClick={() => handleSaveEditCategory(cat.id)}
                      >
                        <Check size={14} />
                      </button>
                      <button 
                        className="btn-cat-cancel"
                        onClick={() => setEditingCatId(null)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="cat-crud-info">
                        <strong>{cat.name}</strong>
                        <span className="cat-count">
                          ({products.filter(p => p.category === cat.id).length} products)
                        </span>
                      </div>
                      {cat.id !== "all" && (
                        <div className="cat-crud-actions">
                          <button
                            className="btn-cat-edit"
                            onClick={() => {
                              setEditingCatId(cat.id);
                              setEditingCatName(cat.name);
                            }}
                            title="Edit category name"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="btn-cat-del"
                            onClick={() => handleDeleteCategoryClick(cat.id, cat.name)}
                            title="Delete category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL WITH EYE TOGGLE ICONS ON ALL FIELDS */}
      {isPasswordModalOpen && (
        <div className="admin-form-backdrop" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="admin-form-card modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>Change Password</h3>
              <button className="form-close-btn" onClick={() => setIsPasswordModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="admin-product-form">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <div className="input-with-icon">
                  <input
                    type={showOldPass ? "text" : "password"}
                    required
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    className="admin-input password-input"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowOldPass(!showOldPass)}
                    title={showOldPass ? "Hide Password" : "Show Password"}
                  >
                    {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password (min 6 chars)</label>
                <div className="input-with-icon">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="admin-input password-input"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowNewPass(!showNewPass)}
                    title={showNewPass ? "Hide Password" : "Show Password"}
                  >
                    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="btn btn-whatsapp w-100">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG MODAL */}
      {confirmDialog.isOpen && (
        <div className="admin-form-backdrop" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
          <div className="admin-form-card modal-sm confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h4 className="confirm-title">{confirmDialog.title}</h4>
            <p className="confirm-msg">{confirmDialog.message}</p>
            <div className="form-actions-row">
              <button 
                className="btn btn-outline" 
                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
              >
                Cancel
              </button>
              <button 
                className="btn btn-whatsapp" 
                onClick={() => {
                  if (confirmDialog.onConfirm) confirmDialog.onConfirm();
                  setConfirmDialog({ ...confirmDialog, isOpen: false });
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
