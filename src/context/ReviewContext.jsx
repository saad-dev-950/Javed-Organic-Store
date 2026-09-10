import React, { createContext, useContext, useState, useEffect } from "react";
import { TESTIMONIALS as INITIAL_REVIEWS } from "../data/storeData";
import { db } from "../firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const ReviewContext = createContext();
const STORAGE_KEY_REVIEWS = "javed_store_reviews_v2";

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error("Failed to load reviews from localStorage:", err);
    }
    return INITIAL_REVIEWS.map((r) => ({ ...r, isApproved: true }));
  });

  // Real-time Firestore Sync for Reviews
  useEffect(() => {
    try {
      const revsRef = collection(db, "reviews");
      const unsub = onSnapshot(revsRef, (snapshot) => {
        if (!snapshot.empty) {
          const remoteReviews = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(remoteReviews);
          localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(remoteReviews));
        } else {
          // Seed default reviews into Firestore
          INITIAL_REVIEWS.forEach(async (r) => {
            const seedRev = { ...r, isApproved: true };
            await setDoc(doc(db, "reviews", r.id), seedRev);
          });
        }
      }, (error) => {
        console.warn("Firestore reviews read error (using local storage):", error.message);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Firestore reviews init error:", e);
    }
  }, []);

  // Auto sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (err) {
      console.error("Failed to save reviews to localStorage:", err);
    }
  }, [reviews]);

  const submitReview = async (reviewData) => {
    const newId = `rev-${Date.now()}`;
    const newReview = {
      id: newId,
      name: reviewData.name.trim(),
      city: reviewData.city.trim() || "Pakistan",
      product: reviewData.product || "Pure Desi Products",
      rating: Number(reviewData.rating) || 5,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      review: reviewData.review.trim(),
      photo: reviewData.photo || null,
      isApproved: false, // Requires Admin Moderation
    };

    setReviews((prev) => [newReview, ...prev]);

    // Firestore Sync
    try {
      await setDoc(doc(db, "reviews", newId), newReview);
    } catch (err) {
      console.warn("Firestore submitReview error:", err.message);
    }

    return newReview;
  };

  const approveReview = async (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
    );

    // Firestore Sync
    try {
      await setDoc(doc(db, "reviews", id), { isApproved: true }, { merge: true });
    } catch (err) {
      console.warn("Firestore approveReview error:", err.message);
    }
  };

  const deleteReview = async (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));

    // Firestore Sync
    try {
      await deleteDoc(doc(db, "reviews", id));
    } catch (err) {
      console.warn("Firestore deleteReview error:", err.message);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        approvedReviews: reviews.filter((r) => r.isApproved),
        pendingReviews: reviews.filter((r) => !r.isApproved),
        submitReview,
        approveReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
}
