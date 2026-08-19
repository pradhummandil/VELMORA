"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // User is not authenticated; redirect to home/login
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white p-4">
        <div className="text-center" style={{ maxWidth: "450px" }}>
          <h2 className="font-garamond mb-15 color-dark" style={{ letterSpacing: "1.5px" }}>VELMORA</h2>
          <div className="spinner-border text-dark mb-20" role="status" style={{ width: "2rem", height: "2rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="fs-16 text-muted m0">Verifying secure session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
