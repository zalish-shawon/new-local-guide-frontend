"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // <--- Import Link
import { Users, Map, Calendar, DollarSign, ArrowRight } from "lucide-react";
import api from "@/src/services/api"; // Ensure this path matches your project structure exactly

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, tours: 0, bookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("🔄 Fetching Admin Stats...");
        
        // We fetch individually now. If one fails, the others still load.
        // 1. Fetch Users
        let usersCount = 0;
        try {
            const usersRes = await api.get('/users');
            usersCount = usersRes.data.data.length;
        } catch (err) { console.error("❌ Failed to fetch users:", err); }

        // 2. Fetch Tours
        let toursCount = 0;
        try {
            const toursRes = await api.get('/tours');
            toursCount = toursRes.data.data.length;
        } catch (err) { console.error("❌ Failed to fetch tours:", err); }

        // 3. Fetch Bookings
        let bookingsCount = 0;
        let totalRevenue = 0;
        try {
            const bookingsRes = await api.get('/bookings');
            bookingsCount = bookingsRes.data.data.length;
            totalRevenue = bookingsRes.data.data.reduce((acc: number, b: any) => acc + (b.totalPrice || 0), 0);
        } catch (err) { console.error("❌ Failed to fetch bookings:", err); }

        setStats({
          users: usersCount,
          tours: toursCount,
          bookings: bookingsCount,
          revenue: totalRevenue
        });

      } catch (e) {
        console.error("🔥 Major error loading dashboard", e);
      } finally {
        setLoading(false);
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
               
               {/* FIXED: Added Link to Manage Users */}
               <Link 
                 href="/dashboard/admin/users"
                 className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition flex justify-between items-center group"
               >
                 <span>Manage Users (Block/Delete)</span>
                 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
               </Link>

               {/* FIXED: Link to Manage Tours */}
               <Link 
                 href="/dashboard/admin/tours"
                 className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition flex justify-between items-center group"
               >
                 <span>Manage Tours</span>
                 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
               </Link>

               {/* Placeholder for Approve Guides - pointing to users for now */}
               <Link 
                 href="/dashboard/admin/users"
                 className="block w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition flex justify-between items-center group"
               >
                 <span>Approve Pending Guides</span>
                 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}