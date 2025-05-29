import React, { createContext, useState, useEffect, useContext } from "react";
import { getMeAction, loginAction } from "../actions/auth.action";
import type { User, AdminUser, StudentUser } from "@server/lib/utils/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (studentId: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type UserResponse = {
  role: "admin" | "student";
  id: string;
  createdAt: string;
  updatedAt: string;
  fullname?: string;
  email?: string;
};

const transformDates = (userData: UserResponse): User => {
  const base = {
    ...userData,
    createdAt: new Date(userData.createdAt),
    updatedAt: new Date(userData.updatedAt),
  };

  return userData.role === "admin"
    ? (base as AdminUser)
    : (base as StudentUser);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userData = await getMeAction(token);
          if ("message" in userData) {
            return;
          }

          setUser(transformDates(userData.user));
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (studentId: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginAction(studentId, password);
      if (result.success && result.token) {
        localStorage.setItem("token", result.token);
        const userData = await getMeAction(result.token);
        if ("message" in userData) {
          throw new Error("Failed to get user data");
        }
        setUser(transformDates(userData.user));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      throw new Error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
