import React, { useState } from "react";
import { useReviews } from "../../context/ReviewContext";
import { createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { Star, Sparkles, Quote, CheckCircle2, MessageCircle, Camera } from "lucide-react";
import ReviewSubmitModal from "../Modal/ReviewSubmitModal";
import "./Reviews.css";

export default function Reviews() {
  const { approvedReviews } = useReviews();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <section id="reviews" className="reviews-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} className="text-gold" />
            REAL EXPERIENCES
          </span>
          <h2 className="section-title">Loved by Pakistani Families</h2>
          <p className="section-subtitle">
            Read what our patrons across Lahore, Karachi, Islamabad, and nationwide have to say about the pure aroma, authentic taste, and swift WhatsApp service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {approvedReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-top">
                <div className="review-stars-group">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <span className="review-verified-badge">
                  <CheckCircle2 size={13} /> Verified Buyer
                </span>
              </div>

              {/* Customer Uploaded Photo Attachment */}
              {review.photo && (
                <div className="review-photo-container">
                  <img src={review.photo} alt={`${review.name} customer photo`} className="review-photo-img" />
                  <span className="photo-tag">📷 Verified Customer Photo</span>
                </div>
              )}

              <div className="review-quote-wrap">
                <Quote size={24} className="quote-icon" />
                <p className="review-body">"{review.review}"</p>
              </div>

              <div className="review-product-tag">
                <span>Ordered: <strong>{review.product}</strong></span>
              </div>

              <div className="review-user-info">
                <div className="user-avatar-initials">
                  {review.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                <div className="user-text-details">
                  <h4 className="user-full-name">{review.name}</h4>
                  <span className="user-location">{review.city} • {review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Feedback & Review Submission Prompt */}
        <div className="reviews-footer-prompt">
          <span className="reviews-prompt-title">Already received your order from us?</span>
          <div className="review-prompt-buttons">
            <button
              className="btn btn-whatsapp btn-sm-rev"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              <Camera size={16} />
              <span>Write a Review & Attach Photo</span>
            </button>

            <a
              href={createWhatsAppGeneralInquiryUrl("Customer Review Feedback")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm-rev"
            >
              <MessageCircle size={16} />
              <span>Send Review on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      <ReviewSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </section>
  );
}
