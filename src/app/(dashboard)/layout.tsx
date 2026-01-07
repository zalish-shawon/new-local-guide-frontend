"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Sidebar } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Protect the Dashboard Routes
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Shared Navbar on top */}
      <Navbar />

      <div className="flex">
        {/* 2. Sidebar on the left */}
        <Sidebar />

        {/* 3. Page Content on the right */}
        <main className="flex-1 p-8 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}