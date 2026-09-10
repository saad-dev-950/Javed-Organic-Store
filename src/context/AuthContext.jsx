import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const AuthContext = createContext();

const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "JavedStore786#";
const STORAGE_KEY_PASS = "javed_admin_pass";
const STORAGE_KEY_SESSION = "javed_admin_session_v2";

export function AuthProvider({ children }) {
  // Persistent session across page reloads until explicit logout
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SESSION) === "true" || sessionStorage.getItem(STORAGE_KEY_SESSION) === "true";
    } catch {
      return false;
    }
  });

  const [adminUser] = useState(DEFAULT_ADMIN_USER);
  const [adminPass, setAdminPass] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_ADMIN_PASS;
    } catch {
      return DEFAULT_ADMIN_PASS;
    }
  });

  // Real-time Firestore Cloud Sync for Admin Password
  useEffect(() => {
    try {
      const adminDocRef = doc(db, "settings", "admin");
      const unsub = onSnapshot(adminDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.password) {
            setAdminPass(data.password);
            try {
              localStorage.setItem(STORAGE_KEY_PASS, data.password);
            } catch (e) {
              console.warn("LocalStorage pass write skipped:", e);
            }
          }
        } else {
          // Initialize default admin doc in Firestore if not exists
          setDoc(adminDocRef, { password: DEFAULT_ADMIN_PASS }, { merge: true }).catch((err) => {
            console.warn("Initial admin Firestore setup warning:", err.message);
          });
        }
      }, (err) => {
        console.warn("Firestore admin password sync error (using local storage):", err.message);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Firestore Auth init error:", e);
    }
  }, []);

  const login = (username, password) => {
    if (username.trim() === DEFAULT_ADMIN_USER && password === adminPass) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEY_SESSION, "true");
        sessionStorage.setItem(STORAGE_KEY_SESSION, "true");
      } catch (e) {
        console.warn("Session storage error:", e);
      }
      return { success: true };
    }
    return { success: false, message: "Invalid Admin Username or Password" };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY_SESSION);
      sessionStorage.removeItem(STORAGE_KEY_SESSION);
    } catch (e) {
      console.warn("Session remove error:", e);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (oldPassword !== adminPass) {
      return { success: false, message: "Current password does not match." };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: "New password must be at least 6 characters long." };
    }

    // Update local state and localStorage immediately
    setAdminPass(newPassword);
    try {
      localStorage.setItem(STORAGE_KEY_PASS, newPassword);
    } catch (e) {
      console.warn("Pass save error:", e);
    }

    // Sync to Cloud Firestore Database so it updates across all Chrome profiles & devices
    try {
      await setDoc(doc(db, "settings", "admin"), { password: newPassword }, { merge: true });
    } catch (err) {
      console.warn("Firestore password update warning:", err.message);
    }

    return { success: true, message: "Password updated successfully across all devices!" };
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        login,
        logout,
        changePassword,
        adminUser,
        adminPass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
