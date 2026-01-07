/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText,
  User
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/src/services/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Backend should return bookings specific to the logged-in user (Guide/Tourist)
      const response = await api.get("/bookings");
      setBookings(response.data.data);
    } catch (error) {
      console.error("Failed to fetch bookings");
      // toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-amber-100 text-amber-700"; // pending
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-indigo-600 h-8 w-8"/></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Booking Management</h1>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm">
          Total Bookings: {bookings.length}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
          <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No bookings found</h3>
          <p className="text-slate-500">You dont have any bookings yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tour Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50 transition">
                    
                    {/* Tour Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                          <img 
                            src={booking.tour?.images?.[0] || "https://placehold.co/100"} 
                            alt="Tour" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm line-clamp-1">{booking.tour?.title || "Unknown Tour"}</p>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <MapPin className="h-3 w-3" /> {booking.tour?.meetingPoint || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Guest Info (For Guides) or Guide Info (For Tourists) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 p-1.5 rounded-full text-indigo-600">
                           <User className="h-4 w-4" />
                        </div>
                        <div>
                          {/* If Guide, show Tourist Name. If Tourist, show Guide Name */}
                          <p className="text-sm font-bold text-slate-900">
                             {booking.tourist?.name || booking.tourist?.email || "Guest"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {booking.slots} People • ${booking.totalPrice}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700 font-medium">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> {booking.tour?.duration || 2} Hours
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status === 'confirmed' && <CheckCircle2 className="h-3 w-3" />}
                        {booking.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                        {booking.status === 'pending' && <Clock className="h-3 w-3" />}
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions (Invoice) */}
                    <td className="px-6 py-4 text-right">
                      {booking.status === 'confirmed' ? (
                        <Link 
                          href={`/invoice/${booking._id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition"
                        >
                          <FileText className="h-4 w-4" /> Invoice
                        </Link>
                      ) : (
                        <span className="text-slate-300 text-xs font-medium">No Action</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}