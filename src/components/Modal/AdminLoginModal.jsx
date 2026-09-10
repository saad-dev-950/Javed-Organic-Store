import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, Lock, User, Eye, EyeOff, ShieldCheck, KeyRound, AlertCircle } from "lucide-react";
import "./AdminLoginModal.css";

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      setIsLoading(false);
      if (result.success) {
        setUsername("");
        setPassword("");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  return (
    <div className="admin-login-backdrop" onClick={onClose}>
      <div 
        className="admin-login-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        {/* Close Button */}
        <button 
          className="admin-login-close" 
          onClick={onClose}
          aria-label="Close login dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="admin-login-header">
          <div className="admin-badge-icon">
            <ShieldCheck size={28} className="text-gold" />
          </div>
          <h2 id="admin-login-title" className="admin-login-title">
            Admin Control Portal
          </h2>
          <p className="admin-login-subtitle">
            Enter authorized store credentials to manage products, rates & settings.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="admin-error-alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="form-label">Admin Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="admin-input"
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Admin Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="admin-input password-input"
              />
              {/* Professional Eye Toggle Icon */}
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  <EyeOff size={18} className="eye-icon" />
                ) : (
                  <Eye size={18} className="eye-icon" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-whatsapp admin-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Unlock Admin Panel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
