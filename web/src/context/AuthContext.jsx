import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"; // URL de l’API backend (défaut en local)
  const [user, setUser] = useState(null); // null = pas connecté
  const [loading, setLoading] = useState(true); // nouvel état

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        logout();
        setLoading(false);
      } else {
        fetch(`${API_BASE}/api/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (!res.ok) throw new Error("Invalid token");
          return res.json();
        })
        .then(userData => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}