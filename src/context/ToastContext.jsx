import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import "./Toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random();
    const safeText = (typeof message === "string" && message.trim()) 
      ? message 
      : (message?.message || String(message || "Operation notification"));
    setToasts((prev) => [...prev, { id, message: safeText, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <div className="toast-icon-wrap">
              {toast.type === "success" && <CheckCircle2 size={20} className="toast-icon-svg" />}
              {toast.type === "error" && <AlertCircle size={20} className="toast-icon-svg" />}
              {toast.type === "warning" && <AlertTriangle size={20} className="toast-icon-svg" />}
              {toast.type === "info" && <Info size={20} className="toast-icon-svg" />}
            </div>
            <div className="toast-content">
              <span className="toast-message">{toast.message}</span>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
            <div 
              className="toast-progress-bar" 
              style={{ animationDuration: `${toast.duration}ms` }} 
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
