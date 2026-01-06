/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminService } from "@/src/services/admin.service";

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await AdminService.getAllBookings();
        setBookings(data);
      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Loader2 className="animate-spin h-8 w-8 mx-auto mt-10 text-indigo-600" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">All Bookings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Booked By</th>
              <th className="px-6 py-4">Tour Name</th>
              <th className="px-6 py-4">Guide</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {booking.tourist?.name}
                  <div className="text-xs text-slate-400">{booking.tourist?.email}</div>
                </td>
                <td className="px-6 py-4 max-w-[200px] truncate" title={booking.tour?.title}>
                   {booking.tour?.title}
                </td>
                <td className="px-6 py-4 text-indigo-600 font-medium">
                   {booking.guide?.name}
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                   ${booking.totalPrice}
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                   }`}>
                      {booking.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                   {new Date(booking.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}