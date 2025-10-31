"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  username: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.id, username: decoded.username, role: decoded.role });
        } catch {
        localStorage.removeItem("token");
        setUser(null);
        }
    }
    setLoading(false);
    }, []);
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser({
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isAdmin, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
