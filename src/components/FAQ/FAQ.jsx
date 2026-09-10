import React, { useState } from "react";
import { FAQS, createWhatsAppGeneralInquiryUrl } from "../../data/storeData";
import { ChevronDown, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section section-padding">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-badge">
            <Sparkles size={14} className="text-gold" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="section-title">Common Questions & Answers</h2>
          <p className="section-subtitle">
            Everything you need to know about our organic sourcing, purity testing, packaging, and WhatsApp ordering.
          </p>
        </div>

        <div className="faq-accordion">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? "faq-open" : ""}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <HelpCircle size={18} className="faq-q-icon" />
                    <span>{item.q}</span>
                  </div>
                  <ChevronDown size={20} className="faq-chevron" />
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-bottom-cta">
          <p>Have another question about our products?</p>
          <a
            href={createWhatsAppGeneralInquiryUrl("Customer FAQ Question")}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-wa-link"
          >
            <MessageCircle size={17} />
            <span>Ask us directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
