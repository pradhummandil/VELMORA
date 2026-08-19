"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  about?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userPayload?: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<UserProfile | null>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    setUser(null);
    setLoading(false);
    router.push("/");
  }, [router]);

  const verifyAndFetchProfile = useCallback(async (authToken: string): Promise<UserProfile | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        setToken(null);
        setUser(null);
        return null;
      }

      if (!res.ok) {
        return null;
      }

      const profileData: UserProfile = await res.json();
      setUser(profileData);
      return profileData;
    } catch (err) {
      console.error("Failed to verify user session:", err);
      return null;
    }
  }, []);

  // Initial token verification on page load
  useEffect(() => {
    const initAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      setToken(storedToken);
      const verifiedProfile = await verifyAndFetchProfile(storedToken);
      if (!verifiedProfile) {
        setToken(null);
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, [verifyAndFetchProfile]);

  const login = async (newToken: string, userPayload?: Partial<UserProfile>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
    }
    setToken(newToken);

    if (userPayload && userPayload.email && userPayload.name) {
      setUser({
        id: userPayload.id || 0,
        name: userPayload.name,
        email: userPayload.email,
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
        phoneNumber: userPayload.phoneNumber,
        about: userPayload.about,
      });
    }

    // Refresh official profile from backend
    await verifyAndFetchProfile(newToken);
  };

  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (!token) return null;
    return await verifyAndFetchProfile(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        refreshProfile,
        setUser,
      }}
    >
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
