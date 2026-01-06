"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
  role: "tourist" | "guide" | "admin";
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Default to true so we don't redirect to login page immediately
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      try {
        // 1. Get data from LocalStorage
        const storedToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        console.log("🔄 Attempting to restore session:", { storedToken, storedUser });

        if (storedToken && storedUser) {
          // 2. Validate data is not "undefined" string
          if (storedUser !== "undefined" && storedUser !== "null") {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken);
            console.log("✅ Session restored successfully");
          } else {
             console.warn("⚠️ Invalid user data found, clearing storage.");
             localStorage.removeItem("accessToken");
             localStorage.removeItem("user");
          }
        } else {
            console.log("ℹ️ No session found");
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    // 1. Set State
    setToken(newToken);
    setUser(newUser);
    
    // 2. Save to Storage
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    console.log("🔓 Logged in successfully");
    router.push("/"); 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    console.log("🔒 Logged out");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};