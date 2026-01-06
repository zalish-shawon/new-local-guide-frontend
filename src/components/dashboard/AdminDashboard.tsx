/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Users, Map, Calendar, DollarSign } from "lucide-react";
import api from "@/src/services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, tours: 0, bookings: 0, revenue: 0 });

  useEffect(() => {
    // Ideally, you should create a specific endpoint /admin/stats in Backend
    // For now, we simulate it or fetch separate lists
    const fetchStats = async () => {
      try {
        const [usersRes, toursRes, bookingsRes] = await Promise.all([
           // You need to ensure these endpoints exist and Admin has access
           api.get('/users'), 
           api.get('/tours'),
           api.get('/bookings') 
        ]);

        setStats({
          users: usersRes.data.data.length,
          tours: toursRes.data.data.length,
          bookings: bookingsRes.data.data.length,
          revenue: bookingsRes.data.data.reduce((acc: any, b: any) => acc + b.totalPrice, 0)
        });
      } catch (e) {
        console.error("Failed to load admin stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Overview</h1>
      
      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users className="h-6 w-6"/></div>
          <div><p className="text-sm text-slate-500">Total Users</p><p className="text-2xl font-bold">{stats.users}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600"><Map className="h-6 w-6"/></div>
          <div><p className="text-sm text-slate-500">Active Tours</p><p className="text-2xl font-bold">{stats.tours}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-lg text-amber-600"><Calendar className="h-6 w-6"/></div>
          <div><p className="text-sm text-slate-500">Total Bookings</p><p className="text-2xl font-bold">{stats.bookings}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600"><DollarSign className="h-6 w-6"/></div>
          <div><p className="text-sm text-slate-500">Total Revenue</p><p className="text-2xl font-bold">${stats.revenue}</p></div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
               <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition">
                 Manage Users (Block/Delete)
               </button>
               <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition">
                 Approve Pending Guides
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}