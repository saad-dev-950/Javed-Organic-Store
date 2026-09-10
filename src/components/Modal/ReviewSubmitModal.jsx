import React, { useState } from "react";
import { useReviews } from "../../context/ReviewContext";
import { useToast } from "../../context/ToastContext";
import { X, Star, Upload, CheckCircle2, Camera } from "lucide-react";
import "./ReviewSubmitModal.css";

export default function ReviewSubmitModal({ isOpen, onClose }) {
  const { submitReview } = useReviews();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [product, setProduct] = useState("Pure Buffalo Desi Ghee");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size exceeds 5MB limit. Please choose a smaller photo.", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      showToast("Customer photo attached!", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return showToast("Please enter your name.", "error");
    if (!review.trim()) return showToast("Please write a few words in your review.", "error");

    setIsSubmitting(true);
    setTimeout(() => {
      submitReview({
        name,
        city,
        product,
        rating,
        review,
        photo,
      });
      setIsSubmitting(false);
      showToast("Thank you! Your review has been submitted for admin verification.", "success", 4000);
      onClose();
      // Reset
      setName("");
      setCity("");
      setReview("");
      setPhoto(null);
    }, 400);
  };

  return (
    <div className="rev-modal-backdrop" onClick={onClose}>
      <div className="rev-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="rev-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="rev-modal-header">
          <div className="rev-badge-icon">
            <Camera size={26} className="text-gold" />
          </div>
          <h3>Submit Customer Review</h3>
          <p>Share your authentic experience with Javed Organic Store.</p>
        </div>

        <form onSubmit={handleSubmit} className="rev-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Tariq Mahmood"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">City / Location</label>
              <input
                type="text"
                placeholder="e.g. Lahore (DHA) / Islamabad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Product Ordered</label>
              <input
                type="text"
                placeholder="e.g. Pure Buffalo Desi Ghee"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Star Rating *</label>
              <div className="star-rating-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-pick-btn ${star <= rating ? "active" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    <Star size={22} fill={star <= rating ? "#D4AF37" : "none"} color="#D4AF37" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review & Feedback *</label>
            <textarea
              rows="3"
              required
              placeholder="Tell us about the aroma, taste, and packaging of your product..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="admin-input textarea-input"
            />
          </div>

          {/* Photo Attachment Dropzone */}
          <div className="form-group">
            <label className="form-label">Attach Photo of Received Product (Optional)</label>
            <div className="rev-photo-dropzone">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                id="rev-photo-input"
                className="hidden-file-input"
              />
              <label htmlFor="rev-photo-input" className="file-upload-label">
                <Upload size={22} className="text-gold" />
                <span>Click to upload product photo from your device</span>
                <small>PNG, JPG up to 5MB</small>
              </label>
            </div>
            {photo && (
              <div className="photo-preview-box">
                <img src={photo} alt="Customer product preview" className="photo-preview-img" />
                <span>Photo attached successfully!</span>
                <button type="button" className="btn-del-mini" onClick={() => setPhoto(null)}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="rev-actions-row">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-whatsapp" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review for Verification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
