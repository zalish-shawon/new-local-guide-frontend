/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Calendar, DollarSign, Map, Plus, Users } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BookingService } from "@/src/services/booking.service";
import api from "@/src/services/api";

export default function GuideDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [myTours, setMyTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Bookings assigned to me (Guide)
        const bookingData = await BookingService.getMyBookings();
        setBookings(bookingData);

        const toursRes = await api.get('/tours'); 

        setMyTours(toursRes.data.data); 

      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading guide portal...</div>;

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guide Portal</h1>
          <p className="text-slate-500">Manage your tours and incoming bookings.</p>
        </div>
        <Link 
          href="/dashboard/create-tour" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
        >
          <Plus className="h-5 w-5" /> Create New Tour
        </Link>
      </div>

      {/* Guide Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><DollarSign className="h-5 w-5"/></div>
            <h3 className="text-slate-500 text-sm font-medium">Total Earnings</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">${totalRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users className="h-5 w-5"/></div>
            <h3 className="text-slate-500 text-sm font-medium">Total Bookings</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Map className="h-5 w-5"/></div>
            <h3 className="text-slate-500 text-sm font-medium">Active Tours</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{myTours.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Incoming Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Latest Bookings</h2>
          </div>
          <div className="p-0">
            {bookings.length === 0 ? (
              <p className="p-6 text-slate-500 text-sm">No bookings yet.</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">Tourist</th>
                    <th className="px-6 py-3">Tour</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">{b.tourist?.name || "Guest"}</td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-[150px]">{b.tour?.title}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                          b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link href="/dashboard/bookings" className="text-indigo-600 text-sm font-bold hover:underline">View All Bookings</Link>
          </div>
        </div>

        {/* My Tours List (Mini) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">My Listings</h2>
          </div>
          <div className="p-6 space-y-4">
             {myTours.slice(0, 3).map(tour => (
               <div key={tour._id} className="flex gap-4 items-center">
                  <div className="h-16 w-20 bg-slate-200 rounded-lg overflow-hidden">
                    <img src={tour.images?.[0] || 'https://placehold.co/100'} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{tour.title}</h4>
                    <p className="text-xs text-slate-500">${tour.price} • {tour.duration} hours</p>
                  </div>
               </div>
             ))}
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link href="/dashboard/listings" className="text-indigo-600 text-sm font-bold hover:underline">Manage Listings</Link>
          </div>
        </div>

      </div>
    </div>
  );
}