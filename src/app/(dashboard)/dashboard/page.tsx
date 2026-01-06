"use client";

import AdminDashboard from "@/src/components/dashboard/AdminDashboard";
import GuideDashboard from "@/src/components/dashboard/GuideDashboard";
import TouristDashboard from "@/src/components/dashboard/TouristDashboard";
import { useAuth } from "@/src/context/AuthContext";

 // We will create this

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Render different dashboard based on role
  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "guide") return <GuideDashboard />;
  
  return <TouristDashboard />;
}