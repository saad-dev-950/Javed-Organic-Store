import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as DEFAULT_CATEGORIES } from "../data/storeData";
import { db } from "../firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const ProductContext = createContext();
const STORAGE_KEY_PRODUCTS = "javed_store_products_v3";
const STORAGE_KEY_CATEGORIES = "javed_store_categories_v3";

const safeSetLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`LocalStorage quota exceeded for ${key}, stripping large base64 strings for local cache:`, err);
    try {
      if (Array.isArray(data)) {
        const cleaned = data.map((item) => ({
          ...item,
          image: (typeof item.image === "string" && item.image.startsWith("data:") && item.image.length > 50000)
            ? "/logo.jpg"
            : item.image,
        }));
        localStorage.setItem(key, JSON.stringify(cleaned));
      }
    } catch (e) {
      console.error("LocalStorage save failed completely:", e);
    }
  }
};

export function ProductProvider({ children }) {
  // Local fallback state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error("Localstorage products load error:", err);
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    try {
      const savedCat = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (savedCat) {
        const parsed = JSON.parse(savedCat);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error("Localstorage categories load error:", err);
    }
    return DEFAULT_CATEGORIES;
  });

  // Real-time Firestore Sync for Products
  useEffect(() => {
    try {
      const prodsRef = collection(db, "products");
      const unsub = onSnapshot(prodsRef, (snapshot) => {
        if (!snapshot.empty) {
          const remoteProducts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(remoteProducts);
          safeSetLocalStorage(STORAGE_KEY_PRODUCTS, remoteProducts);
        } else {
          // If Firestore is empty, seed initial default products
          INITIAL_PRODUCTS.forEach(async (p) => {
            await setDoc(doc(db, "products", p.id), p);
          });
        }
      }, (error) => {
        console.warn("Firestore products read error (using local storage):", error.message);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Firestore initialization skipped:", e);
    }
  }, []);

  // Real-time Firestore Sync for Categories
  useEffect(() => {
    try {
      const catsRef = collection(db, "categories");
      const unsub = onSnapshot(catsRef, (snapshot) => {
        if (!snapshot.empty) {
          const remoteCategories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(remoteCategories);
          safeSetLocalStorage(STORAGE_KEY_CATEGORIES, remoteCategories);
        } else {
          // Seed initial categories
          DEFAULT_CATEGORIES.forEach(async (c) => {
            await setDoc(doc(db, "categories", c.id), c);
          });
        }
      }, (error) => {
        console.warn("Firestore categories read error (using local storage):", error.message);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Firestore categories init error:", e);
    }
  }, []);

  // Sync products state to localStorage
  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEY_PRODUCTS, products);
  }, [products]);

  // Sync categories state to localStorage
  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEY_CATEGORIES, categories);
  }, [categories]);

  // Product CRUD Operations
  const addProduct = async (newProductData) => {
    const newId = `product-${Date.now()}`;
    const productToAdd = {
      id: newId,
      name: newProductData.name,
      category: newProductData.category || "ghee",
      image: newProductData.image,
      tagline: newProductData.tagline || "",
      shortDescription: newProductData.shortDescription || "",
      fullDescription: newProductData.fullDescription || "",
      badge: newProductData.badge || "",
      badgeType: newProductData.badgeType || "gold",
      purityGuarantee: newProductData.purityGuarantee || "100% Guaranteed pure in-house prepared.",
      rating: newProductData.rating || 5.0,
      reviewsCount: newProductData.reviewsCount || 1,
      variants: newProductData.variants && newProductData.variants.length > 0 
        ? newProductData.variants 
        : [{ weight: "1 KG", isDefault: true }],
      benefits: newProductData.benefits || ["100% Pure In-House Prepared"],
    };

    // Update local state and localStorage safely
    setProducts((prev) => {
      const updated = [productToAdd, ...prev];
      safeSetLocalStorage(STORAGE_KEY_PRODUCTS, updated);
      return updated;
    });

    // Firestore Sync
    try {
      await setDoc(doc(db, "products", newId), productToAdd);
    } catch (err) {
      console.warn("Firestore addProduct error:", err.message);
    }

    return productToAdd;
  };

  const updateProduct = async (id, updatedFields) => {
    const existing = products.find((p) => p.id === id) || {};
    const fullUpdatedProduct = { ...existing, ...updatedFields, id };

    // Update local state and localStorage safely
    setProducts((prev) => {
      const updated = prev.map((item) => (item.id === id ? fullUpdatedProduct : item));
      safeSetLocalStorage(STORAGE_KEY_PRODUCTS, updated);
      return updated;
    });

    // Firestore Sync complete merged object
    try {
      await setDoc(doc(db, "products", id), fullUpdatedProduct, { merge: true });
    } catch (err) {
      console.warn("Firestore updateProduct error:", err.message);
    }

    return fullUpdatedProduct;
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      safeSetLocalStorage(STORAGE_KEY_PRODUCTS, updated);
      return updated;
    });

    // Firestore Sync
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (err) {
      console.warn("Firestore deleteProduct error:", err.message);
    }
  };

  // Category CRUD Operations
  const addCategory = async (categoryName) => {
    if (!categoryName.trim()) return null;
    const catId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (categories.some((c) => c.id === catId)) {
      return { success: false, message: "Category already exists!" };
    }
    const newCat = { id: catId, name: categoryName.trim(), count: 0 };
    setCategories((prev) => [...prev, newCat]);

    // Firestore Sync
    try {
      await setDoc(doc(db, "categories", catId), newCat);
    } catch (err) {
      console.warn("Firestore addCategory error:", err.message);
    }

    return { success: true, category: newCat };
  };

  const updateCategory = async (catId, newName) => {
    if (!newName.trim()) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, name: newName.trim() } : c))
    );

    // Firestore Sync
    try {
      await setDoc(doc(db, "categories", catId), { name: newName.trim() }, { merge: true });
    } catch (err) {
      console.warn("Firestore updateCategory error:", err.message);
    }

    return { success: true };
  };

  const deleteCategory = async (catId) => {
    if (catId === "all") return { success: false, message: "Cannot delete 'All Products' category." };
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setProducts((prev) =>
      prev.map((p) => (p.category === catId ? { ...p, category: "ghee" } : p))
    );

    // Firestore Sync
    try {
      await deleteDoc(doc(db, "categories", catId));
    } catch (err) {
      console.warn("Firestore deleteCategory error:", err.message);
    }

    return { success: true };
  };

  const resetProductsToDefault = async () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    safeSetLocalStorage(STORAGE_KEY_PRODUCTS, INITIAL_PRODUCTS);
    safeSetLocalStorage(STORAGE_KEY_CATEGORIES, DEFAULT_CATEGORIES);

    // Firestore batch seed
    try {
      INITIAL_PRODUCTS.forEach(async (p) => {
        await setDoc(doc(db, "products", p.id), p);
      });
      DEFAULT_CATEGORIES.forEach(async (c) => {
        await setDoc(doc(db, "categories", c.id), c);
      });
    } catch (err) {
      console.warn("Firestore reset error:", err.message);
    }
  };

  const exportProductsJSON = () => {
    const backupData = {
      products,
      categories,
      exportDate: new Date().toISOString(),
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `javed_organic_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
